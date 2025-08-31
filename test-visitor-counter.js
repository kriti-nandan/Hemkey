const fetch = require('node-fetch');

async function testVisitorCounter() {
  console.log('🧪 Testing Visitor Counter API...');
  
  const baseUrl = 'http://localhost:3007'; // Adjust port if needed
  
  try {
    // Test GET request (fetch current count)
    console.log('\n📡 Testing GET /api/visitor-counter...');
    const getResponse = await fetch(`${baseUrl}/api/visitor-counter`);
    const getData = await getResponse.json();
    
    console.log('✅ GET Response:', getData);
    console.log(`Current count: ${getData.count}`);
    
    // Test POST request (increment count)
    console.log('\n📡 Testing POST /api/visitor-counter...');
    const postResponse = await fetch(`${baseUrl}/api/visitor-counter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const postData = await postResponse.json();
    
    console.log('✅ POST Response:', postData);
    console.log(`New count: ${postData.count}`);
    
    // Test GET request again to verify increment
    console.log('\n📡 Testing GET /api/visitor-counter again...');
    const getResponse2 = await fetch(`${baseUrl}/api/visitor-counter`);
    const getData2 = await getResponse2.json();
    
    console.log('✅ GET Response (after increment):', getData2);
    console.log(`Updated count: ${getData2.count}`);
    
    console.log('\n🎉 Visitor Counter API test completed successfully!');
    
  } catch (error) {
    console.error('❌ Error testing visitor counter API:', error.message);
    console.log('\n💡 Make sure the development server is running on the correct port');
  }
}

testVisitorCounter();
