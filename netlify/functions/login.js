// netlify/functions/login.js

// Импортируем библиотеки
const { GoogleSpreadsheet } = require('google-spreadsheet');
const bcrypt = require('bcryptjs');

// --- Конфигурация (Ваши переменные окружения Netlify) ---
// Эти переменные должны быть настроены в настройках Netlify (Environment Variables)
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
// Важно: Private Key должен быть правильно отформатирован для работы в Netlify Functions
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') : null;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

exports.handler = async (event) => {
    // Проверяем, что метод запроса - POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { name, password } = JSON.parse(event.body);

        // 1. Валидация входных данных
        if (!name || !password) {
            return { 
                statusCode: 400, 
                body: JSON.stringify({ message: 'Имя и Пароль обязательны.' }) 
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
            console.error("GOOGLE_PRIVATE_KEY is missing.");
            return { statusCode: 500, body: JSON.stringify({ message: 'Серверная ошибка конфигурации (Auth).' }) };
        }
        await doc.useServiceAccountAuth({
            client_email: SERVICE_ACCOUNT_EMAIL,
            private_key: PRIVATE_KEY,
        });

        await doc.loadInfo(); 
        const sheet = doc.sheetsByIndex[0]; 
        const rows = await sheet.getRows();

        // 2. Поиск пользователя по Имени
        const user = rows.find(row => row.Имя === name);
        
        if (!user) {
            // Безопасное сообщение об ошибке: не даем подсказок, существует ли имя
            return { 
                statusCode: 401, 
                body: JSON.stringify({ message: 'Неверное имя или пароль.' }) 
            };
        }

        // 3. Сравнение пароля (Используем bcrypt.compare)
        const passwordMatch = await bcrypt.compare(password, user.Хэш_Пароля);

        if (passwordMatch) {
            // 4. Вход успешен: возвращаем данные пользователя, включая уникальный реферальный код
            // Используем оператор || '' для гарантии, что код не будет undefined, если поле пустое
            const uniqueCode = user.Уникальный_Код || ''; 

            return {
                statusCode: 200,
                body: JSON.stringify({ 
                    message: 'Вход выполнен.', 
                    name: user.Имя,
                    // Возвращаем скидку
                    discount: parseInt(user.Скидка_Процент) || 0,
                    // НОВОЕ: Возвращаем уникальный код пользователя
                    referralCode: uniqueCode 
                }),
            };
        } else {
            // Пароль не совпал
            return { 
                statusCode: 401, 
                body: JSON.stringify({ message: 'Неверное имя или пароль.' }) 
            };
        }

    } catch (error) {
        console.error('Ошибка входа:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Внутренняя ошибка сервера. Проверьте логи Netlify.' }),
        };
    }
};