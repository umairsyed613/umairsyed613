@echo off
REM Portfolio Development Server with Hot Reload (Windows Batch Version)
REM This script starts a local web server and automatically reloads the browser when files change

echo.
echo ========================================
echo   Portfolio Development Server
echo ========================================
echo.

REM Check if browser-sync is installed
where browser-sync >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] browser-sync is not installed.
    echo [INFO] Installing browser-sync globally...
    call npm install -g browser-sync
    
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install browser-sync.
        echo [INFO] Please install Node.js from https://nodejs.org/
        echo.
        echo [INFO] Falling back to Python HTTP server (no hot reload)...
        python -m http.server 8000
        exit /b
    )
)

echo [SUCCESS] Starting development server with hot reload...
echo [INFO] Server URL: http://localhost:3000
echo [INFO] Watching for file changes...
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

REM Start browser-sync with file watching
browser-sync start --server --files "*.html, css/*.css, js/*.js, img/*" --port 3000 --no-notify

REM Fallback to Python if browser-sync fails
if %errorlevel% neq 0 (
    echo.
    echo [WARNING] browser-sync failed. Using Python HTTP server...
    echo [INFO] Server URL: http://localhost:8000
    echo [WARNING] No hot reload available
    echo.
    python -m http.server 8000
)
