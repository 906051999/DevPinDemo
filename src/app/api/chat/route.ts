import { NextResponse } from 'next/server'
import fetch from 'node-fetch'
import { HttpsProxyAgent } from 'https-proxy-agent'

const proxyAgent = process.env.NODE_ENV === 'development' 
  ? new HttpsProxyAgent('http://127.0.0.1:7890')
  : process.env.HTTP_PROXY 
    ? new HttpsProxyAgent(process.env.HTTP_PROXY) 
    : undefined

export async function POST(req: Request) {
  try {
    const { 
      prompt,
      model = 'gemini-2.0-flash-exp',
      enableTools = false,
      streaming = false
    } = await req.json()
    
    const requestBody: any = {
      contents: [{
        parts: [{ text: prompt }]
      }]
    }

    if (enableTools) {
      requestBody.tools = [{ googleSearch: {} }]
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    }
    if (streaming) {
      headers['Accept'] = 'text/event-stream'
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:${streaming ? 'streamGenerateContent' : 'generateContent'}?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: 'POST',
        agent: proxyAgent,
        headers,
        body: JSON.stringify(requestBody)
      }
    )

    if (streaming) {
      const stream = new ReadableStream({
        async start(controller) {
          const reader = response.body?.getReader()
          if (!reader) return
          
          try {
            while (true) {
              const { done, value } = await reader.read()
              if (done) break
              controller.enqueue(value)
            }
          } finally {
            reader.releaseLock()
            controller.close()
          }
        }
      })

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      })
    }

    const result = await response.json()
    console.log('API Response:', JSON.stringify(result, null, 2))
    
    if (result.error) {
      throw new Error(result.error.message || 'API error')
    }
    
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated'
    return NextResponse.json({ text })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response：' + error },
      { status: 500 }
    )
  }
}