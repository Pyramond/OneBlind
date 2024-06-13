import BlindTab from "./blindTab";
import { useSelector } from 'react-redux';
import { Button, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";


export function BlindTabModal() {


    const [ opened, { toggle: modal }] = useDisclosure(false)
    const t = useSelector((state) => state.tournamentSteps);

    return(
        <>
            <Button variant="default" onClick={modal}>Structure de blind </Button>

            <Modal opened={opened} onClose={modal} title="Structure de blind">
                <BlindTab steps={t.steps} theme="dark"/>
            </Modal>
        </>
    )
}