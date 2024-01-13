import { Button } from "react-bootstrap"
import { IconDownload } from "@tabler/icons-react"


export default function DownloadDb() {

    function download() {
        window.location.assign(`${import.meta.env.VITE_BACKEND_SERVER}/static/database.db`)
    }

    return <Button variant="primary" onClick={download} id="navbarButtons">Télécharger la base de donnée <IconDownload /> </Button>
}