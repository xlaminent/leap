export function regExCheck (email) {
    const regEx = /\S+@\S+\.\S+/;
    const pattern = regEx.test(email);

    return pattern;
}

export function checkInputLength (value, inputLength) {
    if (value.trim().length > inputLength) {
        return true;
    } else {
        return false;
    }
}