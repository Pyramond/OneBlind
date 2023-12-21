import NavigationBar from '../react-components/navbar'
import { useState, useEffect } from 'react'
import { getAllPlayer } from '../utils/players'
import { Card, Button } from 'react-bootstrap'


export default function AllProfiles() {

  const [players, setPlayers] = useState([])

  useEffect(() => {
    async function fetchData() {
      const data = await getAllPlayer();
      setPlayers(data);
    }
    fetchData()
  }, [])

    return (
        <>
          <NavigationBar />
          <h2 id="title">Tout les profils </h2>

          <div id="allPlayersContainer">

            {players.map((player, index) => (

              <Card style={{ width: "18rem"}} bg="dark" key={index} id="playerCard">
                <Card.Body>
                    <div id="playerCardBody">
                      <Card.Title style={{ color: "white" }}>{player.name}</Card.Title>
                      <Button variant='primary' href={`/profiles/${player.id}`}>Voir le profil</Button>
                    </div>
                </Card.Body>
              </Card>

            ))}

          </div>
        </>
      )
}