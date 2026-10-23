/**
 * TEST SUITE: HiHi Bamhuyet (bamhuyet)
 * Kiểm thử độ ổn định & cấu hình bảo mật
 */

const fs = require('fs');
const path = require('path');

const results = [];
function recordResult(name, passed, details) {
  results.push({ name, passed, details });
  const mark = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${mark} | ${name}`);
  if (details) console.log(`   └─ ${details}`);
}

async function runTests() {
  console.log('====================================================');
  console.log('🧪 BẮT ĐẦU KIỂM THỬ DỰ ÁN: bamhuyet (HiHi Bamhuyet)');
  console.log('====================================================\n');

  const dir = __dirname;
  const indexPath = path.join(dir, 'index.html');
  const swPath = path.join(dir, 'sw.js');
  const rulesPath = path.join(dir, 'firestore.rules');

  // TEST 1: Cấu trúc file
  try {
    const hasIndex = fs.existsSync(indexPath);
    const hasSw = fs.existsSync(swPath);
    const hasRules = fs.existsSync(rulesPath);
    recordResult('1. Cấu trúc file cơ bản & Security Rules', hasIndex && hasSw && hasRules, `index: ${hasIndex}, sw: ${hasSw}, rules: ${hasRules}`);
  } catch (e) {
    recordResult('1. Cấu trúc file cơ bản & Security Rules', false, e.message);
  }

  const html = fs.readFileSync(indexPath, 'utf8');

  // TEST 2: Kiểm tra lỗi escape literal \n trong HTML
  try {
    const hasLiteralSlashN = html.includes('</a>\\n');
    recordResult('2. Kiểm tra lỗi escape literal \\n trong HTML', !hasLiteralSlashN, !hasLiteralSlashN ? 'HTML sạch sẽ, không có lỗi chuỗi escape' : 'Phát hiện literal "\\n" trong mã HTML');
  } catch (e) {
    recordResult('2. Kiểm tra lỗi escape literal \\n trong HTML', false, e.message);
  }

  // TEST 3: Cô lập vùng nhớ cache Service Worker
  try {
    const sw = fs.readFileSync(swPath, 'utf8');
    const hasUniqueCache = sw.includes('hihi-bamhuyet-');
    const hasScopedDelete = sw.includes('CACHE_PREFIX') || sw.includes('hihi-bamhuyet-');
    recordResult('3. Cô lập vùng nhớ Cache Service Worker', hasUniqueCache && hasScopedDelete, `Cache name: ${hasUniqueCache}, Scoped delete: ${hasScopedDelete}`);
  } catch (e) {
    recordResult('3. Cô lập vùng nhớ Cache Service Worker', false, e.message);
  }

  // TEST 4: Bảo mật Firestore Security Rules
  try {
    const rules = fs.readFileSync(rulesPath, 'utf8');
    const hasAuthCheck = rules.includes('request.auth != null');
    const hasUidCheck = rules.includes('request.auth.uid');
    recordResult('4. Cấu hình bảo vệ dữ liệu Firestore Security Rules', hasAuthCheck && hasUidCheck, `Auth: ${hasAuthCheck}, Uid check: ${hasUidCheck}`);
  } catch (e) {
    recordResult('4. Cấu hình bảo vệ dữ liệu Firestore', false, e.message);
  }

  const passedCount = results.filter(r => r.passed).length;
  console.log('\n====================================================');
  console.log(`📊 KẾT QUẢ KIỂM THỬ: ${passedCount}/${results.length} bài test vượt qua`);
  console.log('====================================================\n');
}

runTests();
