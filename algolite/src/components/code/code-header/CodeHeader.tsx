"use client"

import { useState } from "react";

import { Button } from "@/components/ui/button";
import CodeEditor from "../code-editor/CodeEditor";


export default function CodeHeader({
  code,
  setCode,
}: {
  code: string,
  setCode: (value: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<"strategy" | "position" | "chart">("strategy");

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
            onClick={() => setActiveTab("position")}
            className={`rounded-none shadow-xl flex items-center gap-2
            ${activeTab === "position" ? "bg-stone-800 text-white" : "bg-stone-600 text-stone-100"}
          `}
          >
            Position
          </Button>

          <Button
            onClick={() => setActiveTab("chart")}
            className={`rounded-none shadow-xl flex items-center gap-2
            ${activeTab === "chart" ? "bg-stone-800 text-white" : "bg-stone-600 text-stone-100"}
          `}
          >
            Chart
          </Button>
        </div>

        {/* Tab Content */}
        <div className="flex flex-1">
          {activeTab === "strategy" &&
            <CodeEditor code={code} setCode={setCode} />
          }
          {/* {activeTab === "position" && <p></p>}
          {activeTab === "chart" && <p></p>} */}
        </div>
      </div>      
    </>
  )
}