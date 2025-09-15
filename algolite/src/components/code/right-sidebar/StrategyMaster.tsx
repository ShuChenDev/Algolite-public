"use client"

import { useState } from "react";

import { Button } from "@/components/ui/button";
import CodeEditor from "../code-header/code-editor/CodeEditor";
import StrategyConfig from "./strategy-config/StrategyConfig";
import StrategyDeployment from "./strategy-deployment/StrategyDeployment";


export default function StrategyMaster({
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

  const [activeTab, setActiveTab] = useState<"config" | "deployment" | "Setting">("deployment");

  return (
    <>
      <div className="flex-1 flex flex-col w-full h-full">
        {/* Tab Buttons */}
        <div className="flex gap-0 w-full justify-start">
          <Button
            onClick={() => setActiveTab("deployment")}
            className={`rounded-none shadow-xl flex items-center gap-2
            ${activeTab === "deployment" ? "bg-stone-800 text-white" : "bg-stone-600 text-stone-100"}
          `}
          >
            Terminal
          </Button>

          {/* <Button
            onClick={() => setActiveTab("config")}
            className={`rounded-none shadow-xl flex items-center gap-2
            ${activeTab === "config" ? "bg-stone-800 text-white" : "bg-stone-600 text-stone-100"}
          `}
          >
            Config
          </Button> */}

        </div>

        {/* Tab Content */}
        <div className="flex flex-1 border border-stone-600 rounded-2xl rounded-tl-none ">
          {activeTab === "config" &&
            <StrategyConfig />
          }
          {activeTab === "deployment" &&
            <StrategyDeployment
              code={code}
              setCode={setCode}
              strategy_server_state={strategy_server_state}
              set_strategy_server_state={set_strategy_server_state}
              broker_server_state={broker_server_state}
              set_broker_server_state={set_broker_server_state}
            />
          }
        </div>
      </div>
    </>
  )
}