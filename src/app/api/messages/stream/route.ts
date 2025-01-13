import { pool } from '@/services/db'

export const runtime = 'nodejs' // 默认是 edge runtime，但我们需要 nodejs 来支持 pg
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const roomId = searchParams.get('room_id')

  if (!roomId) {
    return new Response('Room ID is required', { status: 400 })
  }

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const client = await pool.connect()
      
      try {
        // 设置心跳以保持连接
        const heartbeat = setInterval(() => {
          controller.enqueue(encoder.encode(':\n\n'))
        }, 30000)

        // 监听新消息
        await client.query('LISTEN new_message')
        
        client.on('notification', async (msg) => {
          try {
            const payload = JSON.parse(msg.payload || '{}')
            if (payload.room_id === roomId) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`))
            }
          } catch (e) {
            console.error('Error processing message:', e)
          }
        })

        // 清理函数
        request.signal.addEventListener('abort', () => {
          clearInterval(heartbeat)
          client.query('UNLISTEN new_message')
          client.release()
          controller.close()
        })
      } catch (e) {
        client.release()
        controller.error(e)
      }
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
} 