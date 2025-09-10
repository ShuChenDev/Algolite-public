import { NextResponse } from "next/server";

import OpenAI from "openai";
const client = new OpenAI();

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    console.log(prompt);
    
    const response = await client.responses.create({
      model: "gpt-5",
      input: prompt
    })
  
    console.log("Response:", response.output_text);

    return NextResponse.json({
      success: true,
      code_response: response.output_text
    });
     
  }
  catch (error) {
    console.error("Error parsing request:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Invalid request"
      },
      {
        status: 400
      });
  }
}
