import { useState } from "react";
import {
  ArrowLeft, LayoutDashboard, Building2, Users, Star, TrendingUp,
  TrendingDown, MoreHorizontal, Bell, RefreshCw, ChevronRight,
  Calendar, BarChart3, Dumbbell,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import type { Screen } from "./BottomNav";

interface AdminDashboardProps {
  onNavigate: (screen: Screen) => void;
}

type AdminTab = "overview" | "listings" | "users" | "reviews";

/* ── data ── */
const userGrowth = [
  { m: "J", v: 3200 }, { m: "F", v: 4100 }, { m: "M", v: 5800 },
  { m: "A", v: 7200 }, { m: "M", v: 9400 }, { m: "J", v: 12000 },
];
const eventReg = [
  { w: "W1", v: 24 }, { w: "W2", v: 41 }, { w: "W3", v: 33 }, { w: "W4", v: 58 },
];
const catDist = [
  { name: "Gyms",     value: 185, color: "#2563EB" },
  { name: "Trainers", value: 112, color: "#8B5CF6" },
  { name: "Yoga",     value: 94,  color: "#22C55E" },
  { name: "CrossFit", value: 67,  color: "#F59E0B" },
  { name: "Other",    value: 62,  color: "#94A3B8" },
];
const listings = [
  { id: "L1", name: "Peak Performance Gym",  cat: "Gym",          owner: "Marcus T.", status: "pending", date: "Jun 14" },
  { id: "L2", name: "Mindful Movement Studio",cat: "Yoga",         owner: "Lisa K.",   status: "active",  date: "Jun 13" },
  { id: "L3", name: "RopeClimb CrossFit",    cat: "CrossFit",     owner: "Jake R.",   status: "active",  date: "Jun 12" },
  { id: "L4", name: "Dr. Kim – Sports Physio",cat: "Physio",       owner: "Sarah K.",  status: "review",  date: "Jun 11" },
  { id: "L5", name: "Eastside Martial Arts",  cat: "Martial Arts", owner: "Chen W.",   status: "active",  date: "Jun 10" },
];
const userList = [
  { id: "U1", name: "Jordan Davis",  email: "jordan@email.com", plan: "Premium", joined: "Jun 10", active: true },
  { id: "U2", name: "Maria Santos",  email: "maria@email.com",  plan: "Free",    joined: "Jun 11", active: true },
  { id: "U3", name: "Alex Kim",      email: "alex@email.com",   plan: "Premium", joined: "Jun 12", active: true },
  { id: "U4", name: "Chris Lee",     email: "chris@email.com",  plan: "Free",    joined: "Jun 13", active: false },
];
const reviewList = [
  { id: "R1", user: "Sarah M.",  biz: "Iron Temple Gym",   rating: 5, status: "published", date: "Jun 14" },
  { id: "R2", user: "Tom K.",    biz: "Austin Combat",     rating: 2, status: "flagged",   date: "Jun 13" },
  { id: "R3", user: "Lisa P.",   biz: "Zen Flow Studio",   rating: 5, status: "published", date: "Jun 12" },
  { id: "R4", user: "Ahmed R.",  biz: "CrossFit Capital",  rating: 4, status: "published", date: "Jun 11" },
];

const statusStyle: Record<string, { bg: string; color: string }> = {
  active:    { bg: "#F0FDF4", color: "#16A34A" },
  pending:   { bg: "#FFFBEB", color: "#D97706" },
  review:    { bg: "#EFF6FF", color: "#2563EB" },
  published: { bg: "#F0FDF4", color: "#16A34A" },
  flagged:   { bg: "#FEF2F2", color: "#DC2626" },
};

function Badge({ status }: { status: string }) {
  const s = statusStyle[status] ?? { bg: "#F1F5F9", color: "#64748B" };
  return (
    <span style={{ padding: "3px 8px", borderRadius: 20, background: s.bg, color: s.color, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap" }}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

const metrics = [
  { label: "Listings",  value: "520",   change: "+12%", up: true,  icon: Building2, color: "#2563EB", bg: "#EFF6FF" },
  { label: "Users",     value: "12.4K", change: "+28%", up: true,  icon: Users,     color: "#22C55E", bg: "#F0FDF4" },
  { label: "Reviews",   value: "8,920", change: "+15%", up: true,  icon: Star,      color: "#F59E0B", bg: "#FFFBEB" },
  { label: "Events/mo", value: "47",    change: "-3%",  up: false, icon: Calendar,  color: "#EF4444", bg: "#FEF2F2" },
];

const adminTabs: { id: AdminTab; label: string; icon: React.FC<{ size?: number; color?: string }> }[] = [
  { id: "overview",  label: "Overview",  icon: LayoutDashboard },
  { id: "listings",  label: "Listings",  icon: Building2 },
  { id: "users",     label: "Users",     icon: Users },
  { id: "reviews",   label: "Reviews",   icon: Star },
];

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [tab, setTab] = useState<AdminTab>("overview");

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#F8FAFC" }}>

      {/* ── Header ── */}
      <div style={{ background: "#0F172A", padding: "52px 20px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => onNavigate("profile")}
              style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,0.1)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <ArrowLeft size={17} color="#ffffff" />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Dumbbell size={15} color="#ffffff" />
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 800, color: "#ffffff", margin: 0 }}>Admin Panel</p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", margin: 0 }}>FitAustin</p>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button style={{ position: "relative", width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,0.1)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Bell size={16} color="#ffffff" />
              <div style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7, borderRadius: 4, background: "#EF4444", border: "1.5px solid #0F172A" }} />
            </button>
            <button style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,0.1)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <RefreshCw size={15} color="#ffffff" />
            </button>
          </div>
        </div>

        {/* Tab strip */}
        <div style={{ display: "flex", gap: 0 }}>
          {adminTabs.map(({ id, label, icon: Icon }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                style={{
                  flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  padding: "10px 4px 12px",
                  background: "none", border: "none", cursor: "pointer",
                  borderBottom: active ? "2.5px solid #2563EB" : "2.5px solid transparent",
                }}
              >
                <Icon size={15} color={active ? "#60A5FA" : "rgba(255,255,255,0.4)"} />
                <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? "#ffffff" : "rgba(255,255,255,0.4)", letterSpacing: 0.2 }}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px", paddingBottom: 24 }}>

        {/* ══ OVERVIEW ══ */}
        {tab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Metric 2×2 grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {metrics.map(({ label, value, change, up, icon: Icon, color, bg }) => (
                <div key={label} style={{ padding: "14px", background: "#ffffff", borderRadius: 16, border: "1px solid #E2E8F0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={16} color={color} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 3, padding: "3px 6px", borderRadius: 8, background: up ? "#F0FDF4" : "#FEF2F2" }}>
                      {up ? <TrendingUp size={10} color="#16A34A" /> : <TrendingDown size={10} color="#DC2626" />}
                      <span style={{ fontSize: 10, fontWeight: 700, color: up ? "#16A34A" : "#DC2626" }}>{change}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", margin: "0 0 2px" }}>{value}</p>
                  <p style={{ fontSize: 11, color: "#64748B", margin: 0, fontWeight: 500 }}>{label}</p>
                </div>
              ))}
            </div>

            {/* User Growth chart */}
            <div style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", margin: "0 0 2px" }}>User Growth</p>
                  <p style={{ fontSize: 11, color: "#64748B", margin: 0 }}>6-month trend</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#22C55E", background: "#F0FDF4", padding: "3px 8px", borderRadius: 8 }}>+28% ↑</span>
              </div>
              <ResponsiveContainer width="100%" height={130}>
                <AreaChart data={userGrowth} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ugGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="m" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #E2E8F0" }} />
                  <Area type="monotone" dataKey="v" name="Users" stroke="#2563EB" strokeWidth={2.5} fill="url(#ugGrad)" dot={{ r: 3, fill: "#2563EB", strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Event Registrations bar */}
            <div style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "16px" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", margin: "0 0 12px" }}>Event Registrations — Jun</p>
              <ResponsiveContainer width="100%" height={110}>
                <BarChart data={eventReg} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="w" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #E2E8F0" }} />
                  <Bar dataKey="v" name="Registrations" fill="#2563EB" radius={[5, 5, 0, 0]} maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Category donut + legend */}
            <div style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "16px" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", margin: "0 0 12px" }}>Listings by Category</p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <PieChart width={110} height={110}>
                  <Pie data={catDist} dataKey="value" cx="50%" cy="50%" innerRadius={30} outerRadius={52} paddingAngle={3}>
                    {catDist.map((e) => <Cell key={`cat-${e.name}`} fill={e.color} />)}
                  </Pie>
                </PieChart>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
                  {catDist.map(({ name, value, color }) => (
                    <div key={name} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 4, background: color, flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: "#64748B", flex: 1 }}>{name}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#0F172A" }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick-nav cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {([
                { label: "Listings", count: "520", tab: "listings" as AdminTab, color: "#2563EB", bg: "#EFF6FF" },
                { label: "Reviews",  count: "8.9K", tab: "reviews" as AdminTab, color: "#F59E0B", bg: "#FFFBEB" },
                { label: "Users",    count: "12.4K", tab: "users" as AdminTab, color: "#22C55E", bg: "#F0FDF4" },
                { label: "Flagged",  count: "3", tab: "reviews" as AdminTab, color: "#EF4444", bg: "#FEF2F2" },
              ]).map(({ label, count, tab: t, color, bg }) => (
                <button
                  key={label}
                  onClick={() => setTab(t)}
                  style={{ padding: "14px", background: "#ffffff", borderRadius: 16, border: "1px solid #E2E8F0", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: 6 }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#64748B" }}>{label}</span>
                    <ChevronRight size={13} color="#CBD5E1" />
                  </div>
                  <p style={{ fontSize: 22, fontWeight: 800, color, margin: 0 }}>{count}</p>
                  <div style={{ height: 3, borderRadius: 2, background: bg }}>
                    <div style={{ height: "100%", width: "70%", borderRadius: 2, background: color }} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ══ LISTINGS ══ */}
        {tab === "listings" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: 0 }}>All Listings</p>
              <span style={{ fontSize: 12, color: "#64748B" }}>{listings.length} total</span>
            </div>
            {listings.map((l) => (
              <div key={l.id} style={{ padding: "14px", background: "#ffffff", borderRadius: 16, border: "1px solid #E2E8F0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", margin: "0 0 2px" }}>{l.name}</p>
                    <p style={{ fontSize: 11, color: "#64748B", margin: 0 }}>{l.cat} · By {l.owner}</p>
                  </div>
                  <Badge status={l.status} />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, color: "#94A3B8" }}>Added {l.date}</span>
                  <button style={{ width: 28, height: 28, borderRadius: 8, background: "#F8FAFC", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <MoreHorizontal size={13} color="#64748B" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══ USERS ══ */}
        {tab === "users" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: 0 }}>Users</p>
              <span style={{ fontSize: 12, color: "#64748B" }}>12,400 total</span>
            </div>
            {userList.map((u) => (
              <div key={u.id} style={{ padding: "14px", background: "#ffffff", borderRadius: 16, border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 20, background: "linear-gradient(135deg,#1D4ED8,#2563EB)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#ffffff" }}>{u.name.split(" ").map((w) => w[0]).join("")}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", margin: "0 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.name}</p>
                  <p style={{ fontSize: 11, color: "#64748B", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.email}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                    background: u.plan === "Premium" ? "#F5F3FF" : "#F1F5F9",
                    color: u.plan === "Premium" ? "#7C3AED" : "#64748B",
                  }}>
                    {u.plan}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 3, background: u.active ? "#22C55E" : "#CBD5E1" }} />
                    <span style={{ fontSize: 10, color: u.active ? "#22C55E" : "#94A3B8", fontWeight: 600 }}>{u.active ? "Active" : "Inactive"}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* User stats */}
            <div style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "16px", marginTop: 4 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", margin: "0 0 12px" }}>User Growth</p>
              <ResponsiveContainer width="100%" height={120}>
                <AreaChart data={userGrowth} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ugGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="m" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #E2E8F0" }} />
                  <Area type="monotone" dataKey="v" name="Users" stroke="#22C55E" strokeWidth={2} fill="url(#ugGrad2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ══ REVIEWS ══ */}
        {tab === "reviews" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: 0 }}>Reviews</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 18, height: 18, borderRadius: 9, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 9, fontWeight: 800, color: "#DC2626" }}>1</span>
                </div>
                <span style={{ fontSize: 12, color: "#64748B" }}>flagged</span>
              </div>
            </div>
            {reviewList.map((r) => (
              <div key={r.id} style={{ padding: "14px", background: "#ffffff", borderRadius: 16, border: `1px solid ${r.status === "flagged" ? "#FECACA" : "#E2E8F0"}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 16, background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: "#ffffff" }}>{r.user.split(" ").map((w) => w[0]).join("")}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", margin: "0 0 1px" }}>{r.user}</p>
                      <p style={{ fontSize: 11, color: "#64748B", margin: 0 }}>{r.biz}</p>
                    </div>
                  </div>
                  <Badge status={r.status} />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={12} fill={s <= r.rating ? "#F59E0B" : "#E2E8F0"} color={s <= r.rating ? "#F59E0B" : "#E2E8F0"} />
                    ))}
                  </div>
                  <span style={{ fontSize: 11, color: "#94A3B8" }}>{r.date}</span>
                </div>
                {r.status === "flagged" && (
                  <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                    <button style={{ flex: 1, padding: "7px", background: "#F0FDF4", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#16A34A" }}>
                      Approve
                    </button>
                    <button style={{ flex: 1, padding: "7px", background: "#FEF2F2", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#DC2626" }}>
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
