import displayFeedback from "./displayFeedback.js";
import { apiUrl } from "../data/api.js";

export function createBanner(data) {
    if (data.length === 0) {
        displayFeedback("danger", emptySearchResult);
    }

    document.querySelector(".hero__banner").style.background = `url("${apiUrl}${data.hero_banner.url}") no-repeat top center fixed`;
}

const container = "#hero";
const bannerUrl = apiUrl + "/home";

async function getBanner() {
    try {
        const response = await fetch(bannerUrl);
        const banner = await response.json();

        createBanner(banner, container);
    } catch (error) {
        displayFeedback("error", error, container);
    }
}

getBanner();


