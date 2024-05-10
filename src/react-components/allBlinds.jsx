import { useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { getAllModels } from "../utils/models";
import { Modal, Text, Button, Group, Stack, Title, Space } from "@mantine/core"
import { Link } from "react-router-dom";
import { removeModel } from "../utils/models";
import { change } from "../redux/slices/reload";
import { notifications } from '@mantine/notifications'
import { useDisclosure } from "@mantine/hooks";


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
                <div id="allBlinds">
                    {allModels.length === 0 ? 
                        <Text>Aucune structure enregistrée</Text>
                    :
                        <ul>
                            {allModels.map((model, index) => (
                                <li key={index} className="allModels">
                                    <Group>
                                        <Text>{model.name}</Text>
                                        <Link to={`/blind/${model.id}`}> <Button variant="outline-secondary"> Détails </Button> </Link>
                                        <Button variant="outline-danger" onClick={() => { confirmation(model) }}>Supprimer</Button>
                                    </Group>
                                </li>
                            ))}
                        </ul>
                    }
                </div>
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