# Hsabi (حسابي) 📦
> **Manage your stock, your way.**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

**Hsabi** is a modern, intuitive, and high-performance Stock Management SaaS designed for small to medium businesses. It provides a seamless experience for tracking inventory, managing stock levels, and showcasing products through a public storefront.

---

## ✨ Features

- 🔐 **Secure Authentication**: JWT-based login and signup with isolated user data.
- 📦 **Product Management**: Create, update, and track your products with ease.
- 🔄 **Stock Movements**: Keep a detailed history of every stock 'In' and 'Out' transaction.
- ⚠️ **Low Stock Alerts**: Intelligent dashboard alerts when items drop below threshold.
- 📊 **Smart Analytics**: Visual insights into your inventory status and total value.
- 🏪 **Public Storefront**: Each company gets a public, shareable link to their product catalog.
- 📥 **CSV Export**: Generate instant inventory reports for your records.
- 📱 **Fully Responsive**: Optimized for both desktop and mobile devices.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: `React 18` + `Vite`
- **Styling**: `Tailwind CSS v4`
- **Icons**: `Lucide React`
- **Data Visualization**: `Recharts`
- **HTTP Client**: `Axios`

### Backend
- **Runtime**: `Node.js`
- **Framework**: `Express`
- **Database**: `PostgreSQL`
- **ORM**: `Prisma`
- **Authentication**: `JSON Web Tokens (JWT)`

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/hsabi.git
   cd hsabi
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/hsabi"
   JWT_ACCESS_SECRET="your_access_token_secret"
   JWT_REFRESH_SECRET="your_refresh_token_secret"
   PORT=5000
   ```
   Push the schema to your database:
   ```bash
   npx prisma db push
   ```
   Start the server:
   ```bash
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

## 📁 Project Structure

```text
Hsabi/
├── backend/               # Express.js Server
│   ├── prisma/            # Database schema & migrations
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/    # Auth & Error handling
│   │   └── routes/        # API endpoints
│   └── server.js          # Entry point
├── frontend/              # Vite + React Client
│   ├── public/            # Static assets (Logos)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # Auth state management
│   │   └── pages/         # Dashboard & Public pages
│   └── index.html
└── README.md
```

---

## 📸 Screenshots

*(Add your screenshots here to showcase the beautiful Emerald/Blue UI)*

---

## 📄 License

This project is licensed under the **MIT License**. Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">Made with ❤️ for better business management.</p>
