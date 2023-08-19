import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import AddPlayer from './addPlayer';
import RemovePlayer from './removePlayer';

export default function NavigationBar() {

    return (
        <>
      {[false,].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3" bg="dark" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand href="/"> <img src="/images/OneBlind.svg" alt="one blind image" id="oneBlindImage"/> </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              bg="dark"
              data-bs-theme="dark"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}> Paramètres </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>

                <div className="mb-5">
                  <Button href="/classement" variant="link">Classement</Button>
                  <Button href="/history" variant="link">Historique</Button>
                  <Button href="/profiles" variant='link'>Profils</Button>
                </div>

                <AddPlayer />
                <RemovePlayer />

              </Offcanvas.Body>

            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
    )
}