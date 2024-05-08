import React, { useState } from "react";

const CreateContent = () => {
  const [title, setTitle] = useState("hello");
  const [description, setDescription] = useState("worls");
  const [image, setImage] = useState(null);
  const API_KEY =
    "ef7d8b0db69ce9fd13f392948e79b75c3ac0830971a1c205589c8fd8272276828fba1b12a6f566cac0f87891618e7abde2f38eebd05b582ac6af68c5007dd12e9a09a08cd848c46325e04db9891c297a5814c1d5a951b2283df23bc6e7655378845fe659d464b70a24cd8dffa1e002b748138283f6e74a509afcae88afb53aff";
  const handleSubmit = (event) => {
    event.preventDefault();
    displayContent(title, description, image);
  };

  // const API = async () => {
  //   fetch("http://172.20.10.12:1337/api/create-contents", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${API_KEY}`,
  //     },
  //     body: JSON.stringify({
  //       data: {
  //         Title: "Dolemon Sushi",
  //       },
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // };

  const displayContent = (title, description, image) => {
    // Here you can display the submitted content
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Image:", image);
    fetch("http://172.20.10.12:1337/api/create-contents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          Title: title,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
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
  );
};
export default CreateContent;
