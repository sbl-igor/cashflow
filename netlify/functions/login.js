// netlify/functions/login.js

// Импортируем библиотеки
const { GoogleSpreadsheet } = require('google-spreadsheet');
const bcrypt = require('bcryptjs');

// --- Конфигурация (Ваши переменные окружения Netlify) ---
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') : null;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

exports.handler = async (event) => {
    // Check if the request method is POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { name, password } = JSON.parse(event.body);

        // 1. Input Data Validation (Server-side)
        if (!name || !password) {
            return { 
                statusCode: 400, 
                body: JSON.stringify({ message: 'Username and Password are required.' }) // Translated
            };
        }

        // !!! NEW SERVER-SIDE LENGTH CHECKS !!!
        if (name.length > 10) {
            return { 
                statusCode: 400, 
                body: JSON.stringify({ message: 'Username must not exceed 10 characters.' }) // Translated
            };
        }

        if (password.length > 16) {
            return { 
                statusCode: 400, 
                body: JSON.stringify({ message: 'Password must not exceed 16 characters.' }) // Translated
            };
        }
        
        // --- Google Sheets Access Setup ---
        if (!PRIVATE_KEY) {
            console.error("GOOGLE_PRIVATE_KEY is missing.");
            return { statusCode: 500, body: JSON.stringify({ message: 'Server configuration error (Auth).' }) }; // Translated
        }
        await doc.useServiceAccountAuth({
            client_email: SERVICE_ACCOUNT_EMAIL,
            private_key: PRIVATE_KEY,
        });

        await doc.loadInfo(); 
        const sheet = doc.sheetsByIndex[0]; 
        const rows = await sheet.getRows();

        // 2. Find user by Name
        const user = rows.find(row => row.Имя === name);
        
        if (!user) {
            // Safe error message: do not reveal if the name exists
            return { 
                statusCode: 401, 
                body: JSON.stringify({ message: 'Incorrect Username or password.' }) // Translated
            };
        }

        // 3. Password comparison (using bcrypt.compare)
        const passwordMatch = await bcrypt.compare(password, user.Хэш_Пароля);

        if (passwordMatch) {
            // 4. Login successful: return user data, including unique referral code
            // Use || '' to ensure the code is not undefined if the field is empty
            // NOTE: Make sure your Google Sheet has a column named 'Уникальный_Код'
            const uniqueCode = user.Уникальный_Код || ''; 

            return {
                statusCode: 200,
                body: JSON.stringify({ 
                    message: 'Login successful.', // Translated
                    name: user.Имя,
                    // Return discount
                    discount: parseInt(user.Скидка_Процент) || 0,
                    // NEW: Return the user's unique code
                    referralCode: uniqueCode 
                }),
            };
        } else {
            // Password mismatch
            return { 
                statusCode: 401, 
                body: JSON.stringify({ message: 'Incorrect Username or password.' }) // Translated
            };
        }

    } catch (error) {
        console.error('Login error:', error); // Translated
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error. Check Netlify logs.' }), // Translated
        };
    }
};