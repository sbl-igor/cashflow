AOS.init();

document.addEventListener('DOMContentLoaded', function() {
    const languageBtn = document.querySelector('.language-btn');
    const popupCont = document.querySelector('.popup-content');
    const popup = document.getElementById('language-popup');
    const closeBtn = document.querySelector('.close-popup');
    const langBtns = document.querySelectorAll('.lang-btn');

    languageBtn.addEventListener('click', function() {
        popup.style.display = 'flex';
        popupCont.classList.add('show');
        popupCont.classList.remove('hide');
    });

    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
        popupCont.classList.add('hide');
        popupCont.classList.remove('show');
    });

    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            changeLanguage(selectedLang);
            popup.style.display = 'none';
            popupCont.classList.add('hide');
            popupCont.classList.remove('show');
        });
    });

    function changeLanguage(lang) {
        if (lang === 'ru') {
            // nav 
            document.querySelector('.welcome__heading').textContent = 'Мы предлагаем безопасные и выгодные условия для обмена валют';
            document.querySelector('.header__nav li.course a').textContent = 'Узнать курс';
            document.querySelector('.header__nav li.contacthref a').textContent = 'Контакты';
            document.querySelector('.header__nav li .language-btn a').textContent = 'Сменить язык?';
            // welcome
            document.querySelector('.welcome__links .link-primary').textContent = 'Связаться с менеджером';
            document.querySelector('.welcome__links .link').textContent = 'Узнать курс';
            // advantages
            document.querySelector('.advantages .title').textContent = 'О нас';
            document.querySelector('.advantages .subtitle').textContent = 'Наш обменник предоставляет быстрые, безопасные и выгодные услуги по обмену криптовалюты, фиатных и электронных валют. Мы понимаем важность прозрачности и надежности в финансовых операциях, поэтому предлагаем только проверенные и конкурентоспособные курсы обмена.';
            // services
            document.querySelector('.services .title').textContent = 'Узнать курс';
            document.querySelector('.services .subtitle').textContent = 'Наш обменник предоставляет актуальные курсы валют в режиме реального времени. Вы всегда будете в курсе самых выгодных предложений благодаря мгновенному обновлению информации. Узнайте текущий курс криптовалют, фиатных и электронных валют за несколько секунд и примите решение о выгодной сделке. Мы гарантируем прозрачность и точность данных, чтобы вы могли уверенно совершать обменные операции.';
            // footer
            document.querySelector('footer h4').textContent = 'Контакты';
            document.querySelector('.footer__copy p').textContent = 'По другим вопросам пишите на нашу почту - ***”@gmail.com';


        } else if (lang === 'en') {
            document.querySelector('.welcome__heading').textContent = 'We offer safe and favorable conditions for currency exchange';
            document.querySelector('.header__nav li.course a').textContent = 'Find out course';
            document.querySelector('.header__nav li.contacthref a').textContent = 'Contacts';
            document.querySelector('.header__nav li .language-btn a').textContent = 'Change language?';
            // welcome
            document.querySelector('.welcome__links .link-primary').textContent = 'Contact manager';
            document.querySelector('.welcome__links .link').textContent = 'Find out course';
            // advantages
            document.querySelector('.advantages .title').textContent = 'About us';
            document.querySelector('.advantages .subtitle').textContent = 'Our exchanger provides fast, safe and profitable services for exchanging cryptocurrency, fiat and electronic currencies. We understand the importance of transparency and reliability in financial transactions, so we offer only proven and competitive exchange rates.';
            // services
            document.querySelector('.services .title').textContent = 'Find out course';
            document.querySelector('.services .subtitle').textContent = 'Our exchanger provides current exchange rates in real time. You will always be aware of the most advantageous offers thanks to instant information updates. Find out the current exchange rate of cryptocurrencies, fiat and electronic currencies in a few seconds and decide on a profitable deal. We guarantee transparency and accuracy of data so that you can confidently make exchange transactions.';
            // footer
            document.querySelector('footer h4').textContent = 'Contacts';
            document.querySelector('.footer__copy p').textContent = 'For other questions, please write to our email - ***”@gmail.com';


        } else if (lang === 'es') {
            document.querySelector('.welcome__heading').textContent = 'Ofrecemos condiciones seguras y favorables para el intercambio de divisas';
            document.querySelector('.header__nav li.course a').textContent = 'Descubre el curso';
            document.querySelector('.header__nav li.contacthref a').textContent = 'Contactos';
            document.querySelector('.header__nav li .language-btn a').textContent = '¿Cambiar idioma?';
            // welcome
            document.querySelector('.welcome__links .link-primary').textContent = 'Gestor de contactos';
            document.querySelector('.welcome__links .link').textContent = 'Descubre el curso';
            // advantages
            document.querySelector('.advantages .title').textContent = 'Sobre nosotros';
            document.querySelector('.advantages .subtitle').textContent = 'Nuestro intercambiador ofrece servicios rápidos, seguros y rentables para intercambiar criptomonedas, monedas fiduciarias y electrónicas. Entendemos la importancia de la transparencia y la confiabilidad en las transacciones financieras, por lo que ofrecemos solo tipos de cambio probados y competitivos.';
            // services
            document.querySelector('.services .title').textContent = 'Descubre el curso';
            document.querySelector('.services .subtitle').textContent = 'Nuestro intercambiador proporciona los tipos de cambio actuales en tiempo real. Siempre estarás al tanto de las ofertas más ventajosas gracias a las actualizaciones instantáneas de la información. Descubre el tipo de cambio actual de criptomonedas, monedas fiduciarias y electrónicas en unos segundos y decide una operación rentable. Garantizamos la transparencia y la precisión de los datos para que puedas realizar transacciones de cambio con confianza.';
            // footer
            document.querySelector('footer h4').textContent = 'Contactos';
            document.querySelector('.footer__copy p').textContent = 'Para otras consultas, por favor escríbanos a nuestro correo electrónico - ***”@gmail.com';
            // Повторите для всех остальных текстов на странице
        }
    }
});