import { useSelector } from "react-redux"
import { ScrollArea } from "@mantine/core";
import PlayerItem from "./playerItem";


export default function PlayerClassement() {

    const recapInfos = useSelector((state) => state.recap);

    return <ScrollArea id="playerClassment" h="48em">

            {recapInfos.players.map((player, index) => (
                <PlayerItem name={player.name} place={player.place} id={player.Pid} key={index}/>
            ))}

        </ScrollArea> 
    
}