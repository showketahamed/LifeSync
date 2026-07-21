import { useState, useEffect } from "react";
import {
  LayoutDashboard, CheckSquare, Wallet, Receipt, FileText, GraduationCap,
  Target, Users, Heart, AlertTriangle, Bot, Bell, Settings, Menu, X,
  Moon, Sun, Search, ChevronRight, TrendingUp, TrendingDown, Calendar,
  Plus, ArrowRight, Star, Shield, Zap, Globe, Phone, Mail, LogIn,
  Eye, EyeOff, ChevronDown, MoreHorizontal, Flame, BookOpen, Dumbbell,
  Droplets, Clock, Home, CreditCard, DollarSign, PieChart, BarChart2,
  MessageCircle, Send, Mic, Paperclip, Trash2, Edit2, Download, Upload,
  CheckCircle, AlertCircle, XCircle, Info, Lock, User, RefreshCw,
  MapPin, Stethoscope, Pill, Activity, Database, Key, BarChart as BarChartIcon,
  UserCheck, UserX, Ban, ShieldAlert, ServerCrash, HardDrive,
  FileBarChart, Megaphone, TicketCheck, ThumbsUp, LogOut, Cpu,
  LineChart, Layers, Package, Globe2, Filter, SlidersHorizontal
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart as RePieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ─── Types ───────────────────────────────────────────────────────────────────
type Page = "landing" | "login" | "register" | "dashboard" | "tasks" | "finance" |
  "bills" | "documents" | "student" | "goals" | "habits" | "family" | "health" |
  "emergency" | "ai" | "notifications" | "settings" | "admin";

// ─── Sample Data ──────────────────────────────────────────────────────────────
const monthlyData = [
  { month: "Jan", income: 35000, expense: 21000 },
  { month: "Feb", income: 35000, expense: 24500 },
  { month: "Mar", income: 38000, expense: 22000 },
  { month: "Apr", income: 35000, expense: 26000 },
  { month: "May", income: 35000, expense: 19500 },
  { month: "Jun", income: 40000, expense: 22500 },
];

const expenseCategories = [
  { name: "House Rent", value: 8000, color: "#059669" },
  { name: "Grocery", value: 4500, color: "#1e3a5f" },
  { name: "Transport", value: 2200, color: "#f59e0b" },
  { name: "Internet", value: 800, color: "#3b82f6" },
  { name: "Education", value: 3000, color: "#8b5cf6" },
  { name: "Others", value: 4000, color: "#94a3b8" },
];

const tasks = [
  { id: 1, title: "Submit assignment — Data Structures", category: "Study", priority: "High", due: "Today", status: "todo" },
  { id: 2, title: "Pay electricity bill", category: "Finance", priority: "High", due: "Tomorrow", status: "todo" },
  { id: 3, title: "Prepare for mid-term exam", category: "Study", priority: "Medium", due: "Jun 15", status: "in_progress" },
  { id: 4, title: "Call family in Chittagong", category: "Family", priority: "Low", due: "Today", status: "todo" },
  { id: 5, title: "30 min morning walk", category: "Health", priority: "Medium", due: "Today", status: "completed" },
  { id: 6, title: "Update resume with new project", category: "Work", priority: "Medium", due: "Jun 20", status: "todo" },
];

const bills = [
  { id: 1, name: "DESCO Electricity", provider: "DESCO", amount: 1850, due: "Jun 15, 2025", status: "upcoming", method: "bKash", icon: "⚡" },
  { id: 2, name: "Grameenphone Internet", provider: "GP", amount: 799, due: "Jun 18, 2025", status: "upcoming", method: "Card", icon: "📶" },
  { id: 3, name: "House Rent", provider: "Landlord", amount: 8000, due: "Jun 05, 2025", status: "overdue", method: "Cash", icon: "🏠" },
  { id: 4, name: "University Tuition", provider: "BUET", amount: 3500, due: "Jun 30, 2025", status: "upcoming", method: "Bank", icon: "🎓" },
  { id: 5, name: "Toffee (Subscription)", provider: "BTRC", amount: 150, due: "Jun 10, 2025", status: "paid", method: "Nagad", icon: "📺" },
];

const documents = [
  { id: 1, name: "National ID Card", number: "1234 56XX XXXX", issued: "2020-03-15", expiry: "2030-03-14", status: "valid", daysLeft: 1735, type: "NID" },
  { id: 2, name: "Passport", number: "AB XXXXX5", issued: "2022-06-01", expiry: "2027-05-31", status: "expiring", daysLeft: 160, type: "Passport" },
  { id: 3, name: "Student ID", number: "BUET-20-XX123", issued: "2020-09-01", expiry: "2025-08-31", status: "expiring", daysLeft: 52, type: "Student ID" },
  { id: 4, name: "Birth Certificate", number: "BCert-XXXX-2001", issued: "2001-05-20", expiry: null, status: "valid", daysLeft: null, type: "Birth Cert" },
];

const transactions = [
  { id: 1, desc: "bKash — Electricity Bill", amount: -1850, date: "Jun 10", category: "Bills", type: "debit" },
  { id: 2, desc: "Freelance Payment", amount: +8000, date: "Jun 08", category: "Income", type: "credit" },
  { id: 3, desc: "Shajgoj — Grocery", amount: -3200, date: "Jun 07", category: "Grocery", type: "debit" },
  { id: 4, desc: "University Stipend", amount: +5000, date: "Jun 01", category: "Income", type: "credit" },
  { id: 5, desc: "Pathao Ride", amount: -220, date: "Jun 01", category: "Transport", type: "debit" },
];

const goals = [
  { id: 1, title: "Buy a New Laptop", target: 120000, saved: 45000, category: "Finance", deadline: "Dec 2025", color: "#059669" },
  { id: 2, title: "Pass IELTS with 7.5", target: 100, saved: 65, category: "Education", deadline: "Sep 2025", color: "#1e3a5f", unit: "%" },
  { id: 3, title: "Emergency Fund", target: 50000, saved: 18000, category: "Finance", deadline: "Mar 2026", color: "#f59e0b" },
  { id: 4, title: "Visit Cox's Bazar", target: 25000, saved: 8500, category: "Travel", deadline: "Jan 2026", color: "#3b82f6" },
];

const habits = [
  { id: 1, name: "Study 4 hrs", icon: "📚", streak: 12, done: true },
  { id: 2, name: "Exercise", icon: "🏃", streak: 5, done: true },
  { id: 3, name: "Read 30 min", icon: "📖", streak: 8, done: false },
  { id: 4, name: "Water 8 glasses", icon: "💧", streak: 3, done: true },
  { id: 5, name: "Sleep 8 hrs", icon: "😴", streak: 2, done: false },
  { id: 6, name: "Prayer", icon: "🤲", streak: 21, done: true },
];

const notifications = [
  { id: 1, title: "Electricity bill due in 5 days", desc: "DESCO — ৳1,850 due Jun 15", type: "bill", read: false, time: "2h ago" },
  { id: 2, title: "Passport expiring in 160 days", desc: "Consider renewal before August", type: "document", read: false, time: "1d ago" },
  { id: 3, title: "Assignment deadline tomorrow", desc: "Data Structures — Jun 11, 11:59 PM", type: "study", read: false, time: "3h ago" },
  { id: 4, title: "Monthly budget summary ready", desc: "You spent ৳22,500 this month", type: "finance", read: true, time: "2d ago" },
  { id: 5, title: "House Rent overdue!", desc: "June rent still unpaid — contact landlord", type: "bill", read: false, time: "5h ago" },
];

const aiMessages = [
  { role: "assistant", content: "আস্সালামু আলাইকুম! I'm **LifeSync AI**, your personal life assistant. How can I help you today? You can ask me to plan your day, analyze expenses, create study plans, or anything else!" },
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "finance", label: "Finance", icon: Wallet },
  { id: "bills", label: "Bills", icon: Receipt },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "student", label: "Student Life", icon: GraduationCap },
  { id: "goals", label: "Goals", icon: Target },
  { id: "habits", label: "Habits", icon: Flame },
  { id: "family", label: "Family", icon: Users },
  { id: "health", label: "Health", icon: Heart },
  { id: "emergency", label: "Emergency", icon: AlertTriangle },
  { id: "ai", label: "LifeSync AI", icon: Bot },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: string }) {
  const styles: Record<string, string> = {
    default: "bg-muted text-muted-foreground",
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    primary: "bg-emerald-600 text-white",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[variant] || styles.default}`}>
      {children}
    </span>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-card text-card-foreground rounded-xl border border-border shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-up">{children}</div>;
}

function StatCard({ icon: Icon, label, value, sub, color = "emerald", trend }: {
  icon: React.ElementType; label: string; value: string; sub?: string; color?: string; trend?: number;
}) {
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    amber: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    red: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    navy: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
  };
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-lg ${colorMap[color] || colorMap.emerald}`}>
          <Icon size={18} />
        </div>
        {trend !== undefined && (
          <span className={`flex items-center gap-0.5 text-xs font-medium ${trend >= 0 ? "text-emerald-600" : "text-red-500"}`}>
            {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </div>
    </Card>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────
function LandingPage({ onNavigate, dark, setDark }: { onNavigate: (p: Page) => void; dark: boolean; setDark: (v: boolean) => void }) {
  const features = [
    { icon: LayoutDashboard, title: "Smart Dashboard", desc: "Get a birds-eye view of your entire life in one beautiful screen." },
    { icon: Wallet, title: "Expense Manager", desc: "Track BDT income, expenses, savings with local payment methods." },
    { icon: Receipt, title: "Bill Reminders", desc: "Never miss DESCO, GP, or rent again with smart notifications." },
    { icon: FileText, title: "Document Tracker", desc: "Track NID, passport, birth certificate expiry with auto-alerts." },
    { icon: GraduationCap, title: "Student Planner", desc: "Class routine, CGPA calculator, assignment tracker all in one." },
    { icon: Bot, title: "AI Life Assistant", desc: "Ask LifeSync AI to plan your day, analyze spending, or make study plans." },
    { icon: Target, title: "Goal Tracker", desc: "Set savings goals, track milestones, celebrate wins." },
    { icon: Users, title: "Family Management", desc: "Shared expenses, medicine reminders, and family task board." },
  ];

  const bdItems = [
    { icon: "💳", label: "bKash" }, { icon: "📱", label: "Nagad" }, { icon: "⚡", label: "DESCO Bill" },
    { icon: "📶", label: "GP Internet" }, { icon: "📘", label: "Passport" }, { icon: "🪪", label: "NID" },
    { icon: "🎓", label: "University" }, { icon: "🌍", label: "IELTS Prep" }, { icon: "👨‍👩‍👧", label: "Family Budget" },
  ];

  const testimonials = [
    { name: "Farhan Hossain", role: "BUET Student", text: "LifeSync helps me manage my assignments, CGPA, and expenses all in one place. It's like having a personal secretary!", avatar: "FH" },
    { name: "Nadia Rahman", role: "Freelance Designer", text: "The bKash integration for expense tracking is a game-changer. I finally know where my money goes every month.", avatar: "NR" },
    { name: "Karim Molla", role: "Young Professional", text: "The document expiry tracker saved me from an expired passport situation. Highly recommend to every Bangladeshi!", avatar: "KM" },
  ];

  const plans = [
    { name: "Free", price: "০ টাকা", period: "/মাস", features: ["Basic Task Management", "Basic Expense Tracking", "5 Documents", "Limited AI (10/mo)"], cta: "Start Free", highlight: false },
    { name: "Personal Pro", price: "৳299", period: "/মাস", features: ["Unlimited Tasks", "Advanced Finance Reports", "Unlimited Documents", "AI Assistant (100/mo)", "Smart Reminders", "Priority Support"], cta: "Get Pro", highlight: true },
    { name: "Family Plan", price: "৳499", period: "/মাস", features: ["Everything in Pro", "Up to 5 Family Members", "Shared Finance Dashboard", "Shared Documents", "Family Reminders", "Admin Controls"], cta: "Start Family", highlight: false },
  ];

  return (
    <PageWrapper>
    <div className="min-h-screen bg-background text-foreground font-['Inter']">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">J</span>
            </div>
            <span className="font-bold text-lg text-foreground">LifeSync</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            {[
              { label: "Home",         id: "hero" },
              { label: "Features",     id: "features" },
              { label: "How It Works", id: "how-it-works" },
              { label: "Pricing",      id: "pricing" },
              { label: "About",        id: "about" },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                className="hover:text-foreground transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setDark(!dark)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <span className="text-xs text-muted-foreground border border-border px-2 py-1 rounded-md cursor-pointer">EN | বাং</span>
            <button onClick={() => onNavigate("login")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Login</button>
            <button onClick={() => onNavigate("register")} className="text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-emerald-200 dark:border-emerald-800">
          <Zap size={14} /> Built for Bangladesh 🇧🇩
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-foreground leading-tight mb-6 max-w-4xl mx-auto">
          Your Entire Life,<br />
          <span className="text-emerald-600">Organized</span> in One Place
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Manage your tasks, expenses, bills, documents, studies, goals, family responsibilities, and daily plans with LifeSync.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up stagger-2">
          <button onClick={() => onNavigate("register")} className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold text-base hover:opacity-90 hover:shadow-xl hover:shadow-emerald-600/30 hover:-translate-y-0.5 transition-all shadow-lg shadow-emerald-600/20">
            Start for Free <ArrowRight size={16} />
          </button>
          <button onClick={() => onNavigate("dashboard")} className="flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-muted hover:-translate-y-0.5 transition-all">
            View Demo <Eye size={16} />
          </button>
        </div>

        {/* Dashboard preview mockup */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-secondary h-10 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <div className="mx-auto text-xs text-muted-foreground font-mono">lifesync.app — Dashboard</div>
            </div>
            <div className="flex">
              <div className="w-48 bg-secondary/90 p-3 hidden sm:block min-h-48">
                {navItems.slice(0, 6).map(item => (
                  <div key={item.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-0.5 text-xs ${item.id === "dashboard" ? "bg-primary text-white" : "text-white/60"}`}>
                    <item.icon size={13} /> {item.label}
                  </div>
                ))}
              </div>
              <div className="flex-1 p-4 bg-background">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {[
                    { label: "Monthly Income", value: "৳35,000", color: "bg-emerald-100 dark:bg-emerald-900/20" },
                    { label: "Expenses", value: "৳22,500", color: "bg-red-100 dark:bg-red-900/20" },
                    { label: "Savings", value: "৳12,500", color: "bg-blue-100 dark:bg-blue-900/20" },
                  ].map(c => (
                    <div key={c.label} className={`${c.color} p-3 rounded-lg`}>
                      <p className="text-xs text-muted-foreground">{c.label}</p>
                      <p className="font-bold text-sm text-foreground">{c.value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-card border border-border rounded-lg p-3 h-20 flex items-center justify-center">
                  <div className="flex gap-2 w-full">
                    {monthlyData.map(d => (
                      <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                        <div className="flex gap-0.5 items-end h-10">
                          <div className="w-2 bg-emerald-500 rounded-sm" style={{ height: `${(d.income / 40000) * 40}px` }} />
                          <div className="w-2 bg-red-400 rounded-sm" style={{ height: `${(d.expense / 40000) * 40}px` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{d.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-3">Everything You Need</h2>
        <p className="text-muted-foreground text-center mb-12">8 powerful modules built for Bangladeshi life</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <Card key={f.title} style={{ animationDelay: `${i * 0.06}s` }} className="p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group cursor-pointer animate-fade-up">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors text-emerald-600">
                <f.icon size={18} />
              </div>
              <h3 className="font-semibold mb-1.5 text-sm">{f.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Bangladesh Specific */}
      <section className="bg-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-3">Made for Bangladesh 🇧🇩</h2>
          <p className="text-white/70 mb-10">Native support for local services, payments, and documents</p>
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-4">
            {bdItems.map(item => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl hover:bg-white/20 transition-colors cursor-pointer">
                  {item.icon}
                </div>
                <span className="text-xs text-white/70">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-3">How It Works</h2>
        <p className="text-muted-foreground text-center mb-12">Three simple steps to organize your life</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { step: "01", title: "Create Account", desc: "Sign up with email, phone, or Google in under 2 minutes." },
            { step: "02", title: "Add Life Info", desc: "Add your bills, documents, income, goals, and study schedule." },
            { step: "03", title: "Track & Get Reminders", desc: "LifeSync keeps you on track with smart daily reminders." },
          ].map(s => (
            <div key={s.step} className="text-center">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-black">{s.step}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Bangladeshis Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <Card key={t.name} className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-3">Simple Pricing</h2>
        <p className="text-muted-foreground text-center mb-12">Start free, upgrade when you're ready</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map(p => (
            <div key={p.name} className={`rounded-2xl border p-6 relative ${p.highlight ? "border-primary bg-primary text-primary-foreground shadow-xl shadow-emerald-600/20" : "border-border bg-card"}`}>
              {p.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-xs font-bold px-3 py-1 rounded-full text-white">Most Popular</div>}
              <h3 className={`font-bold text-lg mb-1 ${p.highlight ? "text-white" : ""}`}>{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-5">
                <span className={`text-3xl font-black ${p.highlight ? "text-white" : "text-foreground"}`}>{p.price}</span>
                <span className={`text-sm ${p.highlight ? "text-white/70" : "text-muted-foreground"}`}>{p.period}</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {p.features.map(f => (
                  <li key={f} className={`flex items-center gap-2 text-sm ${p.highlight ? "text-white/90" : "text-muted-foreground"}`}>
                    <CheckCircle size={14} className={p.highlight ? "text-white" : "text-emerald-600"} />
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => onNavigate("register")} className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${p.highlight ? "bg-white text-emerald-600 hover:bg-white/90" : "bg-primary text-primary-foreground hover:opacity-90"}`}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / About */}
      <footer id="about" className="bg-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-5 gap-8">
          <div className="col-span-2 sm:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center">
                <span className="text-white font-bold text-xs">J</span>
              </div>
              <span className="font-bold">LifeSync</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">Manage Your Life, All in One Place.</p>
            <p className="text-white/40 text-xs mt-4">© 2025 LifeSync. Made with ❤️ in Bangladesh</p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
            { title: "Support", links: ["Help Center", "Privacy Policy", "Terms", "Contact"] },
          ].map(col => (
            <div key={col.title} className="animate-fade-up">
              <h4 className="font-semibold text-sm mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link}><a href="#" className="text-white/60 text-sm hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
    </PageWrapper>
  );
}

// ─── Auth Pages ───────────────────────────────────────────────────────────────
function AuthPage({ mode, onNavigate }: { mode: "login" | "register"; onNavigate: (p: Page) => void }) {
  const [showPw, setShowPw] = useState(false);
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("showket@example.com");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "admin@lifesync.app" && password === "admin123") {
      onNavigate("admin");
    } else {
      onNavigate("dashboard");
    }
  };

  return (
    <PageWrapper>
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[480px] bg-secondary text-white p-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="font-bold text-sm">J</span>
          </div>
          <span className="font-bold text-lg">LifeSync</span>
        </div>
        <div>
          <h2 className="text-4xl font-extrabold leading-tight mb-4">
            Organize your entire life in one beautiful dashboard.
          </h2>
          <p className="text-white/70 leading-relaxed mb-8">
            Tasks, expenses, bills, documents, study plans, goals — all in one place, designed for Bangladesh.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "✅", label: "50,000+ tasks completed" },
              { icon: "💰", label: "৳2Cr+ tracked monthly" },
              { icon: "📄", label: "100K+ documents stored" },
              { icon: "🤖", label: "LifeSync AI available 24/7" },
            ].map(s => (
              <div key={s.label} className="bg-white/10 rounded-xl p-3">
                <div className="text-xl mb-1">{s.icon}</div>
                <p className="text-xs text-white/80">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/40 text-xs">© 2025 LifeSync. Made in Bangladesh 🇧🇩</p>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <button onClick={() => onNavigate("landing")} className="flex items-center gap-1 text-muted-foreground text-sm mb-8 hover:text-foreground transition-colors">
            ← Back to home
          </button>
          <h1 className="text-2xl font-bold mb-1">{mode === "login" ? "Welcome back!" : "Create your account"}</h1>
          <p className="text-muted-foreground text-sm mb-6">
            {mode === "login" ? "Sign in to your LifeSync account" : "Start managing your life for free"}
          </p>

          {/* Google */}
          <button className="w-full flex items-center justify-center gap-3 border border-border py-3 rounded-xl text-sm font-medium hover:bg-muted transition-colors mb-4">
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {mode === "login" && (
            <div className="flex bg-muted rounded-xl p-1 mb-5">
              <button onClick={() => setAuthMethod("email")} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${authMethod === "email" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>
                Email
              </button>
              <button onClick={() => setAuthMethod("phone")} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${authMethod === "phone" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>
                Phone OTP
              </button>
            </div>
          )}

          <div className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name</label>
                <input type="text" placeholder="Showket Ahamed" defaultValue="Showket Ahamed"
                  className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
              </div>
            )}
            {(authMethod === "email" || mode === "register") && (
              <div>
                <label className="block text-sm font-medium mb-1.5">Email Address</label>
                <input type="email" placeholder="showket@example.com" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
              </div>
            )}
            {authMethod === "phone" && mode === "login" && (
              <div>
                <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                <input type="tel" placeholder="+880 1XXX-XXXXXX"
                  className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
              </div>
            )}
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                <input type="tel" placeholder="+880 1XXX-XXXXXX"
                  className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
              </div>
            )}
            {(authMethod === "email") && (
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-medium">Password</label>
                  {mode === "login" && <button className="text-xs text-primary">Forgot password?</button>}
                </div>
                <div className="relative">
                  <input type={showPw ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                  <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}
            {mode === "register" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1.5">I am a</label>
                  <select className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                    <option>University Student</option>
                    <option>Young Professional</option>
                    <option>Freelancer</option>
                    <option>Parent / Family Manager</option>
                  </select>
                </div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-0.5 accent-emerald-600" />
                  <span className="text-xs text-muted-foreground">I agree to the <a href="#" className="text-primary underline">Terms of Service</a> and <a href="#" className="text-primary underline">Privacy Policy</a></span>
                </label>
              </>
            )}
            <button onClick={mode === "login" ? handleLogin : () => onNavigate("dashboard")} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all">
              {mode === "login" ? (authMethod === "phone" ? "Send OTP" : "Sign In") : "Create Account"}
            </button>
            {mode === "login" && (
              <p className="text-center text-xs text-muted-foreground pt-1">
                Admin? Use <span className="font-mono text-primary">admin@lifesync.app</span> / <span className="font-mono text-primary">admin123</span>
              </p>
            )}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => onNavigate(mode === "login" ? "register" : "login")} className="text-primary font-medium">
              {mode === "login" ? "Sign up free" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
    </PageWrapper>
  );
}

// ─── App Shell (Sidebar + Topbar) ─────────────────────────────────────────────
function AppShell({ page, onNavigate, dark, setDark, children, onLogout }: {
  page: Page; onNavigate: (p: Page) => void; dark: boolean; setDark: (v: boolean) => void; children: React.ReactNode; onLogout: () => void;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const unreadNotifs = notifications.filter(n => !n.read).length;

  const SidebarContent = () => (
    <>
      <div className="p-4 flex items-center gap-3 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">J</span>
        </div>
        {sidebarOpen && (
          <div className="overflow-hidden">
            <p className="font-bold text-sm text-white leading-none">LifeSync</p>
            <p className="text-xs text-white/50 mt-0.5">Bangladesh</p>
          </div>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item, idx) => {
          const active = page === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id as Page); setMobileSidebar(false); }}
              style={{ animationDelay: `${idx * 0.03}s` }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative animate-slide-left
                ${active ? "bg-primary text-white shadow-sm" : "text-white/60 hover:text-white hover:bg-sidebar-accent"}`}
            >
              <item.icon size={17} className="flex-shrink-0" />
              {sidebarOpen && <span className="truncate">{item.label}</span>}
              {item.id === "notifications" && unreadNotifs > 0 && (
                <span className={`ml-auto bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 ${!sidebarOpen ? "absolute -top-0.5 -right-0.5" : ""}`}>
                  {unreadNotifs}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">SA</div>
          {sidebarOpen && (
            <div className="flex-1 overflow-hidden">
              <p className="text-white text-xs font-semibold truncate">Showket Ahamed</p>
              <p className="text-white/50 text-xs truncate">Free Plan</p>
            </div>
          )}
        </div>
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors ${sidebarOpen ? "" : "justify-center"}`}
        >
          <LogIn size={14} className="rotate-180 flex-shrink-0" />
          {sidebarOpen && "Log Out"}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col bg-sidebar flex-shrink-0 transition-all duration-300 ${sidebarOpen ? "w-56" : "w-16"}`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar overlay */}
      {mobileSidebar && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileSidebar(false)} />
          <aside className="relative w-56 bg-sidebar flex flex-col h-full z-10">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-card border-b border-border px-4 sm:px-6 h-14 flex items-center gap-4 flex-shrink-0">
          <button onClick={() => { setSidebarOpen(!sidebarOpen); setMobileSidebar(!mobileSidebar); }}
            className="text-muted-foreground hover:text-foreground transition-colors">
            <Menu size={20} />
          </button>
          <div className="flex-1 flex items-center">
            <div className="relative hidden sm:flex items-center max-w-xs w-full">
              <Search size={15} className="absolute left-3 text-muted-foreground" />
              <input placeholder="Search anything..." className="w-full bg-muted rounded-xl pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:block text-xs text-muted-foreground border border-border px-2 py-1 rounded-md cursor-pointer">EN | বাং</span>
            <button onClick={() => setDark(!dark)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={() => onNavigate("notifications")} className="relative p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
              <Bell size={16} />
              {unreadNotifs > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
            </button>
            <button onClick={() => onNavigate("settings")} className="w-8 h-8 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
              SA
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div key={page} className="animate-fade-up h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex items-center justify-around px-2 py-2 z-40">
        {navItems.slice(0, 5).map(item => {
          const active = page === item.id;
          return (
            <button key={item.id} onClick={() => onNavigate(item.id as Page)}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${active ? "text-primary" : "text-muted-foreground"}`}>
              <item.icon size={20} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const quickActions = [
    { label: "Add Task", icon: CheckSquare, page: "tasks" as Page, color: "emerald" },
    { label: "Add Expense", icon: Wallet, page: "finance" as Page, color: "blue" },
    { label: "Add Bill", icon: Receipt, page: "bills" as Page, color: "amber" },
    { label: "Ask AI", icon: Bot, page: "ai" as Page, color: "navy" },
  ];

  return (
    <div className="p-4 sm:p-6 pb-24 lg:pb-6 space-y-6">
      {/* Greeting */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{greeting}, Showket 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">Here is what is happening in your life today.</p>
        </div>
        <Badge variant="info">Free Plan</Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="animate-fade-up stagger-1"><StatCard icon={CheckSquare} label="Pending Tasks" value="6" sub="2 due today" color="emerald" trend={-15} /></div>
        <div className="animate-fade-up stagger-2"><StatCard icon={Wallet} label="Monthly Expense" value="৳22,500" sub="৳35,000 income" color="blue" trend={8} /></div>
        <div className="animate-fade-up stagger-3"><StatCard icon={Receipt} label="Upcoming Bills" value="3" sub="Highest: ৳8,000" color="amber" /></div>
        <div className="animate-fade-up stagger-4"><StatCard icon={Target} label="Active Goals" value="4" sub="37% avg progress" color="navy" trend={5} /></div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left + center */}
        <div className="xl:col-span-2 space-y-6">
          {/* Income vs Expense Chart */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Income vs Expenses</h3>
              <Badge variant="success">+৳12,500 saved</Badge>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={v => `৳${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [`৳${v.toLocaleString()}`, ""]} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: 12 }} />
                <Area type="monotone" dataKey="income" name="Income" stroke="#059669" fill="url(#income)" strokeWidth={2} />
                <Area type="monotone" dataKey="expense" name="Expense" stroke="#ef4444" fill="url(#expense)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Today's Tasks */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Today&apos;s Tasks</h3>
              <button onClick={() => onNavigate("tasks")} className="text-xs text-primary flex items-center gap-1">View all <ChevronRight size={12} /></button>
            </div>
            <div className="space-y-2.5">
              {tasks.slice(0, 4).map(task => (
                <div key={task.id} className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl hover:bg-muted transition-colors">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${task.status === "completed" ? "bg-emerald-500 border-emerald-500" : "border-muted-foreground"}`}>
                    {task.status === "completed" && <CheckCircle size={10} className="text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.category} · {task.due}</p>
                  </div>
                  <Badge variant={task.priority === "High" ? "danger" : task.priority === "Medium" ? "warning" : "default"}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Transactions */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recent Transactions</h3>
              <button onClick={() => onNavigate("finance")} className="text-xs text-primary flex items-center gap-1">View all <ChevronRight size={12} /></button>
            </div>
            <div className="space-y-2">
              {transactions.map(t => (
                <div key={t.id} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${t.type === "credit" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600" : "bg-red-100 dark:bg-red-900/30 text-red-500"}`}>
                    {t.type === "credit" ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{t.desc}</p>
                    <p className="text-xs text-muted-foreground">{t.date} · {t.category}</p>
                  </div>
                  <span className={`font-semibold text-sm flex-shrink-0 ${t.type === "credit" ? "text-emerald-600" : "text-red-500"}`}>
                    {t.type === "credit" ? "+" : ""}৳{Math.abs(t.amount).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="space-y-5">
          {/* Quick Actions */}
          <Card className="p-5">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map(qa => (
                <button key={qa.label} onClick={() => onNavigate(qa.page)}
                  className="flex flex-col items-center gap-2 p-3 bg-muted/50 hover:bg-muted rounded-xl transition-colors group">
                  <qa.icon size={20} className="text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-center">{qa.label}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Expense Breakdown */}
          <Card className="p-5">
            <h3 className="font-semibold mb-4">Expense Breakdown</h3>
            <div className="flex justify-center mb-3">
              <ResponsiveContainer width={160} height={160}>
                <RePieChart>
                  <Pie data={expenseCategories} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                    {expenseCategories.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {expenseCategories.map(cat => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs text-muted-foreground flex-1">{cat.name}</span>
                  <span className="text-xs font-medium">৳{cat.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Bills */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Upcoming Bills</h3>
              <button onClick={() => onNavigate("bills")} className="text-xs text-primary">View all</button>
            </div>
            <div className="space-y-2.5">
              {bills.filter(b => b.status !== "paid").slice(0, 3).map(bill => (
                <div key={bill.id} className="flex items-center gap-3">
                  <span className="text-lg">{bill.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{bill.name}</p>
                    <p className="text-xs text-muted-foreground">{bill.due}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold">৳{bill.amount.toLocaleString()}</p>
                    <Badge variant={bill.status === "overdue" ? "danger" : "warning"}>{bill.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Daily Briefing */}
          <Card className="p-5 bg-gradient-to-br from-secondary to-secondary/80 text-white border-secondary">
            <div className="flex items-center gap-2 mb-3">
              <Bot size={16} className="text-emerald-400" />
              <span className="text-sm font-semibold">LifeSync AI Briefing</span>
            </div>
            <p className="text-xs text-white/80 leading-relaxed mb-3">
              You have 2 assignments due this week and your electricity bill is due in 5 days. Your savings rate this month is 35.7% — great job! Consider paying the overdue rent today.
            </p>
            <button onClick={() => onNavigate("ai")} className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
              Chat with LifeSync AI <ArrowRight size={11} />
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Tasks Page ───────────────────────────────────────────────────────────────
function TasksPage() {
  const [view, setView] = useState<"list" | "board">("list");
  const [filter, setFilter] = useState("all");
  const [taskList, setTaskList] = useState(tasks);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", category: "Personal", priority: "Medium", due: "" });

  const statuses = ["todo", "in_progress", "completed", "overdue"];
  const statusLabels: Record<string, string> = { todo: "To Do", in_progress: "In Progress", completed: "Completed", overdue: "Overdue" };
  const statusColors: Record<string, string> = { todo: "info", in_progress: "warning", completed: "success", overdue: "danger" };

  const filtered = filter === "all" ? taskList : taskList.filter(t => t.category.toLowerCase() === filter.toLowerCase());

  const toggleDone = (id: number) => {
    setTaskList(prev => prev.map(t => t.id === id ? { ...t, status: t.status === "completed" ? "todo" : "completed" } : t));
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;
    const task = {
      id: Date.now(),
      title: newTask.title,
      category: newTask.category,
      priority: newTask.priority,
      due: newTask.due || "No date",
      status: "todo",
    };
    setTaskList(prev => [task, ...prev]);
    setNewTask({ title: "", category: "Personal", priority: "Medium", due: "" });
    setShowModal(false);
  };

  return (
    <div className="p-4 sm:p-6 pb-24 lg:pb-6 space-y-5">
      {/* New Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4 animate-scale-in">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">New Task</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground"><X size={16} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Task Title *</label>
                <input
                  autoFocus
                  placeholder="e.g. Submit assignment"
                  value={newTask.title}
                  onChange={e => setNewTask(p => ({ ...p, title: e.target.value }))}
                  onKeyDown={e => e.key === "Enter" && addTask()}
                  className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Category</label>
                  <select
                    value={newTask.category}
                    onChange={e => setNewTask(p => ({ ...p, category: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  >
                    {["Personal", "Study", "Work", "Family", "Finance", "Health"].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={e => setNewTask(p => ({ ...p, priority: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  >
                    {["High", "Medium", "Low"].map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Due Date</label>
                <input
                  type="date"
                  value={newTask.due}
                  onChange={e => setNewTask(p => ({ ...p, due: e.target.value }))}
                  className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-border py-2.5 rounded-xl text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
              <button onClick={addTask} disabled={!newTask.title.trim()} className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-40 transition-all">
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Task Management</h1>
          <p className="text-sm text-muted-foreground">{taskList.filter(t => t.status !== "completed").length} tasks remaining</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90">
          <Plus size={16} /> New Task
        </button>
      </div>

      {/* Filters + View Toggle */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex bg-muted rounded-xl p-1 gap-1">
          <button onClick={() => setView("list")} className={`px-3 py-1.5 text-xs font-medium rounded-lg ${view === "list" ? "bg-card shadow-sm" : "text-muted-foreground"}`}>List</button>
          <button onClick={() => setView("board")} className={`px-3 py-1.5 text-xs font-medium rounded-lg ${view === "board" ? "bg-card shadow-sm" : "text-muted-foreground"}`}>Board</button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "Study", "Finance", "Health", "Work", "Family", "Personal"].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs rounded-xl border transition-all ${filter === cat ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
              {cat === "all" ? "All" : cat}
            </button>
          ))}
        </div>
      </div>

      {view === "list" ? (
        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <CheckSquare size={36} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No tasks in this category</p>
            </div>
          )}
          {filtered.map(task => (
            <Card key={task.id} className="px-4 py-3 flex items-center gap-3 hover:shadow-md transition-shadow">
              <button onClick={() => toggleDone(task.id)} className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${task.status === "completed" ? "bg-emerald-500 border-emerald-500" : "border-muted-foreground hover:border-emerald-500"}`}>
                {task.status === "completed" && <CheckCircle size={12} className="text-white" />}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>{task.title}</p>
                <p className="text-xs text-muted-foreground">{task.category} · Due {task.due}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge variant={task.priority === "High" ? "danger" : task.priority === "Medium" ? "warning" : "default"}>{task.priority}</Badge>
                <Badge variant={statusColors[task.status] as "success" | "warning" | "danger" | "info" | "default"}>{statusLabels[task.status]}</Badge>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statuses.map(status => (
            <div key={status} className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <Badge variant={statusColors[status] as "success" | "warning" | "danger" | "info" | "default"}>{statusLabels[status]}</Badge>
                <span className="text-xs text-muted-foreground">{filtered.filter(t => t.status === status).length}</span>
              </div>
              {filtered.filter(t => t.status === status).map(task => (
                <Card key={task.id} className="p-3 space-y-2 hover:shadow-md transition-shadow cursor-pointer">
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.category}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant={task.priority === "High" ? "danger" : "warning"}>{task.priority}</Badge>
                    <span className="text-xs text-muted-foreground">{task.due}</span>
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Finance Page ─────────────────────────────────────────────────────────────
function FinancePage() {
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [txList, setTxList] = useState(transactions);
  const [form, setForm] = useState({ desc: "", category: "Grocery", method: "bKash", type: "debit", amount: "", date: "" });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const addTransaction = () => {
    if (!form.desc.trim() || !form.amount) return;
    const newTx = {
      desc: form.desc,
      category: form.category,
      type: form.type as "credit" | "debit",
      amount: form.type === "credit" ? Math.abs(Number(form.amount)) : -Math.abs(Number(form.amount)),
      date: form.date || "Jun 10",
    };
    setTxList(prev => [newTx, ...prev]);
    setForm({ desc: "", category: "Grocery", method: "bKash", type: "debit", amount: "", date: "" });
    setShowModal(false);
    showToast("Transaction added successfully!");
  };

  const handleExport = () => {
    const rows = ["Description,Category,Type,Amount,Date", ...txList.map(t => `${t.desc},${t.category},${t.type},${t.amount},${t.date}`)].join("\n");
    const blob = new Blob([rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "lifesync-transactions.csv"; a.click();
    URL.revokeObjectURL(url);
    showToast("Exported transactions as CSV!");
  };

  return (
    <div className="p-4 sm:p-6 pb-24 lg:pb-6 space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-scale-in bg-secondary text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3">
          <CheckCircle size={15} className="text-emerald-400" /><span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      {/* Add Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-bold text-base">Add Transaction</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground"><X size={16} /></button>
            </div>
            <div className="p-5 space-y-4">
              {/* Type toggle */}
              <div className="flex rounded-xl border border-border overflow-hidden">
                {["debit", "credit"].map(t => (
                  <button key={t} onClick={() => setForm(f => ({ ...f, type: t }))}
                    className={`flex-1 py-2 text-sm font-medium capitalize transition-colors ${form.type === t ? t === "credit" ? "bg-emerald-600 text-white" : "bg-red-500 text-white" : "hover:bg-muted"}`}>
                    {t === "credit" ? "+ Income" : "− Expense"}
                  </button>
                ))}
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Description</label>
                <input placeholder="e.g. Grocery at Shwapno" value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
                  className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Amount (৳)</label>
                  <input type="number" placeholder="0" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Date</label>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none">
                    {["Grocery","House Rent","Electricity","Gas","Water","Internet","Mobile","Transport","Education","Medical","Shopping","Family Support","Loan/EMI","Entertainment","Other"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Payment Method</label>
                  <select value={form.method} onChange={e => setForm(f => ({ ...f, method: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none">
                    {["bKash","Nagad","Rocket","Cash","Bank","Debit Card","Credit Card"].map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-border py-2.5 rounded-xl text-sm font-medium hover:bg-muted">Cancel</button>
              <button onClick={addTransaction} className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-medium hover:opacity-90">Add Transaction</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Finance & Expense Manager</h1>
          <p className="text-sm text-muted-foreground">Currency: BDT (৳) · June 2025</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExport} className="flex items-center gap-2 border border-border text-sm px-3 py-2 rounded-xl hover:bg-muted transition-colors">
            <Download size={14} /> Export
          </button>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90">
            <Plus size={16} /> Add Transaction
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={TrendingUp} label="Monthly Income" value="৳35,000" color="emerald" trend={0} />
        <StatCard icon={TrendingDown} label="Monthly Expense" value="৳22,500" color="red" trend={8} />
        <StatCard icon={DollarSign} label="Total Savings" value="৳12,500" color="blue" trend={5} />
        <StatCard icon={CreditCard} label="Budget Remaining" value="৳5,000" color="amber" sub="of ৳27,500 budget" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <h3 className="font-semibold mb-4">Monthly Income vs Expense</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={v => `৳${v/1000}k`} />
              <Tooltip formatter={(v: number) => [`৳${v.toLocaleString()}`, ""]} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: 12 }} />
              <Legend />
              <Bar dataKey="income" name="Income" fill="#059669" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold mb-4">Expense by Category</h3>
          <div className="flex gap-4">
            <ResponsiveContainer width={160} height={200}>
              <RePieChart>
                <Pie data={expenseCategories} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" strokeWidth={0}>
                  {expenseCategories.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </RePieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2 self-center">
              {expenseCategories.map(cat => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs text-muted-foreground flex-1">{cat.name}</span>
                  <span className="text-xs font-semibold">৳{cat.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Transaction History</h3>
          <select className="text-xs border border-border rounded-lg px-2 py-1 bg-card">
            <option>All Categories</option>
            <option>Income</option>
            <option>Grocery</option>
            <option>Bills</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border">
                <th className="pb-2 font-medium">Description</th>
                <th className="pb-2 font-medium">Category</th>
                <th className="pb-2 font-medium">Method</th>
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {txList.map((t, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 font-medium">{t.desc}</td>
                  <td className="py-3"><Badge variant="default">{t.category}</Badge></td>
                  <td className="py-3 text-muted-foreground text-xs">bKash</td>
                  <td className="py-3 text-muted-foreground text-xs">{t.date}</td>
                  <td className={`py-3 font-semibold text-right ${t.type === "credit" ? "text-emerald-600" : "text-red-500"}`}>
                    {t.type === "credit" ? "+" : ""}৳{Math.abs(t.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ─── Bills Page ───────────────────────────────────────────────────────────────
function BillsPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? bills : bills.filter(b => b.status === filter);

  return (
    <div className="p-4 sm:p-6 pb-24 lg:pb-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Bill Reminders</h1>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium">
          <Plus size={16} /> Add Bill
        </button>
      </div>

      <div className="flex gap-2">
        {["all", "upcoming", "overdue", "paid"].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 text-xs rounded-xl border transition-all capitalize ${filter === s ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
            {s} {s !== "all" && `(${bills.filter(b => b.status === s).length})`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(bill => (
          <Card key={bill.id} className={`p-5 ${bill.status === "overdue" ? "border-red-300 dark:border-red-800" : ""}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{bill.icon}</span>
                <div>
                  <p className="font-semibold text-sm">{bill.name}</p>
                  <p className="text-xs text-muted-foreground">{bill.provider}</p>
                </div>
              </div>
              <Badge variant={bill.status === "paid" ? "success" : bill.status === "overdue" ? "danger" : "warning"}>
                {bill.status}
              </Badge>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold">৳{bill.amount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Due: {bill.due}</p>
                <p className="text-xs text-muted-foreground">via {bill.method}</p>
              </div>
              {bill.status !== "paid" && (
                <button className="bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-lg hover:opacity-90">
                  {bill.status === "overdue" ? "Pay Now" : "Mark Paid"}
                </button>
              )}
              {bill.status === "paid" && (
                <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
                  <CheckCircle size={14} /> Paid
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Documents Page ───────────────────────────────────────────────────────────
function DocumentsPage() {
  type Doc = typeof documents[number];
  const [docList, setDocList] = useState(documents as Doc[]);
  const [viewDoc, setViewDoc] = useState<Doc | null>(null);
  const [editDoc, setEditDoc] = useState<Doc | null>(null);
  const [editForm, setEditForm] = useState({ name: "", number: "", issued: "", expiry: "" });
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const openEdit = (doc: Doc) => {
    setEditDoc(doc);
    setEditForm({ name: doc.name, number: doc.number, issued: doc.issued, expiry: doc.expiry ?? "" });
  };

  const saveEdit = () => {
    if (!editDoc) return;
    setDocList(prev => prev.map(d => d.id === editDoc.id
      ? { ...d, name: editForm.name, number: editForm.number, issued: editForm.issued, expiry: editForm.expiry || null }
      : d
    ));
    setEditDoc(null);
  };

  const handleDownload = (doc: Doc) => {
    setDownloadToast(`Downloading "${doc.name}"...`);
    setTimeout(() => setDownloadToast(null), 2500);
  };

  const [showUpload, setShowUpload] = useState(false);
  const [uploadForm, setUploadForm] = useState({ name: "", type: "NID", number: "", issued: "", expiry: "" });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUploadSubmit = () => {
    if (!uploadForm.name.trim() || !uploadForm.number.trim()) return;
    const newDoc = {
      id: Date.now(),
      name: uploadForm.name,
      number: uploadForm.number,
      issued: uploadForm.issued || "N/A",
      expiry: uploadForm.expiry || null,
      status: "valid" as const,
      daysLeft: null,
      type: uploadForm.type,
    };
    setDocList(prev => [newDoc, ...prev]);
    setUploadForm({ name: "", type: "NID", number: "", issued: "", expiry: "" });
    setUploadedFile(null);
    setUploadSuccess(true);
    setTimeout(() => { setUploadSuccess(false); setShowUpload(false); }, 1500);
  };

  const typeIcon: Record<string, string> = {
    "NID": "🪪", "Passport": "📘", "Student ID": "🎓", "Birth Cert": "📜",
    "Driving License": "🚗", "TIN Certificate": "📋", "Trade License": "🏪",
    "Visa": "✈️", "Insurance": "🛡️", "Land Documents": "🏘️",
  };

  return (
    <div className="p-4 sm:p-6 pb-24 lg:pb-6 space-y-5">

      {/* Download toast */}
      {downloadToast && (
        <div className="fixed bottom-24 lg:bottom-6 right-6 z-50 animate-scale-in bg-secondary text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3">
          <Download size={15} className="text-emerald-400" />
          <span className="text-sm font-medium">{downloadToast}</span>
        </div>
      )}

      {/* View Modal */}
      {viewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setViewDoc(null)} />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{typeIcon[viewDoc.type] ?? "📄"}</span>
                <div>
                  <h3 className="font-bold">{viewDoc.name}</h3>
                  <Badge variant={viewDoc.status === "valid" ? "success" : viewDoc.status === "expiring" ? "warning" : "danger"}>
                    {viewDoc.status === "expiring" ? `Expiring in ${viewDoc.daysLeft} days` : viewDoc.status}
                  </Badge>
                </div>
              </div>
              <button onClick={() => setViewDoc(null)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground"><X size={16} /></button>
            </div>
            {/* Body */}
            <div className="p-5 space-y-4">
              <div className="bg-muted/40 rounded-xl p-4 space-y-3">
                {[
                  { label: "Document Type", value: viewDoc.type },
                  { label: "Document Number", value: viewDoc.number },
                  { label: "Issue Date", value: viewDoc.issued },
                  { label: "Expiry Date", value: viewDoc.expiry ?? "No Expiry" },
                  { label: "Status", value: viewDoc.status },
                  { label: "Days Remaining", value: viewDoc.daysLeft ? `${viewDoc.daysLeft} days` : "N/A" },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-medium font-mono">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 rounded-xl">
                <Lock size={13} className="text-amber-600 flex-shrink-0" />
                <p className="text-xs text-amber-700 dark:text-amber-400">Document details are encrypted. Only you can view this.</p>
              </div>
            </div>
            <div className="p-5 pt-0 flex gap-3">
              <button onClick={() => { handleDownload(viewDoc); setViewDoc(null); }}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-medium hover:opacity-90">
                <Download size={14} /> Download
              </button>
              <button onClick={() => setViewDoc(null)}
                className="flex-1 border border-border py-2.5 rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setEditDoc(null)} />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-bold">Edit Document</h3>
              <button onClick={() => setEditDoc(null)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground"><X size={16} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Document Name</label>
                <input value={editForm.name} onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Document Number</label>
                <input value={editForm.number} onChange={e => setEditForm(p => ({ ...p, number: e.target.value }))}
                  className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Issue Date</label>
                  <input type="date" value={editForm.issued} onChange={e => setEditForm(p => ({ ...p, issued: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Expiry Date</label>
                  <input type="date" value={editForm.expiry} onChange={e => setEditForm(p => ({ ...p, expiry: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 flex gap-3">
              <button onClick={() => setEditDoc(null)} className="flex-1 border border-border py-2.5 rounded-xl text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
              <button onClick={saveEdit} className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-medium hover:opacity-90">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowUpload(false)} />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-bold">Upload Document</h3>
              <button onClick={() => setShowUpload(false)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground"><X size={16} /></button>
            </div>

            {uploadSuccess ? (
              <div className="p-10 flex flex-col items-center gap-3 text-center">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center animate-pop">
                  <CheckCircle size={28} className="text-emerald-600" />
                </div>
                <p className="font-semibold text-emerald-600">Document uploaded successfully!</p>
              </div>
            ) : (
              <>
                <div className="p-5 space-y-4">
                  {/* File drop zone */}
                  <label className="block cursor-pointer">
                    <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${uploadedFile ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"}`}>
                      {uploadedFile ? (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <FileText size={20} className="text-primary" />
                          </div>
                          <p className="text-sm font-medium text-primary truncate max-w-xs">{uploadedFile.name}</p>
                          <p className="text-xs text-muted-foreground">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <Upload size={24} />
                          <p className="text-sm font-medium">Click to select file</p>
                          <p className="text-xs">PDF, JPG, PNG — max 10MB</p>
                        </div>
                      )}
                    </div>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden"
                      onChange={e => setUploadedFile(e.target.files?.[0] ?? null)} />
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground block mb-1">Document Type *</label>
                      <select value={uploadForm.type} onChange={e => setUploadForm(p => ({ ...p, type: e.target.value }))}
                        className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                        {["NID", "Passport", "Birth Cert", "Student ID", "Driving License", "TIN Certificate", "Trade License", "Visa", "Insurance", "Land Documents"].map(t => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground block mb-1">Document Name *</label>
                      <input placeholder="e.g. My Passport"
                        value={uploadForm.name} onChange={e => setUploadForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Document Number *</label>
                    <input placeholder="e.g. AB 1234567"
                      value={uploadForm.number} onChange={e => setUploadForm(p => ({ ...p, number: e.target.value }))}
                      className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground block mb-1">Issue Date</label>
                      <input type="date" value={uploadForm.issued} onChange={e => setUploadForm(p => ({ ...p, issued: e.target.value }))}
                        className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground block mb-1">Expiry Date</label>
                      <input type="date" value={uploadForm.expiry} onChange={e => setUploadForm(p => ({ ...p, expiry: e.target.value }))}
                        className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 rounded-xl">
                    <Shield size={13} className="text-blue-600 flex-shrink-0" />
                    <p className="text-xs text-blue-700 dark:text-blue-400">Your document will be encrypted and stored securely.</p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex gap-3">
                  <button onClick={() => setShowUpload(false)} className="flex-1 border border-border py-2.5 rounded-xl text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
                  <button
                    onClick={handleUploadSubmit}
                    disabled={!uploadForm.name.trim() || !uploadForm.number.trim()}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-40 transition-all"
                  >
                    <Upload size={14} /> Upload
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Government Documents</h1>
          <p className="text-sm text-muted-foreground">Secure document tracker with expiry alerts</p>
        </div>
        <button onClick={() => setShowUpload(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90">
          <Upload size={16} /> Upload Document
        </button>
      </div>

      <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 rounded-xl">
        <Shield size={15} className="text-amber-600 flex-shrink-0" />
        <p className="text-xs text-amber-700 dark:text-amber-400">Your documents are encrypted and stored securely. Document numbers are partially masked for your protection.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {docList.map(doc => (
          <Card key={doc.id} className={`p-5 ${doc.status === "expiring" ? "border-amber-300 dark:border-amber-700" : ""}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{typeIcon[doc.type] ?? "📄"}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{doc.name}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 font-mono">{doc.number}</p>
                  <Badge variant={doc.status === "valid" ? "success" : doc.status === "expiring" ? "warning" : "danger"}>
                    {doc.status === "expiring" ? `Expiring in ${doc.daysLeft}d` : doc.status}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setViewDoc(doc)}
                  title="View"
                  className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 rounded-lg text-muted-foreground transition-colors">
                  <Eye size={15} />
                </button>
                <button onClick={() => openEdit(doc)}
                  title="Edit"
                  className="p-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 rounded-lg text-muted-foreground transition-colors">
                  <Edit2 size={15} />
                </button>
                <button onClick={() => handleDownload(doc)}
                  title="Download"
                  className="p-2 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-600 rounded-lg text-muted-foreground transition-colors">
                  <Download size={15} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-muted/50 rounded-lg p-2">
                <p className="text-muted-foreground mb-0.5">Issue Date</p>
                <p className="font-medium">{doc.issued}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2">
                <p className="text-muted-foreground mb-0.5">Expiry Date</p>
                <p className="font-medium">{doc.expiry ?? "No Expiry"}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Goals Page ───────────────────────────────────────────────────────────────
function GoalsPage() {
  const [goalList, setGoalList] = useState(goals);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Finance", target: "", saved: "", deadline: "", color: "#059669" });

  const addGoal = () => {
    if (!form.title.trim() || !form.target) return;
    setGoalList(prev => [...prev, {
      id: Date.now(), title: form.title, category: form.category,
      target: Number(form.target), saved: Number(form.saved) || 0,
      deadline: form.deadline || "TBD", color: form.color,
    }]);
    setForm({ title: "", category: "Finance", target: "", saved: "", deadline: "", color: "#059669" });
    setShowModal(false);
  };

  return (
    <div className="p-4 sm:p-6 pb-24 lg:pb-6 space-y-5">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-bold">New Goal</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground"><X size={16} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Goal Title *</label>
                <input autoFocus placeholder="e.g. Buy a Laptop" value={form.title}
                  onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Category</label>
                  <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                    {["Finance", "Education", "Health", "Career", "Travel", "Family", "Business", "Personal Growth"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Color</label>
                  <div className="flex gap-2 flex-wrap pt-1">
                    {["#059669","#1e3a5f","#f59e0b","#3b82f6","#8b5cf6","#ef4444"].map(c => (
                      <button key={c} onClick={() => setForm(p => ({ ...p, color: c }))}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${form.color === c ? "border-foreground scale-110" : "border-transparent"}`}
                        style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Target Amount (৳) *</label>
                  <input type="number" placeholder="120000" value={form.target}
                    onChange={e => setForm(p => ({ ...p, target: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Already Saved (৳)</label>
                  <input type="number" placeholder="0" value={form.saved}
                    onChange={e => setForm(p => ({ ...p, saved: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Target Deadline</label>
                <input type="month" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))}
                  className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div className="p-5 pt-0 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-border py-2.5 rounded-xl text-sm font-medium hover:bg-muted">Cancel</button>
              <button onClick={addGoal} disabled={!form.title.trim() || !form.target}
                className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-40">
                Add Goal
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Goals & Dream Planner</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90">
          <Plus size={16} /> New Goal
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {goalList.map(goal => {
          const progress = Math.min(100, Math.round((goal.saved / goal.target) * 100));
          return (
            <Card key={goal.id} className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="info">{goal.category}</Badge>
                  <h3 className="font-semibold mt-1.5">{goal.title}</h3>
                  <p className="text-xs text-muted-foreground">Target: {goal.deadline}</p>
                </div>
                <button className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground"><MoreHorizontal size={15} /></button>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">{progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${progress}%`, backgroundColor: goal.color }} />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <div><p className="text-muted-foreground text-xs">Saved</p><p className="font-bold">৳{goal.saved.toLocaleString()}</p></div>
                <div className="text-right"><p className="text-muted-foreground text-xs">Remaining</p><p className="font-bold">৳{(goal.target - goal.saved).toLocaleString()}</p></div>
                <div className="text-right"><p className="text-muted-foreground text-xs">Target</p><p className="font-bold">৳{goal.target.toLocaleString()}</p></div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Habits Page ─────────────────────────────────────────────────────────────
function HabitsPage() {
  const [habitList, setHabitList] = useState(habits);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", icon: "⭐", reminder: "08:00" });
  const emojiOptions = ["📚","🏃","📖","💧","😴","🤲","🧘","💊","🏋️","🎵","✍️","🍎","☀️","🚶","🧹"];

  const toggleHabit = (id: number) => setHabitList(prev => prev.map(h => h.id === id ? { ...h, done: !h.done } : h));

  const addHabit = () => {
    if (!form.name.trim()) return;
    setHabitList(prev => [...prev, { id: Date.now(), name: form.name, icon: form.icon, streak: 0, done: false }]);
    setForm({ name: "", icon: "⭐", reminder: "08:00" });
    setShowModal(false);
  };

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="p-4 sm:p-6 pb-24 lg:pb-6 space-y-5">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-bold">Add Habit</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground"><X size={16} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Habit Name *</label>
                <input autoFocus placeholder="e.g. Morning Walk" value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  onKeyDown={e => e.key === "Enter" && addHabit()}
                  className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-2">Pick an Icon</label>
                <div className="flex flex-wrap gap-2">
                  {emojiOptions.map(e => (
                    <button key={e} onClick={() => setForm(p => ({ ...p, icon: e }))}
                      className={`text-xl w-10 h-10 rounded-xl border-2 transition-all ${form.icon === e ? "border-primary bg-primary/10 scale-110" : "border-border hover:border-primary/50"}`}>
                      {e}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Daily Reminder Time</label>
                <input type="time" value={form.reminder} onChange={e => setForm(p => ({ ...p, reminder: e.target.value }))}
                  className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div className="p-5 pt-0 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-border py-2.5 rounded-xl text-sm font-medium hover:bg-muted">Cancel</button>
              <button onClick={addHabit} disabled={!form.name.trim()}
                className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-40">
                Add Habit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Habit Tracker</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90">
          <Plus size={16} /> Add Habit
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {habitList.map(habit => (
          <Card key={habit.id} className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{habit.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-sm">{habit.name}</p>
                <div className="flex items-center gap-1 text-xs text-amber-500">
                  <Flame size={11} /> {habit.streak} day streak
                </div>
              </div>
              <button onClick={() => toggleHabit(habit.id)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${habit.done ? "bg-emerald-500 border-emerald-500 text-white" : "border-muted-foreground hover:border-emerald-500"}`}>
                {habit.done && <CheckCircle size={14} className="text-white" />}
              </button>
            </div>
            <div className="flex gap-1">
              {weekDays.map((day, i) => (
                <div key={day} className={`flex-1 h-5 rounded-sm flex items-center justify-center text-xs ${i < 5 ? "bg-emerald-500" : i === 5 ? (habit.done ? "bg-emerald-500" : "bg-muted") : "bg-muted"}`}>
                  {i < 5 && <span className="text-white text-xs font-bold">✓</span>}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-1.5">
              {weekDays.map(d => <span key={d} className="flex-1 text-center text-xs text-muted-foreground">{d[0]}</span>)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Student Life Page ────────────────────────────────────────────────────────
function StudentPage() {
  const courses = [
    { code: "CSE301", name: "Data Structures", credit: 3, grade: "A", gp: 4.0 },
    { code: "CSE302", name: "Algorithms", credit: 3, grade: "A-", gp: 3.7 },
    { code: "CSE303", name: "Database Systems", credit: 3, grade: "B+", gp: 3.3 },
    { code: "MATH301", name: "Discrete Math", credit: 3, grade: "A", gp: 4.0 },
    { code: "CSE304", name: "OOP with Java", credit: 3, grade: "A+", gp: 4.0 },
  ];
  const cgpa = (courses.reduce((a, c) => a + c.gp * c.credit, 0) / courses.reduce((a, c) => a + c.credit, 0)).toFixed(2);

  const initialAssignments = [
    { id: 1, course: "CSE301", title: "Binary Tree Implementation", deadline: "Jun 11", priority: "High", status: "pending" },
    { id: 2, course: "CSE303", title: "ER Diagram for Hospital DB", deadline: "Jun 15", priority: "Medium", status: "in_progress" },
    { id: 3, course: "MATH301", title: "Graph Theory Problem Set", deadline: "Jun 20", priority: "Low", status: "pending" },
  ];

  const schedule = [
    { time: "08:00", mon: "CSE301", tue: "", wed: "CSE301", thu: "", fri: "CSE301" },
    { time: "10:00", mon: "CSE303", tue: "CSE302", wed: "", thu: "CSE302", fri: "" },
    { time: "13:00", mon: "", tue: "MATH301", wed: "CSE303", thu: "MATH301", fri: "CSE304" },
    { time: "15:00", mon: "CSE304", tue: "", wed: "CSE304", thu: "", fri: "" },
  ];

  const [assignmentList, setAssignmentList] = useState(initialAssignments);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState<number | null>(null);
  const [newAssign, setNewAssign] = useState({ title: "", course: "CSE301", deadline: "", priority: "Medium" });
  const [submitNote, setSubmitNote] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const addAssignment = () => {
    if (!newAssign.title.trim()) return;
    setAssignmentList(prev => [...prev, {
      id: Date.now(),
      title: newAssign.title,
      course: newAssign.course,
      deadline: newAssign.deadline || "TBD",
      priority: newAssign.priority,
      status: "pending",
    }]);
    setNewAssign({ title: "", course: "CSE301", deadline: "", priority: "Medium" });
    setShowAddModal(false);
  };

  const submitAssignment = (id: number) => {
    setSubmitSuccess(true);
    setTimeout(() => {
      setAssignmentList(prev => prev.map(a => a.id === id ? { ...a, status: "submitted" } : a));
      setSubmitSuccess(false);
      setShowSubmitModal(null);
      setSubmitNote("");
    }, 1400);
  };

  const pendingCount = assignmentList.filter(a => a.status !== "submitted").length;

  return (
    <div className="p-4 sm:p-6 pb-24 lg:pb-6 space-y-6">

      {/* Add Assignment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-bold">Add Assignment</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground"><X size={16} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Assignment Title *</label>
                <input
                  autoFocus
                  placeholder="e.g. Linked List Implementation"
                  value={newAssign.title}
                  onChange={e => setNewAssign(p => ({ ...p, title: e.target.value }))}
                  onKeyDown={e => e.key === "Enter" && addAssignment()}
                  className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Course</label>
                  <select value={newAssign.course} onChange={e => setNewAssign(p => ({ ...p, course: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                    {courses.map(c => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Priority</label>
                  <select value={newAssign.priority} onChange={e => setNewAssign(p => ({ ...p, priority: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                    {["High", "Medium", "Low"].map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Deadline</label>
                <input type="date" value={newAssign.deadline} onChange={e => setNewAssign(p => ({ ...p, deadline: e.target.value }))}
                  className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
            </div>
            <div className="p-5 pt-0 flex gap-3">
              <button onClick={() => setShowAddModal(false)} className="flex-1 border border-border py-2.5 rounded-xl text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
              <button onClick={addAssignment} disabled={!newAssign.title.trim()}
                className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-40 transition-all">
                Add Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Modal */}
      {showSubmitModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { setShowSubmitModal(null); setSubmitSuccess(false); }} />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            {submitSuccess ? (
              <div className="p-10 flex flex-col items-center gap-3 text-center">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center animate-pop">
                  <CheckCircle size={28} className="text-emerald-600" />
                </div>
                <p className="font-semibold text-emerald-600">Assignment submitted!</p>
                <p className="text-xs text-muted-foreground">Your submission has been recorded.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <div>
                    <h3 className="font-bold">Submit Assignment</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {assignmentList.find(a => a.id === showSubmitModal)?.title}
                    </p>
                  </div>
                  <button onClick={() => setShowSubmitModal(null)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground"><X size={16} /></button>
                </div>
                <div className="p-5 space-y-4">
                  {/* File upload area */}
                  <label className="block cursor-pointer">
                    <div className="border-2 border-dashed border-border rounded-xl p-5 text-center hover:border-primary/50 hover:bg-muted/30 transition-colors">
                      <Upload size={22} className="mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium text-muted-foreground">Click to attach file</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, ZIP — max 20MB</p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Submission Note (optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Add any notes for your instructor..."
                      value={submitNote}
                      onChange={e => setSubmitNote(e.target.value)}
                      className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                    />
                  </div>
                </div>
                <div className="p-5 pt-0 flex gap-3">
                  <button onClick={() => setShowSubmitModal(null)} className="flex-1 border border-border py-2.5 rounded-xl text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
                  <button onClick={() => submitAssignment(showSubmitModal)}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-medium hover:opacity-90">
                    <CheckCircle size={14} /> Confirm Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <h1 className="text-xl font-bold">Student Life Manager</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Star} label="Current CGPA" value={cgpa} color="emerald" />
        <StatCard icon={BookOpen} label="Completed Credits" value="45" sub="of 160 total" color="blue" />
        <StatCard icon={CheckSquare} label="Attendance" value="87%" color="amber" />
        <StatCard icon={AlertCircle} label="Pending Assignments" value={String(pendingCount)} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Schedule */}
        <Card className="p-5">
          <h3 className="font-semibold mb-4">Weekly Class Schedule</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-muted-foreground">
                  <th className="pb-2 text-left font-medium">Time</th>
                  {["Mon", "Tue", "Wed", "Thu", "Fri"].map(d => <th key={d} className="pb-2 font-medium text-center">{d}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {schedule.map(row => (
                  <tr key={row.time}>
                    <td className="py-2 font-mono text-muted-foreground pr-2">{row.time}</td>
                    {[row.mon, row.tue, row.wed, row.thu, row.fri].map((cls, i) => (
                      <td key={i} className="py-1 px-1 text-center">
                        {cls && <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded text-xs">{cls}</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* CGPA Calculator */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">CGPA Calculator</h3>
            <Badge variant="success">CGPA: {cgpa}</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="pb-2 text-left font-medium">Course</th>
                  <th className="pb-2 font-medium text-center">Credits</th>
                  <th className="pb-2 font-medium text-center">Grade</th>
                  <th className="pb-2 font-medium text-center">GP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {courses.map(c => (
                  <tr key={c.code}>
                    <td className="py-2 text-xs">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-muted-foreground">{c.code}</p>
                    </td>
                    <td className="py-2 text-center text-xs">{c.credit}</td>
                    <td className="py-2 text-center"><Badge variant="success">{c.grade}</Badge></td>
                    <td className="py-2 text-center font-semibold text-xs">{c.gp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Assignments */}
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Assignment Tracker</h3>
            <button onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1 text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 transition-all">
              <Plus size={13} /> Add Assignment
            </button>
          </div>
          <div className="space-y-3">
            {assignmentList.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <GraduationCap size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No assignments yet. Add one!</p>
              </div>
            )}
            {assignmentList.map(a => (
              <div key={a.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${a.status === "submitted" ? "bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800" : "bg-muted/30"}`}>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${a.status === "submitted" ? "line-through text-muted-foreground" : ""}`}>{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.course} · Due {a.deadline}</p>
                </div>
                <Badge variant={a.priority === "High" ? "danger" : a.priority === "Medium" ? "warning" : "default"}>{a.priority}</Badge>
                <Badge variant={a.status === "submitted" ? "success" : a.status === "in_progress" ? "warning" : "info"}>
                  {a.status === "submitted" ? "Submitted" : a.status === "in_progress" ? "In Progress" : "Pending"}
                </Badge>
                {a.status !== "submitted" ? (
                  <button
                    onClick={() => setShowSubmitModal(a.id)}
                    className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 whitespace-nowrap flex-shrink-0">
                    Submit
                  </button>
                ) : (
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium flex-shrink-0">
                    <CheckCircle size={13} /> Done
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Health Page ──────────────────────────────────────────────────────────────
function HealthPage() {
  const initMeds = [
    { id: 1, name: "Vitamin D3", dosage: "1 tablet", time: "Morning", frequency: "Daily", taken: true },
    { id: 2, name: "Omega-3", dosage: "2 capsules", time: "After Lunch", frequency: "Daily", taken: false },
    { id: 3, name: "Antibiotic Course", dosage: "500mg", time: "Night", frequency: "7 days", taken: true },
  ];
  const [medList, setMedList] = useState(initMeds);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", dosage: "", time: "Morning", frequency: "Daily", startDate: "", endDate: "" });

  const toggleTaken = (id: number) => setMedList(prev => prev.map(m => m.id === id ? { ...m, taken: !m.taken } : m));

  const addMedicine = () => {
    if (!form.name.trim() || !form.dosage.trim()) return;
    setMedList(prev => [...prev, { id: Date.now(), name: form.name, dosage: form.dosage, time: form.time, frequency: form.frequency, taken: false }]);
    setForm({ name: "", dosage: "", time: "Morning", frequency: "Daily", startDate: "", endDate: "" });
    setShowModal(false);
  };

  return (
    <div className="p-4 sm:p-6 pb-24 lg:pb-6 space-y-6">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-bold">Add Medicine</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground"><X size={16} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 rounded-xl">
                <Info size={13} className="text-blue-600 flex-shrink-0" />
                <p className="text-xs text-blue-700 dark:text-blue-400">Always follow your doctor's prescription.</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Medicine Name *</label>
                <input autoFocus placeholder="e.g. Paracetamol" value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Dosage *</label>
                <input placeholder="e.g. 500mg / 1 tablet" value={form.dosage}
                  onChange={e => setForm(p => ({ ...p, dosage: e.target.value }))}
                  className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Time</label>
                  <select value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                    {["Morning","After Breakfast","Afternoon","After Lunch","Evening","Night","Before Sleep"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Frequency</label>
                  <select value={form.frequency} onChange={e => setForm(p => ({ ...p, frequency: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                    {["Daily","Twice daily","Every 8 hours","Weekly","3 days","5 days","7 days","10 days","As needed"].map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Start Date</label>
                  <input type="date" value={form.startDate} onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">End Date</label>
                  <input type="date" value={form.endDate} onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-border py-2.5 rounded-xl text-sm font-medium hover:bg-muted">Cancel</button>
              <button onClick={addMedicine} disabled={!form.name.trim() || !form.dosage.trim()}
                className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-40">
                Add Medicine
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-xl font-bold">Health Manager</h1>
      <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 rounded-xl">
        <Info size={15} className="text-blue-600 flex-shrink-0" />
        <p className="text-xs text-blue-700 dark:text-blue-400">LifeSync does not provide medical diagnosis or emergency medical treatment. Always consult a licensed doctor.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Activity} label="Today's Steps" value="6,240" sub="Goal: 10,000" color="emerald" />
        <StatCard icon={Droplets} label="Water Intake" value="5 / 8" sub="glasses" color="blue" />
        <StatCard icon={Clock} label="Sleep Last Night" value="6.5 hrs" sub="Goal: 8 hrs" color="amber" />
        <StatCard icon={Dumbbell} label="Exercise This Week" value="3 days" sub="Goal: 5 days" color="navy" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Medicine Reminders</h3>
            <button onClick={() => setShowModal(true)}
              className="flex items-center gap-1 text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90">
              <Plus size={13} /> Add Medicine
            </button>
          </div>
          <div className="space-y-3">
            {medList.map(med => (
              <div key={med.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${med.taken ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600" : "bg-amber-100 dark:bg-amber-900/30 text-amber-600"}`}>
                  <Pill size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{med.name}</p>
                  <p className="text-xs text-muted-foreground">{med.dosage} · {med.time} · {med.frequency}</p>
                </div>
                <button onClick={() => toggleTaken(med.id)}>
                  <Badge variant={med.taken ? "success" : "warning"}>{med.taken ? "Taken ✓" : "Mark Taken"}</Badge>
                </button>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Emergency Medical Profile</h3>
            <Badge variant="danger">Private</Badge>
          </div>
          <div className="space-y-3">
            {[
              { label: "Blood Group", value: "B+" },
              { label: "Allergies", value: "None known" },
              { label: "Emergency Contact", value: "+880 1XXXXXXXX" },
              { label: "Primary Doctor", value: "Dr. Rahman (DMCH)" },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Emergency Page ───────────────────────────────────────────────────────────
function EmergencyPage() {
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const profileText = `🆘 EMERGENCY PROFILE\nName: Showket Ahamed\nBlood Group: B+\nLocation: Dhaka, Bangladesh\nEmergency Contact: +880 1XXXXXXXX\nAllergies: None known\nDoctor: Dr. Rahman (DMCH)`;

  const copyProfile = () => {
    navigator.clipboard.writeText(profileText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const services = [
    { icon: "🚔", label: "Police", number: "999", color: "bg-blue-600" },
    { icon: "🚒", label: "Fire Service", number: "199", color: "bg-red-600" },
    { icon: "🚑", label: "Ambulance", number: "199", color: "bg-emerald-600" },
    { icon: "🏥", label: "DMCH", number: "Nearest Hospital", color: "bg-indigo-600" },
    { icon: "🩸", label: "Blood Donor", number: "Find Donors", color: "bg-rose-600" },
    { icon: "🆘", label: "National Emergency", number: "999", color: "bg-orange-600" },
  ];

  return (
    <div className="p-4 sm:p-6 pb-24 lg:pb-6 space-y-6">
      {/* Share Modal */}
      {showShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowShare(false)} />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-bold text-red-600">Share Emergency Profile</h3>
              <button onClick={() => setShowShare(false)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground"><X size={16} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <pre className="text-xs text-foreground whitespace-pre-wrap font-mono leading-relaxed">{profileText}</pre>
              </div>
              <p className="text-xs text-muted-foreground text-center">Share this profile with emergency responders or family members.</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={copyProfile}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border transition-all ${copied ? "bg-emerald-600 text-white border-emerald-600" : "border-border hover:bg-muted"}`}>
                  {copied ? <><CheckCircle size={14} /> Copied!</> : <><FileText size={14} /> Copy Text</>}
                </button>
                <button onClick={() => { if (navigator.share) navigator.share({ title: "Emergency Profile", text: profileText }); }}
                  className="flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90">
                  <Phone size={14} /> Share via App
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "WhatsApp", color: "bg-green-500", icon: "💬" },
                  { label: "SMS", color: "bg-blue-500", icon: "📱" },
                  { label: "Email", color: "bg-gray-600", icon: "📧" },
                ].map(s => (
                  <button key={s.label} className={`${s.color} text-white py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1 hover:opacity-90`}>
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl flex items-center justify-center">
          <AlertTriangle size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold">Emergency</h1>
          <p className="text-sm text-muted-foreground">Quick access to emergency services</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {services.map(s => (
          <button key={s.label} className={`${s.color} text-white p-5 rounded-2xl flex flex-col items-center gap-2 hover:opacity-90 transition-opacity shadow-md`}>
            <span className="text-3xl">{s.icon}</span>
            <span className="font-bold text-sm">{s.label}</span>
            <span className="text-white/80 text-xs">{s.number}</span>
          </button>
        ))}
      </div>

      <Card className="p-5 border-red-200 dark:border-red-800">
        <h3 className="font-semibold mb-3 text-red-600">My Emergency Profile</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            { label: "Name", value: "Showket Ahamed" },
            { label: "Blood Group", value: "B+" },
            { label: "Location", value: "Dhaka, Bangladesh" },
            { label: "Emergency Contact", value: "+880 1XXXXXXXX" },
            { label: "Allergies", value: "None known" },
            { label: "Primary Doctor", value: "Dr. Rahman (DMCH)" },
          ].map(item => (
            <div key={item.label}>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-sm font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
        <button onClick={() => setShowShare(true)}
          className="w-full flex items-center justify-center gap-2 border border-red-400 text-red-500 py-2.5 rounded-xl text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
          <Phone size={15} /> Share Emergency Profile
        </button>
      </Card>
    </div>
  );
}

// ─── AI Page ──────────────────────────────────────────────────────────────────
function AIPage() {
  const [messages, setMessages] = useState(aiMessages);
  const [input, setInput] = useState("");

  const suggestedPrompts = [
    "Plan my day for tomorrow",
    "Analyze my monthly expenses",
    "Show upcoming deadlines",
    "Create an IELTS study plan",
    "Which documents expire soon?",
    "Summarize my weekly progress",
  ];

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg = { role: "user", content: text };
    const aiResponses: Record<string, string> = {
      "Plan my day for tomorrow": "Sure! Here's your plan for tomorrow:\n\n☀️ **Morning (8-10am):** Study CSE301 — Binary Tree chapter\n📝 **10am-12pm:** Complete Data Structures assignment (due tonight!)\n🍽️ **12-1pm:** Lunch break\n💰 **1-2pm:** Pay DESCO electricity bill via bKash (৳1,850)\n📚 **2-5pm:** Study Algorithms and review CGPA goals\n🏃 **5-6pm:** Evening walk — hit your exercise habit streak!\n📖 **Evening:** Read 30 minutes before bed\n\nRemember: House rent is overdue — contact your landlord! 🏠",
      "Analyze my monthly expenses": "📊 **June 2025 Expense Analysis:**\n\nTotal Spending: **৳22,500** (64% of income)\n\n**Top Categories:**\n1. 🏠 House Rent: ৳8,000 (35.6%)\n2. 🛒 Grocery: ৳4,500 (20%)\n3. 📚 Education: ৳3,000 (13.3%)\n4. 🚌 Transport: ৳2,200 (9.8%)\n\n**Insight:** Your savings rate is 35.7% — above the recommended 30%! 🎉\n\n**Tip:** Consider reducing transport costs by using bus more often — could save ৳500-800/month.",
    };
    const aiReply = { role: "assistant", content: aiResponses[text] || "I'm analyzing your life data... Here's what I can tell you:\n\nYou have **6 pending tasks**, **3 upcoming bills**, and **1 document expiring soon** (Passport in 160 days). Your CGPA stands at **3.8** and you're 37.5% toward your laptop savings goal.\n\nWould you like me to prioritize your tasks for the week or create a detailed action plan? 🤖" };
    setMessages(prev => [...prev, userMsg, aiReply]);
    setInput("");
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col pb-16 lg:pb-0">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
            <Bot size={18} className="text-emerald-400" />
          </div>
          <div>
            <p className="font-semibold text-sm">LifeSync AI</p>
            <p className="text-xs text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Online</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground"><RefreshCw size={15} /></button>
          <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground"><Trash2 size={15} /></button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                <Bot size={14} className="text-emerald-400" />
              </div>
            )}
            <div className={`max-w-xs sm:max-w-md lg:max-w-lg rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card border border-border text-foreground rounded-bl-sm"}`}>
              {msg.content}
            </div>
          </div>
        ))}

        {messages.length === 1 && (
          <div className="mt-4">
            <p className="text-xs text-muted-foreground mb-3 text-center">Try asking:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedPrompts.map(p => (
                <button key={p} onClick={() => sendMessage(p)}
                  className="text-xs border border-border px-3 py-1.5 rounded-xl hover:bg-muted hover:border-primary/50 transition-all">
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card flex-shrink-0">
        <p className="text-xs text-muted-foreground mb-2 text-center">AI suggestions are for planning and organizational support only.</p>
        <div className="flex gap-2">
          <button className="p-2.5 border border-border rounded-xl text-muted-foreground hover:bg-muted transition-colors"><Paperclip size={16} /></button>
          <button className="p-2.5 border border-border rounded-xl text-muted-foreground hover:bg-muted transition-colors"><Mic size={16} /></button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask LifeSync AI anything about your life..."
            className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button onClick={() => sendMessage(input)}
            className="p-2.5 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Notifications Page ───────────────────────────────────────────────────────
function NotificationsPage() {
  const [filter, setFilter] = useState("all");
  const typeIcon: Record<string, React.ElementType> = { bill: Receipt, document: FileText, study: GraduationCap, finance: Wallet };
  const typeColor: Record<string, string> = { bill: "amber", document: "blue", study: "emerald", finance: "navy" };

  const filtered = filter === "unread" ? notifications.filter(n => !n.read) : notifications;

  return (
    <div className="p-4 sm:p-6 pb-24 lg:pb-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Notifications</h1>
        <button className="text-xs text-primary">Mark all read</button>
      </div>
      <div className="flex gap-2">
        {["all", "unread"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs rounded-xl border transition-all capitalize ${filter === f ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}>
            {f} {f === "unread" && `(${notifications.filter(n => !n.read).length})`}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map(notif => {
          const Icon = typeIcon[notif.type] || Bell;
          return (
            <Card key={notif.id} className={`p-4 flex items-start gap-3 ${!notif.read ? "border-l-4 border-l-primary" : ""}`}>
              <div className={`p-2 rounded-lg flex-shrink-0 ${!notif.read ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                <Icon size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${!notif.read ? "font-semibold" : "font-medium text-muted-foreground"}`}>{notif.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{notif.desc}</p>
                <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
              </div>
              {!notif.read && <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Settings Page ────────────────────────────────────────────────────────────
function SettingsPage({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  const [activeSection, setActiveSection] = useState("profile");
  const sections = [
    { id: "profile", label: "Personal Info", icon: User },
    { id: "theme", label: "Theme & Display", icon: Moon },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Lock },
    { id: "language", label: "Language & Region", icon: Globe },
  ];

  return (
    <div className="p-4 sm:p-6 pb-24 lg:pb-6">
      <h1 className="text-xl font-bold mb-5">Settings</h1>
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="sm:w-48 space-y-1">
          {sections.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${activeSection === s.id ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-muted"}`}>
              <s.icon size={16} /> {s.label}
            </button>
          ))}
        </div>

        <div className="flex-1">
          {activeSection === "profile" && (
            <Card className="p-6 space-y-5">
              <h3 className="font-semibold">Personal Information</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white text-xl font-bold flex items-center justify-center">SA</div>
                <button className="border border-border text-sm px-3 py-1.5 rounded-xl hover:bg-muted transition-colors">Change Photo</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Full Name", value: "Showket Ahamed" },
                  { label: "Email", value: "showket@example.com" },
                  { label: "Phone", value: "+880 1XXXXXXXX" },
                  { label: "Location", value: "Dhaka, Bangladesh" },
                  { label: "User Type", value: "University Student" },
                  { label: "Currency", value: "BDT (৳)" },
                ].map(f => (
                  <div key={f.label}>
                    <label className="text-xs text-muted-foreground block mb-1">{f.label}</label>
                    <input defaultValue={f.value} className="w-full bg-input-background border border-border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                ))}
              </div>
              <button className="bg-primary text-primary-foreground px-5 py-2 rounded-xl text-sm font-medium hover:opacity-90">Save Changes</button>
            </Card>
          )}

          {activeSection === "theme" && (
            <Card className="p-6 space-y-5">
              <h3 className="font-semibold">Theme & Display</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Dark Mode</p>
                  <p className="text-xs text-muted-foreground">Switch between light and dark theme</p>
                </div>
                <button onClick={() => setDark(!dark)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${dark ? "bg-primary" : "bg-muted"}`}>
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${dark ? "translate-x-6" : "translate-x-0.5"}`} />
                </button>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Time Zone</p>
                <select defaultValue="Asia/Dhaka" className="w-full bg-input-background border border-border rounded-xl px-3 py-2 text-sm outline-none">
                  <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                  <option>UTC</option>
                </select>
              </div>
            </Card>
          )}

          {activeSection === "language" && (
            <Card className="p-6 space-y-5">
              <h3 className="font-semibold">Language & Region</h3>
              <div>
                <label className="text-sm text-muted-foreground block mb-2">App Language</label>
                <div className="grid grid-cols-2 gap-3">
                  {["English", "বাংলা"].map(lang => (
                    <button key={lang} className={`py-3 border rounded-xl text-sm font-medium transition-all ${lang === "English" ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50"}`}>
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-2">Default Currency</label>
                <input defaultValue="BDT (৳)" className="w-full bg-input-background border border-border rounded-xl px-3 py-2 text-sm outline-none" readOnly />
              </div>
            </Card>
          )}

          {(activeSection === "notifications" || activeSection === "privacy") && (
            <Card className="p-6">
              <h3 className="font-semibold mb-4">{sections.find(s => s.id === activeSection)?.label}</h3>
              <div className="space-y-4">
                {(activeSection === "notifications"
                  ? ["Bill Due Reminders", "Document Expiry Alerts", "Task Deadlines", "Goal Updates", "Weekly Summary", "Security Alerts"]
                  : ["Two-Factor Authentication", "Login Notifications", "Data Export", "Connected Accounts", "Delete Account"]
                ).map(item => (
                  <div key={item} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm">{item}</span>
                    <button className="w-10 h-5 bg-primary rounded-full relative">
                      <span className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Family Page (placeholder) ─────────────────────────────────────────────────
function FamilyPage() {
  const initMembers = [
    { id: 1, name: "Abbu (Father)", relation: "Father", blood: "O+", initials: "AF", phone: "+880 1XXXXXXXX", age: 52, role: "Family Admin" },
    { id: 2, name: "Ammu (Mother)", relation: "Mother", blood: "B+", initials: "AM", phone: "+880 1XXXXXXXX", age: 48, role: "Adult Member" },
    { id: 3, name: "Showket (Me)", relation: "Son", blood: "B+", initials: "SA", phone: "+880 1XXXXXXXX", age: 22, role: "Adult Member" },
    { id: 4, name: "Riya (Sister)", relation: "Sister", blood: "A+", initials: "RA", phone: "+880 1XXXXXXXX", age: 16, role: "Limited Member" },
  ];

  const [members, setMembers] = useState(initMembers);
  const [viewMember, setViewMember] = useState<typeof initMembers[0] | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ name: "", relation: "Parent", blood: "A+", phone: "", age: "", role: "Adult Member" });

  const addMember = () => {
    if (!form.name.trim()) return;
    const initials = form.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    setMembers(prev => [...prev, { id: Date.now(), name: form.name, relation: form.relation, blood: form.blood, initials, phone: form.phone, age: Number(form.age) || 0, role: form.role }]);
    setForm({ name: "", relation: "Parent", blood: "A+", phone: "", age: "", role: "Adult Member" });
    setShowAddModal(false);
  };

  return (
    <div className="p-4 sm:p-6 pb-24 lg:pb-6 space-y-5">

      {/* View Profile Modal */}
      {viewMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setViewMember(null)} />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-sm animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-bold">Family Member Profile</h3>
              <button onClick={() => setViewMember(null)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground"><X size={16} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex flex-col items-center gap-3 pb-4 border-b border-border">
                <div className="w-20 h-20 rounded-full bg-emerald-600 text-white text-2xl font-bold flex items-center justify-center">
                  {viewMember.initials}
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg">{viewMember.name}</p>
                  <p className="text-sm text-muted-foreground">{viewMember.relation}</p>
                  <Badge variant="info">{viewMember.role}</Badge>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Blood Group", value: viewMember.blood, icon: "🩸" },
                  { label: "Age", value: `${viewMember.age} years`, icon: "🎂" },
                  { label: "Phone", value: viewMember.phone, icon: "📱" },
                  { label: "Role", value: viewMember.role, icon: "👤" },
                ].map(row => (
                  <div key={row.label} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                    <span className="text-lg">{row.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">{row.label}</p>
                      <p className="text-sm font-semibold">{row.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 pt-0">
              <button onClick={() => setViewMember(null)} className="w-full border border-border py-2.5 rounded-xl text-sm font-medium hover:bg-muted">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-bold">Add Family Member</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground"><X size={16} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Full Name *</label>
                <input autoFocus placeholder="e.g. Karim Uncle" value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  onKeyDown={e => e.key === "Enter" && addMember()}
                  className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Relationship</label>
                  <select value={form.relation} onChange={e => setForm(p => ({ ...p, relation: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                    {["Father","Mother","Son","Daughter","Brother","Sister","Spouse","Grandparent","Uncle","Aunt","Cousin"].map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Blood Group</label>
                  <select value={form.blood} onChange={e => setForm(p => ({ ...p, blood: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                    {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Phone</label>
                  <input placeholder="+880 1XXXXXXXX" value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Age</label>
                  <input type="number" placeholder="25" value={form.age}
                    onChange={e => setForm(p => ({ ...p, age: e.target.value }))}
                    className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Role</label>
                <select value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                  className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                  {["Family Admin","Adult Member","Limited Member"].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="p-5 pt-0 flex gap-3">
              <button onClick={() => setShowAddModal(false)} className="flex-1 border border-border py-2.5 rounded-xl text-sm font-medium hover:bg-muted">Cancel</button>
              <button onClick={addMember} disabled={!form.name.trim()}
                className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-40">
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Family Management</h1>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90">
          <Plus size={16} /> Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {members.map(m => (
          <Card key={m.id} className="p-5 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-600 text-white text-lg font-bold flex items-center justify-center mx-auto">{m.initials}</div>
            <div>
              <p className="font-semibold text-sm">{m.name}</p>
              <p className="text-xs text-muted-foreground">{m.relation}</p>
              <Badge variant="danger">{m.blood}</Badge>
            </div>
            <button onClick={() => setViewMember(m)} className="w-full text-xs border border-border py-1.5 rounded-xl hover:bg-muted transition-colors">
              View Profile
            </button>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="p-5">
          <h3 className="font-semibold mb-3">Upcoming Family Events</h3>
          <div className="space-y-3">
            {[
              { icon: "🎂", event: "Ammu's Birthday", date: "Jun 20" },
              { icon: "💊", event: "Abbu's Medicine Reminder", date: "Daily 8AM" },
              { icon: "🎓", event: "Riya's School Exam", date: "Jun 25" },
            ].map(e => (
              <div key={e.event} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                <span className="text-xl">{e.icon}</span>
                <div className="flex-1"><p className="text-sm font-medium">{e.event}</p></div>
                <Badge variant="info">{e.date}</Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="font-semibold mb-3">Shared Grocery List</h3>
          <div className="space-y-2">
            {["Rice (10kg)", "Dal (2kg)", "Fish (1kg)", "Vegetables", "Cooking Oil"].map((item, i) => (
              <label key={item} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked={i < 2} className="accent-emerald-600" />
                <span className={`text-sm ${i < 2 ? "line-through text-muted-foreground" : ""}`}>{item}</span>
              </label>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
type AdminSection = "overview" | "users" | "subscriptions" | "revenue" | "ai" | "support" | "security" | "audit" | "settings";

const adminNav = [
  { id: "overview",       label: "Dashboard",         icon: LayoutDashboard },
  { id: "users",          label: "Users",              icon: Users },
  { id: "subscriptions",  label: "Subscriptions",      icon: Package },
  { id: "revenue",        label: "Revenue",            icon: LineChart },
  { id: "ai",             label: "AI Management",      icon: Bot },
  { id: "support",        label: "Support Tickets",    icon: TicketCheck },
  { id: "security",       label: "Security Center",    icon: ShieldAlert },
  { id: "audit",          label: "Audit Logs",         icon: FileBarChart },
  { id: "settings",       label: "Settings",           icon: Settings },
];

const userRows = [
  { id: 1, name: "Farhan Hossain",  email: "farhan@example.com",  plan: "Pro",    status: "active",    joined: "Jun 01", location: "Dhaka" },
  { id: 2, name: "Nadia Rahman",    email: "nadia@example.com",   plan: "Free",   status: "active",    joined: "Jun 03", location: "Chittagong" },
  { id: 3, name: "Karim Molla",     email: "karim@example.com",   plan: "Family", status: "active",    joined: "May 28", location: "Sylhet" },
  { id: 4, name: "Ritu Begum",      email: "ritu@example.com",    plan: "Free",   status: "suspended", joined: "May 15", location: "Rajshahi" },
  { id: 5, name: "Shakil Ahmed",    email: "shakil@example.com",  plan: "Pro",    status: "active",    joined: "Jun 05", location: "Dhaka" },
  { id: 6, name: "Mitu Akter",      email: "mitu@example.com",    plan: "Free",   status: "inactive",  joined: "Apr 20", location: "Khulna" },
  { id: 7, name: "Rasel Khan",      email: "rasel@example.com",   plan: "Pro",    status: "active",    joined: "Jun 08", location: "Dhaka" },
];

const ticketRows = [
  { id: "TKT-001", user: "Farhan Hossain",  subject: "Can't upload NID document",    priority: "High",   status: "open",     time: "2h ago" },
  { id: "TKT-002", user: "Nadia Rahman",    subject: "bKash payment not reflecting", priority: "High",   status: "pending",  time: "5h ago" },
  { id: "TKT-003", user: "Karim Molla",     subject: "AI assistant not responding",  priority: "Medium", status: "open",     time: "1d ago" },
  { id: "TKT-004", user: "Shakil Ahmed",    subject: "Subscription upgrade issue",   priority: "Low",    status: "resolved", time: "2d ago" },
  { id: "TKT-005", user: "Mitu Akter",      subject: "Dark mode not saving",         priority: "Low",    status: "closed",   time: "3d ago" },
];

const auditRows = [
  { admin: "Showket Ahamed", action: "Suspended user ritu@example.com",  ip: "103.x.x.1", device: "Chrome / Windows", time: "10 min ago", status: "success" },
  { admin: "Showket Ahamed", action: "Exported user report (CSV)",        ip: "103.x.x.1", device: "Chrome / Windows", time: "1h ago",     status: "success" },
  { admin: "Showket Ahamed", action: "Updated Pro plan pricing",          ip: "103.x.x.1", device: "Chrome / Windows", time: "3h ago",     status: "success" },
  { admin: "Showket Ahamed", action: "Failed login attempt",              ip: "41.x.x.9",  device: "Unknown",          time: "6h ago",     status: "failed" },
  { admin: "Showket Ahamed", action: "Sent push notification (all users)",ip: "103.x.x.1", device: "Chrome / Windows", time: "1d ago",     status: "success" },
];

const revenueData = [
  { month: "Jan", revenue: 850000, refunds: 25000 },
  { month: "Feb", revenue: 920000, refunds: 18000 },
  { month: "Mar", revenue: 1050000, refunds: 32000 },
  { month: "Apr", revenue: 980000, refunds: 21000 },
  { month: "May", revenue: 1180000, refunds: 28000 },
  { month: "Jun", revenue: 1280000, refunds: 15000 },
];

const userGrowthData = [
  { month: "Jan", users: 38000 },
  { month: "Feb", users: 41200 },
  { month: "Mar", users: 44800 },
  { month: "Apr", users: 47100 },
  { month: "May", users: 49900 },
  { month: "Jun", users: 52480 },
];

const planDistribution = [
  { name: "Free", value: 43760, color: "#94a3b8" },
  { name: "Pro", value: 6240, color: "#059669" },
  { name: "Family", value: 2480, color: "#1e3a5f" },
];

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [section, setSection] = useState<AdminSection>("overview");
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userSearch, setUserSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [ticketFilter, setTicketFilter] = useState("all");
  const [notifModal, setNotifModal] = useState(false);
  const [suspendModal, setSuspendModal] = useState<number | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const showToast = (msg: string) => { setToastMsg(msg); setTimeout(() => setToastMsg(null), 2500); };

  const filteredUsers = userRows.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const AdminCard = ({ icon: Icon, label, value, sub, color = "emerald", trend }: {
    icon: React.ElementType; label: string; value: string; sub?: string; color?: string; trend?: number;
  }) => {
    const colorMap: Record<string, string> = {
      emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
      blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      amber: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
      red: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
      navy: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
      purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    };
    return (
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div className={`p-2.5 rounded-lg ${colorMap[color]}`}><Icon size={17} /></div>
          {trend !== undefined && (
            <span className={`flex items-center gap-0.5 text-xs font-medium ${trend >= 0 ? "text-emerald-600" : "text-red-500"}`}>
              {trend >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {Math.abs(trend)}%
            </span>
          )}
        </div>
        <p className="text-2xl font-bold mt-3">{value}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </div>
    );
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Admin Overview</h1>
        <p className="text-sm text-muted-foreground">Welcome back, Showket. Here is your platform summary.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminCard icon={Users}       label="Total Users"         value="52,480" trend={6}  color="emerald" />
        <AdminCard icon={UserCheck}   label="Active Today"        value="9,840"  trend={12} color="blue" />
        <AdminCard icon={Star}        label="Premium Users"       value="8,720"  trend={4}  color="amber" />
        <AdminCard icon={DollarSign}  label="Monthly Revenue"     value="৳12.8L" trend={8}  color="navy" />
        <AdminCard icon={TicketCheck} label="Open Tickets"        value="132"    trend={-5} color="red" />
        <AdminCard icon={Bot}         label="AI Requests Today"   value="9,240"  trend={15} color="purple" />
        <AdminCard icon={HardDrive}   label="Storage Used"        value="72%"               color="amber" sub="1.44 TB of 2 TB" />
        <AdminCard icon={Cpu}         label="Server Health"       value="Healthy"            color="emerald" sub="Uptime 99.98%" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={v => `৳${(v/100000).toFixed(1)}L`} />
              <Tooltip formatter={(v: number) => [`৳${v.toLocaleString()}`, ""]} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#059669" fill="url(#rev)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={userGrowthData}>
              <defs>
                <linearGradient id="ug" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <Tooltip formatter={(v: number) => [v.toLocaleString(), "Users"]} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: 12 }} />
              <Area type="monotone" dataKey="users" stroke="#3b82f6" fill="url(#ug)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plan distribution */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-4">Subscription Distribution</h3>
          <div className="flex justify-center mb-3">
            <ResponsiveContainer width={140} height={140}>
              <RePieChart>
                <Pie data={planDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={0}>
                  {planDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </RePieChart>
            </ResponsiveContainer>
          </div>
          {planDistribution.map(p => (
            <div key={p.name} className="flex items-center gap-2 mb-1.5">
              <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: p.color }} />
              <span className="text-xs flex-1 text-muted-foreground">{p.name}</span>
              <span className="text-xs font-semibold">{p.value.toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* Recent activity */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Registrations</h3>
            <button onClick={() => setSection("users")} className="text-xs text-primary">View all →</button>
          </div>
          <div className="space-y-3">
            {userRows.slice(0, 5).map(u => (
              <div key={u.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {u.name.split(" ").map(w => w[0]).join("").slice(0,2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.email} · {u.location}</p>
                </div>
                <Badge variant={u.plan === "Pro" ? "success" : u.plan === "Family" ? "info" : "default"}>{u.plan}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Create Notification", icon: Megaphone, action: () => setNotifModal(true) },
            { label: "Export Reports", icon: Download, action: () => showToast("Report exported as CSV") },
            { label: "Backup Database", icon: Database, action: () => showToast("Database backup started...") },
            { label: "Add Admin", icon: UserCheck, action: () => showToast("Invite sent to new admin") },
            { label: "View Security", icon: ShieldAlert, action: () => setSection("security") },
          ].map(qa => (
            <button key={qa.label} onClick={qa.action}
              className="flex items-center gap-2 border border-border px-4 py-2 rounded-xl text-sm font-medium hover:bg-muted hover:border-primary/40 transition-all">
              <qa.icon size={15} className="text-primary" /> {qa.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-5">
      {suspendModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSuspendModal(null)} />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-sm animate-scale-in p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <Ban size={24} />
            </div>
            <h3 className="font-bold text-lg">Suspend User?</h3>
            <p className="text-sm text-muted-foreground">This user will lose access to LifeSync immediately. You can reactivate them anytime.</p>
            <div className="flex gap-3">
              <button onClick={() => setSuspendModal(null)} className="flex-1 border border-border py-2.5 rounded-xl text-sm font-medium hover:bg-muted">Cancel</button>
              <button onClick={() => { setSuspendModal(null); showToast("User suspended successfully"); }}
                className="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90">Suspend</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">User Management</h1>
        <div className="flex gap-2">
          <button onClick={() => showToast("Users exported as CSV")} className="flex items-center gap-2 border border-border px-3 py-2 rounded-xl text-sm hover:bg-muted"><Download size={14} /> Export</button>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90"><Plus size={14} /> Add User</button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Search users..." value={userSearch} onChange={e => setUserSearch(e.target.value)}
            className="w-full bg-input-background border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        {["All", "Active", "Suspended", "Pro", "Free", "Family"].map(f => (
          <button key={f} className="px-3 py-2 text-xs border border-border rounded-xl hover:bg-muted hover:border-primary/40 transition-all">{f}</button>
        ))}
      </div>

      {/* Bulk actions */}
      {selectedUsers.length > 0 && (
        <div className="flex items-center gap-3 bg-primary/10 border border-primary/20 px-4 py-2.5 rounded-xl text-sm">
          <span className="text-primary font-medium">{selectedUsers.length} selected</span>
          <div className="flex gap-2 ml-2">
            {["Suspend", "Activate", "Delete", "Export"].map(a => (
              <button key={a} onClick={() => { showToast(`${a} action applied`); setSelectedUsers([]); }}
                className="text-xs border border-primary/30 px-2.5 py-1 rounded-lg hover:bg-primary/10 text-primary">{a}</button>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left text-xs text-muted-foreground border-b border-border">
                <th className="p-4 font-medium">
                  <input type="checkbox" className="accent-emerald-600"
                    onChange={e => setSelectedUsers(e.target.checked ? filteredUsers.map(u => u.id) : [])} />
                </th>
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Plan</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Location</th>
                <th className="p-4 font-medium">Joined</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <input type="checkbox" className="accent-emerald-600"
                      checked={selectedUsers.includes(u.id)}
                      onChange={e => setSelectedUsers(prev => e.target.checked ? [...prev, u.id] : prev.filter(id => id !== u.id))} />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {u.name.split(" ").map(w => w[0]).join("").slice(0,2)}
                      </div>
                      <div>
                        <p className="font-medium">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4"><Badge variant={u.plan === "Pro" ? "success" : u.plan === "Family" ? "info" : "default"}>{u.plan}</Badge></td>
                  <td className="p-4"><Badge variant={u.status === "active" ? "success" : u.status === "suspended" ? "danger" : "default"}>{u.status}</Badge></td>
                  <td className="p-4 text-muted-foreground text-xs">{u.location}</td>
                  <td className="p-4 text-muted-foreground text-xs">{u.joined}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button title="View" className="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 rounded-lg text-muted-foreground transition-colors"><Eye size={13} /></button>
                      <button title="Edit" className="p-1.5 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 rounded-lg text-muted-foreground transition-colors"><Edit2 size={13} /></button>
                      <button title="Suspend" onClick={() => setSuspendModal(u.id)} className="p-1.5 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-600 rounded-lg text-muted-foreground transition-colors"><Ban size={13} /></button>
                      <button title="Delete" className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 rounded-lg text-muted-foreground transition-colors"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing {filteredUsers.length} of 52,480 users</span>
          <div className="flex gap-1">
            {[1,2,3,"...",524].map((p, i) => (
              <button key={i} className={`w-7 h-7 rounded-lg text-xs ${p === 1 ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubscriptions = () => (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">Subscription Management</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminCard icon={Users}       label="Free Users"      value="43,760" color="navy" />
        <AdminCard icon={Star}        label="Pro Users"       value="6,240"  color="emerald" trend={4} />
        <AdminCard icon={Users}       label="Family Plans"    value="2,480"  color="blue" trend={9} />
        <AdminCard icon={DollarSign}  label="MRR"             value="৳12.8L" color="amber" trend={8} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-4">Plan Details</h3>
          <div className="space-y-4">
            {[
              { plan: "Free",    price: "৳0",   users: "43,760", color: "bg-slate-500" },
              { plan: "Pro",     price: "৳299", users: "6,240",  color: "bg-emerald-500" },
              { plan: "Family",  price: "৳499", users: "2,480",  color: "bg-blue-600" },
            ].map(p => (
              <div key={p.plan} className="flex items-center gap-4 p-3 bg-muted/30 rounded-xl">
                <div className={`w-3 h-10 rounded-sm ${p.color}`} />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{p.plan}</p>
                  <p className="text-xs text-muted-foreground">{p.price}/month · {p.users} users</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs border border-border px-2.5 py-1 rounded-lg hover:bg-muted">Edit</button>
                  <button className="text-xs bg-primary text-primary-foreground px-2.5 py-1 rounded-lg hover:opacity-90">Manage</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Transactions</h3>
            <button onClick={() => showToast("Exported transactions")} className="text-xs text-primary flex items-center gap-1"><Download size={12} /> Export</button>
          </div>
          <div className="space-y-2.5">
            {[
              { user: "Farhan H.", plan: "Pro", amount: "৳299", date: "Jun 10", status: "paid" },
              { user: "Karim M.", plan: "Family", amount: "৳499", date: "Jun 09", status: "paid" },
              { user: "Shakil A.", plan: "Pro", amount: "৳299", date: "Jun 08", status: "paid" },
              { user: "Ritu B.", plan: "Pro", amount: "৳299", date: "Jun 05", status: "refunded" },
              { user: "Rasel K.", plan: "Pro", amount: "৳299", date: "Jun 04", status: "paid" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{t.user}</p>
                  <p className="text-xs text-muted-foreground">{t.plan} · {t.date}</p>
                </div>
                <span className={`font-semibold text-sm ${t.status === "refunded" ? "text-red-500" : "text-emerald-600"}`}>{t.status === "refunded" ? "-" : "+"}{t.amount}</span>
                <Badge variant={t.status === "paid" ? "success" : "danger"}>{t.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRevenue = () => (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">Revenue Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminCard icon={TrendingUp}  label="Monthly Revenue" value="৳12.8L" trend={8}  color="emerald" />
        <AdminCard icon={LineChart}   label="Annual Revenue"  value="৳1.1Cr" trend={22} color="blue" />
        <AdminCard icon={RefreshCw}   label="Refund Rate"     value="1.2%"  trend={-3} color="amber" />
        <AdminCard icon={CheckCircle} label="Payment Success" value="98.8%"             color="emerald" />
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold mb-4">Revenue vs Refunds — 2025</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={v => `৳${(v/100000).toFixed(1)}L`} />
            <Tooltip formatter={(v: number) => [`৳${v.toLocaleString()}`, ""]} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: 12 }} />
            <Legend />
            <Bar dataKey="revenue" name="Revenue" fill="#059669" radius={[4, 4, 0, 0]} />
            <Bar dataKey="refunds" name="Refunds" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderAI = () => (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">AI Management</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminCard icon={Bot}         label="Requests Today"    value="9,240"  trend={15} color="purple" />
        <AdminCard icon={Zap}         label="Tokens Used"       value="4.2M"   trend={18} color="amber" />
        <AdminCard icon={DollarSign}  label="Est. Cost Today"   value="$18.40"            color="blue" />
        <AdminCard icon={Clock}       label="Avg Response Time" value="1.2s"              color="emerald" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-4">Most Popular Prompts</h3>
          <div className="space-y-3">
            {[
              { prompt: "Plan my day", count: "2,140", pct: 78 },
              { prompt: "Analyze my expenses", count: "1,820", pct: 66 },
              { prompt: "Show upcoming bills", count: "1,340", pct: 49 },
              { prompt: "Create study plan", count: "980", pct: 36 },
              { prompt: "Which docs expire soon?", count: "760", pct: 28 },
            ].map(p => (
              <div key={p.prompt}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium">{p.prompt}</span>
                  <span className="text-muted-foreground">{p.count}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-4">Top AI Users</h3>
          <div className="space-y-3">
            {userRows.slice(0, 5).map((u, i) => (
              <div key={u.id} className="flex items-center gap-3">
                <span className="text-lg font-black text-muted-foreground/40 w-5">#{i + 1}</span>
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                  {u.name.split(" ").map(w => w[0]).join("").slice(0,2)}
                </div>
                <div className="flex-1"><p className="text-sm font-medium">{u.name}</p></div>
                <span className="text-xs font-semibold text-primary">{(480 - i * 60)} reqs</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Support Tickets</h1>
        <button onClick={() => showToast("Tickets exported")} className="flex items-center gap-2 border border-border px-3 py-2 rounded-xl text-sm hover:bg-muted"><Download size={14} /> Export</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminCard icon={AlertCircle} label="Open"     value="68"  color="red" />
        <AdminCard icon={Clock}       label="Pending"  value="32"  color="amber" />
        <AdminCard icon={CheckCircle} label="Resolved" value="24"  color="emerald" />
        <AdminCard icon={XCircle}     label="Closed"   value="8"   color="navy" />
      </div>
      <div className="flex gap-2 flex-wrap">
        {["all", "open", "pending", "resolved", "closed"].map(f => (
          <button key={f} onClick={() => setTicketFilter(f)}
            className={`px-3 py-1.5 text-xs rounded-xl border capitalize transition-all ${ticketFilter === f ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40"}`}>{f}</button>
        ))}
      </div>
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr className="text-left text-xs text-muted-foreground">
              <th className="p-4 font-medium">Ticket ID</th>
              <th className="p-4 font-medium">User</th>
              <th className="p-4 font-medium">Subject</th>
              <th className="p-4 font-medium">Priority</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Time</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ticketRows.filter(t => ticketFilter === "all" || t.status === ticketFilter).map(t => (
              <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-4 font-mono text-xs text-primary">{t.id}</td>
                <td className="p-4 text-sm font-medium">{t.user}</td>
                <td className="p-4 text-sm text-muted-foreground max-w-48 truncate">{t.subject}</td>
                <td className="p-4"><Badge variant={t.priority === "High" ? "danger" : t.priority === "Medium" ? "warning" : "default"}>{t.priority}</Badge></td>
                <td className="p-4"><Badge variant={t.status === "resolved" || t.status === "closed" ? "success" : t.status === "open" ? "danger" : "warning"}>{t.status}</Badge></td>
                <td className="p-4 text-xs text-muted-foreground">{t.time}</td>
                <td className="p-4">
                  <div className="flex gap-1">
                    <button onClick={() => showToast(`Replied to ${t.id}`)} className="text-xs bg-primary text-primary-foreground px-2.5 py-1 rounded-lg hover:opacity-90">Reply</button>
                    {t.status !== "closed" && (
                      <button onClick={() => showToast(`${t.id} resolved`)} className="text-xs border border-border px-2.5 py-1 rounded-lg hover:bg-muted">Resolve</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">Security Center</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminCard icon={XCircle}    label="Failed Logins Today"   value="24"  color="red" />
        <AdminCard icon={UserX}      label="Blocked Accounts"      value="7"   color="amber" />
        <AdminCard icon={ShieldAlert} label="Security Alerts"      value="3"   color="red" />
        <AdminCard icon={CheckCircle} label="2FA Enabled Users"    value="68%" color="emerald" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-4 text-red-600">Active Alerts</h3>
          <div className="space-y-3">
            {[
              { msg: "Multiple failed logins from IP 41.x.x.9", severity: "High", time: "6h ago" },
              { msg: "Unusual export activity detected", severity: "Medium", time: "1d ago" },
              { msg: "New admin login from unknown device", severity: "Low", time: "2d ago" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-muted/30 rounded-xl">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.severity === "High" ? "bg-red-500" : a.severity === "Medium" ? "bg-amber-500" : "bg-blue-500"}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{a.msg}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
                <Badge variant={a.severity === "High" ? "danger" : a.severity === "Medium" ? "warning" : "info"}>{a.severity}</Badge>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-4">Recent IP Logs</h3>
          <div className="space-y-2.5">
            {[
              { ip: "103.x.x.1", location: "Dhaka, BD", event: "Admin login", status: "success" },
              { ip: "41.x.x.9",  location: "Unknown",   event: "Failed login", status: "failed" },
              { ip: "103.x.x.1", location: "Dhaka, BD", event: "Export triggered", status: "success" },
              { ip: "202.x.x.4", location: "Chittagong, BD", event: "User login", status: "success" },
            ].map((l, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${l.status === "success" ? "bg-emerald-500" : "bg-red-500"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono font-medium">{l.ip}</p>
                  <p className="text-xs text-muted-foreground">{l.location} · {l.event}</p>
                </div>
                <Badge variant={l.status === "success" ? "success" : "danger"}>{l.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAudit = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Audit Logs</h1>
        <button onClick={() => showToast("Audit log exported")} className="flex items-center gap-2 border border-border px-3 py-2 rounded-xl text-sm hover:bg-muted"><Download size={14} /> Export</button>
      </div>
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Search logs..." className="w-full bg-input-background border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <input type="date" className="bg-input-background border border-border rounded-xl px-3 py-2 text-sm outline-none" />
      </div>
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr className="text-left text-xs text-muted-foreground">
              <th className="p-4 font-medium">Admin</th>
              <th className="p-4 font-medium">Action</th>
              <th className="p-4 font-medium">IP</th>
              <th className="p-4 font-medium">Device</th>
              <th className="p-4 font-medium">Time</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {auditRows.map((row, i) => (
              <tr key={i} className="hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">SA</div>
                    <span className="text-sm font-medium">{row.admin}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted-foreground max-w-56 truncate">{row.action}</td>
                <td className="p-4 text-xs font-mono">{row.ip}</td>
                <td className="p-4 text-xs text-muted-foreground">{row.device}</td>
                <td className="p-4 text-xs text-muted-foreground">{row.time}</td>
                <td className="p-4"><Badge variant={row.status === "success" ? "success" : "danger"}>{row.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">Platform Settings</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          {["General", "Branding", "SMTP / Email", "SMS Gateway", "AI Keys", "Payment Gateway", "Language & Currency", "Maintenance Mode", "API Keys", "Integrations"].map(s => (
            <button key={s} className="w-full text-left text-sm px-4 py-2.5 rounded-xl border border-border hover:bg-muted hover:border-primary/30 transition-all">{s}</button>
          ))}
        </div>
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5 space-y-5">
          <h3 className="font-semibold">General Settings</h3>
          {[
            { label: "Platform Name", value: "LifeSync" },
            { label: "Support Email", value: "support@lifesync.app" },
            { label: "Default Language", value: "English" },
            { label: "Default Currency", value: "BDT (৳)" },
            { label: "Default Timezone", value: "Asia/Dhaka" },
          ].map(f => (
            <div key={f.label}>
              <label className="text-xs text-muted-foreground block mb-1">{f.label}</label>
              <input defaultValue={f.value} className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          ))}
          <div className="flex items-center justify-between py-2 border-t border-border">
            <div>
              <p className="text-sm font-medium">Maintenance Mode</p>
              <p className="text-xs text-muted-foreground">Show maintenance page to all users</p>
            </div>
            <button className="w-10 h-5 bg-muted rounded-full relative">
              <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow" />
            </button>
          </div>
          <button onClick={() => showToast("Settings saved successfully")} className="bg-primary text-primary-foreground px-5 py-2 rounded-xl text-sm font-medium hover:opacity-90">Save Changes</button>
        </div>
      </div>
    </div>
  );

  const sectionMap: Record<AdminSection, React.ReactNode> = {
    overview: renderOverview(),
    users: renderUsers(),
    subscriptions: renderSubscriptions(),
    revenue: renderRevenue(),
    ai: renderAI(),
    support: renderSupport(),
    security: renderSecurity(),
    audit: renderAudit(),
    settings: renderSettings(),
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden font-['Inter']">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 animate-scale-in bg-secondary text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3">
          <CheckCircle size={15} className="text-emerald-400" />
          <span className="text-sm font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Create Notification Modal */}
      {notifModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setNotifModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-bold">Create Notification</h3>
              <button onClick={() => setNotifModal(false)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground"><X size={16} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div><label className="text-xs text-muted-foreground block mb-1">Title</label>
                <input placeholder="Notification title" className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" /></div>
              <div><label className="text-xs text-muted-foreground block mb-1">Message</label>
                <textarea rows={3} placeholder="Notification message..." className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs text-muted-foreground block mb-1">Audience</label>
                  <select className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none">
                    {["All Users","Pro Users","Free Users","Family Plan","Specific User"].map(a => <option key={a}>{a}</option>)}
                  </select></div>
                <div><label className="text-xs text-muted-foreground block mb-1">Type</label>
                  <select className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none">
                    {["Push","Email","In-App","SMS"].map(t => <option key={t}>{t}</option>)}
                  </select></div>
              </div>
              <div><label className="text-xs text-muted-foreground block mb-1">Schedule (optional)</label>
                <input type="datetime-local" className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none" /></div>
            </div>
            <div className="p-5 pt-0 flex gap-3">
              <button onClick={() => setNotifModal(false)} className="flex-1 border border-border py-2.5 rounded-xl text-sm font-medium hover:bg-muted">Cancel</button>
              <button onClick={() => { setNotifModal(false); showToast("Notification sent to all users!"); }}
                className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-medium hover:opacity-90">Send Now</button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Sidebar */}
      <aside className={`hidden lg:flex flex-col bg-sidebar flex-shrink-0 transition-all duration-300 ${sidebarOpen ? "w-56" : "w-16"}`}>
        <div className="p-4 flex items-center gap-3 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <Shield size={15} className="text-white" />
          </div>
          {sidebarOpen && <div><p className="font-bold text-sm text-white leading-none">LifeSync</p><p className="text-xs text-white/50">Admin Panel</p></div>}
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {adminNav.map((item, idx) => {
            const active = section === item.id;
            return (
              <button key={item.id} onClick={() => setSection(item.id as AdminSection)}
                style={{ animationDelay: `${idx * 0.03}s` }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all animate-slide-left ${active ? "bg-primary text-white" : "text-white/60 hover:text-white hover:bg-sidebar-accent"}`}>
                <item.icon size={16} className="flex-shrink-0" />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-sidebar-border space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">SA</div>
            {sidebarOpen && <div className="flex-1 overflow-hidden"><p className="text-white text-xs font-semibold truncate">Showket Ahamed</p><p className="text-white/50 text-xs">Super Admin</p></div>}
          </div>
          <button onClick={onLogout}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors ${sidebarOpen ? "" : "justify-center"}`}>
            <LogOut size={14} className="flex-shrink-0" />
            {sidebarOpen && "Log Out"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-card border-b border-border px-4 sm:px-6 h-14 flex items-center gap-4 flex-shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-foreground">
            <Menu size={20} />
          </button>
          <div className="flex-1 flex items-center">
            <div className="relative hidden sm:flex items-center max-w-xs w-full">
              <Search size={14} className="absolute left-3 text-muted-foreground" />
              <input placeholder="Global search..." className="w-full bg-muted rounded-xl pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setNotifModal(true)} className="flex items-center gap-1.5 text-xs border border-border px-3 py-1.5 rounded-lg hover:bg-muted transition-colors">
              <Plus size={13} /> Quick Create
            </button>
            <button onClick={() => setDark(!dark)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">SA</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-6">
          <div key={section} className="animate-fade-up">
            {sectionMap[section]}
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const navigate = (p: Page) => setPage(p);

  if (page === "landing") return <LandingPage onNavigate={navigate} dark={dark} setDark={setDark} />;
  if (page === "login") return <AuthPage mode="login" onNavigate={navigate} />;
  if (page === "register") return <AuthPage mode="register" onNavigate={navigate} />;
  if (page === "admin") return <AdminDashboard onLogout={() => { setDark(false); navigate("landing"); }} />;

  const pageComponents: Partial<Record<Page, React.ReactNode>> = {
    dashboard: <Dashboard onNavigate={navigate} />,
    tasks: <TasksPage />,
    finance: <FinancePage />,
    bills: <BillsPage />,
    documents: <DocumentsPage />,
    student: <StudentPage />,
    goals: <GoalsPage />,
    habits: <HabitsPage />,
    family: <FamilyPage />,
    health: <HealthPage />,
    emergency: <EmergencyPage />,
    ai: <AIPage />,
    notifications: <NotificationsPage />,
    settings: <SettingsPage dark={dark} setDark={setDark} />,
  };

  return (
    <AppShell page={page} onNavigate={navigate} dark={dark} setDark={setDark} onLogout={() => navigate("landing")}>
      {pageComponents[page] ?? <Dashboard onNavigate={navigate} />}
    </AppShell>
  );
}
