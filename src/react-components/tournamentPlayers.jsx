import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { removePlayer } from '../redux/slices/tournamentPage/players';


export function TournamentPlayers(props) {

    const t = useSelector((state) => state.tournamentPlayers);
    const dispatch = useDispatch()
    
    const [isWinner, setIsWinner] = useState(false)

    useEffect(() => {
        console.log(t.value)
    },)

    function eliminatePlayer(id) {

        fetch("http://localhost:8000/tournament/eliminate", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                place: Object.keys(t.value).length,
                tournament: parseInt(props.id)
            })
          })
          .then(res => res.json())
          .then(res => {
            dispatch(removePlayer(id))

            if(Object.keys(t.value).length == 1) {
                setIsWinner(true)
            }
          })
    }

    return (
        <>
            <div id="tournamentPlayersContainer">
                {t.value.map((player, index) => (
                    <p id="player" key={index}>{player.name} {isWinner ? <p>Gagnant</p> : <Button variant='danger' onClick={() => { eliminatePlayer(player.id) }}>Eliminer</Button>} </p>
                ))}
            </div>
        </>
    )
}