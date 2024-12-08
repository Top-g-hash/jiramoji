import React, { useState } from "react";

const App = () => {
  const [embeddedHTML, setEmbeddedHTML] = useState(""); // Stores the user-inputted HTML
  const [imageLink, setImageLink] = useState(""); // Stores the extracted image link

  // Function to extract the image link from embedded HTML
  const extractImageLink = (html) => {
    const parser = new DOMParser(); // Create a DOM parser
    const doc = parser.parseFromString(html, "text/html"); // Parse the embedded HTML
    const imgElement = doc.querySelector("img"); // Find the first <img> tag
    return imgElement ? imgElement.src : null; // Return the 'src' attribute or null if not found
  };

  // Handle the form submission to extract and render the image
  const handleExtract = () => {
    const link = extractImageLink(embeddedHTML); // Extract the image link
    setImageLink(link); // Update the state with the extracted link
  };

  // Handle key press event
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of adding a new line
      handleExtract(); // Trigger the extract function
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Embed HTML Image Extractor</h1>
      <textarea
        placeholder="Paste your embedded HTML here..."
        value={embeddedHTML}
        onChange={(e) => setEmbeddedHTML(e.target.value)}
        onKeyDown={handleKeyPress} // Listen for key press events
        rows="5"
        cols="50"
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px",
        }}
      />
      <button
        onClick={handleExtract}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Extract Image Link
      </button>

      {imageLink && (
        <div style={{ marginTop: "20px" }}>
          <h2>Extracted Image:</h2>
          <img
            src={imageLink}
            alt="Extracted Meme"
            style={{
              width: "300px",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            }}
          />
          <p>
            <strong>Image Link:</strong> <a href={imageLink}>{imageLink}</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
