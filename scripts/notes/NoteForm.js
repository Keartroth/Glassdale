import { saveNote } from "./noteDataProvider.js";
import { useCriminals } from "../criminals/criminalDataProvider.js";
/*
*   NoteForm component which exports the functions, noteRender & NoteForm, that renders HTML elements
*   giving structure to note elements when looped through an array of note objects.
*/
const eventHub = document.querySelector(".container");
const contentTargetElement = document.querySelector(".noteFormContainer");

let visibility = false;
/*
 *  Structure for a form element (#noteForm) to be inserted to the DOM at (.noteFormContainer), 
 *  when called by the function NoteForm.
 */
export const noteRender = () => {
    contentTargetElement.classList.add("hidden");
    const arrayOfCriminalObjects = useCriminals();

    contentTargetElement.innerHTML = `
    <form id="noteForm">
        <label for="note--date">Date:</label>
        <input type="date" id="note--date"></br>
        <label for="note--suspect">Suspect:</label>
        <select id="note--suspect">
            <option value="0">Please Choose a Criminal...</option>
            ${
                arrayOfCriminalObjects.map(
                    (currentCriminalObject) => {
                        return `<option value="${currentCriminalObject.id}">${currentCriminalObject.name}</option>`
                    }
                ).join("")
            }
        </select></br>
        <label for="note--text">Note:</label></br>
        <textarea id="note--text"></textarea></br>

    </form>
        <button id="saveNote">Save Note</button>
    `
}

// Renders a form to the DOM in the article element (.noteFormContainer) that is used to submit case notes.
export const NoteForm = () => {
    noteRender()
}

// Function that resets the form, #noteForm, when invoked.
export const resetNoteForm = () => {
    const noteFormTarget = document.getElementById("noteForm");
    noteFormTarget.reset();
}
/*
 *  Adds a "click" event listener to the button element (#saveNote) that collects the user entered data 
 *  of the form element (#noteForm) and runs the function saveNote to submit the data. 
*/
contentTargetElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {
        const contentTargetDate = document.getElementById("note--date").value;
        const CriminalId = document.getElementById("note--suspect").value;
        const contentTargetNoteText = document.getElementById("note--text").value;

        const newNote = {
            "date": contentTargetDate,
            "noteText": contentTargetNoteText,
            "criminalId": parseInt(CriminalId)
        }
        saveNote(newNote)
    }
})

// Listens for a "click" event listener on the button element (#showNoteForm) which toggles the NoteForm visibility.
eventHub.addEventListener("noteFormButtonClicked", customEvent => {
    visibility = !visibility

    if (visibility) {
        contentTargetElement.classList.remove("hidden")
    }
    else {
        contentTargetElement.classList.add("hidden")
    }
})