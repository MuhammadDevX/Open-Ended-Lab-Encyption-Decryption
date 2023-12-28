import React, { useState } from "react";
import Image from "./Image";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import EncryptImage from "./components/custom/EncryptImage";
import DecryptImage from "./components/custom/DecryptImage";

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
        <TabsContent value="te">Make changes to your account here.</TabsContent>
        <TabsContent value="td">Change your password here.</TabsContent>
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
