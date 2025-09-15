"use client"

import { Button } from "@/components/ui/button"
import StrategyTerminal from "../strategy-terminal/StrategyTerminal"

export default function StrategyDeployment({
  code,
  setCode,
  strategy_server_state,
  set_strategy_server_state,
  broker_server_state,
  set_broker_server_state,
}: {
  code: string
  setCode: (value: string) => void
  strategy_server_state: boolean
  set_strategy_server_state: React.Dispatch<React.SetStateAction<boolean>>
  broker_server_state: boolean
  set_broker_server_state: React.Dispatch<React.SetStateAction<boolean>>
}) {
  // Disable if either server is not running
  const serversUp = strategy_server_state && broker_server_state

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex-1">
        <StrategyTerminal
          code={code}
          setCode={setCode}
          strategy_server_state={strategy_server_state}
          set_strategy_server_state={set_strategy_server_state}
          broker_server_state={broker_server_state}
          set_broker_server_state={set_broker_server_state}
        />
      </div>

      <div className="w-full border-t border-stone-600" />

      <div className="flex flex-col p-2 w-full gap-2">
        <Button
          disabled={!serversUp}
          className={`w-full rounded-sm border border-black p-5 
            ${serversUp ? "bg-slate-700 hover:bg-stone-900 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
          `}
        >
          Compile
        </Button>

        <Button
          disabled={!serversUp}
          className={`w-full rounded-sm border border-black p-5 
            ${serversUp ? "bg-amber-800 hover:bg-stone-900 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
          `}
        >
          Backtest
        </Button>

        <Button
          disabled={!serversUp}
          className={`w-full rounded-sm border border-black p-5 
            ${serversUp ? "bg-stone-700 hover:bg-stone-900 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
          `}
        >
          Deploy
        </Button>
      </div>
    </div>
  )
}
