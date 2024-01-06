import { FormGroup, Form } from 'react-bootstrap';
import { useState } from 'react';


export default function ChangeVolume() {

    const [volume, setVolume] = useState(window.localStorage.getItem("volume"))

    function handleChangeRange(event) {
        window.localStorage.setItem("volume", event.target.value)
        setVolume(event.target.value)
    }

    return (
        <>
            <Form className="d-flex">
                <FormGroup className='mb-5'>
                        <Form.Label>Changer le volume ({parseInt(volume * 100)})</Form.Label>
                        <div id="volumeRange">
                            <p>0</p>
                            <Form.Range 
                            id="slider"
                            step={0.01}
                            min={0}
                            max={1}
                            onChange={handleChangeRange}
                            value={volume}
                            />
                            <p>100</p>
                        </div>
                </FormGroup>
            </Form>
        </>
    )
}