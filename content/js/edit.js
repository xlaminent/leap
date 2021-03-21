import { getToken } from "./data/storage.js";
import { apiUrl } from "./data/api.js";
import deleteProduct from "./components/delete.js";
import displayFeedback from "./components/displayFeedback.js";

const token = getToken();

if (!token) {
    location.href="/index.html";
}

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const productId = params.get("id");

if (!productId) {
    document.location.href = "/";
}

const actionFeedback = document.querySelector(".form__feedback");
const imgPreview = document.querySelector(".img-preview");
const form = document.querySelector("#updateForm");
const titleInput = document.querySelector("#title");
const priceInput = document.querySelector("#price");
const descInput = document.querySelector("#description");
const featureInput = document.querySelector("#featured");
const fileInput = document.querySelector("#file");
const idInput = document.querySelector("#id");
const imgIdInput = document.querySelector("#imageId");

(async function () {
    try {
        const response = await fetch(apiUrl + "/products/" + productId);
        const product = await response.json();
        
        idInput.value = product.id;
        imgIdInput.value = product.image.id;
        titleInput.value = product.title;
        priceInput.value = product.price;
        descInput.value = product.description;
        featureInput.checked = product.featured;
        imgPreview.innerHTML +=  `<img src="${apiUrl}${product.image.url}" class="something"/>`; 
        const imgId = imgIdInput.value;
        
        deleteProduct(product.id, imgId);
    } catch (error) {
        console.log(error);
    } 
})();

form.addEventListener("submit", submitForm);

function deleteImg() {
    const oldImgId = imgIdInput.value;
    const url = apiUrl + "/upload/files/" + oldImgId;

    const options = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }; 

    return fetch(url, options);
}

function uploadImg() {
    const oldId = idInput.value;
    const imageData = new FormData();
    imageData.append("files", fileInput.files[0]);
    imageData.append("ref", "Products");
    imageData.append("refId", oldId);
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

function submitForm(event) {
    event.preventDefault();

    actionFeedback.innerHTML = "";

    const titleValue = titleInput.value.trim();
    const priceValue = priceInput.value.trim();
    const descValue = descInput.value.trim();
    const featureValue = featureInput.checked;
    const fileValue = fileInput.value;
    const prodImgId = imgIdInput.value;
    const idValue = idInput.value;

    if (titleValue.length === 0 || priceValue.length === 0 || descValue.length === 0 || prodImgId.length === 0) {
        return displayFeedback("warning", "Please fill inn all fields correctly", ".form__feedback");
    }

    updateProduct(titleValue, descValue, priceValue, featureValue, fileValue, idValue);
}

async function updateProduct(title, description, price, featured, image, id) {
    const url = apiUrl + "/products/" + id;
    const data = JSON.stringify({ title: title, price: price, description: description, featured : featured});

    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        if (fileInput.files.length > 0) {
            const result = await deleteImg();
            await result.json();
            
            const data = await uploadImg();
            await data.json();
        }

        const response = await fetch(url, options);
        const product = await response.json();

        if (product.updated_at) {
            displayFeedback("success", "Product updated. <span id=\"refresh\" class=\"refresh-btn\" title=\"Refresh Page\">Refresh Product</span>", ".form__feedback");
            
            document.querySelector("#refresh").onclick = function() {
                location.reload();
            };
        }

        if (product.error) {
            displayFeedback("error", product.actionFeedback, ".form__feedback");
        }
    } catch (error) {
        console.log(error);
    }
}

