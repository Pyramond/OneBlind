import { Button, Modal } from "@mantine/core"
import {deletePoints} from "../../../utils/database.js";
import { useDisclosure } from "@mantine/hooks";

export default function Delete_points_db() {

    const [opened, { toggle: openModal }] = useDisclosure(false)

    return (
        <>
            <Button variant="light" onClick={openModal}>réinitialiser les points</Button>

            <Modal opened={opened} onClose={openModal} title="Êtes-vous sûr de vouloir sréinitialiser les points des joueurs ?">
                <Modal.Body>
                    <Button variant={"light"}>Annuler</Button>
                    <Button variant={"danger"} onClick={() => { deletePoints() ; openModal() }}>Supprimer</Button>
                </Modal.Body>
            </Modal>
        </>

    )
}