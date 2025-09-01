#!/usr/bin/env node

/**
 * Setup script for visitor counter environment variable
 * Run this script to set up the VISITOR_COUNT environment variable for Vercel
 */

const fs = require('fs');
const path = require('path');

// Read the current count from the JSON file
const counterFilePath = path.join(process.cwd(), 'data', 'visitor-counter.json');

try {
  if (fs.existsSync(counterFilePath)) {
    const data = JSON.parse(fs.readFileSync(counterFilePath, 'utf-8'));
    const currentCount = data.count || 0;
    
    console.log('📊 Current visitor count:', currentCount);
    console.log('');
    console.log('🔧 To set up the visitor counter on Vercel:');
    console.log('');
    console.log('1. Go to your Vercel dashboard');
    console.log('2. Navigate to your project settings');
    console.log('3. Go to the "Environment Variables" section');
    console.log('4. Add a new environment variable:');
    console.log('   - Name: VISITOR_COUNT');
    console.log(`   - Value: ${currentCount}`);
    console.log('5. Deploy your project again');
    console.log('');
    console.log('✅ This will ensure your visitor counter starts from the current count');
  } else {
    console.log('📊 No existing visitor count found');
    console.log('');
    console.log('🔧 To set up the visitor counter on Vercel:');
    console.log('');
    console.log('1. Go to your Vercel dashboard');
    console.log('2. Navigate to your project settings');
    console.log('3. Go to the "Environment Variables" section');
    console.log('4. Add a new environment variable:');
    console.log('   - Name: VISITOR_COUNT');
    console.log('   - Value: 0');
    console.log('5. Deploy your project again');
  }
} catch (error) {
  console.error('❌ Error reading visitor counter:', error.message);
  console.log('');
  console.log('🔧 Manual setup instructions:');
  console.log('');
  console.log('1. Go to your Vercel dashboard');
  console.log('2. Navigate to your project settings');
  console.log('3. Go to the "Environment Variables" section');
  console.log('4. Add a new environment variable:');
  console.log('   - Name: VISITOR_COUNT');
  console.log('   - Value: 0');
  console.log('5. Deploy your project again');
}

