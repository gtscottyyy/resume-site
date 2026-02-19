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
| Styling | Plain CSS |
| Hosting | *(add yours here)* |

## Project Structure

```
app/
├── components/
│   ├── customnav.tsx       # Site-wide navigation
│   └── imagecarousel.tsx   # Photo carousel on about page
├── routes/
│   ├── _index.tsx          # Home / landing
│   ├── about.tsx           # About me
│   ├── experience.tsx      # Skills & experience
│   └── contact.tsx         # Contact info
├── styles/                 # Per-route CSS + shared styles
├── utils/
│   └── db.server.ts        # MongoDB connection + data fetching
└── root.tsx                # App shell
```

## Getting Started

### Prerequisites

- Node.js 22+
- A MongoDB database with a `resume` database and `copy` collection

### Environment Variables

Create a `.env` file at the project root:

```
MONGO_URI=your_mongodb_connection_string
```

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

All page copy is stored as a single document in the `resume.copy` MongoDB collection. Expected fields:

| Field | Page |
|---|---|
| `home_blurb` | Home |
| `home_title` | Home |
| `home_subtitle` | Home |
| `home_body` | Home |
| `home_button` | Home |
| `about_blurb` | About |
| `about_title` | About |
| `about_body` | About |
| `exp_blurb` | Experience |
| `exp_title` | Experience |
| `exp_body` | Experience |
| `exp_list_titles` | Experience (array) |
| `exp_list_bodies` | Experience (array) |
| `contact_title` | Contact |
| `contact_body` | Contact |
