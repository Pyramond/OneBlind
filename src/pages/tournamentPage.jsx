import NavigationBar from '../react-components/navbar'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayers } from '../redux/slices/tournamentPage/players';
import { setInfos } from "../redux/slices/tournamentPage/info"
import { useEffect } from 'react';
import { getTournamentPlayers, getTournamentById } from '../utils/tournaments';
import { getModelById } from '../utils/models';
import { setSteps, changeStep } from '../redux/slices/tournamentPage/steps';
import MyTimer from '../react-components/timer';
import Blind from '../react-components/blind';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TournamentPlayers } from '../react-components/tournamentPlayers';
import AvStack from '../react-components/avStack';


export default function TournamentPage() {

    const { id } = useParams();
    const dispatch = useDispatch()
    const t = useSelector((state) => state.tournamentPlayers);

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
      <NavigationBar />

        <Container fluid>
        <Row>
          <Col> <Blind /> </Col>
          <Col> <MyTimer /> </Col>
        </Row>
        <Row>
          <Col> <TournamentPlayers id={id} /> </Col>
          <Col> <AvStack /> </Col>
        </Row>
      </Container>

      
    </>
  )
}
