import { getAllPlayer } from "../../utils/players"
import { useEffect, useState } from 'react'
import Player from "./player"


export default function TopPlayer() {

    const [allPlayers, setAllPlayers] = useState([
        {"name": "Unknown", "points": 0, "place": 1},
        {"name": "Unknown", "points": 0, "place": 2},
        {"name": "Unknown", "points": 0, "place": 3}
    ])

    useEffect(() => {
      async function fetchData() {
        const players = await getAllPlayer()
        players.sort((a, b) => b.points - a.points)
        setAllPlayers(players.slice(0, 3))
      }
      fetchData()
    }, [])

    return (
        <>

            <div id="topPlayers">
            {allPlayers.map((player, index) => (
                <Player key={index} name={player.name} points={player.points} place={index + 1} />
            ))}
            </div>
            
        </>
    )
}