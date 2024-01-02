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


export function getAllCurrentTournaments() {
  return fetchWrapper("/tournament/get_currents", "GET");
}

export function getAllTournaments() {
  return fetchWrapper("/tournament/get_all", "GET");
}

export function getTournamentPlayers(id) {
  return fetchWrapper("/tournament/get_players", "POST", { id });
}

export function deleteTournament(id) {
  return fetchWrapper("/tournament/delete", "POST", { id });
}

export function getTournamentById(id) {
  return fetchWrapper("/tournament/get_id", "POST", { id });
}

export function getTournamentPlayer(id) {
  return fetchWrapper("/tournament/get_player_tournaments", "POST", { id });
}

export function addTournament(name, date, blind, players, initialChips) {
  const body = {
    name,
    date,
    blind,
    players,
    initialChips: parseInt(initialChips)
  };
  return fetchWrapper("/tournament/create", "POST", body);
}

export function removeTournament(id) {
  return fetchWrapper("/tournament/delete/force", "POST", { id });
}

export function eliminatePlayer(playerId, place, tournamentId, points) {
  const body = {
    id: playerId,
    place,
    tournament: parseInt(tournamentId),
    points
  };
  return fetchWrapper("/tournament/eliminate", "POST", body);
}