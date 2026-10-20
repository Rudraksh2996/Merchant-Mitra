# 🤝 Merchant Mitra

<div align="center">

![Merchant Mitra Banner](https://img.shields.io/badge/Merchant%20Mitra-UPI%20MDR%20Optimizer-06b6d4?style=for-the-badge&logo=shield&logoColor=white)
<br/>

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

<p align="center">
  <strong>Empowering local businesses by eliminating UPI merchant discount fees, one split payment at a time.</strong>
</p>

[Live Demo](#-getting-started) • [Core Problem](#-the-problem-why-merchant-mitra-exists) • [Split Engine](#-split-logic-engine) • [Key Features](#-comprehensive-features) • [Architecture](#-architecture--project-structure) • [Setup Guide](#-getting-started)

</div>

---

## 📖 Table of Contents

- [💡 The Problem: Why Merchant Mitra Exists](#-the-problem-why-merchant-mitra-exists)
- [⚡ How It Works](#-how-it-works)
- [✨ Comprehensive Features](#-comprehensive-features)
  - [1. Smart Mathematical Split Engine](#1-smart-mathematical-split-engine)
  - [2. Winterfell.dev Inspired Dual-Theme Design](#2-winterfelldev-inspired-dual-theme-design)
  - [3. Mobile-First & Touch-Native UX](#3-mobile-first--touch-native-ux)
  - [4. Seamless UPI Integration (Deep Links & QR)](#4-seamless-upi-integration-deep-links--qr)
  - [5. Native Web Share & Proof of Payment](#5-native-web-share--proof-of-payment)
- [🧠 Split Logic Engine (Technical Deep Dive)](#-split-logic-engine-technical-deep-dive)
- [🏗️ Architecture & Project Structure](#️-architecture--project-structure)
- [🛠️ Tech Stack & Key Libraries](#️-tech-stack--key-libraries)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Local Development](#installation--local-development)
  - [Production Build](#production-build)
- [📱 Mobile Device Testing](#-mobile-device-testing)
- [⚖️ Legal Concept & Disclaimer](#️-legal-concept--disclaimer)
- [📄 License](#-license)

---

## 💡 The Problem: Why Merchant Mitra Exists

In India's Unified Payments Interface (UPI) ecosystem, regulatory frameworks and interchange guidelines issued by NPCI designate transaction fee tiers for **Person-to-Merchant (P2M)** transactions. For higher-value transactions—specifically those exceeding the **₹2,000 threshold** processed through certain Prepaid Payment Instruments (PPI) and merchant categories—merchants can incur **Merchant Discount Rate (MDR) or interchange fees of up to ~0.4% or higher**.

For small and medium neighborhood retailers (Kirana stores, electronics vendors, small clinics, service providers), these transaction fees cut directly into tight retail profit margins:

| Transaction Amount | Typical MDR Rate (0.4%) | Fee Deducted From Merchant | Merchant Receives |
| :--- | :--- | :--- | :--- |
| **₹2,500** | 0.40% | **₹10.00** | ₹2,490.00 |
| **₹5,000** | 0.40% | **₹20.00** | ₹4,980.00 |
| **₹10,000** | 0.40% | **₹40.00** | ₹9,960.00 |
| **₹25,000** | 0.40% | **₹100.00** | ₹24,900.00 |

### The Solution:
**Merchant Mitra** ("Friend of the Merchant") is a client-side progressive web application that mathematically slices any large invoice into safe, sub-threshold micro-transactions capped at **₹1,998** (safely below ₹2,000). 

By guiding the customer through consecutive 1-tap UPI app transfers or dynamic QR scans, **100% of the customer's payment lands in the merchant's account with ₹0 lost to interchange fees.**

---

## ⚡ How It Works

```
   ┌─────────────────────────────────────────────────────────────┐
   │ 1. Input Total Bill (e.g. ₹5,000) & Merchant UPI ID        │
   └──────────────────────────────┬──────────────────────────────┘
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ 2. Real-Time MDR Savings Calculated: ₹20.00 Saved (0.4%)   │
   └──────────────────────────────┬──────────────────────────────┘
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ 3. Sliced into Sequence:                                    │
   │    • Payment 1 of 3: ₹1,998.00  (Active)                   │
   │    • Payment 2 of 3: ₹1,998.00  (Locked)                   │
   │    • Payment 3 of 3: ₹1,004.00  (Locked)                   │
   └──────────────────────────────┬──────────────────────────────┘
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ 4. Execution (Sequential Step-by-Step):                     │
   │    • Mobile: 1-Tap "Pay via UPI App" (GPay / PhonePe / etc.)│
   │    • Desktop: Dynamic QR Code Scan                          │
   │    • User taps "Mark Complete" ➔ Next Card Unlocks          │
   └──────────────────────────────┬──────────────────────────────┘
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ 5. Celebration & Consolidated Merchant Proof of Payment:    │
   │    • Confetti Blast Triggered 🎉                           │
   │    • Direct WhatsApp/SMS Share via Web Share API            │
   └─────────────────────────────────────────────────────────────┘
```

---

## ✨ Comprehensive Features

### 1. Smart Mathematical Split Engine
- **₹1,998 Optimal Threshold**: Automatically computes full quotient slices and the remainder slice.
- **Dynamic Savings Indicator**: Live calculation displaying exact rupees saved for the merchant before initiating the transaction.
- **Strict UPI Regex Validation**: Enforces standard banking handle specifications (`^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$`) with real-time inline validation feedback.

### 2. Winterfell.dev Inspired Dual-Theme Design
- **Ultra-Dark Mode**: Deep `#0a0a0a` backdrop with `#121214` surface cards, high-contrast typography, and ambient radial cyan (`#06b6d4`) and purple (`#8b5cf6`) lighting halos.
- **Frosted Light Mode**: Soft `#f8fafc` canvas with translucent glassmorphic panels (`bg-white/70 backdrop-blur-xl border-slate-200/80 shadow-xl`), tailored high-visibility accents, and crisp text contrast.
- **Fluid Theme Switcher**: Dedicated toggle with animated Framer Motion transitions (`Sun` / `Moon` icon rotation and scale) in the top-right corner.
- **Preference Retention**: Auto-detects system `prefers-color-scheme` on first load with persistent `localStorage` synchronization.

### 3. Mobile-First & Touch-Native UX
- **Dynamic Viewport Height (`100dvh`)**: Immune to mobile browser address bar popping, keyboard toggles, and height jitter.
- **Spring Bottom Sheet**: On mobile devices (`< 640px`), card expansion transforms into an interactive, swipe-down-to-dismiss bottom sheet with spring physics (`damping: 25, stiffness: 300`).
- **Tactile Haptic Feedback**: Safely fires device vibration patterns (`navigator.vibrate(50)`) on card completion, sheet triggers, and copy actions.
- **Accessible Tap Targets**: All buttons, inputs, and touch controls strictly observe a 48px+ touch footprint for effortless one-handed thumb use.

### 4. Seamless UPI Integration (Deep Links & QR)
- **Native UPI URI Protocol**: Constructs standard NPCI-compliant deep links:
  ```
  upi://pay?pa={merchantUpi}&pn={merchantName}&am={splitAmount}&cu=INR&tn={transactionNote}
  ```
- **Mobile 1-Tap Execution**: Opens the user's default UPI handler (Google Pay, PhonePe, Paytm, BHIM, CRED, Navi) directly with amount and note pre-filled.
- **Dynamic QR Code Generation**: SVG-based high-resolution QR codes generated client-side via `qrcode.react` for seamless counter scanning.
- **Quick-Copy Utility**: Instant clipboard copy button for manual UPI ID paste in case deep-linking permissions are restricted by certain in-app webviews.

### 5. Native Web Share & Proof of Payment
- **Consolidated Digital Receipt**: Summary container displaying the merchant handle, breakdown of all split slices, total collected, and net MDR savings.
- **Web Share API**: One-tap native OS sharing to WhatsApp, Messages, or Telegram, with automatic fallback to clipboard copy on desktop browsers.
- **Celebratory Confetti**: Multi-stage dual-cannon confetti animation powered by `canvas-confetti` upon successful completion of the final payment card.

---

## 🧠 Split Logic Engine (Technical Deep Dive)

The slicing engine is designed to ensure zero floating-point remainder errors and strictly bounds any single payment to `<= ₹1,998.00`:

```typescript
const MAX_SPLIT = 1998;

// Slicing calculation
const numSplits = Math.floor(totalAmount / MAX_SPLIT);
const remainder = Number((totalAmount % MAX_SPLIT).toFixed(2));

const splits: SplitData[] = [];

for (let i = 0; i < numSplits; i++) {
  splits.push({ amount: MAX_SPLIT, id: `split-${i}` });
}

if (remainder > 0) {
  splits.push({ amount: remainder, id: `split-${numSplits}` });
}

// 0.4% MDR Savings calculation
const mdrSaved = (totalAmount * 0.004).toFixed(2);
```

### Sequential Card State Machine:
- **Card 0**: Starts in the **Active** state (pulsing neon border, interactive actions).
- **Cards 1..N**: Remain in the **Locked** state (`opacity-50 grayscale`) until the preceding split card is marked as completed.
- **Progress Bar**: Synchronized live percentage indicator showing completed slices over total slices.

---

## 🏗️ Architecture & Project Structure

The project is structured with modularity, separation of concerns, and clean React component hierarchy:

```
SplitUPI/
├── public/
│   ├── favicon.svg              # App brand favicon
│   └── icons.svg                # Vector asset definitions
├── src/
│   ├── assets/                  # Static media & illustrations
│   ├── components/
│   │   ├── BottomSheet.tsx       # Touch-draggable spring modal for mobile
│   │   ├── CompletionReceipt.tsx # Proof-of-payment view with Web Share API
│   │   ├── InputPanel.tsx        # Payment setup, validation, & MDR counter
│   │   ├── ProgressBar.tsx       # Neon multi-step progression indicator
│   │   ├── SplitCard.tsx         # Individual transaction slice & actions
│   │   └── TransactionStack.tsx  # Sequential state controller for split cards
│   ├── hooks/
│   │   └── useMediaQuery.ts      # Real-time breakpoint detection hook
│   ├── utils.ts                 # Class merging (cn) & safe haptic feedback
│   ├── App.tsx                  # Root state machine, theme controller, layout
│   ├── index.css                # Tailwind v4 directives, glass tokens, colors
│   └── main.tsx                 # React DOM mount point
├── index.html                   # HTML entry point with metadata
├── package.json                 # Project dependencies & npm scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript compiler configuration
└── vite.config.ts               # Vite configuration
```

---

## 🛠️ Tech Stack & Key Libraries

| Technology | Purpose | Why It Was Chosen |
| :--- | :--- | :--- |
| **React 18** | UI Framework | Component-based reactivity and declarative state management. |
| **TypeScript** | Type Safety | Strict compile-time checks for payment objects and state transitions. |
| **Vite 6** | Build Tooling | Instant Hot Module Replacement (HMR) and optimized Rollup production bundles. |
| **Tailwind CSS v4** | Styling & Theme | Next-gen CSS engine with custom `@theme` variables and utility layers. |
| **Framer Motion 12** | Animation Engine | Hardware-accelerated transitions, layout animations, and spring physics. |
| **Lucide React** | Iconography | Lightweight, consistent tree-shakeable SVG icons. |
| **qrcode.react** | QR Generation | Client-side SVG QR code rendering with zero network latency. |
| **canvas-confetti** | Micro-interactions | Performant celebratory particle effects rendered on an HTML5 canvas. |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** or **pnpm**
- A modern web browser (Chrome, Safari, Firefox, Edge)

### Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rudraksh2996/Merchant-Mitra.git
   cd Merchant-Mitra
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Production Build

To build the project for production deployment (e.g. Vercel, Netlify, Cloudflare Pages, GitHub Pages):

```bash
# Type check and build bundle
npm run build

# Preview production build locally
npm run preview
```

The compiled output will be generated in the `dist/` folder, ready for static hosting.

---

## 📱 Mobile Device Testing

To test the mobile-native features (such as 1-tap UPI app launching, spring bottom sheet, and haptic feedback) on your physical mobile phone:

1. Ensure your phone and development computer are connected to the same Wi-Fi network.
2. Run Vite with host exposure:
   ```bash
   npm run dev -- --host
   ```
3. Look at your terminal for the Network URL (e.g., `http://192.168.1.XX:5173`).
4. Open this URL on your mobile browser (Safari on iOS or Chrome on Android).
5. Enter a test invoice, tap **Split & Pay**, and test the native deep-link button!

---

## ⚖️ Legal Concept & Disclaimer

> **Disclaimer:** **Merchant Mitra** is an educational proof-of-concept web prototype. It is **not** an official banking entity, payment aggregator, or financial institution, and has **no affiliation** with the Reserve Bank of India (RBI), National Payments Corporation of India (NPCI), or any government body. Users and merchants are responsible for complying with all applicable tax laws, transaction reporting requirements, and terms of service of their respective banking and UPI applications.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to customize, modify, and distribute for non-commercial or commercial use.

---

<div align="center">
  Built with ❤️ for Indian small business owners and merchants.
</div>
