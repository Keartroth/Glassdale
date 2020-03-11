/*
 *   ConvictionSelect component that renders a select HTML element
 *   which lists all convictions in the Glassdale PD API
 */

 import { useConvictions } from "./ConvictionsProvider.js";

const eventHub = document.querySelector(".container");
const contentTargetElement = document.querySelector(".filters__crime");

// Dispatches a custom event, either changeConviction or crimeWasChosen,
// depending on the value the element (#crimeSelect) was changed to.
contentTargetElement.addEventListener(
    "change", 
    event => {
        console.log("event triggered.")
    if (event.target.id === "crimeSelect") {
        console.log("event triggered inside if statement.")
        if (event.target.value !== "0") {
            let chosenCrime = event.target.value;
            let changeConvictionEvent = new CustomEvent("changeConviction", {
                detail: {
                    crime: chosenCrime
                }
            })
            eventHub.dispatchEvent(changeConvictionEvent);
        } else if (event.target.value === "0") {
            let chosenCrime = event.target.value;
            let changeConvictionEvent = new CustomEvent("crimeWasChosen", {
                detail: {
                    crime: chosenCrime
                }
            })
            eventHub.dispatchEvent(changeConvictionEvent);
        }
    }
})

// Provides the HTML structure for a list of options
// in the dropdown menue element (#crimeSelect) for ConvictionSelect.
const render = convictionsCollection => {
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

// Renders a list of options in the dropdown menue element (#crimeSelect).
export const ConvictionSelect = () => {
    const convictions = useConvictions();
    render(convictions);
}