import NavigationBar from '../react-components/navbar/navbar'
import LoginSpotify from '../react-components/spotify/loginSpotify'

export default function Settings() {

  return (
    <>
        <NavigationBar />
        <LoginSpotify path="/settings/" />
    
    </>
  )
}