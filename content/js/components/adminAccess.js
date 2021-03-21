import { getUser, getToken } from "../data/storage.js";
import logout from "../logout.js";
import cartContents from "./cartCount.js"; 

const token = getToken();

export default function adminComponents() {
    const { pathname } = document.location;
    const login = document.querySelector(".header__user-state");
    const loginMbl = document.querySelector(".mbl-login-btn");
    const adminAccess = document.querySelector(".header__user-access");
    const adminAccessMbl = document.querySelector(".mbl-user-access");
    const authOptions = document.querySelector(".adminpanel__actions");
    const user = getUser();

    if (!user) { 
        login.innerHTML += `<a href="login.html"><span class="loginBtn" title="Log In">Log in</span></a>`
        loginMbl.innerHTML += `<a href="login.html"><span class="loginBtn" title="Log In"><span class="material-icons icons">login</span> Log in</span></a>`
    }

    if (document.location.pathname.includes("account")) {
        if (!token) {
            location.href="/index.html";
        }

        const container = document.querySelector(".adminpanel__greeting");

        if (user) {
            container.innerHTML += `<h2>Welcome <em>${user}</em></h2>`;
            authOptions.innerHTML += `<a href="add.html" class="add-product">Add Product</a>`;
        }
    }

    if (user) { 
        login.innerHTML = `<span class="logoutBtn" title="Log Out">Log out</span>`;
        loginMbl.innerHTML = `<span class="logoutBtn" title="Log Out"><span class="material-icons icons">logout</span> Log out</span>`;
        adminAccess.innerHTML = `<a href="account.html" title="Access Administration Account"><span class="material-icons icons">manage_accounts</span></a>`;
        adminAccessMbl.innerHTML = `<a href="account.html"><span class="material-icons icons">manage_accounts</span> Account</a>`;
    }

    logout();    
    
    cartContents(); 
}
