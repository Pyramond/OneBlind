import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { getPlayerById } from "../utils/players";
import { Card, Table, Modal, Button, Toast, ToastContainer } from "react-bootstrap";
import { convertTimeStamp } from "../utils/date";
import { getTournamentPlayer } from "../utils/tournaments";
import { getAllAvatar, updateAvatar } from "../utils/players";
import { useDispatch, useSelector } from 'react-redux';
import { change } from "../redux/slices/reload";


export default function Profile(props) {

    const { id } = useParams();
    const [playerData, setPlayerData] = useState({})
    const [tournaments, setTournaments] = useState([])
    const [top1, setTop1] = useState(0)
    const [top2, setTop2] = useState(0)
    const [top3, setTop3] = useState(0)
    const [position, setPosition] = useState([])
    const [nbTournament, setNbTournament] = useState(0)
    const [allAvatar, setAllAvatar] = useState([])

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showToast, setShowToast] = useState(false)

    const dispatch = useDispatch()
    const t = useSelector((state) => state.reload);
    const effectDependency = useMemo(() => ({ value: t.value, random: Math.random() }), [t.value]);

    useEffect(() => {
        async function fetchData() {
            const data = await getPlayerById(id)
            setPlayerData(data)
        }

        async function fetchTournament() {
            const tournaments = await getTournamentPlayer(id)
            tournaments.sort((a, b) => b.date - a.date)
            setTournaments(tournaments)

            tournaments.forEach(element => {

                if(element.place != 0) {
                    setPosition((prevPosition) => [...prevPosition, element.place])
                    setNbTournament(prevNbTournament => prevNbTournament + 1);
                }
                if(element.place == 1) {
                    setTop1(top1 => top1 + 1)
                } else if(element.place == 2) {
                    setTop2(top2 => top2 + 1)
                } else if(element.place == 3) {
                    setTop3(top3 => top3 + 1)
                }
            });
        }

        fetchData()
        fetchTournament()
    }, [effectDependency])

    async function avatarModal() {
        const data = await getAllAvatar()
        setAllAvatar(data)
        handleShow()
    }

    async function selectAvatar(avatar) {
        const response = await updateAvatar(playerData.id, avatar)
        dispatch(change())
        handleClose()
        setShowToast(true)
    }

    return(
        <>
            <h2 id="title">Profil de {playerData.name}</h2>

            <div id="profileContainer">
                <Card style={{ width: "28rem"}} bg="dark" id="profileCard">
                    <Card.Body>
                        <Card.Title style={{ color: "white" }}>
                            <img src={`${import.meta.env.VITE_BACKEND_SERVER}/static/avatars/avatar${playerData.avatar}.png`} id="pp" onClick={avatarModal} />
                            Informations sur {playerData.name}
                        </Card.Title>

                        <div id="infosContainer">
                            <Card.Text>Id: {playerData.id}</Card.Text>
                            <Card.Text>Date de création: {convertTimeStamp(parseInt(playerData.date))}</Card.Text>
                            <Card.Text>Points: {playerData.points}</Card.Text>
                        </div>
                    </Card.Body>
                </Card>

                <Card style={{ width: "28rem"}} bg="dark" id="profileCard">
                    <Card.Body>
                        <Card.Title style={{ color: "white" }}>Statistiques</Card.Title>

                        <div id="infosContainer">
                            <Card.Text>Nombre de tournois: {nbTournament}</Card.Text>
                            <div id="statsProfile">
                                <div id="tops">
                                    <Card.Text>top #1: {(Math.round((top1 / nbTournament) * 100 * 100) / 100).toFixed(2)}%</Card.Text>
                                    <Card.Text>top #2: {(Math.round((top2 / nbTournament) * 100 * 100) / 100).toFixed(2)}%</Card.Text>
                                    <Card.Text>top #3: {(Math.round((top3 / nbTournament) * 100 * 100) / 100).toFixed(2)}%</Card.Text>
                                </div>
                                <div id="OtherStats">
                                    <Card.Text>Podium: {(Math.round(((top1 + top2 + top3) / nbTournament) * 100 * 100) / 100).toFixed(2)}%</Card.Text>
                                    <Card.Text>Meilleure position: {Math.min(...position)}</Card.Text>
                                    <Card.Text>Pire position: {Math.max(...position)}</Card.Text>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>


            <div id="tournamentsPlayer">
                <h3>Historique des tournois de {playerData.name}:</h3>
                <Table striped bordered hover variant='dark' id="tournamentsPlayerTable">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Date</th>
                            <th>Place</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tournaments.map((tournament, index) => (
                            <tr key={index}>
                                <td>{tournament.name}</td>
                                <td>{convertTimeStamp(parseInt(tournament.date))}</td>
                                <td>{tournament.place == 0 ? "En attente" : tournament.place}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Liste des avatars</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id="allPPContainer">
                        {allAvatar.map((avatar, index) => (
                            <div id="PPContainer">
                                <img src={`${import.meta.env.VITE_BACKEND_SERVER}/static/avatars/avatar${index+1}.png`} id="allPP" />
                                <Button id="selectButton" onClick={() => { selectAvatar(index+1) }}>Choisir</Button>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
            </Modal>

            <ToastContainer position="bottom-end">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide data-bs-theme="dark">
                    <Toast.Header>
                        <strong className="me-auto">Avatar</strong>
                    </Toast.Header>
                    <Toast.Body id="avatarBody">Avatar modifié avec succès</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}