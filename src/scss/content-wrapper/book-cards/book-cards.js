"use strict";

import * as categories from "../categories/categories.js";

// Получаем элементы
const cardsNode = document.querySelector(".book-cards");

// Обработчик
export function getCardsByCategory() {
    useRequest(categories.categoryListItem[0].outerText);

    categories.categoryList.addEventListener("click", (e) => {
        useRequest(e.target.outerText);
    });
}

// Функция рендер
function displayResult(apiData) {
    const authorsPlaceholder = "author not specified";
    const noPrice = "Not for sale";
    let cards = "";

    console.log(apiData);

    apiData.items.forEach((item) => {
        const cardBlock = `
        <div class="book-cards__card">
            <img src="${
                item.volumeInfo.imageLinks.thumbnail
                    ? item.volumeInfo.imageLinks.thumbnail
                    : "/src/img/cards-img/imagePlaceholder.png"
            }" class="book-cards__img"/>
            <div class="book-cards__text">
                <p class="book-cards__author">${
                    item.volumeInfo.authors
                        ? item.volumeInfo.authors
                        : authorsPlaceholder
                }</p>
                <p class="book-cards__title">${item.volumeInfo.title}</p>
                <div class="rating">
                    <div class="rating__body">
                        <div class="rating__active" style="width: ${
                            item.volumeInfo.averageRating / 0.05
                        }%"></div>  
                        <p class="rating__review">${
                            item.volumeInfo.ratingsCount
                                ? item.volumeInfo.ratingsCount
                                : 0
                        } review</p>    
                    </div>
                </div>
                <p class="book-cards__description">${
                    item.volumeInfo.description
                }</p>
                <p class="book-cards__price">${
                    item.saleInfo.retailPrice
                        ? item.saleInfo.retailPrice.amount +
                          " " +
                          item.saleInfo.retailPrice.currencyCode
                        : noPrice
                }</p>
                <button class="${
                    item.saleInfo.retailPrice
                        ? "book-cards__btn"
                        : "disabled-btn"
                }">buy now</button>
            </div>
        </div>`;

        cards = cards + cardBlock;
    });

    cardsNode.innerHTML = cards;
    addInCart();
}

// Функция для fetch запроса
function useRequest(category) {
    fetch(
        `https://www.googleapis.com/books/v1/volumes?q="subject:${category}"&key=AIzaSyCQbSqaHFYuQo8gpB5hi-3wu4jOa22C_MY&printType=books&startIndex=0&maxResults=6&orderBy=newest&langRestrict=en`
    )
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            displayResult(json);
            // Кладём в localStorage полученный JSON
            // localStorage.setItem("myJSON", JSON.stringify(json));
        })
        .catch((err) => {
            return err;
        });
}

// Функция добавления в корзину
function addInCart() {
    const activeBtn = document.querySelectorAll(".book-cards__btn");
    const cartCounter = document.querySelector(".cart-counter");

    activeBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.classList.replace("book-cards__btn", "in-cart-btn");
            btn.innerText = "in the cart";

            if (!cartCounter.classList.contains("cart-counter-visible")) {
                cartCounter.classList.add("cart-counter-visible");
            }
            ++cartCounter.innerText;
        });
    });
}
