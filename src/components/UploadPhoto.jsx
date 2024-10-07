import React, { useState, useRef } from "react";
import { fileTypes } from "../App";

const UploadPhoto = ({
  multiple = false,
  onSelectedImages,
  name,
  types = fileTypes,
}) => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateSize = (files) => {
    return files.every((f) => f.size < 5 * 1024 * 1024);
  };

  const validateExtension = (files) => {
    const exts = files.map((file, idx) =>
      file.name.split(".")[1].toUpperCase()
    );
    return exts.every((ext) => types.includes(ext.toUpperCase()));
  };

  const handleSubmit = (files) => {
    setFiles(files);
    onSelectedImages?.(files);
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const filesWithoutSize = Array.from(e.dataTransfer.files);

      const validSize = validateSize(filesWithoutSize);
      if (!validSize) {
        alert("maximum size of drop-file is 5mb");
        return;
      }

      const validExtension = validateExtension(filesWithoutSize);
      if (!validExtension) {
        alert(`Extention of your files is not "JPG", "PNG", "GIF"`);
        return;
      }

      handleSubmit(filesWithoutSize);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const filesWithoutSize = Array.from(e.target.files);

      const validSize = validateSize(filesWithoutSize);
      if (!validSize) {
        alert("maximum size of drop-file is 5mb");
        return;
      }

      const validExtension = validateExtension(filesWithoutSize);
      if (!validExtension) {
        alert(`Extention of your files is not "JPG", "PNG", "GIF"`);
        return;
      }

      handleSubmit(filesWithoutSize);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <>
      {files.length === 0 ? (
        <form
          id="form-file-upload"
          onDragEnter={handleDrag}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={inputRef}
            type="file"
            id="input-file-upload"
            multiple={multiple}
            onChange={handleChange}
            name={name}
          />
          <label
            id="label-file-upload"
            htmlFor="input-file-upload"
            className={dragActive ? "drag-active" : ""}
          >
            <div>
              <p>Drag and drop your file here or</p>
              <button className="upload-button" onClick={onButtonClick}>
                Upload a file
              </button>
            </div>
          </label>
          {dragActive && (
            <div
              id="drag-file-element"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            ></div>
          )}
        </form>
      ) : (
        <div>
          {Array.from(files).map((file, idx) => (
            <p key={idx}>{file.name}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default UploadPhoto;
