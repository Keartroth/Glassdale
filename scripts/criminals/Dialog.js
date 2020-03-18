/*
 *   Dialog component that renders a dialog HTML element to each criminal element in .listContainer,
 *   with an unordered list of known associates with the associates alibi.
 */

const eventHub = document.querySelector(".container");
const targetListContainerContentElement = document.querySelector(".listContainer");
/*
* Exports the function, dialogElement, which renders the associate alibi dialog elements to the DOM
*for each specific criminal when being called in a for/of loop.
*/
export const dialogElement = (criminalObject) => {
    let contentTargetElement = document.querySelector(`#criminal__information--${criminalObject.id}`);
    contentTargetElement.innerHTML +=`
        <dialog class="dialog--criminal" id="details--${criminalObject.id}">
            <ul>
            ${
            criminalObject.known_associates.map(criminal => {
                return `<li>Associate: ${criminal.name} | Alibi: ${criminal.alibi}</li>`
                }).join("")
            }
            </ul>
            <button class="button--close" id="close-${criminalObject.id}">Close</button>
        </dialog>
        `
}

// Listens for the custom event, dialogButtonDetailEvent, to open a corresponding dialog box.
eventHub.addEventListener("dialogButtonDetailEvent", event => {
    const dialogSiblingSelector = `#associates--${event.detail.criminal}+dialog`;
    const theDialog = document.querySelector(dialogSiblingSelector);
    theDialog.showModal();
})

// Listens for a "click" event and closes a corresponding dialog box.
export const initializeDialogCloseEvent = () => {
    targetListContainerContentElement.addEventListener(
        "click", 
        event => {
        if (event.target.id.startsWith("close-")) {
            const [prefix, chosenDialog] = event.target.id.split("-");
            const theDialogBoxID = `#details--${chosenDialog}`;
            const theDialogElement = document.querySelector(theDialogBoxID);
            theDialogElement.close();
        }
    })
}