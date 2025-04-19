# Kimih Platform

**Kimih** is a modern web platform for booking local beauty and wellness services, built to empower businesses in the Middle East. As the first of its kind in the region, Kimih provides a seamless, subscription-free solution for managing appointments, team members, and customer relationships through a powerful and user-friendly interface.

---

## ✨ Features

- 🗓️ **Appointment Scheduling** — Easily manage bookings between clients and team members.
- 👥 **Team Management** — Assign team members to services, track availability, and manage calendars.
- 📅 **Integrated Calendar** — FullCalendar integration for viewing and managing appointments.
- 📱 **Responsive UI** — Built with Tailwind CSS and shadcn/ui for a clean, modern experience across devices.
- 🔐 **Authentication** — Secure login and signup via Supabase Auth (email, Google, Facebook).
- 📊 **Dashboard** — Visual overview of activity including appointments, revenue, and performance.
- 🧾 **Client & Service Management** — Easily create, update, and track client data and offered services.
- 🌐 **Multi-domain Auth** — Supports cross-subdomain authentication for marketing site and dashboard.

---

## 🛠 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) with App Router
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Backend as a Service:** [Supabase](https://supabase.com/)
- **Database:** PostgreSQL (via Supabase)
- **Calendar:** [FullCalendar](https://fullcalendar.io/) React integration
- **Icons:** [react-icons](https://react-icons.github.io/react-icons/)
- **Validation:** [Zod](https://github.com/colinhacks/zod)
- **Auth Providers:** Email, Google, Facebook (via Supabase OAuth)
- **Image Upload:** Uppy + Supabase Storage

---

## ⚙️ Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/1337Impact/kimih-website
cd kimih-platform
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root of the project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXTAUTH_SECRET=your_nextauth_secret
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to start using the app.

---

## 🧪 Scripts

- `dev` – Starts the development server
- `build` – Builds the production app
- `start` – Starts the production server
- `lint` – Runs the linter

---

## 📁 Project Structure

```
.
├── app/                # Next.js app directory (routing, pages, layout)
├── components/         # Shared React components (UI, Layout, etc.)
├── lib/                # Utility functions and Supabase client setup
├── types/              # TypeScript types
├── styles/             # Global styles (Tailwind, fonts, etc.)
├── public/             # Static assets
├── supabase/           # Database schema, edge functions, triggers
└── ...
```

---

## 🚀 Deployment

Deploy Kimih instantly with [Vercel](https://vercel.com/):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## 📌 Roadmap

- [x] Calendar & appointment management
- [x] Multi-provider authentication
- [x] Admin & team roles
- [x] Client management
- [ ] Payments & invoicing integration
- [ ] SMS & email reminders
- [ ] Dark mode
- [ ] Analytics dashboard

---

## 🧠 About

**Kimih** was founded in 2024 and is headquartered in Dubai. The platform was created to transform the regional beauty and wellness industry by making it easier for local businesses to thrive without the burden of subscription fees.


---

## 🤝 Contributing

We welcome contributions! Please open issues or submit pull requests for improvements or bug fixes.

