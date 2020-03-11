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

// On the content target, listen for a "change" event.
eventHub.addEventListener(
    "click", 
    event => {
    // Only do this if the `crimeSelect` element was changed
    if (event.target.id.startsWith("associates--")) {
        // Create custom event. Provide an appropriate name.
        const [prefix, chosenCriminal] = event.target.id.split("--");
        const openDialogBox = new CustomEvent("dialogButtonEvent", {
            detail: {
                criminal: chosenCriminal
            }
        })
        // Dispatch to event hub
        eventHub.dispatchEvent(openDialogBox);
    }
})

eventHub.addEventListener("dialogButtonEvent", event => {
    const dialogSiblingSelector = `#associates--${event.detail.criminal}+dialog`;
    const theDialog = document.querySelector(dialogSiblingSelector);
    theDialog.showModal();
})

export const initializeCloseButtonEvents = () => {
    const allCloseButtons = document.querySelectorAll(".button--close")

    for (const btn of allCloseButtons) {
        btn.addEventListener(
            "click",
            theEvent => {
                const dialogElement = theEvent.target.parentNode
                dialogElement.close()
            }
        )
    }
}