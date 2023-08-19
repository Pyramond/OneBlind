import { useState, useEffect } from "react"
import { Dropdown, Button, Card, CloseButton, Modal } from "react-bootstrap"
import { getTournamentPlayers, deleteTournament } from "../utils/tournaments"
import { convertTimeStamp } from "../utils/date"


export default function Tournament(props) {

    const [players, setPlayers] = useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getTournamentPlayers(props.tournament.id).then(players => {
            setPlayers(players)
        })
    }, [])

    return(
        <>
            <div id="tournament">

                <Card style={{ width: "18rem"}} bg="dark">
                    <Card.Body>
                        <CloseButton variant="white" onClick={handleShow}/>
                        <Card.Title style={{ color: "white" }}>{props.tournament.name}</Card.Title>
                        <Card.Text>
                            - Structure de blind: {props.tournament.blindName} <br/>
                            - Date:  {convertTimeStamp(props.tournament.date)} <br/>
                            - Jetons de départ: {props.tournament.initialChip} <br/>

                        </Card.Text>

                        <div id="cardButtons">
                            <Dropdown id="dropdown">
                                <Dropdown.Toggle variant="secondary">Joueurs</Dropdown.Toggle>

                                <Dropdown.Menu data-bs-theme="dark">
                                    {players.map((player, index) => (
                                        <Dropdown.Item key={index} disabled={true}> {player.name} </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button variant="primary" id="button" href={`/tournament/${props.tournament.id}`}>Ouvrir</Button>
                        </div>
                    </Card.Body>
                </Card>


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Supprimer ce tournois</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Tu es sur le point de supprimer ce tournoi de la liste des tournois actuels. <br/>Il restera cependant dans l'historique des tournois.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Annuler</Button>
                        <Button variant="danger" onClick={() => { handleClose() ; deleteTournament(props.tournament.id) }}>Supprimer</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}