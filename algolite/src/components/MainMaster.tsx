"use client"
import { useState } from "react";

import CodePromptInput from "@/components/code/code-prompt-input/CodePromptInput";
import CodeMaster from "./code/CodeMaster";
import StrategyMaster from "./code/right-sidebar/StrategyMaster";



const defaultCode = `from Strategy import Strategy

class MyStrategy(Strategy):
    """
    User-defined trading strategy.
    Extend the base Strategy class by implementing initialization
    and data-handling logic according to your specifications.
    """

    def __init__(self, cash=100000, interval="minute", warmup_bars=20,
                 start_date=None, end_date=None,
                 start_time="09:30:00", end_time="16:00:00"):
        # Initialize base Strategy parameters
        super().__init__(cash=cash,
                         interval=interval,
                         warmup_bars=warmup_bars,
                         start_date=start_date,
                         end_date=end_date,
                         start_time=start_time,
                         end_time=end_time)

    def initialize(self):
        """
        Define your strategy’s setup here.
        For example, register indicators (EMA, RSI, Bollinger Bands),
        schedule events, or prepare instruments.
        """
        pass

    def on_data(self, data):
        """
        Core strategy logic executed on each new bar of market data.

        Args:
            data: A data object containing candlesticks, volume, and other
                  instrument information at the current interval.
        
        Example:
            - Check if EMA(9) has crossed above EMA(20)
            - Place an order if entry conditions are satisfied
            - Exit or update position when exit conditions are met
        """
        pass
`;




export default function MainMaster() {
  const [code, setCode] = useState(defaultCode);

  return (
    <>
      <CodeMaster code={code} setCode={setCode}/>
    </>
  )
}