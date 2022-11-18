import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { Component }  from 'react';

function Menu() {
  return (
    <>
      <br />
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Dokada</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="features">Features</Nav.Link>
            <Nav.Link href="pricing">Pricing</Nav.Link>
            <Nav.Link href="Images">Images</Nav.Link>
            <Nav.Link href="login">Login</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;