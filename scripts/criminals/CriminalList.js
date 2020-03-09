import { useCriminals } from "./CriminalProvider.js";
import { criminal } from "./Criminal.js";

const targetContentElement = document.querySelector(".criminalsContainer");

export const criminalList = () => {
    const arrayOfCriminalObjects = useCriminals();

    for (const criminalObject of arrayOfCriminalObjects) {
        targetContentElement.innerHTML += criminal(criminalObject);
    }
}