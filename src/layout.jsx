import { Outlet } from "react-router-dom";
import NavigationBar from "./react-components/navbar/navbar";


export function Layout() {
    return(
        <>
            <NavigationBar />
            <Outlet/>
        </>
    )
}