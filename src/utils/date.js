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

export function convertTimeStampDate(timestamp) {

    const date = new Date(timestamp);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric'};
    const dateLisible = date.toLocaleString("fr-FR", options);

    return dateLisible
}

export function formatDate(timeStamp) {
    const months = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    const date = new Date(timeStamp);
    const day = days[date.getDay()];
    const dateOfMonth = date.getDate();
    const month = months[date.getMonth()];

    return `${day} ${dateOfMonth} ${month}`;
}