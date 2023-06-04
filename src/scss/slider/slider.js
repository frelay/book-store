"use strict";

// Получаем элементы
const slides = document.querySelectorAll(".slider__img"),
    dots = document.querySelectorAll(".slider__dot"),
    sliderDots = document.querySelectorAll(".slider__dots");

let slideIndex = 0;

// Функция показа слайдов
export function showSlides() {
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
    setTimeout(showSlides, 5000);
}

// TODO
// Сделать для слайдера управление по нажатию на кружки!
