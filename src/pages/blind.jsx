import NavigationBar from '../react-components/navbar/navbar'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BlindTab from '../react-components/blindTab';
import { getModelById } from '../utils/models';

function Blind() {

    const { id } = useParams();
    const [name, setName] = useState("")
    const [steps, setSteps] = useState([])

    useEffect(() => {
        async function fetchData() {
          const model = await getModelById(id)
          setName(model.name)
          setSteps(model.steps)
        }
        fetchData()
    }, [])

  return (
    <>
      <NavigationBar />

      <h2>Détails du modèle: <span id="modelName">{name}</span></h2>
      <BlindTab id={id} steps={steps} theme="dark" />
      
    </>
  )
}

export default Blind
