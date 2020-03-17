import { useConvictions } from "./convictionsDataProvider.js";

/*
 *   ConvictionSelect module that renders a select HTML element
 *   which lists all convictions in the Glassdale PD API
 */

const eventHub = document.querySelector(".container");
const contentTargetElement = document.querySelector(".filters__crime");
/*
*   Provides the HTML structure for a list of options
*   in the dropdown menue element (#crimeSelect) for ConvictionSelect.
*/
const convictionsRender = convictionsCollection => {
    contentTargetElement.innerHTML = `
        <select class="dropdown" id="crimeSelect">
            <option value="0">Please select a crime...</option>
            ${
                convictionsCollection.map(crime => {
                       return `<option id="crimeId--${crime.name}" value="${crime.name}" class="crimesMenueItem">${crime.name}</option>`
                   })
               }
        </select>
    `;
}

// Invokes convictionsRender which renders a list of options in the dropdown menue element (#crimeSelect).
export const ConvictionSelect = () => {
    const convictions = useConvictions();
    convictionsRender(convictions);
}
/*
*   Dispatches a custom event, either changeConviction or crimeWasChosen,
*   depending on the value the element (#crimeSelect) was changed to.
*/
contentTargetElement.addEventListener(
    "change", 
    event => {
    if (event.target.id === "crimeSelect") {
        // if (event.target.value !== "0") {
            let chosenCrime = event.target.value;
            let changeConvictionEvent = new CustomEvent("crimeSelected", {
                detail: {
                    key: chosenCrime
                }
            })
            eventHub.dispatchEvent(changeConvictionEvent);
        }
    // }
})