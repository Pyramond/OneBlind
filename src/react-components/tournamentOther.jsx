import { TournamentPlayers } from "./tournamentPlayers"
import { RecaveButton } from "./recaveButton"
import { BlindTabModal } from "./blindTabModal"
import { Container, Row, Col } from "react-bootstrap"

export default function Other(props) {
    return(
        <>
            <div id="otherContainer">
                <Container>
                    <Row>
                        <Col> <TournamentPlayers id={props.id}/> </Col>
                        <Col>
                            <div id="recave">
                                <h4>Recave: </h4>
                                <div id="recaveButton"> <RecaveButton /> </div>
                            </div> 
                        </Col>
                    </Row>
                    <Row>
                        <BlindTabModal />
                    </Row>
                </Container>
            </div>
        </>
    )
}




