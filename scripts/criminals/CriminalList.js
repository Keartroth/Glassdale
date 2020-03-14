import { useCriminals } from "./CriminalProvider.js";
import { criminal } from "./Criminal.js";
import { dialogElement } from "./dialog.js";

const targetHeaderContentElement = document.querySelector("#buttonContainer");
const targetContentElement = document.querySelector(".listContainer");
const eventHub = document.querySelector(".container");
/*
*   Listens for the custom event dispatched in ConvictionSelect
*   to filter initial criminal list with the filterRender function.
*/
eventHub.addEventListener("changeConviction", event => {
    if ("crime" in event.detail) {
        const appStateCriminals = useCriminals();
        const matchingCriminals = appStateCriminals.filter(currentCriminal => currentCriminal.conviction === event.detail.crime)
        filterRender(matchingCriminals);
    }
})

// Listen for the refresh crime list custom event, crimeWasChosen, that was dispatched in ConvictionSelect.
eventHub.addEventListener("crimeWasChosen", event => {
    if (event.detail.crime === "0") {
        criminalList();
    }
})

// Renders individual criminalObjects onto the DOM by being called in a for/of loop.
const criminalRender = criminalObject => {
    targetContentElement.innerHTML += criminal(criminalObject);
}

// Render filtered criminals and dialog elements after filtering with changeConviction custom event.
const filterRender = (filteredArray) => {
    targetContentElement.innerHTML = "";
    for (const arrayObject of filteredArray) {
        criminalRender(arrayObject);
        dialogElement(arrayObject);
    }
}

// Render ALL criminals and dialog elements initally.
export const criminalList = () => {
    targetContentElement.innerHTML = "";
    const appStateCriminals = useCriminals();
    for (const criminalObject of appStateCriminals) {
        criminalRender(criminalObject);
        dialogElement(criminalObject)
    }
}

// Inserts a button, Show All Criminals, onto the DOM in the header element (.headerContainer).
export const criminalListButton = () => {
    targetHeaderContentElement.innerHTML +=`
    <button id="button--criminalList">Show All Criminals</button>
    `
}
/*
*   Listens for a "click" event and dispatches the custom event, witnessListButtonClicked, to the eventHub
*   to set the article element (.listContainer) to empty and render a list of witnesses to the DOM in (.listContainer).
*/
eventHub.addEventListener(
    "click", 
    event => {
    if (event.target.id === ("button--criminalList")) {
        const criminalListGenerateEvent = new CustomEvent("criminalListGenerate");
        eventHub.dispatchEvent(criminalListGenerateEvent);
    }
})
/*
 *  Listens for the custom event, criminalListGenerate, to set the article element (.listContainer) to empty, 
 *  and render a list of witnesses to the DOM in (.listContainer) by running the criminalList function. 
*/
eventHub.addEventListener("criminalListGenerate", event => {
    criminalList();

})