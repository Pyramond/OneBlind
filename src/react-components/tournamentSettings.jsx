import { Modal, Button, SimpleGrid } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import ChangeVolume from "./navbar/components/volume"
import SelectSecondaryComponent from "./navbar/components/secondaryComponent"
import LoginSpotify from "./spotify/loginSpotify"


export default function TournamentSettings() {
    

	const [opened, {toggle: modal }] = useDisclosure(false)

	return (
        <>
        	<Button variant="default" onClick={modal}>Paramètres</Button>


			<Modal opened={opened} onClose={modal} size="xl" title="Paramètres">
				<SimpleGrid cols={2}>
					<ChangeVolume />
					<SelectSecondaryComponent />
					<LoginSpotify path="/" button={true} />
				</SimpleGrid>
			</Modal>
        </>
    )
}