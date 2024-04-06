import { getAllPlayer } from "../../utils/players"
import { useEffect, useState } from 'react'
import Player from "./player"
import { Skeleton } from '@mantine/core';


export default function TopPlayer() {

    const [allPlayers, setAllPlayers] = useState([])

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

            {allPlayers.length == 0 ? 
                <div id="topPlayers">
                    <Skeleton height={50} id="skeleton" />
                    <Skeleton height={50} id="skeleton" />
                    <Skeleton height={50} id="skeleton" />
                </div>
            :
                <div id="topPlayers">
                {allPlayers.map((player, index) => (
                    <Player key={index} name={player.name} points={player.points} place={index + 1} />
                ))}
                </div>
            }
        </>
    )
}