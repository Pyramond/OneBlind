import { useSelector } from 'react-redux';


export default function Blind() {

    const t = useSelector((state) => state.tournamentSteps);
    const tournamentTimer = useSelector((state) => state.tournamentTimer)

    return(
        <>
            <div id="blindContainer">
                <div id="blindNumberContainer">
                    <h1 id="blindNumber">{t.currentStep.sb ? t.currentStep.sb : tournamentTimer.type} </h1>
                    <h1 id="blindNumber">{t.currentStep.sb ? t.currentStep.sb * 2 : tournamentTimer.type} </h1>
                </div>
            </div>
        </>
    )
}