"use client";
import React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Preview() {
  const [value, setValue] = useState("");
  return (
    <div>
      <Label>Preview</Label>
      <Button asChild variant={"outline"} className="my-2 w-full font-mono">
        <pre>{value}</pre>
      </Button>{" "}
      <Label>Input Your Text</Label>
      <Input
        className="my-2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
