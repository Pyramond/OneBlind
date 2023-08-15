import { useTimer } from 'react-timer-hook';
import { useDispatch, useSelector } from 'react-redux';
import { changeStep } from '../redux/slices/tournamentPage/steps';
import { useEffect, useState, useMemo } from 'react';
import { Button } from 'react-bootstrap';


export default function MyTimer() {

    const t = useSelector((state) => state.tournamentSteps);
    const dispatch = useDispatch();
    const [isFinish, setIsFinish] = useState(false)
    const [isPlay, setIsPlay] = useState(false)

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
        expiryTimestamp: 0,
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

        if(isPlay === false) {
            pause()
        }
  }, [effectDependency]);



    return (
        <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '180px', color: "white"}}>
               <span>{hours < 10 ? "0" + hours : hours}</span>:<span>{minutes < 10 ? "0" + minutes : minutes}</span>:<span>{seconds < 10 ? "0" + seconds : seconds}</span>
            </div>

            <p id="info">{isFinish ? "Partie Terminée" : t.currentStep.type}</p>
            <p id="info">{isFinish ? `${Object.keys(t.steps).length} / ${Object.keys(t.steps).length}` : `${t.currentStep.order} / ${Object.keys(t.steps).length}`}</p>

            {isPlay ? <Button variant="danger" onClick={() => { pause() ; setIsPlay(false)}} id="timerButtons"> <img src="/images/timer-icons/Pause.svg" alt="Pause_button_image" /> </Button> : <Button variant='success' onClick={() => { resume() ; setIsPlay(true)}} id="timerButtons"> <img src="/images/timer-icons/Play.svg" alt="Play_button_image" /> </Button>}

            <Button variant="secondary" onClick={() => {
                const time = new Date(new Date().getTime() + t.currentStep.time * 60000);
                restart(time);
            }} id="timerButtons" > <img src="/images/timer-icons/restart.svg" alt="Restart_button_image" id="Restart_button_image" /> </Button>

            <Button variant="secondary" onClick={() => {
                dispatch(changeStep())
            }}> <img src="/images/timer-icons/NextArrowForward.svg" alt="Next_button_image" /> </Button>
        </div>
    );
}