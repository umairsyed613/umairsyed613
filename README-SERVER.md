# Development Server Guide

## Quick Start

### Windows (PowerShell - Recommended)
```powershell
.\start-server.ps1
```

### Windows (Command Prompt)
```cmd
start-server.bat
```

### Manual (Python - No Hot Reload)
```powershell
python -m http.server 8000
```

## Features

### Hot Reload Development Server
- **Automatic browser refresh** when you edit files
- **Watches** HTML, CSS, JavaScript, and image files
- **Opens automatically** in your default browser
- **Port**: http://localhost:3000

### What Gets Watched
- `*.html` - All HTML files in root
- `css/*.css` - All stylesheets
- `js/*.js` - All JavaScript files  
- `img/*` - Image assets

## Requirements

### For Hot Reload (browser-sync)
1. **Node.js** must be installed ([Download here](https://nodejs.org/))
2. The script will auto-install `browser-sync` if needed

### Fallback (Python)
- Python 3.x (usually pre-installed on Windows 10/11)
- No hot reload, manual browser refresh needed

## Troubleshooting

### browser-sync not working?
1. Install Node.js from https://nodejs.org/
2. Run: `npm install -g browser-sync`
3. Try the script again

### Port already in use?
- browser-sync: Edit the script and change `--port 3000` to another port
- Python: Change `8000` to another port like `8080`

### Files not reloading?
- Check that you're editing files in the correct directory
- Try hard refresh in browser (Ctrl+Shift+R or Cmd+Shift+R)
- Restart the server

## Testing Design Modes

Once the server is running:
1. Open http://localhost:3000 (or http://localhost:8000)
2. Click the "Design" dropdown in the navigation
3. Select different design modes:
   - 🌙 Modern Dark
   - ☀️ Minimalist Light
   - 💎 Glassmorphism
   - 💻 Terminal Hacker
   - 🎯 Neo Brutalist
   - 🍭 Gradient Candy
4. Changes to CSS/JS files will auto-reload the page

## Stop the Server

Press **Ctrl+C** in the terminal to stop the development server.
