export function getAllPlayer() {
    return fetch("http://127.0.0.1:8000/getAllPlayers", {
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