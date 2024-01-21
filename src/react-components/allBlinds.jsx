import { useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { getAllModels } from "../utils/models";
import {Text, Button, Group, Stack, Title } from "@mantine/core"
import { Link } from "react-router-dom";
import { removeModel } from "../utils/models";
import { change } from "../redux/slices/reload";
import { notifications } from '@mantine/notifications'


export default function AllBlinds() {

    const [allModels, setAllModels] = useState([])
    const t = useSelector((state) => state.reload);
    const effectDependency = useMemo(() => ({ value: t.value, random: Math.random() }), [t.value]);
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
                                        <Button variant="outline-danger" onClick={() => { deleteModel(model) }}>Supprimer</Button>
                                    </Group>
                                </li>
                            ))}
                        </ul>
                    }
                </div>
            </Stack>
        </>
    )
}