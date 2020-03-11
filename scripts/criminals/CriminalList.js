import { useCriminals } from "./CriminalProvider.js";
import { criminal } from "./Criminal.js";
import { dialogElement } from "./dialog.js";

const targetContentElement = document.querySelector(".criminalsContainer");
const eventHub = document.querySelector(".container");

// Listens for the custom event dispatched in ConvictionSelect
// to filter initial criminal list with the filterRender function
eventHub.addEventListener("changeConviction", event => {
    if ("crime" in event.detail) {
        const appStateCriminals = useCriminals();
        const matchingCriminals = appStateCriminals.filter(currentCriminal => currentCriminal.conviction === event.detail.crime)
        filterRender(matchingCriminals);
    }
})

// Listen for the refresh crime list custom event you dispatched in ConvictionSelect
eventHub.addEventListener("crimeWasChosen", event => {
    // You remembered to add the id of the crime to the event detail, right?
    if (event.detail.crime === "0") {
        criminalList();
    }
})

// Renders individual criminalObjects onto the DOM by being called in a for/of loop
const render = criminalObject => {
    targetContentElement.innerHTML += criminal(criminalObject);
}

// Render filtered criminals and dialog elements after filtering with changeConviction custom event
const filterRender = (filteredArray) => {
    targetContentElement.innerHTML = "";
    for (const arrayObject of filteredArray) {
        render(arrayObject);
        dialogElement(arrayObject);
    }
}

// Render ALL criminals and dialog elements initally
export const criminalList = () => {
    const appStateCriminals = useCriminals();
    for (const criminalObject of appStateCriminals) {
        render(criminalObject);
        dialogElement(criminalObject)
    }
}