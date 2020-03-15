// Sets empty array for getCriminals to place the parsed data in.
let criminals = [];

// Returns a copy of the array criminals to be used later.
export const useCriminals = () => {
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
/*
 *  A function, findCriminalID, that returns the value from the key/value pair in a criminal object ("criminalId": X,)
 *  in order to store the criminal's unknown number in the new note added when a user clicks the Save Note button. 
*/
export const findCriminalID = (arrayOfCriminalObjects, criminalName) => {
    //Declair a variable to store the final value, then map over the criminal array in order to find a matching value, then return it.
    const criminalIdValue = arrayOfCriminalObjects.filter(criminal => criminal.name === criminalName);
    return criminalIdValue[0].id;
}