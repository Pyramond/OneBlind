import { Button } from "@mantine/core"
import {useEffect, useState} from "react";

export default function ToggleOverlayBtn() {

    const [overlay, setOverlay] = useState(false);

    useEffect(() => {
        const overlay = localStorage.getItem("overlay");

        if(!overlay){
            localStorage.setItem("overlay", "false")
            setOverlay(false);
        } else {
            if(overlay === "false") setOverlay(false);
            else setOverlay(true);
        }

    }, []);

    function toggle() {
        localStorage.setItem("overlay", JSON.stringify(!overlay));
        setOverlay(!overlay);
    }

    return (
        <>
            <Button variant={overlay ? "light" : "outline"} onClick={toggle}>Activer Overlay</Button>
        </>
    )
}