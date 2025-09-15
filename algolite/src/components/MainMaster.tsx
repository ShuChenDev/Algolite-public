"use client"
import { useEffect, useState } from "react";

import CodeMaster from "./code/CodeMaster";
import HeaderMaster from "./header/HeaderMaster";



const defaultCode = `from Strategy import Strategy

class MyStrategy(Strategy): #Note -> You can Change Strategy Name (MyStrategy) for Reference in Account Tab 
    """
    Extend the base Strategy class by implementing initialization
    and data-handling logic according to your specifications.
    """

    def __init__(self, cash=100000, interval="minute", warmup_bars=20, start_date=None, end_date=None, start_time="09:30:00", end_time="16:00:00"):
        super(cash=cash, interval=interval, warmup_bars=warmup_bars, start_date=start_date, end_date=end_date, start_time=start_time, end_time=end_time)

    def initialize(self):
        """
        Define your strategy setup here (Add tickers, indicators, resolutions -> minute, hour, day).
        """
        pass

    def on_data(self, data):
        """
        Core strategy logic executed on each new bar of market data (triggered based on resolution).
        """
        pass
`;



export default function MainMaster() {
  const [code, setCode] = useState(defaultCode);
  const [strategy_server_state, set_strategy_server_state] = useState(false);
  const [broker_server_state, set_broker_server_state] = useState(false);


  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("http://localhost:8888/broker/status", {
          method: "GET",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) throw new Error("Server not reachable");

        const data = await res.json();

        set_strategy_server_state(true);
        set_broker_server_state(data.ib_connected);

        console.log("Algolite server status:", data);
      } catch (err) {
        set_strategy_server_state(false);
        set_broker_server_state(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <HeaderMaster
        strategy_server_state={strategy_server_state}
        set_strategy_server_state={set_strategy_server_state}
        broker_server_state={broker_server_state}
        set_broker_server_state={set_broker_server_state} />
      <CodeMaster
        code={code}
        setCode={setCode}
        strategy_server_state={strategy_server_state}
        set_strategy_server_state={set_strategy_server_state}
        broker_server_state={broker_server_state}
        set_broker_server_state={set_broker_server_state}
      />
    </>
  )
}