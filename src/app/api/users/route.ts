import { NextResponse } from 'next/server'
import { pool } from '@/services/db'

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC')
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, avatar, role, prompt } = await request.json()
    
    const result = await pool.query(
      'INSERT INTO users (name, avatar, role, prompt) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, avatar, role, prompt]
    )
    
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}