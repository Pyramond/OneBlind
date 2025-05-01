import { useSelector } from "react-redux"
import { NumberFormatter } from '@mantine/core';


export default function AvStack() {

    const t = useSelector((state) => state.tournamentInfo);

    return (

        <div id="avStackNumberContainer">
            <h1 id="avStackNumber"> <NumberFormatter value={parseInt(t.avStack)} thousandSeparator=" " /> </h1>
        </div>

    )
}