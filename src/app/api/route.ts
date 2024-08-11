import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    console.log('API route called')

    const formData = await req.formData()
    const image = formData.get('image') as File | null

    if (!image) {
      console.log('No image provided')
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    console.log('Image received:', image.name, 'Type:', image.type, 'Size:', image.size, 'bytes')

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY
    if (!apiKey) {
      console.log('API key is not set')
      return NextResponse.json({ error: 'API key is not set' }, { status: 500 })
    }

    console.log('API Key is set')

    const genAI = new GoogleGenerativeAI(apiKey)
    console.log('GoogleGenerativeAI instance created')

    // Update the model to gemini-1.5-flash
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    console.log('Model instance created')

    const imageData = await image.arrayBuffer()
    console.log('Image data converted to ArrayBuffer')

    const imagePart = {
      inlineData: {
        data: Buffer.from(imageData).toString('base64'),
        mimeType: image.type,
      },
    }
    console.log('Image part created')

    console.log('Sending request to Gemini API')
    const result = await model.generateContent([
      'Identify this plant and provide its name and important information.',
      imagePart,
    ])
    console.log('Received response from Gemini API')

    const responseText = result.response.text()
    console.log('Response text:', responseText)

    return NextResponse.json({ result: responseText })
  } catch (error) {
    console.error('Detailed error in API route:', error)
    return NextResponse.json({ 
      error: 'Error processing request', 
      details: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : 'No stack trace available'
    }, { status: 500 })
  }
}