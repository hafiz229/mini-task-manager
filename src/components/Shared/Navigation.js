import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png";

const Navigation = () => {
  return (
    <div id="banner">
      <Navbar
        bg="dark"
        variant="dark"
        sticky="top"
        collapseOnSelect
        expand="lg"
        className="btn-grad-banner"
      >
        <Container>
          <Navbar.Toggle className="mb-2" />
          <Navbar.Brand as={Link} to="/viewtask">
            <img style={{ height: "35px", width: "35px" }} alt="" src={Logo} />{" "}
            <span className="fw-bolder">
              <span style={{ color: "orange" }}>Mini</span> Task Manager
            </span>
          </Navbar.Brand>

          <Navbar.Collapse className="justify-content-end">
            <Nav className="me-auto text-start fw-bold">
              <Nav.Link as={Link} to="/viewtask">
                Task List
              </Nav.Link>
              <Nav.Link as={Link} to="/addtask">
                Create Task
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
