import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useDispatch } from 'react-redux';
import { change } from '../../redux/slices/reload';


export default function PlayerSpotify() {

    const [token, setToken] = useState(window.localStorage.getItem("spotify_access_token"))
    const [musicName, setMusicName] = useState("")
    const[artist, setArtist] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [error, setError] = useState("")

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = () => {
            fetch("https://api.spotify.com/v1/me/player", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
            .then(res => res.json())
            .then(res => {
                if(res.error) {
                    setError(`${res.error.status} - ${res.error.message}`)
                    setMusicName("")
                    setImageUrl("")
                    console.error(res.error)
                    const options = {
                        method: 'POST',
                        headers: {
                          cookie: '__Host-device_id=AQAau_Bb8_832qCq0Lnih3eV_NgBsWhLJmjh2yegawQqnt3wVCBiHYZuHg9yARKo7_N5Hc0ra5WZvzbquLYyYcsU8WNUExrO0HE; sp_tr=false',
                          'Content-Type': 'application/x-www-form-urlencoded',
                          'User-Agent': 'insomnia/8.4.2',
                          Authorization: 'Basic OGRkNWY2NjhiZWFhNDQ2NGI3MDFiNThhMGJhODVlNTk6NGYxM2VjNzkwZGI2NDNiMjg1NmYxMTczMGI0YmY0ZDc='
                        },
                        body: new URLSearchParams({
                          refresh_token: window.localStorage.getItem("refresh_token"),
                          grant_type: 'refresh_token',
                          client_id: '8dd5f668beaa4464b701b58a0ba85e59'
                        })
                      };
                      
                      fetch('https://accounts.spotify.com/api/token', options)
                        .then(response => response.json())
                        .then(response => window.localStorage.setItem("spotify_access_token", response.access_token))
                        .catch(err => console.error(err));
                } else {
                    setMusicName(res.item.name)
                    setArtist(res.item.artists[0].name)
                    setImageUrl(res.item.album.images[2].url)
                }
            })
        }
        const intervalId = setInterval(() => {
            setToken(window.localStorage.getItem("spotify_access_token"))
            fetchData()
        }, 3000)
        return () => clearInterval(intervalId)
    }, [])

    function setDefaultComponent() {
        window.localStorage.setItem("secondary-component", "TournamentInfo")
        dispatch(change())
    }

    return (
        <>
            <div id="spotifyPlayer">
                {imageUrl === "" ? <img src="/images/spotify.svg" alt="Spotify logo" id="spotifyLogo"/> : <img src={imageUrl} alt={`${musicName} - ${artist} Image`} />}
                {musicName === "" ?
                <div>
                    <p>Composant Indisponible <br /> {error}</p> 
                    <div id="errorButtons">
                        <Button variant="primary" href="/settings" id="errorButton">Paramètres</Button>
                        <Button variant="secondary" onClick={setDefaultComponent} id="errorButton">Changer le composant</Button>
                    </div>
                </div>
                :
                <p>{musicName} <br /> {artist}</p>}
            </div>
        </>
    )
}