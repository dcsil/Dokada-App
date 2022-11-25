import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../styles/Navbar.css";


function Menu() {
  return (
    <Navbar className="gradient-custom-2">
      <Container>
        <Navbar.Brand href="/">Dokada</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="home">Home</Nav.Link>
          <Nav.Link href="features">Features</Nav.Link>
          <Nav.Link href="pricing">Pricing</Nav.Link>
          <Nav.Link href="#/login">Login</Nav.Link>
          <Nav.Link href="#/canvas">Canvas</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Menu;