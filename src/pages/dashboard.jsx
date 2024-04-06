import { Title, Flex, Text, Image } from "@mantine/core";
import LoginSpotify from "../react-components/spotify/loginSpotify";
import TopPlayer from "../react-components/topPlayers/topPlayer";

export default function Dashboard() {
  return (
    <>

        <TopPlayer />

        <LoginSpotify path="/" />
    </>
  );
}
