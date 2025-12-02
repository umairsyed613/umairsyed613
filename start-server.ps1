# Portfolio Development Server with Hot Reload
# This script starts a local web server and automatically reloads the browser when files change

Write-Host "🚀 Starting Portfolio Development Server..." -ForegroundColor Cyan
Write-Host ""

# Check if browser-sync is installed
$browserSyncInstalled = Get-Command browser-sync -ErrorAction SilentlyContinue

if (-not $browserSyncInstalled) {
    Write-Host "⚠️  browser-sync is not installed." -ForegroundColor Yellow
    Write-Host "📦 Installing browser-sync globally..." -ForegroundColor Cyan
    npm install -g browser-sync
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install browser-sync. Please install Node.js first from https://nodejs.org/" -ForegroundColor Red
        Write-Host ""
        Write-Host "Alternative: Using Python simple HTTP server (no hot reload)..." -ForegroundColor Yellow
        python -m http.server 8000
        exit
    }
}

Write-Host "✅ Starting development server with hot reload..." -ForegroundColor Green
Write-Host "📂 Serving files from: $PWD" -ForegroundColor Gray
Write-Host "🌐 Server will open in your default browser" -ForegroundColor Gray
Write-Host ""
Write-Host "👀 Watching for changes in:" -ForegroundColor Cyan
Write-Host "   - HTML files (*.html)" -ForegroundColor Gray
Write-Host "   - CSS files (css/*.css)" -ForegroundColor Gray
Write-Host "   - JavaScript files (js/*.js)" -ForegroundColor Gray
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host ""

# Start browser-sync with file watching
browser-sync start --server --files "*.html, css/*.css, js/*.js, img/*" --port 3000 --no-notify --no-open

# If browser-sync fails, fallback to Python server
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "⚠️  browser-sync failed. Falling back to Python HTTP server..." -ForegroundColor Yellow
    Write-Host "🌐 Server URL: http://localhost:8000" -ForegroundColor Cyan
    Write-Host "⚠️  Note: No hot reload available with Python server" -ForegroundColor Yellow
    Write-Host ""
    python -m http.server 8000
}
