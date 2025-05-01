import { ActionIcon, Button, Modal, TextInput, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import { updatePlayerName } from "../utils/players";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { change } from "../redux/slices/reload";
import { useDispatch } from "react-redux";


export default function ModifyPlayerName(props) {

    const [opened, { toggle: openModal }] = useDisclosure(false)
    const [name, setName] = useState("")
    const dispatch = useDispatch()

    async function changeName() {
        if(name.length === 0) {
            notifications.show({
                title: "Erreur",
                color: "red",
                message: "Le nouveau nom d'utilisateur n'a pas été saisi"
            })
        } else {
           await updatePlayerName(props.id, name)
            dispatch(change())
            notifications.show({
                title: "Nom d'utilisateur",
                message: "Nom d'utilisateur modifié avec succès"
            })
            openModal()
            setName("")
        }
    }

    return <>

        <ActionIcon variant="transparent" color="gray" onClick={openModal} size={"sm"} style={{ marginLeft: "-0.6em", marginTop: "0.2em", opacity: "0.5" }}>
            <IconPencil />
        </ActionIcon>

        <Modal opened={opened} onClose={openModal} title="Changer de nom d'utilisateur">
            <Group>
                <TextInput 
                    placeholder="Nom d'utilisateur"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                />
                <Button onClick={() => changeName()}>Valider</Button>
            </Group>
        </Modal>

    </>


}