import { useState } from 'react';
import { FormGroup, Form, Button, Modal, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { change } from '../../../redux/slices/reload';


export default function SelectSecondaryComponent() {

    const secondaryList = ["TournamentInfo", "SpotifyPlayerState"]
    const [selectedComponent, setSelectedComponent] = useState(window.localStorage.getItem("secondary-component"))
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleComponent(component) {
        setSelectedComponent(component)
    }

    function setComponent() {
        window.localStorage.setItem("secondary-component", selectedComponent)
        handleShow()
        dispatch(change())
    }

    return (
        <>
            <Form className="d-flex">
                <FormGroup className='mb-5'>
                    <Form.Label>Composant secondaire </Form.Label>
                    <div id="formControl">
                        <Dropdown data-bs-theme="dark" className="me-2" onSelect={handleComponent}>
                            <Dropdown.Toggle variant="dark">{selectedComponent}</Dropdown.Toggle>

                            <Dropdown.Menu>
                            {secondaryList.map((component, index) => (
                                <Dropdown.Item key={index} eventKey={component}>{component}</Dropdown.Item>
                            ))}
                            </Dropdown.Menu>

                        </Dropdown>

                        <Button variant="outline-success" onClick={setComponent}>Appliquer</Button>
                    </div>
                </FormGroup>
            </Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <p id="modalText">Composant séléctionné avec succès</p>
                </Modal.Body>

            </Modal>
        </>
    )
}