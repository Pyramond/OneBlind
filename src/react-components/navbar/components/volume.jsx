import { FormGroup, Form } from 'react-bootstrap';
import { useState } from 'react';


export default function ChangeVolume() {

    const [volume, setVolume] = useState(window.localStorage.getItem("volume"))

    function handleChangeRange(event) {
        window.localStorage.setItem("volume", event.target.value)
        setVolume(window.localStorage.getItem("volume"))
    }

    return (
        <>
            <Form className="d-flex">
                <FormGroup className='mb-5'>
                        <Form.Label>Changer le volume ({volume})</Form.Label>
                        <div id="volumeRange">
                            <p>0</p>
                            <Form.Range 
                            id="slider"
                            step={0.01}
                            min={0}
                            max={1}
                            onChange={handleChangeRange}
                            />
                            <p>1</p>
                        </div>
                </FormGroup>
            </Form>
        </>
    )
}