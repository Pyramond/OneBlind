import { useState } from 'react';
import { Slider, Title, Stack } from '@mantine/core';


export default function ChangeVolume() {

    const [volume, setVolume] = useState(window.localStorage.getItem("volume"))

    return (
        <Stack>

            <Title order={4}> Changer le volume ({parseInt(volume * 100)}) </Title>

            <Slider 
                value={volume}
                onChange={setVolume}
                onChangeEnd={window.localStorage.setItem("volume", volume)}
                min={0}
                max={1}
                step={0.01} 
                style={{ width: "80%" }} 
            />

        </Stack>
    )
}