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
            // registration
            document.getElementById('btn-registration').textContent = 'Регистрация';
            document.getElementById('btn-login').textContent = 'Вход';
            document.querySelector('#popup-registration h2').textContent = 'Регистрация';
            document.querySelector('#form-registration button').textContent = 'Зарегистрироваться';
            document.querySelector('#popup-login h2').textContent = 'Вход';
            document.querySelector('#form-login button').textContent = 'Войти';
            document.getElementById('reg-name').placeholder = 'Имя';
            document.getElementById('reg-email').placeholder = 'Email';
            document.getElementById('reg-password').placeholder = 'Пароль';
            document.getElementById('reg-referral-code').placeholder = 'Реферальный код (необязательно)';
            

            // // Получаем текущие динамические данные (они должны быть в <span>)
            // // Если данные уже там, мы их сохраняем. Если нет — используем пустую строку.
            // const currentName = document.getElementById('auth-user-name').textContent || '';
            // const currentCode = document.getElementById('auth-referral-code').textContent || '';
            // const currentDiscount = document.getElementById('auth-user-discount').textContent.replace('Скидка: ', '') || '0%';
            
            // // --- ИСПРАВЛЕНИЕ: ПЕРЕЗАПИСЬ С СОХРАНЕНИЕМ ДАННЫХ ---
            
            // // 1. Приветствие
            // // Перезаписываем весь HTML, но вставляем сохраненное имя обратно в <span>
            // document.getElementById('user-greeting').innerHTML = `Привет, <span id="auth-user-name">${currentName}</span>!`;
            
            // // 2. Реферальная информация
            // // Перезаписываем весь HTML, но вставляем сохраненный код и скидку обратно
            // document.getElementById('referral-info').innerHTML = 
            //     `Код: <span id="auth-referral-code">${currentCode}</span><br><span id="auth-user-discount">Скидка: ${currentDiscount}</span>`;
                
            // // 3. Кнопка выхода (просто textContent)
            document.getElementById('btn-logout').textContent = 'Выход';


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
            // pickup
            document.querySelector('.pickup .title').textContent = 'Как обменять валюту с CashFlow';
            document.querySelector('.pickup .subtitle').textContent = 'Как обменять валюту с CashFlow';
            document.querySelector('.pickup-instruction__item-title .pickup-instruction__item-subtitle').textContent = 'Как обменять валюту с CashFlow';

            document.querySelector('#guide1 .pickup-instruction__item-subtitle').textContent = 'Напиши нам в WhatsApp';          
            document.querySelector('#guide1 .pickup-instruction__item-title-text').innerHTML = 'Что написать:<br>Привет! Хочу обменять валюту.<br>Укажи, пожалуйста, сумму и валюту, которую хочешь обменять, а также город (Буэнос-Айрес) и способ получения — самовывоз или доставка.'; 

            document.querySelector('.pickup-instruction__item-title-miniinfo').textContent = 'Наши менеджеры разговаривают на испанском, английском, русском и португальском языке.'


            document.querySelector('#guide2 .pickup-instruction__item-subtitle').textContent = 'Получи актуальный курс';          
            document.querySelector('#guide2 .pickup-instruction__item-title-text').innerHTML = 'Мы вышлем свежие курсы — они могут немного меняться в течение дня'; 

            document.querySelector('#guide3 .pickup-instruction__item-subtitle').textContent = 'Договорись о времени';          
            document.querySelector('#guide3 .pickup-instruction__item-title-text').innerHTML = 'Если выбираешь самовывоз, мы работаем по записи по адресу: Tucumán 1484, CABA (центр). Приходи строго в назначенное время!<br>';          
            document.querySelector('#guide3 .pickup-instruction__item-title-list').innerHTML = 'Если нужна доставка, согласуем удобный адрес, сумму и время.<li>• От 100 до 500 USD — доставка 3000 ARS</li><li>• От 500 USD — бесплатно</li><li>• Срочная доставка — 5 USD</li>';    
            
            document.querySelector('#guide4 .pickup-instruction__item-subtitle').textContent = 'Подтверди детали';          
            document.querySelector('#guide4 .pickup-instruction__item-title-text').innerHTML = 'После согласования мы пришлём тебе единым сообщением все детали:<br>курс, адрес или имя курьера, точную сумму, а также стоимость доставки, если она есть.'

            document.querySelector('#guide5 .pickup-instruction__item-subtitle').textContent = 'Обмен на месте';          
            document.querySelector('#guide5 .pickup-instruction__item-title-text').innerHTML = 'Самовывоз — приходишь, обмениваем, всё чётко<br>Доставка — обмен прямо у двери<br>'

            // map
            document.querySelector('.map .title').textContent = 'Где нас можно найти?';          
            document.querySelector('.map .subtitle').innerHTML = 'Хотите забрать заказ лично? Без проблем — мы всегда рады видеть вас!<br>Наш пункт самовывоза находится всего в одном квартале от Teatro Colón —<br><a href="https://www.google.com/maps?q=Tucumán+1484,+C1050AAD,+Buenos+Aires" target="_blank" style="font-weight: bold">Tucumán 1484, C1050AAD Cdad. Autónoma de Buenos Aires</a>.';          

            // footer
            document.querySelector('footer h4').textContent = 'Контакты';
            document.querySelector('.footer__copy p').innerHTML = 'Бот для заявок: <a id="CashflowArgExchange_botFooter" href="https://t.me/CashflowArgExchange_bot">@CashflowArgExchange_bot</a>';

            document.querySelector('.rates-title').innerHTML = 'Курс валют <span>' + document.querySelector('.rates-title span').textContent + '</span>:';
            document.getElementById('tel-id').innerHTML = '<p class="footer_telephone">Связаться по телефону</p>';

            // Элементы списка с курсами валют
            document.getElementById('usd-ars-value').closest('.usd-ars').innerHTML = '<strong>USD/ARS:</strong> любая сумма - <span id="usd-ars-value"></span> песо';
            document.getElementById('usdt-ars-value-1').closest('.usdt-ars').innerHTML = '<strong>USDT/ARS:</strong> до 500 - <span id="usdt-ars-value-1"></span> песо<br>свыше 500 - <span id="usdt-ars-value-2"></span> песо';
            document.getElementById('rub-ars-value').closest('.rub-ars').innerHTML = '<strong>RUB/ARS:</strong> 10,000 рублей - <span id="rub-ars-value"></span> песо';
            document.getElementById('rub-usd-value').closest('.rub-usd').innerHTML = '<strong>RUB/USD:</strong> <span id="rub-usd-value"></span> рублей - 1 USD';
            document.getElementById('eur-ars-value').closest('.eur-ars').innerHTML = '<strong>EUR/ARS:</strong> <span id="eur-ars-value"></span> песо - 1 EUR';
            document.getElementById('kzt-ars-value').closest('.kzt-ars').innerHTML = '<strong>KZT/ARS:</strong> 63,300 тенге - <span id="kzt-ars-value"></span> песо';
            document.getElementById('usdt-usd-value').closest('.usdt-usd').innerHTML = '<strong>USDT/USD:</strong> <span id="usdt-usd-value"></span> %';

            document.querySelector('.ex-rates').innerHTML = 'Обмен с грузинских/турецких<br>и др. счетов - пишите менеджеру';

            const dopInfoRate = document.querySelectorAll('.dop-info-rate li');
            dopInfoRate[0].innerHTML = '<img class="icon-smile" src="./img/icons-smiles/truck.svg" alt="truck"> Доставка от 500 USD по городу - бесплатно';
            dopInfoRate[1].innerHTML = '<img class="icon-smile" src="./img/icons-smiles/alarm.svg" alt="alarm"> График работы: с 8:00 до 20:00, доставка до 19:00';
            dopInfoRate[2].innerHTML = '<img class="icon-smile" src="./img/icons-smiles/exchange.svg" alt="exchange">  Для обмена пишите: <a id="svetlanacashflow" href="https://t.me/svetlanacashflow">@svetlanacashflow</a>';
            dopInfoRate[3].innerHTML = '<img class="icon-smile" src="./img/icons-smiles/robot.svg" alt="robot"> Бот для заявок: <a id="CashflowArgExchange_bot" href="https://t.me/CashflowArgExchange_bot">@CashflowArgExchange_bot</a>';

            loadGoogleSheetData();

        } else if (lang === 'en') {
            // registration
            document.getElementById('btn-registration').textContent = 'Register';
            document.getElementById('btn-login').textContent = 'Login';
            document.querySelector('#popup-registration h2').textContent = 'Register';
            document.querySelector('#form-registration button').textContent = 'Register';
            document.querySelector('#popup-login h2').textContent = 'Login';
            document.querySelector('#form-login button').textContent = 'Login';
            document.getElementById('reg-name').placeholder = 'Name';
            document.getElementById('reg-email').placeholder = 'Email';
            document.getElementById('reg-password').placeholder = 'Password';
            document.getElementById('reg-referral-code').placeholder = 'Referral code (optional)';

            // // Получаем текущие динамические данные (они должны быть в <span>)
            // // Если данные уже там, мы их сохраняем. Если нет — используем пустую строку.
            // const currentName = document.getElementById('auth-user-name').textContent || '';
            // const currentCode = document.getElementById('auth-referral-code').textContent || '';
            // const currentDiscount = document.getElementById('auth-user-discount').textContent.replace('Скидка: ', '') || '0%';
            
            // // --- ИСПРАВЛЕНИЕ: ПЕРЕЗАПИСЬ С СОХРАНЕНИЕМ ДАННЫХ ---
            
            // // 1. Приветствие
            // // Перезаписываем весь HTML, но вставляем сохраненное имя обратно в <span>
            // document.getElementById('user-greeting').innerHTML = `Hello, <span id="auth-user-name">${currentName}</span>!`;
            
            // // 2. Реферальная информация
            // // Перезаписываем весь HTML, но вставляем сохраненный код и скидку обратно
            // document.getElementById('referral-info').innerHTML = 
            //     `Code: <span id="auth-referral-code">${currentCode}</span><br><span id="auth-user-discount">Discount: ${currentDiscount}</span>`;
                
            // // 3. Кнопка выхода (просто textContent)
            document.getElementById('btn-logout').textContent = 'Log out';


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
            // pickup
            document.querySelector('.pickup .title').textContent = 'How to exchange currency with CashFlow';
            document.querySelector('.pickup .subtitle').textContent = 'How to exchange currency with CashFlow';
            document.querySelector('.pickup-instruction__item-title .pickup-instruction__item-subtitle').textContent = 'How to exchange currency with CashFlow';

            document.querySelector('#guide1 .pickup-instruction__item-subtitle').textContent = 'Message us on WhatsApp';
            document.querySelector('#guide1 .pickup-instruction__item-title-text').innerHTML = 'What to write:<br>Hello! I’d like to exchange currency.<br>Please specify the amount and currency you want to exchange, as well as the city (Buenos Aires) and the preferred method — pickup or delivery.';

            document.querySelector('.pickup-instruction__item-title-miniinfo').textContent = 'Our managers speak Spanish, English, Russian and Portuguese.';

            document.querySelector('#guide2 .pickup-instruction__item-subtitle').textContent = 'Get the current rate';
            document.querySelector('#guide2 .pickup-instruction__item-title-text').innerHTML = 'We’ll send you the latest rates — they may slightly change throughout the day.';

            document.querySelector('#guide3 .pickup-instruction__item-subtitle').textContent = 'Arrange the time';
            document.querySelector('#guide3 .pickup-instruction__item-title-text').innerHTML = 'If you choose pickup, we work by appointment at: Tucumán 1484, CABA (center). Please come exactly at the agreed time!<br>';
            document.querySelector('#guide3 .pickup-instruction__item-title-list').innerHTML = 'If you prefer delivery, we’ll coordinate the address, amount, and time.<li>• From 100 to 500 USD — delivery 3000 ARS</li><li>• From 500 USD — free</li><li>• Express delivery — 5 USD</li>';

            document.querySelector('#guide4 .pickup-instruction__item-subtitle').textContent = 'Confirm the details';
            document.querySelector('#guide4 .pickup-instruction__item-title-text').innerHTML = 'Once everything is confirmed, we’ll send you all the details in one message:<br>rate, address or courier’s name, exact amount, and delivery cost if applicable.';

            document.querySelector('#guide5 .pickup-instruction__item-subtitle').textContent = 'Exchange on the spot';
            document.querySelector('#guide5 .pickup-instruction__item-title-text').innerHTML = 'Pickup — you come, we exchange, all smooth<br>Delivery — exchange happens right at your door<br>';

            // map
            document.querySelector('.map .title').textContent = 'Where to find us?';
            document.querySelector('.map .subtitle').innerHTML = 'Want to pick up your order in person? No problem — we’re always happy to see you!<br>Our pickup point is just one block from Teatro Colón —<br><a href="https://www.google.com/maps?q=Tucumán+1484,+C1050AAD,+Buenos+Aires" target="_blank" style="font-weight: bold">Tucumán 1484, C1050AAD Cdad. Autónoma de Buenos Aires</a>.';
   
            // footer
            document.querySelector('footer h4').textContent = 'Contacts';
            document.querySelector('.footer__copy p').innerHTML = 'Application bot: <a id="CashflowArgExchange_botFooter" href="https://t.me/CashflowArgExchange_bot">@CashflowArgExchange_bot</a>';
            
            document.querySelector('.rates-title').innerHTML = 'Exchange Rates <span>' + document.querySelector('.rates-title span').textContent + '</span>:';
            document.getElementById('tel-id').innerHTML = '<p class="footer_telephone">Contact by phone</p>';

            // Элементы списка с курсами валют
            document.getElementById('usd-ars-value').closest('.usd-ars').innerHTML = '<strong>USD/ARS:</strong> any amount - <span id="usd-ars-value"></span> pesos';
            document.getElementById('usdt-ars-value-1').closest('.usdt-ars').innerHTML = '<strong>USDT/ARS:</strong> up to 500 - <span id="usdt-ars-value-1"></span> pesos<br>over 500 - <span id="usdt-ars-value-2"></span> pesos';
            document.getElementById('rub-ars-value').closest('.rub-ars').innerHTML = '<strong>RUB/ARS:</strong> 10,000 rubles - <span id="rub-ars-value"></span> pesos';
            document.getElementById('rub-usd-value').closest('.rub-usd').innerHTML = '<strong>RUB/USD:</strong> <span id="rub-usd-value"></span> rubles - 1 USD';
            document.getElementById('eur-ars-value').closest('.eur-ars').innerHTML = '<strong>EUR/ARS:</strong> <span id="eur-ars-value"></span> pesos - 1 EUR';
            document.getElementById('kzt-ars-value').closest('.kzt-ars').innerHTML = '<strong>KZT/ARS:</strong> 63,300 tenge - <span id="kzt-ars-value"></span> pesos';
            document.getElementById('usdt-usd-value').closest('.usdt-usd').innerHTML = '<strong>USDT/USD:</strong> <span id="usdt-usd-value"></span> %';

            document.querySelector('.ex-rates').innerHTML = 'Exchange from Georgian/Turkish<br>and other accounts - contact the manager';

            const dopInfoRate = document.querySelectorAll('.dop-info-rate li');
            dopInfoRate[0].innerHTML = '<img class="icon-smile" src="./img/icons-smiles/truck.svg" alt="truck"> Free delivery for amounts over 500 USD within the city';
            dopInfoRate[1].innerHTML = '<img class="icon-smile" src="./img/icons-smiles/alarm.svg" alt="alarm"> Operating hours: 8:00 am to 8:00 pm, delivery until 7:00 pm';
            dopInfoRate[2].innerHTML = '<img class="icon-smile" src="./img/icons-smiles/exchange.svg" alt="exchange"> For exchanges, contact: <a id="svetlanacashflow" href="https://t.me/svetlanacashflow">@svetlanacashflow</a>';
            dopInfoRate[3].innerHTML = '<img class="icon-smile" src="./img/icons-smiles/robot.svg" alt="robot"> Application bot: <a id="CashflowArgExchange_bot" href="https://t.me/CashflowArgExchange_bot">@CashflowArgExchange_bot</a>';

            loadGoogleSheetData();

        } else if (lang === 'es') {
            // registration
            document.getElementById('btn-registration').textContent = 'Registrarse';
            document.getElementById('btn-login').textContent = 'Iniciar sesión';
            document.querySelector('#popup-registration h2').textContent = 'Registrarse';
            document.querySelector('#form-registration button').textContent = 'Registrarse';
            document.querySelector('#popup-login h2').textContent = 'Iniciar sesión';
            document.querySelector('#form-login button').textContent = 'Iniciar sesión';
            document.getElementById('reg-name').placeholder = 'Nombre';
            document.getElementById('reg-email').placeholder = 'Correo electrónico';
            document.getElementById('reg-password').placeholder = 'Contraseña';
            document.getElementById('reg-referral-code').placeholder = 'Código de referencia (opcional)';


            // // Получаем текущие динамические данные (они должны быть в <span>)
            // // Если данные уже там, мы их сохраняем. Если нет — используем пустую строку.
            // const currentName = document.getElementById('auth-user-name').textContent || '';
            // const currentCode = document.getElementById('auth-referral-code').textContent || '';
            // const currentDiscount = document.getElementById('auth-user-discount').textContent.replace('Скидка: ', '') || '0%';
            
            // // --- ИСПРАВЛЕНИЕ: ПЕРЕЗАПИСЬ С СОХРАНЕНИЕМ ДАННЫХ ---
            
            // // 1. Приветствие
            // // Перезаписываем весь HTML, но вставляем сохраненное имя обратно в <span>
            // document.getElementById('user-greeting').innerHTML = `Hola, <span id="auth-user-name">${currentName}</span>!`;
            
            // // 2. Реферальная информация
            // // Перезаписываем весь HTML, но вставляем сохраненный код и скидку обратно
            // document.getElementById('referral-info').innerHTML = 
            //     `Código: <span id="auth-referral-code">${currentCode}</span><br><span id="auth-user-discount">Descuento: ${currentDiscount}</span>`;
                
            // // 3. Кнопка выхода (просто textContent)
            document.getElementById('btn-logout').textContent = 'Finalizar';


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
            // pickup
            document.querySelector('.pickup .title').textContent = 'Cómo cambiar divisas con CashFlow';
            document.querySelector('.pickup .subtitle').textContent = 'Cómo cambiar divisas con CashFlow';
            document.querySelector('.pickup-instruction__item-title .pickup-instruction__item-subtitle').textContent = 'Cómo cambiar divisas con CashFlow';

            document.querySelector('#guide1 .pickup-instruction__item-subtitle').textContent = 'Escríbenos por WhatsApp';
            document.querySelector('#guide1 .pickup-instruction__item-title-text').innerHTML = 'Qué escribir:<br>¡Hola! Quiero cambiar divisas.<br>Por favor, indica el monto y la moneda que deseas cambiar, así como la ciudad (Buenos Aires) y el método preferido — retiro o entrega.';

            document.querySelector('.pickup-instruction__item-title-miniinfo').textContent = 'Nuestros gerentes hablan español, inglés, ruso y portugués.';

            document.querySelector('#guide2 .pickup-instruction__item-subtitle').textContent = 'Recibe la tasa actual';
            document.querySelector('#guide2 .pickup-instruction__item-title-text').innerHTML = 'Te enviaremos las tasas actualizadas — pueden variar ligeramente durante el día.';

            document.querySelector('#guide3 .pickup-instruction__item-subtitle').textContent = 'Coordina el horario';
            document.querySelector('#guide3 .pickup-instruction__item-title-text').innerHTML = 'Si eliges retiro, trabajamos con cita previa en: Tucumán 1484, CABA (centro). ¡Llega puntual a la hora acordada!<br>';
            document.querySelector('#guide3 .pickup-instruction__item-title-list').innerHTML = 'Si prefieres entrega, coordinaremos la dirección, el monto y la hora.<li>• De 100 a 500 USD — entrega 3000 ARS</li><li>• Desde 500 USD — gratis</li><li>• Entrega urgente — 5 USD</li>';

            document.querySelector('#guide4 .pickup-instruction__item-subtitle').textContent = 'Confirma los detalles';
            document.querySelector('#guide4 .pickup-instruction__item-title-text').innerHTML = 'Una vez confirmado todo, te enviaremos todos los detalles en un solo mensaje:<br>tasa, dirección o nombre del mensajero, monto exacto y costo de entrega (si aplica).';

            document.querySelector('#guide5 .pickup-instruction__item-subtitle').textContent = 'Cambio en el momento';
            document.querySelector('#guide5 .pickup-instruction__item-title-text').innerHTML = 'Retiro — llegás, cambiamos, todo rápido<br>Entrega — el cambio se hace directamente en tu puerta<br>';

            // map
            document.querySelector('.map .title').textContent = '¿Dónde encontrarnos?';
            document.querySelector('.map .subtitle').innerHTML = '¿Querés retirar tu pedido en persona? ¡Sin problema! Siempre estamos felices de recibirte.<br>Nuestro punto de retiro está a solo una cuadra del Teatro Colón —<br><a href="https://www.google.com/maps?q=Tucumán+1484,+C1050AAD,+Buenos+Aires" target="_blank" style="font-weight: bold">Tucumán 1484, C1050AAD Cdad. Autónoma de Buenos Aires</a>.';

            // footer
            document.querySelector('footer h4').textContent = 'Contactos';
            document.querySelector('.footer__copy p').innerHTML = 'Bot para solicitudes: <a id="CashflowArgExchange_botFooter" href="https://t.me/CashflowArgExchange_bot">@CashflowArgExchange_bot</a>';
            // Повторите для всех остальных текстов на странице

            document.querySelector('.rates-title').innerHTML = 'Tasa de cambio <span>' + document.querySelector('.rates-title span').textContent + '</span>:'; 
            document.getElementById('tel-id').innerHTML = '<p class="footer_telephone">Contactar por teléfono</p>';

            // Элементы списка с курсами валют 
            document.getElementById('usd-ars-value').closest('.usd-ars').innerHTML = '<strong>USD/ARS:</strong> cualquier monto - <span id="usd-ars-value"></span> pesos'; 
            document.getElementById('usdt-ars-value-1').closest('.usdt-ars').innerHTML = '<strong>USDT/ARS:</strong> hasta 500 - <span id="usdt-ars-value-1"></span> pesos<br>más de 500 - <span id="usdt-ars-value-2"></span> pesos'; 
            document.getElementById('rub-ars-value').closest('.rub-ars').innerHTML = '<strong>RUB/ARS:</strong> 10,000 rublos - <span id="rub-ars-value"></span> pesos'; 
            document.getElementById('rub-usd-value').closest('.rub-usd').innerHTML = '<strong>RUB/USD:</strong> <span id="rub-usd-value"></span> rublos - 1 USD'; 
            document.getElementById('eur-ars-value').closest('.eur-ars').innerHTML = '<strong>EUR/ARS:</strong> <span id="eur-ars-value"></span> pesos - 1 EUR'; 
            document.getElementById('kzt-ars-value').closest('.kzt-ars').innerHTML = '<strong>KZT/ARS:</strong> 63,300 tenge - <span id="kzt-ars-value"></span> pesos'; 
            document.getElementById('usdt-usd-value').closest('.usdt-usd').innerHTML = '<strong>USDT/USD:</strong> <span id="usdt-usd-value"></span> %'; 
            
            document.querySelector('.ex-rates').innerHTML = 'Cambio desde cuentas georgianas/turcas<br>y otras cuentas - contacta al gerente'; 
            
            const dopInfoRate = document.querySelectorAll('.dop-info-rate li'); 
            dopInfoRate[0].innerHTML = '<img class="icon-smile" src="./img/icons-smiles/truck.svg" alt="truck"> Entrega gratis para montos mayores a 500 USD en la ciudad.'; 
            dopInfoRate[1].innerHTML = '<img class="icon-smile" src="./img/icons-smiles/alarm.svg" alt="alarm"> Horario de atención: de 8:00 a 20:00, entrega hasta las 19:00'; 
            dopInfoRate[2].innerHTML = '<img class="icon-smile" src="./img/icons-smiles/exchange.svg" alt="exchange"> Para cambios, contacta: <a id="svetlanacashflow" href="https://t.me/svetlanacashflow">@svetlanacashflow</a>'; 
            dopInfoRate[3].innerHTML = '<img class="icon-smile" src="./img/icons-smiles/robot.svg" alt="robot"> Bot para solicitudes: <a id="CashflowArgExchange_bot" href="https://t.me/CashflowArgExchange_bot">@CashflowArgExchange_bot</a>'; 
            
            loadGoogleSheetData();            
        } else if (lang === 'pt') {
            // registration
            document.getElementById('btn-registration').textContent = 'Cadastre-se';
            document.getElementById('btn-login').textContent = 'Entrar';
            document.querySelector('#popup-registration h2').textContent = 'Cadastre-se';
            document.querySelector('#form-registration button').textContent = 'Cadastre-se';
            document.querySelector('#popup-login h2').textContent = 'Entrar';
            document.querySelector('#form-login button').textContent = 'Entrar';
            document.getElementById('reg-name').placeholder = 'Nome';
            document.getElementById('reg-email').placeholder = 'E-mail';
            document.getElementById('reg-password').placeholder = 'Senha';
            document.getElementById('reg-referral-code').placeholder = 'Código de referência (opcional)';

            // // Получаем текущие динамические данные (они должны быть в <span>)
            // // Если данные уже там, мы их сохраняем. Если нет — используем пустую строку.
            // const currentName = document.getElementById('auth-user-name').textContent || '';
            // const currentCode = document.getElementById('auth-referral-code').textContent || '';
            // const currentDiscount = document.getElementById('auth-user-discount').textContent.replace('Скидка: ', '') || '0%';
            
            // // --- ИСПРАВЛЕНИЕ: ПЕРЕЗАПИСЬ С СОХРАНЕНИЕМ ДАННЫХ ---
            
            // // 1. Приветствие
            // // Перезаписываем весь HTML, но вставляем сохраненное имя обратно в <span>
            // document.getElementById('user-greeting').innerHTML = `Olá, <span id="auth-user-name">${currentName}</span>!`;
            
            // // 2. Реферальная информация
            // // Перезаписываем весь HTML, но вставляем сохраненный код и скидку обратно
            // document.getElementById('referral-info').innerHTML = 
            //     `Código: <span id="auth-referral-code">${currentCode}</span><br><span id="auth-user-discount">Desconto: ${currentDiscount}</span>`;
                
            // // 3. Кнопка выхода (просто textContent)
            document.getElementById('btn-logout').textContent = 'Terminar';
            

            document.querySelector('.popup-content h3').textContent = 'Selecionar idioma';

            document.querySelector('.welcome__heading').textContent = 'Oferecemos condições seguras e vantajosas para troca de moedas';
            document.querySelector('.header__nav li.course a').textContent = 'Ver taxa';
            document.querySelector('.header__nav li.contacthref a').textContent = 'Contatos';
            document.querySelector('.header__nav .language-btn img').src = './img/icons-idiomas/pt.png';
            
            // welcome
            document.querySelector('.welcome__links .link-primary').textContent = 'Gerente de contato';
            document.querySelector('.welcome__links .link').textContent = 'Ver taxa';
            // advantages
            document.querySelector('.advantages .title').textContent = 'Sobre nós';
            document.querySelector('.advantages .subtitle').textContent = 'Nosso serviço de câmbio oferece operações rápidas, seguras e vantajosas com criptomoedas, moedas fiduciárias e eletrônicas. Entendemos a importância da transparência e da confiança em transações financeiras, por isso oferecemos apenas taxas confiáveis e competitivas.';
            // services
            document.querySelector('.services .title').textContent = 'Ver taxa';
            document.querySelector('.services .subtitle').textContent = 'Nosso serviço fornece taxas de câmbio em tempo real. Você sempre terá acesso às melhores ofertas graças às atualizações instantâneas. Descubra a taxa atual de criptomoedas, moedas fiduciárias e eletrônicas em segundos e realize uma operação vantajosa. Garantimos transparência e precisão nas informações para que você possa trocar com confiança.';
            // pickup
            document.querySelector('.pickup .title').textContent = 'Como trocar moeda com a CashFlow';
            document.querySelector('.pickup .subtitle').textContent = 'Como trocar moeda com a CashFlow';
            document.querySelector('.pickup-instruction__item-title .pickup-instruction__item-subtitle').textContent = 'Como trocar moeda com a CashFlow';
            
            document.querySelector('#guide1 .pickup-instruction__item-subtitle').textContent = 'Nos envie mensagem pelo WhatsApp';
            document.querySelector('#guide1 .pickup-instruction__item-title-text').innerHTML = 'O que escrever:<br>Olá! Gostaria de trocar moeda.<br>Por favor, informe o valor e a moeda, a cidade (Buenos Aires) e o método preferido — retirada ou entrega.';
            
            document.querySelector('.pickup-instruction__item-title-miniinfo').textContent = 'Nossos gerentes falam espanhol, inglês, russo e português.';

            document.querySelector('#guide2 .pickup-instruction__item-subtitle').textContent = 'Receba a taxa atual';
            document.querySelector('#guide2 .pickup-instruction__item-title-text').innerHTML = 'Enviaremos a taxa atual — ela pode variar levemente ao longo do dia.';
            
            document.querySelector('#guide3 .pickup-instruction__item-subtitle').textContent = 'Combine o horário';
            document.querySelector('#guide3 .pickup-instruction__item-title-text').innerHTML = 'Se escolher retirada, atendemos com horário marcado em: Tucumán 1484, CABA (centro). Por favor, chegue pontualmente no horário combinado!<br>';
            document.querySelector('#guide3 .pickup-instruction__item-title-list').innerHTML = 'Se preferir entrega, vamos combinar o endereço, valor e horário.<li>• De 100 a 500 USD — entrega por 3000 ARS</li><li>• A partir de 500 USD — grátis</li><li>• Entrega expressa — 5 USD</li>';
            
            document.querySelector('#guide4 .pickup-instruction__item-subtitle').textContent = 'Confirme os detalhes';
            document.querySelector('#guide4 .pickup-instruction__item-title-text').innerHTML = 'Depois de confirmar tudo, enviaremos os detalhes em uma única mensagem:<br>taxa, endereço ou nome do entregador, valor exato e custo de entrega, se houver.';
            
            document.querySelector('#guide5 .pickup-instruction__item-subtitle').textContent = 'Troca no local';
            document.querySelector('#guide5 .pickup-instruction__item-title-text').innerHTML = 'Retirada — você vem, trocamos, tudo tranquilo<br>Entrega — a troca acontece diretamente na sua porta<br>';
            
            // map
            document.querySelector('.map .title').textContent = 'Onde nos encontrar?';
            document.querySelector('.map .subtitle').innerHTML = 'Quer retirar seu pedido pessoalmente? Sem problema — será um prazer te receber!<br>Nosso ponto de retirada fica a apenas uma quadra do Teatro Colón —<br><a href="https://www.google.com/maps?q=Tucumán+1484,+C1050AAD,+Buenos+Aires" target="_blank" style="font-weight: bold">Tucumán 1484, C1050AAD Cdad. Autónoma de Buenos Aires</a>.';
            
            // footer
            document.querySelector('footer h4').textContent = 'Contatos';
            document.querySelector('.footer__copy p').innerHTML = 'Bot para solicitações: <a id="CashflowArgExchange_botFooter" href="https://t.me/CashflowArgExchange_bot">@CashflowArgExchange_bot</a>';
            
            document.querySelector('.rates-title').innerHTML = 'Taxa de câmbio <span>' + document.querySelector('.rates-title span').textContent + '</span>:';
            document.getElementById('tel-id').innerHTML = '<p class="footer_telephone">Contatar por telefone</p>';
            
            // Lista de taxas de câmbio
            document.getElementById('usd-ars-value').closest('.usd-ars').innerHTML = '<strong>USD/ARS:</strong> qualquer valor - <span id="usd-ars-value"></span> pesos';
            document.getElementById('usdt-ars-value-1').closest('.usdt-ars').innerHTML = '<strong>USDT/ARS:</strong> até 500 - <span id="usdt-ars-value-1"></span> pesos<br>acima de 500 - <span id="usdt-ars-value-2"></span> pesos';
            document.getElementById('rub-ars-value').closest('.rub-ars').innerHTML = '<strong>RUB/ARS:</strong> 10.000 rublos - <span id="rub-ars-value"></span> pesos';
            document.getElementById('rub-usd-value').closest('.rub-usd').innerHTML = '<strong>RUB/USD:</strong> <span id="rub-usd-value"></span> rublos - 1 USD';
            document.getElementById('eur-ars-value').closest('.eur-ars').innerHTML = '<strong>EUR/ARS:</strong> <span id="eur-ars-value"></span> pesos - 1 EUR';
            document.getElementById('kzt-ars-value').closest('.kzt-ars').innerHTML = '<strong>KZT/ARS:</strong> 63.300 tenges - <span id="kzt-ars-value"></span> pesos';
            document.getElementById('usdt-usd-value').closest('.usdt-usd').innerHTML = '<strong>USDT/USD:</strong> <span id="usdt-usd-value"></span> %';
            
            document.querySelector('.ex-rates').innerHTML = 'Troca de contas georgianas/turcas<br>e outras contas — entre em contato com o gerente';
            
            const dopInfoRate = document.querySelectorAll('.dop-info-rate li');
            dopInfoRate[0].innerHTML = '<img class="icon-smile" src="./img/icons-smiles/truck.svg" alt="truck"> Entrega grátis para valores acima de 500 USD na cidade.';
            dopInfoRate[1].innerHTML = '<img class="icon-smile" src="./img/icons-smiles/alarm.svg" alt="alarm"> Horário de funcionamento: das 8:00 às 20:00, entrega até às 19:00';
            dopInfoRate[2].innerHTML = '<img class="icon-smile" src="./img/icons-smiles/exchange.svg" alt="exchange"> Para trocas, contate: <a id="svetlanacashflow" href="https://t.me/svetlanacashflow">@svetlanacashflow</a>';
            dopInfoRate[3].innerHTML = '<img class="icon-smile" src="./img/icons-smiles/robot.svg" alt="robot"> Bot para solicitações: <a id="CashflowArgExchange_bot" href="https://t.me/CashflowArgExchange_bot">@CashflowArgExchange_bot</a>';
            
            loadGoogleSheetData();
        }
    }
    changeLanguage('en');
});