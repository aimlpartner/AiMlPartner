const { GoogleGenAI } = require('@google/genai');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("API Key loaded:", !!apiKey);
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing in env");
    return;
  }
  const ai = new GoogleGenAI({ apiKey });
  
  console.log("Sending request to gemini-2.5-flash...");
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: 'Hello, what is 2+2? Response in JSON: {"result": 4}',
    config: {
      responseMimeType: 'application/json'
    }
  });
  
  console.log("response.usageMetadata:", response.usageMetadata);
  console.log("All response keys:", Object.keys(response));
}

run().catch(console.error);
