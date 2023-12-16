import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/dashboard"
import Classement from "./pages/classement"
import History from "./pages/history"
import PageNotFound from "./pages/404"
import Blind from "./pages/blind"
import TournamentPage from "./pages/tournamentPage"
import AllProfiles from "./pages/allProfiles"
import Profile from "./pages/profile"
import Settings from "./pages/settings"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/classement" element={<Classement />} />
        <Route path="/history" element={<History />} />
        <Route path="/blind/:id" element={<Blind />} />
        <Route path="/tournament/:id" element={<TournamentPage />} />
        <Route path="/profiles" element={<AllProfiles />} />
        <Route path="/profiles/:id" element={<Profile />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
