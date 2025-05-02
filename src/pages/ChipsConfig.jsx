import {Button, NumberInput, Stack, Text, TextInput, Title} from "@mantine/core";
import { get_all_chips, add_chips } from "../utils/chips.js";
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { setChips } from "../redux/slices/chips.js";
import Chip from "../react-components/chip.jsx";


function ChipsConfig() {

    const [color, setColor] = useState(undefined);
    const [value, setValue] = useState(undefined);

    const dispatch = useDispatch()
    const chipsSlice = useSelector((state) => state.chips);
    const effectDependency = useMemo(() => ({ value: chipsSlice.value, random: Math.random() }), [chipsSlice.value]);

    async function fetchData() {
        const data = await get_all_chips();
        dispatch(setChips(data))
    }

    useEffect(() => {
        fetchData();
    }, [effectDependency]);

    async function addChip() {
        await add_chips(color, value);
        fetchData()
    }

    return <>
        <Title order={1}>Jetons</Title>

        <div id="add_chips_container">
            <TextInput
                label="Couleur"
                value={color} onChange={(event) => setColor(event.currentTarget.value)}
                placeholder="Bleu"
            />

            <NumberInput
                label="Valeur"
                value={value} onChange={setValue}
                placeholder="100"
            />

            <Button onClick={addChip}>Ajouter</Button>
        </div>

        <Stack id="chips">
            {chipsSlice.value.map((chip, index) => (
                <Chip key={index} color={chip.color} value={chip.value} id={chip.id} />
            ))}
        </Stack>
    </>
}

export default ChipsConfig
