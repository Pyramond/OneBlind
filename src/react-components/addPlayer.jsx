import { FormGroup, Form, Button, Modal } from 'react-bootstrap';
import { getTimeStamp } from '../utils/date';
import { useState } from 'react';

export default function AddPlayer() {

    const [playerName, setPLayerName] = useState("")
    const [show, setShow] = useState(false);
    const [id, setId] = useState()

    function handleChangeName(event) { setPLayerName(event.target.value) }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function newPlayer() {
        const date = getTimeStamp()

        fetch("http://localhost:8000/addPlayer", {
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
        })
    }

    return(
        <>
            <Form className="d-flex">
                <FormGroup className='mb-5'>
                    <Form.Label>Ajout d'un joueur: </Form.Label>
                    <div id="formControl">
                        <Form.Control
                            placeholder="Nom du joueur"
                            className="me-2"
                            aria-label="Search"
                            onChange={handleChangeName}
                        />
                        <Button variant="outline-success" onClick={newPlayer}>Ajouter</Button>
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

        </>
    )
}