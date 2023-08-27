import { TournamentPlayers } from "./tournamentPlayers"
import { RecaveButton } from "./recaveButton"
import { BlindTabModal } from "./blindTabModal"
import { Container, Row, Col } from "react-bootstrap"
import { useSelector } from "react-redux"
import { convertTimeStamp } from "../utils/date"

export default function Other(props) {

    const t = useSelector((state) => state.tournamentInfo);
    const tournamentPlayers = useSelector((state) => state.tournamentPlayers);


    return(
        <>
            <div id="otherContainer">
                <Container>
                    <Row>
                        <Col>
                            <Row> <TournamentPlayers id={props.id}/> </Row>
                            <Row>
                            <div id="buttonGroupContainer">
                                <div id="blindTabModalComponent"> <BlindTabModal /> </div>
                                <div id="recaveButton"> <RecaveButton /> </div>
                            </div>
                            </Row>
                        </Col>
                        <Col>
                            <div id="informationsContainer">
                                <h4>Informations:</h4>
                                <div id="infos">
                                    <p>
                                        <span> Nom du tournois: </span> {t.name} <br />
                                        <span> date: </span> {convertTimeStamp(parseInt(t.date))} <br />
                                        <span> structure de blind: </span> {t.blindName} <br />
                                        <span> Tapis initial: </span> {t.initialChip} <br />
                                        <span> Nombre de joueur: </span> {Object.keys(tournamentPlayers.value).length}

                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}