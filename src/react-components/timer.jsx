import { useTimer } from 'react-timer-hook';
import { useDispatch, useSelector } from 'react-redux';
import { changeStep, prevStep } from '../redux/slices/tournamentPage/steps';
import { set } from '../redux/slices/tournamentPage/timer';
import { useEffect, useState, useMemo } from 'react';
import { Button, Form } from 'react-bootstrap';


export default function MyTimer() {

    const t = useSelector((state) => state.tournamentSteps);
    const dispatch = useDispatch();
    const [isFinish, setIsFinish] = useState(false)
    const [isPlay, setIsPlay] = useState(false)
    const [counter, setCounter] = useState(0)
    const [isDisabled, setIsDisabled] = useState(false)

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
            dispatch(set(t.currentStep.type))

            if(t.currentStep.order == 1) setIsDisabled(true)
            else setIsDisabled(false)
        }

        if(isPlay === false) {
            pause()
        }
  }, [effectDependency]);

  useEffect(() => {
    setCounter(counter + 1)
    if(hours == 0 && minutes == 0 && seconds ==  6) {
        new Audio("/sounds/timerSound.mp3").play()
    }
  }, [seconds])

  const handleSliderChange = (event) => {
    const newValue = parseInt(event.target.value, 10);

    const newExpiryTimestamp = new Date(
      new Date().getTime() + newValue * 1000
    );
    restart(newExpiryTimestamp);
    setIsPlay(true)
  };

  function verifyStep(action) {
    if(action === "next") {
        dispatch(changeStep())
    } else if(action === "prev") {
        if(t.currentStep.order == 1) {

        } else {
            dispatch(prevStep())
        }
    }
  }


    return (
        <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '180px', color: "white"}}>
               <span>{hours < 10 ? "0" + hours : hours}</span>:<span>{minutes < 10 ? "0" + minutes : minutes}</span>:<span>{seconds < 10 ? "0" + seconds : seconds}</span>
            </div>

            <p id="info">{isFinish ? `${Object.keys(t.steps).length} / ${Object.keys(t.steps).length}` : `${t.currentStep.order} / ${Object.keys(t.steps).length}`}</p>
            
            <Button variant="secondary" disabled={isDisabled} onClick={() => {
                verifyStep("prev")
            }}> <img src="/images/timer-icons/PreviousArrowBackward.svg" alt="Prev_button_icon" /> </Button>

            {isPlay ? <Button variant="danger" onClick={() => { pause() ; setIsPlay(false)}} id="timerButtons"> <img src="/images/timer-icons/Pause.svg" alt="Pause_button_image" /> </Button> : <Button variant='success' onClick={() => { resume() ; setIsPlay(true)}} id="timerButtons"> <img src="/images/timer-icons/Play.svg" alt="Play_button_image" /> </Button>}

            <Button variant="secondary" onClick={() => {
                const time = new Date(new Date().getTime() + t.currentStep.time * 60000);
                restart(time);
            }} id="timerButtons" > <img src="/images/timer-icons/restart.svg" alt="Restart_button_image" id="Restart_button_image" /> </Button>

            <Button variant="secondary" onClick={() => {
                verifyStep("next")
            }}> <img src="/images/timer-icons/NextArrowForward.svg" alt="Next_button_image" /> </Button>

            <div id="sliderContainer">
                <Form.Range 
                    id="slider"
                    value={minutes * 60 + seconds}
                    step={1}
                    min={0}
                    max={t.currentStep.time * 60}
                    onChange={handleSliderChange}
                />
            </div>
        </div>
    );
}