import { TournamentPlayers } from "./tournamentPlayers"
import { RecaveButton } from "./recaveButton"
import { BlindTabModal } from "./blindTabModal"
import { TablePlace } from "./tablePlace"
import PlayerSpotify from "./spotify/playerSpotify"
import TournementInfo from "./tournamentInfo"
import { useEffect, useState, useMemo } from "react"
import { useSelector } from 'react-redux';
import { Stack, Group } from "@mantine/core"
import TournamentSettings from "./tournamentSettings"


export default function Other(props) {

    const [secondaryComponent, setSecondaryComponent] = useState(null)
    const t = useSelector((state) => state.reload);
    const effectDependency = useMemo(() => ({ value: t.value, random: Math.random() }), [t.value]);

    useEffect(() => {
        const component = window.localStorage.getItem("secondary-component")
        if (component) {
            switch(component) {
                case "TournamentInfo":
                    setSecondaryComponent(<TournementInfo/>);
                    break;
                case "SpotifyPlayerState":
                    setSecondaryComponent(<PlayerSpotify/>);
                    break;
                default:
                    setSecondaryComponent(<TournementInfo/>)
                    break;
            }
        } else {
            setSecondaryComponent(<TournementInfo/>)
        }
    }, [effectDependency])

    
    return(
        <>
            <div id="otherContainer">
                <Group>
                    <Stack id="otherStack">
                        <Group>
                            <TournamentPlayers id={props.id} />
                            <TournamentSettings />
                        </Group>

                        <Group id="buttonGroupContainer" gap="xs">
                            <BlindTabModal />
                            <RecaveButton />
                            <TablePlace />
                        </Group>
                    </Stack>

                    {secondaryComponent}
                </Group>
            </div>
        </>
    )
}