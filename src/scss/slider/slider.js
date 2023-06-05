"use strict";

// Получаем элементы
export const slides = document.querySelectorAll(".slider__img"),
    dots = document.querySelectorAll(".slider__dot");

let slideIndex = 0;

// Функция показа слайдов автоматически
export function autoShowSlides() {
    slides.forEach((slide) => {
        slide.style.display = "none";
    });

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    dots.forEach((dot) => {
        dot.className = dot.className.replace(" active-dot", "");
    });

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active-dot";
    setTimeout(autoShowSlides, 5000);
}

// Функция показа слайда по клику на кружок
export function setActiveSlide() {
    dots.forEach((dot, index) => {
        dot.addEventListener("click", (e) => {
            dots.forEach((dot) => {
                if (dot.classList.contains("active-dot")) {
                    dot.classList.remove("active-dot");
                }
            });

            e.target.classList.add("active-dot");

            slides.forEach((slide) => {
                slide.style.display = "none";
            });

            slides[index].style.display = "block";
        });
    });
}
