# 🧠 KnowledgeMind - Frontend

A Knowledge Sharing Platform frontend built with **React** (Vite) featuring AI-assisted writing tools.

## 📋 Table of Contents
- [Approach](#approach)
- [Folder Structure](#folder-structure)
- [Pages](#pages)
- [AI Usage](#ai-usage)
- [Setup Instructions](#setup-instructions)

---

## 🏗️ Approach

### Architecture Overview
- **React 19** with **Vite** for fast development
- **React Router v7** for client-side routing
- **Context API** for state management (Auth + Articles)
- **Custom Hooks** for reusable logic
- **Axios** with interceptors for API communication
- **Vanilla CSS** with CSS Variables for theming

### Key Design Decisions
- **Dark theme** with glassmorphism and gradient accents
- **Component-based architecture** (common, layout, article, auth, ai)
- **Mock AI fallback** — works without real API keys
- **Protected routes** for authenticated-only features
- **Debounced search** for UX optimization

---

## 📁 Folder Structure

```
frontend/src/
├── assets/styles/     # Global CSS and design tokens
├── components/
│   ├── common/        # Button, Input, Modal, Loader, ProtectedRoute
│   ├── layout/        # Navbar, Footer, Layout
│   ├── article/       # ArticleCard, List, Form, Editor, Detail, Tags
│   ├── ai/            # AIImproveButton, AISummaryPreview, AITagSuggestion
│   └── auth/          # LoginForm, SignupForm
├── pages/             # HomePage, ArticleDetail, Create, Edit, Dashboard, Login, Signup
├── context/           # AuthContext, ArticleContext
├── hooks/             # useAuth, useArticles, useDebounce, useAI
├── services/          # api.js, authService, articleService, aiService
├── utils/             # constants, formatDate, validateForm, extractSummary
├── routes/            # AppRoutes.jsx
├── App.jsx
└── main.jsx
```

---

## 📄 Pages

| Page | Path | Auth Required |
|------|------|:---:|
| Home | `/` | No |
| Article Detail | `/article/:id` | No |
| Login | `/login` | No |
| Signup | `/signup` | No |
| Create Article | `/create` | Yes |
| Edit Article | `/edit/:id` | Yes |
| My Articles | `/dashboard` | Yes |

---

## 🤖 AI Usage

### Tools Used
- **AI Assistant**: Used for component structure, CSS design, and UI patterns
- **Built-in AI features**: Content improvement, summary generation, tag suggestions

### Where AI Helped
- React component architecture design
- CSS dark theme with glassmorphism
- Custom hook patterns
- UX flow and page transitions

### What Was Reviewed Manually
- Authentication flow and security
- State management with Context API
- Form validation logic
- Responsive design breakpoints

---

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- Backend API running at `http://localhost:5000`

### 1. Install Dependencies
```bash
cd ProjectFrontend/frontend
npm install
```

### 2. Configure Environment
Edit `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```

App runs at: `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

---

## 🎨 Design Features
- Dark theme with gradient accents
- Glassmorphism effects on navbar and cards
- Smooth animations and micro-interactions
- Fully responsive design
- AI-powered writing assistant with glowing buttons
