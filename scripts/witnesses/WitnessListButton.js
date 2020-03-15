const eventHub = document.querySelector(".container");
const targetHeaderContentElement = document.querySelector("#buttonContainer");

// Inserts a button, Witness Statements, onto the DOM in the header element (.headerContainer).
export const witnessListButton = () => {
    targetHeaderContentElement.innerHTML +=`
    <button id="button--witnessList">Witness Statements</button>
    `
}
/*
 *  Listens for a "click" event and dispatches the custom event, witnessListGenerate, to the eventHub
 *  to set the article element (.listContainer) to empty and render a list of witnesses to the DOM in (.listContainer). 
*/
targetHeaderContentElement.addEventListener(
    "click", 
    event => {
    if (event.target.id === ("button--witnessList")) {
        const witnessListGenerateEvent = new CustomEvent("witnessListGenerate");
        eventHub.dispatchEvent(witnessListGenerateEvent);
    }
})