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
            eliminatePlayer(t.value[0].id, false)
        }
    }, [Object.keys(t.value).length])

    function eliminatePlayer(id, remove) {

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
            if(remove) dispatch(removePlayer(id))
          })
    }

    return (
        <>
            <div id="tournamentPlayersContainer">
                {t.value.map((player, index) => (
                    <p id="player" key={index}>{player.name} {isWinner ? "Gagnant" : <Button variant='danger' onClick={() => { eliminatePlayer(player.id, true) }}>Eliminer</Button>} </p>
                ))}
            </div>
        </>
    )
}