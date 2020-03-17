import { saveNote } from "./noteDataProvider.js";
import { useCriminals, findCriminalID } from "../criminals/criminalDataProvider.js";
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
    contentTargetElement.classList.add("hidden")
    contentTargetElement.innerHTML = `
    <form id="noteForm">
        <label for="note--date">Date:</label>
        <input type="date" id="note--date"></br>
        <label for="note--suspect">Suspect:</label>
        <input type="text" id="note--suspect"></br>
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
/*
 *  Adds a "click" event listener to the button element (#saveNote) that collects the user entered data 
 *  of the form element (#noteForm) and runs the function saveNote to submit the data. 
*/
contentTargetElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {
        const criminals = useCriminals();
        const contentTargetDate = document.getElementById("note--date").value;
        const contentTargetSuspect = document.getElementById("note--suspect").value;
        const contentTargetNoteText = document.getElementById("note--text").value;
        const relatedCriminalId = findCriminalID(criminals, contentTargetSuspect);

        const newNote = {
            "date": contentTargetDate,
            "suspect": contentTargetSuspect,
            "noteText": contentTargetNoteText,
            "criminalId": relatedCriminalId
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