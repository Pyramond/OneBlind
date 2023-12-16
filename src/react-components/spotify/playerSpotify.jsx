import { Button } from "react-bootstrap"
import { useEffect, useState } from "react"


export default function PlayerSpotify(props) {

    const token = window.localStorage.getItem("spotify_token")

    function pause() {
        fetch("https://api.spotify.com/v1/me/player", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        .then(res => res.json())
        .then(res => {
            console.warn(res)
        })
    }

    return (
        <>
            {token ? <Button onClick={pause}>Pause</Button> : <h1>!Token</h1>}
        </>
    )
}