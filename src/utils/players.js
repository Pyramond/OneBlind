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


export function addPlayer(name, date) {
	const promise = new Promise((resolve, reject) => {
		fetch("http://localhost:8000/player/add", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: name,
				date: date
			})
		})
		.then(res => res.json())
		.then(res => {
			resolve(res)
		})
	})
	return promise
}


export function removePlayer(name, id) {
	return fetch("http://localhost:8000/player/delete", {
		method: "DELETE",
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