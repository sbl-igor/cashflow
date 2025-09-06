import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SPREADSHEET_ID = "16V78B6_ucC19jer1MA9An0RGU2XXqiwkeiZRWKnV4bI";
const SHEET_NAME = "Users";

// 🔑 Прямо вшитые ключи
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: "assistuserscashflow@caslhflowusers.iam.gserviceaccount.com",
    private_key: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDLJPPXGUDInJs/
YMLrL/o9zmKoSZziRjywbK33IDer/QcQccipXZs6aFjPnp6E+VhTuXvHbjdl3/3U
1EvdGA5NIMLGoIEHpWGprHAP2CeMQfz6X4akJhaNQQSG3iWptlgk1AXeIZ97RbQg
+Pg1RLXj91UcJkFDK+jo51vLaeqasb4CG4HlTSQB0XKOmpQMVKGHzLoe3CBMY002
+uyBd2aFLL+KF5moZztdHkp58lLEP0lIciRyXidNlj3lBrw2TnCMRfLu8Semd7U9
qdRipqj9ud0Iteq3F13fbcEVrkzty910GtiwAXmcfS8b+ptAIFcCkO5rimblFRct
0qRGm7dpAgMBAAECggEAAYnqs0D8obhhSv+FjR4B1X4uzEsIc5n9bjGt4f6+D+EH
W2tyjhPd2o6n849Q8JK/RZ0UpVv98pkvKpxJZH1A6Hp8dzWH3Ky28BUqC84C7gKh
nazjunJpE9H/rIeEvgPEqFIXJvRWvqqLv38wnsisibOZ0wWC04qC2wwbliTGfeb3
dX4wNIjJ/ZwDkJtBxo8+xKSulR+SwuxSCgLLI3+0Jhvc1M43thfoZOOw/FrrE54F
aWMDpY9AV0QHl3sPaNMDiS/pHxe6Wp6/70gsUjfF0ZqcOoIbPbSLLHi6qh/8cOVt
ZuHY7x/sHexYsWlXx5qSkUsHl792V6r9gmwCY9MaoQKBgQD6wHn5aPWi5s9AIT1S
Rvsowt4BInUIM/K5j4pQn3dfhynUxXaUYX90Drgbo5fTYGdHvNIYARfAT5ROtsRz
1Jn8bYC4WEo7zkSYiN8EU6+2ynScGJoRXMoO9j2SH+ls/PAxHWAfbV+rMwRzrGTm
BfKErKnE/ImE3vBWmmE6IjdGWQKBgQDPZWVaN1PWrWu9IVkbMDd7Ub5Cee/xHor7
kVntV0X09B8NqaieUjt05kU+J8EG/+uWagOlhemV3mbpi7GDygs/oWXhgBUBwQaa
6AxhwXnT93yE/dweNZVwbFqdeumrh41ZPPHpcwJ1678mkU0ncDs6MEsCAvrR4mOT
XnISADX3kQKBgQD4YyewRydjuc080nBjC0sKIpY1e4OAn6zl4Wl62awvJb3rNbtz
2mydc2MuhcwEp+9G4aUgAB0d8/aOTn+l2ci7g2FJurO2MGpEyvhX2eoqYLxIUBp1
7nt9fLCbCh95RclMbbPlDbwB42SajP/Z17RXdo4pQpua0hgzQXPkWTZ16QKBgHnL
awzjBwpAh8/nAKQ12a9DHv99CorITAhWoMAAC6ZBoubsJojrc90/yZQp1nLc4iZQ
Fdoj3TxVAozOq63gfmCc0O7vv+ZqzA02jubtrzTq1yZmyti20Q7XoxNudkF0dm7c
mphlISHNE1F77RpnD3EpoTMKOu/9CksmIMkvdIHxAoGAI7yeEHpsxLfGeYksUVh8
0cuv8wFDvZ2f8+BgpR6zq4Ml7xI6BcwztyQlymgEXErBT9DtGnC1p1jqWuHfJxDS
LWP48KG60Jsipxzarro+n+0e0yLwrDpEtBwXjGgGCh0bloRBb10P+qSCMfEsspSb
r5cykw8hEZhNOVGXQpZQYg8=
-----END PRIVATE KEY-----`,
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
