import React, { useState } from "react";

const Image = () => {
  const [file, setFile] = useState();
  const [error, setError] = useState(null);

  function fileChange(e) {
    // e.target.files
    const file = e.target.files[0];
    // console.log(e.target.files[0]);
    const allowedTypes = [".png", ".jpg", ".jpeg"];
    // file.name.endsWith(".png");
    const isValidType = allowedTypes.some((elm, i) =>
      file.name.toLowerCase().endsWith(elm)
    );
    if (!isValidType) {
      setError("Invalid file type. File type must be of .png, .jpg or .jpeg");
      return;
    }
    setFile(file);
    // if()
  }
  return (
    <div className="flex flex-col gap-4 justify-center items-center border-solid">
      <h1 className="text-3xl font-bold">Image Encryption and Decryption</h1>
      {/* <form className="flex flex-col gap-2"> */}
      <div className="flex gap-4">
        {/* <button> */}
        <label
          className="block border-2 border-solid border-black p-2 rounded-md cursor-pointer"
          htmlFor="fileInput"
          class="fileInputLabel"
        >
          Choose a file
        </label>
        {/* </button> */}
        <input
          onChange={fileChange}
          type="file"
          id="fileInput"
          name="file"
          hidden
          accept=".jpg, .jpeg, .png"
          // value={file}
        />
      </div>
      {file && <p className="text-sm font-bold">{file.name}</p>}
      {error && <span className="text-sm text-red-500">{error}</span>}
      {file && (
        <img
          src={URL.createObjectURL(file)}
          // height={200}
          className="max-h-[400px] max-w-[400px]"
          alt="image to be encrypted"
        />
      )}
    </div>
  );
};

export default Image;
