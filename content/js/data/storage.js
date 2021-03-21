const tokenKey = "token";
const userKey = "user";

export function saveToken(token) {
    saveToStorage(tokenKey, token);
}

export function getToken() {
    return getStoredData(tokenKey);
}

export function saveUser(user) {
    saveToStorage(userKey, user);
}

export function clearStorage() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
}

export function getUser() {
    const user = getStoredData(userKey)

    if (user) {
        return user.username;
    }

    return null;
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getStoredData(key) {
    const value = localStorage.getItem(key);

    if(!value) {
        return null;
    }

    return JSON.parse(value);

}