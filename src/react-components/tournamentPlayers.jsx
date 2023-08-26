import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, Modal, Dropdown } from 'react-bootstrap';
import { removePlayer } from '../redux/slices/tournamentPage/players';
import { updateAvStack } from '../redux/slices/tournamentPage/info';
import { deleteTournament } from "../utils/tournaments"
import { useNavigate } from 'react-router-dom';


export function TournamentPlayers(props) {

    // Redux
    const t = useSelector((state) => state.tournamentPlayers);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const tournamentInfo = useSelector((state) => state.tournamentInfo);


    const [isWinner, setIsWinner] = useState(false)
    const [playerToRemove, setPlayerToRemove] = useState("Éliminer")
    const [playerToRemoveId, setPlayerToRemoveId] = useState()
    

    // Ending modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // Final Modal
    const [showFinal, setShowFinal] = useState(false)
    const handleShowFinal = () => setShowFinal(true)
    const handleCloseFinal = () => setShowFinal(false)


    const handlePlayer = (selectedPlayerId) => {
        const selectedPlayer = t.value.find(player => player.id === parseInt(selectedPlayerId));
        setPlayerToRemove(selectedPlayer.name)
        setPlayerToRemoveId(parseInt(selectedPlayerId))
    }


    function test() {
        console.log(t.value)
    }

    useEffect(() => {
        dispatch(updateAvStack(Object.keys(t.value).length))
        
        switch (Object.keys(t.value).length) {
            case 1:
                setIsWinner(true)
                eliminatePlayer(t.value[0].id, false)
                break;
            case 2:
                new Audio("/sounds/overtaken.mp3").play()
                handleShowFinal()
                break;
        }


    }, [Object.keys(t.value).length])

    function eliminatePlayer(id, remove) {

        fetch("http://localhost:8000/tournament/eliminate", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                place: Object.keys(t.value).length,
                tournament: parseInt(props.id)
            })
          })
          .then(res => res.json())
          .then(res => {
            if(remove) dispatch(removePlayer(id))
          })
    }

    return (
        <>
            <div id="tournamentPlayersContainer">
                <Dropdown data-bs-theme="dark" className="me-2" onSelect={handlePlayer}>
                    <Dropdown.Toggle variant="dark">{playerToRemove}</Dropdown.Toggle>

                    <Dropdown.Menu>
                        {t.value.map((player, index) => (
                            <Dropdown.Item key={index} eventKey={player.id}>{player.name}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <Button variant="danger" onClick={() => { eliminatePlayer(playerToRemoveId, true)}}>Éliminer</Button>
            </div>


            {/* Ending modal */}
            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Terminer ce tournois</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Tu es sur le point de terminer ce tournoi, il ne sera donc plus visible dans la liste des tournois actuels. <br/>Il restera cependant dans l'historique des tournois.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Annuler</Button>
                        <Button variant="danger" onClick={() => { handleClose() ; deleteTournament(props.id) ; navigate("/") }}>Supprimer</Button>
                    </Modal.Footer>
            </Modal>


            {/* 2 Players left Modal */}
            <Modal show={showFinal} onHide={handleCloseFinal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Il ne reste plus que deux joueurs</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p id="modalText">Les deux joueurs restant sont:</p>
                        <ul>
                        {t.value.map((player, index) => (
                            <li id="modalText" key={index}>{player.name}</li>
                        ))}
                        </ul>
                        <p id="modalText">Le tapis moyen est de {tournamentInfo.avStack} avec un total de {tournamentInfo.totalChips} Jetons</p>
                        <img src="/images/fight.gif" alt="finalGif" id="finalGif"/>

                    </Modal.Body>
            </Modal>
        </>
    )
}