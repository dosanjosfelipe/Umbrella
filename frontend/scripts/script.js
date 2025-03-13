function switchTheme() {
    // Pega o elemento body e header
    const body = document.body;
    const header = document.querySelector('header');
    
    // Pega o elemento de imagem
    const themeIcon = document.getElementById('theme-icon');
    
    // Verifica qual tema está atualmente aplicado
    if (body.classList.contains('light-theme') && header.classList.contains('light-theme')) {
        // Muda para o tema escuro
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        header.classList.remove('light-theme');
        header.classList.add('dark-theme');
        themeIcon.src = '/frontend/assets/header/moon-icon.png';
        themeIcon.alt = 'Tema Escuro';
        
        localStorage.setItem('theme', 'dark');
    } else {
        // Muda para o tema claro
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        header.classList.remove('dark-theme');
        header.classList.add('light-theme');
        themeIcon.src = '/frontend/assets/header/sun-icon.png';
        themeIcon.alt = 'Tema Claro';
        
        localStorage.setItem('theme', 'light');
    }
}

// Verificar se o usuário já tem uma preferência de tema
window.onload = function() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const header = document.querySelector('header');
    const themeIcon = document.getElementById('theme-icon');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        header.classList.add('dark-theme');
        themeIcon.src = '/frontend/assets/header/moon-icon.png';
        themeIcon.alt = 'Tema Escuro';
    } else {
        body.classList.add('light-theme');
        header.classList.add('light-theme');
        themeIcon.src = '/frontend/assets/header/sun-icon.png';
        themeIcon.alt = 'Tema Claro';
    }
};
