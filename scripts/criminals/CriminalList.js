import { useCriminals } from "./CriminalProvider.js";
import { criminal } from "./Criminal.js";

const targetContentElement = document.querySelector(".criminalsContainer");
const eventHub = document.querySelector(".container");

// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener("changeConviction", event => {
    // You remembered to add the id of the crime to the event detail, right?
    if ("crime" in event.detail) {
        /*
            Filter the criminals application state down to the people that committed the crime
        */
        const appStateCriminals = useCriminals();
        const matchingCriminals = appStateCriminals.filter(currentCriminal => currentCriminal.conviction === event.detail.crime)
        /*
        Then invoke render() and pass the filtered collection as
        an argument
         */
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

const render = criminalObject => {
    targetContentElement.innerHTML += criminal(criminalObject);
}

const filterRender = (filteredArray) => {
    targetContentElement.innerHTML = "";
    for (const arrayObject of filteredArray) {
        render(arrayObject);
    }
}

// Render ALL criminals initally
export const criminalList = () => {
    const appStateCriminals = useCriminals();
    for (const criminalObject of appStateCriminals) {
        render(criminalObject);
    }
}