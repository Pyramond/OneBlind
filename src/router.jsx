import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./layout";
import Dashboard from "./pages/dashboard"
import Classement from "./pages/classement"
import History from "./pages/history"
import PageNotFound from "./pages/404"
import Blind from "./pages/blind"
import TournamentPage from "./pages/tournamentPage"
import AllProfiles from "./pages/allProfiles"
import Profile from "./pages/profile"
import Settings from "./pages/settings"


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <PageNotFound />,
        children: [
            {
                path: "/",
                element: <Dashboard />
            },
            {
                path: "settings",
                element: <Settings />
            },
            {
                path: "/classement",
                element: <Classement />
            },
            {
                path: "/history",
                element: <History />
            },
            {
                path: "/blind/:id",
                element: <Blind />
            },
            {
                path: "/tournament/:id",
                element: <TournamentPage />
            },
            {
                path: "/profiles",
                element: <AllProfiles />
            },
            {
                path: "/profiles/:id",
                element: <Profile />
            }
        ]
    }
])

export function Router() {
    return <RouterProvider router={router} />
}