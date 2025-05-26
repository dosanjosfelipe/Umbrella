var light_logo = "../assets/header/umbrella-logo-light-theme.png"
var dark_logo = "../assets/header/umbrella-logo-dark-theme.png"
var light_theme_icon = "../assets/header/sun-icon.png"
var dark_theme_icon = "../assets/header/moon-icon.png"
var dark_theme_menu = "../assets/header/menu-dark-theme.png"
var light_theme_menu = "../assets/header/menu.png"

function switchTheme() {
    // Pega o elemento body e header
    const body = document.body;
    const header = document.querySelector("header");
    
    // Pega o elemento de imagem
    const themeIcon = document.getElementById("theme-icon");
    const logo = document.getElementById("logo-img");
    const menu = document.getElementById("menu-icon");

    // Verifica qual tema está atualmente aplicado
    if (body.classList.contains("light-theme") && header.classList.contains("light-theme")) {
        // Muda para o tema escuro
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        header.classList.remove("light-theme");
        header.classList.add("dark-theme");
        themeIcon.src = dark_theme_icon;
        themeIcon.alt = "Tema Escuro";
        logo.src = dark_logo
        menu.src = dark_theme_menu
        
        localStorage.setItem("theme", "dark");
    } else {
        // Muda para o tema claro
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        header.classList.remove("dark-theme");
        header.classList.add("light-theme");
        themeIcon.src = light_theme_icon;
        themeIcon.alt = "Tema Claro";
        logo.src = light_logo
        menu.src = light_theme_menu

        localStorage.setItem("theme", "light");
        
    }
}

window.onload = function() {
    const currentPage = window.location.pathname;
    const links = document.querySelectorAll(".navegation a");
    const body = document.body;
    const savedTheme = localStorage.getItem("theme");
    const header = document.querySelector("header");
    const themeIcon = document.getElementById("theme-icon");
    const logo = document.getElementById("logo-img");
    const menu = document.getElementById("menu-icon");

    //continuar a linha em baixo da pagina que esta
    links.forEach(link => {
        const linkHref = link.getAttribute("href");
        if (currentPage.includes(linkHref)) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
    
    if (savedTheme === "dark"){
        body.classList.add("dark-theme");
        header.classList.add("dark-theme");
        themeIcon.src = dark_theme_icon;
        themeIcon.alt = "Tema Escuro";
        logo.src = dark_logo
        menu.src = dark_theme_menu

    } else {
        body.classList.add("light-theme");
        header.classList.add("light-theme");
        themeIcon.src = light_theme_icon;
        themeIcon.alt = "Tema Claro";
        logo.src = light_logo
        menu.src = light_theme_menu

    }
};

document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("loaded");
    const main = document.querySelector("main");
    const links = document.querySelectorAll(".navegation a");
    const logo = document.querySelector(".logo a");
    const toggleButton = document.getElementById("menu-toggle");
    const dropdownMenu = document.getElementById("dropdown-menu");

    function loadPage(page) {
        fetch(`${page}.html`)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, "text/html");
                const newMainContent = doc.querySelector("main").innerHTML;
                main.innerHTML = newMainContent;
                window.history.pushState({ page }, "", `#${page}`);
                updateActiveLink(page);
            })
            .catch(error => console.error("Erro ao carregar a página:", error));
    }

    function updateActiveLink(page) {
        links.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href").includes(page));
        });
    }

    logo.addEventListener("click", function (event) {
        event.preventDefault();
        loadPage("index");
    });

    const initialPage = window.location.hash.replace("#", "") || "index";
    loadPage(initialPage);

    toggleButton.addEventListener("click", function (e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle("hidden");
    });

    // Fecha o menu se clicar fora
    document.addEventListener("click", function () {
        dropdownMenu.classList.add("hidden");
    });
});

function updatePlaceholder() {
    const input = document.getElementById("search_city");
    if (window.innerWidth > 1000 && window.innerWidth < 1300) {
      input.placeholder = "Pesquisar";
    } else if (window.innerWidth < 1000) {
      input.placeholder = "";
    } else {
        input.placeholder = "Pesquisar local";
    }
  }
  
  window.addEventListener("resize", updatePlaceholder);
  window.addEventListener("DOMContentLoaded", updatePlaceholder);

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("logout").addEventListener("click", function () {
        deleteCookie("UserId");
        deleteCookie("UserName");
        window.location.href = "/weather";
    });
});

function translateMain(main) {
    const translate = {
        Thunderstorm: "tempestade",
        Drizzle: "garoa",
        Rain: "chuva",
        Snow: "neve",
        Clear: "céu limpo",
        Clouds: "nublado",
        Mist: "névoa",
        Smoke: "fumaça",
        Haze: "neblina",
        Dust: "poeira",
        Fog: "nevoeiro",
        Sand: "areia",
        Ash: "cinzas",
        Squall: "rajadas",
        Tornado: "tornado"
    };
    return translate[main] || main;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function fetchWeather(lat, lon) {
    fetch('http://localhost:8080/api/local', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ latitude: lat, longitude: lon }),
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao enviar localização');
        return response.json();
    })
    .then(data => {
        //* Box CLIMA
        document.getElementById('city').textContent = data.name;
        document.getElementById('temp').textContent = Math.round(data.main.temp - 273.15);
        document.getElementById('feels_like').textContent = Math.round(data.main.feels_like - 273.15);
        document.getElementById('main').textContent = translateMain(data.weather[0].main);
        document.getElementById('description').textContent = data.weather[0].description;

        const weatherBox = document.querySelector('.now-weather-box');
        const weatherBox2 = document.querySelector('.today-weather-box');
        const condition = data.weather[0].main.toLowerCase();
        const condition2 = data.weather[0].description;
        const now = new Date();
        const hour = now.getHours();
        weatherBox.className = 'now-weather-box';

        for (let n = 1; n < 11; n++) {
            document.getElementById(`hour${n}`).textContent = hour + n + "H";
        }
        

        if (hour >= 6 && hour <= 18) {
            weatherBox2.classList.add("today-weather-box-day")
            if (condition.includes('clear')) {
                weatherBox.classList.add('clear');
                document.getElementById('icon').src = "../assets/main/sun.png";
            } else if (condition.includes('clouds') && condition2.includes("algumas nuvens") 
                || condition2.includes("nuvens dispersas") 
                || condition2.includes("parcialmente nublado") || condition2.includes("nuvens quebradas")) {
                weatherBox.classList.add('clouds');
                document.getElementById('icon').src = "../assets/main/cloudy-day.png";
            } else if (condition.includes('clouds') && condition2.includes("nublado")) {
                weatherBox.classList.add('clouds');
                document.getElementById('icon').src = "../assets/main/cloud.png";
            } else if (condition.includes('rain')) {
                weatherBox.classList.add('rain');
                document.getElementById('icon').src = "../assets/main/rain.png";
            } else if (condition.includes('thunderstorm')) {
                weatherBox.classList.add('thunderstorm');
                document.getElementById('icon').src = "../assets/main/thunder.png";
            } else if (condition.includes('snow')) {
                weatherBox.classList.add('snow');
                document.getElementById('icon').src = "../assets/main/snowy.png";
            } else if (condition.includes('drizzle')) {
                weatherBox.classList.add('drizzle');
                document.getElementById('icon').src = "../assets/main/sun-drizzle.png";
            } else if (condition.includes('mist') || condition.includes('fog') || condition.includes('Smoke')
                || condition.includes('Haze') || condition.includes('Dust') || condition.includes('Sand')
                || condition.includes('Ash') || condition.includes('Squall') || condition.includes('Tornado')){
                weatherBox.classList.add('mist');
                document.getElementById('icon').src = "../assets/main/fog.png";
            }

        } else {
            weatherBox2.classList.add("today-weather-box-night")
            if (condition.includes('clear')) {
                weatherBox.classList.add('clear-night');
                document.getElementById('icon').src = "../assets/main/moon.png";
            } else if (condition.includes('clouds') && condition2.includes("algumas nuvens") 
                || condition2.includes("nuvens dispersas") 
                || condition2.includes("parcialmente nublado")) {
                weatherBox.classList.add('clouds');
                document.getElementById('icon').src = "../assets/main/night-cloud.png";
            } else if (condition.includes('clouds') && condition2.includes("nublado")) {
                weatherBox.classList.add('clouds');
                document.getElementById('icon').src = "../assets/main/cloud.png";
            } else if (condition.includes('rain')) {
                weatherBox.classList.add('rain-night');
                document.getElementById('icon').src = "../assets/main/rain.png";
            } else if (condition.includes('thunderstorm')) {
                weatherBox.classList.add('thunderstorm-night');
                document.getElementById('icon').src = "../assets/main/thunder.png";
            } else if (condition.includes('snow')) {
                weatherBox.classList.add('snow-night');
                document.getElementById('icon').src = "../assets/main/snowy.png";
            } else if (condition.includes('drizzle')) {
                weatherBox.classList.add('drizzle-night');
                document.getElementById('icon').src = "../assets/main/night-drizzle.png";
            } else if (condition.includes('mist') || condition.includes('fog') || condition.includes('Smoke')
                || condition.includes('Haze') || condition.includes('Dust') || condition.includes('Sand')
                || condition.includes('Ash') || condition.includes('Squall') || condition.includes('Tornado')){
                weatherBox.classList.add('mist-night');
                document.getElementById('icon').src = "../assets/main/fog.png";
            }

            //* CLIMA DE HOJE

        }})
    .catch(error => {
        console.error('Erro:', error);
    });
}

// Tenta obter dos cookies
const lat = getCookie("UserLat");
const lon = getCookie("UserLon");

// Se já tiver os cookies, usa eles
if (lat && lon) {
    fetchWeather(lat, lon);
} else if (navigator.geolocation) {
    // Se não houver cookies, tenta obter a localização via navegador
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const newLat = position.coords.latitude;
            const newLon = position.coords.longitude;

            // Envia a localização ao backend; cookies serão definidos lá
            fetchWeather(newLat, newLon);
        },
        function(error) {
            alert("Erro ao obter localização: " + error.message);
        }
    );
} else {
    alert("Geolocalização não é suportada pelo navegador.");
}
