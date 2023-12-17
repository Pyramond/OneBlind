import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, Modal, Dropdown, Table } from 'react-bootstrap';
import { removePlayer } from '../redux/slices/tournamentPage/players';
import { updateAvStack } from '../redux/slices/tournamentPage/info';
import { deleteTournament } from "../utils/tournaments"
import { useNavigate } from 'react-router-dom';
import { calculatePoints } from '../utils/points';


export function TournamentPlayers(props) {

    // Redux
    const t = useSelector((state) => state.tournamentPlayers);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const tournamentInfo = useSelector((state) => state.tournamentInfo);


    const [isWinner, setIsWinner] = useState(false)
    const [playerToRemove, setPlayerToRemove] = useState("Éliminer")
    const [playerToRemoveId, setPlayerToRemoveId] = useState()

    const [eliminationsTab, setEliminationsTab] = useState([])
    

    // Ending modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // Final Modal
    const [showFinal, setShowFinal] = useState(false)
    const handleShowFinal = () => setShowFinal(true)
    const handleCloseFinal = () => setShowFinal(false)


    // Eliminate Modal
    const [showEliminate, setShowEliminate] = useState(false)
    const handleShowEliminate = () => setShowEliminate(true)
    const handleCloseEliminate = () => {
        setShowEliminate(false)
        setPlayerToRemove("Éliminer")
    }


    // Classement Modal
    const [showClassementModal, setShowClassementModal] = useState(false)
    const handleShowClassementModal = () => setShowClassementModal(true)
    const handleCloseClassementModal = () => setShowClassementModal(false)


    const handlePlayer = (selectedPlayerId) => {
        const selectedPlayer = t.value.find(player => player.id === parseInt(selectedPlayerId));
        setPlayerToRemove(selectedPlayer.name)
        setPlayerToRemoveId(parseInt(selectedPlayerId))
    }

    useEffect(() => {
        dispatch(updateAvStack(Object.keys(t.value).length))
        
        switch (Object.keys(t.value).length) {
            case 1:
                setIsWinner(true)
                eliminatePlayer(t.value[0].id, false, t.value[0].name)
                handleShowClassementModal()
                setPlayerToRemove(t.value[0].name)
                break;
            case 2:
                let audio = new Audio("/sounds/overtaken.mp3")
                if(!window.localStorage.getItem("volume")) {
                    audio.volume = 1
                } else {
                    audio.volume = window.localStorage.getItem("volume")
                }
                audio.play()
                handleShowFinal()
                break;
        }


    }, [Object.keys(t.value).length])

    async function eliminatePlayer(id, remove, name) {

        const place = Object.keys(t.value).length
        const points = calculatePoints(place, tournamentInfo.nbPlayer)

        const playerStats = {
            "name": name,
            "place": place,
            "points": points
        }
        console.warn(playerStats)
        setEliminationsTab([...eliminationsTab, playerStats]);


        fetch("http://localhost:8000/tournament/eliminate", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                place: place,
                tournament: parseInt(props.id),
                points: points
            })
          })
          .then(res => res.json())
          .then(res => {
            if(remove) {
                console.log(res)
                dispatch(removePlayer(id))
                handleShowEliminate()
            }
          })
    }

    return (
        <>
            <div id="tournamentPlayersContainer" >
                <h4>Éliminer un joueur: </h4>
                <div id="dropdown">
                    <Dropdown data-bs-theme="dark" className="me-2" onSelect={handlePlayer} id="dropdown">
                        <Dropdown.Toggle variant="dark">{playerToRemove}</Dropdown.Toggle>

                        <Dropdown.Menu>
                            {t.value.map((player, index) => (
                                <Dropdown.Item key={index} eventKey={player.id}>{player.name}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    {isWinner ? <div> <p>{t.value[0].name} Gagnant</p> <Button variant="primary" onClick={handleShow}>Terminer le tournois</Button> </div> : <Button variant="danger" onClick={() => { eliminatePlayer(playerToRemoveId, true, playerToRemove)}}>Éliminer</Button>}
                </div>
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
                        <p id="modalText">Les deux joueurs restants sont:</p>
                        <ul>
                        {t.value.map((player, index) => (
                            <li id="modalText" key={index}>{player.name}</li>
                        ))}
                        </ul>
                        <p id="modalText">Le tapis moyen est de {tournamentInfo.avStack} avec un total de {tournamentInfo.totalChips} jetons</p>
                        <img src="/images/fight.gif" alt="finalGif" id="finalGif"/>

                    </Modal.Body>
            </Modal>

            
            {/* Eliminate Modal */}
            <Modal show={showEliminate} onHide={handleCloseEliminate}>
                    <Modal.Header closeButton>
                        <Modal.Title>{playerToRemove} à été éliminé</Modal.Title>
                    </Modal.Header>
            </Modal>

            {/* Classement Modal */}
            <Modal show={showClassementModal} onHide={handleCloseClassementModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Classement de la partie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Table striped bordered hover variant={props.theme}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nom</th>
                                <th>Points gagnés</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eliminationsTab.map((player, index) => (
                                <tr key={index}>
                                    <td>{player.place}</td>
                                    <td>{player.name}</td>
                                    <td>+{player.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </Modal.Body>
            </Modal>
        </>
    )
}