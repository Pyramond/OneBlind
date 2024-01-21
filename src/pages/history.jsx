import { useEffect, useState } from 'react'
// import { Table } from 'react-bootstrap'
import { getAllTournaments } from '../utils/tournaments'
import { convertTimeStamp } from '../utils/date'
import { Stack, Table, Title } from '@mantine/core'

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
        <Stack>
            <Title order={1}>Historique des parties</Title>

            <Table verticalSpacing="sm" highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Id</Table.Th>
                        <Table.Th>Nom</Table.Th>
                        <Table.Th>Date</Table.Th>
                        <Table.Th>Modèle de blind</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {allTournaments.map((tournament, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>{tournament.id}</Table.Td>
                            <Table.Td>{tournament.name}</Table.Td>
                            <Table.Td>{convertTimeStamp(tournament.date)}</Table.Td>
                            <Table.Td>{tournament.blindName}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
    	    </Table>
        </Stack>
    )
}