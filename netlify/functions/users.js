import { google } from "googleapis";
import path from "path";

// 🔑 путь к скачанному JSON ключу сервисного аккаунта
const KEY_PATH = path.join(process.cwd(), "service-account.json");

// ⚙️ настройки
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SPREADSHEET_ID = "16V78B6_ucC19jer1MA9An0RGU2XXqiwkeiZRWKnV4bI"; // вставь сюда ID таблицы (из URL)
const SHEET_NAME = "Users";

// создаём клиент Google Sheets
const auth = new google.auth.GoogleAuth({
  keyFile: KEY_PATH,
  scopes: SCOPES,
});
const sheets = google.sheets({ version: "v4", auth });

// генерация реферального кода
function generateReferralCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Netlify Function handler
export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    if (!data.action) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No action provided" }),
      };
    }

    // получаем все строки с листа
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:E`,
    });
    const users = res.data.values || [];

    // -------------------
    // 📌 РЕГИСТРАЦИЯ
    // -------------------
    if (data.action === "register") {
      const { name, email, invitedBy } = data;
      if (!name || !email) {
        return {
          statusCode: 400,
          body: JSON.stringify({ status: "error", message: "Name and email required" }),
        };
      }

      // проверяем, зарегистрирован ли email
      const emails = users.map(row => row[1]);
      if (emails.includes(email)) {
        return {
          statusCode: 200,
          body: JSON.stringify({ status: "error", message: "Email already registered" }),
        };
      }

      // генерируем код и скидку
      const referralCode = generateReferralCode();
      let discount = 0;

      // если указали чей-то код → пригласившему даём скидку
      if (invitedBy) {
        for (let i = 0; i < users.length; i++) {
          if (users[i][2] === invitedBy) {
            const row = i + 1; // индекс строки в таблице (1-based)
            await sheets.spreadsheets.values.update({
              spreadsheetId: SPREADSHEET_ID,
              range: `${SHEET_NAME}!D${row}`,
              valueInputOption: "RAW",
              requestBody: { values: [[5]] }, // ставим 5% скидки
            });
            break;
          }
        }
      }

      // добавляем нового юзера
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: SHEET_NAME,
        valueInputOption: "RAW",
        requestBody: {
          values: [[name, email, referralCode, discount, invitedBy || ""]],
        },
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ status: "success", referralCode, discount }),
      };
    }

    // -------------------
    // 📌 ЛОГИН
    // -------------------
    if (data.action === "login") {
      const { email } = data;
      if (!email) {
        return {
          statusCode: 400,
          body: JSON.stringify({ status: "error", message: "Email required" }),
        };
      }

      for (let i = 0; i < users.length; i++) {
        if (users[i][1] === email) {
          return {
            statusCode: 200,
            body: JSON.stringify({
              status: "success",
              name: users[i][0],
              referralCode: users[i][2],
              discount: users[i][3],
            }),
          };
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ status: "error", message: "User not found" }),
      };
    }

    // неизвестное действие
    return {
      statusCode: 400,
      body: JSON.stringify({ status: "error", message: "Unknown action" }),
    };

  } catch (err) {
    console.error("❌ Ошибка:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ status: "error", message: err.message }),
    };
  }
}
