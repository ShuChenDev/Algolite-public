"use client"

import { useState } from "react";

import { Button } from "@/components/ui/button";
import CodeEditor from "./code-editor/CodeEditor";
import CodeChart from "./code-chart/CodeChart";
import CodeAccount from "./code-account/CodeAccount";


export default function CodeHeader({
  code,
  setCode,
}: {
  code: string,
  setCode: (value: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<"strategy" | "Account" | "chart">("strategy");

  return (
    <>
      <div className="flex-1 flex flex-col w-full">
        {/* Tab Buttons */}
        <div className="flex gap-0 w-full justify-start">
          <Button
            onClick={() => setActiveTab("strategy")}
            className={`rounded-none shadow-xl flex items-center gap-2
            ${activeTab === "strategy" ? "bg-stone-800 text-white" : "bg-stone-600 text-stone-100"}
          `}
          >
            Strategy
          </Button>

          <Button
            onClick={() => setActiveTab("Account")}
            className={`rounded-none shadow-xl flex items-center gap-2
            ${activeTab === "Account" ? "bg-stone-800 text-white" : "bg-stone-600 text-stone-100"}
          `}
          >
            Account
          </Button>

        </div>

        {/* Tab Content */}
        <div className="flex flex-1 border border-stone-600 rounded-2xl rounded-t-none">
          {activeTab === "strategy" &&
            <CodeEditor code={code} setCode={setCode} />
          }
          {activeTab === "Account" &&
            <CodeAccount />
          }
          {activeTab === "chart" &&
            <CodeChart />
          }
        </div>
      </div>
    </>
  )
}