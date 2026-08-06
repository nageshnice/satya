// ================================
// Typing Effect
// ================================

const textArray = [
    "UI/UX Designer",
    "WordPress Developer",
    "Front-End Developer",
    "Figma Designer",
    "Creative Problem Solver"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

const typingElement = document.getElementById("typing");

function type() {
    if (!typingElement) return;

    const currentText = textArray[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex--);
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex++);
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length + 1) {
        isDeleting = true;
        typingSpeed = 1500;
    }

    if (isDeleting && charIndex === -1) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typingSpeed = 300;
    }

    setTimeout(type, typingSpeed);
}

document.addEventListener("DOMContentLoaded", type);
