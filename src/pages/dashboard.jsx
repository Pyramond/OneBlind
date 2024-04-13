import LoginSpotify from "../react-components/spotify/loginSpotify";
import TopPlayer from "../react-components/topPlayers/topPlayer";
import { LastTournaments } from "../react-components/lastTournaments/lastTournaments";

export default function Dashboard() {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
        <TopPlayer />
        <LastTournaments />
      </div>

      <LoginSpotify path="/" />
    </>
  );
}
