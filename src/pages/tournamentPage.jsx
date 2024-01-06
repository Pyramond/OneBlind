import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayers } from '../redux/slices/tournamentPage/players';
import { setInfos } from "../redux/slices/tournamentPage/info"
import { useEffect, useState } from 'react';
import { getTournamentPlayers, getTournamentById } from '../utils/tournaments';
import { getModelById } from '../utils/models';
import { setSteps, changeStep } from '../redux/slices/tournamentPage/steps';
import MyTimer from '../react-components/timer';
import Blind from '../react-components/blind';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Other from '../react-components/tournamentOther';
import AvStack from '../react-components/avStack';
import BlindTab from '../react-components/blindTab';

export default function TournamentPage() {

    const { id } = useParams();
    const dispatch = useDispatch()
    const t = useSelector((state) => state.tournamentPlayers);
    const [blindTabComponent, setBlindTabComponent] = useState(<p></p>)

    useEffect(() => {
      async function fetchData() {
        const players = await getTournamentPlayers(id);
        dispatch(setPlayers(players));

        const infos = await getTournamentById(id);
        infos.number = players.length;
        setBlindTabComponent(<BlindTab id={infos.blindId}/>)
        dispatch(setInfos(infos));

        const steps = await getModelById(infos.blindId);
        dispatch(setSteps(steps.steps));
        dispatch(changeStep());
      }
      fetchData()
    }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col> <Blind /> </Col>
          <Col> <MyTimer /> </Col>
        </Row>
        <Row>
          <Col> <Other id={id} /> </Col>
          <Col> <AvStack /> </Col>
        </Row>
      </Container>

      
    </>
  )
}
