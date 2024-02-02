import { useState, useMemo } from 'react';
import { getDate } from "../utils/date";
import { useDispatch, useSelector } from 'react-redux';
import { change } from "../redux/slices/reload";
import { addModel } from '../utils/models';
import { IconDeviceFloppy } from "@tabler/icons-react";
import { TextInput, NumberInput, Text, Button, Title, Group, Stack, CloseButton, Modal, Notification } from '@mantine/core';
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
        const step = {
            "order": order,
            "time": time,
            "type": "game",
            "SBlind": SBlind
        }
        setSteps((prevSteps) => [...prevSteps, step]);
        setOrder(order + 1)
    }

    function addPause() {
        const pause = {
            "order": order,
            "time": pauseTime,
            "type": "pause",
            "SBlind": 0
        }
        setSteps((prevSteps) => [...prevSteps, pause]);
        setOrder(order + 1)
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

                            <Button variant="default" onClick={addStep} id="addStepButton">Ajouter étape</Button>
                        </Group>

                        <Group>
                            <NumberInput 
                                label="Temps de pause (en minutes)"
                                value={pauseTime}
                                onChange={setPauseTime}
                            />
                            <Button variant="default" onClick={addPause} id="pauseButton">Ajouter Pause</Button>
                        </Group>
                    </Stack>

                    {steps.length === 0 ? "" : <Title order={2}>Étapes</Title>}
                    <ol>
                        {steps.map((step, index) => (
                            <li key={index} id="step" >
                                <Group>
                                    {step.time}' | {step.type} {step.type == "pause" ? `` : `| ${step.SBlind} | ${step.SBlind * 2}`}
                                    <CloseButton variant="white" onClick={() => removeStep(step)}/> 
                                </Group>
                            </li>
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