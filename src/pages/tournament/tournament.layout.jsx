import { Outlet } from "react-router-dom";
import { AppShell, Burger, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';


export function TournamentLayout() {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  
    return (
      <AppShell
        header={{ height: 60 }}
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

        <AppShell.Main>
            <Outlet />
        </AppShell.Main>
      </AppShell>
    );
}