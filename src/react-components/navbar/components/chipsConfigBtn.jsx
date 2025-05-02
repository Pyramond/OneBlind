import { Button } from "@mantine/core"
import { useNavigate } from "react-router-dom"


export default function ChipsConfigBtn() {

    const navigate = useNavigate()

    return <Button variant="light" onClick={() => navigate("/config/chips") }>Configurer jetons</Button>
}