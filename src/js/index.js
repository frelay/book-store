"use strict";

import "../css/style.css";
import * as slider from "../scss/slider/slider.js";

window.addEventListener("DOMContentLoaded", () => {
    slider.autoShowSlides();
    slider.setActiveSlide();
});
