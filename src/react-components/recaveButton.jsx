import { useSelector, useDispatch } from "react-redux"
import { recave } from "../redux/slices/tournamentPage/info";
import { Button } from "@mantine/core"


export function RecaveButton() {

    const t = useSelector((state) => state.tournamentInfo);
    const tournamentPlayer = useSelector((state) => state.tournamentPlayers);
    const dispatch = useDispatch()

    function addRecave() {
        dispatch(recave(Object.keys(tournamentPlayer.value).length))
    }


    return <Button variant="default" id="recaveButton" onClick={addRecave}> {t.nbRecave != 0 ? t.nbRecave : null} {t.nbRecave >= 2 ? "Recaves" : "Recave"} </Button>
}