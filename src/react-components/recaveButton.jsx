import { useSelector, useDispatch } from "react-redux"
import { Button } from "react-bootstrap";
import { recave } from "../redux/slices/tournamentPage/info";


export function RecaveButton() {

    const t = useSelector((state) => state.tournamentInfo);
    const tournamentPlayer = useSelector((state) => state.tournamentPlayers);
    const dispatch = useDispatch()

    function addRecave() {
        dispatch(recave(Object.keys(tournamentPlayer.value).length))
    }


    return <Button variant="secondary" id="recaveButton" onClick={addRecave}>Recave</Button>
}