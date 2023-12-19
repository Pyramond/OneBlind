import { useEffect, useState } from "react"


export default function PlayerSpotify() {

    const token = window.localStorage.getItem("spotify_token")
    const [musicName, setMusicName] = useState("")
    const[artist, setArtist] = useState("")
    const [imageUrl, setImageUrl] = useState("")

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
                setMusicName(res.item.name)
                setArtist(res.item.artists[0].name)
                setImageUrl(res.item.album.images[2].url)
            })
        }
        const intervalId = setInterval(fetchData, 3000)
        return () => clearInterval(intervalId)
    }, [])

    return (
        <>
            <div id="spotifyPlayer">
                <img src={imageUrl} alt={`${musicName} - ${artist} Image`} />
                <p>{musicName} <br /> {artist}</p>
            </div>
        </>
    )
}