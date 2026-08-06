// ======================================
// PRELOADER & AOS INITIALIZATION
// ======================================
window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);
    }

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 900,
            once: true
        });
    }
});

// ======================================
// STICKY HEADER
// ======================================
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
});

// ======================================
// ACTIVE MENU & SMOOTH SCROLL
// ======================================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.pageYOffset >= top) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: "smooth"
                });
            }
        }
    });
});

// ======================================
// SCROLL TO TOP
// ======================================
const topBtn = document.getElementById("top");

window.addEventListener("scroll", () => {
    if (!topBtn) return;
    if (window.scrollY > 400) {
        topBtn.style.opacity = "1";
        topBtn.style.visibility = "visible";
    } else {
        topBtn.style.opacity = "0";
        topBtn.style.visibility = "hidden";
    }
});

if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ======================================
// DARK / LIGHT MODE
// ======================================
const toggle = document.getElementById("theme-toggle");

if (toggle) {
    const icon = toggle.querySelector("i");
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        if (icon) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        }
    }

    toggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        const light = document.body.classList.contains("light-mode");
        localStorage.setItem("theme", light ? "light" : "dark");

        if (icon) {
            if (light) {
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
            } else {
                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");
            }
        }
    });
}

// ======================================
// COUNTER ANIMATION
// ======================================
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = parseInt(counter.dataset.target, 10);
        if (isNaN(target)) return;

        let count = 0;
        const speed = target / 50;

        const update = () => {
            count += speed;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        };

        update();
        counterObserver.unobserve(counter);
    });
}, {
    threshold: 0.5
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ======================================
// PROGRESS BAR ANIMATION
// ======================================
const progressBars = document.querySelectorAll(".progress div");

const progressObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const bar = entry.target;
        const width = bar.style.width;
        bar.style.width = "0";

        setTimeout(() => {
            bar.style.width = width;
        }, 200);

        progressObserver.unobserve(bar);
    });
}, {
    threshold: 0.5
});

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// ======================================
// MOBILE MENU TOGGLE
// ======================================
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("active");
        nav.classList.toggle("show");
    });

    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", () => {
            menuBtn.classList.remove("active");
            nav.classList.remove("show");
        });
    });
}

// ======================================
// CURRENT YEAR
// ======================================
const year = document.querySelector(".year");
if (year) {
    year.textContent = new Date().getFullYear();
}

// ======================================
// CONTACT FORM HANDLER
// ======================================
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you! Your message has been sent successfully.");
        contactForm.reset();
    });
}

// ======================================
// SWIPER CAROUSEL INITIALIZATION
// ======================================
document.addEventListener("DOMContentLoaded", function () {
    if (typeof Swiper !== "undefined") {
        new Swiper(".project-slider", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            grabCursor: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 25,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });
    }
});

