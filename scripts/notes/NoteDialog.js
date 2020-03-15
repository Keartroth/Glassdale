// Renders the dialog elements to the DOM for each specific criminal when being called in a for/of loop.
export const EditNoteDialogElement = (noteObject) => {
    let contentTargetElement = document.querySelector(`#note--${noteObject.id}`);
    contentTargetElement.innerHTML += `
        <dialog class="dialog--note" id="details--${noteObject.id}">
            <label for="note--date--edit--${noteObject.id}" class="note--date--editLabel">Date:</label>
            <input type="date" id="note--date--edit--${noteObject.id}" class="note--date--edit" required></br>
            <label for="note--suspect--edit--${noteObject.id}" class="note--suspect--editLabel">Suspect:</label>
            <textarea id="note--suspect--edit--${noteObject.id}" class="note--suspect--edit" required>${noteObject.suspect}</textarea></br>
            <label for="note--text--edit--${noteObject.id}" class="note--text--editLabel">Note:</label></br>
            <textarea id="note--text--edit--${noteObject.id}" class="note--text--edit" required>${noteObject.noteText}</textarea></br>
        
        
            <button id="editNoteSubmit--${noteObject.id}--${noteObject.criminalId}" class="editNoteSubmitButton">Submit Edited Note</button>
            <button class="button--close button--close--edit" id="close-${noteObject.id}">Close Unedited</button>
        </dialog>

        `
}