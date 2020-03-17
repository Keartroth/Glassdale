const eventHub = document.querySelector(".container");
const targetHeaderContentElement = document.querySelector("#buttonContainer");

export const DisplayNoteFormButton = () => {
    targetHeaderContentElement.innerHTML = "<button id='button--showNoteForm'>Toggle Note Form</button>"
}

targetHeaderContentElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "button--showNoteForm") {
        const customEvent = new CustomEvent("noteFormButtonClicked")
        eventHub.dispatchEvent(customEvent)
    }
})