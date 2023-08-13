import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { removePlayer } from '../redux/slices/tournamentPage/players';
import { updateAvStack } from '../redux/slices/tournamentPage/info';


export function TournamentPlayers(props) {

    const t = useSelector((state) => state.tournamentPlayers);
    const dispatch = useDispatch()
    
    const [isWinner, setIsWinner] = useState(false)

    useEffect(() => {
        dispatch(updateAvStack(Object.keys(t.value).length))

        if(Object.keys(t.value).length == 1) {
            setIsWinner(true)
        }
    }, [Object.keys(t.value).length])

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