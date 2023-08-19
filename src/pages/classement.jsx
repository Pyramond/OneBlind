import NavigationBar from '../react-components/navbar'
import { getAllPlayer } from '../utils/players'
import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

function Classement() {

  const [allPlayers, setAllPlayers] = useState([])

  useEffect(() => {
    async function fetchData() {
      const players = await getAllPlayer()
      players.sort((a, b) => b.points - a.points)
      setAllPlayers(players)

      
    }
    fetchData()
  }, [])

  return (
    <>
      <NavigationBar />
      <div id="classementContainer">
        <h2 id="title">Classement des joueurs:</h2>

        <Table striped bordered hover variant='dark'>
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Nom</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
              {allPlayers.map((player, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{player.id}</td>
                  <td>{player.name}</td>
                  <td>{player.points}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default Classement
