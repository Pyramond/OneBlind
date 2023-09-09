import { useEffect, useState, useMemo } from 'react';
import Tournament from "./tournament"
import { getAllCurrentTournaments } from "../utils/tournaments"
import { useSelector } from 'react-redux';
import { change } from "../redux/slices/reload";


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
                <h2 id="allTournamentsTitle">Tournois: </h2>

                <div id="tournamentsCards">
                    {allTournaments.map((tournament, index) => (
                        <Tournament key={index} tournament={tournament} />
                    ))}
                </div>
            </div>
        </>
    )
}