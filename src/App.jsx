import React, { useState } from "react";
import Image from "./Image";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import EncryptText from "./components/custom/EncryptText";
import DecryptText from "./components/custom/DecryptText";
import DecryptImage from "./components/custom/DecryptImage";
import EncryptImage from "./components/custom/EncryptImage";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col gap-2 justify-start my-6 items-center">
      <Tabs defaultValue="te" className=" lg:max-w-[40%] sm:w-[70%]">
        <TabsList className="w-full">
          <TabsTrigger value="te">Encrypt Text</TabsTrigger>
          <TabsTrigger value="td">Decrypt Text</TabsTrigger>
          <TabsTrigger value="ie">Encrypt Image</TabsTrigger>
          <TabsTrigger value="id">Decrypt Image</TabsTrigger>
        </TabsList>
        <TabsContent value="te">
          <EncryptText />
        </TabsContent>
        <TabsContent value="td">
          <DecryptText />
        </TabsContent>
        <TabsContent value="ie">
          <EncryptImage />
        </TabsContent>
        <TabsContent value="id">
          <DecryptImage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default App;
