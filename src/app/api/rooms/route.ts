import { NextResponse } from 'next/server'
import { pool } from '@/services/db'
import { Room } from '@/types'

export async function GET() {
  try {
    const result = await pool.query<Room>('SELECT * FROM rooms ORDER BY created_at DESC')
    return NextResponse.json(result.rows || [])
  } catch (error) {
    console.error('Error fetching rooms:', error)
    return NextResponse.json([] as Room[])
  }
} 