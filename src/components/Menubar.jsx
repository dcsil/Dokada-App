import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../styles/Navbar.css";
import axios from "axios";

function Menu(props) {
  function logMeOut() {
    axios({
      method: "POST",
      url: "/logout",
    })
      .then((response) => {
        props.removeToken();
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }
  return (
    <Navbar className="gradient-custom-2">
      <Container>
        <Navbar.Brand href="/">Dokada</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="home">Home</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/canvas">Canvas</Nav.Link>
          <Nav.Link onClick={logMeOut} href="/Logout">
            Logout
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Menu;