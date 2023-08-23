import NavigationBar from "../react-components/navbar";
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

    useEffect(() => {
        async function fetchData() {
            const data = await getPlayerById(id)
            setPlayerData(data)
        }

        async function fetchTournament() {
            const tournaments = await getTournamentPlayer(id)
            tournaments.sort((a, b) => b.date - a.date)
            setTournaments(tournaments)
        }

        fetchData()
        fetchTournament()
    }, [])

    return(
        <>
            <NavigationBar />
            <h2 id="title">Profil de {playerData.name}:</h2>

            <Card style={{ width: "28rem"}} bg="dark" id="profileCard">
                <Card.Body>
                    <Card.Title style={{ color: "white" }}>Informations sur {playerData.name}: </Card.Title>

                    <div id="infosContainer">
                        <Card.Text>Id: {playerData.id}</Card.Text>
                        <Card.Text>Date de création: {convertTimeStamp(parseInt(playerData.date))}</Card.Text>
                        <Card.Text>Points: {playerData.points}</Card.Text>
                    </div>
                </Card.Body>
            </Card>


            <div id="tournamentsPlayer">
                <h3>Historique de tournois de {playerData.name}:</h3>
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
                                <td>{tournament.place}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}