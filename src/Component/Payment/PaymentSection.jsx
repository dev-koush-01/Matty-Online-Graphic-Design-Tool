import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import { Crown, Lock, LogOut, Menu, X, CheckCircle2, Sparkles, LayoutDashboard, Paintbrush } from "lucide-react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

/**************************************
 * Auth Context (mock)
 **************************************/
const AuthContext = createContext(null);
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, email, name }
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a logged-in user. Replace with your real auth.
    const demo = { id: "user_demo_123", email: "demo@matty.ai", name: "Matty Demo" };
    setUser(demo);

    // Pull premium status from your backend
    fetch("/api/me")
      .then(r => (r.ok ? r.json() : { isPremium: false }))
      .then(d => setIsPremium(!!d.isPremium))
      .catch(() => setIsPremium(false))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(() => ({ user, isPremium, setIsPremium, setUser }), [user, isPremium]);
  if (loading) return <div className="min-h-screen grid place-items-center text-gray-600">Loading Matty.ai…</div>;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**************************************
 * UI Shell
 **************************************/
function Navbar() {
  const { user, isPremium } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded hover:bg-gray-100" aria-label="Toggle Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to="/" className="flex items-center gap-2 font-extrabold text-xl">
            <Sparkles className="text-purple-600" />
            <span>Matty.ai</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 ml-6 text-sm">
            <NavLink to="/dashboard" active={location.pathname.startsWith("/dashboard")}>Dashboard</NavLink>
            <NavLink to="/editor" active={location.pathname.startsWith("/editor")}>Editor</NavLink>
            <NavLink to="/pricing" active={location.pathname.startsWith("/pricing")}>Pricing</NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {isPremium ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 text-yellow-800 px-3 py-1 text-xs font-medium">
              <Crown size={14} className="text-yellow-600" /> Premium
            </span>
          ) : (
            <Link to="/pricing" className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white shadow hover:bg-purple-700">
              <Crown size={16} /> Go Premium
            </Link>
          )}

          {user && (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 grid place-items-center rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white text-xs font-semibold">
                {user.name?.split(" ").map(s=>s[0]).slice(0,2).join("") || "U"}
              </div>
            </div>
          )}
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-3 grid gap-2 text-sm">
            <MobileLink to="/dashboard" onClick={()=>setOpen(false)}>Dashboard</MobileLink>
            <MobileLink to="/editor" onClick={()=>setOpen(false)}>Editor</MobileLink>
            <MobileLink to="/pricing" onClick={()=>setOpen(false)}>Pricing</MobileLink>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-lg hover:bg-gray-100 ${active ? "bg-gray-100 font-semibold" : "text-gray-600"}`}
    >
      {children}
    </Link>
  );
}

function MobileLink({ to, children, onClick }) {
  return (
    <Link to={to} onClick={onClick} className="px-3 py-2 rounded-lg hover:bg-gray-50">
      {children}
    </Link>
  );
}

/**************************************
 * Pages
 **************************************/
function Home() {
  return (
    <section className="bg-gradient-to-b from-white to-purple-50">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Design faster with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Matty.ai</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg">A modern, elegant editor for socials, posters, and presentations. Unlock premium to remove limits and export in HD.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/editor" className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-900">
              <Paintbrush size={18} /> Open Editor
            </Link>
            <Link to="/pricing" className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 hover:bg-white">
              <Crown size={18} className="text-yellow-600"/> View Pricing
            </Link>
          </div>
        </div>
        <HeroCard />
      </div>
    </section>
  );
}

function HeroCard() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-5 border">
      <div className="grid grid-cols-2 gap-4">
        <Stat label="Templates" value="543" />
        <Stat label="Active Users" value="1,500" />
      </div>
      <div className="mt-6 h-40 rounded-xl bg-gradient-to-tr from-purple-100 to-indigo-100 grid place-items-center text-gray-600">
        Elegant Canvas Preview
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border p-4">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-2xl font-bold text-purple-700">{value}</div>
    </div>
  );
}

function Dashboard() {
  const userGrowthData = [
    { month: "Jan", users: 200 },
    { month: "Feb", users: 350 },
    { month: "Mar", users: 500 },
    { month: "Apr", users: 800 },
    { month: "May", users: 1200 },
    { month: "Jun", users: 1500 },
  ];
  const revenueData = [
    { month: "Jan", revenue: 3000 },
    { month: "Feb", revenue: 4200 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 6800 },
    { month: "May", revenue: 8900 },
    { month: "Jun", revenue: 12000 },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Total Users" value="1,500" />
        <Card title="Templates" value="543" />
        <Card title="Revenue" value="$12,345" />
        <Card title="Uptime" value="99.98%" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="User Growth">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userGrowthData}>
              <CartesianGrid stroke="#eee" strokeDasharray="6 6" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#7c3aed" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Revenue">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid stroke="#eee" strokeDasharray="6 6" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#6366f1" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm h-80">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="mt-4 h-[calc(100%-2.5rem)]">{children}</div>
    </div>
  );
}

/**************************************
 * Pricing / Paywall
 **************************************/
function Pricing() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">Simple, transparent pricing</h2>
        <p className="mt-2 text-gray-600">Start free, upgrade anytime. Cancel whenever.</p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <PlanCard
          title="Free"
          price="$0"
          cta="Current Plan"
          features={["100MB storage","Limited templates","Watermarked exports"]}
          disabled
        />
        <ProPlanCard />
      </div>

      <FAQ />
    </section>
  );
}

function PlanCard({ title, price, cta, features, onClick, highlight, disabled }) {
  return (
    <div className={`rounded-3xl border bg-white p-6 shadow-sm ${highlight ? "ring-2 ring-purple-500" : ""}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">{title}</h3>
        {highlight && <Crown className="text-yellow-500" />}
      </div>
      <div className="mt-2 text-4xl font-extrabold">{price}<span className="text-base font-medium text-gray-500">/mo</span></div>
      <ul className="mt-4 space-y-2 text-sm text-gray-700">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={16}/>{f}</li>
        ))}
      </ul>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`mt-6 w-full rounded-xl px-4 py-2 ${disabled ? "bg-gray-200 text-gray-500" : "bg-purple-600 text-white hover:bg-purple-700"}`}
      >
        {cta}
      </button>
    </div>
  );
}

function ProPlanCard() {
  const [loading, setLoading] = useState(false);
  const startCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: import.meta.env.VITE_STRIPE_PRICE_ID || process.env.REACT_APP_STRIPE_PRICE_MONTHLY }),
      });
      const data = await res.json();
      if (data?.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PlanCard
      title="Premium"
      price="$9"
      cta={loading ? "Redirecting…" : "Go Premium"}
      onClick={startCheckout}
      highlight
      features={[
        "Unlimited storage",
        "All templates & assets",
        "No watermark, HD export",
        "Priority support",
      ]}
    />
  );
}

function FAQ() {
  return (
    <div className="mt-12 rounded-3xl border bg-white p-6">
      <h4 className="text-xl font-semibold">FAQs</h4>
      <div className="mt-4 grid md:grid-cols-3 gap-4 text-sm text-gray-700">
        <div>
          <div className="font-semibold">Can I cancel anytime?</div>
          <p className="mt-1">Yes. Manage your subscription from the billing portal.</p>
        </div>
        <div>
          <div className="font-semibold">Do you offer a free trial?</div>
          <p className="mt-1">Use the free plan as long as you like. Upgrade when ready.</p>
        </div>
        <div>
          <div className="font-semibold">What payment methods?</div>
          <p className="mt-1">Cards via Stripe by default. We can add UPI/Razorpay on request.</p>
        </div>
      </div>
    </div>
  );
}

/**************************************
 * Premium Guard + Editor
 **************************************/
function PremiumGuard({ children }) {
  const { isPremium } = useAuth();
  const location = useLocation();
  if (!isPremium) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="rounded-3xl border bg-white p-10 shadow-sm">
          <div className="mx-auto w-14 h-14 rounded-full bg-yellow-100 grid place-items-center">
            <Lock className="text-yellow-600" />
          </div>
          <h3 className="mt-4 text-2xl font-bold">This area is Premium</h3>
          <p className="mt-2 text-gray-600">Unlock the editor and HD exports by upgrading your plan.</p>
          <Link to={`/pricing?next=${encodeURIComponent(location.pathname)}`} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2 text-white hover:bg-purple-700">
            <Crown size={18}/> Go Premium
          </Link>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

function Editor() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid lg:grid-cols-[280px,1fr] gap-6">
        <div className="rounded-2xl border bg-white p-4 h-[70vh] overflow-auto">
          <div className="text-sm font-semibold text-gray-700">Assets</div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[...Array(9)].map((_,i)=> (
              <div key={i} className="aspect-square rounded-lg bg-gray-100" />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border bg-white p-4 h-[70vh]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600"><LayoutDashboard size={16}/> Canvas</div>
            <button className="rounded-lg bg-black text-white px-4 py-2 hover:bg-gray-900">Export HD</button>
          </div>
          <div className="mt-4 h-[calc(100%-3rem)] rounded-xl bg-gradient-to-tr from-purple-50 to-indigo-50 grid place-items-center text-gray-500">
            Your beautiful canvas lives here ✨
          </div>
        </div>
      </div>
    </div>
  );
}

/**************************************
 * Checkout Result (optional)
 **************************************/
function Success() {
  const { setIsPremium } = useAuth();
  useEffect(() => {
    fetch("/api/me").then(r=>r.json()).then(d=> setIsPremium(!!d.isPremium));
  }, [setIsPremium]);
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <div className="rounded-3xl border bg-white p-10 shadow-sm">
        <h3 className="text-2xl font-bold">Payment successful</h3>
        <p className="mt-2 text-gray-600">Premium is now active on your account. Enjoy!</p>
        <Link to="/editor" className="mt-6 inline-block rounded-xl bg-purple-600 px-5 py-2 text-white hover:bg-purple-700">Go to Editor</Link>
      </div>
    </div>
  );
}

function Cancel() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <div className="rounded-3xl border bg-white p-10 shadow-sm">
        <h3 className="text-2xl font-bold">Checkout canceled</h3>
        <p className="mt-2 text-gray-600">No worries—your account remains on the free plan.</p>
        <Link to="/pricing" className="mt-6 inline-block rounded-xl border px-5 py-2 hover:bg-white">Back to Pricing</Link>
      </div>
    </div>
  );
}

/**************************************
 * Payment Section
 **************************************/
export default function PaymentSection() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/editor" element={<PremiumGuard><Editor /></PremiumGuard>} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
