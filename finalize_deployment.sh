#!/bin/bash

# 1. Wykonanie commitu ze zmianami konfiguracyjnymi
git commit -m "🔧 Finalize deployment configuration

- Add environment variable examples (.env.example) for safe deployment
- Update .gitignore to better protect sensitive data
- Improve DEPLOYMENT.md documentation
- Add Makefile for common development tasks
- Fix Render.yaml configuration (remove exposed secrets)
- Update deployment scripts

All changes needed for safe production deployment on Render.com + Vercel."

# 2. Push zmian do repozytorium
git push origin main

echo "✅ Deployment configuration committed and pushed to repository!"
echo "🚀 Teraz możesz uruchomić deployment na Render.com i Vercel"
