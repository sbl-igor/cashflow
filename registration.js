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