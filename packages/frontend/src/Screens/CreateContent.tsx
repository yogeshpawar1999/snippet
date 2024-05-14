import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import logo from "./Snippet_News_Logo-removebg-preview 1.png";
// import "./CreateContent.css";

const CreateContent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const previewContentRef = useRef(null);
  const API_KEY =
    "715e06656b9e7c814ee1c8adcb968d67b078199d1a3df2d7396f48d0cbf3121266be9ed568347d071c541ac0a5cfe453140673a5406aea277fce1116af21f4960b535cb4d981262d7723caa3e76ea0d1a44fede3bfc1b4d218da1f581dae0f34e04784dcf331379b755ecd4c94822a2050b2acbd3372156a188c3b92ee4ad68b";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    await displayContent(title, description, image);
    setPreviewVisible(!previewVisible);
    setSubmitted(true);
  };

  const displayContent = async (title: string, description: string, image) => {
    fetch("http://192.168.1.121:1337/api/create-contents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          Title: title,
          Description: description,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    setSubmitted(true);
    await handleSaveImage();
  };

  const handleSaveImage = async () => {
    setSubmitted(true);
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
      <nav className="navbar">
        <img className="logo float-start" src={logo} alt="" />
      </nav>
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
              <button type="submit" className="btn btn-primary">
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
    </>
  );
};

export default CreateContent;
