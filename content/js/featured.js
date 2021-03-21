import { apiUrl } from "./data/api.js";
import displayFeedback from "./components/displayFeedback.js";

export function createFeature(data, targetElement) {
    const target = document.querySelector(targetElement);
    const emptySearchResult = "No features";

    target.innerHTML = "";

    if (data.length === 0) {
        displayFeedback("danger", emptySearchResult, targetElement);
    }

    data.forEach((item) => { 
        if (item.featured == true) {
               target.innerHTML += `<div class="slideshow__slide slide-animate">
                                        <div class="slideshow__images slide-color">
                                            <img class="slideshow__slide-img" src="${apiUrl}${item.image.url}" alt="${item.image.name}"/> 
                                        </div>
                                    
                                        <div class="slideshow__textbox">
                                            <div class="slideshow__text">
                                                <p>Featured from Brand Name</p>
                                                <h2>${item.title}</h2>
                                                <h3>Flat Runner Style</h3>
                                                <h4>4 Color Options</h4>
                                                <button class="continue-link"><a href="detail.html?id=${item.id}">Shop Product</a></button>
                                            </div>
                                        </div>
                                    </div>`;
        }
    });

    if (document.querySelectorAll(".slideshow__slide").length == 1) {
        document.querySelectorAll(".slideshow__btn").forEach(button => button.style.display = "none");
    }
}

const productList = ".slideshow";
const productUrl = apiUrl + "/products";

async function getFeature() {
    try {
        const response = await fetch(productUrl);
        const products = await response.json();
        createFeature(products, productList);
    } catch (error) {
        displayFeedback("error", error, productList);
    }
}

getFeature().then(() => nextSlide(1));

let slideIndicator = 1;
showSlides(slideIndicator);

export function nextSlide(slide) {
    showSlides(slideIndicator += slide);
}

document.querySelector(".slideshow__prev").addEventListener("click", () => nextSlide(-1));
document.querySelector(".slideshow__next").addEventListener("click", () => nextSlide(1)); 

function showSlides(slide) {
    const slides = document.querySelectorAll(".slideshow__slide");

    if (slide > slides.length) {
        slideIndicator = 1;
    }

    if (slide < 1) {
        slideIndicator = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    if (slides.length > 0) {
        slides[slideIndicator-1].style.display = "block";
    } 
}
 
