#!/bin/bash

# Jekyll Local Development Startup Script
# This script starts your al-folio Jekyll website locally

echo "🚀 Starting Jekyll website locally..."
echo "======================================"

# Check if we're in the right directory
if [ ! -f "Gemfile.simple" ]; then
    echo "❌ Error: Gemfile.simple not found!"
    echo "   Please run this script from your website directory."
    exit 1
fi

if [ ! -f "_config.minimal.yml" ]; then
    echo "❌ Error: _config.minimal.yml not found!"
    echo "   Please run this script from your website directory."
    exit 1
fi

# Check if bundle is installed
if ! command -v bundle &> /dev/null; then
    echo "❌ Error: Bundler is not installed!"
    echo "   Please run: sudo gem install bundler -v 2.4.22"
    exit 1
fi

# Check if gems are installed
if [ ! -d "vendor" ] && [ ! -f "Gemfile.lock" ]; then
    echo "📦 Installing gems for the first time..."
    echo "   This may take a few minutes..."
    
    if sudo bundle install --gemfile=Gemfile.simple; then
        echo "✅ Gems installed successfully!"
    else
        echo "❌ Failed to install gems. Please check the error above."
        exit 1
    fi
fi

# Start Jekyll
echo "🌐 Starting Jekyll server..."
echo "   Website will be available at: http://localhost:4000"
echo "   Press Ctrl+C to stop the server"
echo "======================================"

# Start Jekyll with our minimal configuration
BUNDLE_GEMFILE=Gemfile.simple bundle exec jekyll serve \
    --config _config.minimal.yml \
    --host=0.0.0.0 \
    --port=4000 \
    --livereload 