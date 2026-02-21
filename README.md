# scotty-henry-portfolio

Personal portfolio and resume site. Built as a living document — a place to showcase work, experience, and contact info without relying on third-party profile platforms.

## What it is

A full-stack web app that serves as an online presence / resume replacement. Content (copy, titles, body text) is stored in MongoDB and served dynamically, so updates to content don't require a code deploy.

## Stack

| Layer | Tech |
|---|---|
| Framework | [Remix](https://remix.run) (v2) |
| Runtime | Node.js 22 |
| Language | TypeScript |
| Database | MongoDB (Atlas) |
| Images | Cloudinary |
| Email | Resend |
| PDF | @react-pdf/renderer |
| AI | Anthropic (Claude Haiku) |
| Styling | Plain CSS |
| Hosting | Vercel |

## Features

- **Filterable experience timeline** — click any tech tag to filter roles
- **On-demand PDF resume** — generated server-side from live MongoDB data (`/resume.pdf`)
- **GitHub activity feed** — recent public push events on the home page (5-min server cache)
- **Spotify now playing widget** — fixed bottom-right, polls every 30s, falls back to last played
- **Terminal overlay** — `ctrl+shift+y` from anywhere; commands: `ls`, `whoami`, `cat`, `cd`, `ask`, `clear`, `exit`
- **AI chatbot** — `ask [question]` inside the terminal, powered by Claude Haiku using full resume data as context
- **Snake easter egg** — Konami code (↑↑↓↓←→←→BA) triggers a canvas Snake game

## Project Structure

```
app/
├── components/
│   ├── customnav.tsx         # Site-wide navigation
│   ├── imagecarousel.tsx     # Photo carousel (about page)
│   ├── spotifywidget.tsx     # Spotify now playing widget
│   ├── terminaloverlay.tsx   # Terminal overlay + AI chatbot
│   └── snakegame.tsx         # Snake easter egg (Konami code)
├── routes/
│   ├── _index.tsx            # Home / landing + GitHub feed
│   ├── about.tsx             # About page
│   ├── experience.tsx        # Filterable experience timeline
│   ├── contact.tsx           # Contact form (Resend)
│   ├── resume[.pdf].tsx      # PDF resume resource route
│   ├── api.spotify.ts        # Spotify now playing endpoint
│   └── api.ask.ts            # AI chatbot endpoint
├── styles/                   # Per-route CSS + shared tokens
├── utils/
│   ├── db.server.ts          # MongoDB connection + caching
│   ├── github.server.ts      # GitHub activity fetch + cache
│   ├── spotify.server.ts     # Spotify API + token management
│   └── resume-pdf.server.tsx # PDF document component
└── root.tsx                  # App shell, global overlays, keyboard shortcuts
```

## Getting Started

### Prerequisites

- Node.js 22+
- MongoDB Atlas database (`resume` db, `copy` collection)
- Spotify Developer app (for now playing widget)
- Anthropic API key (for terminal AI chatbot)
- Resend account (for contact form emails)

### Environment Variables

```
MONGO_URI=
RESEND_API_KEY=
CONTACT_EMAIL=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
ANTHROPIC_API_KEY=
```

All env vars are managed via Vercel in production. For local dev, create a `.env` file at the project root with the same vars.

### Spotify Setup (one-time)

1. Create a Spotify app at developer.spotify.com
2. Add `http://127.0.0.1:3000/spotify/callback` as a redirect URI
3. Add `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` to `.env`
4. Run the dev server and visit `http://127.0.0.1:3000/spotify/auth`
5. Copy the refresh token shown and add it as `SPOTIFY_REFRESH_TOKEN`
6. Delete the `spotify.auth` and `spotify.callback` route files

### Install & Run

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000` by default.

### Build for Production

```bash
npm run build
npm run start
```

## Content Model

All page copy lives in a single document in the `resume.copy` MongoDB collection.

| Field | Type | Used In |
|---|---|---|
| `home_blurb` | string | Home |
| `home_title` | string | Home, PDF, Terminal |
| `home_subtitle` | string | Home, PDF, Terminal |
| `home_body` | string | Home |
| `home_button` | string | Home |
| `about_blurb` | string | About |
| `about_title` | string | About |
| `about_body` | string | About, PDF, Terminal |
| `exp_blurb` | string | Experience |
| `exp_title` | string | Experience |
| `exp_body` | string | Experience |
| `experience[]` | array | Experience, PDF, AI context |
| `experience[].company` | string | |
| `experience[].role` | string | |
| `experience[].project` | string | |
| `experience[].dates` | string | |
| `experience[].description` | string | |
| `experience[].tags` | string[] | |
| `contact_title` | string | Contact |
| `contact_body` | string | Contact |
| `linkedin_url` | string | Contact, PDF |
| `headshot_url` | string | Nav (Cloudinary URL) |
| `carousel_images[]` | string[] | About (Cloudinary URLs) |
