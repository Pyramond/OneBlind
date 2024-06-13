import { Button, Title, Group, Stack, Text, NumberFormatter } from '@mantine/core';
import { useSelector } from 'react-redux';


export default function InfoBoxes() {

    const recapInfos = useSelector((state) => state.recap);

    function calculerDifference(timestampDebut, timestampFin) {
        const differenceEnMillisecondes = Math.abs(timestampFin - timestampDebut);
        const secondes = Math.floor(differenceEnMillisecondes / 1000) % 60;
        const minutes = Math.floor(differenceEnMillisecondes / (1000 * 60)) % 60;
        const heures = Math.floor(differenceEnMillisecondes / (1000 * 60 * 60));

        if(heures > 0) {
            return `${heures}h ${minutes}min ${secondes}sec`
        } else if(minutes > 0) {
            return `${minutes}min ${secondes}sec`
        } else {
            return `${secondes}sec`
        }
    }

    return <Stack id="infoBoxes">

        <Group>
            <div id="infoBox">
                <Text id="infoBoxText" fw={500}> {recapInfos.recap.recaveCounter} {recapInfos.recap.recaveCounter > 1 ? "Recaves" : "Recave"} </Text>
            </div>
            <div id="infoBox">
                <Stack>
                    <Text id="infoBoxTitle" fw={500}>Tapis Moyen</Text>
                    <Text fw={500} id="infoBoxText"> <NumberFormatter value={recapInfos.recap.avStack} thousandSeparator=" " /> </Text>
                </Stack>
            </div>
        </Group>
        <Group>
            <div id="infoBox">
                <Stack>
                    <Text id="infoBoxTitle" fw={500}>Tapis Initial</Text>
                    <Text fw={500} id="infoBoxText"> <NumberFormatter value={recapInfos.tournament.initialChip} thousandSeparator=" " /> </Text>
                </Stack>
            </div>
            <div id="infoBox">
                <Text id="infoBoxText" fw={500}> {calculerDifference(recapInfos.recap.start, recapInfos.recap.end)} </Text>
            </div>
        </Group>

    </Stack>
}