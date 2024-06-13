import { HoverCard } from "@mantine/core"


export function LastTournamentItem(props) {
    return(
        <div id="lastTournamentItem">
            <HoverCard>
                <HoverCard.Target>
                    <h1> {props.name.length >= 13 ? props.name.substring(0, 13) + "..." : props.name} </h1>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                    {props.name}
                </HoverCard.Dropdown>
            </HoverCard>
            <h1> {props.date} </h1>
        </div>
    )
}