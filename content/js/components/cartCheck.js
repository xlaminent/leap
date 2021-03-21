import { getStoredCartList } from "./cartComponents.js";
import displayFeedback from "./displayFeedback.js";
import cartContents from "./cartCount.js"; 

const products = getStoredCartList();
const clearCartBtn = document.querySelector("#clear-list");

function listStoredProducts(storedItems) {
    const emptySearchResult = "Your cart is empty";
    const productList = document.querySelector(".cart__list");
    const count = document.querySelector(".cart__counter");
    const number = storedItems.length;
    const continueBtn = document.querySelector("#checkout-btn");
    continueBtn.disabled = true;

    if (storedItems.length === 0) {
        clearCartBtn.style.display = "none";
        displayFeedback("", emptySearchResult, ".cart__list");
        count.style.display = "none";
        continueBtn.title = "Cart is empty";
    } else {
        clearCartBtn.style.display = "block";
        continueBtn.disabled = false;
    }

    storedItems.forEach((item) => {
        productList.innerHTML += `<div class="cart__item">
                                        <div class="cart__item--img">
                                            <a href="detail.html?id=${item.id}"><img src="${item.image}"/></a>
                                        </div>
                                        <div class="cart__item--info">
                                            <a href="detail.html?id=${item.id}">
                                                <h2>${item.title}</h2>
                                                <h3>Size: 42</h3>
                                                <h3>Color: Black</h3>
                                            </a>
                                            <span><b>$</b></span><h4>${item.price}</h4>
                                            <div class="cart__input">
                                                <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()">&#8722;</button>
                                                <input class="input-quantity" min="1" value="1" type="number" name="input-quantity">
                                                <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()">&#43;</button>
                                            </div>                                      
                                        </div>
                                  </div>`;
    });

    const sum = Array
            .from(document.querySelectorAll(".cart__item--info h4"))
            .map(priceElement => +priceElement.textContent)
            .reduce((a, b) => a + b, 0);

            if (sum <= 0) {
                document.querySelectorAll(".cart-sum").forEach((total) => {total.innerHTML = "0";}
            )}
            else {
                document.querySelectorAll(".cart-sum").forEach((total) => { total.innerHTML = "$ " + sum; }            
            )}

    const dynamicItemLabel = (storedItems.length > 1) ? "items" : "item";

    count.innerHTML += `<p>You have <b>${number}</b> ${dynamicItemLabel} in your cart.</p>`;
}

listStoredProducts(products); 

clearCartBtn.addEventListener("click", clearList);

function clearList() {
    if (confirm("Are you sure you want to empty the cart?")) {
        localStorage.removeItem("products");
        listStoredProducts([]);
        cartContents();
    }
}