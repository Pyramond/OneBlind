import { TournamentPlayers } from "./tournamentPlayers"
import { RecaveButton } from "./recaveButton"
import { BlindTabModal } from "./blindTabModal"
import { Container, Row, Col } from "react-bootstrap"
import { TablePlace } from "./tablePlace"
import PlayerSpotify from "./spotify/playerSpotify"
import TournementInfo from "./tournamentInfo"
import { useEffect, useState, useMemo } from "react"
import { useSelector } from 'react-redux';

export default function Other(props) {

    const [secondaryComponent, setSecondaryComponent] = useState(null)
    const t = useSelector((state) => state.reload);
    const effectDependency = useMemo(() => ({ value: t.value, random: Math.random() }), [t.value]);

    useEffect(() => {
        const component = window.localStorage.getItem("secondary-component")
        if (component) {
            switch(component) {
                case "TournamentInfo":
                    setSecondaryComponent(<TournementInfo/>);
                    break;
                case "SpotifyPlayerState":
                    setSecondaryComponent(<PlayerSpotify/>);
                    break;
                default:
                    setSecondaryComponent(<TournementInfo/>)
                    break;
            }
        } else {
            setSecondaryComponent(<TournementInfo/>)
        }
    }, [effectDependency])

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
                                <div id="tableButton"> <TablePlace /> </div>
                            </div>
                            </Row>
                        </Col>
                        <Col> {secondaryComponent} </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}