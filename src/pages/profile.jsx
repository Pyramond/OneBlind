import NavigationBar from "../react-components/navbar";
import { useParams } from "react-router-dom";

export default function Profile(props) {

    const { id } = useParams();

    return(
        <>
            <NavigationBar />
            <h1>Profil de {id}</h1>
        </>
    )
}