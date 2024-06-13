import { useParams } from 'react-router-dom';
import { getRecap } from '../utils/tournaments';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInfo } from '../redux/slices/tournamentRecap/recap';
import { Title, Text, Stack , Group} from '@mantine/core';
import InfoBoxes from '../react-components/tournamentRecap/infoBoxes';
import { getModelById } from '../utils/models';
import { formatDate } from '../utils/date';
import SmallBlindTab from '../react-components/tournamentRecap/smallBlindTab';
import PlayerClassement from '../react-components/tournamentRecap/playerClassement';


export default function TournamentRecap() {

    const { id } = useParams()
    const dispatch = useDispatch();
    const recapInfos = useSelector((state) => state.recap);
    const [steps, setSteps] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        async function getData() {
            const infos = await getRecap(id)

            if(infos.status === 404) setStatus(infos.status)
            else {
                dispatch(setInfo(infos.data))
                const reponseSteps = await getModelById(infos.data.tournament.blindId)
                setSteps(reponseSteps.steps)
            }
        }
        getData()

    }, [])

    if(status === 404) {
        return <Title order={1}>Aucun récapitulatif pour ce tournoi</Title>
    }

    return (
        <>
            <Title order={1}>Récapitulatif du tournois {recapInfos.tournament.name}</Title>
            <Text fs="italic" id="date"> {formatDate(recapInfos.recap.start)} </Text>
            {/* <Button onClick={() => { console.log(recapInfos) }}>Test</Button> */}

            <Group justify="space-between">

                <Stack>
                    <InfoBoxes />

                    <Stack id="blindBoxe">
                        <Title order={2}> Structure utilisée: {recapInfos.tournament.blindName} </Title>
                        <SmallBlindTab steps={steps} />
                    </Stack>
                </Stack>

                <PlayerClassement />

            </Group>
        </>
    )
}