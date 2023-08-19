export function getAllCurrentTournaments() {
    return fetch("http://localhost:8000/tournament/getAllCurrent", {
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


export function getTournamentPlayers(id) {
    return fetch("http://localhost:8000/tournament/getPlayers", {
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

export function deleteTournament(id) {
  return fetch("http://localhost:8000/tournament/delete", {
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

export function getTournamentById(id) {
  return fetch("http://localhost:8000/tournament/getById", {
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