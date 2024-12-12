const baseEndpoint = import.meta.env.VITE_BACKEND_SERVER;

function fetchWrapper(url, method, body = null) {
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    const options = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
    };

    return fetch(`${baseEndpoint}${url}`, options)
        .then(res => res.json())
        .then(res => res)
        .catch(error => {
            console.error('Error during fetch:', error);
        });
}


export function deletePoints() {
    return fetchWrapper("/database/remove_points", "GET");
}