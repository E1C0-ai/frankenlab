const F = require('../src/app.js');
let pass = 0, fail = 0;
function check(name, cond) { if (cond) { pass++; console.log('ok —', name); } else { fail++; console.log('FAIL —', name); } }

// Detection
check('milk tea detected', F.detectShopType('开一家奶茶店') === 'milkTea');
check('nail detected', F.detectShopType('开一家美甲工作室') === 'nail');
check('piano detected', F.detectShopType('开一家少儿钢琴教室') === 'piano');
check('unknown falls back generic', F.detectShopType('做个不知道的东西') === 'generic');

// Shop generation
const shop = F.generateShop({ idea: '开一家奶茶店' });
check('6 menu items', shop.menu.length === 6);
check('6 procurement items', shop.procurement.length === 6);
check('fictional shop name', shop.shopName === '云朵茶坊');
check('5 todos', shop.todos.length === 5);

// Brand filter — must never emit a real chain brand
check('brand filtered from name', F.filterBrandName('蜜雪冰城奶茶店') === '奶茶店' || !F.filterBrandName('蜜雪冰城奶茶店').includes('蜜雪冰城'));
check('brand filtered from idea', !F.generateShop({ idea: '开一家蜜雪冰城奶茶店' }).shopName.includes('蜜雪冰城'));
check('no banned brand in any generated shop', ['开一家奶茶店', '开一家美甲工作室', '开一家少儿钢琴教室', '开一家咖啡店', '开一家花店'].every((idea) => {
  const s = F.generateShop({ idea });
  return !F.BANNED_BRANDS.some((b) => s.shopName.includes(b));
}));

// Search links are search pages, never direct product links
check('taobao link is search page', F.searchUrl('taobao', '封口机').startsWith('https://s.taobao.com/search?q='));
check('jd link is search page', F.searchUrl('jd', '封口机').startsWith('https://search.jd.com/Search?keyword='));
check('procurement links are search pages', shop.procurement.every((p) => p.taobaoUrl.includes('s.taobao.com/search') && p.jdUrl.includes('search.jd.com/Search')));

// Savings
const sv = F.computeSavings(shop.procurement, ['p1', 'p2']);
check('savings math', sv.totalSaved === sv.totalNew - sv.totalUsed && sv.totalSaved > 0);
check('savings all items', F.computeSavings(shop.procurement, shop.procurement.map((p) => p.id)).totalSaved > 0);

// Export text carries disclaimers, no purchase / fake order
const txt = F.buildExportText(shop, shop.procurement.slice(0, 2));
check('export has price disclaimer', txt.includes('价格仅模拟参考'));
check('export marks savings as simulation', txt.includes('仅为模拟估算'));
check('export has no fake order', !txt.includes('下单成功') && !txt.includes('订单号'));
check('export has search links', txt.includes('淘宝搜索') && txt.includes('京东搜索'));

// Cart + ledger
check('cart total', F.cartTotal({ m1: 2, m2: 1 }, shop.menu).total === 18 * 2 + 16);
const orders = [
  { status: 'done', total: 100, items: [{ name: '珍珠奶茶', qty: 2 }, { name: '茉莉奶绿', qty: 1 }] },
  { status: 'cancelled', total: 50, items: [{ name: '珍珠奶茶', qty: 1 }] },
  { status: 'pending', total: 30, items: [{ name: '杨枝甘露', qty: 1 }] },
];
const st = F.ledgerStats(orders, shop.menu);
check('ledger income counts only done', st.totalIncome === 100);
check('ledger best seller', st.bestName === '珍珠奶茶' && st.best[0].qty === 2);
check('ledger counts', st.orderCount === 3 && st.doneCount === 1);

// Determinism + errors
check('empty idea throws', (() => { try { F.generateShop({ idea: '' }); return false; } catch (e) { return true; } })());
check('deterministic', JSON.stringify(F.generateShop({ idea: '开一家奶茶店' })) === JSON.stringify(F.generateShop({ idea: '开一家奶茶店' })));
check('3 samples defined', F.SAMPLES.length === 3 && F.SAMPLES.every((s) => s.idea && s.label));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
