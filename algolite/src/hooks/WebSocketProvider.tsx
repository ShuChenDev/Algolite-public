"use client"

import { createContext, useContext, useEffect, useState } from "react"

type WSContextType = {
  logs: string[]
  isConnected: boolean
}

const WSContext = createContext<WSContextType>({
  logs: [],
  isConnected: false,
})

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useState<string[]>([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8888/ws/logs")

    ws.onopen = () => setIsConnected(true)
    
    setLogs((prev) => [...prev, "Connected to Server:"])
    ws.onmessage = (event) => setLogs((prev) => [...prev, event.data])
    ws.onclose = () => setIsConnected(false)
    ws.onerror = () => setIsConnected(false)

    return () => {
    }
  }, [])

  return (
    <WSContext.Provider value={{ logs, isConnected }}>
      {children}
    </WSContext.Provider>
  )
}

export const useWebSocketLogs = () => useContext(WSContext)
