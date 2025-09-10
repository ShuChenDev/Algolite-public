
"use client"

import { Editor } from "@monaco-editor/react"
import { useState } from "react";

export default function CodeEditor({
  code,
  setCode,
}: {
  code: string,
  setCode: (value: string) => void;
}) {


  const handleEditorChange = (value: string | undefined) => {
    console.log(value);
    setCode(value || "");
  };

  return (
    <>
        <Editor
          language="python"
          theme="vs-dark"
          onChange={handleEditorChange}
          value={code}
        />

    </>
  )
}