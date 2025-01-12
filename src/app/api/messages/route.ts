import { NextResponse } from 'next/server'
import { pool } from '@/services/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const roomId = searchParams.get('room_id')

    const query = `
      SELECT messages.*, users.name as user_name, users.avatar as user_avatar 
      FROM messages 
      LEFT JOIN users ON messages.user_id = users.id 
      WHERE room_id = $1 
      ORDER BY created_at DESC 
      LIMIT 50
    `
    const result = await pool.query(query, [roomId])
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { content, room_id, user_id } = await request.json()
    
    const query = `
      INSERT INTO messages (content, room_id, user_id) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `
    const result = await pool.query(query, [content, room_id, user_id])
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error creating message:', error)
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 })
  }
} 