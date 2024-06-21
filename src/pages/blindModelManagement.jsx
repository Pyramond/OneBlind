import CreateBlindModel from "../react-components/createBlindModel"
import AllBlinds from "../react-components/allBlinds"
import { Flex } from "@mantine/core"


export default function BlindModelManagement() {

    return (
        <>
           <Flex
                direction="row"
                justify={"space-between"}
           >
                <CreateBlindModel />
                <AllBlinds id="allBlindComponent" />
           </Flex>
        </>
    )
}