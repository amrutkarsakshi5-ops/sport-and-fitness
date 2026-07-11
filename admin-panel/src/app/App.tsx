import { useState, useRef, useEffect, Fragment } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
  LayoutDashboard, CalendarDays, Dumbbell, Users, CreditCard,
  Star, Bell, Search, ChevronDown, TrendingUp, TrendingDown,
  MoreVertical, ChevronLeft, ChevronRight, Plus, ArrowUpDown,
  Clock, X, BookOpen, Tag, Megaphone, BarChart2, MessageSquare,
  HelpCircle, Settings, LogOut, Edit2, Pause, Copy, Trash2,
  Wallet, RefreshCw, CheckCircle2, User, Calendar, Zap,
  AlertCircle, Info, ShieldCheck, ChevronUp,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Screen =
  | "dashboard" | "bookings" | "calendar" | "services"
  | "customers" | "payments" | "reviews"
  | "promotions" | "analytics" | "notifications" | "support" | "settings";

// ─── Brand constants ─────────────────────────────────────────────────────────
const PRIMARY = "#4F46E5";
const PRIMARY_LIGHT = "#EEF2FF";
const PRIMARY_MID = "rgba(79,70,229,0.12)";
const SIDEBAR_BG = "#13111C";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const revenueData: Record<string, { label: string; value: number }[]> = {
  daily: [
    { label: "Mon", value: 3200 }, { label: "Tue", value: 4800 },
    { label: "Wed", value: 3900 }, { label: "Thu", value: 5600 },
    { label: "Fri", value: 7100 }, { label: "Sat", value: 8400 },
    { label: "Sun", value: 6200 },
  ],
  weekly: [
    { label: "W1", value: 18400 }, { label: "W2", value: 22100 },
    { label: "W3", value: 19800 }, { label: "W4", value: 27300 },
  ],
  monthly: [
    { label: "Jan", value: 28400 }, { label: "Feb", value: 32100 },
    { label: "Mar", value: 29800 }, { label: "Apr", value: 38200 },
    { label: "May", value: 41500 }, { label: "Jun", value: 39700 },
  ],
};

const bookingStatusData = [
  { name: "Completed", value: 38, color: "#10B981" },
  { name: "Confirmed", value: 29, color: "#4F46E5" },
  { name: "Pending",   value: 21, color: "#F59E0B" },
  { name: "Cancelled", value: 12, color: "#EF4444" },
];

const upcomingSessions = [
  { id: "S-001", customer: "Sarah Mitchell",  service: "Personal Training",   time: "09:00 AM", trainer: "Coach Reed", status: "Confirmed", avatar: "SM", color: "bg-indigo-500" },
  { id: "S-002", customer: "Marcus Chen",     service: "Yoga Flow",           time: "10:30 AM", trainer: "Maya Lin",   status: "Pending",   avatar: "MC", color: "bg-emerald-500" },
  { id: "S-003", customer: "Priya Sharma",    service: "CrossFit HIIT",       time: "12:00 PM", trainer: "Jake Torres",status: "Confirmed", avatar: "PS", color: "bg-violet-500" },
  { id: "S-004", customer: "James O'Brien",   service: "Nutrition Coaching",  time: "02:00 PM", trainer: "Dr. Anika",  status: "Confirmed", avatar: "JO", color: "bg-amber-500" },
  { id: "S-005", customer: "Aisha Okonkwo",   service: "Recovery Session",    time: "04:30 PM", trainer: "Coach Reed", status: "Pending",   avatar: "AO", color: "bg-rose-500" },
];

const bookingRows = [
  { id: "#BK-7741", customer: "Sarah Mitchell", service: "Personal Training",  date: "23 Jun 2025", time: "09:00 AM", payStatus: "Paid",     bookStatus: "Confirmed", avatar: "SM", color: "bg-indigo-500" },
  { id: "#BK-7740", customer: "Marcus Chen",    service: "Yoga Flow",          date: "23 Jun 2025", time: "10:30 AM", payStatus: "Pending",  bookStatus: "Pending",   avatar: "MC", color: "bg-emerald-500" },
  { id: "#BK-7739", customer: "Priya Sharma",   service: "CrossFit HIIT",      date: "22 Jun 2025", time: "12:00 PM", payStatus: "Paid",     bookStatus: "Completed", avatar: "PS", color: "bg-violet-500" },
  { id: "#BK-7738", customer: "James O'Brien",  service: "Basketball Camp",    date: "22 Jun 2025", time: "02:00 PM", payStatus: "Paid",     bookStatus: "Completed", avatar: "JO", color: "bg-amber-500" },
  { id: "#BK-7737", customer: "Aisha Okonkwo",  service: "Recovery Session",   date: "21 Jun 2025", time: "04:30 PM", payStatus: "Refunded", bookStatus: "Cancelled", avatar: "AO", color: "bg-rose-500" },
  { id: "#BK-7736", customer: "Tyler Reeves",   service: "HIIT Bootcamp",      date: "21 Jun 2025", time: "06:00 PM", payStatus: "Paid",     bookStatus: "Confirmed", avatar: "TR", color: "bg-cyan-500" },
];

const serviceCards = [
  { name: "Personal Training",    category: "Fitness",   duration: "60 min", capacity: 1,  price: 120, img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=200&fit=crop&auto=format", desc: "One-on-one personalised sessions with certified coaches tailored to individual goals." },
  { name: "Yoga & Mindfulness",   category: "Wellness",  duration: "75 min", capacity: 12, price: 40,  img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=200&fit=crop&auto=format", desc: "Guided yoga flows blending breath-work, flexibility, and mindfulness techniques." },
  { name: "Basketball Coaching",  category: "Sports",    duration: "90 min", capacity: 8,  price: 65,  img: "https://images.unsplash.com/photo-1546519638778-3a27c05bfbae?w=400&h=200&fit=crop&auto=format", desc: "Skill-building drills and scrimmage coaching for youth and adult players." },
  { name: "CrossFit Training",    category: "HIIT",      duration: "45 min", capacity: 15, price: 35,  img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=200&fit=crop&auto=format", desc: "High-intensity functional movements designed to maximise performance and endurance." },
  { name: "Nutrition Coaching",   category: "Nutrition", duration: "50 min", capacity: 1,  price: 90,  img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=200&fit=crop&auto=format", desc: "Personalised nutrition plans and meal-prep coaching aligned with fitness goals." },
  { name: "Recovery & Mobility",  category: "Recovery",  duration: "60 min", capacity: 6,  price: 55,  img: "https://images.unsplash.com/photo-1592429648-edd5d0c53d1a?w=400&h=200&fit=crop&auto=format", desc: "Targeted stretching, foam-rolling, and mobility drills to accelerate recovery." },
];

const customerRows = [
  { name: "Sarah Mitchell",  email: "sarah.m@gmail.com",   tier: "Elite", sessions: 48, ltv: 5760, avatar: "SM", color: "bg-indigo-500",  segment: "VIP" },
  { name: "Marcus Chen",     email: "m.chen@outlook.com",  tier: "Basic", sessions: 12, ltv:  480, avatar: "MC", color: "bg-emerald-500", segment: "Active" },
  { name: "Priya Sharma",    email: "priya.s@work.io",     tier: "Pro",   sessions: 36, ltv: 3240, avatar: "PS", color: "bg-violet-500",  segment: "VIP" },
  { name: "James O'Brien",   email: "jobrien@email.com",   tier: "Basic", sessions:  4, ltv:  160, avatar: "JO", color: "bg-amber-500",   segment: "At Risk" },
  { name: "Aisha Okonkwo",   email: "aisha.ok@gmail.com",  tier: "Pro",   sessions: 22, ltv: 1980, avatar: "AO", color: "bg-rose-500",    segment: "Active" },
  { name: "Tyler Reeves",    email: "t.reeves@mail.com",   tier: "Basic", sessions:  8, ltv:  320, avatar: "TR", color: "bg-cyan-500",    segment: "New" },
  { name: "Camille Durand",  email: "c.durand@mail.fr",    tier: "Elite", sessions: 61, ltv: 7320, avatar: "CD", color: "bg-indigo-500",  segment: "VIP" },
  { name: "Noah Williams",   email: "nwilliams@gmail.com", tier: "Basic", sessions:  2, ltv:   80, avatar: "NW", color: "bg-teal-500",    segment: "New" },
];

const txns = [
  { id: "TXN-9912", customer: "Sarah Mitchell", type: "Session Fee",       date: "23 Jun 2025", amount: 120, fee: 3.60, net: 116.40, status: "Settled" },
  { id: "TXN-9911", customer: "Priya Sharma",   type: "Pro Subscription",  date: "23 Jun 2025", amount:  89, fee: 2.67, net:  86.33, status: "Settled" },
  { id: "TXN-9910", customer: "Marcus Chen",    type: "Session Fee",       date: "22 Jun 2025", amount:  40, fee: 1.20, net:  38.80, status: "Pending" },
  { id: "TXN-9909", customer: "Camille Durand", type: "Elite Subscription",date: "22 Jun 2025", amount: 149, fee: 4.47, net: 144.53, status: "Settled" },
  { id: "TXN-9908", customer: "Aisha Okonkwo",  type: "Session Fee",       date: "21 Jun 2025", amount:  55, fee: 1.65, net:  53.35, status: "Refunded" },
];

const notifications = [
  { id: 1, type: "booking",  title: "New booking from Sarah Mitchell",        body: "Personal Training · 09:00 AM tomorrow",     time: "2 min ago",  read: false, icon: BookOpen,        iconBg: "bg-indigo-100",  iconColor: "text-indigo-600" },
  { id: 2, type: "payment",  title: "Payment received — $149.00",             body: "Camille Durand · Elite Subscription",        time: "18 min ago", read: false, icon: Wallet,          iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
  { id: 3, type: "review",   title: "New 5-star review",                      body: "Marcus Chen rated Yoga Flow · \"Best class!\"", time: "1 hr ago",  read: true,  icon: Star,            iconBg: "bg-amber-100",   iconColor: "text-amber-600" },
  { id: 4, type: "alert",    title: "Booking cancellation — Tyler Reeves",    body: "HIIT Bootcamp · 06:00 PM cancelled",         time: "3 hrs ago",  read: true,  icon: AlertCircle,     iconBg: "bg-rose-100",    iconColor: "text-rose-600" },
  { id: 5, type: "system",   title: "Platform maintenance scheduled",         body: "Jun 30, 02:00–04:00 AM CT — minimal impact", time: "Yesterday",  read: true,  icon: Info,            iconBg: "bg-slate-100",   iconColor: "text-slate-500" },
];

const reviews = [
  { customer: "Sarah Mitchell", service: "Personal Training", rating: 5, date: "22 Jun 2025", comment: "Coach Reed is incredible! My strength has improved dramatically over the past 3 months.", avatar: "SM", color: "bg-indigo-500" },
  { customer: "Priya Sharma",   service: "CrossFit HIIT",     rating: 4, date: "21 Jun 2025", comment: "Great energy and well-structured sessions. Would love slightly longer warm-ups.",         avatar: "PS", color: "bg-violet-500" },
  { customer: "Marcus Chen",    service: "Yoga Flow",         rating: 5, date: "20 Jun 2025", comment: "Maya is a wonderful instructor. The sessions are calming and the studio is spotless.",     avatar: "MC", color: "bg-emerald-500" },
  { customer: "Tyler Reeves",   service: "HIIT Bootcamp",     rating: 3, date: "19 Jun 2025", comment: "Good workout but the class felt a bit rushed. Would try again with more time allocated.",  avatar: "TR", color: "bg-cyan-500" },
];

// Calendar data
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];
const calEvents: Record<string, { label: string; type: "booked"|"blocked"|"available"|"holiday" }[]> = {
  "Mon-09:00": [{ label: "Sarah M. — PT",       type: "booked" }],
  "Mon-10:00": [{ label: "Yoga Flow (12)",       type: "booked" }],
  "Mon-14:00": [{ label: "Priya S. — CrossFit",  type: "booked" }],
  "Tue-09:00": [{ label: "Coach Reed Break",     type: "blocked" }],
  "Tue-11:00": [{ label: "Basketball Camp",      type: "booked" }],
  "Wed-08:00": [{ label: "Open Session",         type: "available" }],
  "Wed-10:00": [{ label: "HIIT Bootcamp (15)",   type: "booked" }],
  "Thu-09:00": [{ label: "Aisha O. — Recovery",  type: "booked" }],
  "Fri-10:00": [{ label: "Yoga Flow (8)",         type: "booked" }],
  "Fri-14:00": [{ label: "Camille D. — Elite PT", type: "booked" }],
  "Sat-09:00": [{ label: "Weekend Bootcamp",     type: "booked" }],
  "Sat-11:00": [{ label: "Holiday – Juneteenth", type: "holiday" }],
  "Sun-14:00": [{ label: "Staff Off",            type: "blocked" }],
};

// ─── Utility ─────────────────────────────────────────────────────────────────
const fmt$ = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function useOutsideClick(ref: React.RefObject<HTMLElement | null>, cb: () => void) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, cb]);
}

// ─── Shared UI pieces ────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Confirmed: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    Pending:   "bg-amber-50  text-amber-700  border border-amber-200",
    Completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Cancelled: "bg-red-50   text-red-600    border border-red-200",
    Paid:      "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Refunded:  "bg-rose-50  text-rose-600   border border-rose-200",
    Settled:   "bg-emerald-50 text-emerald-700 border border-emerald-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${map[status] ?? "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <svg key={i} viewBox="0 0 16 16" className={`w-3.5 h-3.5 ${i<=n ? "fill-amber-400" : "fill-slate-200"}`}>
          <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1L2 5.3l4.2-.7z"/>
        </svg>
      ))}
    </div>
  );
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-lg px-3 py-2 shadow-lg text-xs">
      <p className="text-muted-foreground mb-0.5">{label}</p>
      <p className="font-bold text-foreground">${payload[0].value.toLocaleString()}</p>
    </div>
  );
}

function ModalOverlay({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function Drawer({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/30" onClick={onClose} />
      <div className="w-80 bg-white h-full shadow-2xl flex flex-col overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="text-sm font-bold text-foreground" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{title}</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center transition-colors cursor-pointer">
            <X size={14} />
          </button>
        </div>
        <div className="p-5 flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>{children}</div>
      </div>
    </div>
  );
}

// ─── Notification Panel ───────────────────────────────────────────────────────
function NotificationPanel({ onClose }: { onClose: () => void }) {
  const [items, setItems] = useState(notifications);
  const unread = items.filter((n) => !n.read).length;

  return (
    <Drawer title={`Notifications ${unread > 0 ? `(${unread})` : ""}`} onClose={onClose}>
      <div className="space-y-1">
        {unread > 0 && (
          <button
            onClick={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))}
            className="text-xs font-semibold mb-3 block cursor-pointer"
            style={{ color: PRIMARY }}
          >
            Mark all as read
          </button>
        )}
        {items.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              onClick={() => setItems((prev) => prev.map((x) => x.id === n.id ? { ...x, read: true } : x))}
              className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors ${n.read ? "hover:bg-slate-50" : "bg-indigo-50/60 hover:bg-indigo-50"}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.iconBg}`}>
                <Icon size={14} className={n.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold text-foreground ${!n.read ? "font-bold" : ""}`}>{n.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.body}</p>
                <p className="text-xs text-muted-foreground mt-1" style={{ color: "#94A3B8" }}>{n.time}</p>
              </div>
              {!n.read && <div className="w-2 h-2 rounded-full shrink-0 mt-1" style={{ background: PRIMARY }} />}
            </div>
          );
        })}
      </div>
    </Drawer>
  );
}

// ─── Quick Add Modal ──────────────────────────────────────────────────────────
function QuickAddModal({ onClose, onNavigate }: { onClose: () => void; onNavigate: (s: Screen) => void }) {
  const options = [
    { label: "New Booking",   icon: BookOpen,  screen: "bookings" as Screen,  desc: "Schedule a session for a customer" },
    { label: "New Customer",  icon: User,      screen: "customers" as Screen, desc: "Add someone to your CRM" },
    { label: "New Service",   icon: Dumbbell,  screen: "services" as Screen,  desc: "Create a new fitness offering" },
    { label: "New Event",     icon: Calendar,  screen: "calendar" as Screen,  desc: "Block time on your calendar" },
    { label: "New Promotion", icon: Megaphone, screen: "promotions" as Screen,desc: "Launch a discount or campaign" },
  ];
  return (
    <ModalOverlay onClose={onClose}>
      <div className="bg-white rounded-2xl border border-border shadow-2xl w-80 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-foreground" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Quick Add</h3>
            <p className="text-xs text-muted-foreground">What would you like to create?</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center transition-colors cursor-pointer"><X size={13} /></button>
        </div>
        <div className="space-y-1.5">
          {options.map(({ label, icon: Icon, screen, desc }) => (
            <button
              key={label}
              onClick={() => { onNavigate(screen); onClose(); }}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors group-hover:opacity-90" style={{ background: PRIMARY_LIGHT }}>
                <Icon size={16} style={{ color: PRIMARY }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </ModalOverlay>
  );
}

// ─── Profile Dropdown ─────────────────────────────────────────────────────────
function ProfileDropdown({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onClose);
  const items = [
    { icon: User,     label: "My Profile" },
    { icon: Settings, label: "Account Settings" },
    { icon: Zap,      label: "Upgrade Plan" },
    { icon: HelpCircle, label: "Help & Support" },
  ];
  return (
    <div ref={ref} className="absolute right-0 top-full mt-2 w-52 bg-white border border-border rounded-xl shadow-xl z-50 overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <p className="text-sm font-semibold text-foreground">Vendor Admin</p>
        <p className="text-xs text-muted-foreground">vendor@activeenterprise.io</p>
        <p className="text-xs mt-1 font-medium" style={{ color: PRIMARY }}>Austin, TX · Pro Plan</p>
      </div>
      <div className="py-1">
        {items.map(({ icon: Icon, label }) => (
          <button key={label} onClick={onClose} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-foreground hover:bg-slate-50 transition-colors cursor-pointer text-left">
            <Icon size={13} className="text-muted-foreground" />
            {label}
          </button>
        ))}
      </div>
      <div className="border-t border-border py-1">
        <button onClick={onClose} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left">
          <LogOut size={13} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ─── Add Customer Modal ───────────────────────────────────────────────────────
function AddCustomerModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", tier: "Basic", segment: "New" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <ModalOverlay onClose={onClose}>
      <div className="bg-white rounded-2xl border border-border shadow-2xl w-96 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Add New Customer</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Create a new CRM profile</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center cursor-pointer"><X size={13} /></button>
        </div>
        <div className="space-y-3">
          {(["name", "email", "phone"] as const).map((field) => (
            <div key={field}>
              <label className="text-xs font-semibold text-foreground capitalize block mb-1">{field === "phone" ? "Phone Number" : field === "email" ? "Email Address" : "Full Name"}</label>
              <input
                type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                value={form[field]}
                onChange={set(field)}
                placeholder={field === "name" ? "e.g. Sarah Mitchell" : field === "email" ? "e.g. sarah@email.com" : "e.g. +1 512 000 0000"}
                className="w-full px-3 py-2 text-sm bg-muted rounded-lg border border-border outline-none focus:border-indigo-400 transition-colors placeholder:text-muted-foreground"
              />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Tier</label>
              <select value={form.tier} onChange={set("tier")} className="w-full px-3 py-2 text-sm bg-muted rounded-lg border border-border outline-none cursor-pointer">
                <option>Basic</option><option>Pro</option><option>Elite</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Segment</label>
              <select value={form.segment} onChange={set("segment")} className="w-full px-3 py-2 text-sm bg-muted rounded-lg border border-border outline-none cursor-pointer">
                <option>New</option><option>Active</option><option>VIP</option><option>At Risk</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors cursor-pointer hover:opacity-90" style={{ background: PRIMARY }}>Create Customer</button>
        </div>
      </div>
    </ModalOverlay>
  );
}

// ─── Add Event Modal ──────────────────────────────────────────────────────────
function AddEventModal({ onClose, prefill }: { onClose: () => void; prefill?: string }) {
  const [form, setForm] = useState({ title: "", day: prefill ?? "Mon", time: "09:00", type: "booked", trainer: "", notes: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const typeColors: Record<string, string> = { booked: PRIMARY, available: "#10B981", blocked: "#64748B", holiday: "#F59E0B" };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="bg-white rounded-2xl border border-border shadow-2xl w-96 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Add Calendar Event</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Block time or schedule a session</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center cursor-pointer"><X size={13} /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-foreground block mb-1">Event Title</label>
            <input value={form.title} onChange={set("title")} placeholder="e.g. HIIT Bootcamp" className="w-full px-3 py-2 text-sm bg-muted rounded-lg border border-border outline-none focus:border-indigo-400 transition-colors placeholder:text-muted-foreground" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Day</label>
              <select value={form.day} onChange={set("day")} className="w-full px-3 py-2 text-sm bg-muted rounded-lg border border-border outline-none cursor-pointer">
                {weekDays.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Time</label>
              <select value={form.time} onChange={set("time")} className="w-full px-3 py-2 text-sm bg-muted rounded-lg border border-border outline-none cursor-pointer">
                {timeSlots.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground block mb-1">Event Type</label>
            <div className="grid grid-cols-2 gap-2">
              {(["booked", "available", "blocked", "holiday"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setForm((f) => ({ ...f, type: t }))}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium capitalize transition-all cursor-pointer"
                  style={{
                    background: form.type === t ? `${typeColors[t]}15` : "#F8FAFC",
                    borderColor: form.type === t ? typeColors[t] : "#E2E8F0",
                    color: form.type === t ? typeColors[t] : "#64748B",
                  }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: typeColors[t] }} />
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground block mb-1">Trainer (optional)</label>
            <input value={form.trainer} onChange={set("trainer")} placeholder="e.g. Coach Reed" className="w-full px-3 py-2 text-sm bg-muted rounded-lg border border-border outline-none focus:border-indigo-400 transition-colors placeholder:text-muted-foreground" />
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-colors cursor-pointer" style={{ background: PRIMARY }}>Save Event</button>
        </div>
      </div>
    </ModalOverlay>
  );
}

// ─── Service Detail Drawer ────────────────────────────────────────────────────
function ServiceDetailDrawer({ service, onClose }: { service: typeof serviceCards[0]; onClose: () => void }) {
  return (
    <Drawer title="Service Details" onClose={onClose}>
      <div className="space-y-4">
        <div className="rounded-xl overflow-hidden h-40 bg-slate-100">
          <img src={service.img} alt={service.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ background: PRIMARY_LIGHT, color: PRIMARY }}>{service.category}</span>
          <h4 className="text-base font-bold text-foreground mt-2" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{service.name}</h4>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{service.desc}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Duration",  value: service.duration },
            { label: "Capacity",  value: `${service.capacity} ${service.capacity === 1 ? "person" : "people"}` },
            { label: "Price",     value: `$${service.price} / session` },
            { label: "Category",  value: service.category },
          ].map(({ label, value }) => (
            <div key={label} className="bg-slate-50 rounded-xl p-3">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-sm font-semibold text-foreground mt-0.5">{value}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2 pt-2">
          <button className="w-full py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer hover:opacity-90 transition-colors" style={{ background: PRIMARY }}>Edit Service</button>
          <button className="w-full py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer">Pause Service</button>
          <button className="w-full py-2.5 rounded-xl text-sm font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer">Delete Service</button>
        </div>
      </div>
    </Drawer>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const NAV_PRIMARY = [
  { key: "dashboard",     label: "Dashboard",    icon: LayoutDashboard },
  { key: "bookings",      label: "Bookings",     icon: BookOpen },
  { key: "calendar",      label: "Calendar",     icon: CalendarDays },
  { key: "services",      label: "Services",     icon: Dumbbell },
  { key: "customers",     label: "Customers",    icon: Users },
  { key: "payments",      label: "Payments",     icon: CreditCard },
  { key: "reviews",       label: "Reviews",      icon: Star },
];
const NAV_SYSTEM = [
  { key: "promotions",    label: "Promotions",   icon: Megaphone },
  { key: "analytics",     label: "Analytics",    icon: BarChart2 },
  { key: "notifications", label: "Notifications",icon: Bell },
  { key: "support",       label: "Support",      icon: HelpCircle },
  { key: "settings",      label: "Settings",     icon: Settings },
];

function Sidebar({ active, onNav }: { active: Screen; onNav: (s: Screen) => void }) {
  const [systemOpen, setSystemOpen] = useState(true);

  const NavItem = ({ k, label, icon: Icon }: { k: string; label: string; icon: React.ElementType }) => {
    const isActive = active === k;
    return (
      <button
        onClick={() => onNav(k as Screen)}
        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-100 text-left cursor-pointer"
        style={{
          background: isActive ? "rgba(79,70,229,0.14)" : "transparent",
          color: isActive ? "#818CF8" : "#94A3B8",
          borderLeft: isActive ? `2px solid ${PRIMARY}` : "2px solid transparent",
        }}
      >
        <Icon size={14} />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <aside className="w-56 shrink-0 flex flex-col h-screen overflow-y-auto" style={{ background: SIDEBAR_BG, scrollbarWidth: "none" }}>
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${PRIMARY}, #818CF8)` }}>
            <Dumbbell size={14} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Active Enterprise</p>
            <p className="text-xs" style={{ color: "#475569" }}>Vendor Portal · Austin TX</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-3 space-y-0.5">
        <p className="text-xs font-semibold uppercase tracking-widest px-2 py-2" style={{ color: "#334155" }}>Management</p>
        {NAV_PRIMARY.map(({ key, label, icon }) => (
          <NavItem key={key} k={key} label={label} icon={icon} />
        ))}

        {/* Collapsible System section */}
        <button
          onClick={() => setSystemOpen((o) => !o)}
          className="w-full flex items-center justify-between px-2 py-2 pt-4 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#334155" }}>System</p>
          {systemOpen ? <ChevronUp size={11} style={{ color: "#334155" }} /> : <ChevronDown size={11} style={{ color: "#334155" }} />}
        </button>
        {systemOpen && NAV_SYSTEM.map(({ key, label, icon }) => (
          <NavItem key={key} k={key} label={label} icon={icon} />
        ))}
      </nav>

      <div className="px-3 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: PRIMARY }}>VN</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">Vendor Admin</p>
            <p className="text-xs truncate" style={{ color: "#475569" }}>Austin, TX</p>
          </div>
          <LogOut size={13} style={{ color: "#475569" }} className="shrink-0 cursor-pointer hover:text-white transition-colors" />
        </div>
      </div>
    </aside>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({
  onNotification,
  onQuickAdd,
}: {
  onNotification: () => void;
  onQuickAdd: () => void;
}) {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  useOutsideClick(profileRef, () => setShowProfile(false));

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-14 flex items-center justify-between px-6 bg-white border-b border-border shrink-0">
      <div className="relative">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search customers, sessions, services…"
          className="pl-8 pr-4 py-1.5 text-xs bg-muted rounded-lg border border-border outline-none w-64 placeholder:text-muted-foreground focus:border-indigo-400 transition-colors"
        />
      </div>
      <div className="flex items-center gap-2">
        {/* Messages */}
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors cursor-pointer">
          <MessageSquare size={15} className="text-muted-foreground" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </button>

        {/* Notification bell */}
        <button
          onClick={onNotification}
          className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors cursor-pointer"
        >
          <Bell size={15} className="text-muted-foreground" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center" style={{ background: PRIMARY }}>
              {unread}
            </span>
          )}
        </button>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile((o) => !o)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-muted transition-colors border border-border cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: PRIMARY }}>V</div>
            <span className="text-xs font-medium text-foreground hidden sm:block">Vendor</span>
            {showProfile ? <ChevronUp size={12} className="text-muted-foreground" /> : <ChevronDown size={12} className="text-muted-foreground" />}
          </button>
          {showProfile && <ProfileDropdown onClose={() => setShowProfile(false)} />}
        </div>

        {/* Quick Add */}
        <button
          onClick={onQuickAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 cursor-pointer"
          style={{ background: PRIMARY }}
        >
          <Plus size={13} />
          Quick Add
        </button>
      </div>
    </header>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KPICard({ label, value, change, positive, sub }: { label: string; value: string; change: string; positive: boolean; sub?: string }) {
  return (
    <div className="bg-white rounded-xl border border-border p-5 flex flex-col gap-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{value}</p>
      <div className="flex items-center gap-1.5">
        {positive
          ? <TrendingUp size={12} className="text-emerald-500" />
          : <TrendingDown size={12} className="text-red-500" />}
        <span className={`text-xs font-semibold ${positive ? "text-emerald-600" : "text-red-500"}`}>{change}</span>
        {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
      </div>
    </div>
  );
}

// ─── Dashboard Screen ─────────────────────────────────────────────────────────
function DashboardScreen() {
  const [period, setPeriod] = useState<"daily"|"weekly"|"monthly">("daily");
  const data = revenueData[period];

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-5" style={{ scrollbarWidth: "none" }}>
      {/* 4 KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard label="Total Bookings"   value="1,284"   change="+12.3%" positive={true}  sub="vs last month" />
        <KPICard label="Monthly Revenue"  value="$41,500" change="+8.7%"  positive={true}  sub="vs last month" />
        <KPICard label="Active Customers" value="248"     change="+6.2%"  positive={true}  sub="vs last month" />
        <KPICard label="Average Rating"   value="4.8 ★"  change="+0.2"   positive={true}  sub="this month" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Revenue Analytics</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Gross revenue breakdown</p>
            </div>
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              {(["daily","weekly","monthly"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className="px-2.5 py-1 rounded-md text-xs font-medium transition-all capitalize cursor-pointer"
                  style={{ background: period===p ? PRIMARY : "transparent", color: period===p ? "#fff" : "#64748B" }}
                >{p}</button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data} margin={{ top:5, right:5, left:-15, bottom:0 }}>
              <CartesianGrid key="grid" strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
              <XAxis key="xaxis" dataKey="label" tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis key="yaxis" tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip key="tooltip" content={<ChartTooltip />} />
              <Area key="area" type="monotone" dataKey="value" stroke={PRIMARY} strokeWidth={2} fill={PRIMARY_MID} dot={false} activeDot={{ r:4, fill:PRIMARY, stroke:"#fff", strokeWidth:2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Donut */}
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Booking Status</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Distribution this month</p>
          </div>
          <div className="flex justify-center">
            <PieChart width={160} height={160}>
              <Pie key="pie" data={bookingStatusData} cx={80} cy={80} innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {bookingStatusData.map((entry, i) => <Cell key={`c-${i}`} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </div>
          <div className="space-y-2 mt-2">
            {bookingStatusData.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-muted-foreground">{s.name}</span>
                </div>
                <span className="font-semibold tabular-nums">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-xl border border-border">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Upcoming Sessions — Today</h3>
          <button className="text-xs font-medium cursor-pointer hover:underline" style={{ color: PRIMARY }}>View all →</button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-slate-50">
              {["Customer","Service","Time","Trainer","Status"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {upcomingSessions.map((s) => (
              <tr key={s.id} className="border-b border-border last:border-0 hover:bg-slate-50 transition-colors cursor-pointer">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full ${s.color} flex items-center justify-center text-white text-xs font-bold`}>{s.avatar}</div>
                    <span className="text-sm font-medium text-foreground">{s.customer}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-muted-foreground">{s.service}</td>
                <td className="px-5 py-3 text-xs font-mono tabular-nums text-foreground">{s.time}</td>
                <td className="px-5 py-3 text-sm text-muted-foreground">{s.trainer}</td>
                <td className="px-5 py-3"><StatusBadge status={s.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Bookings Screen ──────────────────────────────────────────────────────────
function BookingsScreen() {
  const [drawer, setDrawer] = useState<typeof bookingRows[0] | null>(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const filtered = bookingRows.filter((b) => statusFilter === "All" || b.bookStatus === statusFilter);

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ scrollbarWidth: "none" }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Bookings Management</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage all customer session bookings</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white cursor-pointer hover:opacity-90 transition-colors" style={{ background: PRIMARY }}>
          <Plus size={13} /> New Booking
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-border p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-40">
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Search customer…" className="w-full pl-7 pr-3 py-2 text-xs bg-muted rounded-lg border border-border outline-none" />
        </div>
        {["Date Range","Service Type"].map((lbl) => (
          <select key={lbl} className="text-xs border border-border rounded-lg px-3 py-2 bg-muted outline-none cursor-pointer">
            <option>{lbl}</option>
          </select>
        ))}
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="text-xs border border-border rounded-lg px-3 py-2 bg-muted outline-none cursor-pointer">
          {["All","Confirmed","Pending","Completed","Cancelled"].map((s) => <option key={s} value={s}>{s === "All" ? "All Statuses" : s}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-slate-50">
              {["Booking ID","Customer","Service","Date","Time","Payment","Status","Actions"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="border-b border-border last:border-0 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setDrawer(b)}>
                <td className="px-4 py-3 text-xs font-mono font-medium" style={{ color: PRIMARY }}>{b.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full ${b.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{b.avatar}</div>
                    <span className="text-sm font-medium text-foreground">{b.customer}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{b.service}</td>
                <td className="px-4 py-3 text-xs tabular-nums text-muted-foreground">{b.date}</td>
                <td className="px-4 py-3 text-xs font-mono tabular-nums text-foreground">{b.time}</td>
                <td className="px-4 py-3"><StatusBadge status={b.payStatus} /></td>
                <td className="px-4 py-3"><StatusBadge status={b.bookStatus} /></td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-1">
                    <button className="px-2 py-1 rounded text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer">Accept</button>
                    <button className="px-2 py-1 rounded text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer">Reject</button>
                    <button className="px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer">Reschedule</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {drawer && (
        <Drawer title="Booking Detail" onClose={() => setDrawer(null)}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full ${drawer.color} flex items-center justify-center text-white font-bold`}>{drawer.avatar}</div>
              <div>
                <p className="font-semibold text-foreground">{drawer.customer}</p>
                <p className="text-xs text-muted-foreground">{drawer.service}</p>
              </div>
            </div>
            {[["Booking ID", drawer.id],["Date", drawer.date],["Time", drawer.time],["Payment", drawer.payStatus],["Status", drawer.bookStatus]].map(([k,v]) => (
              <div key={k} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                <span className="text-xs text-muted-foreground">{k}</span>
                <span className="text-xs font-semibold text-foreground">{v}</span>
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <button className="flex-1 py-2 rounded-lg text-xs font-semibold text-white cursor-pointer hover:opacity-90 transition-colors" style={{ background: PRIMARY }}>Confirm</button>
              <button className="flex-1 py-2 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer">Reschedule</button>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
}

// ─── Calendar Screen ──────────────────────────────────────────────────────────
function CalendarScreen() {
  const [view, setView] = useState<"day"|"week"|"month">("week");
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [prefillSlot, setPrefillSlot] = useState<string | undefined>();

  const eventStyle: Record<string, string> = {
    booked:    "bg-indigo-50  border-l-2 border-indigo-500 text-indigo-700",
    available: "bg-emerald-50 border-l-2 border-emerald-500 text-emerald-700",
    blocked:   "bg-slate-100  border-l-2 border-slate-400   text-slate-500",
    holiday:   "bg-amber-50   border-l-2 border-amber-400   text-amber-700",
  };

  const handleCellClick = (day: string, time: string) => {
    setPrefillSlot(day);
    setShowAddEvent(true);
  };

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ scrollbarWidth: "none" }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Calendar</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Week of June 23 – June 29, 2025</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white border border-border rounded-lg p-1">
            {(["day","week","month"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)} className="px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all cursor-pointer"
                style={{ background: view===v ? PRIMARY : "transparent", color: view===v ? "#fff" : "#64748B" }}>{v}</button>
            ))}
          </div>
          <button
            onClick={() => { setPrefillSlot(undefined); setShowAddEvent(true); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white cursor-pointer hover:opacity-90 transition-colors"
            style={{ background: PRIMARY }}
          >
            <Plus size={12} /> Add Event
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white rounded-xl border border-border px-4 py-3 flex-wrap">
        {[{ type:"booked", label:"Booked", color:"#4F46E5" },{ type:"available", label:"Available", color:"#10B981" },{ type:"blocked", label:"Blocked", color:"#94A3B8" },{ type:"holiday", label:"Holiday", color:"#F59E0B" }].map(({ type, label, color }) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border overflow-auto">
        <div className="grid" style={{ gridTemplateColumns: "64px repeat(7, 1fr)", minWidth: "700px" }}>
          <div className="border-b border-border bg-slate-50" />
          {weekDays.map((d) => (
            <div key={d} className="border-b border-border bg-slate-50 px-2 py-3 text-center text-xs font-semibold text-foreground">{d}</div>
          ))}
          {timeSlots.map((time) => (
            <Fragment key={time}>
              <div className="border-b border-r border-border px-2 py-2 text-xs tabular-nums text-muted-foreground bg-slate-50 flex items-start justify-end">{time}</div>
              {weekDays.map((day) => {
                const key = `${day}-${time}`;
                const events = calEvents[key] ?? [];
                return (
                  <div
                    key={key}
                    className="border-b border-r border-border px-1 py-1 min-h-[52px] cursor-pointer hover:bg-indigo-50/30 transition-colors"
                    onClick={() => handleCellClick(day, time)}
                  >
                    {events.map((ev, i) => (
                      <div key={i} className={`rounded px-1.5 py-1 text-xs font-medium ${eventStyle[ev.type]} truncate cursor-pointer`} onClick={(e) => e.stopPropagation()}>
                        {ev.label}
                      </div>
                    ))}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>

      {showAddEvent && <AddEventModal onClose={() => setShowAddEvent(false)} prefill={prefillSlot} />}
    </div>
  );
}

// ─── Services Screen ──────────────────────────────────────────────────────────
function ServicesScreen() {
  const [menu, setMenu] = useState<string | null>(null);
  const [selected, setSelected] = useState<typeof serviceCards[0] | null>(null);

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ scrollbarWidth: "none" }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Services</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{serviceCards.length} active fitness services</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white cursor-pointer hover:opacity-90 transition-colors" style={{ background: PRIMARY }}>
          <Plus size={13} /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {serviceCards.map((s) => (
          <div
            key={s.name}
            className="bg-white rounded-xl border border-border overflow-hidden group cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelected(s)}
          >
            <div className="relative h-36 bg-slate-100">
              <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-white/90 text-slate-700">{s.category}</span>
              <div className="absolute top-2 right-2 relative" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setMenu(menu === s.name ? null : s.name)}
                  className="w-7 h-7 rounded-lg bg-white/90 flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                >
                  <MoreVertical size={13} className="text-slate-600" />
                </button>
                {menu === s.name && (
                  <div className="absolute right-0 top-8 bg-white rounded-lg border border-border shadow-lg py-1 w-36 z-10">
                    {([["Edit", Edit2, "text-slate-700"],["Pause", Pause, "text-amber-600"],["Duplicate", Copy, "text-slate-700"],["Delete", Trash2, "text-red-500"]] as [string, React.ElementType, string][]).map(([lbl, Icon, cls]) => (
                      <button key={lbl} onClick={() => setMenu(null)} className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium hover:bg-slate-50 transition-colors cursor-pointer ${cls}`}>
                        <Icon size={12} />{lbl}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-foreground" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{s.name}</h3>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock size={11} /> {s.duration}</span>
                <span className="flex items-center gap-1"><Users size={11} /> Cap. {s.capacity}</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-bold text-foreground" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                  ${s.price}<span className="text-xs font-normal text-muted-foreground">/session</span>
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelected(s); }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white cursor-pointer hover:opacity-90 transition-colors"
                  style={{ background: PRIMARY }}
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && <ServiceDetailDrawer service={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

// ─── Customers Screen ─────────────────────────────────────────────────────────
function CustomersScreen() {
  const [segment, setSegment] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const segments = ["All","New","Active","VIP","At Risk"];
  const filtered = customerRows.filter((c) => segment === "All" || c.segment === segment);

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ scrollbarWidth: "none" }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Customer Directory</h2>
          <p className="text-xs text-muted-foreground mt-0.5">CRM Hub — {customerRows.length} total customers</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white cursor-pointer hover:opacity-90 transition-colors"
          style={{ background: PRIMARY }}
        >
          <Plus size={13} /> Add Customer
        </button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {segments.map((s) => (
          <button
            key={s}
            onClick={() => setSegment(s)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer"
            style={{
              background: segment===s ? PRIMARY : "#fff",
              color: segment===s ? "#fff" : "#64748B",
              borderColor: segment===s ? PRIMARY : "#E2E8F0",
            }}
          >{s}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-slate-50">
              {["Customer","Tier","Sessions","Lifetime Value","Segment","Actions"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wide whitespace-nowrap">
                  <div className="flex items-center gap-1">{h}<ArrowUpDown size={10} className="opacity-40" /></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.name} className="border-b border-border last:border-0 hover:bg-slate-50 transition-colors cursor-pointer group">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${c.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{c.avatar}</div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${c.tier==="Elite" ? "bg-indigo-50 text-indigo-700" : c.tier==="Pro" ? "bg-violet-50 text-violet-700" : "bg-slate-100 text-slate-600"}`}>
                    {c.tier}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-sm tabular-nums font-medium text-foreground">{c.sessions}</td>
                <td className="px-5 py-3.5 text-sm tabular-nums font-bold text-foreground">{fmt$(c.ltv)}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${c.segment==="VIP" ? "bg-amber-50 text-amber-700" : c.segment==="At Risk" ? "bg-red-50 text-red-600" : c.segment==="New" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                    {c.segment}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <button className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                    <MoreVertical size={13} className="text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-slate-50">
          <p className="text-xs text-muted-foreground">Showing <span className="font-semibold text-foreground">1–{filtered.length}</span> of <span className="font-semibold text-foreground">248</span> customers</p>
          <div className="flex items-center gap-1">
            <button disabled className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors cursor-pointer"><ChevronLeft size={13} className="text-muted-foreground" /></button>
            {[1,2,3].map((p) => (
              <button key={p} className="w-7 h-7 flex items-center justify-center rounded text-xs font-medium transition-colors cursor-pointer" style={{ background: p===1 ? PRIMARY : "transparent", color: p===1 ? "#fff" : "#64748B" }}>{p}</button>
            ))}
            <span className="text-xs text-muted-foreground px-1">…</span>
            <button className="w-7 h-7 flex items-center justify-center rounded text-xs font-medium hover:bg-muted transition-colors text-muted-foreground cursor-pointer">25</button>
            <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors cursor-pointer"><ChevronRight size={13} className="text-muted-foreground" /></button>
          </div>
        </div>
      </div>

      {showAdd && <AddCustomerModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}

// ─── Payments Screen ──────────────────────────────────────────────────────────
function PaymentsScreen() {
  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ scrollbarWidth: "none" }}>
      <div>
        <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Payments & Wallet</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Financial overview and transaction history</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Wallet Balance",      value: "$12,840.55", icon: Wallet,      color: PRIMARY,    bg: PRIMARY_LIGHT },
          { label: "Pending Payouts",     value: "$3,280.00",  icon: RefreshCw,   color: "#F59E0B",  bg: "#FFFBEB" },
          { label: "Gross Earnings (Jun)",value: "$41,500.00", icon: TrendingUp,  color: "#10B981",  bg: "#ECFDF5" },
          { label: "Platform Fees (Jun)", value: "$1,245.00",  icon: CreditCard,  color: "#6366F1",  bg: "#EEF2FF" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-border p-4 cursor-pointer hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide leading-tight">{label}</p>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: bg }}>
                <Icon size={15} style={{ color }} />
              </div>
            </div>
            <p className="text-xl font-bold tabular-nums text-foreground" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Transaction Ledger</h3>
          <button className="text-xs font-semibold cursor-pointer hover:underline" style={{ color: PRIMARY }}>Export CSV</button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-slate-50">
              {["Transaction ID","Customer","Type","Date","Amount","Fee","Net","Status"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {txns.map((t) => (
              <tr key={t.id} className="border-b border-border last:border-0 hover:bg-slate-50 transition-colors cursor-pointer">
                <td className="px-4 py-3 text-xs font-mono font-medium" style={{ color: PRIMARY }}>{t.id}</td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">{t.customer}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{t.type}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground tabular-nums">{t.date}</td>
                <td className="px-4 py-3 text-sm font-semibold tabular-nums text-foreground">{fmt$(t.amount)}</td>
                <td className="px-4 py-3 text-xs tabular-nums text-muted-foreground">{fmt$(t.fee)}</td>
                <td className="px-4 py-3 text-sm font-bold tabular-nums text-emerald-600">{fmt$(t.net)}</td>
                <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Reviews Screen ───────────────────────────────────────────────────────────
function ReviewsScreen() {
  const dist = [
    { stars: 5, count: 84, pct: 68 },{ stars: 4, count: 23, pct: 19 },
    { stars: 3, count:  9, pct:  7 },{ stars: 2, count:  4, pct:  3 },{ stars: 1, count: 3, pct: 2 },
  ];
  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ scrollbarWidth: "none" }}>
      <div>
        <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Reviews & Feedback</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Manage customer sentiment and responses</p>
      </div>

      <div className="bg-white rounded-xl border border-border p-5 grid md:grid-cols-2 gap-6">
        <div className="flex items-center gap-5">
          <div className="text-center">
            <p className="text-5xl font-bold text-foreground" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>4.8</p>
            <Stars n={5} />
            <p className="text-xs text-muted-foreground mt-1">123 reviews</p>
          </div>
          <div className="flex-1 space-y-2">
            {dist.map(({ stars, count, pct }) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-5 text-right">{stars}★</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width:`${pct}%`, background: stars>=4?"#10B981":stars===3?"#F59E0B":"#EF4444" }} />
                </div>
                <span className="text-xs tabular-nums text-muted-foreground w-6">{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[{ label:"Total Reviews",value:"123" },{ label:"Response Rate",value:"94%" },{ label:"Avg Response Time",value:"2.3h" },{ label:"NPS Score",value:"72" }].map(({ label, value }) => (
            <div key={label} className="bg-slate-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-foreground" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r.customer} className="bg-white rounded-xl border border-border p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${r.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{r.avatar}</div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{r.customer}</p>
                  <p className="text-xs text-muted-foreground">{r.service} · {r.date}</p>
                </div>
              </div>
              <Stars n={r.rating} />
            </div>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">"{r.comment}"</p>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
              {[["Reply","text-indigo-600"],["Flag","text-amber-600"],["Resolve","text-emerald-600"]].map(([lbl,cls]) => (
                <button key={lbl} className={`text-xs font-semibold px-2.5 py-1 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer ${cls}`}>{lbl}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ label, cta }: { label: string; cta: string }) {
  return (
    <div className="flex-1 flex items-center justify-center p-10">
      <div className="text-center max-w-xs">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: PRIMARY_LIGHT }}>
          <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke={PRIMARY} strokeWidth="2">
            <rect x="8" y="8" width="32" height="32" rx="4"/>
            <line x1="16" y1="24" x2="32" y2="24"/>
            <line x1="24" y1="16" x2="24" y2="32"/>
          </svg>
        </div>
        <h3 className="text-base font-bold text-foreground mb-2" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{label}</h3>
        <p className="text-sm text-muted-foreground mb-4">Get started by creating your first item here.</p>
        <button className="px-4 py-2 rounded-lg text-sm font-semibold text-white cursor-pointer hover:opacity-90 transition-colors" style={{ background: PRIMARY }}>{cta}</button>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const renderScreen = () => {
    switch (screen) {
      case "dashboard":     return <DashboardScreen />;
      case "bookings":      return <BookingsScreen />;
      case "calendar":      return <CalendarScreen />;
      case "services":      return <ServicesScreen />;
      case "customers":     return <CustomersScreen />;
      case "payments":      return <PaymentsScreen />;
      case "reviews":       return <ReviewsScreen />;
      case "promotions":    return <EmptyState label="No Promotions Yet"      cta="Create First Promotion" />;
      case "analytics":     return <EmptyState label="Analytics Coming Soon"  cta="Configure Analytics" />;
      case "notifications": return <EmptyState label="Notification Centre"    cta="Configure Alerts" />;
      case "support":       return <EmptyState label="Support Centre"         cta="Submit a Ticket" />;
      case "settings":      return <EmptyState label="Settings"               cta="Configure Portal" />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Sidebar active={screen} onNav={setScreen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onNotification={() => setShowNotifications(true)}
          onQuickAdd={() => setShowQuickAdd(true)}
        />
        {renderScreen()}
      </div>

      {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
      {showQuickAdd      && <QuickAddModal onClose={() => setShowQuickAdd(false)} onNavigate={(s) => { setScreen(s); }} />}
    </div>
  );
}
