/*
 *   CriminalListButton component that renders a Show All Criminals
 *   HTML element which lists all criminals in the Glassdale PD API
 */

const eventHub = document.querySelector(".container");
const targetHeaderContentElement = document.querySelector("#buttonContainer");

// Inserts a button, Show All Criminals, onto the DOM in the header element (.headerContainer).
export const criminalListButton = () => {
    targetHeaderContentElement.innerHTML +=`
    <button id="button--criminalList">Show All Criminals</button>
    `
}
/*
*   Listens for a "click" event and dispatches the custom event, criminalListGenerate, to the eventHub
*   to set the article element (.listContainer) to empty and render a list of criminals to the DOM in (.listContainer).
*/
eventHub.addEventListener(
    "click", 
    event => {
    if (event.target.id === ("button--criminalList")) {
        const criminalListGenerateEvent = new CustomEvent("criminalListGenerate");
        eventHub.dispatchEvent(criminalListGenerateEvent);
    }
})