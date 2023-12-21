import { FormGroup, Form, Button, Modal } from 'react-bootstrap';
import { getTimeStamp } from '../utils/date';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { change } from "../redux/slices/reload";

export default function AddPlayer() {

    const [playerName, setPLayerName] = useState("")
    const [show, setShow] = useState(false);
    const [id, setId] = useState()
    const [showError, setShowError] = useState(false)

    const dispatch = useDispatch()

    function handleChangeName(event) { setPLayerName(event.target.value) }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowError = () => setShowError(true)
    const handleCloseError = () => setShowError(false)

    function newPlayer() {
        const date = getTimeStamp()

        if(playerName == "") {
            handleShowError()
        } else {
            fetch("http://localhost:8000/player/add", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: playerName,
                    date: date
                })
            })
            .then(res => res.json())
            .then(res => {
                setId(res.id)
                handleShow()
                dispatch(change())
            })
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault()
        newPlayer()
    }

    return(
        <>
            <Form className="d-flex" onSubmit={handleFormSubmit}>
                <FormGroup className='mb-5'>
                    <Form.Label>Ajout d'un joueur </Form.Label>
                    <div id="formControl">
                        <Form.Control
                            placeholder="Nom du joueur"
                            className="me-2"
                            aria-label="Search"
                            onChange={handleChangeName}
                        />
                        <Button variant="outline-success" type="submit">Ajouter</Button>
                    </div>
                </FormGroup>
            </Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{playerName} a été ajouté</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p id="modalText">{playerName} a été ajouté avec l'identifant {id} et 0 points de départ</p>
                </Modal.Body>
            </Modal>

            <Modal show={showError} onHide={handleCloseError}>
                <Modal.Header closeButton>
                    <Modal.Title>Le nom du joueur n'a pas été saisi.</Modal.Title>
                </Modal.Header>
            </Modal>

        </>
    )
}