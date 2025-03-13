var light_logo = "../assets/header/umbrella-logo-light-theme.png"
var dark_logo = "../assets/header/umbrella-logo-dark-theme.png"
var light_theme_icon = "../assets/header/sun-icon.png"
var dark_theme_icon = "../assets/header/moon-icon.png"

function switchTheme() {
    // Pega o elemento body e header
    const body = document.body;
    const header = document.querySelector('header');
    
    // Pega o elemento de imagem
    const themeIcon = document.getElementById('theme-icon');
    const logo = document.getElementById('logo-img')

    // Verifica qual tema está atualmente aplicado
    if (body.classList.contains('light-theme') && header.classList.contains('light-theme')) {
        // Muda para o tema escuro
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        header.classList.remove('light-theme');
        header.classList.add('dark-theme');
        themeIcon.src = dark_theme_icon;
        themeIcon.alt = 'Tema Escuro';
        logo.src = dark_logo
        
        localStorage.setItem('theme', 'dark');
    } else {
        // Muda para o tema claro
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        header.classList.remove('dark-theme');
        header.classList.add('light-theme');
        themeIcon.src = light_theme_icon;
        themeIcon.alt = 'Tema Claro';
        logo.src = light_logo

        localStorage.setItem('theme', 'light');
        
    }
}

window.onload = function() {
    const currentPage = window.location.pathname;
    const links = document.querySelectorAll('.navegation a');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    const header = document.querySelector('header');
    const themeIcon = document.getElementById('theme-icon');
    const logo = document.getElementById('logo-img');

    //continuar a linha em baixo da pagina que esta
    links.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentPage.includes(linkHref)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    if (savedTheme === "dark"){
        body.classList.add('dark-theme');
        header.classList.add('dark-theme');
        themeIcon.src = dark_theme_icon;
        themeIcon.alt = 'Tema Escuro';
        logo.src = dark_logo

    } else {
        body.classList.add('light-theme');
        header.classList.add('light-theme');
        themeIcon.src = light_theme_icon;
        themeIcon.alt = 'Tema Claro';
        logo.src = light_logo

    }
};