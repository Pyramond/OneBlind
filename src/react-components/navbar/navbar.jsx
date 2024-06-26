import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import AddPlayer from './components/addPlayer';
import RemovePlayer from './components/removePlayer';
import SelectSecondaryComponent from './components/secondaryComponent';
import ChangeVolume from './components/volume';
import NavbarLoginSpotify from './components/navbarLoginSpotify';
import DownloadDb from './components/downloadDb';
import { Link } from 'react-router-dom';


export default function NavigationBar() {

    return (
        <>
      {[false,].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3" bg="dark" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand as={Link} to="/"> <img src="/images/OneBlind.svg" alt="one blind image" id="oneBlindImage"/> </Navbar.Brand>
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
                <Link to="/settings"> <img src="/images/settingsIcon.svg" alt="settings_icon" id="settingsButton" /> </Link>
              </Offcanvas.Header>

              <Offcanvas.Body>

                <div className="mb-5">
                  <Link to="/classement" id="linkComponent">Classement</Link>
                  <Link to="/history" id="linkComponent">Historique</Link>
                  <Link to="/profiles" id="linkComponent">Profils</Link>
                </div>

                <AddPlayer />
                <RemovePlayer />
                <SelectSecondaryComponent />
                <ChangeVolume />
                <NavbarLoginSpotify />
                <DownloadDb />

              </Offcanvas.Body>

            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
    )
}