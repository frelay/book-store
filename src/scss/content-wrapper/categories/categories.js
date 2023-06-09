"use strict";

// Получаем элементы
export const categoryList = document.querySelector(".categories__list"),
    categoryListItem = document.querySelectorAll(".categories__list-item");

// Функция делает категорию активной
export function setActiveCategory() {
    categoryListItem[0].classList.add("active-category");

    categoryList.addEventListener("click", (e) => {
        if (e.target.classList.contains("categories__list-item")) {
            categoryListItem.forEach((item) => {
                if (item.classList.contains("active-category")) {
                    item.classList.remove("active-category");
                }
            });

            e.target.classList.add("active-category");
        }
    });
}
