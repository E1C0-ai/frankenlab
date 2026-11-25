# FrankenLab — Kiro spec: design (v2)

## Overview
One page, zero dependencies. `src/app.js` is a deterministic local engine (UMD, Node + browser): shop-type detection, fictional menus, procurement lists with new/second-hand reference prices, savings math, ledger stats, export text, brand filter. `index.html` renders the shop, cart, orders, ledger bars, todos and procurement; state persists in browser localStorage only. No backend, no network calls for generation, no payment flow.

## Key decisions
- **No simulated purchase, by design.** The review found the mock checkout to be the highest compliance risk for almost no value. The replacement is check-items → copy plain-text procurement list. The UI says so explicitly (“本项目没有一键购买、不产生真实订单、不扣款”).
- **Prices are labelled, never asserted.** Every procurement block carries the disclaimer; savings are labelled simulation estimates; unverified prices say “参考区间，未核实”.
- **Search links only.** Taobao/JD links are keyword search pages (`s.taobao.com/search`, `search.jd.com/Search`), never a specific product page.
- **Brand filter is a data rule, not a prompt.** `BANNED_BRANDS` in the engine strips real chain names from any generated shop name.
- **Privacy is a feature, not a footnote.** Name/phone inputs carry an inline warning; README and UI both state local-only storage; reset clears everything.
