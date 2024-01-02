export function getAllModels() {
    return fetch("http://localhost:8000/blind/get_models", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
      })
      .then(res => res.json())
      .then(res => {
          return res
      })
}

export function getModelById(id) {
    return fetch("http://localhost:8000/blind/get_id", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id
        })
      })
      .then(res => res.json())
      .then(res => {
          return res
      })
}


export function addModel(name, steps) {
    return fetch("http://localhost:8000/blind/add", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            steps: steps
        })
    })
    .then(res => res.json())
    .then(res => {
        return res;
    });
}


export function removeModel(name, id) {
    return fetch("http://localhost:8000/blind/delete", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            id: id
        })
      })
      .then(res => res.json())
      .then(res => {
        return res
      })
}