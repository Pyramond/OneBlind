import NavigationBar from '../react-components/navbar/navbar'
import { useState, useEffect } from 'react'
import { getAllPlayer } from '../utils/players'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


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
                      <Link to={`/profiles/${player.id}`}> <Button variant='primary'>Voir le profil</Button> </Link>
                    </div>
                </Card.Body>
              </Card>

            ))}

          </div>
        </>
      )
}