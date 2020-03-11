const eventHub = document.querySelector(".container");

export const dialogElement = (criminalObject) => {
    let contentTargetElement = document.querySelector(`#criminal__information--${criminalObject.id}`);
    contentTargetElement.innerHTML +=`
        <dialog class="dialog--criminal" id="details--${criminalObject.id}">
            <ul>
            ${
            criminalObject.known_associates.map(criminal => {
                return `<li>Associate: ${criminal.name} | Alibi: ${criminal.alibi}</li>`
                })
            }
            </ul>
            <button class="button--close" id="close-${criminalObject.id}">Close</button>
        </dialog>
        `
}

// On the content target, listen for a "change" event.
eventHub.addEventListener(
    "click", 
    event => {
    // Only do this if the `crimeSelect` element was changed
    if (event.target.id.startsWith("associates--")) {
        // Create custom event. Provide an appropriate name.
        const [prefix, chosenCriminal] = event.target.id.split("--");
        const openDialogBox = new CustomEvent("dialogButtonEvent", {
            detail: {
                criminal: chosenCriminal
            }
        })
        // Dispatch to event hub
        eventHub.dispatchEvent(openDialogBox);
    }
})

eventHub.addEventListener("dialogButtonEvent", event => {
    const dialogSiblingSelector = `#associates--${event.detail.criminal}+dialog`;
    const theDialog = document.querySelector(dialogSiblingSelector);
    theDialog.showModal();
})

export const initializeCloseButtonEvents = () => {
    const allCloseButtons = document.querySelectorAll(".button--close")

    for (const btn of allCloseButtons) {
        btn.addEventListener(
            "click",
            theEvent => {
                const dialogElement = theEvent.target.parentNode
                dialogElement.close()
            }
        )
    }
}