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
            }" class="book-cards__img"/>
            <div class="book-cards__text">
                <p class="book-cards__author">${
                    item.volumeInfo.authors
                        ? item.volumeInfo.authors
                        : authorsPlaceholder
                }</p>
                <p class="book-cards__title">${item.volumeInfo.title}</p>
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
}

// Функция для fetch запроса
function useRequest(category) {
    fetch(
        `https://www.googleapis.com/books/v1/volumes?q="subject:${category}"&key=AIzaSyCQbSqaHFYuQo8gpB5hi-3wu4jOa22C_MY&printType=books&startIndex=0&maxResults=6&orderBy=newest&langRestrict=en`
    )
        .then((response) => {
            // console.log(response);
            return response.json();
        })
        .then((json) => {
            // console.log("JSON - " + JSON.parse(json));
            displayResult(json);
            // Кладём в localStorage полученный JSON
            // localStorage.setItem("myJSON", JSON.stringify(json));
        })
        .catch((err) => {
            // console.log(err);
            return err;
        });
}
