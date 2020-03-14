const eventHub = document.querySelector(".container");

// Renders the dialog elements to the DOM for each specific criminal when being called in a for/of loop.
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
/*
 *  Listens for a "click" event and dispatches the custom event, dialogButtonDetailEvent,
 *  to the eventHub to open a corresponding dialog box.
*/
eventHub.addEventListener(
    "click", 
    event => {
    if (event.target.id.startsWith("associates--")) {
        const [prefix, chosenCriminal] = event.target.id.split("--");
        const openDialogBox = new CustomEvent("dialogButtonDetailEvent", {
            detail: {
                criminal: chosenCriminal
            }
        })
        eventHub.dispatchEvent(openDialogBox);
    }
})

// Listens for the custom event, dialogButtonDetailEvent, to open a corresponding dialog box.
eventHub.addEventListener("dialogButtonDetailEvent", event => {
    const dialogSiblingSelector = `#associates--${event.detail.criminal}+dialog`;
    const theDialog = document.querySelector(dialogSiblingSelector);
    theDialog.showModal();
})
/*
*   Listens for a "click" event and dispatches the custom event, dialogButtonCloseEvent,
*   to the eventHub to close a corresponding dialog box.
*/
eventHub.addEventListener(
    "click", 
    event => {
    if (event.target.id.startsWith("close-")) {
        const [prefix, chosenDialog] = event.target.id.split("-");
        const closeDialogBox = new CustomEvent("dialogButtonCloseEvent", {
            detail: {
                boxID: chosenDialog
            }
        })
        eventHub.dispatchEvent(closeDialogBox);
    }
})

// Listens for the custom event, dialogButtonCloseEvent, to close a corresponding dialog box.
eventHub.addEventListener("dialogButtonCloseEvent", event => {
    const theDialogBoxID = `#details--${event.detail.boxID}`;
    const theDialogElement = document.querySelector(theDialogBoxID);
    theDialogElement.close();
})