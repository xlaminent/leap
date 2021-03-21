import { apiUrl } from "./data/api.js";
import displayFeedback from "./components/displayFeedback.js";
import { getToken } from "./data/storage.js";

export function createAdminView(data, targetElement) {
    const target = document.querySelector(targetElement);
    const emptySearchResult = "No products found";

    target.innerHTML = "";

    if (data.length === 0) {
        displayFeedback("danger", emptySearchResult, targetElement);
    }

    data.forEach((item) => { 
        target.innerHTML += `<tr>            
                                <td><b>${item.id}<b/></td>
                                <td><a href="detail.html?id=${item.id}">${item.title}</a></td>
                                <td><a href="edit.html?id=${item.id}" title="Edit this product" class="edit"><span class="material-icons">mode_edit</span> Edit</a></td>
                            </tr>`;
    });

    const number = data.length;
    document.querySelector(".overview-count").innerHTML = `(Currently ${number})`;
}

const token = getToken();
const productList = ".table-content";
const productUrl = apiUrl + "/products";

async function getProducts() {
    try {
        const response = await fetch(productUrl);
        const products = await response.json();

        createAdminView(products, productList);
        filterCurrentProducts(products, productList);
    } catch (error) {
        displayFeedback("error", error, productList);
    }
    if (token) {
        document.querySelectorAll(".edit-btn").forEach(function(options) {
            options.style.display = "block";
        })     
    }
}

getProducts();

function filterCurrentProducts(data, targetElement) {
    const search = document.querySelector("input.productSearch");

    function filterProductsTitle() {
        const inputValue = event.target.value.trim().toLowerCase();
        const filteredNumbers = data.filter(function (product) {
            if (product.title.toLowerCase().includes(inputValue)){
                return true;
            }
        });
        createAdminView(filteredNumbers, targetElement);
    }
    search.addEventListener("keyup", filterProductsTitle);
}
