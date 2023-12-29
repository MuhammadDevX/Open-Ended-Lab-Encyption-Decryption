import { useState } from "react";
import { CopyIcon } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "@/components/ui/button";
import CryptoJS from "crypto-js";
import { downloadFile } from "@/lib/utils";
import Algorithm from "@/components/ui/algorithm";

export default function EncryptText() {
  const [text, setText] = useState("");
  const [textError, setTextError] = useState();
  const [algorithm, setAlgorithm] = useState("AES");
  const [key, setKey] = useState("");
  const [keyError, setKeyError] = useState();
  // const [outputFormat, setOutputFormat] = useState("Base64");
  const [encryptedText, setEncryptedText] = useState("");

  const handleEncrypt = () => {
    // For now, let's handle the case of no encryption algorithm selected
    if (!key) {
      setKeyError("Encryption key must be provided");
      return;
    }
    if (!text) {
      setTextError("Text for encryption must be provided");
      return;
    }
    // Decrypt the text
    const encrypted = CryptoJS[algorithm].encrypt(text, key);
    setEncryptedText(encrypted.toString());
  };
  const handleGenerateKey = () => {
    // Generate a random key (you can replace this with your key generation logic)
    const generatedKey = Math.random().toString(36).substring(2, 10);
    setKey(generatedKey);
    setKeyError(null);
  };

  return (
    <Card className="border-2 border-solid flex flex-col justify-center gap-3 p-4">
      <label
        htmlFor="textForDecryption"
        className="w-full text-left font-bold text-xl"
      >
        Enter Text to Encrypt
      </label>
      <textarea
        rows={3}
        placeholder="Enter Text To Encrypt"
        className="w-full text-md border-2 border-solid rounded-lg p-2 border-black outline-none"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setTextError();
        }}
      />
      <Algorithm algorithm={algorithm} setAlgorithm={setAlgorithm} />
      <div className="flex gap-3 items-center">
        <label htmlFor="key">Write Key</label>
        <input
          id="key"
          type="text"
          className="px-2 flex-1 border-2 border-black rounded-lg h-[45px] text-lg"
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
            setKeyError();
          }}
          placeholder="Enter key here"
        />
        <div>
          <Button onClick={handleGenerateKey}>Generate</Button>
        </div>
      </div>
      {keyError && (
        <span className="text-sm font-bold text-red-500">{keyError}</span>
      )}

      <Button className="self-start" onClick={handleEncrypt}>
        Encrypt
      </Button>
      {textError && (
        <span className="text-sm font-bold text-red-500">{textError}</span>
      )}
      <div>
        <p>Encrypted Text:</p>
      </div>
      <div className="w-full relative">
        <textarea
          style={{ resize: "none" }}
          name=""
          id="encrypted"
          rows="4"
          readOnly
          className="w-full border-2 border-black overflow-x-hidden rounded-lg text-lg p-2 pr-4 focus:outline-none"
          value={encryptedText}
        />
        <CopyIcon
          className="h-4 w-4 absolute top-2 right-4 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(encryptedText).catch((err) => {
              console.log(err.message);
            });
          }}
        />
        <div className="flex justify-end">
          <Button
            onClick={() => downloadFile("encrypted.txt", encryptedText)}
            className="self-end"
          >
            Download
          </Button>
        </div>
      </div>
    </Card>
  );
}
