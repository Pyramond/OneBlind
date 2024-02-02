import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./layout";
import { TournamentLayout } from "./pages/tournament/tournament.layout";
import Dashboard from "./pages/dashboard"
import Classement from "./pages/classement"
import History from "./pages/history"
import PageNotFound from "./pages/404"
import Blind from "./pages/blind"
import TournamentPage from "./pages/tournament/tournamentPage"
import AllProfiles from "./pages/allProfiles"
import Profile from "./pages/profile"
import Settings from "./pages/settings"
import CreateTournament from "./pages/createTournament";
import BlindModelManagement from "./pages/blindModelManagement";
import AllTournament from "./pages/allTournaments";
import PlayerManagement from "./pages/playerManagement";


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
                path: "/profiles",
                element: <AllProfiles />
            },
            {
                path: "/profiles/:id",
                element: <Profile />
            },
            {
                path: "/tournament/create",
                element: <CreateTournament />
            },
            {
                path: "/blind/create",
                element: <BlindModelManagement />
            },
            {
                path: "/tournament/all",
                element: <AllTournament />
            },
            {
                path: "/players",
                element: <PlayerManagement />
            }
        ]
    },
    {
        path: "/tournament/:id",
        element: <TournamentLayout />,
        children: [
            {
                path: "/tournament/:id",
                element: <TournamentPage />
            }
        ]
    }
])

export function Router() {
    return <RouterProvider router={router} />
}