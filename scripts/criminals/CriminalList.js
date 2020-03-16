import { useCriminals } from "./criminalDataProvider.js";
import { criminal } from "./Criminal.js";
import { dialogElement } from "./Dialog.js";

/*
 *   CriminalList module that renders a list of criminal HTML elements to .listContainer,
 *   depending on whether the full array or a filtered array is invoked.
 */

const eventHub = document.querySelector(".container");
const targetListContainerContentElement = document.querySelector(".listContainer");

// Renders individual criminalObjects onto the DOM by being called in a for/of loop.
const criminalRender = criminalObject => {
    targetListContainerContentElement.innerHTML += criminal(criminalObject);
}

// Render filtered criminals and dialog elements after filtering with changeConviction or changeOfficer custom event.
const filterRender = (filteredArray) => {
    targetListContainerContentElement.innerHTML = "";
    for (const arrayObject of filteredArray) {
        criminalRender(arrayObject);
        dialogElement(arrayObject);
    }
}

// Render ALL criminals and dialog elements initally.
export const criminalList = () => {
    targetListContainerContentElement.innerHTML = "";
    const appStateCriminals = useCriminals();
    for (const criminalObject of appStateCriminals) {
        criminalRender(criminalObject);
        dialogElement(criminalObject)
    }
}
/*
*   Listens for the custom event dispatched in OfficerSelect, changeOfficer,
*   to filter initial criminal list with the filterRender function.
*/
eventHub.addEventListener("changeOfficer", event => {
        const appStateCriminals = useCriminals();
        const matchingCriminals = appStateCriminals.filter(currentCriminal => currentCriminal.arrestingOfficer === event.detail.key)
        filterRender(matchingCriminals);
})

/*
*   Listens for the custom event dispatched in ConvictionSelect to filter
*   initial criminal list with the filterRender function.
*/
eventHub.addEventListener("changeConviction", event => {
        const appStateCriminals = useCriminals();
        const matchingCriminals = appStateCriminals.filter(currentCriminal => currentCriminal.conviction === event.detail.key)
        filterRender(matchingCriminals);
})

// Listen for the refresh crime list custom event, resetWasChosen, that was dispatched in ConvictionSelect or OfficerSelect.
eventHub.addEventListener("resetWasChosen", event => {
    if (event.detail.key === "0") {
        criminalList();
    }
})

/*
 *  Listens for the custom event, criminalListGenerate, to set the article element (.listContainer) to empty, 
 *  and render a list of witnesses to the DOM in (.listContainer) by running the criminalList function. 
*/
eventHub.addEventListener("criminalListGenerate", event => {
    criminalList();

})