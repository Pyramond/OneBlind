import LoginSpotify from "../../spotify/loginSpotify"
import { Form, FormGroup } from "react-bootstrap"

export default function NavbarLoginSpotify() {

    return (
        <>
            <Form className="d-flex">
                <FormGroup className='mb-5'>
                    <Form.Label>Se connecter à Spotify</Form.Label>
                    <div id="formControl">
                        <LoginSpotify path="/" />
                    </div>
                </FormGroup>
            </Form>
        </>
    )
}