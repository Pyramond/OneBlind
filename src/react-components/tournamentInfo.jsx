import { useSelector } from "react-redux"
import { convertTimeStamp } from "../utils/date"


export default function TournementInfo() {
    
    const t = useSelector((state) => state.tournamentInfo);
    const tournamentPlayers = useSelector((state) => state.tournamentPlayers);

    return (
        <>
            <div id="informationsContainer">
                <h4>Informations:</h4>
                <div id="infos">
                    <p>
                        <span> Nom du tournois: </span> {t.name} <br />
                        <span> date: </span> {convertTimeStamp(parseInt(t.date))} <br />
                        <span> structure de blind: </span> {t.blindName} <br />
                        <span> Tapis initial: </span> {t.initialChip} <br />
                        <span> Nombre de joueur: </span> {Object.keys(tournamentPlayers.value).length} / {t.nbPlayer}
                    </p>
                </div>
            </div>
        </>
    )
}