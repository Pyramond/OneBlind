import { Title, Text, Stack } from "@mantine/core"
import { useState, useEffect, useMemo } from "react"
import { getAllPlayer } from "../utils/players"
import { useSelector } from 'react-redux';
import Player from "./player";


export default function AllPlayers() {

    const [allPlayers, setAllPlayers] = useState([])
    const t = useSelector((state) => state.reload);
    const effectDependency = useMemo(() => ({ value: t.value, random: Math.random() }), [t.value]);


    useEffect(() => {
        getAllPlayer().then(players => {
            setAllPlayers(players);
          });
    }, [effectDependency])


    return (
        <>
            <Stack>
                <Title order={1}>Tous les joueurs</Title>

                <ul>
                {allPlayers.map((player, index) => (
                    <li key={index}> <Player id={player.id} name={player.name} /> </li>
                ))}
                </ul>
            </Stack>
        </>
    )
}