import { useEffect, useState, useMemo } from 'react';
import Tournament from "../react-components/tournament"
import { getAllCurrentTournaments } from "../utils/tournaments"
import { useSelector } from 'react-redux';
import { Title, Text } from '@mantine/core';
import { Link } from 'react-router-dom';


export default function AllTournament() {

    const [allTournaments, setAllTournaments] = useState([])
    const t = useSelector((state) => state.reload);
    const effectDependency = useMemo(() => ({ value: t.value, random: Math.random() }), [t.value]);

    useEffect(() => {
        getAllCurrentTournaments().then(tournaments => {
            setAllTournaments(tournaments)
        })
    }, [effectDependency])

    return(
        <>
            <div id="allTournaments">
                <Title order={1} id="allTournamentsTitle">Tournois</Title>

                {allTournaments.length === 0 ? 
                    <Text>Aucun tournoi enregistré <br /> <Link to="/tournament/create">Créer un tournoi</Link> </Text>
                :
                    <div id="tournamentsCards">
                        {allTournaments.map((tournament, index) => (
                            <Tournament key={index} tournament={tournament} />
                        ))}
                    </div>
                }
            </div>
        </>
    )
}