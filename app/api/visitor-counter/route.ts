import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Path to the JSON file for storing visitor count
const dataPath = path.join(process.cwd(), 'data', 'visitor-counter.json')

// Function to read current count from JSON file
function readVisitorCount(): number {
  try {
    if (fs.existsSync(dataPath)) {
      const data = fs.readFileSync(dataPath, 'utf-8')
      const parsed = JSON.parse(data)
      return parsed.count || 0
    }
  } catch (error) {
    console.error('Error reading visitor count file:', error)
  }
  return 0
}

// Function to write count to JSON file
function writeVisitorCount(count: number): void {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(dataPath)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    // Write count to file
    const data = { count, lastUpdated: new Date().toISOString() }
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing visitor count file:', error)
  }
}

export async function GET() {
  try {
    const visitorCount = readVisitorCount()
    console.log('GET /api/visitor-counter - Current count:', visitorCount)
    
    return NextResponse.json({
      success: true,
      count: visitorCount,
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

export async function POST(request: NextRequest) {
  try {
    const currentCount = readVisitorCount()
    console.log('POST /api/visitor-counter - Incrementing count from:', currentCount)
    
    // Validate request
    if (!request) {
      throw new Error('Invalid request object')
    }
    
    // Increment counter
    const newCount = currentCount + 1
    
    // Save to file
    writeVisitorCount(newCount)
    
    console.log('POST /api/visitor-counter - New count:', newCount)
    
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
        error: error instanceof Error ? error.message : 'Failed to increment visitor counter',
        count: 0,
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}

