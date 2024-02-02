import { Group, Button, Text, Modal, Space } from "@mantine/core"
import { removePlayer } from "../utils/players"
import { useDispatch } from "react-redux"
import { change } from "../redux/slices/reload"
import { Link } from "react-router-dom"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"


export default function Player(props) {

    const dispatch = useDispatch()
    const [opened, { open, close }] = useDisclosure(false)

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
            <Group style={{ margin: "1em" }}>
                <Text> {props.name} </Text>
                <Link to={`/profiles/${props.id}`}> <Button>Profil</Button> </Link>
                <Button color="red" variant="outline" onClick={open}>Supprimer</Button>
            </Group>


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