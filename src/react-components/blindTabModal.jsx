import BlindTab from "./blindTab";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from 'react-redux';

export function BlindTabModal() {


    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const t = useSelector((state) => state.tournamentSteps);

    return(
        <>
            <Button variant="secondary" onClick={handleShow}>Structure de blind</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Structure de blind</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BlindTab steps={t.steps} theme="light"/>
                </Modal.Body>
            </Modal>
        </>
    )
}