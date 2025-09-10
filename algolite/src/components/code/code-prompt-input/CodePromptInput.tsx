"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";


const defaultPrompt = `Please describe your trading strategy in a structured and detailed manner, you are not limited to the conditions (volume, risk management, etc) in the examples, be specific, but creative.

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
Additional Notes: Strategy should automatically pause outside the defined session window and resume the next trading day`



export default function CodePromptInput({
  code,
  setCode,
}: {
  code: string,
  setCode: (value: string) => void;
}) {

  const [prompt, setPrompt] = useState("");

  //Fetch strategy from chatgpt and render to editor
  const handlePromptSubmit = async () => {
    const res = await fetch("/api/ai/code", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    console.log("fetching from openai");

    const data = await res.json()

    if (data.success) {
      console.log("Success fetching from openai");
      console.log(data.code_response)


    }
    else {
      console.log("Failed fetching from openai");
    }

    const text = data.code_response;

    setCode("");

    //Code type writer effect, timeing need fix

    // let i = 0;
    // let newCode = "";
    // const interval = setInterval(() => {
    //   newCode += text.charAt(i);
    //   setCode(newCode);
    //   i++;
    //   if (i >= text.length) {
    //     clearInterval(interval);
    //   }
    // }, 30);

    setCode(data.code_response)
  };


  return (
    <>
      <div className="mt-10 ml-4">
        {/* <span className="text-xl p-4 font-semibold"></span> */}

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={defaultPrompt}
          className="rounded-2xl w-full h-170 mt-2 p-2 border border-black "
        />

        <Button
          variant="outline"
          onClick={handlePromptSubmit}
          className="w-full border border-black bg-stone-200 p-5 hover:bg-gray-400"
        >
          Submit
        </Button>
      </div>
    </>
  )
}