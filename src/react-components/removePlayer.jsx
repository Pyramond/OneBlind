import { useEffect, useState, useMemo } from 'react';
import { FormGroup, Form, Button, Modal, Dropdown } from 'react-bootstrap';
import { getAllPlayer } from "../utils/players";
import { useDispatch, useSelector } from 'react-redux';
import { change } from "../redux/slices/reload";

export default function RemovePlayer() {

    const [playerToRemove, setPlayerToRemove] = useState("Joueur")
    const [allPlayers, setAllPlayers] = useState([])
    const [player, setPlayer] = useState({})
    const [show, setShow] = useState(false);

    const t = useSelector((state) => state.reload);
    const dispatch = useDispatch();
    const effectDependency = useMemo(() => ({ value: t.value, random: Math.random() }), [t.value]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getAllPlayer().then(players => {
            setAllPlayers(players);
          });
    }, [effectDependency])

    const handlePlayer = (selectedPlayerId) => {
        const selectedPlayer = allPlayers.find(player => player.id === parseInt(selectedPlayerId));
        setPlayerToRemove(selectedPlayer.name)
        setPlayer(selectedPlayer)
    }

    function deletePlayer() {
        fetch("http://localhost:8000/deletePlayer", {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: player.name,
                id: player.id
            })
          })
          .then(res => res.json())
          .then(res => {
                setAllPlayers((prevAllPLayers) => prevAllPLayers.filter((player) => player !== player.name))
                setPlayerToRemove("Joueur")
                dispatch(change())
          })
    }
 
    return(
        <>

            <Form className="d-flex">
                <FormGroup className='mb-5'>
                    <Form.Label>Supprimer un joueur: </Form.Label>
                    <div id="formControl">
                        <Dropdown data-bs-theme="dark" className="me-2" onSelect={handlePlayer}>
                            <Dropdown.Toggle variant="dark">{playerToRemove}</Dropdown.Toggle>

                            <Dropdown.Menu>
                            {allPlayers.map((player, index) => (
                                <Dropdown.Item key={index} eventKey={player.id}>{player.name}</Dropdown.Item>
                            ))}
                            </Dropdown.Menu>

                        </Dropdown>

                        <Button variant="outline-danger" onClick={handleShow}>Supprimer</Button>
                    </div>
                </FormGroup>
            </Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Êtes-vous sûr de vouloir supprimer le joueur {player.name} ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p id="modalText">
                        Nom: {player.name} <br/>
                        Points: {player.points} <br/>
                        Date de création: {player.date}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> Annuler </Button>
                    <Button variant="danger" onClick={() => { deletePlayer() ; handleClose() }}> Supprimer </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}