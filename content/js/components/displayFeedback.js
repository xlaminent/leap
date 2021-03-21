export default function displayFeedback(type, message, targetElement) {
    const target = document.querySelector(targetElement);
    target.innerHTML = `<p class="feedback ${type}">${message}</p>`;
}
