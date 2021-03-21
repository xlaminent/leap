import { getToken } from "./data/storage.js";
import { apiUrl } from "./data/api.js";
import displayFeedback from "./components/displayFeedback.js";

const token = getToken();

if (!token) {
    location.href="/index.html";
}

const actionFeedback = document.querySelector(".form__feedback");
const form = document.querySelector("#createProductForm");
const titleInput = document.querySelector("#title");
const priceInput = document.querySelector("#price");
const descInput = document.querySelector("#description");
const featuredInput = document.querySelector("#featured");
const fileInput = document.querySelector("#file");

form.addEventListener("submit", submitForm);

async function submitForm(event) {
    event.preventDefault();

    actionFeedback.innerHTML = "";

    const titleValue = titleInput.value;
    const priceValue = priceInput.value;
    const descValue = descInput.value;
    const featuredValue = featuredInput.checked;
    const fileValue = fileInput.value;

    if (titleValue.length === 0 || priceValue.length === 0 || descValue.length === 0 || fileValue.length === 0 ) {
        return displayFeedback("warning", "Please fill in all required fields.", ".form__feedback");
    }

    addProduct(titleValue, priceValue, descValue, featuredValue, fileValue);
}

export function addProductImage(productId) {
    const imageData = new FormData();
    imageData.append("files", fileInput.files[0]);
    imageData.append("ref", "Products");
    imageData.append("refId", productId);
    imageData.append("field", "image");

    const img = {
        method: "POST",
        body: imageData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }; 

    return fetch("http://localhost:1337/upload", img);
}

async function addProduct(title, price, description, featured) {
    const postUrl = apiUrl + "/products";
    const data = JSON.stringify({ title: title, price: price, description: description, featured: featured });

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };  

    try {
        const response = await fetch(postUrl, options);
        const product = await response.json();

        await addProductImage(product.id);

        if (product.created_at) {
            displayFeedback("success", "Product created.", ".form__feedback");
            form.reset();
        }

        if (product.error) {
            displayFeedback("error", product.actionFeedback, ".form__feedback");
        }
    } catch (error) {
        displayFeedback("error", "Could not create product.", ".form__feedback");
    }
}