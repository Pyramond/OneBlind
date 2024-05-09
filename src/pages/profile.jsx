import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { getPlayerById } from "../utils/players";
import { convertTimeStamp } from "../utils/date";
import { getTournamentPlayer } from "../utils/tournaments";
import { getAllAvatar, updateAvatar, updateAvatarColor, uploadAvatar } from "../utils/players";
import { useDispatch, useSelector } from 'react-redux';
import { change } from "../redux/slices/reload";
import { Title, Stack, Table, Group, Text, Modal, ColorInput, Checkbox, Button, FileInput, Flex  } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { defineAvatar, getOxroAvatar, getDiceBearAvatar } from "../utils/avatars";


export default function Profile() {

    const { id } = useParams();
    const [playerData, setPlayerData] = useState({})
    const [tournaments, setTournaments] = useState([])
    const [color, setColor] = useState("")
    const [randomColor, setRandomColor] = useState(false)
    const [top1, setTop1] = useState(0)
    const [top2, setTop2] = useState(0)
    const [top3, setTop3] = useState(0)
    const [position, setPosition] = useState([])
    const [nbTournament, setNbTournament] = useState(0)
    const [allAvatar, setAllAvatar] = useState([])
    const [opened, { open, close }] = useDisclosure(false)
    const [oxroModalOpened, { toggle: oxroModalToggle }] = useDisclosure(false)
    const [avatarURL, setAvatarURL] = useState("")
    const [editAvatarModalOpened, { toggle: editAvatarToggle }] = useDisclosure(false)
    const [fileValue, setFileValue] = useState(null);

    const dispatch = useDispatch()
    const t = useSelector((state) => state.reload);
    const effectDependency = useMemo(() => ({ value: t.value, random: Math.random() }), [t.value]);

    useEffect(() => {
        async function fetchData() {
            const data = await getPlayerById(id)
            setPlayerData(data)
            setColor(data.avatarColor)
            
            setAvatarURL(defineAvatar(data.name, data.avatar, data.avatarColor, id))
        }

        async function fetchTournament() {
            const tournaments = await getTournamentPlayer(id)
            tournaments.sort((a, b) => b.date - a.date)
            setTournaments(tournaments)

            tournaments.forEach(element => {

                if(element.place != 0) {
                    setPosition((prevPosition) => [...prevPosition, element.place])
                    setNbTournament(prevNbTournament => prevNbTournament + 1);
                }
                if(element.place == 1) {
                    setTop1(top1 => top1 + 1)
                } else if(element.place == 2) {
                    setTop2(top2 => top2 + 1)
                } else if(element.place == 3) {
                    setTop3(top3 => top3 + 1)
                }
            });
        }

        fetchData()
        fetchTournament()
    }, [effectDependency])

    async function avatarModal() {
        const data = await getAllAvatar()
        setAllAvatar(data)
        open()
    }

    async function selectAvatar(avatar) {
        const response = await updateAvatar(playerData.id, avatar)

        dispatch(change())
        close()
        notifications.show({
            title: `Avatar`,
            message: "Avatar modifié avec succès"
        })
    }

    function selectColor() {
        close()
        oxroModalToggle()
    }

    async function defineColor() {
        oxroModalToggle()

        let finalColor = null
        let message = null

        if(randomColor) {
            finalColor = "-1"
            message = "avec une couleur aléatoire"

        } else {
            finalColor = color.substring(1)
            message = `avec la couleur ${color}`
        }

        const updateColor = await updateAvatarColor(id, finalColor)
        const update = await updateAvatar(playerData.id, -1)

        dispatch(change())

        notifications.show({
            title: `Avatar`,
            message: `Avatar modifié avec succès ${message}`
        })
    }

    return(
        <>
            <Title order={1} size="h1"> Profil de {playerData.name} </Title>

            <div id="profileContainer">
                <div style={{ width: "28rem"}} id="profileCard">
                    <Stack id="stackInfo">
                        <Group style={{ color: "white" }}>

                            <img src={playerData.avatar > 0 ? `${import.meta.env.VITE_BACKEND_SERVER}/static/avatars/avatar${playerData.avatar}.png` : avatarURL} id="pp" onClick={avatarModal} />

                            <Title order={2} size="h2"> {playerData.name} </Title>

                        </Group>

                        <Text> 
                            <Text>Id: {playerData.id}</Text>
                            <Text>Date de création: {convertTimeStamp(parseInt(playerData.date))}</Text>
                            <Text>Points: {playerData.points}</Text>
                        </Text>

                    </Stack>
                </div>

                <div style={{ width: "28rem"}} id="profileCard">
                    <Stack id="stackInfo">
                        <Title order={2} size="h2">Statistiques</Title>

                        <div id="infosContainer">
                            <Text>Nombre de tournois: {nbTournament}</Text>
                            <Group>
                                <Stack>
                                    <Text>
                                        <Text id="textStats"> top #1: {(Math.round((top1 / nbTournament) * 100 * 100) / 100).toFixed(2)}% </Text>
                                        <Text id="textStats"> top #2: {(Math.round((top2 / nbTournament) * 100 * 100) / 100).toFixed(2)}% </Text>
                                        <Text id="textStats"> top #3: {(Math.round((top3 / nbTournament) * 100 * 100) / 100).toFixed(2)}% </Text>
                                    </Text>
                                </Stack>
                                <Stack>
                                    <Text>
                                        <Text id="textStats"> Podium: {(Math.round(((top1 + top2 + top3) / nbTournament) * 100 * 100) / 100).toFixed(2)}% </Text>
                                        <Text id="textStats"> Meilleure position: {Math.min(...position)} </Text>
                                        <Text id="textStats"> Pire position: {Math.max(...position)} </Text>
                                    </Text>
                                </Stack>
                            </Group>
                        </div>
                    </Stack>
                </div>
            </div>


            <div id="tournamentsPlayer">
                {tournaments.length == 0 ? 
                <div> <h3>Historique des tournois vide</h3></div>
                :
                    <Stack>
                        <Title order={3} size="h3">Historique des tournois de {playerData.name}</Title>
                        <Table verticalSpacing="sm" highlightOnHover withTableBorder >
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th> Nom </Table.Th>
                                    <Table.Th> Date </Table.Th>
                                    <Table.Th> Place </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {tournaments.map((tournament, index) => (
                                    <Table.Tr key={index}>
                                        <Table.Td> {tournament.name} </Table.Td>
                                        <Table.Td> {convertTimeStamp(parseInt(tournament.date))} </Table.Td>
                                        <Table.Td> {tournament.place == 0 ? "En attente" : tournament.place} </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Stack>
                }
            </div>

            <Modal opened={opened} onClose={close} title="Liste des avatars">
                <Stack>
                    <div id="allPPContainer">

                        <div id="PPContainer"> <img src={getOxroAvatar(playerData.name, playerData.avatarColor)} id="allPP" onClick={() => { selectColor() }} /> </div>
                        <div id="PPContainer"> <img src={getDiceBearAvatar(playerData.name)} id="allPP" onClick={() => { selectAvatar(0) }} /> </div>

                        {allAvatar.map((avatar, index) => (

                            <div id="PPContainer" key={index}>
                                <img src={`${import.meta.env.VITE_BACKEND_SERVER}/static/avatars/avatar${index+1}.png`} id="allPP" onClick={() => { selectAvatar(index+1) }} />
                            </div>
                        ))}

                        <div id="PPContainer"> <img src="/images/edit.png" id="allPP" onClick={() => { editAvatarToggle(); close() }}/> </div>
                        
                    </div>
                </Stack>
            </Modal>


            <Modal opened={oxroModalOpened} onClose={oxroModalToggle} title="Choix de la couleur pour l'avatar">
                <Stack>
                    {randomColor ? 
                        <ColorInput 
                            label="Choisir la couleur de l'avatar"
                            placeholder="Code Hexadécimal"
                            value={color}
                            onChange={setColor}
                            disabled
                        />
                    :
                        <ColorInput 
                            label="Choisir la couleur de l'avatar"
                            placeholder="Code Hexadécimal"
                            value={color}
                            onChange={setColor}
                        />
                    }

                    <Checkbox 
                        checked={randomColor}
                        onChange={(event) => setRandomColor(event.currentTarget.checked)}
                        label="Couleur aléatoire"
                        style={{marginTop: "1em"}}
                    />

                    <Button
                     variant="filled"
                     style={{maxWidth: "30%", marginTop: "1em"}}
                     onClick={() => { defineColor() }}
                     >Valider</Button>

                </Stack>
            </Modal>


            <Modal opened={editAvatarModalOpened} onClose={editAvatarToggle} title="Importer un avatar">
                <Stack>
                    <FileInput value={fileValue} onChange={setFileValue} />
                    <Button onClick={async () => {
                        const data = await uploadAvatar(fileValue, id)
                        if(data.status === 400) {
                            notifications.show({
                                title: `Avatar`,
                                message: `Le fichier doit être en png`,
                                color: "red"
                            })
                        } else if(data.status === 422) {
                            notifications.show({
                                title: `Avatar`,
                                message: `Vous devez selectionner un avatar`,
                                color: "red"
                            })
                        } else {

                            const response = await updateAvatar(id, -2)
                            dispatch(change())

                            notifications.show({
                                title: `Avatar`,
                                message: `Avatar modifié avec succès`
                            })
                            editAvatarToggle()
                        }
                    }}>Valider</Button>
                </Stack>
            </Modal>
        </>
    )
}