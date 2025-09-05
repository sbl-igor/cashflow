// googletable.js
function loadGoogleSheetData() {
    const apiTable = 'AIzaSyCsoUuuNJiDqq9ftgEq6_V9Yuo-ADuhK9o';
    const idTable = '1bCyr6gNe1fDhYhtaHdaxzVJVb480qZHH-3Olr-tLOVk';
    const range = 'Лист1!C5:D13';

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${idTable}/values/${range}?key=${apiTable}`)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;

            document.getElementById('usdt-ars-value-1').textContent = rows[1][0];
            document.getElementById('usd-ars-value').textContent = rows[2][0];
            document.getElementById('usdt-ars-value-2').textContent = rows[0][0];
            document.getElementById('rub-ars-value').textContent = rows[3][1];
            // parseFloat(rows[3][1].replace(",", ".")) * 100;
            document.getElementById('rub-usd-value').textContent = rows[8][0]
            document.getElementById('eur-ars-value').textContent = rows[5][0];
            document.getElementById('kzt-ars-value').textContent = rows[4][1];
            document.getElementById('usdt-usd-value').textContent = rows[6][0].replace(',', '.') * (-1);
        })
        .catch(error => console.error('Ошибка:', error));
}

loadGoogleSheetData();

