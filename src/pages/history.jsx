import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { getAllTournaments } from '../utils/tournaments'
import { convertTimeStamp } from '../utils/date'

export default function history() {

    const [allTournaments, setAllTournaments] = useState([])

    useEffect(() => {
        async function fetchData(){
            const tournaments = await getAllTournaments()
            tournaments.sort((a, b) => b.date - a.date)
            setAllTournaments(tournaments)
        }
        fetchData()
    }, [])

    return(
        <>
            <div id="historyContainer">
                <h2 id="title">Historique des parties: </h2>

                <Table striped bordered hover variant='dark'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nom</th>
                            <th>Date</th>
                            <th>Modèle de blind</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTournaments.map((tournament, index) => (
                            <tr key={index}>
                                <td>{tournament.id}</td>
                                <td>{tournament.name}</td>
                                <td>{convertTimeStamp(tournament.date)}</td>
                                <td>{tournament.blindName}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}