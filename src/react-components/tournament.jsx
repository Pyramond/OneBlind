import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getTournamentPlayers } from "../utils/tournaments"
import { convertTimeStamp } from "../utils/date"
import { useDispatch } from "react-redux"
import { change } from '../redux/slices/reload';
import { removeTournament, addPlayerTournament, removePlayerTournament } from '../utils/tournaments';
import { useNavigate } from 'react-router-dom';
import { IconArrowUpRight, IconDots, IconTrash, IconUsers } from "@tabler/icons-react"
import { getAllPlayer, getPlayerById } from '../utils/players';
import { Button, Title, Menu, Popover, Text, Stack, Group, Flex, Modal, Space, ActionIcon, rem, CloseButton, Avatar } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { defineAvatar } from "../utils/avatars.js";


export default function Tournament(props) {

    const navigate = useNavigate()
    const [players, setPlayers] = useState([])
    const [allPlayers, setAllPlayers] = useState([])

    const t = useSelector((state) => state.reload);
    const effectDependency = useMemo(() => ({ value: t.value, random: Math.random() }), [t.value]);
    const dispatch = useDispatch()

    const [opened, { close, open }] = useDisclosure(false);
    const [openedModal, setOpenedModal] = useState(false)
    const [openedPlayerModal, { toggle: playerModalToggle }] = useDisclosure(false)
    
    function openModal() { setOpenedModal(true)}
    function closeModal() { setOpenedModal(false)}

    useEffect(() => {
        getTournamentPlayers(props.tournament.id).then(players => {
            setPlayers(players)
        })

        getAllPlayer().then(result => {

            function elementsUniques(tableau1, tableau2) {
                return tableau2.filter(element2 => {
                    return !tableau1.some(element1 => element1.id === element2.id);
                });
            }

            setAllPlayers(elementsUniques(players, result))
        });

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
                            <Menu trigger="hover" position="right-start">

                                <Menu.Target>
                                    <ActionIcon variant="transparent" color="gray">
                                        <IconDots />
                                    </ActionIcon>
                                </Menu.Target>

                                <Menu.Dropdown>

                                    <Menu.Item
                                        leftSection={<IconUsers style={{ width: rem(14), height: rem(14) }} />}
                                        onClick={() => { playerModalToggle(); dispatch(change())}}
                                        >
                                        Joueurs
                                    </Menu.Item>

                                    <Menu.Item
                                        color="red"
                                        leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                        onClick={openModal}
                                        >
                                        Supprimer
                                    </Menu.Item>

                                </Menu.Dropdown>
                            </Menu>
                        </Flex>


                        <Text id="textInfo">
                            Structure de blind: {props.tournament.blindName} <br/>
                            Date:  {convertTimeStamp(props.tournament.date)} <br/>
                            Jetons de départ: {props.tournament.initialChip} <br/>
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


                <Modal opened={openedPlayerModal} onClose={playerModalToggle} size="30%" title="Gérer les joueurs">
                    <Group id="managePlayerGroup">
                        <Stack>
                            {players.map((player, index) => (
                                <PlayerItem player={player} id={props.tournament.id} key={index} />
                            ))}
                        </Stack>

                        <Stack id="addPlayer">
                            <Text>Ajouter un joueur</Text>
                            <Menu>
                                
                                <Menu.Target>
                                    <Button variant="default">Joueurs</Button>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    {allPlayers.map((player, index) => (
                                        <Menu.Item key={index} onClick={() => { addPlayerTournament(player.id, props.tournament.id); dispatch(change()) }}>{player.name}</Menu.Item>
                                    ))}
                                </Menu.Dropdown>
                            </Menu>
                        </Stack>
                    </Group>
                </Modal>

            </div>
        </>
    )
}


function PlayerItem(props) {

    const player = props.player
    const dispatch = useDispatch()
    const [avatarURL, setAvatarURL] = useState("")

    useEffect(() => {
        async function fetchData() {
            const data = await getPlayerById(player.id)

            setAvatarURL(defineAvatar(data.name, data.avatar, data.avatarColor, player.id))
        }
        fetchData()
    }, [])

    return <Group id="playerManage">
        <Avatar src={avatarURL} />
        <Text> {player.name} </Text>
        <CloseButton onClick={() => { removePlayerTournament(player.id, props.id); dispatch(change()) }}/>
    </Group>
}