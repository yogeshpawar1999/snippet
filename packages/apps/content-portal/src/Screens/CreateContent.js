import React, { useState } from "react";
import { toPng } from "html-to-image";

const CreateContent = () => {
  const [title, setTitle] = useState("hello");
  const [description, setDescription] = useState("world");
  const [image, setImage] = useState(null);
  const API_KEY =
    "ef7d8b0db69ce9fd13f392948e79b75c3ac0830971a1c205589c8fd8272276828fba1b12a6f566cac0f87891618e7abde2f38eebd05b582ac6af68c5007dd12e9a09a08cd848c46325e04db9891c297a5814c1d5a951b2283df23bc6e7655378845fe659d464b70a24cd8dffa1e002b748138283f6e74a509afcae88afb53aff";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const imageDataUrl = await convertToImage();
    console.log("Image Data URL:", imageDataUrl);
    displayContent(title, description, image, imageDataUrl);
  };

  const convertToImage = async () => {
    const element = document.querySelector(".news-portal-editor");
    const imageDataUrl = await toPng(element);
    return imageDataUrl;
  };

  const displayContent = (title, description, image, imageDataUrl) => {
    // Example fetch to send data to the server
    fetch("http://172.20.10.12:1337/api/create-contents", {
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
          ImageDataUrl: imageDataUrl,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const PreviewContentPopup = () => {
    return <></>;
  };
  return (
    <>
      <div className="news-portal-editor">
        <h1>News Portal Editor</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="image">Image Upload:</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      {PreviewContentPopup()}
    </>
  );
};

export default CreateContent;
