import CreateTournament from '../react-components/createTournament'
import CreateBlindModel from '../react-components/createBlindModel'
import AllTournament from '../react-components/allTournaments'

export default function Dashboard() {

  return (
    <>
      <div id="homeContainer">
        <CreateTournament />
        <CreateBlindModel />
      </div>

      <AllTournament />
    </>
  )
}