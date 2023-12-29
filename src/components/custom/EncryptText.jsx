import { useState } from "react";
import { CopyIcon } from "lucide-react";
import { Card } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import CryptoJS, { enc } from "crypto-js";

export default function EncryptText() {
  const [text, setText] = useState("");
  const [textError, setTextError] = useState();
  const [algorithm, setAlgorithm] = useState("AES");
  const [key, setKey] = useState("");
  const [keyError, setKeyError] = useState();
  // const [outputFormat, setOutputFormat] = useState("Base64");
  const [encryptedText, setEncryptedText] = useState("");

  const handleEncrypt = () => {
    // Add encryption logic here and update encryptedText state
    // Example: setEncryptedText(encryptedResult);

    // For now, let's handle the case of no encryption algorithm selected
    if (!key) {
      setKeyError("Encryption key must be provided");
      return;
    }
    if (!text) {
      setTextError("Text for encryption must be provided");
      return;
    }
    // start encryption
    // a.
    // Convert the key to a WordArray
    // const keyBytes = CryptoJS.enc.Utf8.parse(key);

    // Encrypt the text
    const encrypted = CryptoJS[algorithm].encrypt(text, key);
    setEncryptedText(encrypted.toString());
    // Encode the result based on user choice

    // console.log(encrypted.toString());

    // // Update the state with the encrypted text
    // // setEncryptedText(encryptedText.toString());

    // // For Hex encoding
    // const encryptedHex = encryptedText.toString();
    // console.log(encryptedText.toString());
  };

  return (
    <Card className="border border-solid flex flex-col justify-center gap-3 p-4">
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
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex flex-row justify-start gap-2 items-center">
        <p className="text-start">Select Algorithm</p>
        <Select
          value={algorithm}
          onValueChange={(value) => setAlgorithm(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Enter an algorithm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AES">AES</SelectItem>
            <SelectItem value="DES">DES</SelectItem>
            <SelectItem value="Rabbit">Rabbit</SelectItem>
            <SelectItem value="RC4">RC4</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
          <Button>Generate</Button>
        </div>
      </div>
      {keyError && (
        <span className="text-sm font-bold text-red-500">{keyError}</span>
      )}

      {/* <div className="flex gap-8 items-center">
        <p>Output Format:</p>
        <RadioGroup
          value={outputFormat}
          onValueChange={(value) => setOutputFormat(value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Base64" id="Base64" />
            <Label htmlFor="Base64" className="text-md">
              Base64
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Hex" id="Hex" />
            <Label htmlFor="Hex" className="text-md">
              Hex
            </Label>
          </div>
        </RadioGroup>
      </div> */}
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
          className="w-full border-2 border-black overflow-x-hidden rounded-lg text-lg p-2 focus:outline-none"
          value={encryptedText}
        />
        <CopyIcon
          className="h-4 w-4 absolute top-2 right-2 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(encryptedText).catch((err) => {
              console.log(err.message);
            });
          }}
        />
        <div className="flex justify-end">
          <Button className="self-end">Download</Button>
        </div>
      </div>
    </Card>
  );
}
