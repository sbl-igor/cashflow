// netlify/functions/register.js

// Импортируем библиотеки
const { GoogleSpreadsheet } = require('google-spreadsheet');
const bcrypt = require('bcryptjs');


// --- Конфигурация (Ваши переменные окружения Netlify) ---
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
// Private Key должен быть правильно отформатирован для работы в Netlify Functions
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') : null;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID); 
const SALT_ROUNDS = 10; // Recommended complexity for bcrypt
const DISCOUNT_AMOUNT = 5; // Fixed one-time discount of 5%

// --- NEW FUNCTION: GENERATE UNIQUE CODE ---
function generateUniqueCode() {
    // Generates an 8-character code from random letters and numbers (e.g., K3R5A9X0)
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { name, email, password, referralCode } = JSON.parse(event.body);

        // 1. Server-side validation
        if (!name || !email || !password || password.length < 6) {
            return { 
                statusCode: 400, 
                body: JSON.stringify({ message: 'Username, Email, and Password (min 6 characters) are required.' }) // Перевод
            };
        }

        // !!! NEW SERVER-SIDE LENGTH CHECKS !!!
        if (name.length > 10) {
            return { 
                statusCode: 400, 
                body: JSON.stringify({ message: 'Username must not exceed 12 characters.' }) // Перевод
            };
        }

        if (password.length > 16) {
            return { 
                statusCode: 400, 
                body: JSON.stringify({ message: 'Password must not exceed 16 characters.' }) // Перевод
            };
        }
        
        // --- Google Sheets Access Setup ---
        if (!PRIVATE_KEY) {
            return { statusCode: 500, body: JSON.stringify({ message: 'Server configuration error (Auth).' }) }; // Перевод
        }
        await doc.useServiceAccountAuth({
            client_email: SERVICE_ACCOUNT_EMAIL,
            private_key: PRIVATE_KEY,
        });

        await doc.loadInfo(); 
        const sheet = doc.sheetsByIndex[0]; 
        let rows = await sheet.getRows();

        // 2. Uniqueness check
        const userExists = rows.some(row => row.Имя === name || row.Email === email);
        if (userExists) {
            return { 
                statusCode: 409, 
                body: JSON.stringify({ message: 'User with this username or email already exists.' }) // Перевод
            };
        }
        
        // 3. Password Hashing
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);       
        
        // 4. GENERATING A UNIQUE CODE for the new user
        let uniqueReferralCode;
        let codeExists = true;
        // Generate until a unique code is found
        while(codeExists) {
            uniqueReferralCode = generateUniqueCode();
            codeExists = rows.some(row => row.Уникальный_Код === uniqueReferralCode);
        }

        // 5. Logic for awarding a one-time discount to the Referrer
        let referrerDiscountMessage = "";
        const cleanReferralCode = referralCode ? referralCode.toUpperCase().trim() : '';

        if (cleanReferralCode) {
            // Find Referrer by their UNIQUE CODE (Ensure the column is named 'Уникальный_Код')
            const referrerRow = rows.find(row => row.Уникальный_Код === cleanReferralCode);
            
            if (referrerRow) {
                // Convert discount to a number, default is 0
                let currentDiscount = parseInt(referrerRow.Скидка_Процент) || 0; 
                
                // Award 5% only if the discount is still 0%
                if (currentDiscount === 0) {
                    referrerRow.Скидка_Процент = DISCOUNT_AMOUNT; 
                    await referrerRow.save(); // Save the change to the sheet
                    
                    referrerDiscountMessage = `Your Referrer (${cleanReferralCode}) received a one-time discount of ${DISCOUNT_AMOUNT}%.`; // Перевод
                } else {
                    referrerDiscountMessage = `Referrer (${cleanReferralCode}) already has a discount.`; // Перевод
                }
            } else {
                referrerDiscountMessage = `The specified referral code was not found.`; // Перевод
            }
        }
        
        // 6. Saving NEW user data
        await sheet.loadHeaderRow();

        const formattedDateTime = new Date().toISOString(); // ISO format (reliable)

        await sheet.addRow({
            'Имя': name,
            'Email': email,
            'Хэш_Пароля': passwordHash,
            'Скидка_Процент': 0,
            'Уникальный_Код': uniqueReferralCode,
            'Пригласил_Код': cleanReferralCode,
            'Дата_Создания': formattedDateTime,
        });


        // 7. Forming the response to the client
        const successMessage = referrerDiscountMessage 
            ? `Registration successful! Your unique code: ${uniqueReferralCode}. ${referrerDiscountMessage}` // Перевод
            : `Registration successful! Your unique code: ${uniqueReferralCode}.`; // Перевод

        return {
            statusCode: 201, 
            body: JSON.stringify({ 
                message: successMessage, 
                discount: 0,
                referralCode: uniqueReferralCode // Return code to the new user
            }), 
        };

    } catch (error) {
        console.error('Registration error:', error); // Перевод
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error. Check Netlify logs.' }), // Перевод
        };
    }
};