import { Button, Modal } from "react-bootstrap"
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux"


export function TablePlace() {

    const t = useSelector((state) => state.tournamentPlayers);
    const [playerList, setPlayerList] = useState([])
    const [show, setShow] = useState(false)
    const [firstPlace, setFirstPlace] = useState(false)

    function handleShow() { setShow(true) }
    function handleClose() { setShow(false) }

    function shufflePlayers(players) {
        let shuffledArray = [...players];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
      }

    function setPlace() {
        if(firstPlace === false) {
            setPlayerList(shufflePlayers(t.value))
            setFirstPlace(true)
        }
    }

    function replace() {
        const intervalId = setInterval(() => {
            setPlayerList(shufflePlayers(t.value));
        }, 50);
    
        setTimeout(() => {
            clearInterval(intervalId);
        }, 500);
    }

    useEffect(() => (
        setPlayerList(shufflePlayers(t.value))
    ), [])


    return (
        <>
            <Button variant="secondary" onClick={() => { handleShow() ; setPlace() }}>Table</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Placement des joueurs sur la table</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ol>
                        {playerList.map((player, index) => (
                            <li key={index}>{player.name}</li>
                        ))}
                    </ol>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { replace() }}>Replacer</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
