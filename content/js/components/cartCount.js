import { getStoredCartList } from "./cartComponents.js";

export default function cartContents() {
    const cart = document.querySelector("#cart-items");
    const products = getStoredCartList();
    const number = products.length;

    if (number >= 1) {
        cart.innerHTML = "(<b>" + number + "</b>)";
    } else {
        cart.innerHTML = "(0)";
    }
}