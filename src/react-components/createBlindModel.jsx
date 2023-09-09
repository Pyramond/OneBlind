import { useState, useEffect } from "react";
import { Button, Form, Alert, Modal, CloseButton } from "react-bootstrap";
import { getDate } from "../utils/date";
import { getAllModels } from "../utils/models";

export default function CreateBlindModel() {

    const date = getDate()
    const [name, setName] = useState(`Modèle du ${date}`)
    const [steps, setSteps] = useState([])
    const [SBlind, setSBlind] = useState(0)
    const [time, setTime] = useState(0)
    const [pauseTime, setPauseTime] = useState(0)
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [order, setOrder] = useState(1)
    const [showDel, setShowDel] = useState(false)
    const [allModels, setAllModels] = useState([])

    function handleChangeTime(event) { setTime(event.target.value) }
    function handleChangeSBlind(event) { setSBlind(event.target.value) }
    function handleChangeName(event) { setName(event.target.value) }
    function handleChangePauseTime(event) { setPauseTime(event.target.value) }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const closeAlert = () => setShowAlert(false)
    const closeErrorAlert = () => setShowErrorAlert(false)

    const handleCloseDel = () => setShowDel(false);
    const handleShowDel = () => setShowDel(true);
 
    function addStep() {
        const step = {
            "order": order,
            "time": time,
            "type": "game",
            "SBlind": SBlind
        }
        setSteps((prevSteps) => [...prevSteps, step]);
        setOrder(order + 1)
    }

    function addPause() {
        const pause = {
            "order": order,
            "time": pauseTime,
            "type": "pause",
            "SBlind": 0
        }
        setSteps((prevSteps) => [...prevSteps, pause]);
        setOrder(order + 1)
    }

    const removeStep = (stepToRemove) => {
        setSteps((prevSteps) => prevSteps.filter((step) => step !== stepToRemove)) 
        setOrder(order - 1)
    };

    function createModel(event) {
        event.preventDefault()

        if(steps.length === 0) {
            setShowErrorAlert(true)
            setShowAlert(false)
        } else {
            fetch("http://localhost:8000/addBlindModel", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    steps: steps
                })
              })
              .then(res => res.json())
              .then(res => {
                    setShowAlert(true)
                    setShowErrorAlert(false)
              })
        }
    }

    function deleteModel(modelToDelete) {
        fetch("http://localhost:8000/deleteModel", {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: modelToDelete.name,
                id: modelToDelete.id
            })
          })
          .then(res => res.json())
          .then(res => {
                setAllModels((prevAllModels) => prevAllModels.filter((model) => model !== modelToDelete))
          })
    }

    useEffect(() => {
        getAllModels().then(models => {
            setAllModels(models);
        })
      }, []);

    
    return (
        <>
            <div id="createBlindModel">
                <Form>
                    <Alert show={showAlert} variant="primary"><div id="alert"> <p id="alertText">Le modèle a été créer.</p> <CloseButton variant="dark" onClick={closeAlert}/></div> </Alert>
                    <Alert show={showErrorAlert} variant="danger"><div id="alert"> <p id="alertText">Certains champs obligatoires n'ont pas été remplis.</p> <CloseButton variant="dark" onClick={closeErrorAlert}/></div> </Alert>

                    <h2>Créer une structure de blind</h2>

                    <Form.Group className="mb-3" id="formGroup">
                        <Form.Label id="label">Nom de la structure: </Form.Label>
                        <Form.Control type="text" placeholder="Nom de la structure" data-bs-theme="dark" onChange={handleChangeName} />
                    </Form.Group>

                    
                    <Form.Group className="mb-3" id="formGroup">
                        <Form.Label id="label">Ajouter une étape: </Form.Label>
                        <div id="addStep">
                            <Form.Control type="number" placeholder="Temps (en minutes)" data-bs-theme="dark" id="formControl2" onChange={handleChangeTime} />
                            <Form.Control type="number" placeholder="Petite Blind" data-bs-theme="dark" id="formControl" onChange={handleChangeSBlind} />
                            <Button variant="dark" id="addButton" onClick={addStep} >Ajouter</Button>
                        </div>
                        <Button variant="info" id="addPause" onClick={handleShow} >Ajouter une pause</Button>
                    </Form.Group>

                    <h4>Étapes:</h4>
                    <ol>
                        {steps.map((step, index) => (
                            <li key={index} id="step" >{step.time}' | {step.type} | {step.SBlind} | {step.SBlind * 2} <CloseButton variant="white" onClick={() => removeStep(step)}/> </li>
                        ))}
                    </ol>
             
                    
                    <Button id="formButtons" variant="primary" type="" onClick={createModel}>Sauvegarder</Button>
                    <Button id="formButtons" variant="secondary" onClick={handleShowDel}>Options</Button>

                </Form>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ajouter une pause</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control type="number" placeholder="Temps (en minutes)" onChange={handleChangePauseTime} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}> Annuler </Button>
                        <Button variant="primary" onClick={() => { addPause() ; handleClose() }}> Ajouter</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showDel} onHide={handleCloseDel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Options</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                            {allModels.map((model, index) => (
                                <li key={index} className="allModels">{model.name} <Button variant="outline-secondary" href={`/blind/${model.id}`}>Détails</Button> <Button variant="outline-danger" onClick={() => { deleteModel(model) }}>Supprimer</Button></li>
                            ))}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDel}> Annuler </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}