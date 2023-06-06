"use strict";

import "../css/style.css";
import * as slider from "../scss/slider/slider.js";
import * as categories from "../scss/categories/categories.js";

window.addEventListener("DOMContentLoaded", () => {
    slider.autoShowSlides();
    slider.setActiveSlide();
    categories.setActiveCategory();
});
