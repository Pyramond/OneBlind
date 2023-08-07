export function getAllModels() {
    return fetch("http://localhost:8000/getModels", {
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
    return fetch("http://localhost:8000/blind/findById", {
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