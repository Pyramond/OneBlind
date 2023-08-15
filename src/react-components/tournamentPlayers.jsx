import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { removePlayer } from '../redux/slices/tournamentPage/players';
import { updateAvStack } from '../redux/slices/tournamentPage/info';
import { deleteTournament } from "../utils/tournaments"
import { useNavigate } from 'react-router-dom';


export function TournamentPlayers(props) {

    const t = useSelector((state) => state.tournamentPlayers);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [isWinner, setIsWinner] = useState(false)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(updateAvStack(Object.keys(t.value).length))

        if(Object.keys(t.value).length == 1) {
            setIsWinner(true)
            eliminatePlayer(t.value[0].id, false)
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
                {t.value.map((player, index) => (
                    <p id="player" key={index}>{player.name} {isWinner ? <div> <p>Gagnant</p> <Button variant="primary" onClick={handleShow}>Terminer le tournois</Button> </div> : <Button variant='danger' onClick={() => { eliminatePlayer(player.id, true) }}>Eliminer</Button>} </p>
                ))}
            </div>

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
        </>
    )
}