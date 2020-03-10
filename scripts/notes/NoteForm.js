const contentTarget = document.querySelector(".noteFormContainer")

const render = () => {
    contentTarget.innerHTML = `
    <form id="noteForm">
        <label for="note-date">Date:</label>
        <input type="date" id="note-date"></br>
        <label for="note-suspect">Suspect:</label>
        <input type="text" id="note-suspect"></br>
        <label for="note-text">Note:</label></br>
        <textarea id="note-text"></textarea></br>

        <button id="saveNote">Save Note</button>
    </form>
    `
}

export const NoteForm = () => {
    render()
}