"use strict";

import "../css/style.css";
import * as slider from "../scss/slider/slider.js";
import * as categories from "../scss/content-wrapper/categories/categories.js";
import * as bookCards from "../scss/content-wrapper/book-cards/book-cards.js";
import * as loadMoreBtn from "../scss/load-btn/load-btn.js";

window.addEventListener("DOMContentLoaded", () => {
    slider.autoShowSlides();
    slider.setActiveSlide();
    categories.setActiveCategory();
    bookCards.getCardsByCategory();
    loadMoreBtn.loadMore();
});
