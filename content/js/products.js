import { apiUrl } from "./data/api.js";
import { createProducts, filterProducts } from "./components/productComponents.js";
import displayFeedback from "./components/displayFeedback.js";

const productList = "#products-grid";
const productUrl = apiUrl + "/products";

async function getProducts() {
    try {
        const response = await fetch(productUrl);
        const products = await response.json();

        createProducts(products, productList);
        filterProducts(products, productList);
    } catch (error) {
        displayFeedback("error", error, productList);
    }
}

getProducts();

document.querySelector("#filter-icon").onclick = function() { showFilterbar()};

function showFilterbar() {
    const filterList = document.querySelector(".filters__list");

    if (filterList.style.display == "none") {
        filterList.style.display = "block";
    } else {
        filterList.style.display = "none";
    }
}


