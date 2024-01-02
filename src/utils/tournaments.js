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


export function addTournament(name, date, blind, players, initialChips) {
  return fetch("http://localhost:8000/tournament/create", {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      date: date,
      blind: blind,
      players: players,
      initialChips: parseInt(initialChips)
    })
  })
    .then(res => res.json())
    .then(res => {
      return res
    })
}

export function removeTournament(id) {
    return fetch("http://localhost:8000/tournament/delete/force", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id
        })
    })
    .then((res) => res.json())
    .then((res) => {
        return res;
    })
    .catch((error) => {
        console.error('Erreur lors de la requête :', error);
    });
}


export function eliminatePlayer(playerId, place, tournamentId, points) {
	    return fetch("http://localhost:8000/tournament/eliminate", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: playerId,
                place: place,
                tournament: parseInt(tournamentId),
                points: points
            })
          })
          .then(res => res.json())
          .then(res => {
			return res
        })
}