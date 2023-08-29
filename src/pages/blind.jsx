import NavigationBar from '../react-components/navbar'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BlindTab from '../react-components/blindTab';

function Blind() {

    const { id } = useParams();
    const [name, setName] = useState("")

    useEffect(() => {
        fetch("http://localhost:8000/blind/findById", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
          })
          .then(res => res.json())
          .then(res => {
            setName(res.name)
          })
    }, [])

  return (
    <>
      <NavigationBar />

      <h2>Détails du modèle: <span id="modelName">{name}</span></h2>
      <BlindTab id={id} theme="dark" />
      
    </>
  )
}

export default Blind
