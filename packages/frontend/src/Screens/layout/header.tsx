import { Navbar, Nav, Container, NavItem, Image } from "react-bootstrap"
import "./layout.css"
import SnippetLogo from "../../assets/images/Snippet_News_Logo.png"
import Union from "../../assets/images/Union.png"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../AuthContext"
import { useContext } from "react"

const Header = () => {
  const user = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSignIn = async (event) => {
    event.preventDefault()
    navigate("/auth")
  }

  const handleSignUp = async (event) => {
    // event.preventDefault()
    // navigate('/auth')
  }

  const handleUploadContent = () => {
    event.preventDefault()
    navigate("/upload-content")
  }

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
            {!user?.userData && (
              <>
                <NavItem>
                  <Nav.Link href="#">
                    <button
                      className="btn btn-outline-light"
                      style={{ color: "white", backgroundColor: "#1f0b78" }}
                      onClick={handleSignUp}
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
                      onClick={handleSignIn}
                    >
                      Sign In
                    </button>
                  </Nav.Link>
                </NavItem>
              </>
            )}

            {user?.userData?.role === "AUTHOR" && (
              <NavItem>
                <Nav.Link href="#">
                  <button
                    className="btn btn-outline-light"
                    style={{ color: "white", backgroundColor: "#1f0b78" }}
                    onClick={handleUploadContent}
                  >
                    Create Content
                  </button>
                </Nav.Link>
              </NavItem>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header