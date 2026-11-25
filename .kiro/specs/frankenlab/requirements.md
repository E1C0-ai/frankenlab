# FrankenLab — Kiro spec: requirements (v2, 2026-11-25 — one-stop shop simulator)

## Introduction
FrankenLab turns one line of idea into a working simulated shop App plus a procurement plan. Offline, zero dependencies, no account, no payment, no real transaction capability.

## Requirements
### Requirement 1: One-line input → operable shop
**User Story:** As a would-be shop owner, I want to type one sentence, so I get a shop I can click through.
#### Acceptance Criteria
1. WHEN the user enters an idea and clicks generate, THE SYSTEM SHALL output a shop (fictional name, menu, cart, orders, ledger, todos, procurement list).
2. WHEN the idea is empty, THE SYSTEM SHALL show a friendly message and not crash.
3. WHEN the user clicks a sample button (奶茶店 / 美甲工作室 / 少儿钢琴教室), THE SYSTEM SHALL generate the whole shop without manual input.

### Requirement 2: Shop operations
**User Story:** As a shop owner, I want to take orders and see the books, so the demo feels like a real shop.
#### Acceptance Criteria
1. WHEN a menu item is added, THE SYSTEM SHALL update the cart total.
2. WHEN an order is submitted, THE SYSTEM SHALL create an order; marking it done SHALL add its total to ledger income, cancelling SHALL not.
3. WHEN there are completed orders, THE SYSTEM SHALL show the best seller as a simple bar chart (plain DOM, no chart library).

### Requirement 3: Procurement, prices and export (no simulated purchase)
**User Story:** As a shop owner, I want a shopping list with prices, so I know what to buy and what it costs.
#### Acceptance Criteria
1. WHEN the shop is generated, THE SYSTEM SHALL list equipment with spec, quantity, new reference price and second-hand reference price, and simulated savings.
2. WHEN a price is shown, THE SYSTEM SHALL also show “价格仅模拟参考，不保证准确，不作为实际采购依据”; savings SHALL be labelled “仅为模拟估算，不是实际可拿到的优惠”.
3. WHEN the user checks items and clicks export, THE SYSTEM SHALL copy a plain-text procurement list (with Taobao/JD **search-page** links only, never direct product links).
4. THE SYSTEM SHALL NOT offer one-click purchase, fake accounts, fake order numbers, or any simulated checkout. There is no purchase flow at all.

### Requirement 4: Privacy first, local only
**User Story:** As a user, I want my data to stay on my device.
#### Acceptance Criteria
1. WHEN the app runs, THE SYSTEM SHALL make zero network requests for generation; all data lives in browser localStorage only.
2. WHEN the checkout form is shown, THE SYSTEM SHALL display “演示用，请勿填写你的真实私人手机号。姓名、电话仅保存在浏览器本地，不会发送出去。” under the inputs.
3. WHEN the user clicks reset, THE SYSTEM SHALL clear shop, orders, ledger, todos and procurement checks.

### Requirement 5: Brand filter
**User Story:** As a builder, I want fictional shop names only.
#### Acceptance Criteria
1. WHEN an idea contains a real chain brand name (e.g. 蜜雪冰城), THE SYSTEM SHALL filter it out and use a fictional shop name.

### Requirement 6: Demo must not white-screen
**User Story:** As a judge, I want the demo to degrade gracefully.
#### Acceptance Criteria
1. WHEN the kernel fails to load, THE SYSTEM SHALL show “FrankenLab 内核脚本加载失败，请刷新页面” and disable all buttons.
2. WHEN viewed at 390px width, THE SYSTEM SHALL not overflow horizontally.
