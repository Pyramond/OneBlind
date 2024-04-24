import { Outlet } from "react-router-dom";
import { AppShell, Burger, Group, Button, Image, Stack, Title, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate, Link } from 'react-router-dom';
import DownloadDb from "./react-components/navbar/components/downloadDb";
import { IconBrandGithub } from "@tabler/icons-react"


export function Layout() {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const navigate = useNavigate()
  
    return (
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            
            <Link to="/">
                <Image
                    radius="md"
                    h={50}
                    src="/images/OneBlind.svg"
                />
            </Link>

          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
            <Stack>
                <Title order={3} size="h3">Pages</Title>
                <Button variant="light" onClick={() => { navigate("/") }}>Accueil</Button>
                <Button variant="light" onClick={() => { navigate("/classement") }}>Classement</Button>
                <Button variant="light" onClick={() => { navigate("/history") }}>Historique</Button>
                <Button variant="light" onClick={() => { navigate("/profiles") }}>Profils</Button>

                <Space h="xl" />

                <Title order={3} size="h3">Gestion</Title>
                <Button variant="light" onClick={() => { navigate("/players") }}>Joueurs</Button>
                <Button variant="light" onClick={() => { navigate("/blind/create") }}>Structure de blind</Button>
                <Button variant="light" onClick={() => { navigate("/tournament/create") }}>Créer tournoi</Button>
                <Button variant="light" onClick={() => { navigate("/tournament")}}>Tournois</Button>

                <Space h="xl" />

                <Title order={3} size="h3">Autres</Title>
                <DownloadDb />
                <Button variant="light" onClick={() => { navigate("/changelogs")}}>Changelogs</Button>
                <Button variant="light" leftSection={<IconBrandGithub size={25}/>} onClick={() => window.open("https://github.com/Pyramond/OneBlind", '_blank')}>Github</Button>

            </Stack>
          

        </AppShell.Navbar>
        <AppShell.Main>
            <Outlet />
        </AppShell.Main>
      </AppShell>
    );
}