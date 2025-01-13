import { NextResponse } from 'next/server'
import { pool } from '@/services/db'
import { Room } from '@/types'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const result = await pool.query<Room>(
      'UPDATE rooms SET name = $1 WHERE id = $2 RETURNING *',
      [data.name, params.id]
    )
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error updating room:', error)
    return NextResponse.json({ error: 'Failed to update room' }, { status: 500 })
  }
} 