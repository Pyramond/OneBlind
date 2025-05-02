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


export function add_chips(color, value) {
    const body = {
        "color": color,
        "value": value
    };
    return fetchWrapper("/chips/add", "POST", body);
}


export function remove_chip() {
    const body = {
        "id": 5
    };
    return fetchWrapper("/chips/remove", "DELETE", body);
}

export async function get_all_chips() {
    return await fetchWrapper("/chips", "GET");
}