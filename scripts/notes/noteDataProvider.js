import { NoteList } from "./NoteList.js";

const eventHub = document.querySelector(".container")

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

// Dispatches noteStateChanged to the eventHub so that getNotes will update the array notes.
export const dispatchStateChangeEvent = () => {
    const noteStateChangedEvent = new CustomEvent("noteStateChanged");
    eventHub.dispatchEvent(noteStateChangedEvent);
}
/*
*   Listens for the custom event, noteStateChanged, on the eventHub
*   and calls the function getNotes to re-evaluate the notes array.
*/
eventHub.addEventListener(
    "noteStateChanged",
    getNotes(),
    NoteList()
)

// Converts a JavaScript string of criminals data to a JSON string, Posts it, and then dispatches a custom event to the eventHub to refresh the notes array.
export const saveNote = note => {
    fetch('http://localhost:8088/notes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    })
    .then(dispatchStateChangeEvent);
}

// Deletes a string of criminals data in a JSON file, and then dispatches a custom event to the eventHub to refresh the notes array.
export const deleteNote = noteId => {
    return fetch(`http://localhost:8088/notes/${noteId}`, {
        method: "DELETE"
    })
        .then(dispatchStateChangeEvent);
}

// Edits the data in a JSON file, and then dispatches a custom event to the eventHub to refresh the notes array.
export const editNote = (note) => {
    return fetch(`http://localhost:8088/notes/${note.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note)
    })
    .then(dispatchStateChangeEvent);
}