import { useState } from "react";
import { toPng } from "html-to-image";
import logo from "./Snippet_News_Logo-removebg-preview 1.png";
// import { response } from "../response";

const CreateContent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const API_KEY =
    "ef7d8b0db69ce9fd13f392948e79b75c3ac0830971a1c205589c8fd8272276828fba1b12a6f566cac0f87891618e7abde2f38eebd05b582ac6af68c5007dd12e9a09a08cd848c46325e04db9891c297a5814c1d5a951b2283df23bc6e7655378845fe659d464b70a24cd8dffa1e002b748138283f6e74a509afcae88afb53aff";

  const handleSubmit = async (event) => {
    event.preventDefault();
    displayContent(title, description, image);
    setPreviewVisible(!previewVisible);
    setSubmitted(true);
  };

  const displayContent = (title, description, image) => {
    console.log("");
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
          Image: image,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const PreviewContentPopup = () => {
    const handleSaveImage = () => {
      const previewContent = document.getElementById("preview-content");
      toPng(previewContent)
        .then(function (dataUrl) {
          console.log("dataUrl", dataUrl);
          // // Convert data URL to Blob
          // const blob = dataURLtoBlob(dataUrl);

          // Read the Blob and convert to Base64
          // const reader = new FileReader();
          // reader.onload = function () {
          // const base64DataUrl = reader.result;

          // Create the request body
          const requestBody = {
            file: dataUrl,
          };

          console.log("\nrequestedbody", requestBody);
          const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
          };

          console.log("requestbody", JSON.stringify(requestBody));
          fetch("http://192.168.0.109:3000/content/sign", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(requestBody),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to upload data");
              }
              return response.json();
            })
            .then((data) => {
              console.log("Data successfully uploaded!");
              console.log("Response:", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });

          // reader.readAsDataURL(blob);
        })
        .catch(function (error) {
          console.error("Error saving image:", error);
        });
    };

    // Function to convert data URL to Blob
    // const dataURLtoBlob = (dataUrl) => {
    //   const arr = dataUrl.split(",");
    //   const mime = arr[0].match(/:(.*?);/)[1];
    //   const bstr = atob(arr[1]);
    //   let n = bstr.length;
    //   const u8arr = new Uint8Array(n);
    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n);
    //   }
    //   return new Blob([u8arr], { type: mime });
    // };
    // console.log("ncncnnc", URL.createObjectURL(response));

    return (
      <div id="preview-content" className="preview-content">
        {submitted && (
          <div className="preview-details">
            <h2 className="preview-title">Title: {title}</h2>
            <p className="preview-description">Description: {description}</p>
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="preview-image"
              />
            )}
          </div>
        )}
        <button onClick={handleSaveImage}>Save as Image</button>
      </div>
    );
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
          <PreviewContentPopup
            title={title}
            description={description}
            image={image}
          />
        )}
      </div>
    </>
  );
};

export default CreateContent;
