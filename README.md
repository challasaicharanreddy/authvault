# AuthVault 🔐
> A production-ready full stack authentication system built with Node.js and Express.js from scratch.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

---

## 🚀 Live Demo
🔗 [authvault-i32t.onrender.com](https://authvault-i32t.onrender.com/)

## 📸 Screenshots
> Coming soon

---

## ✨ Features

- 🔒 **User Registration** — with bcrypt password hashing (salt rounds: 10)
- 🎫 **JWT Authentication** — access token (15min) + refresh token (7 days) system
- 🛡️ **Protected Routes** — middleware that verifies JWT on every request
- 👑 **Role Based Access** — Admin and User roles with different permissions
- 📧 **Forgot Password** — secure email reset link via Nodemailer + crypto tokens
- ⚡ **Rate Limiting** — max 10 auth attempts per 15 minutes (brute force protection)
- 🏗️ **MVC Architecture** — clean separation of controllers, routes, models, middleware
- 🎨 **Frontend UI** — dark themed, responsive UI built with vanilla HTML/CSS/JS

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Authentication | JWT (jsonwebtoken), bcrypt |
| Email | Nodemailer (Gmail SMTP) |
| Security | express-rate-limit, crypto |
| Architecture | MVC Pattern |
| Version Control | Git & GitHub |

---

## 📁 Project Structure
```
authvault/
│
├── public/               # Static assets (CSS, JS, Images)
├── views/                # Frontend HTML pages
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── forgot-password.html
│   └── reset-password.html
│
├── routes/               # API route definitions
│   ├── authRoutes.js
│   └── userRoutes.js
│
├── controllers/          # Business logic
│   ├── authController.js
│   └── userController.js
│
├── models/               # Data models
│   └── userModel.js
│
├── middleware/           # Express middleware
│   ├── verifyToken.js
│   ├── roleMiddleware.js
│   └── rateLimiter.js
│
├── utils/                # Helper utilities
│   ├── generateToken.js
│   └── sendEmail.js
│
├── config/               # Config files
│   └── db.js
│
├── .env.example          # Environment variables template
├── server.js             # Entry point
└── package.json
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/challasaicharanreddy/authvault.git
cd authvault
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```bash
cp .env.example .env
```

Fill in your values:
```
PORT=3000
JWT_SECRET=your_jwt_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### 4. Run the server
```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

### 5. Open in browser
```
http://localhost:3000
```

---

## 🔑 API Endpoints

### Auth Routes `/api/auth`
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | Login user | ❌ |
| POST | `/forgot-password` | Send reset email | ❌ |
| POST | `/reset-password` | Reset password | ❌ |

### User Routes `/api/user`
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/dashboard` | Get user dashboard | ✅ |
| GET | `/admin` | Admin only route | ✅ Admin |

---

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Server port (default: 3000) |
| `JWT_SECRET` | Secret key for access tokens |
| `JWT_REFRESH_SECRET` | Secret key for refresh tokens |
| `EMAIL_USER` | Gmail address for sending emails |
| `EMAIL_PASS` | Gmail App Password (16 characters) |

---

## 📚 What I Learned

- Building a **REST API** from scratch with Express.js
- Implementing **JWT authentication** with access and refresh tokens
- **bcrypt** password hashing and security best practices
- Writing **Express middleware** for auth and rate limiting
- Sending emails with **Nodemailer** and Gmail SMTP
- **MVC architecture** for clean, scalable code
- **Git branching workflow** with feature branches
- Securing APIs against **brute force attacks**

---

## 🗺️ Future Improvements

- [ ] Connect to MongoDB database
- [ ] Add Google OAuth login
- [ ] Add email verification on register
- [ ] Add refresh token rotation
- [ ] Deploy to production

---

## 👨‍💻 Author

**Challa Sai Charan Reddy**
- GitHub: [@challasaicharanreddy](https://github.com/challasaicharanreddy)

---

> ⭐ If you found this project helpful, please give it a star on GitHub!