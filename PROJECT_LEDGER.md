# Vantage: Project Ledger

**Current Status:** Phase 2 (Active AI Intelligence)
**Repository:** [https://github.com/Vpcodes11/AI-Content.git](https://github.com/Vpcodes11/AI-Content.git)
**Workflow:** Branch `dev` (Active Development) -> `main` (Production)
**Local Port (FE):** [http://localhost:3005](http://localhost:3005)
**Local Port (BE):** [http://localhost:8001](http://localhost:8001)

---

## 🎯 Project Mission
To build an autonomous, "deeply human" GTM Co-Pilot for indie founders that automates growth across X, Reddit, and LinkedIn without losing the founder's authentic voice.

---

## 🏗️ Technical Architecture
### Frontend (Next.js 15+)
- **Design System:** Cinematic Minimalist (Dark Mode first).
- **Styling:** Vanilla CSS Modules for performance and bespoke aesthetics.
- **State Management:** React Hooks + LocalStorage for session persistence.
- **Key Modules:** Ingestion, Analysis Loader, Dashboard, Scheduler.

### Backend (FastAPI + Python)
- **Scraper:** BeautifulSoup4 for autonomous product metadata extraction.
- **Intelligence:** Groq API (Llama 3.3 70B Versatile) for high-speed strategic reasoning.
- **Adapters:** Multi-source support for Websites, Social Links, and Manual Pitches.

---

## ✅ Accomplishments (Build History)
- [x] **Project Inception:** Defined "Cinematic Minimalist" design tokens.
- [x] **Core Landing Page:** Built high-conversion hero section and feature grid.
- [x] **Product Brain Ingestion:** Created multi-source selection (Website, Social, Pitch).
- [x] **AI Intelligence Integration:** Successfully connected Groq API for real-time URL analysis.
- [x] **Founder Dashboard:** Implemented metrics, content drafts, and platform badges.
- [x] **Autonomous Engine:** Added "Autonomous Mode" toggle and Smart Scheduler.
- [x] **Deployment Prep:** Initialized Git and pushed to [AI-Content](https://github.com/Vpcodes11/AI-Content.git).

---

## 🛠️ Current Environment
- **Node.js:** v20+
- **Python:** v3.10+ (venv located in `server/venv`)
- **API Dependencies:** `groq`, `fastapi`, `uvicorn`, `beautifulsoup4`, `requests`.
- **Environment Variables:** `GROQ_API_KEY` (Stored in `server/.env`).

---

## 📍 Roadmap (Next Steps)
- [ ] **Phase 3: Real Posting Adapters:** Connect Tweepy (X) and PRAW (Reddit) for actual publishing.
- [ ] **Phase 4: Persistence Layer:** Implement PostgreSQL/Supabase to store content history.
- [ ] **Phase 5: Competitor Intel:** Add a "Radar" feature to track competitor mentions and suggest replies.
- [ ] **Phase 6: Mobile Dashboard:** Optimize the UI for founder-on-the-go approvals.

---

## 🚀 Deployment & Production
### Docker Orchestration
- **Build All:** `docker-compose build`
- **Run All:** `docker-compose up -d`
- **Frontend Port (Prod):** 3005
- **Backend Port (Prod):** 8001

### Production Checklist
- [x] Standalone build configured in `next.config.ts`.
- [x] Dockerfiles for FE and BE.
- [x] Requirements.txt for BE.
- [ ] SSL/HTTPS configuration (Nginx/Traefik).
- [ ] API Key rotation & Secret management.
- [ ] Database persistence (Phase 4).

---

## 💡 Notes for Maintenance
- The frontend is forced to port **3005** to avoid conflicts with Opus Pro.
- The backend uses port **8001** for the same reason.
- To refresh the AI intelligence, clear `localStorage` on the dashboard.
