import { useState, useEffect } from "react"
import Tournament from "./tournament"
import { getAllTournaments } from "../utils/tournaments"

export default function AllTournament() {

    const [allTournaments, setAllTournaments] = useState([])

    useEffect(() => {
        getAllTournaments().then(tournaments => {
            setAllTournaments(tournaments)
        })
    }, [])

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