import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const imageData = body.image;

    if (!imageData) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Remove the data URL prefix to get just the base64 data
    const base64Data = imageData.split(',')[1];

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      console.log('API key is not set');
      return NextResponse.json({ error: 'API key is not set' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Updated model name to gemini-1.5-flash
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: 'image/jpeg',
      },
    };

    const result = await model.generateContent([
      `Identify this plant and provide the following information in a structured format:
      name: [Common name of the plant]
      scientificName: [Scientific name of the plant]
      family: [Plant family]
      origin: [Geographic origin of the plant]
      uses: [Common uses of the plant]
      description: [A brief description of the plant and its characteristics]
      `,
      imagePart,
    ]);

    const responseText = result.response.text();
    console.log('Raw response text:', responseText);

    // Parse the response text into an object
    const plantInfo = parseResponseText(responseText);
    console.log('Parsed plant info:', plantInfo);

    return NextResponse.json({ result: plantInfo });
  } catch (error) {
    console.error('Detailed error in API route:', error);
    return NextResponse.json({ 
      error: 'Error processing request', 
      details: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : 'No stack trace available'
    }, { status: 500 });
  }
}

function parseResponseText(text: string): Record<string, string> {
  const lines = text.split('\n');
  const result: Record<string, string> = {};
  let currentKey = '';

  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (valueParts.length > 0) {
      currentKey = key.trim().toLowerCase();
      result[currentKey] = valueParts.join(':').trim();
    } else if (currentKey && line.trim()) {
      result[currentKey] += ' ' + line.trim();
    }
  }

  // If parsing fails, store the entire text in the description field
  if (Object.keys(result).length === 0) {
    result.description = text.trim();
  }

  return result;
}