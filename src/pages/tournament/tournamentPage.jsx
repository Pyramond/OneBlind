import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayers } from '../../redux/slices/tournamentPage/players';
import { setInfos } from "../../redux/slices/tournamentPage/info"
import { useEffect, useState } from 'react';
import { getTournamentPlayers, getTournamentById } from '../../utils/tournaments';
import { getModelById } from '../../utils/models';
import { setSteps, changeStep } from '../../redux/slices/tournamentPage/steps';
import MyTimer from '../../react-components/timer';
import Blind from '../../react-components/blind';
import Other from '../../react-components/tournamentOther';
import AvStack from '../../react-components/avStack';
import BlindTab from '../../react-components/blindTab';
import { SimpleGrid } from '@mantine/core';

export default function TournamentPage() {

    const { id } = useParams();
    const dispatch = useDispatch()

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
      fetchData()
    }, []);

  return (
    <>
      <SimpleGrid cols={2}>
          <Blind />
          <MyTimer />
          <Other id={id} />
          <AvStack />
      </SimpleGrid>
    </>
  )
}
