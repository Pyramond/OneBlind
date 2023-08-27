import { useSelector, useDispatch } from "react-redux"
import { Button } from "react-bootstrap";
import { recave } from "../redux/slices/tournamentPage/info";

export default function AvStack() {

    const t = useSelector((state) => state.tournamentInfo);

    return (
        <>
            <div id="avStackContainer">
                <div id="topAvStackContainer">
                    <h2>Tapis moyen: </h2>
                </div>
                <div id="avStackNumberContainer">
                    <h1 id="avStackNumber">{parseInt(t.avStack)}</h1>
                </div>
            </div>
        </>
    )
}