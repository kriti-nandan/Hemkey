import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Optional Upstash Redis (or compatible) via REST API
const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN
const VISITOR_KEY = 'visitor_count'

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
    // Prefer Redis if configured
    if (UPSTASH_URL && UPSTASH_TOKEN) {
      // Upstash REST: GET key value
      const res = await fetch(`${UPSTASH_URL}/get/${VISITOR_KEY}`, {
        headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
        cache: 'no-store',
      })
      if (!res.ok) throw new Error(`KV GET failed: ${res.status}`)
      const data = await res.json()
      const value = typeof data.result === 'string' ? parseInt(data.result, 10) : 0
      const count = Number.isFinite(value) ? value : 0
      return NextResponse.json({ success: true, count, message: 'Visitor count retrieved successfully' })
    }

    // Fallback to file system (works locally; not persistent on serverless)
    const visitorCount = readVisitorCount()
    return NextResponse.json({ success: true, count: visitorCount, message: 'Visitor count retrieved successfully' })
  } catch (error) {
    console.error('Error reading visitor counter:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to read visitor counter', count: 0 },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Prefer Redis if configured
    if (UPSTASH_URL && UPSTASH_TOKEN) {
      // Upstash REST: INCR key
      const res = await fetch(`${UPSTASH_URL}/incr/${VISITOR_KEY}`, {
        headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
        method: 'POST',
        cache: 'no-store',
      })
      if (!res.ok) throw new Error(`KV INCR failed: ${res.status}`)
      const data = await res.json()
      const count = typeof data.result === 'number' ? data.result : parseInt(String(data.result), 10) || 0
      return NextResponse.json({ success: true, count, message: 'Visitor count incremented successfully' })
    }

    // Fallback to file
    const currentCount = readVisitorCount()
    const newCount = currentCount + 1
    writeVisitorCount(newCount)
    return NextResponse.json({ success: true, count: newCount, message: 'Visitor count incremented successfully' })
  } catch (error) {
    console.error('Error incrementing visitor counter:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to increment visitor counter',
        count: 0,
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      },
      { status: 500 }
    )
  }
}

