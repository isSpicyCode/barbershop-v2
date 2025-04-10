document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".page");
    const navLinks = document.querySelectorAll(".nav-link");
    const heroText = document.querySelector(".hero-text-bg"); // Sélectionne .hero-text-bg

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Gestion des liens de navigation
                    navLinks.forEach((link) => link.classList.remove("active"));
                    navLinks.forEach((link) => {
                        if (link.getAttribute("href") === `#${entry.target.id}`) {
                            link.classList.add("active");
                        }
                    });

                    // Gestion de .hero-text-bg
                    if (entry.target.id === "accueil") {
                        heroText.style.opacity = "1"; // Visible sur #accueil
                    } else {
                        heroText.style.opacity = "0"; // Caché sur les autres sections
                    }
                }
            });
        },
        { threshold: 0.6 } // Active lorsque 60% de la section est visible
    );

    sections.forEach((section) => observer.observe(section));
});