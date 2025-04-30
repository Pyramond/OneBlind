import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPlayers } from '../../redux/slices/tournamentPage/players';
import { setInfos } from "../../redux/slices/tournamentPage/info"
import { useEffect } from 'react';
import { getTournamentPlayers, getTournamentById } from '../../utils/tournaments';
import { getModelById } from '../../utils/models';
import { setSteps, changeStep } from '../../redux/slices/tournamentPage/steps';
import MyTimer from '../../react-components/timer';
import Blind from '../../react-components/blind';
import Other from '../../react-components/tournamentOther';
import AvStack from '../../react-components/avStack';
import {Flex, SimpleGrid} from '@mantine/core';

export default function TournamentPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const players = await getTournamentPlayers(id);
            dispatch(setPlayers(players));

            const infos = await getTournamentById(id);
            infos.number = players.length;
            dispatch(setInfos(infos));

            const steps = await getModelById(infos.blindId);
            dispatch(setSteps(steps.steps));
            dispatch(changeStep());
        }
        fetchData();
    }, []);

    return (
        <Flex
            direction="column"
            h="100vh"
            gap="8em"
            p="1em"
        >
            <Flex style={{ flex: 0.35 }}>
                <SimpleGrid
                    cols={2}
                    breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                    spacing="xl"
                    w="100%"
                >
                    <Blind />
                    <MyTimer />
                </SimpleGrid>
            </Flex>

            <Flex style={{ flex: 0.5 }}>
                <SimpleGrid
                    cols={2}
                    breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                    spacing="xl"
                    w="100%"
                >
                    <Other id={id} />
                    <AvStack />
                </SimpleGrid>
            </Flex>
        </Flex>
    );
}