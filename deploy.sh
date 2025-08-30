#!/bin/bash

# PatentAlchemy Vercel Deployment Script

echo "🚀 Deploying PatentAlchemy to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Login to Vercel (if not already logged in)
echo "🔐 Please login to Vercel:"
vercel login

# Deploy to production
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🔗 Your app should be live at the URL provided above"
