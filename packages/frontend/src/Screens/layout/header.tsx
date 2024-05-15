import { Navbar, Nav, Container, NavItem, Image } from "react-bootstrap"
import "./layout.css"
import SnippetLogo from "../../assets/images/Snippet_News_Logo.png"
import Union from "../../assets/images/Union.png"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()

  const handleSignIn = async (event) => {
    event.preventDefault()
    navigate("/auth")
  }

  const handleSignUp = async (event) => {
    // event.preventDefault()
    // navigate('/auth')
  }

  return (
    <Navbar expand="lg" className="header-nav">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src={Union}
            alt="microphone logo"
            width="15"
            height="15"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="gap1">
          <NavItem className="">
            <Image
              src={SnippetLogo}
              alt="Snippet News Logo"
              width="100px"
              height="80px"
              className="me-3"
            />
          </NavItem>
        
            <NavItem className="categories-navitem">
            <Nav.Link href="/" className="header-nav-link ">Home</Nav.Link>
              <Nav.Link href="#" className="header-nav-link">News</Nav.Link>
              <Nav.Link href="#" className="header-nav-link">Sports</Nav.Link>
              <Nav.Link href="#" className="header-nav-link">Elections</Nav.Link>
              <Nav.Link href="#" className="header-nav-link">Travel</Nav.Link>
            </NavItem>
           <NavItem className="header-btn">
              <Nav.Link href="#">
                <button
                  className="btn btn-outline-light"
                  style={{ color: "white", backgroundColor: "#1f0b78", height:50, borderRadius:15}}
                  onClick={handleSignUp}
                >
                  Register
                </button>
              </Nav.Link>
              {/* <button className="btn btn-outline-light" style={{color:"white", backgroundColor:"#1f0b78"}}>Sign In</button>
              <button className="btn btn-outline-light" style={{color:"white", backgroundColor:"#1f0b78"}}>Sign In</button> */}
            
              <Nav.Link href="#">
                <button
                  className="btn btn-outline-light"
                  style={{ color: "white", backgroundColor: "#1f0b78", height:50, borderRadius:15  }}
                  onClick={handleSignIn}
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
