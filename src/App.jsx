import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import UploadPhoto from "./components/UploadPhoto";

export const fileTypes = ["JPG", "PNG", "GIF"];

function App() {
  const handleChange = (file) => {
    // console.log(file);
  };

  return (
    <>
      <UploadPhoto
        multiple
        onSelectedImages={handleChange}
        name="file"
        types={fileTypes}
      />
    </>
  );
}

export default App;
