import { FormGroup, Form, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';


export default function RemoveTournament() {

    const [tournamentId, setTournamentId] = useState(0)

    const remove = () => {
        fetch("http://localhost:8000/tournament/delete/force", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: tournamentId
            })
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setShow(true)
            })
    }
    const handleChangeTournamentId = (event) => setTournamentId(event.target.value)

    // Confirmation Modal
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    return(
        <>
            <Form className="d-flex">
                <FormGroup className='mb-5'>
                    <Form.Label>Suppression d'un tournois </Form.Label>
                    <div id="formControl">
                        <Form.Control
                            placeholder="Id du tournois"
                            className="me-2"
                            aria-label="Search"
                            type="number"
                            onChange={handleChangeTournamentId}
                        />
                        <Button variant="outline-danger" onClick={remove}>Supprimer</Button>
                    </div>
                </FormGroup>
            </Form>

            {/* Confirmation Modal*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Le tournois {tournamentId} à été supprimé</Modal.Title>
                </Modal.Header>
            </Modal>
        </>
    )
}