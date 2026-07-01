# Nexoresha Media Works

Nexoresha Media Works is a premium, high-fidelity luxury digital ecosystem website designed to scale brand reach, conversion, and digital presence through cinematic precision and branding strategy.

---

## 🌟 Core Features

- **Luxury Cinematic Aesthetic**: Curated color palettes, dark modes, glassmorphism, and responsive layouts styled with Vanilla CSS.
- **Interactive Package Builder ("Build Your Engine")**: Real-time custom service compiler that calculates investment dynamically and showcases node-based component visualizers.
- **Full Authentication Flow**: Secure Sign In, Sign Up, and Forgot Password interfaces connected to Supabase Auth with standard password strength meters.
- **Dynamic Local Simulator**: Automatical fallback to local storage-based auth and database simulators when live Supabase configuration is missing or inactive.
- **Protected Control Room (Dashboard)**: Personal space to monitor active engine campaigns, view system activity timelines, and manage profile credentials safely.
- **Integrated Contact Form**: Direct pipeline saving form submissions to Supabase (`inquiries` table) and dispatching instant email alerts via EmailJS REST API, with partial success warning recovery.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: Vanilla CSS (Custom tokens, design-system variables)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/)
- **Backend Integrations**: [@supabase/supabase-js](https://supabase.com/docs/reference/javascript/introduction) + [EmailJS REST API](https://www.emailjs.com/)

---

## 📁 Project Structure

```text
├── .env                  # Environment Variables (Supabase, EmailJS)
├── index.html            # Main Entry HTML Page
├── package.json          # Node Modules Dependencies & Scripts
├── src/
│   ├── App.css           # Global layouts and animations
│   ├── App.jsx           # Routing paths (react-router-dom)
│   ├── index.css         # Theme design tokens, styles, global overrides
│   ├── main.jsx          # DOM rendering entrypoint
│   ├── components/       # Reusable components
│   │   ├── Contact/      # Contact Form with Supabase + EmailJS
│   │   ├── Navbar/       # Navbar component (responsive menu, cart)
│   │   ├── PackageBuilder/# Interactive package builder & visualizer
│   │   ├── ProtectedRoute.jsx # Route guard for authentication
│   │   └── ...
│   ├── config/           # App Configuration
│   │   ├── config.js     # Site-wide contact & social config
│   │   ├── supabase.js   # Supabase client instantiation
│   │   └── supabaseSimulator.js # Local storage auth & db simulator fallback
│   ├── context/          # State Context Providers
│   │   └── AuthContext.jsx # Authentication state provider
│   ├── hooks/            # Custom React Hooks
│   │   └── useAuth.js    # Auth context access hook
│   └── pages/            # Core Pages
│       ├── Auth/         # SignIn, SignUp, ForgotPassword
│       ├── Dashboard/    # User Dashboard
│       └── Home.jsx      # Multi-section Landing Page
```

---

## 🚀 Getting Started

### 1. Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Installation

Clone the repository and install dependencies:

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add your credentials:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_jwt_key

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### 4. Running the Development Server

Start Vite local development server:

```bash
npm run dev
```

The application will be served at `http://localhost:5173/` (or the next available port).

### 5. Production Build

To build the static application bundle:

```bash
npm run build
```

---

## 🛡️ Database Schema

For live contact form submissions to save, create a table named `inquiries` in your Supabase database:

```sql
create table inquiries (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  phone text not null,
  service text not null,
  message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

---

## 🔒 Local Storage Simulator Mode

If you run the project locally without valid Supabase URL/key configuration (or if the key doesn't start with `eyJ` representing a JWT), the application will automatically switch to **Simulator Mode**:
- **Authentication**: Accounts registered via Sign Up are saved securely in local storage. Logins check credentials against local storage.
- **Inquiries**: Submissions sent through the contact form are logged to the console and saved to local storage (`nexoresha_sim_db_inquiries`).
