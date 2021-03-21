import { apiUrl } from "../data/api.js";
import { getToken } from "../data/storage.js";

const token = getToken();

export default function deleteProduct(id, imgId) {
    const button = document.querySelector("#delete-btn");

    button.onclick = async function () {
        const deleteConfirm = confirm("Are you sure you want to delete this product?");

        if (deleteConfirm) {
            const url = apiUrl + "/products/" + id;
            const imgUrl = apiUrl + "/upload/files/" + imgId;

            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            try {
                const response = await fetch(url, options);
                await response.json();

                const img = await fetch(imgUrl, options);
                await img.json();
    
                location.href = "/account.html";
            } catch (error) {
                console.log(error);
            }
        }
    };
}


