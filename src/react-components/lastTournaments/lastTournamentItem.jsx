export function LastTournamentItem(props) {
    return(
        <div id="lastTournamentItem">
            <h1> {props.name.length >= 13 ? props.name.substring(0, 13) + "..." : props.name} </h1>
            <h1> {props.date} </h1>
        </div>
    )
}