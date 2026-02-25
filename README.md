# FinFolio — Finance Portfolio Template

A deployable portfolio web app template built with **Vite + React + Material UI**, designed for finance students and professionals. Features a clean, minimal black-and-white design and a built-in **Admin Portal** for managing all content without editing code.

## Features

- **Public Portfolio Pages** — Home, Projects, About, Resume, Contact
- **Admin Portal (CMS)** — Full CRUD dashboard to manage all content from the browser
- **Black & White Design** — Professional, minimal Material Design styling
- **Responsive** — Desktop, tablet, and mobile layouts
- **GitHub Pages Ready** — HashRouter for SPA compatibility, GitHub Actions deploy workflow
- **Rich Content Support** — Embed PDFs, Google Docs/Sheets, GitHub links, and charts
- **Custom Pages** — Create and manage additional pages from the admin portal

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Admin Portal Access

1. Navigate to `/#/admin` in the browser
2. Enter the passcode: **Soumya01**
3. Use the dashboard to manage all portfolio sections

### What You Can Edit

| Section    | Fields                                                                 |
| ---------- | ---------------------------------------------------------------------- |
| **Home**   | Hero title/subtitle, intro text, CTA buttons, stats, custom sections   |
| **About**  | Name, bio, education, experience, skills, certifications, photo        |
| **Projects** | Title, description, category, tags, tech stack, links, embeds, featured toggle |
| **Resume** | Summary, downloadable file link, structured sections                   |
| **Contact** | Email, phone, address, LinkedIn, GitHub, social links                 |
| **Settings** | Site title, page visibility toggles, custom pages                   |

## Save & Publish Workflow

1. Make changes in the Admin Portal
2. Click **Save Changes** — content is saved to browser localStorage
3. To publish to GitHub Pages:
   - Push changes to the `main` branch
   - GitHub Actions automatically builds and deploys the site

### GitHub Actions Deployment

The included `.github/workflows/deploy.yml` workflow:
- Triggers on push to `main` or manual dispatch
- Installs dependencies, builds the project
- Deploys the `dist` folder to GitHub Pages

### GitHub Pages Setup

1. Go to **Settings → Pages** in your GitHub repository
2. Under **Source**, select **GitHub Actions**
3. Push to `main` to trigger the first deployment

## Project Structure

```
├── .github/workflows/deploy.yml   # GitHub Actions deploy pipeline
├── public/                        # Static assets
├── src/
│   ├── admin/                     # Admin portal
│   │   ├── AdminLogin.jsx         # Passcode login
│   │   ├── AdminDashboard.jsx     # Dashboard with sidebar navigation
│   │   └── editors/               # Section editors
│   │       ├── HomeEditor.jsx
│   │       ├── AboutEditor.jsx
│   │       ├── ProjectsEditor.jsx
│   │       ├── ResumeEditor.jsx
│   │       ├── ContactEditor.jsx
│   │       └── SettingsEditor.jsx
│   ├── components/
│   │   └── Navbar.jsx             # Responsive navigation bar
│   ├── data/
│   │   └── portfolioData.js       # Data layer with sample content
│   ├── pages/                     # Public pages
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   ├── About.jsx
│   │   ├── Resume.jsx
│   │   ├── Contact.jsx
│   │   └── CustomPage.jsx
│   ├── theme/
│   │   └── theme.js               # MUI theme (B&W palette)
│   ├── App.jsx                    # Root component with routing
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── index.html
├── vite.config.js
└── package.json
```

## Tech Stack

- **Vite** — Build tool
- **React 19** — UI library
- **Material UI (MUI) v7** — Component library
- **React Router v7** — Client-side routing (HashRouter)
- **GitHub Actions** — CI/CD pipeline
- **GitHub Pages** — Hosting

## Customization

### Changing the Passcode

The admin passcode is checked in `src/admin/AdminLogin.jsx`. Update the comparison value to change it. For production use, consider implementing a more secure authentication mechanism.

### Changing the Base URL

Update the `base` property in `vite.config.js` to match your repository name:

```js
export default defineConfig({
  base: '/your-repo-name/',
});
```

### Sample Content

The default portfolio content is defined in `src/data/portfolioData.js`. This serves as the initial data when no changes have been saved. Edit this file to change the default template content.

## License

MIT
