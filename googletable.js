// googletable.js
function loadGoogleSheetData() {
    const apiTable = 'AIzaSyAqAuvAFoLwiunxVpxXpV4Sy3x0HtPrhUA';
    const idTable = '1JqWUxssrrcA5UKgPiiC6PMHTM3C5GdEbEgNUw_kj4Ss';
    const range = 'Лист1!A1:P4';

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${idTable}/values/${range}?key=${apiTable}`)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;

            document.getElementById('usd-ars-value').textContent = rows[2][1];
            document.getElementById('usdt-ars-value-1').textContent = rows[2][10];
            document.getElementById('usdt-ars-value-2').textContent = rows[3][10];
            document.getElementById('rub-ars-value').textContent = parseFloat(rows[2][5].replace(",", ".")) * 10000;
            document.getElementById('rub-usd-value').textContent = rows[2][7];
            document.getElementById('eur-ars-value').textContent = rows[2][14];
            document.getElementById('kzt-ars-value').textContent = rows[2][15];
            document.getElementById('usdt-usd-value').textContent = parseFloat(rows[2][9]) * -1;
        })
        .catch(error => console.error('Ошибка:', error));
}

loadGoogleSheetData();