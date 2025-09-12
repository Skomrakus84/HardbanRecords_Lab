# 🚀 HardbanRecords Lab - Deployment Guide

## Status Aktualny:
✅ Database (Supabase) - skonfigurowana z danymi testowymi
🔄 Backend - gotowy do deployment
🔄 Frontend - gotowy do deployment

## Krok 1: Backend Deployment (Render.com)

### A) Przygotowanie Repository
```bash
# 1. Initialize git jeśli nie ma
git init
git add .
git commit -m "Initial deployment setup"

# 2. Push to GitHub/GitLab
git remote add origin YOUR_REPO_URL
git push -u origin main
```

### B) Render.com Setup
1. **Zaloguj się** na https://render.com
2. **New Web Service** → Connect GitHub repository
3. **Konfiguracja:**
   - **Name:** `hardbanrecords-backend`
   - **Environment:** Node
   - **Region:** Frankfurt (EU)
   - **Branch:** main
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

### C) Environment Variables w Render
