# Meal Master — Backend

Scaffolded Express + MongoDB backend for Meal Master.

Quick start:

```bash
cd backend
npm install
cp .env.example .env
# edit .env to add MONGO_URI and JWT_SECRET
npm run dev
```

APIs:
- `POST /api/auth/register` — register user
- `POST /api/auth/login` — login
- `GET /api/meals` — list meals
