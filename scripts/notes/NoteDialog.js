/*
 *   NoteDialog component that renders a dialog HTML element to each note element in .notesContainer,
 *   with a form .
 */

import { useCriminals } from "../criminals/criminalDataProvider.js";

const eventHub = document.querySelector(".container");
const notesContainerContentTargetElement = document.querySelector(".notesContainer");

// Renders the dialog elements to the DOM for each specific criminal when being called in a for/of loop within the note about that criminal.
export const EditNoteDialogElement = (noteObject) => {
    const arrayOfCriminalObjects = useCriminals();
    const contentTargetElement = document.querySelector(`#note--${noteObject.id}`);
    contentTargetElement.innerHTML += `
        <dialog class="dialog--note" id="note--details--${noteObject.id}">
            <form>
                <label for="note--date--edit--${noteObject.id}" class="note--date--editLabel">Date:</label>
                <input type="date" id="note--date--edit--${noteObject.id}" class="note--date--edit" required></br>
                <label for="note--suspect--edit--${noteObject.id}" class="note--suspect--editLabel">Suspect:</label>
                <select id="note--suspect--edit--${noteObject.id}" class="note--suspect--edit" required>
                    ${
                        arrayOfCriminalObjects.map(
                            (currentCriminalObject) => {
                                const [firstName, lastName] = currentCriminalObject.name.split(" ");
                                return `<option value="${currentCriminalObject.id}">${lastName}, ${firstName}</option>`
                            }
                        ).join("")
                    }
                </select></br>
                <label for="note--text--edit--${noteObject.id}" class="note--text--editLabel">Note:</label></br>
                <textarea id="note--text--edit--${noteObject.id}" class="note--text--edit" required>${noteObject.noteText}</textarea></br>
            
            
            </form>
                <button id="editNoteSubmit--${noteObject.id}" class="editNoteSubmitButton">Submit Edited Note</button>

                <button class="button--close button--close--edit" id="close-${noteObject.id}">Close Unedited</button>
        </dialog>
        `
}
// Listens for the custom event, editDialogButtonDetailEvent, to open a corresponding dialog box.
eventHub.addEventListener("editDialogButtonDetailEvent", event => {
    const dialogSiblingSelector = `#editNote--${event.detail.note}--criminal--${event.detail.criminal}+dialog`;
    const editDialog = document.querySelector(dialogSiblingSelector);
    editDialog.showModal();
    const setDate = (noteObjectDate) => {
        const dialogDateNode = editDialog.getElementsByClassName("note--date--edit");
        dialogDateNode[0].value = `${noteObjectDate}`;
      }
    setDate(event.detail.date);
    const setSuspect = (noteObjectSuspect) => {
        const dialogSuspectNode = editDialog.getElementsByClassName("note--suspect--edit");
        dialogSuspectNode[0].value = `${noteObjectSuspect}`;
      }
      setSuspect(event.detail.criminal);
})

// Listens for a "click" event and invokes the function, editNote, to replace the JSON data object with new values.
notesContainerContentTargetElement.addEventListener(
    "click", 
    theEditEvent => {
        if (theEditEvent.target.id.startsWith("editNoteSubmit--")) {
            const [prefix, editedNoteId] = theEditEvent.target.id.split('--');
            const contentTargetDate = document.getElementById(`note--date--edit--${editedNoteId}`).value;
            const contentTargetNoteText = document.getElementById(`note--text--edit--${editedNoteId}`).value;
            const editedCriminalNoteId = document.getElementById(`note--suspect--edit--${editedNoteId}`).value;

            const editedNoteObject = {
                "date": contentTargetDate,
                "noteText": contentTargetNoteText,
                "criminalId": parseInt(editedCriminalNoteId),
                "id": parseInt(editedNoteId)
            }

            const theEditNoteEvent = new CustomEvent("editNoteEvent", {
                detail: {
                    note: editedNoteObject,
                }
            })
            eventHub.dispatchEvent(theEditNoteEvent);
            document.getElementById(`note--details--${editedNoteId}`).close()
        }
    }
)

// Listens for a "click" event and closes a corresponding dialog box.
notesContainerContentTargetElement.addEventListener(
    "click", 
    event => {
    if (event.target.id.startsWith("close-")) {
        const [prefix, chosenDialog] = event.target.id.split("-");
        const theDialogBoxID = `#note--details--${chosenDialog}`;
        const theDialogElement = document.querySelector(theDialogBoxID);
        theDialogElement.close();
    }
})