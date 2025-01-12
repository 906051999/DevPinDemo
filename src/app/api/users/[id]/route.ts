import { NextResponse } from 'next/server'
import { pool } from '@/services/db'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { name, avatar, role, prompt } = await request.json()
    
    const result = await pool.query(
      'UPDATE users SET name = $1, avatar = $2, role = $3, prompt = $4 WHERE id = $5 RETURNING *',
      [name, avatar, role, prompt, id]
    )
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
} 