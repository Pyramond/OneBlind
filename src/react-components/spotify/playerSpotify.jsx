import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { change } from '../../redux/slices/reload';
import { useNavigate } from "react-router-dom";
import { HoverCard, Text, Button } from "@mantine/core";


export default function PlayerSpotify() {

    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
    const AUTHORIZATION_HEADER = `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
    const [token, setToken] = useState(window.localStorage.getItem("spotify_access_token"))
    const [musicName, setMusicName] = useState("")
    const[artist, setArtist] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [error, setError] = useState("")
    const [artistUrl, setArtistUrl] = useState("")
    const [musicUrl, setMusicUrl] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function openSettings() {
        navigate("/settings")
    }

    function openArtistPage() {
        console.log(artistUrl)
        window.open(artistUrl)
    }

    function openMusicPage() {
        window.open(musicUrl)
    }

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
                    setArtistUrl(res.item.artists[0].external_urls.spotify)
                    setMusicUrl(res.item.external_urls.spotify)
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
                            <Button onClick={openSettings} id="errorButton">Paramètres</Button>
                            <Button variant="default" onClick={setDefaultComponent} id="errorButton">Changer le composant</Button>
                        </div>
                    </div>
                    :
                    <Text>
                        <HoverCard>
                            <HoverCard.Target>
                                <span id="musicTitle" onClick={openMusicPage}> {musicName.length > 20 ? musicName.substring(0, 20) + "..." : musicName} </span>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                                {musicName}
                            </HoverCard.Dropdown>
                        </HoverCard>

                        <HoverCard>
                            <HoverCard.Target>
                                <span onClick={openArtistPage}> <br /> {artist.length > 20 ? artist.substring(0, 20) + "..." : artist} </span>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                                {artist}
                            </HoverCard.Dropdown>
                        </HoverCard>
                    </Text>
                }
            </div>
        </>
    )
}