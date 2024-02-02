import { Title, Flex, Text, Image } from "@mantine/core"
import LoginSpotify from "../react-components/spotify/loginSpotify"


export default function Dashboard() {

  return (
    <Flex
        mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
    >
        <Title className="title" ta="center" mt={100}>
            <Text className="text" inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'indigo' }}> 
                OneBlind
            </Text>
        </Title>

        <Image src="/images/pokerLuffy.png" alt="pokerLuffy" ta="center" mt={100} style={{maxWidth: "30em", borderRadius: "3em"  }} />

        <LoginSpotify path="/" />
    </Flex>
  )
}