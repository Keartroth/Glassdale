const eventHub = document.querySelector(".container")

const dispatchStateChangeEvent = () => {
    const noteStateChangedEvent = new CustomEvent("noteStateChanged")

    eventHub.dispatchEvent(noteStateChangedEvent)
}

// Sets empty array for getNotes to place the parsed data in.
let notes = [];

// Returns a copy of the array notes to be used later.
export const useNotes = () => {
    return notes.slice();
}

// Fetches a JSON string of notes data and then converts it to a JavaScript array.
export const getNotes = () => {
    fetch('http://localhost:8088/notes')
        .then(response => response.json())
        .then(
            parsedNotes => {
            notes = parsedNotes
        }
        );

}

// Converts a JavaScript string of criminals data to a JSON string and then Posts it.
export const saveNote = note => {
    fetch('http://localhost:8088/notes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    })
    .then(getNotes)
    .then(dispatchStateChangeEvent)
}