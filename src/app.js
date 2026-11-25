// FrankenLab core engine — Kiroween 2026, Frankenstein category.
// One line in, one operable simulated shop App out.
// Local deterministic rules only — no network, no API key, no model call.
// All computation in the browser; nothing is uploaded anywhere.
// No real transaction capability: there is no checkout to a real store,
// no payment, no real order. The procurement "export" only copies text.
//
// Shop types, menus and procurement lists are fictional templates.
// Real chain brand names are filtered out (see BANNED_BRANDS).

const BANNED_BRANDS = [
  '蜜雪冰城', '喜茶', '奈雪', '奈雪的茶', '瑞幸', '星巴克', '海底捞',
  '肯德基', '麦当劳', 'COCO', '一点点', '古茗', '茶百道', '沪上阿姨',
  '霸王茶姬', 'Manner', 'Tim Hortons', 'Costa', '必胜客', 'DQ',
];

function filterBrandName(name) {
  let out = String(name || '');
  for (const b of BANNED_BRANDS) {
    if (out.includes(b)) out = out.split(b).join('');
  }
  out = out.replace(/\s+/g, '').trim();
  return out || '一句话小店';
}

function searchUrl(platform, keyword) {
  const q = encodeURIComponent(keyword);
  if (platform === 'jd') return `https://search.jd.com/Search?keyword=${q}`;
  return `https://s.taobao.com/search?q=${q}`;
}

const SHOP_TYPES = {
  milkTea: {
    label: '奶茶店',
    shopName: '云朵茶坊',
    slogan: '一杯现做奶茶，从一句话开始。',
    keywords: ['奶茶', '饮品', '茶饮', '珍珠', '茶坊', '茶店'],
    menu: [
      { id: 'm1', name: '珍珠奶茶', price: 18 },
      { id: 'm2', name: '茉莉奶绿', price: 16 },
      { id: 'm3', name: '杨枝甘露', price: 22 },
      { id: 'm4', name: '红豆奶茶', price: 19 },
      { id: 'm5', name: '鲜柠檬茶', price: 15 },
      { id: 'm6', name: '椰果奶茶', price: 20 },
    ],
    procurement: [
      { id: 'p1', name: '手动封口机', spec: '220V 手动', qty: 1, newPrice: 500, usedPrice: 280, keyword: '手动封口机', priceNote: '公开文章参考区间 350–650元，来源 shangwuda.com / cy765.com' },
      { id: 'p2', name: '自动封口机', spec: '全自动', qty: 1, newPrice: 7200, usedPrice: 4500, keyword: '自动封口机', priceNote: '公开文章参考区间 6500–7800元，来源 shangwuda.com / cy765.com' },
      { id: 'p3', name: '制冰机', spec: '日产约 60kg', qty: 1, newPrice: 7200, usedPrice: 4800, keyword: '制冰机 60kg', priceNote: '公开文章参考区间 3000–8000元，来源 shangwuda.com / cy765.com' },
      { id: 'p4', name: '收银系统', spec: '含收银机+扫码', qty: 1, newPrice: 3500, usedPrice: 1800, keyword: '奶茶收银系统', priceNote: '参考区间，未核实' },
      { id: 'p5', name: '水吧操作台', spec: '不锈钢 1.5米', qty: 1, newPrice: 1800, usedPrice: 900, keyword: '水吧操作台', priceNote: '参考区间，未核实' },
      { id: 'p6', name: '净水器', spec: '商用', qty: 1, newPrice: 1200, usedPrice: 600, keyword: '商用净水器', priceNote: '参考区间，未核实' },
    ],
    todos: ['定店名和菜单价格', '找铺位并谈租金', '买封口机和制冰机', '办营业执照和食品经营许可', '开业前试营业三天'],
  },
  nail: {
    label: '美甲工作室',
    shopName: '指尖花园美甲工作室',
    slogan: '指尖上的小花园，一次做好。',
    keywords: ['美甲', '美睫', '美容', '指甲'],
    menu: [
      { id: 'm1', name: '单色美甲', price: 88 },
      { id: 'm2', name: '法式美甲', price: 128 },
      { id: 'm3', name: '渐变美甲', price: 108 },
      { id: 'm4', name: '手部护理', price: 68 },
      { id: 'm5', name: '卸甲', price: 38 },
      { id: 'm6', name: '延长甲', price: 158 },
    ],
    procurement: [
      { id: 'p1', name: '美甲打磨机', spec: '可调速', qty: 1, newPrice: 90, usedPrice: 45, keyword: '美甲打磨机', priceNote: '批发参考区间 63–110元，来源 yiwugo.com' },
      { id: 'p2', name: '美甲灯', spec: 'LED 光疗灯', qty: 2, newPrice: 80, usedPrice: 40, keyword: '美甲灯 LED', priceNote: '批发参考区间 13–145元，来源 yiwugo.com' },
      { id: 'p3', name: '美甲桌椅套装', spec: '1桌2椅', qty: 1, newPrice: 1200, usedPrice: 600, keyword: '美甲桌椅', priceNote: '参考区间，未核实' },
      { id: 'p4', name: '紫外线消毒柜', spec: '小型', qty: 1, newPrice: 800, usedPrice: 400, keyword: '紫外线消毒柜 美甲', priceNote: '参考区间，未核实' },
      { id: 'p5', name: '美甲胶套装', spec: '36色', qty: 1, newPrice: 600, usedPrice: 300, keyword: '美甲胶 套装', priceNote: '参考区间，未核实' },
      { id: 'p6', name: '展示架', spec: '色板展示架', qty: 1, newPrice: 400, usedPrice: 200, keyword: '美甲展示架', priceNote: '参考区间，未核实' },
    ],
    todos: ['定服务价目表', '买打磨机和美甲灯', '布置工作台和消毒区', '拍作品图做价目册', '开业前找 3 位体验顾客'],
  },
  piano: {
    label: '少儿钢琴教室',
    shopName: '小星星钢琴教室',
    slogan: '第一堂课，就弹出一首小星星。',
    keywords: ['钢琴', '音乐课', '少儿', '教室', '培训', '课程', '琴行'],
    menu: [
      { id: 'm1', name: '钢琴体验课', price: 120 },
      { id: 'm2', name: '少儿钢琴一对一', price: 200 },
      { id: 'm3', name: '成人钢琴课', price: 180 },
      { id: 'm4', name: '乐理课', price: 100 },
      { id: 'm5', name: '陪练课', price: 90 },
      { id: 'm6', name: '考级集训', price: 300 },
    ],
    procurement: [
      { id: 'p1', name: '电钢琴', spec: '88键', qty: 2, newPrice: 5000, usedPrice: 3000, keyword: '电钢琴 88键', priceNote: '参考区间，未核实' },
      { id: 'p2', name: '钢琴凳', spec: '可升降', qty: 2, newPrice: 300, usedPrice: 150, keyword: '钢琴凳', priceNote: '参考区间，未核实' },
      { id: 'p3', name: '乐谱架', spec: '折叠', qty: 2, newPrice: 150, usedPrice: 80, keyword: '乐谱架', priceNote: '参考区间，未核实' },
      { id: 'p4', name: '教室白板', spec: '1.2米', qty: 1, newPrice: 600, usedPrice: 300, keyword: '教室白板', priceNote: '参考区间，未核实' },
      { id: 'p5', name: '节拍器', spec: '电子', qty: 2, newPrice: 120, usedPrice: 60, keyword: '节拍器 电子', priceNote: '参考区间，未核实' },
      { id: 'p6', name: '隔音棉', spec: '墙面用', qty: 1, newPrice: 2000, usedPrice: 1200, keyword: '隔音棉', priceNote: '参考区间，未核实' },
    ],
    todos: ['定课程表和收费', '买电钢琴和乐谱架', '布置教室和隔音', '写一份试听课流程', '找 3 位学生试上体验课'],
  },
  coffee: {
    label: '咖啡店',
    shopName: '晨光咖啡小馆',
    slogan: '早上第一杯，自己说了算。',
    keywords: ['咖啡', '咖啡店', '咖啡馆'],
    menu: [
      { id: 'm1', name: '美式咖啡', price: 22 },
      { id: 'm2', name: '拿铁', price: 28 },
      { id: 'm3', name: '卡布奇诺', price: 26 },
      { id: 'm4', name: '摩卡', price: 30 },
      { id: 'm5', name: '冷萃咖啡', price: 32 },
      { id: 'm6', name: '燕麦拿铁', price: 30 },
    ],
    procurement: [
      { id: 'p1', name: '半自动咖啡机', spec: '商用', qty: 1, newPrice: 8000, usedPrice: 5000, keyword: '半自动咖啡机', priceNote: '参考区间，未核实' },
      { id: 'p2', name: '磨豆机', spec: '电动', qty: 1, newPrice: 1500, usedPrice: 800, keyword: '磨豆机', priceNote: '参考区间，未核实' },
      { id: 'p3', name: '冰箱', spec: '冷藏', qty: 1, newPrice: 3000, usedPrice: 1800, keyword: '商用冰箱', priceNote: '参考区间，未核实' },
      { id: 'p4', name: '咖啡杯套装', spec: '陶瓷 12只', qty: 1, newPrice: 500, usedPrice: 250, keyword: '咖啡杯 套装', priceNote: '参考区间，未核实' },
      { id: 'p5', name: '收银系统', spec: '含收银机+扫码', qty: 1, newPrice: 3000, usedPrice: 1500, keyword: '咖啡收银系统', priceNote: '参考区间，未核实' },
      { id: 'p6', name: '操作台', spec: '不锈钢', qty: 1, newPrice: 2000, usedPrice: 1000, keyword: '咖啡操作台', priceNote: '参考区间，未核实' },
    ],
    todos: ['定菜单和价格', '买咖啡机和磨豆机', '找铺位并谈租金', '办营业执照', '开业前试营业三天'],
  },
  flower: {
    label: '花店',
    shopName: '花开小筑',
    slogan: '一束花，就是一句没说出口的话。',
    keywords: ['花店', '鲜花', '花艺', '花束'],
    menu: [
      { id: 'm1', name: '玫瑰花束', price: 99 },
      { id: 'm2', name: '向日葵花束', price: 79 },
      { id: 'm3', name: '满天星花束', price: 59 },
      { id: 'm4', name: '绿植盆栽', price: 49 },
      { id: 'm5', name: '开业花篮', price: 199 },
      { id: 'm6', name: '干花礼盒', price: 89 },
    ],
    procurement: [
      { id: 'p1', name: '冷藏展示柜', spec: '鲜花保鲜', qty: 1, newPrice: 4000, usedPrice: 2500, keyword: '鲜花冷藏展示柜', priceNote: '参考区间，未核实' },
      { id: 'p2', name: '花艺剪刀套装', spec: '专业', qty: 1, newPrice: 200, usedPrice: 100, keyword: '花艺剪刀', priceNote: '参考区间，未核实' },
      { id: 'p3', name: '包装纸/花篮材料', spec: '一批', qty: 1, newPrice: 800, usedPrice: 400, keyword: '花束包装纸', priceNote: '参考区间，未核实' },
      { id: 'p4', name: '工作台', spec: '1.5米', qty: 1, newPrice: 1500, usedPrice: 800, keyword: '花艺工作台', priceNote: '参考区间，未核实' },
      { id: 'p5', name: '保鲜剂/营养液', spec: '一批', qty: 1, newPrice: 300, usedPrice: 150, keyword: '鲜花保鲜剂', priceNote: '参考区间，未核实' },
      { id: 'p6', name: '展示架', spec: '多层', qty: 1, newPrice: 600, usedPrice: 300, keyword: '花店展示架', priceNote: '参考区间，未核实' },
    ],
    todos: ['定花束价目表', '找花材供应商', '买冷藏柜和工作台', '拍花束样品图', '开业前做 3 束样品'],
  },
  pet: {
    label: '宠物店',
    shopName: '毛孩子小铺',
    slogan: '洗一次澡，就多一个朋友。',
    keywords: ['宠物', '猫', '狗', '宠物店'],
    menu: [
      { id: 'm1', name: '宠物洗澡', price: 68 },
      { id: 'm2', name: '宠物剪毛', price: 98 },
      { id: 'm3', name: '宠物寄养（一天）', price: 88 },
      { id: 'm4', name: '宠物零食礼包', price: 59 },
      { id: 'm5', name: '宠物体检', price: 120 },
      { id: 'm6', name: '宠物写真', price: 199 },
    ],
    procurement: [
      { id: 'p1', name: '宠物洗澡台', spec: '不锈钢', qty: 1, newPrice: 2000, usedPrice: 1200, keyword: '宠物洗澡台', priceNote: '参考区间，未核实' },
      { id: 'p2', name: '宠物吹水机', spec: '大功率', qty: 1, newPrice: 800, usedPrice: 400, keyword: '宠物吹水机', priceNote: '参考区间，未核实' },
      { id: 'p3', name: '宠物美容剪刀套装', spec: '专业', qty: 1, newPrice: 500, usedPrice: 250, keyword: '宠物美容剪刀', priceNote: '参考区间，未核实' },
      { id: 'p4', name: '宠物笼', spec: '中号', qty: 4, newPrice: 400, usedPrice: 200, keyword: '宠物笼', priceNote: '参考区间，未核实' },
      { id: 'p5', name: '宠物食品架', spec: '多层', qty: 1, newPrice: 600, usedPrice: 300, keyword: '宠物食品架', priceNote: '参考区间，未核实' },
      { id: 'p6', name: '消毒柜', spec: '小型', qty: 1, newPrice: 800, usedPrice: 400, keyword: '消毒柜 宠物', priceNote: '参考区间，未核实' },
    ],
    todos: ['定服务价目表', '买洗澡台和吹水机', '布置美容区和寄养区', '找宠物食品供应商', '开业前找 3 只宠物体验'],
  },
  generic: {
    label: '通用服务店',
    shopName: '一句话小店',
    slogan: '一句话，就是一家店的开始。',
    keywords: [],
    menu: [
      { id: 'm1', name: '基础服务', price: 99 },
      { id: 'm2', name: '进阶服务', price: 199 },
      { id: 'm3', name: '体验服务', price: 59 },
      { id: 'm4', name: '会员服务', price: 299 },
      { id: 'm5', name: '定制服务', price: 159 },
      { id: 'm6', name: '咨询服务', price: 49 },
    ],
    procurement: [
      { id: 'p1', name: '收银系统', spec: '含收银机+扫码', qty: 1, newPrice: 3000, usedPrice: 1500, keyword: '收银系统', priceNote: '参考区间，未核实' },
      { id: 'p2', name: '展示架', spec: '多层', qty: 1, newPrice: 600, usedPrice: 300, keyword: '展示架', priceNote: '参考区间，未核实' },
      { id: 'p3', name: '工作台', spec: '1.5米', qty: 1, newPrice: 1500, usedPrice: 800, keyword: '工作台', priceNote: '参考区间，未核实' },
      { id: 'p4', name: '办公椅', spec: '可调节', qty: 2, newPrice: 800, usedPrice: 400, keyword: '办公椅', priceNote: '参考区间，未核实' },
      { id: 'p5', name: '宣传物料', spec: '一批', qty: 1, newPrice: 500, usedPrice: 250, keyword: '宣传物料 定制', priceNote: '参考区间，未核实' },
      { id: 'p6', name: '工具套装', spec: '常用', qty: 1, newPrice: 1000, usedPrice: 500, keyword: '工具套装', priceNote: '参考区间，未核实' },
    ],
    todos: ['定服务价目表', '找铺位并谈租金', '买齐开店设备', '办营业执照', '开业前试营业三天'],
  },
};

const SAMPLES = [
  { label: '开一家奶茶店', idea: '开一家奶茶店' },
  { label: '美甲工作室', idea: '开一家美甲工作室' },
  { label: '少儿钢琴教室', idea: '开一家少儿钢琴教室' },
];

function detectShopType(idea) {
  const text = String(idea || '');
  for (const [key, t] of Object.entries(SHOP_TYPES)) {
    if (key === 'generic') continue;
    if (t.keywords.some((k) => text.includes(k))) return key;
  }
  return 'generic';
}

function generateShop(input) {
  const idea = (input && input.idea || '').trim();
  if (!idea) throw new Error('idea is required');
  const type = detectShopType(idea);
  const t = SHOP_TYPES[type];
  // Brand filter: strip any real chain brand name from the idea before
  // it can leak into the shop name; always use the fictional template name.
  const cleanIdea = filterBrandName(idea);
  const shopName = filterBrandName(t.shopName);
  const procurement = t.procurement.map((p) => ({
    ...p,
    taobaoUrl: searchUrl('taobao', p.keyword),
    jdUrl: searchUrl('jd', p.keyword),
    saved: (p.newPrice - p.usedPrice) * p.qty,
  }));
  return {
    idea: cleanIdea,
    type,
    typeLabel: t.label,
    shopName,
    slogan: t.slogan,
    menu: t.menu.map((m) => ({ ...m })),
    procurement,
    todos: t.todos.slice(),
  };
}

function cartTotal(cart, menu) {
  const byId = Object.fromEntries(menu.map((m) => [m.id, m]));
  let total = 0;
  let count = 0;
  for (const [id, qty] of Object.entries(cart || {})) {
    if (!byId[id] || !qty) continue;
    total += byId[id].price * qty;
    count += qty;
  }
  return { total, count };
}

function ledgerStats(orders, menu) {
  const done = (orders || []).filter((o) => o.status === 'done');
  const totalIncome = done.reduce((s, o) => s + (o.total || 0), 0);
  const byItem = {};
  for (const o of done) {
    for (const it of (o.items || [])) {
      byItem[it.name] = (byItem[it.name] || 0) + it.qty;
    }
  }
  const best = Object.entries(byItem)
    .map(([name, qty]) => ({ name, qty }))
    .sort((a, b) => b.qty - a.qty);
  return { totalIncome, orderCount: (orders || []).length, doneCount: done.length, best, bestName: best.length ? best[0].name : '暂无' };
}

function computeSavings(procurement, checkedIds) {
  const checked = new Set(checkedIds || []);
  const items = (procurement || []).filter((p) => checked.has(p.id));
  const totalNew = items.reduce((s, p) => s + p.newPrice * p.qty, 0);
  const totalUsed = items.reduce((s, p) => s + p.usedPrice * p.qty, 0);
  return { items, totalNew, totalUsed, totalSaved: totalNew - totalUsed };
}

function buildExportText(shop, checkedItems) {
  const lines = [
    `${shop.shopName}（${shop.typeLabel}）采购清单`,
    '价格仅模拟参考，不保证准确，不作为实际采购依据。节省金额仅为模拟估算，不是实际可拿到的优惠。',
    '',
  ];
  const items = checkedItems && checkedItems.length ? checkedItems : (shop.procurement || []);
  for (const p of items) {
    lines.push(`- ${p.name}（${p.spec}）×${p.qty}：新品参考价 ${p.newPrice}元 / 平替参考价 ${p.usedPrice}元，模拟节省 ${(p.newPrice - p.usedPrice) * p.qty}元`);
    lines.push(`  淘宝搜索：${searchUrl('taobao', p.keyword)}`);
    lines.push(`  京东搜索：${searchUrl('jd', p.keyword)}`);
    lines.push(`  价格说明：${p.priceNote || '参考区间，未核实'}`);
  }
  const s = computeSavings(shop.procurement, items.map((i) => i.id));
  lines.push('', `合计：新品参考价 ${s.totalNew}元 / 平替参考价 ${s.totalUsed}元 / 模拟节省 ${s.totalSaved}元（仅为模拟估算）`);
  lines.push('本清单仅为黑客松模拟演示，无真实交易能力。');
  return lines.join('\n');
}

const FrankenLab = {
  generateShop, detectShopType, filterBrandName, searchUrl,
  cartTotal, ledgerStats, computeSavings, buildExportText,
  SAMPLES, SHOP_TYPES, BANNED_BRANDS,
};
if (typeof module !== 'undefined' && module.exports) module.exports = FrankenLab;
if (typeof window !== 'undefined') window.FrankenLab = FrankenLab;
