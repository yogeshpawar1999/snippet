import { Container, Col, Navbar, Row, Nav, Image, NavItem } from "react-bootstrap";
import "./layout.css"
import SnippetLogo from '../../assets/images/output-onlinepngtools 1.png';
const Footer = () => {
  return (
    <Navbar fixed="bottom" className="footer-nav">
      {/* <Container fluid>
        <Row className="justify-content-between align-items-center w-100">
            <Col lg={2}>
            <Image src={SnippetLogo} alt="Snippet News Logo" width="100px" height="80px" className="me-3" />
            </Col>
          <Col xs={6} md={4} lg={8} className="text-end pe-0">
            <Nav >
             
              <Nav.Link href="#" className="footer-nav-link">Contact Us</Nav.Link>
              <Nav.Link href="#" className="footer-nav-link">Privacy Policy</Nav.Link>
              <Nav.Link href="#" className="footer-nav-link">Advertise with us</Nav.Link>
            </Nav>
          </Col>
          <Col xs={6} md={4} lg={2} className="text-start ps-0">
            <p className="mb-0">© 2024 Tive. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container> */}
      <NavItem className="custom-img">
      
      <Nav.Link href="#" className="footer-nav-link">Contact Us</Nav.Link>
              <Nav.Link href="#" className="footer-nav-link">Privacy Policy</Nav.Link>
              <Nav.Link href="#" className="footer-nav-link">Advertise with us</Nav.Link>
      </NavItem>
      <NavItem>
      <p className="mb-0">© 2024. All Rights Reserved.</p>
      </NavItem>
    </Navbar>
  );
};
export default Footer;
