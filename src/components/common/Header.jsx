import React from "react";
import { Navbar, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="light" variant="light">
      <Container >
        <Navbar.Brand href="#home" >
          ShopSmart
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
