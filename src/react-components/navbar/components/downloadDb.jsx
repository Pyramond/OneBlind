import { Button } from "react-bootstrap"


export default function DownloadDb() {

    function download() {
        window.location.assign(`${import.meta.env.VITE_BACKEND_SERVER}/static/database.db`)
    }

    return <Button variant="primary" onClick={download} id="navbarButtons">Télécharger la base de donnée</Button>
}