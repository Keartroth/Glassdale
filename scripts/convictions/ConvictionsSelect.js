/*
 *   ConvictionSelect component that renders a select HTML element
 *   which lists all convictions in the Glassdale PD API
 */

 import { useConvictions } from "./ConvictionsProvider.js";

/*
    Which element in your HTML contains all components?
    That's your Event Hub. Get a reference to it here.
*/

const eventHub = document.querySelector(".container");
const contentTargetElement = document.querySelector(".filters__crime");

// On the content target, listen for a "change" event.
contentTargetElement.addEventListener(
    "change", 
    event => {
    // Only do this if the `crimeSelect` element was changed
    if (event.target.value !== "0") {
        // Create custom event. Provide an appropriate name.
        let chosenCrime = event.target.value;
        let changeConvictionEvent = new CustomEvent("changeConviction", {
            detail: {
                crime: chosenCrime
            }
        })
        // Dispatch to event hub
        eventHub.dispatchEvent(changeConvictionEvent);
    } else if (event.target.value === "0") {
        let chosenCrime = event.target.value;
        let changeConvictionEvent = new CustomEvent("crimeWasChosen", {
            detail: {
                crime: chosenCrime
            }
        })
        // Dispatch to event hub
        eventHub.dispatchEvent(changeConvictionEvent);
    }
})

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

const ConvictionSelect = () => {
    const convictions = useConvictions();
    render(convictions);
}

export default ConvictionSelect;