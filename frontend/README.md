# LeadBase CRM

A full-stack CRM application for managing client leads generated from website contact forms.

Built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend).

---

##  Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 18, Vite                    |
| Backend   | Node.js, Express                  |
| Database  | MongoDB (Atlas cloud recommended) |
| Auth      | JWT (JSON Web Tokens)             |
| Passwords | bcryptjs                          |

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/leadbase-crm.git
cd leadbase-crm
```

### 2. Set up the Backend

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in your values:

```env
MONGO_URI=mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/crm?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_long_random_secret
PORT=5000
```

Start the backend:

```bash
npm run dev
# →   MongoDB connected
# →   API running on http://localhost:5000
```

### 3. Create your Admin account (run once)

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'
```

### 4. Set up the Frontend

```bash
cd ../frontend
npm install
npm run dev
# → App running on http://localhost:5173
```

Open your browser at **http://localhost:5173**

---

## 🔌 API Reference

All routes except `/api/auth/*` and `/api/public/leads` require a `Bearer` JWT token in the `Authorization` header.

### Auth

| Method | Endpoint               | Description                  |
|--------|------------------------|------------------------------|
| POST   | /api/auth/register     | Create admin (run once only) |
| POST   | /api/auth/login        | Login → returns JWT token    |

### Leads

| Method | Endpoint               | Description                            |
|--------|------------------------|----------------------------------------|
| GET    | /api/leads             | Get all leads (filter by status/search)|
| POST   | /api/leads             | Create a new lead                      |
| GET    | /api/leads/:id         | Get a single lead                      |
| PATCH  | /api/leads/:id         | Update a lead (status, note, etc.)     |
| DELETE | /api/leads/:id         | Delete a lead                          |

### Stats & Public

| Method | Endpoint               | Description                            |
|--------|------------------------|----------------------------------------|
| GET    | /api/stats             | Dashboard aggregations                 |
| POST   | /api/public/leads      | Accept leads from website contact form |

---

## Embedding on Your Website

Paste this into any contact form on your website to automatically send leads into the CRM:

```html
<form id="contact-form">
  <input id="cf-name"  placeholder="Your Name"  required />
  <input id="cf-email" placeholder="Your Email" required />
  <button type="submit">Send Message</button>
</form>

<script>
  document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await fetch('https://your-api-domain.com/api/public/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:   document.getElementById('cf-name').value,
        email:  document.getElementById('cf-email').value,
        source: 'Website',
      }),
    });
    alert("Thanks! We'll be in touch.");
  });
</script>
```

---

##  Deployment

### Backend → Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
cd backend
railway init
railway up
```

Set these environment variables in the Railway dashboard:
- `MONGO_URI` — your MongoDB Atlas connection string
- `JWT_SECRET` — your secret key
- `PORT` — 5000

### Frontend → Vercel

```bash
cd frontend
npm run build

# Deploy with Vercel CLI
npm install -g vercel
vercel deploy dist/
```

Set this environment variable in the Vercel dashboard:
- `VITE_API_URL` — your Railway backend URL (e.g. `https://leadbase-crm.up.railway.app`)

### Database → MongoDB Atlas (Free Tier)

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free M0 cluster
3. Create a database user under **Security → Database Access**
4. Allow all IPs under **Security → Network Access** → `0.0.0.0/0`
5. Click **Connect → Drivers** and copy your connection string
6. Add `/crm` before the `?` in the connection string

---

##  Features

- **Dashboard** — stats cards, pipeline funnel, source breakdown, recent leads
- **Leads Table** — search by name/email/company, filter by status, delete
- **Lead Detail** — view full profile, edit status, write notes, delete lead
- **Add Lead** — form with name, email, phone, company, source, status, note
- **JWT Auth** — secure admin-only API access
- **Public API** — accept leads from any website contact form without auth
- **MongoDB Atlas** — cloud database, works locally and in production

---

## Security Notes

- JWT tokens expire after **8 hours**
- Passwords are hashed with **bcrypt** (cost factor 10)
- The `/api/public/leads` endpoint is intentionally unauthenticated — add rate limiting before going live
- Always use **HTTPS** in production
- Never commit your `.env` file — it is listed in `.gitignore`

---

## Dependencies

### Backend
| Package        | Purpose                        |
|----------------|--------------------------------|
| express        | Web server and routing         |
| mongoose       | MongoDB object modelling       |
| bcryptjs       | Password hashing               |
| jsonwebtoken   | JWT auth tokens                |
| cors           | Allow frontend API requests    |
| dotenv         | Load .env variables            |
| nodemon (dev)  | Auto-restart on file changes   |

### Frontend
| Package              | Purpose                   |
|----------------------|---------------------------|
| react                | UI framework              |
| react-dom            | Render React to the DOM   |
| vite                 | Dev server and bundler    |
| @vitejs/plugin-react | Vite support for React    |

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push and open a Pull Request

---

## License

MIT — free to use and modify.