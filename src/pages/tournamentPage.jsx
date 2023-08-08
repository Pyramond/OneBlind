import NavigationBar from '../react-components/navbar'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayers } from '../redux/slices/tournamentPage/players';
import { setInfos } from "../redux/slices/tournamentPage/info"
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getTournamentPlayers, getTournamentById } from '../utils/tournaments';
import { getModelById } from '../utils/models';
import { setSteps, changeStep } from '../redux/slices/tournamentPage/steps';
import MyTimer from '../react-components/timer';


export default function TournamentPage() {

    const { id } = useParams();
    const dispatch = useDispatch()
    const t = useSelector((state) => state.tournamentSteps);

    useEffect(() => {
      getTournamentPlayers(id).then((players) => {
        dispatch(setPlayers(players));
      });
    
      getTournamentById(id).then((infos) => {
        dispatch(setInfos(infos));
    
        getModelById(infos.blindId).then((steps) => {
          dispatch(setSteps(steps.steps));
          dispatch(changeStep())
        });
      });
    }, []);

    function test() {
      alert(JSON.stringify(t.currentStep));
    }
  return (
    <>
      <NavigationBar />
        <MyTimer />
    </>
  )
}
