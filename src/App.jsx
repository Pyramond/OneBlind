import { Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Classement from "./pages/classement"
import History from "./pages/history"
import PageNotFound from "./pages/404"
import Blind from "./pages/blind"
import TournamentPage from "./pages/tournamentPage"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classement" element={<Classement />} />
        <Route path="/history" element={<History />} />
        <Route path="/blind/:id" element={<Blind />} />
        <Route path="/tournament/:id" element={<TournamentPage />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
