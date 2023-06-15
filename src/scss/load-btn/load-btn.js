"use strict";

import * as categories from "../content-wrapper/categories/categories.js";
import * as bookCards from "../content-wrapper/book-cards/book-cards.js";

const loadMoreBtn = document.querySelector(".btn-wrapper__load-btn");

// Основная функция загрузки
export function loadMore() {
    let startIndex = 6;

    loadMoreBtn.addEventListener("click", () => {
        createCardsBlock();

        const activeCategory =
            categories.categoryList.querySelector(
                ".active-category"
            ).textContent;

        const loadCardsNode = document.querySelector(".load-block");

        bookCards.useRequest(activeCategory, loadCardsNode, startIndex);

        startIndex += 6;
    });
}

// Функция создает блок для дозагрузки карточек книг
function createCardsBlock() {
    const cardsBlock = document.createElement("div");
    loadMoreBtn.parentElement.prepend(cardsBlock);
    cardsBlock.classList.add("load-block");
}
