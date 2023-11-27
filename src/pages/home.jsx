import { Container, Nav, Navbar, Row, Col } from "react-bootstrap"
import { TypeAnimation } from 'react-type-animation';


export default function Home() {
    return(
        <>
        <Navbar bg="dark" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand href="/">One Blind</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/features">Features</Nav.Link>
                </Nav>
            </Container>
        </Navbar>

        <Row className="justify-content-center">
            <Col xs={12} md={6} className="text-center">
                <div id="titles">
                    <TypeAnimation
                        sequence={[
                            'OneBlind',
                            1000,
                            'We produce food for Hamsters',
                            1000,
                            'We produce food for Guinea Pigs',
                            1000,
                            'We produce food for Chinchillas',
                            1000
                        ]}
                        wrapper="div"
                        speed={50}
                        repeat={Infinity}
                        style={{ fontSize: '2em', color: "white" }}
                    />
                </div>
            </Col>
        </Row>
    </>
    )
}