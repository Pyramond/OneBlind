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


export function getAllModels() {
    return fetchWrapper("/blind/get_models", "GET");
}
  
export function getModelById(id) {
    return fetchWrapper("/blind/get_id", "POST", { id });
}
  
export function addModel(name, steps) {
    const body = {
      name,
      steps
    };
    return fetchWrapper("/blind/add", "POST", body);
}
  
export function removeModel(name, id) {
    return fetchWrapper("/blind/delete", "POST", { name, id });
}