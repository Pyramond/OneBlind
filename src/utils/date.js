export function getDate() {
    const date = new Date()
    const month = date.getMonth() + 1
    const dateFormated = date.getDate() + "/" + month + "/" + date.getFullYear()

    return dateFormated
}

export function getHours() {
    const date = new Date()
    const hours = date.getHours() + ":" + date.getMinutes()

    return hours
}

export function getTimeStamp() {
    return Date.now()
}

export function convertTimeStamp(timestamp) {

    const date = new Date(timestamp);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const dateLisible = date.toLocaleString("fr-FR", options);

    return dateLisible
}