// const container = document.querySelector(".container");
// const scrollLine = document.querySelector(".scroll");

// container?.addEventListener("wheel", (e) => {
//   e.preventDefault();
//   container.scrollLeft += e.deltaY ; 

//   const maxHeight = window.innerHeight;
//   const maxScroll = container.scrollWidth - container.clientWidth;
//   const scrollPercentage = container.scrollLeft / maxScroll;
//   const newHeight = scrollPercentage * maxHeight; 

//   scrollLine.style.height = `${newHeight}px`;
// });

const container = document.querySelector(".container");
const scrollLine = document.querySelector(".scroll");
const navLinks = document.querySelectorAll(".nav-link");

// Fonction pour mettre à jour la ligne de défilement
function updateScroll() {
    const maxHeight = window.innerHeight;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    if (maxScroll <= 0) {
        scrollLine.style.height = "0px";
        return;
    }

    const scrollPercentage = container.scrollLeft / maxScroll;
    const newHeight = scrollPercentage * maxHeight;
    scrollLine.style.height = `${newHeight}px`;
}

// Défilement avec la molette
container?.addEventListener("wheel", (e) => {
    e.preventDefault();
    container.scrollLeft += e.deltaY;
    updateScroll();
});

// Navigation via les liens
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
            container.scrollLeft = targetPage.offsetLeft;
            updateScroll();
        }
    });
});

// Gestion du redimensionnement
window.addEventListener("resize", (e) => {
    e.preventDefault();
    const activePage = document.querySelector(".page.active") || document.querySelector("#accueil");
    if (activePage) {
        container.scrollLeft = activePage.offsetLeft; // Reste sur la page active
    }
    updateScroll();
});

// Initialisation
window.addEventListener("load", (e) => {
    e.preventDefault();
    const firstPage = document.querySelector("#accueil");
    if (firstPage) {
        container.scrollLeft = firstPage.offsetLeft;
    }
    updateScroll();
});

// Suivi de la page active (optionnel, si menu_active.js ne le fait pas)
container.addEventListener("scroll", () => {
    const pages = document.querySelectorAll(".page");
    pages.forEach(page => {
        const rect = page.getBoundingClientRect();
        if (rect.left >= -50 && rect.left < container.clientWidth / 2) {
            pages.forEach(p => p.classList.remove("active"));
            page.classList.add("active");
        }
    });
    updateScroll();
});