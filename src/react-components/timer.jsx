import { useTimer } from 'react-timer-hook';
import { useDispatch, useSelector } from 'react-redux';
import { changeStep } from '../redux/slices/tournamentPage/steps';
import { useEffect, useState, useMemo } from 'react';
import { Button } from 'react-bootstrap';


export default function MyTimer() {

    const t = useSelector((state) => state.tournamentSteps);
    const dispatch = useDispatch();
    const [isFinish, setIsFinish] = useState(false)

    const effectDependency = useMemo(() => ({ currentStep: t.currentStep, random: Math.random() }), [t.currentStep]);
    
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp: new Date(new Date().getTime() + t.currentStep.time * 60000 - 1 * 1000),
        onExpire: () => {
            dispatch(changeStep())
        },
    });

    useEffect(() => {
        if(!t.currentStep.order) {
            setIsFinish(true)
        } else {
            setIsFinish(false)
            const newExpiryTimestamp = new Date(new Date().getTime() + t.currentStep.time * 60000 - 1 * 1000);
            restart(newExpiryTimestamp);
        }
  }, [effectDependency]);



    return (
        <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '180px', color: "white"}}>
               <span>{hours < 10 ? "0" + hours : hours}</span>:<span>{minutes < 10 ? "0" + minutes : minutes}</span>:<span>{seconds}</span>
            </div>

            <p id="info">{isRunning ? 'Running' : 'Not running'}</p>
            <p id="info">{isFinish ? "Partie Terminée" : t.currentStep.type}</p>
            <p id="info">{isFinish ? "Toutes les étapes sont terminées" : `Étape ${t.currentStep.order}`}</p>

            <Button variant='success' onClick={resume} id="timerButtons">Resume</Button>
            <Button variant="danger" onClick={pause} id="timerButtons">Pause</Button>

            <Button variant="secondary" onClick={() => {
                const time = new Date(new Date().getTime() + t.currentStep.time * 60000);
                restart(time);
            }} id="timerButtons" >Restart</Button>

            <Button variant="secondary" onClick={() => {
                dispatch(changeStep())
            }}>Next</Button>
        </div>
    );
}