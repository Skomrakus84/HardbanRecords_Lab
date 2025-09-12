#!/bin/bash

echo "🔍 SPRAWDZANIE STATUSU GIT - HardbanRecords Lab"
echo "==============================================="

# Sprawdź czy jesteśmy w Git repository
if [ ! -d ".git" ]; then
    echo "❌ Nie znaleziono repository Git"
    echo "🔧 Inicjalizacja Git repository..."
    git init
    echo "✅ Git repository zainicjalizowane"
fi

echo ""
echo "📊 AKTUALNY STATUS GIT:"
echo "-----------------------"
git status

echo ""
echo "📁 PLIKI W STAGING AREA:"
echo "------------------------"
git diff --cached --name-only

echo ""
echo "📝 PLIKI DO DODANIA (untracked/modified):"
echo "----------------------------------------"
git ls-files --others --exclude-standard
git diff --name-only

echo ""
echo "🔍 OSTATNIE COMMITY:"
echo "-------------------"
git log --oneline -5 2>/dev/null || echo "Brak commitów"

echo ""
echo "🌿 AKTUALNY BRANCH:"
echo "------------------"
git branch 2>/dev/null || echo "Brak branchy"

echo ""
echo "🔗 REMOTE REPOSITORIES:"
echo "----------------------"
git remote -v 2>/dev/null || echo "Brak remote repositories"

echo ""
echo "📈 PODSUMOWANIE:"
echo "==============="
echo "✅ Repository status: $(if [ -d ".git" ]; then echo "Zainicjalizowane"; else echo "Niezainicjalizowane"; fi)"
echo "📊 Files to commit: $(git status --porcelain | wc -l)"
echo "🔄 Ready for: git add . && git commit"
