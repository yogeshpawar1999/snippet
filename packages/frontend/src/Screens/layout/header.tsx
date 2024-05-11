import React from "react"
import { Navbar, Nav, Container, NavItem, Image } from "react-bootstrap"
import "./layout.css"
import SnippetLogo from "../../assets/images/Snippet_News_Logo.png"
import Union from "../../assets/images/Union.png"

const Header = () => {
  return (
    <Navbar expand="lg" className="header-nav">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src={Union}
            alt="microphone logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex justify-content-center align-items-center">
            <Image
              src={SnippetLogo}
              alt="Snippet News Logo"
              width="100px"
              height="80px"
              className="me-3"
            />
          </Nav>
          <Nav>
            <NavItem>
              <Nav.Link href="#">
                <button
                  className="btn btn-outline-light"
                  style={{ color: "white", backgroundColor: "#1f0b78" }}
                >
                  Register
                </button>
              </Nav.Link>
              {/* <button className="btn btn-outline-light" style={{color:"white", backgroundColor:"#1f0b78"}}>Sign In</button>
              <button className="btn btn-outline-light" style={{color:"white", backgroundColor:"#1f0b78"}}>Sign In</button> */}
            </NavItem>
            <NavItem>
              <Nav.Link href="#">
                <button
                  className="btn btn-outline-light"
                  style={{ color: "white", backgroundColor: "#1f0b78" }}
                >
                  Sign In
                </button>
              </Nav.Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
