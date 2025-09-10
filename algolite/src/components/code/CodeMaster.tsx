"use client"
import { useState } from "react";

import CodeEditor from "@/components/code/code-editor/CodeEditor";
import CodeHeader from "@/components/code/code-header/CodeHeader";
import CodePromptInput from "./code-prompt-input/CodePromptInput";
import StrategyMaster from "./right-sidebar/StrategyMaster";

export default function CodeMaster({
  code,
  setCode,
}: {
  code: string,
  setCode: (value: string) => void;
}) {

  return (
    <>

      <div className="flex gap-2">
        <div className="flex-2">
          <CodePromptInput code={code} setCode={setCode} />
        </div>

        <div className="flex flex-2">
          <CodeHeader code={code} setCode={setCode} />
        </div>

        <div className="flex-1">
          <StrategyMaster />
        </div>



      </div>

    </>
  )
}