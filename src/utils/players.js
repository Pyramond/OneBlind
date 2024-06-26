const baseEndpoint = import.meta.env.VITE_BACKEND_SERVER;


export function getAllPlayer() {
    return fetch(`${baseEndpoint}/player/get_all`, {
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
    return fetch(`${baseEndpoint}/player/get_id`, {
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
		fetch(`${baseEndpoint}/player/add`, {
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
	return fetch(`${baseEndpoint}/player/delete`, {
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


export function getAllAvatar() {
	return fetch(`${baseEndpoint}/player/avatar/getAll`, {
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


export function updateAvatar(id, avatar) {
	return fetch(`${baseEndpoint}/player/avatar/update`, {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			id: id,
			avatar: avatar
		})
	  })
	  .then(res => res.json())
	  .then(res => {
		return res
	})
}

export function updateAvatarColor(id, color) {
	return fetch(`${baseEndpoint}/player/avatar/change_color`, {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			userId: id,
			color: color
		})
	  })
	  .then(res => res.json())
	  .then(res => {
		return res
	})
}
export function uploadAvatar(avatar, Pid) {

	const formdata = new FormData()
	formdata.append("avatar", avatar)
	formdata.append("id", Pid)

	return fetch(`${baseEndpoint}/player/avatar/upload`, {
		method: "POST",
		body: formdata
	  })
	  .then(res => {
		return res.json().then(data => ({
			data: data,
			status: res.status
		  }));
	})
}