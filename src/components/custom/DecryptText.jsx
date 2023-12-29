// const { Card } = require("../ui/card");
import { Card } from "../ui/card";
import { CopyIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CryptoJS, { algo } from "crypto-js";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { downloadFile } from "@/lib/utils";
import Algorithm from "../ui/algorithm";

function DecryptText() {
  const [text, setText] = useState("");
  const [textError, setTextError] = useState();
  const [algorithm, setAlgorithm] = useState("AES");
  const [key, setKey] = useState("");
  const [keyError, setKeyError] = useState();
  // const [outputFormat, setOutputFormat] = useState("Base64");
  const [decryptedText, setDecryptedText] = useState("");

  function handleDecrypt() {
    if (!key) {
      setKeyError("Encryption key must be provided");
      return;
    }
    if (!text) {
      setTextError("Text for encryption must be provided");
      return;
    }
    // const decryptedText = CryptoJS[algorithm]
    try {
      const decryptedText = CryptoJS[algorithm]
        .decrypt(text, key)
        .toString(CryptoJS.enc.Utf8);
      if (!decryptedText) throw new Error("Invalid text");
      setDecryptedText(decryptedText);
      setTextError();
      // console.log(decryptedText);
    } catch (err) {
      console.error(err.message);
      setTextError("The text you provided is not valid");
    }
  }

  return (
    <Card className="border border-solid flex flex-col justify-center gap-3 p-4">
      <label className="font-bold text-xl">
        Enter Encrypted Text to Decrypt
      </label>
      <textarea
        rows={3}
        placeholder="Enter Text To Decrypt"
        className="w-full text-md border-2 border-solid rounded-lg  p-2 border-black outline-none"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setTextError();
        }}
      />
      <Algorithm algorithm={algorithm} setAlgorithm={setAlgorithm} />
      <div className="flex gap-2 items-center">
        <label className="text-lg" htmlFor="key">
          Encryption key
        </label>
        <input
          id="key"
          type="text"
          className="px-2 flex-1 border-2 border-black rounded-lg h-[45px] text-lg"
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
            setKeyError();
          }}
        />
      </div>
      {keyError && (
        <span className="text-sm font-bold text-red-500">{keyError}</span>
      )}
      <Button className="self-start" onClick={handleDecrypt}>
        Decrypt
      </Button>
      {textError && (
        <span className="text-sm font-bold text-red-500">{textError}</span>
      )}
      {decryptedText && (
        <>
          <p>Decrypted Text:</p>
          <div className="w-full relative">
            <textarea
              style={{ resize: "none" }}
              name=""
              id="encrypted"
              readOnly
              value={decryptedText}
              // cols="30"
              rows="6"
              className="w-full border-2 border-black overflow-x-hidden border-solid rounded-lg text-lg p-2 focus:outline-none"
            />
            {/* button */}
            <CopyIcon
              className="h-4 w-4 absolute top-2 right-2 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(decryptedText).catch((err) => {
                  console.log(err.message);
                });
              }}
            />
            <div className="flex justify-end">
              <Button
                onClick={() => downloadFile("decrypted.txt", decryptedText)}
                className="self-end rounded-lg px-2 py-1 bg-slate-950 text-white "
              >
                Download
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}

export default DecryptText;
