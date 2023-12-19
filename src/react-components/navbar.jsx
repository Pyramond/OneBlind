import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import AddPlayer from './addPlayer';
import RemovePlayer from './removePlayer';
import RemoveTournament from './removeTournament';
import SelectSecondaryComponent from './navbar/components/secondaryComponent';
import ChangeVolume from './navbar/components/volume';

export default function NavigationBar() {

    return (
        <>
      {[false,].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3" bg="dark" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand href="/dashboard"> <img src="/images/OneBlind.svg" alt="one blind image" id="oneBlindImage"/> </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              bg="dark"
              data-bs-theme="dark"
            >
              <Offcanvas.Header>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}> Barre d'outils </Offcanvas.Title>
                <Button href="/settings" variant="link"> <img src="/images/settingsIcon.svg" alt="settings_icon" id="settingsButton" /> </Button>
              </Offcanvas.Header>

              <Offcanvas.Body>

                <div className="mb-5">
                  <Button href="/classement" variant="link">Classement</Button>
                  <Button href="/history" variant="link">Historique</Button>
                  <Button href="/profiles" variant='link'>Profils</Button>
                </div>

                <AddPlayer />
                <RemovePlayer />
                <RemoveTournament />
                <SelectSecondaryComponent />
                <ChangeVolume />

              </Offcanvas.Body>

            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
    )
}