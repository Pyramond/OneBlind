export function getAllCurrentTournaments() {
    return fetch("http://localhost:8000/tournament/get_currents", {
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

export function getAllTournaments() {
  return fetch("http://localhost:8000/tournament/get_all", {
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
    return fetch("http://localhost:8000/tournament/get_players", {
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
  return fetch("http://localhost:8000/tournament/get_id", {
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

export function getTournamentPlayer(id) {
  return fetch("http://localhost:8000/tournament/get_player_tournaments", {
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