import { useOfficers } from "./officerDataProvider.js";

/*
 *   OfficerSelect module that renders a select HTML element which filters
 *   all criminals in the Glassdale PD API by their arresting officer.
 */

const eventHub = document.querySelector(".container");
const filterOfficerContentTargetElement = document.querySelector(".filters__officer");
/*
*   Provides the HTML structure for a list of options in the
*   dropdown menue element (#officerSelect) for OfficerSelect.
*/
export const officerRender = officersCollection => {
    filterOfficerContentTargetElement.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select an officer...</option>
            ${
                officersCollection.map(officer => {
                       return `<option id="officerId--${officer.id}" value="${officer.name}" class="officersMenueItem">${officer.name}</option>`
                   })
               }
        </select>
    `;
}

// Invokes officerRender which renders a list of options in the dropdown menue element (#officerSelect).
export const OfficerSelect = () => {
    const officers = useOfficers();
    officerRender(officers);
}
/*
*   Dispatches a custom event, either changeOfficer or officerWasChosen,
*   depending on the value the element (#officerSelect) was changed to.
*/
filterOfficerContentTargetElement.addEventListener(
    "change", 
    event => {
    if (event.target.id === "officerSelect") {
        if (event.target.value !== "0") {
            let chosenOfficer = event.target.value;
            let changeOfficerEvent = new CustomEvent("changeOfficer", {
                detail: {
                    key: chosenOfficer
                }
            })
            eventHub.dispatchEvent(changeOfficerEvent);
        } else if (event.target.value === "0") {
            let chosenOfficer = event.target.value;
            let changeOfficerEvent = new CustomEvent("resetWasChosen", {
                detail: {
                    key: chosenOfficer
                }
            })
            eventHub.dispatchEvent(changeOfficerEvent);
        }
    }
})