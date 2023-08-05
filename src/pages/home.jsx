import NavigationBar from '../react-components/navbar'
import CreateTournament from '../react-components/createTournament'
import CreateBlindModel from '../react-components/createBlindModel'
import AllTournament from '../react-components/allTournaments'

function Home() {

  return (
    <>
      <NavigationBar />

      <div id="homeContainer">
        <CreateTournament />
        <CreateBlindModel />
      </div>

      <AllTournament />
    </>
  )
}

export default Home
