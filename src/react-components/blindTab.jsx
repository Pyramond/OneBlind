import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function BlindTab(props) {

    const [steps, setSteps] = useState([])

    useEffect(() => {
        fetch("http://localhost:8000/blind/findById", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: props.id
            })
          })
          .then(res => res.json())
          .then(res => {
            setSteps(res.steps)
          })
    }, [])

    return (
        <>
            <div id="blindTabContainer">
            <Table striped bordered hover variant='dark'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>time</th>
                        <th>Small Blind</th>
                        <th>Big Blind</th>
                    </tr>
                </thead>
                <tbody>
                    {steps.map((step, index) => (
                        <tr key={index}>
                            <td>{step.order}</td>
                            <td>{step.type}</td>
                            <td>{step.time} Minutes</td>
                            <td>{step.sb}</td>
                            <td>{step.sb * 2}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
        </>
    )
}