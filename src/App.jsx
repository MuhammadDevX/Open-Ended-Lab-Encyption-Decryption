import React, { useState } from "react";
import Image from "./Image";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

const App = () => {
  return (
    <div className="h-screen flex flex-col gap-2 justify-center items-center">
      <Tabs defaultValue="te">
        <TabsList>
          <TabsTrigger value="te">Encrypt Text</TabsTrigger>
          <TabsTrigger value="td">Decrypt Text</TabsTrigger>
          <TabsTrigger value="ie">Encrypt Image</TabsTrigger>
          <TabsTrigger value="id">Decrypt Image</TabsTrigger>
        </TabsList>
        <TabsContent value="te">Make changes to your account here.</TabsContent>
        <TabsContent value="td">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default App;
