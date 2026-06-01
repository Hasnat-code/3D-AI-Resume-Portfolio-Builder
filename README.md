<div align="center">

<!-- HERO BANNER -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=Nexfolio&fontSize=80&fontColor=fff&animation=twinkling&fontAlignY=35&desc=AI-Powered%203D%20Resume%20%26%20Portfolio%20Builder&descAlignY=60&descSize=20" />

<br/>

<!-- BADGES ROW 1 -->
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)

<!-- BADGES ROW 2 -->
[![Claude](https://img.shields.io/badge/Claude-Anthropic-CC785C?style=for-the-badge&logo=anthropic&logoColor=white)](https://anthropic.com)
[![OpenAI](https://img.shields.io/badge/GPT--4o-OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com)
[![Gemini](https://img.shields.io/badge/Gemini_1.5-Google-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://aistudio.google.com)
[![Grok](https://img.shields.io/badge/Grok_API-xAI-PENDING-lightgrey?style=for-the-badge&logo=x&logoColor=white)](https://x.ai)

<!-- BADGES ROW 3 -->
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-a855f7?style=for-the-badge)](LICENSE)
[![Stars](https://img.shields.io/github/stars/yourusername/nexfolio?style=for-the-badge&color=00f5ff&logo=github)](https://github.com/yourusername/nexfolio)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-00f5ff?style=for-the-badge)](https://github.com/yourusername/nexfolio/pulls)

<br/>

<!-- DEMO GIF PLACEHOLDER -->
> ✨ **Cinematic · Futuristic · AI-Powered · 3D Interactive**

<br/>

**[🚀 Live Demo](https://nexfolio.vercel.app)** &nbsp;·&nbsp; **[📖 Docs](#-getting-started)** &nbsp;·&nbsp; **[🐛 Report Bug](https://github.com/yourusername/nexfolio/issues)** &nbsp;·&nbsp; **[💡 Request Feature](https://github.com/yourusername/nexfolio/issues)**

</div>

---

## 📌 Table of Contents

- [About The Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [AI Providers](#-ai-providers)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Supabase Setup](#-supabase-setup)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About The Project

**Nexfolio** is a full-stack, production-grade AI Resume & Portfolio Builder built for developers who want to stand out. It combines a cinematic 3D dark-theme frontend with real AI integrations — using **your own API key**, so you are always in full control and nothing is billed to us.

The entire interface is built with a futuristic aesthetic — glassmorphism cards, neon glow effects, a 3D interactive particle sphere, and a floating resume card that follows your cursor. Under the hood, every button does real work: auth is real Supabase email auth, the dashboard reads and writes to a real PostgreSQL database, and the AI Studio calls live APIs.

> 💡 **This is a portfolio project built to impress.** It demonstrates full-stack engineering, modern React patterns, real database design with RLS policies, and production-grade deployment — all in a single repo.

---

## ✨ Features

### 🖥️ Frontend
- **Cinematic Landing Page** with animated hero, floating stats, and scroll-reveal sections
- **3D Interactive Particle Sphere** — drag to rotate, built on Canvas API
- **Floating 3D Resume Card** — follows your cursor with smooth lerp animation and 3D tilt
- **Glassmorphism UI** throughout — blurred glass cards, neon borders, gradient text
- **Framer Motion** page transitions and micro-animations
- **Work Sans** typography — clean, modern, premium feel
- **Fully Responsive** — mobile, tablet, desktop

### 🔐 Authentication
- Email & Password signup / login via **Supabase Auth**
- Auto-creates user profile row on signup via Postgres trigger
- Protected routes — unauthenticated users bounced to landing
- Persistent sessions across browser refreshes

### 📊 Dashboard
- **Overview tab** — stats cards, quick actions, AI key status warning
- **Portfolios tab** — create, view, toggle public/private, delete portfolios
- **Resumes tab** — manage saved resumes, navigate to editor
- **AI Studio tab** — 5 AI tools in one panel
- **Settings tab** — update profile, save AI provider + API key

### 🤖 AI Studio (Bring Your Own Key)
| Tool | What it does |
|------|-------------|
| Generate Bio | Writes a compelling 3-sentence professional bio |
| Resume Summary | Creates an ATS-optimized resume summary |
| Improve Text | Rewrites any text to sound more professional |
| Skill Gaps | Compares your profile to a job description |
| ATS Analysis | Scores your resume and lists missing keywords |

### 📄 Resume Editor
- Split-pane editor with **live real-time preview**
- Sections: Personal Info, Bio, Skills, Experience, Education, Projects
- **AI Bio Generate** and **AI Improve** buttons inline
- Saves to Supabase `resumes` table
- Color-coded preview with skill chips

### 🎨 Design System
- Dark theme only (`#020408` base)
- CSS variables for all brand colors
- Neon cyan (`#00f5ff`) + violet (`#a855f7`) dual-tone palette
- Hover effects on every interactive element
- Custom scrollbar styling

---

## 🛠️ Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | React | 18.3 | UI library |
| **Build Tool** | Vite | 5.3 | Dev server + bundler |
| **Styling** | Tailwind CSS | 3.4 | Utility-first CSS |
| **Animation** | Framer Motion | 11.3 | Page transitions |
| **3D / Canvas** | Canvas API | Native | Particle sphere + cursor card |
| **Auth + DB** | Supabase | 2.44 | Auth, PostgreSQL, Storage |
| **State** | Zustand | 4.5 | Global client state |
| **Routing** | React Router | 6.25 | SPA navigation |
| **Icons** | Lucide React | 0.414 | Icon set |
| **Fonts** | Work Sans | Google Fonts | Display + body font |
| **Deploy** | Vercel | — | Hosting + CI/CD |

---

## 🤖 AI Providers

Nexfolio does **not** provide or bill for AI. You bring your own API key and choose your provider in Settings.

| Provider | Model Used | Status | Get Key |
|----------|-----------|--------|---------|
| **Claude** ⭐ Recommended | `claude-sonnet-4-20250514` | ✅ Active | [console.anthropic.com](https://console.anthropic.com) |
| **OpenAI** | `gpt-4o` | ✅ Active | [platform.openai.com](https://platform.openai.com/api-keys) |
| **Gemini** | `gemini-1.5-pro` | ✅ Active | [aistudio.google.com](https://aistudio.google.com/app/apikey) |
| **Grok (xAI)** | `grok-2` | 🔄 Pending | [x.ai/api](https://x.ai/api) |

> ⭐ **Claude is the recommended provider.** It produces the best quality bios, summaries, and ATS analysis for tech resumes. The app defaults to Claude when no preference is set.

> 🔄 **Grok API** integration is planned for the next release. The UI option will appear in Settings once implemented. Follow the repo to be notified.

---

## 📸 Screenshots

<div align="center">

| Landing Page | Dashboard |
|:---:|:---:|
| *Hero with 3D particle sphere and floating resume cursor card* | *Overview with stats, AI key status, quick actions* |

| Resume Editor | AI Studio |
|:---:|:---:|
| *Split-pane editor with live preview* | *5 AI tools — bio, summary, ATS, skill gaps, improve* |

| Auth Modal | Settings |
|:---:|:---:|
| *Glassmorphism sign up / sign in* | *Profile + AI key management* |

</div>

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:

```bash
node --version   # v18.0.0 or higher
npm --version    # v9.0.0 or higher
```

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/nexfolio.git
cd nexfolio
```

**2. Install dependencies**
```bash
npm install
```

**3. Create your environment file**
```bash
cp .env.example .env
```

**4. Fill in your Supabase credentials** (see [Supabase Setup](#-supabase-setup) below)
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

**5. Run the database schema** in Supabase SQL Editor (see [Supabase Setup](#-supabase-setup))

**6. Start the development server**
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> ⚠️ **Important:** After editing `.env`, always restart the dev server with `Ctrl+C` then `npm run dev`. Vite does **not** hot-reload environment variables.

---

## 🔑 Environment Variables

Create a `.env` file in the project root (never commit this file):

```env
# ── Supabase ─────────────────────────────────────────────────
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ── App ──────────────────────────────────────────────────────
VITE_APP_URL=http://localhost:5173
VITE_APP_NAME=Nexfolio
```

> 🔐 AI API keys (Claude, OpenAI, Gemini, Grok) are **never stored in `.env`**. Users enter them directly in the app Settings — they are saved to their Supabase profile and used only from their own browser session.

---

## 🗄️ Supabase Setup

### Step 1 — Create Project
1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Name it `nexfolio`, choose your region, generate a strong password
3. Wait ~2 minutes for provisioning

### Step 2 — Get API Keys
1. Go to **Settings → API**
2. Copy **Project URL** → `VITE_SUPABASE_URL`
3. Copy **anon public** key → `VITE_SUPABASE_ANON_KEY`

### Step 3 — Run Database Schema

Go to **SQL Editor → New Query** and run:

```sql
-- Extensions
create extension if not exists "uuid-ossp";

-- Profiles table
create table if not exists public.profiles (
  id            uuid references auth.users(id) on delete cascade primary key,
  name          text,
  title         text,
  bio           text,
  email         text,
  phone         text,
  location      text,
  github_url    text,
  linkedin_url  text,
  website       text,
  avatar_url    text,
  ai_provider   text not null default 'claude',
  ai_key        text default '',
  plan          text not null default 'free',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Portfolios table
create table if not exists public.portfolios (
  id          uuid default uuid_generate_v4() primary key,
  user_id     uuid references public.profiles(id) on delete cascade not null,
  title       text not null,
  slug        text unique,
  template    text not null default 'neural-dark',
  is_public   boolean not null default true,
  view_count  integer not null default 0,
  data        jsonb not null default '{}',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Resumes table
create table if not exists public.resumes (
  id          uuid default uuid_generate_v4() primary key,
  user_id     uuid references public.profiles(id) on delete cascade not null,
  title       text not null default 'My Resume',
  ats_score   integer,
  content     jsonb not null default '{}',
  raw_text    text,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-update timestamps
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger trg_portfolios_updated_at
  before update on public.portfolios
  for each row execute function public.handle_updated_at();

create trigger trg_resumes_updated_at
  before update on public.resumes
  for each row execute function public.handle_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)),
    new.email
  );
  return new;
end; $$;

create trigger trg_on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Enable RLS
alter table public.profiles   enable row level security;
alter table public.portfolios enable row level security;
alter table public.resumes    enable row level security;

-- RLS Policies
create policy "Users own their profile"
  on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "Users own their portfolios"
  on public.portfolios for all using (auth.uid() = user_id);

create policy "Public portfolios are viewable"
  on public.portfolios for select using (is_public = true);

create policy "Users own their resumes"
  on public.resumes for all using (auth.uid() = user_id);
```

### Step 4 — Configure Auth

1. Go to **Authentication → Providers → Email** → make sure it's **enabled**
2. Go to **Authentication → URL Configuration**
3. Set **Site URL** to `http://localhost:5173`
4. Add to **Redirect URLs**: `http://localhost:5173/**`

---

## 📁 Project Structure

```
nexfolio/
├── public/
│   └── favicon.svg                  # Animated SVG favicon
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx           # Reusable button with variants
│   │   │   ├── GlassCard.jsx        # Glassmorphism card wrapper
│   │   │   ├── Badge.jsx            # Status/label badges
│   │   │   └── Modal.jsx            # Accessible modal with Framer Motion
│   │   ├── layout/
│   │   │   ├── Navbar.jsx           # Sticky nav with auth buttons
│   │   │   ├── Footer.jsx           # Footer with links
│   │   │   └── DashboardLayout.jsx  # Sidebar + main layout wrapper
│   │   ├── three/
│   │   │   ├── HeroScene.jsx        # R3F scene wrapper
│   │   │   ├── ParticleSphere.jsx   # 3D rotating particle sphere
│   │   │   └── FloatingGeometry.jsx # Floating torus knot mesh
│   │   ├── sections/
│   │   │   ├── Hero.jsx             # Landing hero with canvas
│   │   │   ├── Features.jsx         # 6-card features grid
│   │   │   ├── AIDemo.jsx           # AI terminal demo panel
│   │   │   ├── Templates.jsx        # Portfolio template showcase
│   │   │   ├── Pricing.jsx          # 3-tier pricing cards
│   │   │   ├── Testimonials.jsx     # Social proof cards
│   │   │   └── CTA.jsx              # Bottom call-to-action
│   │   └── dashboard/
│   │       ├── Sidebar.jsx          # Navigation sidebar
│   │       ├── StatsRow.jsx         # Metric cards row
│   │       ├── PortfolioCard.jsx    # Single portfolio card
│   │       └── AIStudio.jsx         # AI tools panel
│   ├── pages/
│   │   ├── Landing.jsx              # / route — full landing page
│   │   ├── Dashboard.jsx            # /dashboard — main app
│   │   ├── ResumeEditor.jsx         # /editor — split-pane editor
│   │   ├── PortfolioBuilder.jsx     # /builder — template editor
│   │   └── Settings.jsx             # /settings — redirect to dash
│   ├── hooks/
│   │   ├── useAuth.js               # Auth state + sign in/up/out
│   │   ├── useAI.js                 # AI request wrapper with loading
│   │   └── usePortfolio.js          # Portfolio CRUD operations
│   ├── lib/
│   │   ├── supabase.js              # Supabase client (safe init)
│   │   └── ai.js                    # Claude/OpenAI/Gemini/Grok caller
│   ├── store/
│   │   └── useAppStore.js           # Zustand global state
│   ├── styles/
│   │   └── globals.css              # Tailwind + custom CSS variables
│   ├── App.jsx                      # Router + protected routes
│   └── main.jsx                     # React DOM entry point
├── .env.example                     # Environment template
├── .env                             # Your secrets (git-ignored)
├── .gitignore
├── index.html                       # Vite HTML entry
├── tailwind.config.js               # Tailwind theme + fonts
├── vite.config.js                   # Vite config with path alias
├── postcss.config.js                # PostCSS for Tailwind
├── vercel.json                      # Vercel SPA rewrite rules
├── SUPABASE_PATCH.sql               # Extra SQL if needed
└── package.json
```

---

## ⚙️ How It Works

### Authentication Flow
```
User fills form → signUp(email, pass, name)
  → Supabase Auth creates user
  → Postgres trigger auto-creates profiles row
  → User receives confirmation email
  → After confirming → signIn() → session stored
  → Navigate to /dashboard
```

### AI Request Flow
```
User clicks "Generate Bio"
  → Reads profile.ai_provider + profile.ai_key from Supabase
  → Calls callAI({ provider, apiKey, prompt }) in src/lib/ai.js
  → Direct browser → Claude/OpenAI/Gemini API call
  → Response shown in output panel
  → User can copy result
```

### Data Flow
```
Dashboard loads
  → useAuth() gets session from Supabase
  → Fetches portfolios + resumes for user_id
  → Displays in respective tabs
  → All CRUD operations go directly to Supabase via JS client
  → RLS policies enforce row-level security on database side
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

**Option A — Vercel Dashboard (easiest)**
1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Add environment variables:
   ```
   VITE_SUPABASE_URL      = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGci...
   VITE_APP_URL           = https://your-app.vercel.app
   ```
5. Click **Deploy**

**Option B — Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**After deploying — update Supabase:**
1. Go to **Authentication → URL Configuration**
2. Update **Site URL** to your Vercel URL
3. Add your Vercel URL to **Redirect URLs**

### Build for Production Locally
```bash
npm run build      # outputs to /dist
npm run preview    # preview production build locally
```

---

## 🗺️ Roadmap

| Feature | Status |
|---------|--------|
| Email authentication | ✅ Done |
| Dashboard with real data | ✅ Done |
| Resume editor with live preview | ✅ Done |
| AI Studio — Claude support | ✅ Done |
| AI Studio — OpenAI GPT-4o support | ✅ Done |
| AI Studio — Gemini 1.5 Pro support | ✅ Done |
| 3D cursor resume card | ✅ Done |
| Particle sphere hero | ✅ Done |
| Portfolio create/delete | ✅ Done |
| AI Studio — Grok (xAI) support | 🔄 Pending |
| PDF resume export | 🔄 Coming Soon |
| Custom domain for portfolios | 🔄 Coming Soon |
| Portfolio public page renderer | 🔄 Coming Soon |
| GitHub OAuth login | 🔄 Coming Soon |
| Google OAuth login | 🔄 Coming Soon |
| Analytics dashboard (view tracking) | 🔄 Coming Soon |
| Portfolio templates (Nova, Matrix) | 🔄 Coming Soon |
| Team / collab workspaces | 💡 Planned |

---

## 🤝 Contributing

Contributions are what make the open source community great. Any contributions are **welcome**.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please follow the [Conventional Commits](https://conventionalcommits.org) format.

---

## 🐛 Common Issues

| Error | Cause | Fix |
|-------|-------|-----|
| `supabaseUrl is required` | `.env` file missing or wrong variable names | Create `.env` with correct `VITE_` prefix keys |
| Blank white screen | Supabase crash before render | Check F12 console, verify `.env` exists |
| `Unexpected token 'export'` | Config file using CommonJS syntax | Change `module.exports =` to `export default` in config files |
| Auth works locally but not on Vercel | Redirect URLs not updated | Add Vercel URL to Supabase Auth → URL Configuration |
| AI returns error | Wrong or missing API key | Go to Dashboard → Settings → add correct key for chosen provider |
| Dev server doesn't pick up `.env` changes | Vite caches env vars | Restart dev server: `Ctrl+C` then `npm run dev` |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

<!-- FOOTER WAVE -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer" />

**Built with ❤️ by Muhammad Hasnat Imtiaz (https://github.com/hasnat-code)**

*If this project helped you land a job or impressed a recruiter — drop a ⭐ on GitHub!*

[![GitHub stars](https://img.shields.io/github/stars/yourusername/nexfolio?style=social)](https://github.com/yourusername/nexfolio)

</div>
