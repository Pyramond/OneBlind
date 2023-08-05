import { useState, useEffect } from "react";
import { Dropdown, Button, Form, CloseButton, Modal, Alert } from "react-bootstrap";
import { getDate, getHours, getTimeStamp } from "../utils/date";
import { getAllPlayer } from "../utils/players";
import { getAllModels } from "../utils/models";

export default function CreateTournament() {
  const date = getDate()
  const [blind, setBlind] = useState("Modèle");
  const [players, setPlayers] = useState([]);
  const [tournamentName, setTournamentName] = useState(`Tournoi ${date}`)
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false)
  const [tempPlayer, setTempPlayer] = useState("")
  const [allPLayers, setAllPlayers] = useState([])
  const [initialChips, setInitialChips] = useState(0)
  const [allModels, setAllModels] = useState([])
  const [selectedModel, setSelectedModel] = useState({})

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const closeAlert = () => setShowAlert(false)

  
  const handlePlayers = (selectedItemId) => {
    const selectedPlayer = allPLayers.find(player => player.id === parseInt(selectedItemId));
    if (!players.includes(selectedPlayer)) {
      setPlayers((prevPlayers) => [...prevPlayers, selectedPlayer]);
    } else {
      handleShow()
      setTempPlayer(selectedItem)
    }
  };
  
  const handleBlindSelect = (selectedModelId) => {
    const i = allModels.find(model => model.id === parseInt(selectedModelId))
    setSelectedModel(i)
    setBlind(i.name)
  };
  const removePlayer = (playerToRemove) => { setPlayers((prevPlayers) => prevPlayers.filter((player) => player !== playerToRemove)) };
  const handleChangeName = (event) => { setTournamentName(event.target.value) }
  const handleChangeInitialChips = (event) => { setInitialChips(event.target.value) }


  function create(event) {
    event.preventDefault()


    fetch("http://localhost:8000/tournament/create", {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: tournamentName,
        date: getTimeStamp(),
        blind: {
          "name": selectedModel.name,
          "id": selectedModel.id
        },
        players: players,
        initialChips: parseInt(initialChips)
      })
    })
    .then(res => res.json())
    .then(res => {
    })

    setShowAlert(true)
  }

  useEffect(() => {
      getAllPlayer().then(players => {
        setAllPlayers(players)
      })
  }, [])

  useEffect(() => {
    getAllModels().then(models => {
      setAllModels(models)
    })
  }, [])

  return (
    <div id="createTournament">
      <Form>

        <Alert show={showAlert} variant="primary"><div id="alert"> <p id="alertText">Le tournoi a été créé</p> <CloseButton variant="dark" onClick={closeAlert}/></div> </Alert>

        <h2>Créer un tournoi</h2>

        <Form.Group className="mb-3" id="formGroup">
          <Form.Label id="label">Nom du tournoi: </Form.Label>
          <Form.Control type="text" placeholder="Nom du tournois" data-bs-theme="dark" onChange={handleChangeName} />
        </Form.Group>

        <div id="form-container">

            <Form.Group className="mb-3" id="formGroup">
            <Form.Label id="label">stucture de blind: </Form.Label>
            <Dropdown data-bs-theme="dark" onSelect={handleBlindSelect}>
                <Dropdown.Toggle variant="dark">{blind}</Dropdown.Toggle>

                <Dropdown.Menu>
                {allModels.map((model) => (
                  <Dropdown.Item key={model.id} eventKey={model.id}>{model.name}</Dropdown.Item>
                ))}
                </Dropdown.Menu>
            </Dropdown>
            </Form.Group>

            <Form.Group className="mb-3" id="formGroup">
                <Form.Label id="label">Jetons de départ: </Form.Label>
                <Form.Control type="number" data-bs-theme="dark" onChange={handleChangeInitialChips}></Form.Control>
            </Form.Group>

          </div>

            <Form.Group className="mb-3" id="formGroup">

                <div id="addPlayer">
                    <div id="playerControl">
                    <Form.Label id="label">Liste de joueur:</Form.Label>

                    <Dropdown data-bs-theme="dark" onSelect={handlePlayers}>
                        <Dropdown.Toggle variant="dark">Liste de joueur</Dropdown.Toggle>

                        <Dropdown.Menu>
                            {allPLayers.map((player, index) => (
                              <Dropdown.Item key={index} eventKey={player.id}>{player.name}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    </div>

                    <ul id="playerList">
                    {players.map((player, index) => (
                        <li key={index} id="players">{player.name} <CloseButton variant="white" onClick={() => removePlayer(player)}/> </li>
                    ))}
                    </ul>
                </div>

            </Form.Group>

        <Button variant="primary" type="" onClick={create}>Créer</Button>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{tempPlayer} a déjà été ajouté.e</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}> ingorer </Button>
          <Button variant="danger" onClick={() => {removePlayer(tempPlayer); handleClose()}}> Supprimer {tempPlayer} </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}