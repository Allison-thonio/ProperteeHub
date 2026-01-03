# ProperteeHub

ProperteeHub is a premium Real Estate mobile application designed to bridge the gap between property buyers, sellers, and investors. Built with **React Native (Expo)** and powered by **Firebase**, the app offers a sophisticated, high-end experience for high-value real estate transactions.

## ✨ Features

### 🏢 For Sellers
- **Professional Dashboard:** Track active listings, property views, and incoming inquiries at a glance.
- **Property Management:** Easily list and manage properties with comprehensive details and images.
- **Real-time Inquiries:** Stay connected with potential buyers through an integrated chat system.
- **Agent Identity:** Customizable agent profiles with verification badges and firm details.

### 🏠 For Buyers
- **Elite Experience:** Explore properties through a beautifully curated feed with a high-end gold-and-black aesthetic.
- **Advanced Search:** Filter properties by type, location, and price with live updating results.
- **Interactive Scouting:** View properties directly on a global map and tap pins for instant details.
- **Personalized Access:** Save favorite listings and manage a premium buyer profile.

### 📈 For Investors
- **Curated Insights:** Specialized access to high-yield real estate opportunities (Beta).

### 💬 Communication
- **Cross-Platform Messaging:** Secure and direct chat between users for seamless negotiations.

---

## 🎨 Design Philosophy
ProperteeHub follows a **"Minimalist Bold"** design language:
- **Primary Colors:** Gold (#D4AF37), Deep Black, and Pure White.
- **Typography:** Professional, all-caps headings for a premium, authoritative feel.
- **Minimalism:** Removal of generic emojis in favor of sleek, text-based labels and high-contrast visuals.

---

## 🛠 Tech Stack

- **Core:** React Native (Expo SDK 54)
- **Languge:** TypeScript
- **State & Navigation:** React Navigation (Native Stack)
- **Backend:** Firebase (Authentication, Firestore, Storage)
- **Maps:** React Native Maps & Google Places Autocomplete
- **Layout:** Flexbox with Safe Area Context

---

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS)
- Expo Go app on your mobile device or an Emulator

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/properteehub.git
   cd properteehub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Ensure you have your Firebase configuration and Google Maps API keys ready in your environment or `app.json`.

4. **Start the project:**
   ```bash
   npx expo start
   ```

5. **Run on device:**
   Scan the QR code appearing in your terminal using the Expo Go app.

---

## 📂 Project Structure

- `src/navigation`: Navigation stack configurations.
- `src/screens`: Role-specific screens (Buyer, Seller, Message, Auth).
- `src/components`: Reusable UI components like `GlobalPropertyMap`.
- `src/types`: TypeScript definitions for navigation and data models.
- `assets`: Premium visual assets and onboarding illustrations.

---

## 📜 License
This project is private and proprietary.
