import { useEffect, useState } from "react"
import { getAllTournaments } from "../../utils/tournaments"
import { LastTournamentItem } from "./lastTournamentItem"
import { convertTimeStampDate } from "../../utils/date"


export function LastTournaments() {

    const [allTournaments, setAllTournaments] = useState([])

    useEffect(() => {
        async function fetchData(){
            const tournaments = await getAllTournaments()
            tournaments.sort((a, b) => b.date - a.date)
            setAllTournaments(tournaments.slice(0, 3))
        }
        fetchData()
    }, [])

    return (
        <div id="lastTournaments">
            {allTournaments.map((tournament, index) => (
                <LastTournamentItem name={tournament.name} date={convertTimeStampDate(tournament.date) } />
            ))}
        </div>
    )
}