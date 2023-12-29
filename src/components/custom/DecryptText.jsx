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

import { Button } from "@/components/ui/button";

function DecryptText() {
  return (
    <Card className="border border-solid flex flex-col justify-center gap-3 p-4">
      <label className="font-bold text-xl">
        Enter Encrypted Text to Decrypt
      </label>
      <textarea
        rows={3}
        placeholder="Enter Text To Encrypt"
        className="w-full text-md border-2 border-solid rounded-lg  p-2 border-black outline-none"
      />
      <div className="flex flex-row justify-start gap-2 items-center">
        <div>
          <p>Select Algorithm</p>
        </div>
        <div className="w-30">
          <Select className="focus:outline-none">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Enter an algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AES">AES</SelectItem>
              <SelectItem value="RABBIT">RABBIT</SelectItem>
              <SelectItem value="RC4">RC4</SelectItem>
              <SelectItem value="DES">DES</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <label for="Key">Write Key</label>

        <input
          id="key"
          type="text"
          className="px-2 flex-1 border-2 border-black rounded-lg h-[45px] text-lg"
          // onChange={handleKeyChange}
          // value={key}
          placeholder="Enter key here"
        />
        <div>
          <Button>Generate</Button>
        </div>
      </div>
      <div>
        <p>Decrypted Text:</p>
      </div>
      <div className="w-full relative">
        <textarea
          style={{ resize: "none" }}
          name=""
          id="encrypted"
          // cols="30"
          rows="6"
          className="w-full border-2 border-black overflow-x-hidden border-solid rounded-lg text-lg p-2 focus:outline-none"
        ></textarea>
        {/* button */}
        <CopyIcon
          className="h-4 w-4 absolute top-2 right-2 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText("you wassup").catch((err) => {
              console.log(err.message);
            });
          }}
        />
        <div className="flex justify-end">
          <Button className="self-end rounded-lg px-2 py-1 bg-slate-950 text-white ">
            Download
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default DecryptText;
