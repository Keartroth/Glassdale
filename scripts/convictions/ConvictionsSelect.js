import { useConvictions } from "./convictionsDataProvider.js";

/*
 *   ConvictionSelect module that renders a select HTML element
 *   which lists all convictions in the Glassdale PD API.
 */

const eventHub = document.querySelector(".container");
const contentTargetElement = document.querySelector(".filters__crime");
/*
*   Provides the HTML structure for a list of options in the dropdown menu element,
*   (#crimeSelect), for filtering the list of criminal cards in (.listContainer).
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

/*  Accesses an array of criminal objects by invoking useCriminals and invokes 
*   convictionsRender with said array as the parameter, which renders a list
*   of options in the dropdown menue element (#crimeSelect).
*/
export const ConvictionSelect = () => {
    const convictions = useConvictions();
    convictionsRender(convictions);
}

// Dispatches a custom event, crimeSelected, and passes on the chosenCrime detail.
contentTargetElement.addEventListener(
    "change", 
    event => {
    if (event.target.id === "crimeSelect") {
            let chosenCrime = event.target.value;
            let changeConvictionEvent = new CustomEvent("crimeSelectedDetailEvent", {
                detail: {
                    key: chosenCrime
                }
            })
            eventHub.dispatchEvent(changeConvictionEvent);
        }
    }
)