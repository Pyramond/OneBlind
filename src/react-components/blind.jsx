import { useSelector } from 'react-redux';


export default function Blind() {

    const t = useSelector((state) => state.tournamentSteps);

    return(
        <>
            <div id="blindContainer">
                    {t.currentStep.sb ?
                        <div id="blindNumberContainer">
                            <h1 id="blindNumber">{t.currentStep.sb} </h1>
                            <h1 id="blindNumber">{t.currentStep.sb * 2} </h1>
                        </div>
                    :
                        <h1 id="blindNumber" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}> Pause </h1>
                    }
            </div>
        </>
    )
}