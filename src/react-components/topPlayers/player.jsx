export default function Player(props) {

    return (
        <div id="player">
            <h1> #{props.place} </h1>
            <h1> {props.name} </h1>
            <h1> {props.points} Pts </h1>
        </div>
    )
}