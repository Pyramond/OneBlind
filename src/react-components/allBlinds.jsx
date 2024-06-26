import { useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { getAllModels } from "../utils/models";
import { Modal, Text, Button, Group, Stack, Title, Space, ActionIcon, ScrollArea } from "@mantine/core"
import { Link } from "react-router-dom";
import { removeModel } from "../utils/models";
import { change } from "../redux/slices/reload";
import { notifications } from '@mantine/notifications'
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle, IconTrash } from "@tabler/icons-react";


export default function AllBlinds() {

    const [allModels, setAllModels] = useState([])
    const t = useSelector((state) => state.reload);
    const effectDependency = useMemo(() => ({ value: t.value, random: Math.random() }), [t.value]);
    const [confirmationOpened, { toggle: confirmationToggle }] = useDisclosure()
    const [model, setModel] = useState("")
    const dispatch = useDispatch();


    useEffect(() => {
        getAllModels().then(models => {
            setAllModels(models);
        })
    }, [effectDependency]);


    async function deleteModel(modelToDelete) {
        await removeModel(modelToDelete.name, modelToDelete.id)
        setAllModels((prevAllModels) => prevAllModels.filter((model) => model !== modelToDelete))
        dispatch(change())
        notifications.show({
            title: modelToDelete.name,
            message: "Supprimé avec succès"
        })

        confirmationToggle()
    }

    function confirmation(model) {
        setModel(model)
        confirmationToggle()
    }


    return (
        <>
            <Stack>
                <Title order={1}>Toutes les structures</Title>
                {allModels.length === 0 ? 
                    <Text>Aucune structure enregistrée</Text>
                :
                    <ul>
                        <ScrollArea h={780} offsetScrollbars id="blindScroll" >
                            {allModels.map((model, index) => (
                                    <Group key={index} id="blindItem">
                                        <Text>{model.name}</Text>
                                        <Group>
                                            <Link to={`/blind/${model.id}`}> <IconInfoCircle variant="outline-secondary"> Détails </IconInfoCircle> </Link>
                                            <ActionIcon color="red" variant="transparent" onClick={() => { confirmation(model) }}> <IconTrash /> </ActionIcon>
                                        </Group>
                                    </Group>
                                
                            ))}
                        </ScrollArea>
                    </ul>
                }

            </Stack>

            <Modal opened={confirmationOpened} onClose={confirmationToggle} title={`Supprimer la structure ${model.name} ?`}>

                <Text> La suppression de cette structure de blind est définitive. </Text>

                <Space h="lg" />

                <Text> Supprimer la structure {model.name} ? </Text>

                <Space h="sm"/>

                <Group>
                    <Button variant="default">Annuler</Button>
                    <Button variant="filled" color="red" onClick={() => { deleteModel(model) }}>Supprimer</Button>
                </Group>
            </Modal>
        </>
    )
}