// ======================================================
// ЧАСТЬ 1: ССЫЛКИ НА ЭЛЕМЕНТЫ И ЛОГИКА POPUP
// ======================================================

const btnRegistration = document.getElementById('btn-registration');
const btnLogin = document.getElementById('btn-login');

const popupRegistration = document.getElementById('popup-registration');
const popupLogin = document.getElementById('popup-login');

const overlay = document.getElementById('overlay');
const closeButtons = document.querySelectorAll('.close-btn');

const registrationForm = document.getElementById('form-registration');
const loginForm = document.getElementById('form-login');

// НОВЫЕ ССЫЛКИ ДЛЯ УПРАВЛЕНИЯ UI АВТОРИЗАЦИИ
const authUnauthenticatedList = document.querySelector('.list-auth-unauthenticated');
const authAuthenticatedList = document.querySelector('.list-auth-authenticated');
const authUserNameSpan = document.getElementById('auth-user-name');
const authReferralCodeSpan = document.getElementById('auth-referral-code');
const authUserDiscountSpan = document.getElementById('auth-user-discount');
const btnLogout = document.getElementById('btn-logout'); // Кнопка "Выход"

/**
 * Открывает указанное модальное окно.
 * @param {HTMLElement} popup - элемент модального окна для открытия.
 */
function openPopup(popup) {
    if (popup) {
        popup.classList.add('active');
        overlay.classList.add('active');
    }
}

/**
 * Закрывает указанное модальное окно.
 * @param {HTMLElement} popup - элемент модального окна для закрытия.
 */
function closePopup(popup) {
    if (popup) {
        popup.classList.remove('active');
        const activePopups = document.querySelectorAll('.popup.active');
        if (activePopups.length === 0) {
            overlay.classList.remove('active');
        }
    }
}

// 1. Обработка кнопок на панели (Регистрация, Вход)
btnRegistration.addEventListener('click', () => {
    openPopup(popupRegistration);
});

btnLogin.addEventListener('click', () => {
    openPopup(popupLogin);
});

// 2. Обработка кнопок закрытия (X) внутри pop-up'ов
closeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const targetSelector = event.currentTarget.dataset.closeTarget;
        const targetPopup = document.querySelector(targetSelector);
        
        closePopup(targetPopup);
    });
});

// 3. Обработка закрытия по клику на оверлей
overlay.addEventListener('click', () => {
    const activePopups = document.querySelectorAll('.popup.active');
    activePopups.forEach(popup => {
        closePopup(popup);
    });
})

// 4. Обработка закрытия по нажатию клавиши ESC 
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const activePopups = document.querySelectorAll('.popup.active');
        activePopups.forEach(popup => {
            closePopup(popup);
        });
    }
})

// ======================================================
// ЧАСТЬ 2: ЛОГИКА АУТЕНТИФИКАЦИИ И UI
// ======================================================

/**
 * Обновляет элементы интерфейса в шапке в зависимости от статуса входа.
 */
function updateAuthUI() {
    const userName = localStorage.getItem('userName');
    const referralCode = localStorage.getItem('userReferralCode');
    const discount = localStorage.getItem('userDiscount');

    if (userName && authAuthenticatedList && authUnauthenticatedList) {
        // Пользователь авторизован: скрываем Вход/Регистрацию, показываем данные
        authUnauthenticatedList.style.display = 'none';
        authAuthenticatedList.style.display = 'flex'; // Показываем как flex для корректного отображения в хедере

        authUserNameSpan.textContent = userName;
        authReferralCodeSpan.textContent = referralCode || 'None'; // Перевод 'Нет'
        // Убедимся, что скидка всегда отображается
        authUserDiscountSpan.textContent = `Discount: ${discount || 0}%`;
    } else if (authAuthenticatedList && authUnauthenticatedList) {
        // Пользователь не авторизован: показываем Вход/Регистрацию, скрываем данные
        authUnauthenticatedList.style.display = 'flex'; // Показываем как flex
        authAuthenticatedList.style.display = 'none';
    }
}

/**
 * Обрабатывает выход пользователя из системы.
 */
const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userReferralCode');
    localStorage.removeItem('userDiscount');
    alert('You have successfully logged out.'); // Перевод
    updateAuthUI(); // Обновляем UI после выхода
}

// Добавляем обработчик для кнопки "Выход"
if (btnLogout) {
    btnLogout.addEventListener('click', handleLogout);
}


// ======================================================
// ЧАСТЬ 3: ФУНКЦИИ ОТПРАВКИ ФОРМ (обновлены для вызова updateAuthUI)
// ======================================================

/**
 * Обрабатывает отправку формы регистрации
 */
const handleRegistration = async (event) => {
    event.preventDefault();

    // Получение данных
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const referralCode = document.getElementById('reg-referral-code').value.trim();

    // Валидация
    if (!name || !email || !password || password.length < 6) {
        alert('Please fill in Name, Email, and Password (min 6 characters).') // Перевод
        return
    }

    // !!! НОВЫЕ ПРОВЕРКИ ДЛИНЫ !!!
    if (name.length > 10) {
        alert('Username must not exceed 12 characters.'); // Перевод
        return;
    }

    if (password.length > 16) {
        alert('Password must not exceed 16 characters.'); // Перевод
        return;
    }

    // Блокируем кнопку
    const submitButton = registrationForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...'; // Перевод

    try {
        const response = await fetch('/.netlify/functions/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, referralCode })
        })

        const result = await response.json();

        if (response.ok) {
            alert(`✅ Registration successful!`); // Перевод. Используем общее сообщение.
            
            // Сохранение состояния входа и реферальных данных
            localStorage.setItem('userName', name); // Сохраняем имя после успешной регистрации
            localStorage.setItem('userReferralCode', result.referralCode);
            localStorage.setItem('userDiscount', result.discount || 0);
            
            registrationForm.reset();
            closePopup(popupRegistration);
            updateAuthUI(); // !!! Обновляем UI после успешной регистрации
        } else {
            alert(`❌ Registration error: ${result.message}`); // Перевод
        }
    } catch (error) {
        console.error('Network error during registration:', error); // Перевод
        alert('❌ An error occurred. Please check your connection.'); // Перевод
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Register'; // Перевод
    }
}

/**
 * Обрабатывает отправку формы входа (логина)
 */
const handleLogin = async (event) => {
    event.preventDefault();

    // Получаем данные
    const name = document.getElementById('login-name').value.trim();
    const password = document.getElementById('login-password').value;

    // Валидация
    if (!name || !password) {
        alert('Please enter your Name and Password.'); // Перевод
        return
    }

    // !!! НОВЫЕ ПРОВЕРКИ ДЛИНЫ !!!
    if (name.length > 10) {
        alert('Username must not exceed 12 characters.'); // Перевод
        return;
    }

    if (password.length > 16) {
        alert('Password must not exceed 16 characters.'); // Перевод
        return;
    }

    // Блокируем кнопку
    const submitButton = loginForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Checking..." // Перевод

    try {
        const response = await fetch('/.netlify/functions/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password }),
        });

        const result = await response.json();
        if (response.ok) {
            alert(`🎉 Welcome, ${result.name}! Your discount: ${result.discount}%`); // Перевод

            // Сохранение состояния входа
            localStorage.setItem('userDiscount', result.discount);
            localStorage.setItem('userName', result.name);
            localStorage.setItem('userReferralCode', result.referralCode); // Сохранение кода при входе

            loginForm.reset();
            closePopup(popupLogin);
            updateAuthUI(); // !!! Обновляем UI после успешного входа
        } else {
            alert(`❌ Login error: ${result.message}`); // Перевод
        }
    } catch (error) {
        console.error('Network error during login:', error); // Перевод
        alert('❌ An error occurred. Please check your connection.'); // Перевод      
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Log In"; // Перевод
    }
}

// ======================================================
// ЧАСТЬ 4: ПРИВЯЗКА СОБЫТИЙ И ИНИЦИАЛИЗАЦИЯ
// ======================================================

registrationForm.addEventListener('submit', handleRegistration);
loginForm.addEventListener('submit', handleLogin);

// Инициализация UI при загрузке страницы
document.addEventListener('DOMContentLoaded', updateAuthUI);