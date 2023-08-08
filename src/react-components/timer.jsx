import { useTimer } from 'react-timer-hook';
import { useDispatch, useSelector } from 'react-redux';
import { changeStep } from '../redux/slices/tournamentPage/steps';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';


export default function MyTimer() {

    const t = useSelector((state) => state.tournamentSteps);
    const dispatch = useDispatch();
    const [currentTime, setCurrentTime] = useState(0)
    
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
        expiryTimestamp: new Date(new Date().getTime() + t.currentStep.time * 60000),
        onExpire: () => {
            console.log('on expire');
            dispatch(changeStep())
            
        },
    });

    useEffect(() => {
      const newExpiryTimestamp = new Date(new Date().getTime() + t.currentStep.time * 60000);
      restart(newExpiryTimestamp);
      setCurrentTime(t.currentStep.time)
  }, [t.currentStep.time]);



    return (
        <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '180px', color: "white"}}>
                <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
            <p>{isRunning ? 'Running' : 'Not running'}</p>
            <p>{t.currentStep.type}</p>
            <Button variant='success' onClick={resume} id="timerButtons">Resume</Button>
            <Button variant="danger" onClick={pause} id="timerButtons">Pause</Button>
            <Button variant="secondary" onClick={() => {
                const time = new Date();
                time.setSeconds(time.getSeconds() + currentTime);
                restart(time);
            }} id="timerButtons" >Restart</Button>
        </div>
    );
}