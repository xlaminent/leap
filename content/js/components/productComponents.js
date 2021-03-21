import displayFeedback from "./displayFeedback.js";
import { apiUrl } from "../data/api.js";

export function createProducts(data, targetElement) {
    const target = document.querySelector(targetElement);
    const emptySearchResult = "No products found";
    const counter = document.querySelector(".count");

    target.innerHTML = "";

    if (data.length === 0) {
        counter.innerHTML = "0";
        displayFeedback("danger", emptySearchResult, targetElement);
    }

    data.forEach((item) => { 
        let featuredElement = item.featured ? "<p><span>&starf;</span> featured</p>" : "";

        target.innerHTML += `<li class="grid__card">
                                <a href="detail.html?id=${item.id}">
                                    <div><img src="${apiUrl}${item.image.url}" class="grid__img" alt="${item.image.name}"/></div>
                                    <div class="grid__card--mark">${featuredElement}</div>
                                    <h3>${item.title}</h3>
                                    <p>This is a short product-description.</p>     
                                    <p class="grid__card--price">$ ${item.price}</p> 
                                </a>
                             </li>`;
    });

    if (document.querySelectorAll(".grid__card").length < 4) {
        const cardGrid = document.querySelector(".grid__ul");
        cardGrid.style.justifyContent = "flex-start";
        cardGrid.style.gap = "20px";
    }

    const dynamicItemLabel = (data.length == 1) ? "Item" : "Items";
    const number = data.length;
    counter.innerHTML = `${number} ${dynamicItemLabel}`;
}

export function filterProducts(data, targetElement) {
    const search = document.querySelector("input.productSearch");

    function filterProductsTitle() {
        const inputValue = event.target.value.trim().toLowerCase();

        const filteredNumbers = data.filter(function (product) {
            if (product.title.toLowerCase().includes(inputValue)){
                return true;
            }
        });

        createProducts(filteredNumbers, targetElement);
    }

    search.addEventListener("keyup", filterProductsTitle);
}