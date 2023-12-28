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
      <div className="text-center">
        <label for="enterTextForEncryption" className="w-200 font-bold text-xl">
          Decrypt Text
        </label>
      </div>
      <div>
        <textarea
          id="enterTextForEncryption"
          rows={3}
          placeholder="Enter Text To Decrypt"
          className="w-full border border-solid rounded-lg  p-2 border-black outline-none"
        />
      </div>
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
      <div className="flex gap-3 justify-start items-center">
        <div>
          <label for="Key">Write Key</label>
        </div>
        <div>
          <input
            type="text"
            id="Key"
            className="p-1 border border-1 border-solid border-black rounded-lg outline-none "
            placeholder="Enter key here"
          />
        </div>
        <div>
          <Button className="rounded-lg px-2 py-1 bg-slate-950 text-white">
            Generate
          </Button>
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
          cols="30"
          rows="6"
          className="w-full border border-1 border-black  border-solid rounded-lg text-lg p-2 focus:outline-none"
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
