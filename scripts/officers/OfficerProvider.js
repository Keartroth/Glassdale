// Sets empty array for getOfficers to place the parsed data in.
let officers = []

// Returns a copy of the array officers to be used later.
export const useOfficers = () => {
    return officers.slice();
}

// Fetches a JSON string of officers data and then converts it to a JavaScript array.
export const getOfficers = () => {
    return fetch("https://criminals.glassdale.us/officers")
        .then(response => response.json())
        .then(
            parsedOfficers => {
                console.table(parsedOfficers)
                officers = parsedOfficers
            }
        );
}