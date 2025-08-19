#!/bin/bash

# Simple Jekyll Startup Script
echo "🚀 Starting Jekyll website..."
echo "Website will be at: http://localhost:4000"
echo "Press Ctrl+C to stop"
echo ""

BUNDLE_GEMFILE=Gemfile.simple bundle exec jekyll serve \
    --config _config.minimal.yml \
    --host=0.0.0.0 \
    --port=4000 