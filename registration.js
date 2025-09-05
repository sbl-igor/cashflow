document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup-auth-container");
  const popupTitle = document.getElementById("popup-auth-title");
  const registerForm = document.getElementById("popup-register-form");
  const loginForm = document.getElementById("popup-login-form");

  const openRegisterBtn = document.querySelector(".btn-open-register");
  const openLoginBtn = document.querySelector(".btn-open-login");
  const closeBtn = document.querySelector(".popup-close-btn");

  const NETLIFY_FUNCTION_URL = "/.netlify/functions/users"; // URL Netlify Function

  // открыть регистрацию
  openRegisterBtn.addEventListener("click", () => {
    popup.style.display = "flex";
    popupTitle.textContent = "Регистрация";
    registerForm.style.display = "block";
    loginForm.style.display = "none";
  });

  // открыть вход
  openLoginBtn.addEventListener("click", () => {
    popup.style.display = "flex";
    popupTitle.textContent = "Вход";
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  });

  // закрыть
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // закрытие по клику вне окна
  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
  });

  // -----------------------
  // Регистрация
  // -----------------------
  document.getElementById("popup-register-btn").addEventListener("click", async () => {
    const name = document.getElementById("popup-reg-name").value.trim();
    const email = document.getElementById("popup-reg-email").value.trim();
    const invitedBy = document.getElementById("popup-reg-referral").value.trim();

    if (!name || !email) {
      alert("Заполните все поля");
      return;
    }

    try {
      const res = await fetch(NETLIFY_FUNCTION_URL, {
        method: "POST",
        body: JSON.stringify({ action: "register", name, email, invitedBy }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.status === "error") {
        alert(data.message);
      } else {
        alert(`Регистрация успешна!\nВаш реферальный код: ${data.referralCode}\nСкидка: ${data.discount}`);
        popup.style.display = "none";
      }
    } catch (err) {
      alert("Ошибка подключения к серверу");
      console.error(err);
    }
  });

  // -----------------------
  // Вход
  // -----------------------
  document.getElementById("popup-login-btn").addEventListener("click", async () => {
    const email = document.getElementById("popup-login-email").value.trim();

    if (!email) {
      alert("Введите email");
      return;
    }

    try {
      const res = await fetch(NETLIFY_FUNCTION_URL, {
        method: "POST",
        body: JSON.stringify({ action: "login", email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.status === "error") {
        alert(data.message);
      } else {
        alert(`Добро пожаловать, ${data.name}!\nВаша скидка: ${data.discount}\nВаш реферальный код: ${data.referralCode}`);
        popup.style.display = "none";
      }
    } catch (err) {
      alert("Ошибка подключения к серверу");
      console.error(err);
    }
  });
});
