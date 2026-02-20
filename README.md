# TimeLux - Premium Watch Store ⌚

TimeLux is a full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js). It features a luxury design aesthetic, robust authentication, Stripe payment integration, and a comprehensive admin dashboard.

## 🚀 Features

- **User Authentication**: Secure Login & Registration with JWT and HTTP-Only cookies.
- **Product Management**: Browse, search, and view detailed product information.
- **Shopping Cart**: Real-time cart management with local storage persistence.
- **Checkout Process**: Multi-step checkout with specific Shipping and Payment steps.
- **Stripe Payments**: Secure payment processing using Stripe Payment Intents.
- **Admin Dashboard**:
  - Manage Products (Create, Update, Delete, Upload Images)
  - Manage Users (Promote, Block, Delete)
  - Manage Orders (View, Mark as Delivered)
- **User Profile**: Update profile details and view order history.
- **Reviews**: Product rating and review system.
- **Responsive Design**: Mobile-first luxury UI using Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Redux Toolkit, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express.js, Mongoose (MongoDB)
- **Payment**: Stripe
- **State Management**: Redux Toolkit (RTK Query)
- **Security**: Helmet, JWT, Bcrypt

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account
- Stripe Account

### 1. Clone the repository
```bash
git clone <repository-url>
cd TimeLux
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in `server/` with the following:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
```

Start the frontend:
```bash
npm run dev
```

## 📦 Deployment

### Backend (Render/Heroku)
1. Push code to GitHub.
2. Connect repo to Render/Heroku.
3. Set environment variables.
4. Build command: `npm install`
5. Start command: `node server.js`

### Frontend (Vercel/Netlify)
1. Push code to GitHub.
2. Connect repo to Vercel.
3. Set Build Command: `npm run build`
4. Set Output Directory: `dist`
5. Add `vite.config.js` with proxy or configure API URL environment variable if needed for production.

---

## 🛡️ Admin Access
- To create the first admin, register a user via the app, then manually update the `role` to `admin` in your MongoDB database collection for that user.

## 📄 License
MIT
