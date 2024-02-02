import { useState } from 'react';
// import { FormGroup, Form, Button, Modal, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { change } from '../../../redux/slices/reload';
import { Menu, Button, Stack, Title } from "@mantine/core"
import { notifications } from '@mantine/notifications';


export default function SelectSecondaryComponent() {

    const secondaryList = ["TournamentInfo", "SpotifyPlayerState"]
    const [selectedComponent, setSelectedComponent] = useState(window.localStorage.getItem("secondary-component"))
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()

    function setComponent(component) {
        setSelectedComponent(component)
        window.localStorage.setItem("secondary-component", component)
        dispatch(change())
        notifications.show({
            title: "Composant secondaire",
            message: `Modifié avec succès pour ${component}`
        })
    }

    return (
        <Stack>

            <Title order={4}> Composant secondaire: </Title>

            <Menu>
                <Menu.Target>
                    <Button variant="default" > {selectedComponent} </Button>
                </Menu.Target>

                <Menu.Dropdown>
                    {secondaryList.map((component, index) => (
                        <Menu.Item key={index} onClick={() => { setComponent(component) }}> {component} </Menu.Item>
                    ))}
                </Menu.Dropdown>
            </Menu>
        </Stack>
    )
}