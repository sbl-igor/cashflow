// Получаем ссылки на все нужные элементы

const btnRegistration = document.getElementById('btn-registration');
const btnLogin = document.getElementById('btn-login');

const popupRegistration = document.getElementById('popup-registration');
const popupLogin = document.getElementById('popup-login');

const overlay = document.getElementById('overlay');
const closeButtons = document.querySelectorAll('.close-btn');

const registrationForm = document.getElementById('form-registration');
const loginForm = document.getElementById('form-login')

/**
 * Открывает указанное модальное окно.
 * @param {HTMLElement} popup - элемент модального окна для открытия.
 */

function openPopup(popup) {
    if (popup) {
        popup.classList.add('active');
        overlay.classList.add('active');
        // Опционально: Блокируем прокрутку страницы
        // document.body.style.overflow = 'hidden';
    }
}

/**
 * Закрывает указанное модальное окно.
 * @param {HTMLElement} popup - элемент модального окна для закрытия.
 */

function closePopup(popup) {
    if (popup) {
        popup.classList.remove('active');
        // Проверяем, есть ли еще активные pop-up'ы перед скрытием оверлея
        const activePopups = document.querySelectorAll('.popup.active');
        if (activePopups.length === 0) {
            overlay.classList.remove('active');
            // Восстанавливаем прокрутку страницы
            // document.body.style.overflow = 'auto';
        }
    }
}

// 1. Обработка кнопок на панели 
btnRegistration.addEventListener('click', () => {
    openPopup(popupRegistration);
});

btnLogin.addEventListener('click', () => {
    openPopup(popupLogin);
});

// 2. Обработка кнопок закрытия (X) внутри pop-up'ов
closeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // Получаем ID pop-up'а из атрибута data-close-target
        const targetSelector = event.currentTarget.dataset.closeTarget;
        const targetPopup = document.querySelector(targetSelector);
        
        closePopup(targetPopup);
    });
});

// 3. Обработка закрытия по клику на оверлей
overlay.addEventListener('click', () => {
    // Находим все активные pop-up'ы и закрываем их
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
// НОВЫЙ БЛОК: ФУНКЦИИ ОТПРАВКИ ДАННЫХ НА NETLIFY FUNCTIONS
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
        alert('Пожалуйста, заполните Имя, Email и Пароль (мин. 6 символов).')
        return
    }

    // Блокируем кнопку
    const submitButton = registrationForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Обработка...';

    try {
        const response = await fetch('/.netlify/functions/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, referralCode })
        })

        const result = await response.json();

        if (response.ok) {
            alert(`✅ ${result.message}`);
            registrationForm.reset();
            closePopup(popupRegistration);
        } else {
            alert(`❌ Ошибка регистрации: ${result.message}`);
        }
    } catch (error) {
        console.error('Ошибка сети при регистрации:', error);
        alert('❌ Произошла ошибка. Проверьте подключение.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Зарегистрироваться';
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
        alert('Пожалуйста, введите Имя и Пароль.');
        return
    }

    // Блокируем кнопку
    const submitButton = loginForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Проверка..."

    try {
        const response = await fetch('/.netlify/functions/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password }),
        });

        const result = await response.json();
        if (response.ok) {
            alert(`🎉 Добро пожаловать, ${result.name}! Ваша скидка: ${result.discount}%`);

            // Сохранение состояния входа
            localStorage.setItem('userDiscount', result.discount);
            localStorage.setItem('userName', result.name);

            loginForm.reset();
            closePopup(popupLogin);
        } else {
            alert(`❌ Ошибка входа: ${result.message}`);
        }
    } catch (error) {
        console.error('Ошибка сети при входе:', error);
        alert('❌ Произошла ошибка. Проверьте подключение.');        
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Войти";
    }
}

// ======================================================
// НОВЫЙ БЛОК: ПРИВЯЗКА СОБЫТИЙ ОТПРАВКИ ФОРМ
// ======================================================

registrationForm.addEventListener('submit', handleRegistration);
loginForm.addEventListener('submit', handleLogin);