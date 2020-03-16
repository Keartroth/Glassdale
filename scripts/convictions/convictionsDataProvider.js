/*
 *   convictionsDataProvider module that fetches an array of conviction objects, fills
 *   the array, convictions, and then copies the array and exports it for use elsewhere.
 */

// Sets empty array for getConvictions to place the parsed data in.
let convictions = [];

// Returns a copy of the array convictions to be used later.
export const useConvictions = () => {
    return convictions.slice();
}

// Fetches a JSON string of criminals data and then converts it to a JavaScript array.
export const getConvictions = () => {
    return fetch("https://criminals.glassdale.us/crimes")
        .then(response => response.json())
        .then(
            parsedConvictions => {
                convictions = parsedConvictions
            }
        );
}