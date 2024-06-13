import AddPlayer from "../react-components/addPlayer"
import AllPlayers from "../react-components/allPlayers"
import { Flex, Group } from "@mantine/core"


export default function PlayerManagement() {
    return (
        <>
            <Flex
                // justify="space-between"
                direction="row"
            >
                <AddPlayer />
                <AllPlayers />
            </Flex>
        </>
    )
}