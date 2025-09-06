import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SPREADSHEET_ID = "16V78B6_ucC19jer1MA9An0RGU2XXqiwkeiZRWKnV4bI";
const SHEET_NAME = "Users";

// клиент Google Sheets через ENV
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

function generateReferralCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const data = JSON.parse(event.body);

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:E`,
    });
    const users = res.data.values || [];

    // 📌 Регистрация
    if (data.action === "register") {
      const { name, email, invitedBy } = data;
      if (!name || !email) {
        return {
          statusCode: 400,
          body: JSON.stringify({ status: "error", message: "Name and email required" }),
        };
      }

      const emails = users.map(r => r[1]);
      if (emails.includes(email)) {
        return {
          statusCode: 200,
          body: JSON.stringify({ status: "error", message: "Email already registered" }),
        };
      }

      const referralCode = generateReferralCode();
      let discount = 0;

      if (invitedBy) {
        for (let i = 0; i < users.length; i++) {
          if (users[i][2] === invitedBy) {
            const row = i + 1;
            await sheets.spreadsheets.values.update({
              spreadsheetId: SPREADSHEET_ID,
              range: `${SHEET_NAME}!D${row}`,
              valueInputOption: "RAW",
              requestBody: { values: [[5]] },
            });
            break;
          }
        }
      }

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

    // 📌 Логин
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
