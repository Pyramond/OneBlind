import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { removePlayer } from '../redux/slices/tournamentPage/players';
import { updateAvStack } from '../redux/slices/tournamentPage/info';
import { deleteTournament } from "../utils/tournaments"
import { useNavigate } from 'react-router-dom';
import { calculatePoints } from '../utils/points';
import { eliminatePlayer as utilsEliminatePlayer } from '../utils/tournaments';

import { Button, Modal, Table, Group, Text, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';


export function TournamentPlayers(props) {


    // Modals
    const [ opened, { open, close }] = useDisclosure(false)
    const [ endingOpened, { toggle: endingModal }] = useDisclosure(false)
    const [ finalPlayersOpened, { toggle: finalPlayersModal }] = useDisclosure(false)
    const [classementOpened, { toggle: classementModal }] = useDisclosure(false)

    // Redux
    const t = useSelector((state) => state.tournamentPlayers);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const tournamentInfo = useSelector((state) => state.tournamentInfo);


    const [isWinner, setIsWinner] = useState(false)
    const [eliminationsTab, setEliminationsTab] = useState([])


    useEffect(() => {
        dispatch(updateAvStack(Object.keys(t.value).length))
        
        switch (Object.keys(t.value).length) {
            case 1:
                setIsWinner(true)
                eliminatePlayer(t.value[0].id, false, t.value[0].name)
                classementModal()
                break;
            case 2:
                let audio = new Audio("/sounds/overtaken.mp3")
                if(!window.localStorage.getItem("volume")) {
                    audio.volume = 1
                } else {
                    audio.volume = window.localStorage.getItem("volume")
                }
                audio.play()
                finalPlayersModal()
                break;
        }


    }, [Object.keys(t.value).length])

    async function eliminatePlayer(id, remove, name) {

        const place = Object.keys(t.value).length
        const points = calculatePoints(place, tournamentInfo.nbPlayer)

        const playerStats = {
            "name": name,
            "place": place,
            "points": points
        }
        console.warn(playerStats)
        setEliminationsTab([...eliminationsTab, playerStats]);

        await utilsEliminatePlayer(id, place, props.id, points)
        if(remove) {
            dispatch(removePlayer(id))
            notifications.show({
                title: name,
                message: "Joueur éliminé avec succès"
            })
            close()
        }
    }

    return (
        <>
            <div id="tournamentPlayersContainer" >

                {isWinner ? 
                    <div> <p>{t.value[0].name} Gagnant</p> <Button onClick={() => { endingModal() }}>Terminer le tournois</Button> </div>
                    :
                    <Button variant="filled" color="red" id="eliminatePlayerButton" onClick={open}>Éliminer un joueur</Button>
                }

            </div>


            {/* Eliminate Modal */}
            <Modal opened={opened} onClose={close} title="Éliminer un joueur">
                <ul>
                    {t.value.map((player, index) => (
                        <li key={index}>
                            <Group>
                                <Text> {player.name} </Text>
                                <Button color="red" variant="filled" onClick={() => { eliminatePlayer(player.id, true, player.name) }}>Éliminer</Button>
                            </Group>
                        </li>
                    ))}
                </ul>
            </Modal>


            {/* Ending modal */}
            <Modal opened={endingOpened} onClose={endingModal} title="Terminer ce tournois">
                <Text> Tu es sur le point de terminer ce tournoi, il ne sera donc plus visible dans la liste des tournois actuels. <br/>Il restera cependant dans l'historique des tournois. </Text>
                
                <Group>
                    <Button variant="default" onClick={endingModal}>Annuler</Button>
                    <Button variant="filled" color="red" onClick={() => { endingModal() ; deleteTournament(props.id) ; navigate("/") }}>Supprimer</Button>
                </Group>
            </Modal>


            {/* 2 Players left Modal */}
            <Modal opened={finalPlayersOpened} onClose={finalPlayersModal} size="xl" title="Plus que 2 joueurs restant">
                <Stack>

                        <ul>
                            {t.value.map((player, index) => (
                                // <li key={index}>{player.name}</li>
                                <Text key={index}> - {player.name} </Text>
                            ))}
                        </ul>

                    <img src="/images/fight.gif" alt="finalGif" id="finalGif"/>
                </Stack>
            </Modal>


            {/* Classement Modal */}
            <Modal opened={classementOpened} onClose={classementModal} title="Classement de la partie">
                <Table verticalSpacing="sm" highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>#</Table.Th>
                            <Table.Th>Nom</Table.Th>
                            <Table.Th>Points gagnés</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {eliminationsTab.map((player, index) => (
                            <Table.Tr key={index}>
                                <Table.Td>{player.place}</Table.Td>
                                <Table.Td>{player.name}</Table.Td>
                                <Table.Td>+{player.points}</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Modal>
        </>
    )
}