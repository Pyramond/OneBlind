import { useEffect, useState } from "react"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useDispatch } from 'react-redux';
import { change } from '../../redux/slices/reload';
import { useNavigate } from "react-router-dom";

export default function PlayerSpotify() {

    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
    const AUTHORIZATION_HEADER = `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
    const [token, setToken] = useState(window.localStorage.getItem("spotify_access_token"))
    const [musicName, setMusicName] = useState("")
    const[artist, setArtist] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [error, setError] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function openSettings() {
        navigate("/settings")
    }

    const renderTooltipMusic = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          {musicName}
        </Tooltip>
    );

    const renderTooltipArtist = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          {artist}
        </Tooltip>
    );

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
                          Authorization: AUTHORIZATION_HEADER
                        },
                        body: new URLSearchParams({
                          refresh_token: window.localStorage.getItem("refresh_token"),
                          grant_type: 'refresh_token',
                          client_id: CLIENT_ID
                        })
                      };
                      
                      fetch('https://accounts.spotify.com/api/token', options)
                        .then(response => response.json())
                        .then(response => {
                            window.localStorage.setItem("spotify_access_token", response.access_token)
                            setToken(response.access_token)
                        })
                        .catch(err => console.error(err));
                } else {
                    setMusicName(res.item.name)
                    setArtist(res.item.artists[0].name)
                    setImageUrl(res.item.album.images[2].url)
                    setToken(window.localStorage.getItem("spotify_access_token"))
                }
            })
        }
        const intervalId = setInterval(() => {
            fetchData()
        }, 3000)
        return () => clearInterval(intervalId)
    }, [token])

    function setDefaultComponent() {
        window.localStorage.setItem("secondary-component", "TournamentInfo")
        dispatch(change())
    }

    return (
        <>
            <div id="spotifyPlayer">
                {imageUrl === "" ? <img src="/images/spotify.svg" alt="Spotify logo" id="spotifyLogo"/> : <img src={imageUrl} alt={`${musicName} - ${artist} Image`} id="albumImage" />}
                {musicName === "" ?
                    <div>
                        <p>Composant Indisponible</p> 
                        <div id="errorButtons">
                            <Button variant="primary" onClick={openSettings} id="errorButton">Paramètres</Button>
                            <Button variant="secondary" onClick={setDefaultComponent} id="errorButton">Changer le composant</Button>
                        </div>
                    </div>
                    :
                    <p>
                        <OverlayTrigger placement="top" overlay={renderTooltipMusic}>
                            <span id="musicTitle"> {musicName.length > 15 ? musicName.substring(0, 15) + "..." : musicName} </span>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={renderTooltipArtist}>
                            <span> <br /> {artist.length > 15 ? artist.substring(0, 15) + "..." : artist} </span>
                        </OverlayTrigger>
                    </p>
                }
            </div>
        </>
    )
}