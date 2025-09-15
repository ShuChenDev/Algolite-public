"use client"
import { useState } from "react";

import CodeEditor from "@/components/code/code-header/code-editor/CodeEditor";
import CodeHeader from "@/components/code/code-header/CodeHeader";
import CodePromptInput from "./code-prompt-input/CodePromptInput";
import StrategyMaster from "./right-sidebar/StrategyMaster";

export default function CodeMaster({
  code,
  setCode,
  strategy_server_state,
  set_strategy_server_state,
  broker_server_state,
  set_broker_server_state,

}: {
  code: string,
  setCode: (value: string) => void;
  strategy_server_state: boolean
  set_strategy_server_state: React.Dispatch<React.SetStateAction<boolean>>
  broker_server_state: boolean
  set_broker_server_state: React.Dispatch<React.SetStateAction<boolean>>
}) {

  return (
    <>
      <div className="flex gap-2 m-2">
        <div className="flex-15">
          <CodePromptInput code={code} setCode={setCode} />
        </div>

        <div className="flex flex-15">
          <CodeHeader code={code} setCode={setCode} />
        </div>

        <div className="flex-10">
          <StrategyMaster
            code={code}
            setCode={setCode}
            strategy_server_state={strategy_server_state}
            set_strategy_server_state={set_strategy_server_state}
            broker_server_state={broker_server_state}
            set_broker_server_state={set_broker_server_state} />
        </div>

      </div>

    </>
  )
}