import { useState } from 'react';
import { getDate } from "../utils/date";
import { useDispatch } from 'react-redux';
import { change } from "../redux/slices/reload";
import { addModel } from '../utils/models';
import { IconDeviceFloppy, IconTextPlus, IconTrash } from "@tabler/icons-react";
import { TextInput, NumberInput, Button, Title, Group, Stack, Text, ActionIcon } from '@mantine/core';
import { notifications } from '@mantine/notifications'



export default function CreateBlindModel() {

    const dispatch = useDispatch();

    const date = getDate()
    const [name, setName] = useState(`Modèle du ${date}`)
    const [steps, setSteps] = useState([])
    const [SBlind, setSBlind] = useState(0)
    const [time, setTime] = useState(0)
    const [pauseTime, setPauseTime] = useState(0)
    const [order, setOrder] = useState(1)
    function handleChangeName(event) { setName(event.target.value) }
 
    function addStep() {

        if(SBlind === 0) {
            notifications.show({
                title: "Attention",
                message: "Vous n'avez pas spécifié de petite blind pour cette étape.",
                color: "yellow"
            })
        }

        if(time === 0) {
            notifications.show({
                title: "Erreur",
                message: "Vous n'avez pas spécifié de temps pour cette étape.",
                color: "red"
            })
        } else {

        const step = {
            "order": order,
            "time": time,
            "type": "game",
            "SBlind": SBlind
        }
        setSteps((prevSteps) => [...prevSteps, step]);
        setOrder(order + 1)
        }

    }

    function addPause() {
        if(pauseTime === 0) {
            notifications.show({
                title: "Erreur",
                message: "Vous n'avez pas spécifié de temps pour cette pause.",
                color: "red"
            })
        } else {

        const pause = {
            "order": order,
            "time": pauseTime,
            "type": "pause",
            "SBlind": 0
        }
        setSteps((prevSteps) => [...prevSteps, pause]);
        setOrder(order + 1)
        }

    }

    const removeStep = (stepToRemove) => {
        setSteps((prevSteps) => prevSteps.filter((step) => step !== stepToRemove)) 
        setOrder(order - 1)
    };

    async function createModel(event) {
        event.preventDefault();
    
        if(steps.length === 0) {
            notifications.show({
                title: "Erreur",
                message: "Certains champs obligatoires n'ont pas été remplis.",
                color: "red"
            })
        } else {
            await addModel(name, steps);
            dispatch(change());
            notifications.show({
                title: `${name}`,
                message: "Le modèle a été créer avec succès."
            })
        }
    }

    
    return (
        <>
            <div id="createBlindModel" style={{ marginRight: "10em"}}>
                <Stack>

                    <Title order={1}>Créer une structure de blind</Title>

                    <Stack>
                        <Title order={5}>Nom de la structure</Title>
                        <TextInput 
                            placeholder="Nom de la strucure"
                            onChange={handleChangeName}
                        />
                    </Stack>


                    <Stack>
                        <Title order={5}>Ajouter une étape</Title>
                        <Group>
                            <NumberInput 
                                label="Temps (en minutes):"
                                onChange={setTime}
                                value={time}
                            />
                            
                            <NumberInput 
                                label="Petite blind:"
                                onChange={setSBlind}
                                value={SBlind}
                            />

                            <ActionIcon variant={"default"} onClick={addStep} id="addStepButton" size={"input-sm"} style={{ marginLeft: "-0.5em"}}>
                                <IconTextPlus />
                            </ ActionIcon>
                        </Group>

                        <Group>
                            <NumberInput 
                                label="Temps de pause (en minutes)"
                                value={pauseTime}
                                onChange={setPauseTime}
                            />

                            <ActionIcon variant={"default"} onClick={addPause} id="addStepButton" size={"input-sm"} style={{ marginLeft: "-0.5em"}}>
                                <IconTextPlus />
                            </ ActionIcon>

                        </Group>
                    </Stack>

                    {steps.length === 0 ? "" : <Title order={2}>Étapes</Title>}
                    <ol>

                        {steps.map((step, index) => (

                            <Group id="step" key={index}>

                                <Text size={"lg"}>{step.order} | {step.type === "pause" ? "Pause": "Jeu"} | {step.time} minutes {step.type === "pause" ? `` : ` | ${step.SBlind} | ${step.SBlind * 2}`} </Text>

                                <ActionIcon color="red" variant="transparent" onClick={() => { removeStep(step) }}>
                                    <IconTrash />
                                </ActionIcon>

                            </Group>

                        ))}

                    </ol>
             
                    
                    <Group>
                        <Button id="formButtons" variant="primary" onClick={createModel} rightSection={<IconDeviceFloppy />}> Sauvegarder </Button>
                    </Group>

                </Stack>
            </div>
        </>
    )
}