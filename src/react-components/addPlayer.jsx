import { getTimeStamp } from '../utils/date';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { change } from "../redux/slices/reload";
import { addPlayer } from '../utils/players';

import { Title, TextInput, Button, Group, Space, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';

export default function AddPlayer() {

    const [playerName, setPlayerName] = useState("")

    const dispatch = useDispatch()

    function newPlayer() {
        const date = getTimeStamp()

        if(playerName == "") {
            notifications.show({
                title: "Erreur",
                message: "Le nom n'a pas été saisi",
                color: "red"
            })
        } else {
            addPlayer(playerName, date).then((val) => {
                dispatch(change())
            })
            notifications.show({
                title: playerName,
                message: "Le joueur a été créer avec succès"
            })
        }
    }

    return(
        <Stack style={{ marginRight: "40%"}}>
            <Title order={1}>Créer un joueur</Title>
            <Space h="xs" />
            <Group>
                <TextInput 
                    placeholder="Nom du joueur"
                    value={playerName}
                    onChange={(event) => setPlayerName(event.currentTarget.value)}
                />
                <Button onClick={newPlayer}>Créer</Button>
            </Group>
        </Stack>
    )
}