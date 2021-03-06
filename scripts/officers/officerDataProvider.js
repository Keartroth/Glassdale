/*
 *   officerDataProvider module that fetches an array of officer objects, fills the array, officers,
 *   and then copies the array with the funciton, useOfficers, and exports it for use elsewhere.
 */

// Sets empty array for getOfficers to place the parsed data in.
let officers = [];

// Returns a copy of the array officers to be used later.
export const useOfficers = () => {
    officers.sort(
        (currentObject, nextObject) => {
            const [currentObjectFirstName, currentObjectLastName] = currentObject.name.split(" ");
            const [nextObjectFirstName, nextObjectLastName] = nextObject.name.split(" ");

            if (currentObjectLastName < nextObjectLastName) { return -1; }
            if (currentObjectLastName > nextObjectLastName) { return 1; }
            return 0;
        }
    )
    return officers.slice();
}

// Fetches a JSON string of officers data and then converts it to a JavaScript array.
export const getOfficers = () => {
    return fetch("https://criminals.glassdale.us/officers")
        .then(response => response.json())
        .then(
            parsedOfficers => {
                // console.table(parsedOfficers)
                officers = parsedOfficers
            }
        );
}