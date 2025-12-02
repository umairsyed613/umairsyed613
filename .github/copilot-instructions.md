# Copilot Instructions for AI Coding Agents

## Project Overview
This is a static website project, primarily composed of HTML, CSS, JavaScript, and PHP. The main entry point is `index.html`. The site includes custom styles, third-party libraries, and a contact form handled by `mail.php`.

## Key Directories and Files
- `index.html`: Main landing page. All navigation and content structure start here.
- `css/`: Contains all stylesheets. Use `style.css` for custom styles; other files are third-party libraries (Bootstrap, Animate.css, Owl Carousel, etc.).
- `js/`: Contains all JavaScript files. `script.js` is the main custom script; others are third-party libraries.
- `img/`: Stores all image assets.
- `mail.php`: Handles contact form submissions via POST. No database integration; emails are sent directly.
- `privacy-policy.html`: Static privacy policy page.

## Patterns and Conventions
- **No build system**: All files are served statically. No npm, webpack, or package manager is used.
- **Third-party libraries**: Only use the versions present in `css/` and `js/`. Do not update or add new libraries unless explicitly requested.
- **Custom code**: Place custom CSS in `css/style.css` and custom JS in `js/script.js`.
- **Form handling**: All form submissions are processed by `mail.php`. Validate inputs client-side (JS) and server-side (PHP).
- **Navigation**: All navigation is handled via anchor tags in HTML. No SPA or routing frameworks.

## Integration Points
- **Contact Form**: Submits to `mail.php` using POST. Ensure fields are validated and sanitized.
- **Animations/Carousels**: Use Animate.css and Owl Carousel as included. Initialize in `js/script.js`.

## Examples
- To add a new section to the homepage, edit `index.html` and style in `css/style.css`.
- To add a new image, place it in `img/` and reference it in HTML.
- To add custom JS behavior, use `js/script.js`.

## Developer Workflow
- Edit files directly; changes are reflected immediately.
- No build, test, or deployment scripts are present.
- For debugging, use browser dev tools.

## Recommendations for AI Agents
- Follow the file organization and do not introduce frameworks or build tools.
- Use only the libraries present in the project.
- Keep code changes minimal and focused.
- Reference existing patterns in `index.html`, `css/style.css`, and `js/script.js` for consistency.

---
If any section is unclear or missing, please provide feedback to improve these instructions.