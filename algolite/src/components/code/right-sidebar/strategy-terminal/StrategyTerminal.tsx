"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useWebSocketLogs } from "@/hooks/WebSocketProvider"

export default function StrategyTerminal({
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
  const { logs, isConnected } = useWebSocketLogs()

  
  return (
    <div className="p-2 h-full">
      {strategy_server_state ? (
        <div className="bg-black text-white font-mono rounded-md h-140 overflow-auto p-3 overflow-y-auto">
          <ul className="space-y-0">
            {logs.map((log, i) => (
              <li key={i} className="flex w-full text-sm">
                {log}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-gray-200 rounded-md min-h-15 p-4">
          <div className="flex flex-col gap-4 text-gray-800">
            <p className="leading-relaxed">
              ⚠️ <span className="font-semibold">Local Strategy Server not detected.</span>
              <br />
              Please download and run the latest release of the Strategy Server to enable browser development.
              <br />
              Make sure port{" "}
              <code className="bg-gray-300 px-1 py-0.5 rounded text-sm">
                127.0.0.1:8888
              </code>{" "}
              is not blocked by other applications.
            </p>

            <Button
              variant="outline"
              className="flex items-center gap-2 shadow-md w-fit"
              asChild
            >
              <Link
                href="https://github.com/ShuChenDev/Algolite-public/releases"
                target="_blank"
                rel="noopener noreferrer"
              >
                📥 Download Strategy Server
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
