import { Group, Button, Text, Modal, Space, Avatar, ActionIcon } from "@mantine/core"
import { removePlayer } from "../utils/players"
import { useDispatch } from "react-redux"
import { change } from "../redux/slices/reload"
import { useNavigate } from "react-router-dom"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconTrash } from "@tabler/icons-react"
import { getPlayerById } from '../utils/players';
import { useEffect, useState } from 'react';
import { defineAvatar } from '../utils/avatars';


export default function Player(props) {

    const dispatch = useDispatch()
    const [opened, { open, close }] = useDisclosure(false)
    const navigate = useNavigate()
    const [avatarURL, setAvatarURL] = useState("")

    useEffect(() => {
        async function getData() {
            const r = await getPlayerById(props.id)
            setAvatarURL(defineAvatar(r.name, r.avatar, r.avatarColor, props.id))
        }
        getData()
    }, [])

    async function deletePlayer() {
        await removePlayer(props.name, props.id)
        notifications.show({
            title: props.name,
            message: "Joueur supprimé avec succès"
        })
        close()
        dispatch(change())
    }

    return (
        <>
            <div id="player">
                <Avatar src={avatarURL} size="lg" />
                <Text onClick={() => { navigate(`/profiles/${props.id}`) }} id="name"> {props.name} </Text>
                <ActionIcon color="red" variant="transparent" onClick={open}> <IconTrash /> </ActionIcon>
            </div>


            <Modal opened={opened} onClose={close} title="Attention">
                <Text>Êtes-vous sûr de vouloir supprimer le joueur {props.name} ?</Text>
                <Space h="lg" />
                <Group>
                    <Button variant="default" onClick={close}>Annuler</Button>
                    <Button color="red" onClick={deletePlayer}>Supprimer</Button>
                </Group>
            </Modal>
        </>
    )
}