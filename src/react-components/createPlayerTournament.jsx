import { ActionIcon, Group,  Input } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import { useState } from "react";
import { getTimeStamp } from "../utils/date";
import { addPlayer } from "../utils/players"
import { useDispatch } from "react-redux";
import { change } from "../redux/slices/reload"
import {notifications} from "@mantine/notifications";


export default function CreatePlayerTournament() {

    const [playerName, setPlayerName] = useState("")
    const dispatch = useDispatch()

    function createPlayer() {
        const date = getTimeStamp()

        addPlayer(playerName, date).then((val) => {
            dispatch(change())
            setPlayerName("")
            notifications.show({
                title: playerName,
                message: "Le joueur a été créer avec succès"
            })
        })
    }

    return (
        <>
            <Group>
                <Input
                    placeholder={"Créer un joueur"}
                    value={playerName}
                    onChange={(event) => setPlayerName(event.currentTarget.value)}
                />

                <ActionIcon style={{ marginLeft: "-0.5em"}} size={"input-sm"} disabled={!playerName} onClick={() => { createPlayer() }}>
                    <IconUserPlus />
                </ActionIcon>
            </Group>
        </>
    )
}