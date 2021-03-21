import { clearStorage } from "./data/storage.js";

export default function logout() {
    document.querySelectorAll(".logoutBtn").forEach(button => {
        button.onclick = () => redirectUser();
    });
}

function redirectUser() {
    clearStorage();
    location.href = "/";
}