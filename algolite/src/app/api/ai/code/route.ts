import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // make sure this is set
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const draftInstruction = `
You are given a base Strategy class in Python:

from abc import ABC, abstractmethod
from datetime import date, datetime

class Strategy(ABC):
    def __init__(self, cash=0, interval="minute", warmup_bars=0,
                 start_date=None, end_date=None,
                 start_time="09:30:00", end_time="16:00:00"):
        self.cash = cash
        self.interval = interval
        self.warmup = warmup_bars
        self.start_date = start_date or date.today()
        self.end_date = end_date
        self.start_time = datetime.strptime(start_time, "%H:%M:%S").time()
        self.end_time = datetime.strptime(end_time, "%H:%M:%S").time()

    @abstractmethod
    def initialize(self): pass

    @abstractmethod
    def on_data(self, data): pass


Task:
Generate a draft Python class named MyStrategy that extends Strategy.

Requirements:
- __init__ must call super().__init__ with sensible defaults and also call Strategy methods:
  set_cash, set_data_interval, set_warmup, set_trading_time, set_trading_date.
- initialize() must define placeholder setup (indicators, instruments, parameters) with docstrings.
- on_data(data) must contain placeholder if/else logic using example method calls:
  self.order(...), self.exit(...), self.pause_strategy().
- Only output valid Python code, no explanations.

User Strategy Description:
${prompt}
`;

    const response = await client.responses.create({
      model: "gpt-5",
      input: draftInstruction,
    });

    const code = response.output_text;

    return NextResponse.json({
      success: true,
      code_response: code,
    });
  } 
  catch (error) {
    console.error("Error calling OpenAI:", error);
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 500 }
    );
  }
}
