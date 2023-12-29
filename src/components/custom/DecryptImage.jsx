import React, { useState } from "react";
import { CopyIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import CryptoJS from "crypto-js";
import Algorithm from "../ui/algorithm";

export default function DecryptImage() {
  const [key, setKey] = useState("");
  const [keyError, setKeyError] = useState(null);
  const [encryptedText, setEncryptedText] = useState("");
  const [image, setImage] = useState();
  const [imageError, setImageError] = useState();
  const [algorithm, setAlgorithm] = useState("AES");

  async function checkImage(str) {
    return new Promise((resolve, _) => {
      var _img = document.createElement("img");
      _img.onload = function () {
        resolve(true);
      };

      _img.onerror = function () {
        resolve(false);
        // reportError(str);
      };
      _img.src = str;
    });
  }

  const handleDecrypt = async () => {
    // reset previous errors (if any)
    setImageError();
    setKeyError();
    setImage();
    // check one by one for any error
    if (!encryptedText) {
      setKeyError("Encrypted form of the image must be provided");
      return;
    }
    // Check if the key is provided and has a length of at least 5 characters
    if (!key) {
      setKeyError("Encryption key must be provided");
      return;
    }
    try {
      const decrypted = CryptoJS[algorithm].decrypt(encryptedText, key);
      const decryptedBase64 = decrypted.toString(CryptoJS.enc.Utf8);

      const isValid = await checkImage(decryptedBase64);

      if (!isValid) {
        setImage();
        setImageError("The encrypted base64 does not represent a valid image");
        return;
      } else {
        // all set, then set the base64 as the image
        setImage(decryptedBase64);
      }
    } catch (err) {
      setImage();
      setImageError("The encrypted base64 does not represent a valid image");
    }
  };

  const handleKeyChange = (e) => {
    setKey(e.target.value);
    setKeyError(null);
  };

  return (
    <CardContent className="flex flex-col gap-4 p-4 border-2 rounded-lg">
      <h1 className="font-bold text-xl">
        Provide Encrypted Image (in base64) to Decrypt
      </h1>
      {/* TEXT AREA */}
      <textarea
        style={{ resize: "none" }}
        name=""
        id="encrypted"
        // cols="30"
        rows="6"
        className="w-full overflow-x-hidden border-black border-2 rounded-lg text-lg p-2 focus:outline-none"
        onChange={(e) => setEncryptedText(e.target.value)}
        value={encryptedText}
      />
      {/* KEY OF ENCRYPTION */}
      <div className="flex gap-2 items-center">
        <label className="text-md" htmlFor="key">
          Encryption key
        </label>
        <input
          id="key"
          type="text"
          className="px-2 flex-1 border-2 border-black rounded-lg h-[45px] text-lg"
          onChange={handleKeyChange}
          value={key}
        />
      </div>
      <Algorithm algorithm={algorithm} setAlgorithm={setAlgorithm} />
      {/* ENCRYPT ERROR */}
      {keyError && (
        <span className="text-sm font-bold text-red-500">{keyError}</span>
      )}
      {/* DECRYPT BUTTON */}
      <Button className="self-start" onClick={handleDecrypt}>
        Decrypt
      </Button>
      {/* OUTPUT IMAGE */}
      {image && (
        <>
          <h1 className="font-bold text-xl">Output Image:</h1>
          <div>
            <img
              src={image}
              alt="encrypted image"
              className="max-w-full h-auto"
            />
          </div>
        </>
      )}
      {imageError && (
        <span className="text-sm font-bold text-red-500">{imageError}</span>
      )}
    </CardContent>
  );
}
