import { getAllPlayer } from '../utils/players'
import { useEffect, useState } from 'react'
import { Title, Table, Stack } from '@mantine/core'
import { useNavigate } from 'react-router-dom'


function Classement() {

  const [allPlayers, setAllPlayers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const players = await getAllPlayer()
      players.sort((a, b) => b.points - a.points)
      setAllPlayers(players)
    }
    fetchData()

    
  }, [])

  return (
    <Stack>
		<Title order={1}>Classement</Title>
    	<Table verticalSpacing="sm" highlightOnHover>
	  		<Table.Thead>
				<Table.Tr>
					<Table.Th>#</Table.Th>
					<Table.Th>Nom</Table.Th>
					<Table.Th>Points</Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>
	  			{allPlayers.map((player, index) => (
					<Table.Tr key={index} onClick={() => { navigate(`/profiles/${player.id}`) }} id="classementLine">
						<Table.Td>{index + 1}</Table.Td>
						<Table.Td>{player.name}</Table.Td>
						<Table.Td>{player.points}</Table.Td>
					</Table.Tr>
				))}
			</Table.Tbody>
    	</Table>
    </Stack>
  )
}

export default Classement
