import { apiUrl } from "./data/api.js";
import displayFeedback from "./components/displayFeedback.js";
import { getStoredCartList, addProductClick } from "./components/cartComponents.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const productId = params.get("id");

if (!productId) {
    document.location.href = "/";
}

const productUrl = apiUrl + "/products/" + productId;

(async function () {
    try {
        const response = await fetch(productUrl);
        const product = await response.json();
        document.title = product.title + " | Leap High-Performance Running Shoes";

        let classChange = "regularState";

        const products = getStoredCartList();

        const doesObjectExist = products.find(function (products) {
            return parseInt(products.id) === product.id;
        });

        let productButtonText = "Add to Cart";
        let productAdded = false;

        if (doesObjectExist) {
            classChange = "addedState";
            productButtonText = "Added to Cart";
        }

        const productBtn = document.querySelector(".product__actions");
        productBtn.innerHTML = `<button class="${classChange}" title="Pick a size" data-id="${product.id}" data-price="${product.price}" data-title="${product.title}" data-image="${apiUrl}${product.image.url}" data-added="${productAdded}">
                                    <a class="cart-state">${productButtonText}</a>
                                </button>`;

        const buyBtn = document.querySelector(".product__actions button");
        buyBtn.disabled = true;

        if (doesObjectExist && buyBtn.disabled === true) {
            classChange = "addedState";
            productButtonText = "Added to Cart";
            productAdded = true;
            buyBtn.disabled = false;
        }

        const productName = document.querySelector(".product__title");
        productName.innerHTML = product.title;

        const productDesc = document.querySelector(".product__desc");
        productDesc.innerHTML = product.description;

        const productPrice = document.querySelector(".product__price");
        productPrice.innerHTML = `<b>$` + product.price + `</b>`;

        const productImg = document.querySelector(".box__img");
        productImg.innerHTML = `<img src="${apiUrl}${product.image.url}" alt="${product.image.name}" class="product-img"/>`;

        const imageRow = document.querySelector(".box__img--row"); 
        imageRow.innerHTML = `<img src="${apiUrl}${product.image.url}" class="row-img" alt="${product.image.name}" title="Zoom" />
                              <img src="https://via.placeholder.com/400x280?text=Placeholder1" class="row-img" alt="Placeholder Image" title="Zoom" />
                              <img src="https://via.placeholder.com/400x280?text=Placeholder2" class="row-img" alt="Placeholder Image" title="Zoom" />
                              <img src="https://via.placeholder.com/400x280?text=Placeholders+For+Multiple+Product+Images" class="row-img" alt="Placeholder Image" title="Zoom" />
                             `;

        imageRow.querySelectorAll("img").forEach(image => {
            image.onclick = () => changeProductImg(image);
        });

        const cartBtn = document.querySelector(".product__actions button");
        cartBtn.addEventListener("click", addProductClick);

        const allSizes = document.querySelector(".product__sizes");
        allSizes.querySelectorAll(".product__size").forEach(select => {
            select.onclick = () => selectSize(select);
        });

    } catch (error) {
        displayFeedback("warning", error, "#product-container");
    }
    })
();

function changeProductImg(img) {
    document.querySelector(".product-img").src = img.src;
}

function selectSize(selected) {
    const btns = document.querySelectorAll(".product__size");

    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove("selected");
    }

    selected.classList.add("selected");
    selected.title = "Selected";

    const buyBtn = document.querySelector(".product__actions button");
    buyBtn.disabled = false;
    buyBtn.title = "Add to Cart";
}