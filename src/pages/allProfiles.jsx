import { useState, useEffect } from 'react'
import { getAllPlayer } from '../utils/players'
import { Link } from 'react-router-dom'
import { convertTimeStampDate } from '../utils/date'
import { Button } from '@mantine/core'
import { defineAvatar } from '../utils/avatars'

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
          <h2 id="title">Tout les profils </h2>

          <div id="allPlayersContainer">

            {players.map((player, index) => (

              <div id="playerCard" key={index}>

                <div id="topCard">
                <img src={defineAvatar(player.name, player.avatar, player.avatarColor, player.id)} id="pp" />
                  <div id='topInfo'>
                    <p id="pseudo">{player.name}</p>
                    <p id="points">{player.points} points</p>
                  </div>
                </div>

                <div id="bottomCard">
                    <p> {convertTimeStampDate(player.date)} </p>
                    <Link to={`/profiles/${player.id}`}> <Button variant='primary'>Voir le profil</Button> </Link>
                </div>

              </div>

            ))}

          </div>
        </>
      )
}