import { TournamentPlayers } from "./tournamentPlayers"
import { RecaveButton } from "./recaveButton"
import { BlindTabModal } from "./blindTabModal"

export default function Other(props) {
    return(
        <>
            <div id="otherContainer">
                <TournamentPlayers id={props.id}/>
                <RecaveButton />
                <BlindTabModal />
            </div>
        </>
    )
}