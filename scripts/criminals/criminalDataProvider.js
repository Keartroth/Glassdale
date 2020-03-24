/*
 *   criminalDataProvider module that fetches an array of criminal objects, fills
 *   the array, criminals, and then copies the array and exports it for use elsewhere.
 */

// Sets empty array for getCriminals to place the parsed data in.
let criminals = [];

// Returns a copy of the array criminals to be used later.
export const useCriminals = () => {
    criminals.sort(
        (currentObject, nextObject) => {
            const [currentObjectFirstName, currentObjectLastName] = currentObject.name.split(" ");
            const [nextObjectFirstName, nextObjectLastName] = nextObject.name.split(" ");

            if (currentObjectLastName < nextObjectLastName) { return -1; }
            if (currentObjectLastName > nextObjectLastName) { return 1; }
            return 0;
        }
    )

    return criminals.slice();
}

// Fetches a JSON string of criminals data and then converts it to a JavaScript array.
export const getCriminals = () => {
    return fetch("https://criminals.glassdale.us/criminals")
        .then(response => response.json())
        .then(
            parsedCriminals => {
                criminals = parsedCriminals
            }
        );
}