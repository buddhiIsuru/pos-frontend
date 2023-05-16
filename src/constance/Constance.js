import axios from "axios";

export const API = axios.create({
    baseURL: 'http://localhost:8080',
});

export const vatNo = "OM110016986X";
export const vatPercentage = 5;

export const removeReplaceCharactors = (str) => {
    // remove underscore and replace with space
    str = str.replace(/_/g, " ");
    // replace double spaces with a single space
    str = str.replace(/  +/g, " ");
    // capitalize first letter of each word
    str = str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    return str;
}