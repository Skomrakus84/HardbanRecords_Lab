# 🚀 Production Deployment Guide
## HardbanRecords Lab - Vercel (Frontend) + Render (Backend)

### Architecture Overview
- **Frontend**: React/Vite deployed on Vercel
- **Backend**: Node.js/Express deployed on Render
- **Database**: PostgreSQL (Supabase or Render)
- **Storage**: Supabase Storage for file uploads

---

## 📋 Pre-Deployment Checklist

### 1. Environment Variables Preparation
✅ Create `.env.example` files
✅ Set up production database
✅ Configure Supabase project
✅ Generate JWT secrets
✅ Set up external API keys

### 2. Code Optimization
✅ Build optimization configured
✅ Security middleware in place
✅ Error handling implemented
✅ Health check endpoints

---

## 🗄️ Database Setup (Production)

### Option A: Supabase (Recommended)
1. **Create Supabase Project**
   ```bash
   # Go to https://supabase.com
   # Create new project
   # Note down: Project URL, anon key, service_role key
   ```

2. **Run Migration Script**
   ```sql
   -- Execute backend/db/migrations/production_setup.sql
   -- in Supabase SQL Editor
   ```

3. **Configure Storage Bucket**
   ```bash
   # In Supabase Dashboard:
   # Storage → New Bucket → "hardbanrecords-files"
   # Set bucket to public for file access
   ```

### Option B: Render PostgreSQL
1. **Create Database Service**
   ```yaml
   # In render.yaml (already configured)
   databases:
     - name: hardbanrecords-db
       databaseName: hardbanrecords
       user: hardbanrecords_user
       plan: free
   ```

2. **Run Migrations**
   ```bash
   # Connect to Render database and run production_setup.sql
   ```

---

## 🖥️ Backend Deployment (Render)

### 1. Repository Setup
```bash
# Ensure render.yaml is in root directory
# Backend service configuration is ready
```

### 2. Environment Variables (Render Dashboard)
```env
# Database
DATABASE_URL=postgresql://...

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
SUPABASE_ANON_KEY=eyJ...
SUPABASE_BUCKET_NAME=hardbanrecords-files

# JWT (Generate strong secrets!)
JWT_SECRET=your_super_strong_jwt_secret_here_32_chars_min
REFRESH_TOKEN_SECRET=your_super_strong_refresh_secret_here_32_chars_min

# Server
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://your-frontend-domain.vercel.app

# External APIs
GOOGLE_API_KEY=your_google_ai_key
GROQ_API_KEY=your_groq_key
SPOTIFY_CLIENT_ID=your_spotify_id
SPOTIFY_CLIENT_SECRET=your_spotify_secret

# Monitoring
LOG_LEVEL=info
SENTRY_DSN=your_sentry_dsn
```

### 3. Deploy Backend
```bash
# Push to GitHub
git add .
git commit -m "Production deployment setup"
git push origin main

# Render will auto-deploy from GitHub
# Monitor deployment in Render dashboard
```

### 4. Verify Backend Deployment
```bash
# Test health endpoint
curl https://your-backend-url.render.com/api/health

# Test API endpoint
curl https://your-backend-url.render.com/api/music/releases
```

---

## 🌐 Frontend Deployment (Vercel)

### 1. Vercel Configuration
Create `vercel.json` in root:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/.*",
      "dest": "/index.html"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "app/api/**/*.js": {
      "runtime": "nodejs18.x"
    }
  }
}
```

### 2. Environment Variables (Vercel Dashboard)
```env
VITE_API_URL=https://your-backend-url.render.com
NODE_ENV=production
```

### 3. Deploy to Vercel
```bash
# Option 1: Vercel CLI
npm install -g vercel
vercel --prod

# Option 2: GitHub Integration
# Connect GitHub repo in Vercel dashboard
# Auto-deploy on push to main branch
```

### 4. Verify Frontend Deployment
```bash
# Visit your Vercel URL
https://your-frontend-domain.vercel.app

# Test API connectivity
# Check browser console for errors
```

---

## 🔒 Security Configuration

### 1. Backend Security Headers (Already Configured)
```javascript
// In server.cjs
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https:"]
    }
  }
}));
```

### 2. CORS Configuration
```javascript
// Update CORS_ORIGIN environment variable
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

### 3. JWT Secrets
```bash
# Generate strong secrets (32+ characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📊 Monitoring & Health Checks

### 1. Backend Health Endpoint
```javascript
// GET /api/health
{
  "status": "healthy",
  "timestamp": "2025-01-15T10:30:00Z",
  "database": "connected",
  "supabase": "connected"
}
```

### 2. Error Tracking Setup
```bash
# 1. Create Sentry account
# 2. Add SENTRY_DSN to environment variables
# 3. Monitor errors in Sentry dashboard
```

### 3. Performance Monitoring
```bash
# Render provides built-in metrics
# Vercel provides analytics dashboard
# Monitor response times and error rates
```

---

## 🚀 Deployment Commands

### Quick Deploy Script
```bash
#!/bin/bash
echo "🚀 Deploying HardbanRecords Lab to Production..."

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm install
cd backend && npm install && cd ..

# 2. Build frontend
echo "🏗️ Building frontend..."
npm run build

# 3. Run tests
echo "🧪 Running tests..."
npm test
cd backend && npm test && cd ..

# 4. Deploy
echo "🚀 Deploying..."
git add .
git commit -m "Production deployment $(date)"
git push origin main

echo "✅ Deployment initiated!"
echo "🖥️ Backend: Monitor at https://dashboard.render.com"
echo "🌐 Frontend: Monitor at https://vercel.com/dashboard"
echo "📊 Health Check: https://your-backend-url.render.com/api/health"
```

---

## 🔧 Troubleshooting

### Common Issues & Solutions

1. **CORS Errors**
   ```bash
   # Update CORS_ORIGIN in backend env vars
   # Ensure protocol matches (https://)
   ```

2. **Database Connection Failed**
   ```bash
   # Verify DATABASE_URL format
   # Check database service status
   # Run migration script again
   ```

3. **File Upload Issues**
   ```bash
   # Verify Supabase bucket permissions
   # Check SUPABASE_SERVICE_ROLE_KEY
   # Ensure bucket is public for file access
   ```

4. **Build Failures**
   ```bash
   # Clear node_modules and reinstall
   # Check for TypeScript errors
   # Verify all environment variables
   ```

5. **API Timeout Errors**
   ```bash
   # Increase timeout limits
   # Check Render service logs
   # Verify health check endpoint
   ```

---

## 📞 Post-Deployment Checklist

### ✅ Verification Steps
- [ ] Backend health check responds
- [ ] Frontend loads correctly
- [ ] User registration works
- [ ] File upload functionality
- [ ] Database operations work
- [ ] All API endpoints respond
- [ ] Error tracking is active
- [ ] Performance metrics available

### 🔄 Maintenance Tasks
- [ ] Set up automated backups
- [ ] Configure monitoring alerts
- [ ] Document rollback procedures
- [ ] Schedule regular security updates
- [ ] Plan scaling strategies

---

## 📱 URLs & Access

### Production URLs
- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://your-api.onrender.com`
- **Health Check**: `https://your-api.onrender.com/api/health`
- **API Docs**: `https://your-api.onrender.com/api/docs`

### Admin Access
- **Email**: `admin@hardbanrecords.com`
- **Password**: Change in production!
- **Dashboard**: Login at frontend URL

---

🎉 **Deployment Complete!** Your HardbanRecords Lab platform is now live in production.
