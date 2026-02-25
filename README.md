# FinFolio — Finance Portfolio Template

A deployable portfolio web app template built with **Vite + React + Material UI**, designed for finance students and professionals. Features a sharp, editorial black-and-white design and a built-in **Admin Portal** for managing all content without editing code.

## Features

- **Public Portfolio Pages** — Home, Projects, About, Resume, Contact
- **Project Detail Pages** — Dedicated pages for each project with rich markdown content and embeds
- **Markdown Authoring** — Write project content in Markdown via the admin portal with live preview
- **Rich Embed Support** — Embed YouTube, Google Docs/Sheets, PDFs, Microsoft Office, images, and more
- **Admin Portal (CMS)** — Full CRUD dashboard to manage all content from the browser (hidden from public navigation)
- **Quotes / Own Words CMS** — Manage personal quotes with CRUD, featured toggle, ordering, and attribution
- **Modern About Page** — Polished design with timeline, skill progress bars, metrics, achievements, and contact links
- **Sharp B&W Design** — Professional, editorial typography with Space Grotesk + Sora fonts, minimal borders, no rounded corners
- **Responsive** — Desktop, tablet, and mobile layouts
- **GitHub Pages Ready** — HashRouter for SPA compatibility, GitHub Actions deploy workflow
- **Custom Pages** — Create and manage additional pages from the admin portal

## Typography & Fonts

The site uses a custom font system loaded via `@fontsource`:

| Usage | Font | Weights |
|-------|------|---------|
| **Headings / Display** | Space Grotesk | 400–700 |
| **Body / UI text** | Sora | 300–700 |

**Type scale**: display, h1–h6, body1, body2, caption, overline — all defined in `src/theme/theme.js`.

**Tabular numerals** are enabled for finance content (tables, metrics, stats) via the `.tabular-nums` CSS class and global CSS rules.

Fallback fonts: Helvetica → Arial → sans-serif.

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

The admin portal is hidden from the public navigation but remains accessible via direct URL.

1. Navigate to `/#/admin` in the browser
2. Enter the passcode: **Soumya01**
3. Use the dashboard to manage all portfolio sections

### What You Can Edit

| Section      | Fields                                                                 |
| ------------ | ---------------------------------------------------------------------- |
| **Home**     | Hero title/subtitle, intro text, snapshot panel (location/role/availability), CTA buttons, stats, custom sections |
| **About**    | Profile, bio, education, experience, skills, certifications, achievements, metrics, contact links |
| **Projects** | Title, slug, subtitle, description, category, tags, tech stack, links, markdown content, embeds, hero image, date, status (draft/published), featured toggle |
| **Resume**   | Summary, downloadable file link, structured sections                   |
| **Contact**  | Email, phone, address, LinkedIn, GitHub, social links                 |
| **Quotes**   | Quote text, attribution label, context/tag, featured toggle, order control |
| **Settings** | Site title, page visibility toggles, custom pages                     |

## Quotes / Own Words

A CMS-managed section for personal quotes that appear on the homepage and optionally other pages.

### Admin Portal (Quotes Manager)

1. Go to **Admin → Quotes**
2. Add quotes with:
   - **Quote text** (required) — the quote content
   - **Attribution** (optional) — e.g., "Me", "Principle", "Note to self"
   - **Context / Tag** (optional) — e.g., "Work ethic", "Markets", "Learning"
   - **Featured** toggle — show on homepage
   - **Order** — use up/down arrows to reorder
3. Click **Save Changes**

### Public Display

- The homepage displays the first featured quote in an editorial block
- The `QuoteBlock` component supports `mode="featured"` (single) or `mode="rotating"` (auto-rotate)
- Quotes use large typography with minimal styling: opening quote mark, bold text, attribution

## Homepage Sections

The redesigned homepage features an editorial layout with these sections:

| Section | Description |
|---------|-------------|
| **01 / Hero** | Editorial split layout — headline + subtitle on left, snapshot panel on right (name, role, location, availability, quick links) |
| **02 / Key Metrics** | Stats row with tabular numerals and vertical separators |
| **03 / Featured Work** | Project grid with category filter buttons, sharp bordered cards |
| **04 / Featured Quote** | Quote block pulled from the Quotes CMS |
| **05 / Custom Sections** | User-defined content sections |
| **06 / CTA Footer** | "Let's connect" call-to-action with email and contact page links |

## Creating Project Detail Pages

Each project can have a dedicated detail page accessible at `/#/projects/:slug`.

### Via Admin Portal

1. Go to **Admin → Projects**
2. Click **Add Project** or **Edit** an existing project
3. Fill in the project metadata:
   - **Title** — The project name
   - **Slug** — Auto-generated from the title (editable). This becomes the URL path (e.g., `my-project` → `/#/projects/my-project`)
   - **Subtitle** — Short summary shown below the title
   - **Category** — Used for filtering on the projects gallery
   - **Tags** — Comma-separated tags
   - **Tech Stack** — Comma-separated technologies used
   - **Hero Image URL** — Full-width image at the top of the detail page
   - **Date / Timeline** — When the project was completed
   - **Status** — `published` (visible) or `draft` (hidden from gallery)
   - **Featured** — Toggle to highlight on the home page
4. Write the project content in the **Markdown Content** editor
5. Add **Embeds** for rich media (YouTube, PDFs, etc.)
6. Add **Links** (GitHub, live demo, docs, etc.)
7. Set **Related Projects** as comma-separated slugs
8. Click **Save Changes**

### Markdown Usage

The markdown editor supports full **GitHub Flavored Markdown** (GFM):

```markdown
## Section Heading

This is a paragraph with **bold** and *italic* text.

### Subsection

- Bullet list item 1
- Bullet list item 2

1. Numbered list
2. Second item

| Column 1 | Column 2 |
|-----------|----------|
| Data      | Value    |

> Blockquote text

`inline code` and code blocks:

​```python
def calculate():
    return result
​```

[Link text](https://example.com)

![Image alt](https://example.com/image.png)
```

#### Embed Shortcodes in Markdown

You can embed rich content directly in markdown using shortcodes:

```
[embed:youtube url="https://youtube.com/watch?v=VIDEO_ID" title="My Video"]
[embed:pdf url="https://example.com/document.pdf" title="Report"]
[embed:gdocs url="https://docs.google.com/document/d/DOC_ID/preview" title="Document"]
[embed:gsheets url="https://docs.google.com/spreadsheets/d/SHEET_ID/preview" title="Spreadsheet"]
[embed:msoffice url="https://example.com/presentation.pptx" title="Slides"]
[embed:image url="https://example.com/photo.jpg" title="Photo"]
```

### Embed Support

Embeds can be added in two ways:

1. **Embed shortcodes in markdown** — Insert `[embed:TYPE url="URL" title="TITLE"]` directly in the markdown content
2. **Structured embed sections** — Add embeds via the admin UI under the "Embeds" section of each project

Supported embed types:

| Type         | Description                              | Behavior                                    |
| ------------ | ---------------------------------------- | ------------------------------------------- |
| `youtube`    | YouTube videos                           | Renders embedded player (16:9)              |
| `pdf`        | PDF documents                            | Renders in-page PDF viewer                  |
| `gdocs`      | Google Docs                              | Renders Google Docs preview iframe          |
| `gsheets`    | Google Sheets                            | Renders Google Sheets preview iframe        |
| `msoffice`   | Microsoft Office (Word/Excel/PowerPoint) | Uses Office Online viewer                   |
| `image`      | Images                                   | Renders responsive image                    |
| `github`     | GitHub repositories                      | Shows card with "Open on GitHub" button     |

If an embed fails to load (iframe restrictions, invalid URL, etc.), it gracefully falls back to a preview card with an external link button.

## About Page Content

The About page features a modern, section-based layout managed entirely through the admin portal.

### Sections

| Section             | Description                                      |
| ------------------- | ------------------------------------------------ |
| **Profile**         | Photo, name, headline, intro description         |
| **Bio**             | Detailed biography text                          |
| **Metrics**         | Key stats (e.g., "10+ Projects", "15+ Models")  |
| **Contact Links**   | Quick links (Email, LinkedIn, GitHub, etc.)      |
| **Experience**      | Vertical timeline with role, company, period     |
| **Education**       | Card grid with degree, institution, year         |
| **Skills**          | Progress bars with proficiency levels            |
| **Certifications**  | Card grid with name and year                     |
| **Achievements**    | Cards with title, description, and year          |
| **Custom Sections** | User-defined additional sections                 |

### Managing About Content

1. Go to **Admin → About**
2. Edit the profile fields (name, title, photo URL, intro)
3. Write a detailed bio
4. Add education entries, experience timeline items, skills with proficiency levels
5. Add certifications, achievements, metrics/stats
6. Add contact quick links (Email, LinkedIn, GitHub, etc.)
7. Click **Save Changes**

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
│   │       ├── QuotesEditor.jsx   # Quotes CRUD manager
│   │       └── SettingsEditor.jsx
│   ├── components/
│   │   ├── Navbar.jsx             # Responsive navigation bar
│   │   ├── QuoteBlock.jsx         # Quote display component (featured / rotating)
│   │   ├── MarkdownRenderer.jsx   # Markdown rendering with embed shortcodes
│   │   └── EmbedBlock.jsx         # Rich embed component (YouTube, PDF, etc.)
│   ├── data/
│   │   └── portfolioData.js       # Data layer with sample content + quotes
│   ├── pages/                     # Public pages
│   │   ├── Home.jsx               # Redesigned editorial homepage
│   │   ├── Projects.jsx           # Project gallery with filtering
│   │   ├── ProjectDetail.jsx      # Dedicated project detail page
│   │   ├── About.jsx              # Modern redesigned About page
│   │   ├── Resume.jsx
│   │   ├── Contact.jsx
│   │   └── CustomPage.jsx
│   ├── theme/
│   │   └── theme.js               # MUI theme (B&W, sharp corners, Space Grotesk + Sora)
│   ├── App.jsx                    # Root component with routing
│   ├── main.jsx                   # Entry point + font imports
│   └── index.css                  # Global styles + tabular numerals
├── index.html
├── vite.config.js
└── package.json
```

## Tech Stack

- **Vite** — Build tool
- **React 19** — UI library
- **Material UI (MUI) v7** — Component library (sharp styling overrides)
- **Space Grotesk + Sora** — Fonts via @fontsource
- **React Router v7** — Client-side routing (HashRouter)
- **react-markdown** — Markdown rendering
- **remark-gfm** — GitHub Flavored Markdown support
- **rehype-sanitize** — XSS-safe HTML sanitization
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
