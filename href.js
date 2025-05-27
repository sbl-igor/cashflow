const anchors = document.querySelectorAll('.header__nav a, .welcome__links a');

anchors.forEach(anc => {
    anc.addEventListener('click', (e) => {
        e.preventDefault();

        const iditem = anc.getAttribute('href');
        const elem = document.querySelector(iditem);
        
        window.scroll({
            top: elem.offsetTop - 74,
            behavior: 'smooth',
        })
    })
})