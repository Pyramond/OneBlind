import { useEffect } from "react"
import { Button } from "@mantine/core"


export default function LoginSpotify(props) {

    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
    const REDIRECT_URI = `http://localhost:${import.meta.env.VITE_PORT}` + props.path
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "code"
    const SCOPES = [
        "user-read-playback-state"
    ]
    const LOGIN_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`
    const AUTHORIZATION_HEADER = `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`


    useEffect(() => {
        const spotifyUrl = window.location.href
        const parsedUrl = new URL(spotifyUrl)
        const code = parsedUrl.searchParams.get("code")

        if(code) {
            console.log(code)
            window.localStorage.setItem("spotify_code", code)
            window.location.hash = ""

            const options = {
                method: 'POST',
                headers: {
                  cookie: '__Host-device_id=AQAau_Bb8_832qCq0Lnih3eV_NgBsWhLJmjh2yegawQqnt3wVCBiHYZuHg9yARKo7_N5Hc0ra5WZvzbquLYyYcsU8WNUExrO0HE; sp_tr=false',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'User-Agent': 'insomnia/8.4.2',
                  Authorization: AUTHORIZATION_HEADER
                },
                body: new URLSearchParams({
                  code: code,
                  grant_type: 'authorization_code',
                  redirect_uri: REDIRECT_URI
                })
              };
              
              fetch('https://accounts.spotify.com/api/token', options)
                .then(response => response.json())
                .then(response => {
                    window.localStorage.setItem("spotify_access_token", response.access_token)
                    window.localStorage.setItem("refresh_token", response.refresh_token)
                })
                .catch(err => console.error(err));
        }


    }, [])

    function openLogin() {
        const width = 800;
        const height = 500;

        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;

        window.open(LOGIN_URL, '_blank', `width=${width},height=${height},left=${left},top=${top}`);
    }

    if (props.button) {
        return (
            <>
                <Button variant="light" color="#1fdf64" onClick={openLogin}>{props.message ? props.message : "Se connecter à Spotify"} </Button>
            </>
        )
    } else {
        return null
    }
}