import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import "./NavHeader.scss";

function NavHeader() {
  return (
    <div className="nav-header">
      <Navbar expand="lg" className="bg-header navbar-light">
        <Container>
          <Navbar.Brand to="/" className="d-flex gap-2">
            <img
              src="favicon.ico"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            <div className="brand-name">Todo App</div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" exact className="nav-link">
                Home
              </NavLink>
              <NavLink to="/task" exact className="nav-link">
                Task
              </NavLink>
              <NavLink to="/" exact className="nav-link">
                User
              </NavLink>
            </Nav>
            <Nav>
              <Nav.Item className="nav-link">
                Welcome <b>Admin</b>!
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavHeader;
