import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// File path for storing the counter
const COUNTER_FILE_PATH = path.join(process.cwd(), 'data', 'visitor-counter.json')

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.dirname(COUNTER_FILE_PATH)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Read current counter value
async function readCounter(): Promise<number> {
  try {
    await ensureDataDirectory()
    const data = await fs.readFile(COUNTER_FILE_PATH, 'utf-8')
    const { count } = JSON.parse(data)
    return count || 0
  } catch (error) {
    // If file doesn't exist or is invalid, start from 0
    return 0
  }
}

// Write counter value
async function writeCounter(count: number): Promise<void> {
  await ensureDataDirectory()
  await fs.writeFile(COUNTER_FILE_PATH, JSON.stringify({ count, lastUpdated: new Date().toISOString() }))
}

export async function GET() {
  try {
    const currentCount = await readCounter()
    
    return NextResponse.json({
      success: true,
      count: currentCount,
      message: 'Visitor count retrieved successfully'
    })
  } catch (error) {
    console.error('Error reading visitor counter:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to read visitor counter',
        count: 0 
      },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    const currentCount = await readCounter()
    const newCount = currentCount + 1
    
    await writeCounter(newCount)
    
    return NextResponse.json({
      success: true,
      count: newCount,
      message: 'Visitor count incremented successfully'
    })
  } catch (error) {
    console.error('Error incrementing visitor counter:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to increment visitor counter',
        count: 0 
      },
      { status: 500 }
    )
  }
}

