import { useState, useEffect } from 'react';
import { useSelector } from "react-redux"
import { Button, Modal, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


export function TablePlace() {

    const t = useSelector((state) => state.tournamentPlayers);
    const [playerList, setPlayerList] = useState([])
    const [firstPlace, setFirstPlace] = useState(false)

    const [ opened, { open, close }] = useDisclosure(false)

    function shufflePlayers(players) {
        let shuffledArray = [...players];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
      }

    function setPlace() {
        if(firstPlace === false) {
            setPlayerList(shufflePlayers(t.value))
            setFirstPlace(true)
        }
    }

    function replace() {
        const intervalId = setInterval(() => {
            setPlayerList(shufflePlayers(t.value));
        }, 50);
    
        setTimeout(() => {
            clearInterval(intervalId);
        }, 500);
    }

    useEffect(() => (
        setPlayerList(shufflePlayers(t.value))
    ), [])


    return (
        <>
            <Button variant="default" onClick={() => { open() ; setPlace() }}> Table </Button>

            <Modal opened={opened} onClose={close} title="Placement des joueurs sur la table">
                <Stack>
                    <ol>
                        {playerList.map((player, index) => (
                            <li key={index}>{player.name}</li>
                        ))}
                    </ol>

                    <Button variant="filled" onClick={() => { replace() }}> Replacer </Button>
                </Stack>

            </Modal>
        </>
    )
}
