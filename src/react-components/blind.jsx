import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';


export default function Blind() {

    const t = useSelector((state) => state.tournamentSteps);

    return(
        <>
            <div id="blindContainer">
                <div id="blindNumberContainer">
                    <h1 id="blindNumber">{t.currentStep.sb}</h1>
                    <h1 id="blindNumber">{t.currentStep.sb * 2}</h1>
                </div>
            </div>
        </>
    )
}