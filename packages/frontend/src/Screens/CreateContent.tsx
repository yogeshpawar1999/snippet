import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import "./CreateContent.css";
import Footer from "./layout/Footer";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import "./layout/layout.css";
import SnippetLogo from "../assets/images/Snippet_News_Logo.png";
import Union from "../assets/images/Union.png";

const CreateContent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const previewContentRef = useRef(null);
  // const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    await displayContent(title, description, image);
  };

  const displayContent = async (
    title: string,
    description: string,
    image: File
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("contentImage", image);
      formData.append("authorName", "Poonam");
      formData.append("authorEmail", "poonam.ghewande@ayanworks.com");
      formData.append("status", "inReview");
      formData.append("fullNews", "");
      formData.append("socialLink", "");

      const response = await fetch(
        "https://b2e2-2401-4900-1c9b-2f32-d106-9b2c-c008-72ac.ngrok-free.app/content",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload content");
      }

      const data = await response.json();
      if (data) {
        await handleSaveImage();
        setSubmitted(true);
        setPreviewVisible(!previewVisible);
        // setTimeout(() => {
        //   navigate("/");
        // }, 5000);
      }
      console.log(data);
    } catch (error) {
      console.error("Error uploading content:", error);
    }
  };

  const handleSaveImage = async () => {
    setPreviewVisible(!previewVisible);
    if (!previewContentRef.current) return;
    try {
      const dataUrl = await toPng(previewContentRef.current);
      const requestBody = {
        file: dataUrl,
      };
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      const response = await fetch("http://192.168.1.15:3000/content/sign", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Failed to upload data");
      }
      console.log("Data successfully uploaded!");
      console.log("Response:", await response.json());
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  return (
    <>
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container">
        <div className="author-portal">
          <div className="news-portal-editor">
            <h1>Author Portal Editor</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image Upload:</label>
                <input
                  type="file"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                  required
                  className="form-control-file"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginTop: 30 }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        {previewVisible && (
          <div
            id="preview-content"
            className="preview-content"
            ref={previewContentRef}
          >
            {submitted && (
              <div className="preview-details">
                <h2 className="preview-title">Title: {title}</h2>
                <p className="preview-description">
                  Description: {description}
                </p>
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="preview-image"
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CreateContent;
