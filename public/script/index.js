import { GenerateNewURL } from './script.js';

const urlForm = document.getElementById('generateUrl');
urlForm.addEventListener('submit',GenerateNewURL);


document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuButton = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("navbar-cta");

    mobileMenuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
        const expanded = mobileMenuButton.getAttribute("aria-expanded") === "true";
        mobileMenuButton.setAttribute("aria-expanded", !expanded);
    });
});
