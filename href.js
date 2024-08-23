const anchors = document.querySelectorAll('.header__nav a, .welcome__links a');

anchors.forEach(anc => {
    anc.addEventListener('click', (e) => {
        e.preventDefault();

        const id = anc.getAttribute('href');
        const elem = document.querySelector(id);
        
        window.scroll({
            top: elem.offsetTop - 74,
            behavior: 'smooth',
        })
    })
})