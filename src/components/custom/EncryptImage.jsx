import React, { useState } from "react";
import { CopyIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import CryptoJS from "crypto-js";

export default function EncryptImage() {
  const [file, setFile] = useState();
  const [fileError, setFileError] = useState(null);
  const [key, setKey] = useState("");
  const [keyError, setKeyError] = useState(null);
  const [encryptedImage, setEncryptedImage] = useState("");

  function fileChange(e) {
    setFile();
    setFileError(null);

    const file = e.target.files[0];
    const allowedTypes = [".png", ".jpg", ".jpeg"];

    const isValidType = allowedTypes.some((elm, i) =>
      file.name.toLowerCase().endsWith(elm)
    );

    if (!isValidType) {
      setFileError(
        "Invalid file type. File type must be of .png, .jpg or .jpeg"
      );
      return;
    }

    if (file.size > 300000) {
      setFileError("Image size must not exceed 300kB");
      return;
    }

    setFile(file);
  }

  const handleKeyChange = (e) => {
    setKey(e.target.value);
    setKeyError(null);
  };

  const handleGenerateKey = () => {
    // Generate a random key (you can replace this with your key generation logic)
    const generatedKey = Math.random().toString(36).substring(2, 10);
    setKey(generatedKey);
    setKeyError(null);
  };

  const handleEncrypt = () => {
    // setFileError(null);
    // setKeyError(null);
    // Check if the key is provided and has a length of at least 5 characters
    if (!key) {
      setKeyError("Encryption key must be provided");
      return;
    }
    if (key.length < 5) {
      setKeyError("Encryption key must have a length of at least 5 characters");
      return;
    }
    if (!file) {
      setKeyError("Provide an image file to encrypt");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      // const base64 = reader.result.substring(reader.result.indexOf(",") + 1);
      const encrypted = CryptoJS.AES.encrypt(reader.result, key);
      const decrypted = CryptoJS.AES.decrypt(encrypted, key);
      // // console.log(encrypted.toString());
      // console.log("this is the encrypted string:");
      setEncryptedImage(encrypted.toString());
      console.log("this is the decrypted");
      console.log(decrypted.toString(CryptoJS.enc.Utf8));
    };

    reader.readAsDataURL(file);
  };

  return (
    <CardContent className="flex flex-col gap-2 p-4 border-2 rounded-lg">
      <h1 className="font-bold text-xl">Upload Image to Encrypt</h1>

      {/* File Input */}
      <div className="flex gap-2 items-center">
        <input
          onChange={fileChange}
          type="file"
          id="fileInput"
          name="file"
          hidden
          accept=".jpg, .jpeg, .png"
        />
        <label
          type="submit"
          className="border-2 border-solid border-black rounded-md py-1 px-2 cursor-pointer"
          htmlFor="fileInput"
        >
          Choose a file
        </label>
        <span className="text-sm font-bold">{file && file.name}</span>
        {fileError && (
          <span className="text-sm font-bold text-red-500">{fileError}</span>
        )}
      </div>

      {/* Encryption Key Input */}
      <div className="flex gap-2 items-center">
        <label className="font-bold text-xl" htmlFor="key">
          Encryption key
        </label>
        <input
          id="key"
          type="text"
          className="px-2 flex-1 border-2 border-black rounded-lg h-[45px] text-lg"
          onChange={handleKeyChange}
          value={key}
        />
        <Button onClick={handleGenerateKey}>Generate</Button>
      </div>

      {/* Error Messages below the key */}
      {keyError && (
        <span className="text-sm font-bold text-red-500">{keyError}</span>
      )}

      {/* Encrypt Button */}
      <Button className="self-start" onClick={handleEncrypt}>
        Encrypt
      </Button>

      {/* Encrypted Image Textarea */}
      <div className="flex flex-col gap-1">
        <span className="font-bold text-xl" htmlFor="encrypted">
          Encrypted Image (in base64)
        </span>
        <div className="w-full relative">
          <textarea
            style={{ resize: "none" }}
            name=""
            id="encrypted"
            // cols="30"
            rows="6"
            className="w-full overflow-x-hidden border-black border-2 rounded-lg text-lg p-2 focus:outline-none"
            readOnly
            value={encryptedImage}
          />
          {/* Copy Button */}
          <CopyIcon
            className="h-4 w-4 absolute top-2 right-2 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(encryptedImage).catch((err) => {
                console.log(err.message);
              });
            }}
          />
        </div>
      </div>

      {/* Download Button */}
      <Button className="self-end">Download</Button>
    </CardContent>
  );
}
