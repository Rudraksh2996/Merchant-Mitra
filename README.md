# 🤝 Merchant Mitra

> **Empowering local businesses by eliminating UPI merchant fees, one split payment at a time.**

Merchant Mitra is an ultra-modern, glassmorphic web app designed to split large UPI payments into chunks capped at **₹1,998**. By keeping each individual transaction below the ₹2,000 P2M threshold, it protects local merchants' profit margins from 0.4% MDR (Merchant Discount Rate) transaction fees.

---

## ✨ Features

* **Smart Payment Split Engine**: Automatically calculates and divides large totals into optimal sub-₹2,000 payment cards (e.g., ₹5,000 = ₹1,998 + ₹1,998 + ₹1,004).
* **Winterfell.dev Dark/Light Aesthetic**: Deep dark mode with glowing neon cyan/purple accents, adaptive light glassmorphism, and a seamless top-right theme switch.
* **Mobile-Native UX**:
  * Automatic screen size detection with spring-animated **Bottom Sheets**.
  * Instant deep-linking (`upi://pay`) for one-tap payments on mobile UPI apps (GPay, PhonePe, Paytm).
  * Tactile haptic feedback (`navigator.vibrate`) on touch devices.
* **Merchant Hero Tracker**: Real-time counter displaying the exact MDR amount (0.4%) saved for the merchant.
* **Consolidated Proof of Payment**: Generates a unified digital receipt upon payment completion with Web Share API support to send direct transaction logs via WhatsApp/SMS.
* **Desktop Friendly**: Built-in dynamic QR code generator (`qrcode.react`) for camera scanning.

---

## 🛠️ Tech Stack

* **Framework**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Utilities**: `qrcode.react`, `canvas-confetti`

---

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (v18+) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/merchant-mitra.git
   cd merchant-mitra
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
