import NavigationBar from '../react-components/navbar'
import { useParams } from 'react-router-dom';

export default function TournamentPage() {

    const { id } = useParams();

  return (
    <>
      <NavigationBar />
        <h2>{id}</h2>
    </>
  )
}
