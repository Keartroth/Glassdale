import { witness } from "./witness.js";
import { useWitnesses } from "./witnessDataProvider.js";

const targetHeaderContentElement = document.querySelector("#buttonContainer");
const targetListContainerContentElement = document.querySelector(".listContainer");
const eventHub = document.querySelector(".container");

// Renders individual witnessObjects onto the DOM by being called in a for/of loop by the function witnessList.
const render = witnessObject => {
    targetListContainerContentElement.innerHTML += witness(witnessObject);
}

// Remove all criminals and runs the function render to render all witnesses elements
// to the article element (.listContainer) when the button element (#button--witnessList) is "clicked".
export const witnessList = () => {
    targetListContainerContentElement.innerHTML = "";
    const arrayOfWitnessObjects = useWitnesses();
    for (const witnessObject of arrayOfWitnessObjects) {
        render(witnessObject);
    }
}

// Inserts a button, Witness Statements, onto the DOM in the header element (.headerContainer).
export const witnessListButton = () => {
    targetHeaderContentElement.innerHTML +=`
    <button id="button--witnessList">Witness Statements</button>
    `
}

// Listens for a "click" event and dispatches the custom event, witnessListButtonClicked, to the eventHub
// to set the article element (.listContainer) to empty and render a list of witnesses to the DOM in (.listContainer).
eventHub.addEventListener(
    "click", 
    event => {
    if (event.target.id === ("button--witnessList")) {
        const witnessListGenerateEvent = new CustomEvent("witnessListGenerate");
        eventHub.dispatchEvent(witnessListGenerateEvent);
    }
})

// Listens for the custom event, witnessListButtonClicked, to set the article element (.listContainer) to empty,
// and render a list of witnesses to the DOM in (.listContainer).
eventHub.addEventListener("witnessListGenerate", event => {
    witnessList()
})