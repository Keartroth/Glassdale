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