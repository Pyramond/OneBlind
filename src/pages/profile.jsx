import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPlayerById } from "../utils/players";
import { Card, Table } from "react-bootstrap";
import { convertTimeStamp } from "../utils/date";
import { getTournamentPlayer } from "../utils/tournaments";


export default function Profile(props) {

    const { id } = useParams();
    const [playerData, setPlayerData] = useState({})
    const [tournaments, setTournaments] = useState([])
    const [top1, setTop1] = useState(0)
    const [top2, setTop2] = useState(0)
    const [top3, setTop3] = useState(0)
    const [position, setPosition] = useState([])
    const [nbTournament, setNbTournament] = useState(0)

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
    }, [])

    return(
        <>
            <h2 id="title">Profil de {playerData.name}:</h2>

            <div id="profileContainer">
                <Card style={{ width: "28rem"}} bg="dark" id="profileCard">
                    <Card.Body>
                        <Card.Title style={{ color: "white" }}>Informations sur {playerData.name} </Card.Title>

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
        </>
    )
}