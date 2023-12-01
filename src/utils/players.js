export function getAllPlayer() {
    return fetch("http://127.0.0.1:8000/player/get_all", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
    .then(res => res.json())
    .then(res => {
      return res;
    })
}

export function getPlayerById(id) {
    return fetch("http://localhost:8000/player/get_id", {
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
      return res;
    })
}