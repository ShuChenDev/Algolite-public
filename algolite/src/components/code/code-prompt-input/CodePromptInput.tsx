"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react"; // spinner icon

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const promptPlaceholder = `Please describe your trading strategy in a structured and detailed manner, you are not limited to the conditions (volume, risk management, etc) in the examples, be specific, but creative.

Example:

Strategy Type: Exponential Moving Average (EMA) crossover strategy
Entry Rule: Enter a long position when EMA(9) crosses above EMA(20) and remains above for at least 3 consecutive bars
Exit Rule: Exit the position immediately if EMA(9) falls below EMA(20) or if the end of the trading session is reached
Data Interval: 1-minute candlesticks
Instrument: TSLA only
Trading Session: Between 09:30 and 16:00, with active trades restricted to 10:00–10:30
Volume Condition: Execute trades only if the average volume over the last 5 minutes is greater than 300,000 shares
Capital Allocation: Initial cash balance of $100,000
Warmup Period: Use 20 bars for warmup before activating the strategy
Risk Management: Allow a maximum of one open position at a time, with no averaging down
Additional Notes: Strategy should automatically pause outside the defined session window and resume the next trading day`;

export default function CodePromptInput({
  code,
  setCode,
}: {
  code: string;
  setCode: (value: string) => void;
}) {

  const [prompt, setPrompt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePromptSubmit = async () => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/ai/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      console.log("fetching from openai");

      const data = await res.json();

      if (data.success) {
        console.log("Success fetching from openai");
        console.log(data.code_response);
      } else {
        console.log("Failed fetching from openai");
      }

      const text = data.code_response;
      setCode(text || "");
    } catch (err) {
      console.error("Error fetching from API:", err);
    } finally {
      setIsSubmitting(false); // reset button state
    }
  };

  const presets: Record<string, string> = {
    "Golden Cross":
      `Strategy Type: Moving Average Crossover (Golden Cross)
Entry Rule: Buy when 30-day SMA crosses above 200-day SMA
Exit Rule: Sell when 30-day SMA crosses back below 200-day SMA
Instrument: AAPL
Data Interval: Daily
Risk: Max 1 open trade, stop-loss 5% below entry`,

    "RSI Strategy":
      `Strategy Type: RSI Oversold/Overbought
Entry Rule: Buy when RSI(14) < 30
Exit Rule: Sell when RSI(14) > 70
Instrument: SPY
Data Interval: 1-hour candles
Risk: Max position size = 10% of capital`,

    "Breakout":
      `Strategy Type: Range Breakout
Entry Rule: Buy if price breaks above last 20-day high with volume > 130% average
Exit Rule: Stop-loss at 3% below breakout level, or exit if breakout fails
Instrument: TSLA
Data Interval: 15-minute candles`,

    "Mean Reversion":
      `Strategy Type: Mean Reversion Bollinger Bands
Entry Rule: Buy when price closes below lower Bollinger Band (20,2)
Exit Rule: Sell when price reverts back to SMA(20)
Instrument: QQQ
Data Interval: 30-minute candles`,
  }

  return (
    <div className="ml-4 flex flex-col">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="border border-black rounded-none hover:bg-stone-800 text-white hover:text-stone-100 h-8 w-30  bg-stone-600 "
          >
            Select Presets
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-stone-100">
          <DropdownMenuLabel>Preset Prompts</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Object.entries(presets).map(([name, text]) => (
            <DropdownMenuItem
              key={name}
              onClick={() => setPrompt(text)}
              className="cursor-pointer hover:bg-gray-200"
            >
              {name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={promptPlaceholder}
        className="rounded-2xl rounded-tl-none w-full h-170 mt-0 p-2 border border-black"
      />

      <Button
        variant="outline"
        onClick={handlePromptSubmit}
        disabled={!prompt || prompt.trim().split(" ").length <= 30 || isSubmitting}
        className="mt-4 w-full border border-black bg-stone-200 p-5 hover:bg-gray-400 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            Generating... (Takes around a minute)
          </>
        ) : !prompt ? (
          "Submit"
        ) : prompt.trim().split(" ").length <= 30 ? (
          "Please add more detail about your strategy (30+ words)"
        ) : (
          "Submit"
        )}
      </Button>
    </div>
  );

}
