# Zia's URL Shortener

A modern, full‑stack URL shortener consisting of a Next.js frontend and a Node.js (Express + Drizzle ORM) backend.

- Frontend: Next.js App Router with CSS Modules (no Tailwind)
- Backend: Express, Drizzle ORM (Postgres), JWT auth
- Features: Auth (signup/login), shorten URLs, list your URLs, copy/redirect, delete, docs page

---

## ✨ Screenshots


### Individual Views

- Homepage 
<img width="1724" height="994" alt="Screenshot 2025-10-30 at 11 03 50 PM" src="https://github.com/user-attachments/assets/20f85ba3-deda-4afe-b826-0d9fe9def404" />

 - Dashboard (My URLs)

<img width="1724" height="994" alt="Screenshot 2025-10-30 at 11 04 22 PM" src="https://github.com/user-attachments/assets/5bf863c0-2d3e-4cf2-b9f2-99e8db2e2b16" />

- Shorten URL
<img width="1724" height="994" alt="Screenshot 2025-10-30 at 11 05 22 PM" src="https://github.com/user-attachments/assets/f7a214a5-21b5-4d32-8aa3-1f3dc3241c27" />

  


---

## 🧱 Tech Stack

- Frontend: Next.js 16 (App Router), React 19, CSS Modules
- Backend: Node.js, Express, Drizzle ORM (node-postgres), nanoid
- Database: PostgreSQL
- Auth: JWT (Bearer token)

---

## 📁 Project Structure

```
url-shortner/
├─ client/
│  └─ webapp/
│     └─ src/
│        ├─ app/              # Next.js App Router pages
│        │  ├─ auth/          # login/signup
│        │  ├─ dashboard/     # My URLs
│        │  ├─ docs/          # Docs page
│        │  ├─ shorten/       # Shorten page
│        │  ├─ page.tsx       # Landing page
│        │  └─ layout.tsx
│        ├─ components/       # Navbar, etc.
│        └─ lib/              # api helpers, auth helpers, hooks
└─ server/
   ├─ routes/                 # Express routes
   ├─ services/               # DB logic (Drizzle)
   ├─ models/                 # Drizzle schema
   ├─ middlewares/            # auth middleware
   ├─ db/                     # drizzle client
   └─ index.js                # Express app entry
```

---

## ⚙️ Prerequisites

- Node.js >= 18
- PostgreSQL running locally (or a connection URL)

Create a `.env` in `server/` with:

```
DATABASE_URL=postgres://USERNAME:PASSWORD@localhost:5432/your_db
PORT=8000
JWT_SECRET=your_jwt_secret
```

---

## 🚀 Getting Started

### 1) Backend

```bash
cd server
npm install
npm start
# server runs on http://localhost:8000
```

### 2) Frontend

```bash
cd client/webapp
npm install
npm run dev
# app runs on http://localhost:3000
```

Make sure the server is up first, then open the web app in your browser.

---

## 🔐 Authentication Flow

1. Sign up: `/user/signup` → creates user
2. Login: `/user/login` → returns JWT
3. Frontend stores token in `localStorage` and sends `Authorization: Bearer <token>` for protected routes:
   - `POST /shorten`
   - `GET /my/urls`
   - `DELETE /my/urls/:id`

Expired tokens trigger a redirect to Login.

---

## 🧭 Key Frontend Pages

- `/` – Landing page with hero shorten box, features, CTA
- `/auth/signup` – Create Account
- `/auth/login` – Login
- `/shorten` – Auth‑protected form to shorten URLs
- `/dashboard` – Auth‑protected table of your URLs (copy/delete)
- `/docs` – Minimal documentation page
- `/about`, `/privacy` – Static pages

---

## 🛤️ API (Backend)

Base URL: `http://localhost:8000`

- `POST /user/signup` – Create account
  - JSON: `{ firstname, lastname, email, password }`
- `POST /user/login` – Login and receive `{ token }`
- `POST /shorten` (auth) – Create short URL
  - JSON: `{ url, code? }`
  - Response: `{ data: { id, shortcode, targetUrl } }`
- `GET /my/urls` (auth) – Get user URLs
- `DELETE /my/urls/:id` (auth) – Delete one of your URLs
- `GET /:shortCode` – Redirect to target URL

---

## 🧪 cURL Examples

```bash
# Signup
curl -X POST http://localhost:8000/user/signup \
  -H "Content-Type: application/json" \
  -d '{"firstname":"Zia","lastname":"K","email":"user@example.com","password":"secret"}'

# Login
curl -X POST http://localhost:8000/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret"}'

# Shorten (requires token)
TOKEN=ey...your.jwt...
curl -X POST http://localhost:8000/shorten \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"url":"https://example.com","code":"example"}'
```

---

## 🧩 Implementation Notes

- CSS Modules per page/component for isolated, maintainable styles
- Drizzle `node-postgres` driver: pass a connected `pg` Client to `drizzle()`
- JWT validated in middleware; `ensureAuthenticated` protects routes
- Frontend handles 401 responses and redirects users to Login

---

## 📜 License

MIT – Feel free to use and modify.

---

## 🙌 Acknowledgements

- Next.js, React, Drizzle ORM, nanoid, Express
- Icons/emojis used as placeholders – replace with your brand assets as needed
