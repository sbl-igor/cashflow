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
const SALT_ROUNDS = 10; // Рекомендуемая сложность для bcrypt
const DISCOUNT_AMOUNT = 5; // Фиксированная однократная скидка 5%

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { name, email, password, referralCode } = JSON.parse(event.body);

        // 1. Серверная валидация
        if (!name || !email || !password || password.length < 6) {
            return { 
                statusCode: 400, 
                body: JSON.stringify({ message: 'Имя, Email и Пароль (мин. 6 символов) обязательны.' }) 
            };
        }
        
        // --- Настройка доступа к Google Sheets ---
        if (!PRIVATE_KEY) {
            return { statusCode: 500, body: JSON.stringify({ message: 'Серверная ошибка конфигурации (Auth).' }) };
        }
        await doc.useServiceAccountAuth({
            client_email: SERVICE_ACCOUNT_EMAIL,
            private_key: PRIVATE_KEY,
        });

        await doc.loadInfo(); 
        const sheet = doc.sheetsByIndex[0]; 
        let rows = await sheet.getRows();

        // 2. Проверка уникальности
        const userExists = rows.some(row => row.Имя === name || row.Email === email);
        if (userExists) {
            return { 
                statusCode: 409, 
                body: JSON.stringify({ message: 'Пользователь с таким именем или email уже существует.' }) 
            };
        }
        
        // 3. Хэширование пароля (КРИТИЧЕСКИЙ ШАГ)
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        
        // 4. Логика начисления однократной скидки Рефереру
        let referrerFound = false;
        let referrerDiscountMessage = "";

        if (referralCode) {
            const referrerIndex = rows.findIndex(row => row.Имя === referralCode);
            
            if (referrerIndex !== -1) {
                const referrerRow = rows[referrerIndex];
                // Убедимся, что поле "Скидка_Процент" существует в вашей таблице
                let currentDiscount = parseInt(referrerRow.Скидка_Процент) || 0; 
                
                // Начисляем 5% только если скидка еще 0%
                if (currentDiscount === 0) {
                    referrerRow.Скидка_Процент = DISCOUNT_AMOUNT; 
                    await referrerRow.save(); 
                    
                    referrerFound = true;
                    referrerDiscountMessage = `Пользователю ${referralCode} начислена однократная скидка ${DISCOUNT_AMOUNT}%.`;
                } else {
                    referrerFound = true;
                    referrerDiscountMessage = `Пользователь ${referralCode} уже имеет скидку.`;
                }
            }
        }
        
        // 5. Сохранение данных НОВОГО пользователя
        await sheet.addRow({
            'Имя': name,
            'Email': email,
            'Хэш_Пароля': passwordHash, // Сохраняем хэш
            'Скидка_Процент': 0, // Начальная скидка Реферала всегда 0%
            'Пригласил_Код': referralCode || '', 
        });

        const statusMessage = referrerFound 
            ? `Регистрация успешна. ${referrerDiscountMessage}`
            : `Регистрация успешна.`;

        return {
            statusCode: 201, 
            body: JSON.stringify({ message: statusMessage, discount: 0 }), 
        };

    } catch (error) {
        console.error('Ошибка регистрации:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Внутренняя ошибка сервера. Проверьте логи Netlify.' }),
        };
    }
};