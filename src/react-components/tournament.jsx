import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getTournamentPlayers } from "../utils/tournaments"
import { convertTimeStamp } from "../utils/date"
import { useDispatch } from "react-redux"
import { change } from '../redux/slices/reload';
import { removeTournament } from '../utils/tournaments';
import { useNavigate } from 'react-router-dom';
import { IconArrowUpRight } from "@tabler/icons-react"


import { Button, Title, CloseButton, Popover, Text, Stack, Group, Flex, Modal, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


export default function Tournament(props) {

    const navigate = useNavigate()
    const [players, setPlayers] = useState([])

    const t = useSelector((state) => state.reload);
    const effectDependency = useMemo(() => ({ value: t.value, random: Math.random() }), [t.value]);
    const dispatch = useDispatch()

    const [opened, { close, open }] = useDisclosure(false);
    const [openedModal, setOpenedModal] = useState(false)
    
    function openModal() { setOpenedModal(true)}
    function closeModal() { setOpenedModal(false)}

    useEffect(() => {
        getTournamentPlayers(props.tournament.id).then(players => {
            setPlayers(players)
        })
    }, [effectDependency])

    async function deleteTournament(id) {
        await removeTournament(id)
        location.reload()
    }

    function openTournament() {
        navigate(`/tournament/${props.tournament.id}`)
    }

    return(
        <>
            <div id="tournament">

                <div id="tournamentCard">
                    <Stack id="stack">
                        <Flex
                            direction={{ base: 'column', sm: 'row' }}
                            gap={{ base: 'sm', sm: 'lg' }}
                            justify={{ sm: "space-between" }}
                            
                        >
                            <Title order={4}>{props.tournament.name}</Title>
                            <CloseButton onClick={openModal}/>
                        </Flex>


                        <Text>
                                - Structure de blind: {props.tournament.blindName} <br/>
                                - Date:  {convertTimeStamp(props.tournament.date)} <br/>
                                - Jetons de départ: {props.tournament.initialChip} <br/>
                        </Text>


                        <Group>
                            <Popover opened={opened}>
                                <Popover.Target>
                                    <Button onMouseEnter={open} onMouseLeave={close} variant='default'>Joueurs</Button>
                                </Popover.Target>
                                <Popover.Dropdown>
                                        {players.map((player, index) => (
                                            <Text key={index} disabled={true}> {player.name} </Text>
                                        ))}
                                </Popover.Dropdown>
                            </Popover>
                            <Button onClick={openTournament} rightSection={<IconArrowUpRight />}>Ouvrir</Button>
                        </Group>

                    </Stack>
                </div>


                <Modal opened={openedModal} onClose={closeModal} title="Supprimer ce tournois">
                    <Text>Tu es sur le point de supprimer définitivement ce tournoi</Text>

                    <Space h="lg" />

                    <Group>
                        <Button variant="default" onClick={closeModal}>Annuler</Button>
                        <Button color='red' onClick={() => { closeModal() ; deleteTournament(props.tournament.id) ; dispatch(change())}}>Supprimer</Button>
                    </Group>
                </Modal>

            </div>
        </>
    )
}