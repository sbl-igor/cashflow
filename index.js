AOS.init();

function getArgentinaDate() {
    const argentinaTime = new Date().toLocaleDateString('ru-RU', {
        timeZone: 'America/Argentina/Buenos_Aires',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    return argentinaTime;
}

document.querySelector('.rates-title span').textContent = `${getArgentinaDate()}`;

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
            document.querySelector('.popup-content h3').textContent = 'Выберите язык';
            // nav 
            document.querySelector('.welcome__heading').textContent = 'Мы предлагаем безопасные и выгодные условия для обмена валют';
            document.querySelector('.header__nav li.course a').textContent = 'Узнать курс';
            document.querySelector('.header__nav li.contacthref a').textContent = 'Контакты';
            document.querySelector('.header__nav .language-btn img').src = './img/icons-idiomas/ru.png';
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
            document.querySelector('.footer__copy p').innerHTML = 'Бот для заявок: <a id="CashflowArgExchange_botFooter" href="https://t.me/CashflowArgExchange_bot">@CashflowArgExchange_bot</a>';

            document.querySelector('.rates-title').innerHTML = '💰 Курс валют <span>' + document.querySelector('.rates-title span').textContent + '</span>:';

            // Элементы списка с курсами валют
            document.getElementById('usd-ars-value').closest('.usd-ars').innerHTML = '<strong>💲 USD/ARS:</strong> любая сумма - <span id="usd-ars-value"></span> песо ⚡️';
            document.getElementById('usdt-ars-value-1').closest('.usdt-ars').innerHTML = '<strong>💲 USDT/ARS:</strong> до 500 - <span id="usdt-ars-value-1"></span> песо<br>свыше 500 - <span id="usdt-ars-value-2"></span> песо ⚡️';
            document.getElementById('rub-ars-value').closest('.rub-ars').innerHTML = '<strong>🇷🇺 RUB/ARS:</strong> 10,000 рублей - <span id="rub-ars-value"></span> песо ⚡️';
            document.getElementById('rub-usd-value').closest('.rub-usd').innerHTML = '<strong>🇷🇺 RUB/USD:</strong> <span id="rub-usd-value"></span> рублей - 1 USD';
            document.getElementById('eur-ars-value').closest('.eur-ars').innerHTML = '<strong>💲 EUR/ARS:</strong> <span id="eur-ars-value"></span> песо';
            document.getElementById('kzt-ars-value').closest('.kzt-ars').innerHTML = '<strong>🇰🇿 KZT/ARS:</strong> 63,300 тенге - <span id="kzt-ars-value"></span> песо ⚡️';
            document.getElementById('usdt-usd-value').closest('.usdt-usd').innerHTML = '<strong>💵 USDT/USD:</strong> <span id="usdt-usd-value"></span> %';

            document.querySelector('.ex-rates').innerHTML = '💸 Обмен с грузинских/турецких<br>и др. счетов - пишите менеджеру';

            const dopInfoRate = document.querySelectorAll('.dop-info-rate li');
            dopInfoRate[0].textContent = '🚚 Доставка от 500 USD по городу - бесплатно';
            dopInfoRate[1].textContent = '🕖 График работы: с 8:00 до 20:00, доставка до 19:00';
            dopInfoRate[2].innerHTML = '😉 Для обмена пишите: <a id="svetlanacashflow" href="https://t.me/svetlanacashflow">@svetlanacashflow</a>';
            dopInfoRate[3].innerHTML = '🤖 Бот для заявок: <a id="CashflowArgExchange_bot" href="https://t.me/CashflowArgExchange_bot">@CashflowArgExchange_bot</a>';

            loadGoogleSheetData();

        } else if (lang === 'en') {
            document.querySelector('.popup-content h3').textContent = 'Select Language';

            document.querySelector('.welcome__heading').textContent = 'We offer safe and favorable conditions for currency exchange';
            document.querySelector('.header__nav li.course a').textContent = 'Find out course';
            document.querySelector('.header__nav li.contacthref a').textContent = 'Contacts';
            document.querySelector('.header__nav .language-btn img').src = './img/icons-idiomas/en.png';

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
            document.querySelector('.footer__copy p').innerHTML = 'Application bot: <a id="CashflowArgExchange_botFooter" href="https://t.me/CashflowArgExchange_bot">@CashflowArgExchange_bot</a>';
            
            document.querySelector('.rates-title').innerHTML = '💰 Exchange Rates <span>' + document.querySelector('.rates-title span').textContent + '</span>:';

            // Элементы списка с курсами валют
            document.getElementById('usd-ars-value').closest('.usd-ars').innerHTML = '<strong>💲 USD/ARS:</strong> any amount - <span id="usd-ars-value"></span> pesos ⚡️';
            document.getElementById('usdt-ars-value-1').closest('.usdt-ars').innerHTML = '<strong>💲 USDT/ARS:</strong> up to 500 - <span id="usdt-ars-value-1"></span> pesos<br>over 500 - <span id="usdt-ars-value-2"></span> pesos ⚡️';
            document.getElementById('rub-ars-value').closest('.rub-ars').innerHTML = '<strong>🇷🇺 RUB/ARS:</strong> 10,000 rubles - <span id="rub-ars-value"></span> pesos ⚡️';
            document.getElementById('rub-usd-value').closest('.rub-usd').innerHTML = '<strong>🇷🇺 RUB/USD:</strong> <span id="rub-usd-value"></span> rubles - 1 USD';
            document.getElementById('eur-ars-value').closest('.eur-ars').innerHTML = '<strong>💲 EUR/ARS:</strong> <span id="eur-ars-value"></span> pesos';
            document.getElementById('kzt-ars-value').closest('.kzt-ars').innerHTML = '<strong>🇰🇿 KZT/ARS:</strong> 63,300 tenge - <span id="kzt-ars-value"></span> pesos ⚡️';
            document.getElementById('usdt-usd-value').closest('.usdt-usd').innerHTML = '<strong>💵 USDT/USD:</strong> <span id="usdt-usd-value"></span> %';

            document.querySelector('.ex-rates').innerHTML = '💸 Exchange from Georgian/Turkish<br>and other accounts - contact the manager';

            const dopInfoRate = document.querySelectorAll('.dop-info-rate li');
            dopInfoRate[0].textContent = '🚚 Free delivery for amounts over 500 USD within the city';
            dopInfoRate[1].textContent = '🕖 Operating hours: 8:00 am to 8:00 pm, delivery until 7:00 pm';
            dopInfoRate[2].innerHTML = '😉 For exchanges, contact: <a id="svetlanacashflow" href="https://t.me/svetlanacashflow">@svetlanacashflow</a>';
            dopInfoRate[3].innerHTML = '🤖 Application bot: <a id="CashflowArgExchange_bot" href="https://t.me/CashflowArgExchange_bot">@CashflowArgExchange_bot</a>';

            loadGoogleSheetData();

        } else if (lang === 'es') {
            document.querySelector('.popup-content h3').textContent = 'Seleccionar idioma';

            document.querySelector('.welcome__heading').textContent = 'Ofrecemos condiciones seguras y favorables para el intercambio de divisas';
            document.querySelector('.header__nav li.course a').textContent = 'Descubre el curso';
            document.querySelector('.header__nav li.contacthref a').textContent = 'Contactos';
            document.querySelector('.header__nav .language-btn img').src = './img/icons-idiomas/es.png';

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
            document.querySelector('.footer__copy p').innerHTML = 'Bot para solicitudes: <a id="CashflowArgExchange_botFooter" href="https://t.me/CashflowArgExchange_bot">@CashflowArgExchange_bot</a>';
            // Повторите для всех остальных текстов на странице

            document.querySelector('.rates-title').innerHTML = '💰 Tasa de cambio <span>' + document.querySelector('.rates-title span').textContent + '</span>:'; 

            // Элементы списка с курсами валют 
            document.getElementById('usd-ars-value').closest('.usd-ars').innerHTML = '<strong>💲 USD/ARS:</strong> cualquier monto - <span id="usd-ars-value"></span> pesos ⚡️'; 
            document.getElementById('usdt-ars-value-1').closest('.usdt-ars').innerHTML = '<strong>💲 USDT/ARS:</strong> hasta 500 - <span id="usdt-ars-value-1"></span> pesos<br>más de 500 - <span id="usdt-ars-value-2"></span> pesos ⚡️'; 
            document.getElementById('rub-ars-value').closest('.rub-ars').innerHTML = '<strong>🇷🇺 RUB/ARS:</strong> 10,000 rublos - <span id="rub-ars-value"></span> pesos ⚡️'; 
            document.getElementById('rub-usd-value').closest('.rub-usd').innerHTML = '<strong>🇷🇺 RUB/USD:</strong> <span id="rub-usd-value"></span> rublos - 1 USD'; 
            document.getElementById('eur-ars-value').closest('.eur-ars').innerHTML = '<strong>💲 EUR/ARS:</strong> <span id="eur-ars-value"></span> pesos'; 
            document.getElementById('kzt-ars-value').closest('.kzt-ars').innerHTML = '<strong>🇰🇿 KZT/ARS:</strong> 63,300 tenge - <span id="kzt-ars-value"></span> pesos ⚡️'; 
            document.getElementById('usdt-usd-value').closest('.usdt-usd').innerHTML = '<strong>💵 USDT/USD:</strong> <span id="usdt-usd-value"></span> %'; 
            
            document.querySelector('.ex-rates').innerHTML = '💸 Cambio desde cuentas georgianas/turcas<br>y otras cuentas - contacta al gerente'; 
            
            const dopInfoRate = document.querySelectorAll('.dop-info-rate li'); 
            dopInfoRate[0].textContent = '🚚 Entrega gratis para montos mayores a 500 USD en la ciudad.'; 
            dopInfoRate[1].textContent = '🕖 Horario de atención: de 8:00 a 20:00, entrega hasta las 19:00'; 
            dopInfoRate[2].innerHTML = '😉 Para cambios, contacta: <a id="svetlanacashflow" href="https://t.me/svetlanacashflow">@svetlanacashflow</a>'; 
            dopInfoRate[3].innerHTML = '🤖 Bot para solicitudes: <a id="CashflowArgExchange_bot" href="https://t.me/CashflowArgExchange_bot">@CashflowArgExchange_bot</a>'; 
            
            loadGoogleSheetData();            
        }
    }
});