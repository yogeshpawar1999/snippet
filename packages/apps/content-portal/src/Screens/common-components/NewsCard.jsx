import {  Col, Card } from "react-bootstrap";

const NewsCard=({ imageSrc })=> {
    return (
      <Col>
        <Card>
          <img src={imageSrc} className="card-img-top" alt="News Image" />
        </Card>
      </Col>
    );
  }

  export default NewsCard