import { useSelector, useDispatch } from "react-redux"
import { Button } from "react-bootstrap";
import { recave } from "../redux/slices/tournamentPage/info";

export default function AvStack() {

    const t = useSelector((state) => state.tournamentInfo);
    const tournamentPlayer = useSelector((state) => state.tournamentPlayers);
    const dispatch = useDispatch()

    function addRecave() {
        dispatch(recave(Object.keys(tournamentPlayer.value).length))
    }

    return (
        <>
            <div id="avStackContainer">
                <div id="topAvStackContainer">
                    <h2>Tapis moyen: </h2>
                    <Button variant="secondary" id="recaveButton" onClick={addRecave}>Recave</Button>
                </div>
                <div id="avStackNumberContainer">
                    <h1 id="avStackNumber">{parseInt(t.avStack)}</h1>
                </div>
            </div>
        </>
    )
}