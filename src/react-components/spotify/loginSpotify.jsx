import { Button } from "react-bootstrap"
import { useEffect } from "react"


export default function LoginSpotify(props) {

    const CLIENT_ID = "8dd5f668beaa4464b701b58a0ba85e59"
    const REDIRECT_URI = "http://localhost:5173/settings/"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPES = [
        "user-read-playback-state"
    ]
    const URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`


    useEffect(() => {
        const hash = window.location.hash
        if(hash) {
            const token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            console.log(token)
            window.localStorage.setItem("spotify_token", token)
            window.location.hash = ""
        }
    }, [])

    function openLogin() {
        const width = 600;
        const height = 400;

        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;

        window.open(URL, '_blank', `width=${width},height=${height},left=${left},top=${top}`);
    }

    return (
        <>
            <Button variant="success" onClick={openLogin}>Login to Spotify</Button>
        </>
    )
}