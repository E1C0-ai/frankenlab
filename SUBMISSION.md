# Kiroween 2026 — Devpost 提交草稿（FrankenLab，待 eico 提交）

> 截止：2026-12-04 14:00 PT = 北京时间 2026-12-05 06:00。类别：Frankenstein。

## 项目名
FrankenLab — One line in, one working shop simulator out

## 一句话简介
Type one sentence, get a working shop you can click through — order, checkout, ledger — plus a procurement plan with price comparison and search links. All local, no account, no payment, no real transaction.

## 问题与解法
People have a shop idea but no plan: they need a ordering system and a list of equipment to buy, with new vs second-hand costs. FrankenLab turns one sentence into two things at once: ① an interactive simulated shop App (menu, cart, orders, ledger); ② a procurement plan (equipment list, new vs second-hand prices, Taobao/JD search links). Everything runs in the browser, nothing is uploaded, and it is a simulation only — there is no real transaction capability.

## 差异化（评审重点）
- **隐私优先**：全部数据仅保存在浏览器 localStorage，不上传服务器；姓名、电话只在本地，结算页明确提示请勿填写真实私人手机号。
- **开箱即用**：双击就能打开，不用注册，不用付费；3 个示例按钮一点就生成整套店铺，演示零翻车。
- **价格诚实**：采购清单每一处都写“价格仅模拟参考，不保证准确，不作为实际采购依据”；节省金额标注“仅为模拟估算，不是实际可拿到的优惠”；未核实的价格写“参考区间，未核实”。
- **没有仿交易风险**：评审后已删掉模拟一键购买、假账号、假订单号。替代做法是勾选采购项，一键复制导出采购清单文本，用户自己去电商粘贴搜索。链接只是淘宝/京东搜索页，不是具体商品链接。
- **品牌过滤**：生成的店名均为虚构，真实连锁品牌名（如蜜雪冰城）会被过滤掉。
- **未来可扩展**：结构可扩展为 Jira 原生插件 / 真实店铺系统，但当前版本刻意不接后端、不做真实交易。

## 怎么用 Kiro 做的（诚实说明）
Spec-driven development first: requirements / design / tasks were written in `.kiro/specs/frankenlab/` before the code. Steering docs set product (privacy-first, works on open), tech (zero dependencies, zero build) and structure. A hook runs the test suite on save. No MCP server was needed because generation is fully local — the MCP config is present but empty, stated honestly rather than invented.

## 技术
原生 HTML / CSS / JavaScript，零依赖，零后端。引擎 `src/app.js` 是 UMD，Node 和浏览器通用，确定性输出（同样输入两次输出相同）。测试 `node test/app.test.js` 27 个检查全过。

## 提交时要填的链接（待 eico 配合）
- [ ] GitHub 公开仓库链接：需 eico 点 GitHub 授权后新建并推送，仓库根目录必须含 `/.kiro`，不得进 `.gitignore`
- [ ] 在线演示链接：GitHub Pages
- [ ] 演示视频（< 3 分钟）：待录制，传 eico 的 YouTube 设公开；脚本见 `DEMO-VIDEO-SCRIPT.md`
- [ ] Kiro 使用说明：见 README “怎么用 Kiro 做的”一节

## 资格
官方排除名单（阿根廷、澳大利亚、白俄罗斯、巴西、克里米亚、古巴、顿涅茨克、伊朗、意大利、卢甘斯克、朝鲜、菲律宾、魁北克、俄罗斯、叙利亚、阿联酋）里没有中国，但最终以 eico 提交时 Devpost 账号 Eligibility 栏实际显示为准。奖金发放与税务由 eico 本人确认，Muse 不替他填身份/税务信息。
