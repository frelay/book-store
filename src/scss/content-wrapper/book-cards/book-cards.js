"use strict";

import * as categories from "../categories/categories.js";

// Получаем элементы
const cardsNode = document.querySelector(".book-cards");

const booksInCart = [];

// Обработчик
export function getCardsByCategory() {
    const startIndex = 0;

    useRequest(categories.categoryListItem[0].outerText, cardsNode, startIndex);

    categories.categoryList.addEventListener("click", (e) => {
        useRequest(e.target.outerText, cardsNode, startIndex);
    });
}

// Функция рендер
function displayResult(apiData, cardsNode) {
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
    addOrRemoveBook(apiData);
}

// Функция для fetch запроса
export function useRequest(category, cardsNode, startIndex) {
    fetch(
        `https://www.googleapis.com/books/v1/volumes?q="subject:${category}"&key=AIzaSyCQbSqaHFYuQo8gpB5hi-3wu4jOa22C_MY&printType=books&startIndex=${startIndex}&maxResults=6&orderBy=newest&langRestrict=en`
    )
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            displayResult(json, cardsNode);
            // Кладём в localStorage полученный JSON
            // localStorage.setItem("myJSON", JSON.stringify(json));
        })
        .catch((err) => {
            return err;
        });
}

// Функция добавления/удаления из корзины
function addOrRemoveBook(apiData) {
    const activeBtn = document.querySelectorAll(".book-cards__btn");
    const cartCounter = document.querySelector(".cart-counter");
    let bookId;

    // console.log(apiData);
    // console.log(activeBtn);
    getBooksFromStorage();

    activeBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            bookId = getBookId(apiData, e);

            if (btn.classList.contains("book-cards__btn")) {
                addBookIDInArray(bookId);
                btn.classList.replace("book-cards__btn", "in-cart-btn");
                btn.innerText = "in the cart";
            } else if (btn.classList.contains("in-cart-btn")) {
                removeBookIDFromArray(bookId);
                btn.classList.replace("in-cart-btn", "book-cards__btn");
                btn.innerText = "buy now";
            }

            if (!cartCounter.classList.contains("cart-counter-visible")) {
                cartCounter.classList.add("cart-counter-visible");
            }

            cartCounter.innerText = booksInCart.length;

            if (cartCounter.textContent === "0") {
                cartCounter.classList.remove("cart-counter-visible");
            }
        });

        if (
            booksInCart.includes(getBookIdByBtn(apiData, btn)) ||
            getBooksFromStorage().includes(getBookIdByBtn(apiData, btn))
        ) {
            btn.classList.replace("book-cards__btn", "in-cart-btn");
            btn.innerText = "in the cart";
        }
    });
}

// Функция получает ID книги при клике на кнопку купить
function getBookId(apiData, eventTarget) {
    let book;

    book = apiData.items.find((item) => {
        if (
            item.volumeInfo.title ===
            eventTarget.target.parentNode.querySelector(".book-cards__title")
                .textContent
        ) {
            return item;
        }
    });

    return book.id;
}

// Функция добавляет ID книги в массив корзины
function addBookIDInArray(bookId) {
    if (!booksInCart.includes(bookId)) {
        booksInCart.push(bookId);
        addBooksInLocalStorage(booksInCart);
    }
}

// Функция удаляет ID книги из массива корзины
function removeBookIDFromArray(bookId) {
    if (booksInCart.includes(bookId)) {
        booksInCart.splice(booksInCart.indexOf(bookId), 1);
        removeBooksFromStorage(bookId, "books");
    }
}

// Функция получает ID книги из названия на карточке
function getBookIdByBtn(apiData, btn) {
    let book = apiData.items.find((item) => {
        if (
            item.volumeInfo.title ===
            btn.parentElement.querySelector(".book-cards__title").textContent
        ) {
            return item;
        }
    });

    return book.id;
}

// Функция добавляет в localStorage книги, которые положили в корзину
function addBooksInLocalStorage(booksInCart) {
    localStorage.setItem("books", booksInCart);
}

// Функция убирает из localStorage книги, которые убрали из корзины
function removeBooksFromStorage(bookId, books) {
    const bookStorage = localStorage.getItem(books).split(",");
    bookStorage.splice(bookStorage.indexOf(bookId), 1);
    addBooksInLocalStorage(bookStorage);
}

// Функция достает из localStorage книги, если перезагрузили страницу
function getBooksFromStorage() {
    const cartCounter = document.querySelector(".cart-counter");
    const localStorageBooks = localStorage.getItem("books").split(",");

    if (localStorage.getItem("books")) {
        // console.log("Книжки в хранилище");
        cartCounter.classList.add("cart-counter-visible");
        cartCounter.innerText = localStorageBooks.length;
    }

    return localStorageBooks;
}
