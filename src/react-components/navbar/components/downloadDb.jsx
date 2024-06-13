import { Button } from "@mantine/core"


export default function DownloadDb() {

    function download() {
        window.location.assign(`${import.meta.env.VITE_BACKEND_SERVER}/static/database.db`)
    }

    return <Button variant="light" onClick={download}>Télécharger la base de données </Button>
}