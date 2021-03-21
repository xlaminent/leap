import cartContents from "./cartCount.js"; 

export function buyProduct(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

export function getStoredCartList() {
    const storedItem = localStorage.getItem("products");

    if (storedItem === null) {
        return [];
    } 
    else {
        return JSON.parse(storedItem);
    }
}

export function addProductClick() {
    this.classList.toggle("addedState");
    this.classList.toggle("regularState");

    const productId = this.dataset.id;
    const productTitle = this.dataset.title;
    const productPrice = this.dataset.price;
    const productImg = this.dataset.image;

    const currentStoredItems = getStoredCartList();
    const productExists = currentStoredItems.find(function (items) {
        return items.id === productId;
    });

    if (productExists === undefined) {
        const product = { id: productId, title: productTitle, price: productPrice, image: productImg };
        currentStoredItems.push(product);
        buyProduct(currentStoredItems);

    } else {
        const newItems = currentStoredItems.filter((item) => item.id !== productId);
        buyProduct(newItems);
    }
    
    const cartState = this.dataset.added === "true";
    this.querySelector(".cart-state").text = cartState ? "Add to Cart" : "Added to Cart";
    this.dataset.added = !cartState;
    cartContents();
}