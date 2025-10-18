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

// --- НОВАЯ ФУНКЦИЯ: ГЕНЕРАЦИЯ УНИКАЛЬНОГО КОДА ---
function generateUniqueCode() {
    // Генерируем 8-символьный код из случайных букв и цифр (например, K3R5A9X0)
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}

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

        // !!! НОВЫЕ СЕРВЕРНЫЕ ПРОВЕРКИ ДЛИНЫ !!!
        if (name.length > 12) {
            return { 
                statusCode: 400, 
                body: JSON.stringify({ message: 'Имя пользователя не должно превышать 12 символов.' }) 
            };
        }

        if (password.length > 16) {
            return { 
                statusCode: 400, 
                body: JSON.stringify({ message: 'Пароль не должен превышать 16 символов.' }) 
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
        
        // 3. Хэширование пароля
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        const now = new Date();
        const formattedDateTime = now.toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'America/Argentina/Buenos_Aires',
            timeZoneName: 'short'
        });
        
        
        // 4. ГЕНЕРАЦИЯ УНИКАЛЬНОГО КОДА для нового пользователя
        let uniqueReferralCode;
        let codeExists = true;
        // Генерируем, пока не найдем уникальный код
        while(codeExists) {
            uniqueReferralCode = generateUniqueCode();
            codeExists = rows.some(row => row.Уникальный_Код === uniqueReferralCode);
        }

        // 5. Логика начисления однократной скидки Рефереру
        let referrerDiscountMessage = "";
        const cleanReferralCode = referralCode ? referralCode.toUpperCase().trim() : '';

        if (cleanReferralCode) {
            // Ищем Реферера по его УНИКАЛЬНОМУ КОДУ (Убедитесь, что столбец назван 'Уникальный_Код')
            const referrerRow = rows.find(row => row.Уникальный_Код === cleanReferralCode);
            
            if (referrerRow) {
                // Преобразуем скидку в число, по умолчанию 0
                let currentDiscount = parseInt(referrerRow.Скидка_Процент) || 0; 
                
                // Начисляем 5% только если скидка еще 0%
                if (currentDiscount === 0) {
                    referrerRow.Скидка_Процент = DISCOUNT_AMOUNT; 
                    await referrerRow.save(); // Сохраняем изменение в таблице
                    
                    referrerDiscountMessage = `Ваш Реферер (${cleanReferralCode}) получил однократную скидку ${DISCOUNT_AMOUNT}%.`;
                } else {
                    referrerDiscountMessage = `Реферер (${cleanReferralCode}) уже имеет скидку.`;
                }
            } else {
                referrerDiscountMessage = `Указанный реферальный код не найден.`;
            }
        }
        
        // 6. Сохранение данных НОВОГО пользователя
        await sheet.addRow({
            'Имя': name,
            'Email': email,
            'Хэш_Пароля': passwordHash,
            'Скидка_Процент': 0, // Начальная скидка Реферала всегда 0%
            'Уникальный_Код': uniqueReferralCode, // <-- ЛИЧНЫЙ КОД нового пользователя
            'Пригласил_Код': cleanReferralCode, // <-- КОД, который он использовал
            'Дата_Создания': formattedDateTime, 
        });

        // 7. Формирование ответа клиенту
        const successMessage = referrerDiscountMessage 
            ? `Регистрация успешна! Ваш уникальный код: ${uniqueReferralCode}. ${referrerDiscountMessage}`
            : `Регистрация успешна! Ваш уникальный код: ${uniqueReferralCode}.`;

        return {
            statusCode: 201, 
            body: JSON.stringify({ 
                message: successMessage, 
                discount: 0,
                referralCode: uniqueReferralCode // Возвращаем код новому пользователю
            }), 
        };

    } catch (error) {
        console.error('Ошибка регистрации:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Внутренняя ошибка сервера. Проверьте логи Netlify.' }),
        };
    }
};