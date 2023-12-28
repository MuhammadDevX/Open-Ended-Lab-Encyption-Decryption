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

export default function EncryptText() {
  return (
    <Card className="border border-solid flex flex-col justify-center gap-3 p-4">
      <div className="text-center">
        <label
          for="textForDecryption"
          className="w-full text-center font-bold text-xl"
        >
          Encrypt Text
        </label>
      </div>
      <div>
        <textarea
          id="textForDecryption"
          rows={3}
          placeholder="Enter Text To Encrypt"
          className="w-full border border-solid rounded-lg  p-2 border-black outline-none"
        />
      </div>
      <div className="flex flex-row justify-start gap-2 items-center">
        <div>
          <p className="text-start">Select Algorithm</p>
        </div>
        <div className="w-30">
          {/* <select name="" id="" className="border border-solid border-black border-1 rounded-lg  flex-1 outline-none">
     <option>AES</option>
     <option>RABBIT</option>
     <option>RC4</option>
     <option>DES</option>
     </select> */}
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
        <div>
          <label for="Key">Write Key</label>
        </div>
        <div>
          <input
            type="text"
            id="Key"
            className="p-1 border  border-solid border-black rounded-lg outline-none "
            placeholder="Enter key here"
          />
        </div>
        <div>
          {/* <button className="rounded-lg px-2 py-1 bg-slate-950 text-white">
            Generate
          </button> */}
          <Button>Generate</Button>
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <div>
          <p>Output Format:</p>
        </div>
        <div className="flex flex-col text-sm">
          {/* <div>
        <input type="radio" id="BASE64" name="outputFormat"/>
          <label for="BASE64">BASE 64</label>
          </div>
          <div>

          <input type="radio" id="HEX" name="outputFormat"/>
          <label for="HEX">HEX</label>
          </div> */}
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="BASE64" id="BASE64" />
              <Label htmlFor="BASE64">BASE 64</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="HEX" id="HEX" />
              <Label htmlFor="HEX">HEX</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div>
        <Button className="self-end rounded-lg px-2 py-1 bg-slate-950 text-white">
          Encrypt
        </Button>
      </div>
      <div>
        <p>Encrypted Text:</p>
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
