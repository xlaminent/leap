import displayFeedback from "./components/displayFeedback.js";
import { regExCheck, checkInputLength} from "./components/formValidation.js";
import { apiUrl } from "./data/api.js";
import { saveToken, saveUser }  from "./data/storage.js";

const form = document.querySelector("#loginForm");
const passwordInput = document.querySelector("#password");
const passwordInputError = document.querySelector("#passwordError");
const emailInput = document.querySelector("#email");
const emailInputError = document.querySelector("#emailError");

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    if (regExCheck(emailInput.value) === true) {
        emailInputError.style.display = "none";
    } else {
        emailInputError.style.display = "inline-block";
    }

    if (checkInputLength(passwordInput.value, 6) === true) {
        passwordInputError.style.display = "none";
    } else {
        passwordInputError.style.display = "inline-block";
    }

    const userEmail = emailInput.value;
    const userPassword = passwordInput.value;

    loginUser(userEmail, userPassword)
}

async function loginUser(userEmail, userPassword) {
    const authUrl = apiUrl + "/auth/local";
    const credentials = JSON.stringify({ identifier: userEmail, password: userPassword});

    const options = {
        method: "POST",
        body: credentials,
        headers: {
            "Content-Type": "application/json"
        },
    };

    try {
        const response = await fetch(authUrl, options);
        const data = await response.json();

        if (data.user) {
            saveToken(data.jwt);
            saveUser(data.user);
            location.href = "account.html";
        }

        if (data.error) {
            displayFeedback("warning", "Could not log in, please try again.", ".form__feedback");
        }
    }
    catch(error) {
        displayFeedback("error", "An error occurred, please try again.", ".form__feedback");
    }
}


