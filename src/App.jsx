import React, { useState } from "react";
import Image from "./Image";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import EncryptText from "./components/custom/EncryptText";
import DecryptText from "./components/custom/DecryptText";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col gap-2 justify-start my-6 items-center">
      <Tabs defaultValue="te">
        <TabsList>
          <TabsTrigger value="te">Encrypt Text</TabsTrigger>
          <TabsTrigger value="td">Decrypt Text</TabsTrigger>
          <TabsTrigger value="ie">Encrypt Image</TabsTrigger>
          <TabsTrigger value="id">Decrypt Image</TabsTrigger>
        </TabsList>
        <TabsContent value="te">
          <EncryptText />
          </TabsContent>
        <TabsContent value="td">
          <DecryptText/>
          </TabsContent>
      </Tabs>
    </div>
  );
};

export default App;
