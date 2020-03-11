export let witnesses = [];

export const useWitnesses = () => {
    return witnesses.slice();
}

export const getWitnesses = () => {
    return fetch("http://criminals.glassdale.us/witnesses")
        .then(response => response.json())
        .then(
            parsedWitnesses => {
                witnesses = parsedWitnesses
            }
        );
}