// Test bestsellers functionality
const API_URL = 'http://localhost:5000';

async function testBestsellersFlow() {
  console.log('\n' + '='.repeat(70));
  console.log('BESTSELLERS FUNCTIONALITY TEST');
  console.log('='.repeat(70));

  // Step 1: Check all products
  console.log('\n📦 STEP 1: Fetching all products');
  console.log('-'.repeat(70));

  try {
    const response = await fetch(`${API_URL}/api/products`);
    const data = await response.json();

    if (data.success && data.data) {
      console.log(`✅ Found ${data.data.length} total products`);

      // Check which products have isBestseller flag
      const bestsellers = data.data.filter(p => p.isBestseller === true);
      console.log(`📌 Products marked as bestsellers: ${bestsellers.length}`);

      if (bestsellers.length > 0) {
        console.log('\nBestseller products:');
        bestsellers.forEach(p => {
          console.log(`  • ${p.name} (ID: ${p._id})`);
        });
      } else {
        console.log('⚠️  No products are currently marked as bestsellers');
        console.log('   Go to Admin Dashboard → Bestsellers to select products');
      }

      // Show first 3 products for reference
      console.log('\nFirst 3 products in database:');
      data.data.slice(0, 3).forEach(p => {
        console.log(`  • ${p.name}`);
        console.log(`    - ID: ${p._id}`);
        console.log(`    - isBestseller: ${p.isBestseller || false}`);
        console.log(`    - Price: $${p.price}`);
      });
    }
  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
  }

  // Step 2: Test bestsellers endpoint
  console.log('\n🌟 STEP 2: Testing bestsellers endpoint');
  console.log('-'.repeat(70));

  try {
    const response = await fetch(`${API_URL}/api/products?isBestseller=true&limit=6`);
    const data = await response.json();

    console.log('API Response:', JSON.stringify(data, null, 2));

    if (data.success) {
      if (data.data && data.data.length > 0) {
        console.log(`✅ Bestsellers endpoint returned ${data.data.length} products`);
        console.log('\nProducts that will show on homepage:');
        data.data.forEach((p, i) => {
          console.log(`  ${i + 1}. ${p.name} - $${p.price}`);
        });
      } else {
        console.log('⚠️  Bestsellers endpoint returned 0 products');
        console.log('   This means no products are marked as bestsellers yet');
      }
    }
  } catch (error) {
    console.error('❌ Error fetching bestsellers:', error.message);
  }

  // Step 3: Summary and next steps
  console.log('\n' + '='.repeat(70));
  console.log('SUMMARY & NEXT STEPS');
  console.log('='.repeat(70));
  console.log('\n1. Go to: http://localhost:5173/admin');
  console.log('2. Click on "Bestsellers" in the sidebar');
  console.log('3. Select which products should appear as bestsellers');
  console.log('4. Click "Save Bestsellers"');
  console.log('5. Go to the homepage to see them displayed');
  console.log('\nNote: The homepage will only show products marked as bestsellers.');
  console.log('='.repeat(70) + '\n');
}

testBestsellersFlow();
