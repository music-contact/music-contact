# 🎵 Music Contact

**Music Contact** is a full-stack web application that connects musicians — whether you're a solo artist looking for a band, or a group searching for new members. Users can browse profiles, explore music, and reach out to potential collaborators.

🔗 **[Live demo → music-contact.fly.dev](https://music-contact.fly.dev/artists)**

---

## The problem it solves

Finding musicians to play with is surprisingly hard. Platforms like social media are noisy and not built for it. Music Contact gives artists a dedicated space to showcase their style, list what they're looking for, and discover others — filtered by role (artist or group).

---

## Features

- **Artist & Group profiles** — with photo upload, social links (Instagram, Twitter, Spotify)
- **Spotify integration** — links directly to an artist's Spotify profile and streaming catalogue
- **Browse & filter** — search by artist type, sort ascending or descending
- **Authentication** — secure signup/login with bcrypt password hashing and session management
- **Image upload** — handled via Multer + Cloudinary (no local storage)
- **Containerised deployment** — Docker + Fly.dev for production

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Templating | Handlebars (HBS) |
| Database | MongoDB + Mongoose |
| Auth | express-session · bcryptjs |
| File uploads | Multer · Cloudinary |
| External API | Spotify Web API |
| Deployment | Docker · Fly.dev |

---

## Architecture decisions

**Server-side rendering with Handlebars** was chosen for simplicity and fast initial load — appropriate for a content-browsing app where SEO and time-to-first-paint matter more than interactivity.

**Cloudinary** handles all media storage, keeping the server stateless and the Docker image lightweight.

**Session-based auth** with connect-mongo persists sessions in MongoDB, avoiding the complexity of JWT for an MVC app at this scale.

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/music-contact/music-contact.git
cd music-contact

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in: MONGODB_URI, SESSION_SECRET, CLOUDINARY_*, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET

# Run in development
npm run dev
```

### With Docker

```bash
docker build -t music-contact .
docker run -p 3000:3000 music-contact
```

---

## Roadmap

- [ ] Real-time messaging between artists
- [ ] Genre and instrument filters
- [ ] Migrate frontend to React for richer interactions
- [ ] Audio sample uploads

---

## Team

Built as a collaborative project · [Edu Gamboa](https://github.com/physiodevapp) · [LinkedIn](https://www.linkedin.com/in/edu-gamboa/)
