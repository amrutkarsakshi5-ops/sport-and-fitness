import { useState, useRef } from "react";
import {
  Heart, Star, Calendar, Trophy, Bookmark, ChevronRight,
  Bell, Settings, HelpCircle, LogOut, Award, Zap, Shield, FileText,
  User, ArrowLeft, Check, Camera, Save, Phone, Mail, MapPin,
  MessageCircle, AlertCircle, X, ToggleLeft, ToggleRight,
} from "lucide-react";
import type { Screen } from "./BottomNav";

interface ProfilePageProps {
  onNavigate: (screen: Screen) => void;
}

const badges = [
  { icon: Zap,    label: "Power User",   color: "#D97706", bg: "#FFFBEB", earned: true,  desc: "Explored 10+ categories and interacted daily.", earnedDate: "Mar 12, 2024", progress: 100 },
  { icon: Trophy, label: "Top Reviewer", color: "#16A34A", bg: "#F0FDF4", earned: true,  desc: "Left 5+ quality reviews for local businesses.",  earnedDate: "Apr 3, 2024",  progress: 100 },
  { icon: Award,  label: "Event Goer",   color: "#2563EB", bg: "#EFF6FF", earned: true,  desc: "Registered and attended 3+ fitness events.",     earnedDate: "May 18, 2024", progress: 100 },
  { icon: Shield, label: "Verified",     color: "#9333EA", bg: "#F5F3FF", earned: false, desc: "Verify your identity to unlock this badge.",     earnedDate: null,           progress: 60  },
];

const stats: { label: string; value: string; icon: React.FC<{size?: number; color?: string}>; color: string; bg: string; screen: Screen }[] = [
  { label: "Saved",     value: "12", icon: Heart,    color: "#EF4444", bg: "#FEF2F2", screen: "favorites" },
  { label: "Reviews",   value: "8",  icon: Star,     color: "#F59E0B", bg: "#FFFBEB", screen: "reviews"   },
  { label: "Events",    value: "5",  icon: Calendar, color: "#2563EB", bg: "#EFF6FF", screen: "events"     },
  { label: "Favorites", value: "18", icon: Bookmark, color: "#8B5CF6", bg: "#F5F3FF", screen: "favorites"  },
];

type Modal = "none" | "badge" | "settings" | "notifications" | "help" | "editProfile";

/* ── Clickable activity row with hover feedback ── */
function ActivityItem({
  label, sub, time, icon: Icon, color, hasBorder, onClick,
}: {
  label: string; sub: string; time: string;
  icon: React.FC<{ size?: number; color?: string }>;
  color: string; hasBorder: boolean; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%", display: "flex", alignItems: "center", gap: 12,
        padding: "13px 16px", background: hovered ? "#F8FAFC" : "#ffffff",
        border: "none", borderBottom: hasBorder ? "1px solid #F1F5F9" : "none",
        cursor: "pointer", textAlign: "left",
        transition: "background 0.15s ease",
      }}
    >
      <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={16} color={color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", margin: "0 0 1px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</p>
        <p style={{ fontSize: 11, color: "#94A3B8", margin: 0 }}>{sub} · {time}</p>
      </div>
      <ChevronRight size={14} color="#CBD5E1" style={{ flexShrink: 0 }} />
    </button>
  );
}
type BadgeItem = typeof badges[number] | null;

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [modal, setModal] = useState<Modal>("none");
  const [activeBadge, setActiveBadge] = useState<BadgeItem>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  /* Edit fields */
  const [editName, setEditName] = useState("Jordan Davis");
  const [editEmail, setEditEmail] = useState("jordan.davis@email.com");
  const [editPhone, setEditPhone] = useState("+1 (512) 555-0199");
  const [editCity, setEditCity] = useState("Austin, TX");
  const [savedName, setSavedName] = useState("Jordan Davis");

  /* Settings toggles */
  const [push, setPush] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [location, setLocation] = useState(true);
  const [dark, setDark] = useState(false);

  const initials = savedName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  const menuItems = [
    { label: "Saved Listings", icon: Bookmark, action: () => onNavigate("favorites"),           badge: "12" },
    { label: "My Reviews",     icon: Star,     action: () => onNavigate("reviews"),             badge: "8"  },
    { label: "My Events",      icon: Calendar, action: () => onNavigate("events"),              badge: "3"  },
    { label: "Notifications",  icon: Bell,     action: () => setModal("notifications"),         badge: "2"  },
    { label: "Settings",       icon: Settings, action: () => setModal("settings"),              badge: null },
    { label: "Help & Support", icon: HelpCircle,action: () => setModal("help"),                badge: null },
  ];

  return (
    <div style={{ height: "100%", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes slideRight{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes popUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes popIn{from{opacity:0;transform:scale(0.93) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
      `}</style>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => {
        const f = e.target.files?.[0]; if (f) setPhotoUrl(URL.createObjectURL(f));
      }} />

      {/* ── Main scroll ── */}
      <div style={{ height: "100%", overflowY: "auto", background: "#F8FAFC", paddingBottom: 80 }}>

        {/* Header */}
        <div style={{ background: "#ffffff", padding: "52px 20px 24px", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{ width: 72, height: 72, borderRadius: 36, background: "linear-gradient(135deg,#1D4ED8,#2563EB)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(37,99,235,0.3)", overflow: "hidden" }}>
                {photoUrl
                  ? <img src={photoUrl} alt="pfp" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <span style={{ fontSize: 26, fontWeight: 800, color: "#ffffff" }}>{initials}</span>}
              </div>
              <button onClick={() => fileRef.current?.click()} style={{ position: "absolute", bottom: 0, right: 0, width: 24, height: 24, borderRadius: 12, background: "#2563EB", border: "2px solid #ffffff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Camera size={11} color="#ffffff" />
              </button>
              <div style={{ position: "absolute", top: 2, right: 2, width: 14, height: 14, borderRadius: 7, background: "#22C55E", border: "2px solid #ffffff" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", margin: "0 0 2px" }}>{savedName}</h1>
              <p style={{ fontSize: 12, color: "#64748B", margin: "0 0 4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{editEmail}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 7, height: 7, borderRadius: 4, background: "#22C55E" }} />
                <span style={{ fontSize: 11, color: "#22C55E", fontWeight: 600 }}>Active Member</span>
                <span style={{ color: "#E2E8F0" }}>·</span>
                <span style={{ fontSize: 11, color: "#94A3B8" }}>Since Jan 2024</span>
              </div>
            </div>
            <button onClick={() => setModal("editProfile")} style={{ padding: "8px 14px", background: "#EFF6FF", border: "1.5px solid #BFDBFE", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#2563EB", flexShrink: 0 }}>
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats — all clickable */}
        <div style={{ padding: "16px 20px 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {stats.map(({ label, value, icon: Icon, color, bg, screen }) => (
              <button
                key={label}
                onClick={() => onNavigate(screen)}
                style={{ padding: "12px 8px", background: "#ffffff", borderRadius: 16, border: "1px solid #E2E8F0", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", cursor: "pointer" }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px" }}>
                  <Icon size={16} color={color} />
                </div>
                <p style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: "0 0 2px" }}>{value}</p>
                <p style={{ fontSize: 9, fontWeight: 600, color: "#94A3B8", margin: 0, textTransform: "uppercase", letterSpacing: 0.3 }}>{label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div style={{ padding: "20px 20px 0" }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: "0 0 12px" }}>Achievement Badges</h2>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", scrollbarWidth: "none" }}>
            {badges.map((badge) => {
              const { icon: Icon, label, color, bg, earned } = badge;
              return (
                <button key={label} onClick={() => { setActiveBadge(badge); setModal("badge"); }} style={{ flexShrink: 0, padding: "14px 16px", background: earned ? "#ffffff" : "#F8FAFC", borderRadius: 16, border: "1.5px solid #E2E8F0", textAlign: "center", minWidth: 84, opacity: earned ? 1 : 0.55, boxShadow: earned ? "0 2px 8px rgba(0,0,0,0.06)" : "none", cursor: "pointer" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: earned ? bg : "#E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                    <Icon size={20} color={earned ? color : "#94A3B8"} />
                  </div>
                  <p style={{ fontSize: 10, fontWeight: 700, color: earned ? "#0F172A" : "#94A3B8", margin: 0, lineHeight: 1.3 }}>{label}</p>
                  {!earned && <p style={{ fontSize: 9, color: "#94A3B8", margin: "3px 0 0" }}>In progress</p>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Activity */}
        <div style={{ padding: "20px 20px 0" }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: "0 0 12px" }}>Recent Activity</h2>
          <div style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #E2E8F0", overflow: "hidden" }}>
            {([
              {
                label: "Reviewed Iron Temple Gym",
                sub: "Tap to view your review",
                time: "2 days ago",
                icon: Star,
                color: "#F59E0B",
                action: () => onNavigate("reviews"),
              },
              {
                label: "Saved Zen Flow Yoga Studio",
                sub: "Tap to view saved listings",
                time: "5 days ago",
                icon: Heart,
                color: "#EF4444",
                action: () => onNavigate("favorites"),
              },
              {
                label: "Registered for Austin 5K Fun Run",
                sub: "Tap to view event details",
                time: "1 week ago",
                icon: Calendar,
                color: "#2563EB",
                action: () => onNavigate("events"),
              },
            ] as const).map(({ label, sub, time, icon: Icon, color, action }, i) => (
              <ActivityItem
                key={label}
                label={label}
                sub={sub}
                time={time}
                icon={Icon}
                color={color}
                hasBorder={i < 2}
                onClick={action}
              />
            ))}
          </div>
        </div>

        {/* Account Menu */}
        <div style={{ padding: "20px 20px 0" }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: "0 0 12px" }}>Account</h2>
          <div style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #E2E8F0", overflow: "hidden" }}>
            {menuItems.map(({ label, icon: Icon, action, badge }, i) => (
              <button key={label} onClick={action} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "none", border: "none", borderBottom: i < menuItems.length - 1 ? "1px solid #F1F5F9" : "none", cursor: "pointer", textAlign: "left" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F8FAFC", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={16} color="#64748B" />
                </div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "#0F172A" }}>{label}</span>
                {badge && <div style={{ background: "#2563EB", borderRadius: 10, padding: "2px 8px" }}><span style={{ fontSize: 11, fontWeight: 700, color: "#ffffff" }}>{badge}</span></div>}
                <ChevronRight size={16} color="#CBD5E1" />
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: "16px 20px 0" }}>
          <button onClick={() => onNavigate("auth")} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 14, cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#EF4444" }}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>

      {/* ── Backdrop ── */}
      {modal !== "none" && (
        <div onClick={() => { setModal("none"); setActiveBadge(null); }} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.48)", zIndex: 60, animation: "fadeIn 0.18s ease" }} />
      )}

      {/* ══ EDIT PROFILE DRAWER ══ */}
      {modal === "editProfile" && (
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "88%", background: "#ffffff", zIndex: 70, display: "flex", flexDirection: "column", animation: "slideRight 0.27s cubic-bezier(0.25,0.46,0.45,0.94)", boxShadow: "-8px 0 32px rgba(0,0,0,0.18)" }}>
          <div style={{ padding: "52px 20px 16px", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setModal("none")} style={{ width: 36, height: 36, borderRadius: 12, background: "#F1F5F9", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <ArrowLeft size={17} color="#0F172A" />
            </button>
            <p style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", margin: 0 }}>Edit Profile</p>
          </div>

          <div style={{ padding: "20px", textAlign: "center", borderBottom: "1px solid #F1F5F9" }}>
            <div style={{ position: "relative", width: 80, height: 80, margin: "0 auto 12px" }}>
              <div style={{ width: 80, height: 80, borderRadius: 40, background: "linear-gradient(135deg,#1D4ED8,#2563EB)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {photoUrl ? <img src={photoUrl} alt="pfp" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 28, fontWeight: 800, color: "#ffffff" }}>{initials}</span>}
              </div>
              <button onClick={() => fileRef.current?.click()} style={{ position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14, background: "#2563EB", border: "2.5px solid #ffffff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Camera size={13} color="#ffffff" />
              </button>
            </div>
            <button onClick={() => fileRef.current?.click()} style={{ fontSize: 13, fontWeight: 600, color: "#2563EB", background: "none", border: "none", cursor: "pointer" }}>Upload Photo</button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
            {[
              { label: "Full Name",     icon: User,   val: editName,  set: setEditName,  type: "text",  ph: "Your full name" },
              { label: "Email Address", icon: Mail,   val: editEmail, set: setEditEmail, type: "email", ph: "you@email.com" },
              { label: "Phone Number",  icon: Phone,  val: editPhone, set: setEditPhone, type: "tel",   ph: "+1 (512) 000-0000" },
              { label: "City",          icon: MapPin, val: editCity,  set: setEditCity,  type: "text",  ph: "Austin, TX" },
            ].map(({ label, icon: Icon, val, set, type, ph }) => (
              <div key={label} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</label>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 12 }}>
                  <Icon size={15} color="#94A3B8" />
                  <input type={type} value={val} onChange={(e) => set(e.target.value)} placeholder={ph} style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 14, color: "#0F172A", fontFamily: "Inter, sans-serif" }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: "12px 20px 28px", borderTop: "1px solid #F1F5F9" }}>
            <button onClick={() => { setSavedName(editName); setModal("none"); }} style={{ width: "100%", padding: "14px", borderRadius: 14, background: "linear-gradient(135deg,#1D4ED8,#2563EB)", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700, color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, boxShadow: "0 4px 14px rgba(37,99,235,0.35)" }}>
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      )}

      {/* ══ SETTINGS BOTTOM SHEET ══ */}
      {modal === "settings" && (
        <div style={{ position: "absolute", inset: "auto 0 0", background: "#ffffff", borderRadius: "24px 24px 0 0", zIndex: 70, padding: "20px 20px 36px", animation: "popUp 0.22s ease" }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "#E2E8F0", margin: "0 auto 18px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <p style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", margin: 0 }}>Settings</p>
            <button onClick={() => setModal("none")} style={{ width: 30, height: 30, borderRadius: 9, background: "#F1F5F9", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={14} color="#64748B" /></button>
          </div>
          {[
            { l: "Push Notifications", s: "Alerts for new listings & events",   v: push,       set: setPush },
            { l: "Email Updates",      s: "Weekly digest & special offers",      v: emailNotif, set: setEmailNotif },
            { l: "Location Access",    s: "Show venues near your location",      v: location,   set: setLocation },
            { l: "Dark Mode",          s: "Switch app to dark theme",            v: dark,       set: setDark },
          ].map(({ l, s, v, set }) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", borderBottom: "1px solid #F8FAFC" }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#0F172A", margin: "0 0 2px" }}>{l}</p>
                <p style={{ fontSize: 11, color: "#94A3B8", margin: 0 }}>{s}</p>
              </div>
              <button onClick={() => set(!v)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                {v ? <ToggleRight size={30} color="#2563EB" /> : <ToggleLeft size={30} color="#CBD5E1" />}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ══ NOTIFICATIONS BOTTOM SHEET ══ */}
      {modal === "notifications" && (
        <div style={{ position: "absolute", inset: "auto 0 0", background: "#ffffff", borderRadius: "24px 24px 0 0", zIndex: 70, padding: "20px 20px 36px", animation: "popUp 0.22s ease", maxHeight: "72%", display: "flex", flexDirection: "column" }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "#E2E8F0", margin: "0 auto 18px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexShrink: 0 }}>
            <p style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", margin: 0 }}>Notifications</p>
            <button onClick={() => setModal("none")} style={{ width: 30, height: 30, borderRadius: 9, background: "#F1F5F9", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={14} color="#64748B" /></button>
          </div>
          <div style={{ overflowY: "auto" }}>
            {[
              { icon: Bell,     color: "#2563EB", bg: "#EFF6FF", title: "New Gym Listed Nearby",    body: "Peak Performance Gym joined FitAustin — 0.5 mi away.", time: "2 min ago",  unread: true },
              { icon: Star,     color: "#F59E0B", bg: "#FFFBEB", title: "Review Liked",             body: "24 people found your Iron Temple review helpful.",     time: "1 hr ago",   unread: true },
              { icon: Calendar, color: "#22C55E", bg: "#F0FDF4", title: "Event Reminder",           body: "Austin 5K Fun Run starts tomorrow at 7:00 AM.",        time: "3 hr ago",   unread: false },
              { icon: Check,    color: "#8B5CF6", bg: "#F5F3FF", title: "Badge Earned",             body: "You earned the \"Event Goer\" badge. Keep it up!",     time: "2 days ago", unread: false },
            ].map(({ icon: Icon, color, bg, title, body, time, unread }, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: i < 3 ? "1px solid #F8FAFC" : "none" }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={16} color={color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ fontSize: 13, fontWeight: unread ? 700 : 600, color: "#0F172A", margin: "0 0 2px" }}>{title}</p>
                    {unread && <div style={{ width: 7, height: 7, borderRadius: 4, background: "#2563EB", flexShrink: 0, marginTop: 4 }} />}
                  </div>
                  <p style={{ fontSize: 11, color: "#64748B", margin: "0 0 3px", lineHeight: 1.5 }}>{body}</p>
                  <p style={{ fontSize: 10, color: "#94A3B8", margin: 0 }}>{time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ HELP & SUPPORT BOTTOM SHEET ══ */}
      {modal === "help" && (
        <div style={{ position: "absolute", inset: "auto 0 0", background: "#ffffff", borderRadius: "24px 24px 0 0", zIndex: 70, padding: "20px 20px 36px", animation: "popUp 0.22s ease" }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "#E2E8F0", margin: "0 auto 18px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <p style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", margin: 0 }}>Help & Support</p>
            <button onClick={() => setModal("none")} style={{ width: 30, height: 30, borderRadius: 9, background: "#F1F5F9", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={14} color="#64748B" /></button>
          </div>
          {[
            { icon: MessageCircle, color: "#2563EB", bg: "#EFF6FF", l: "Live Chat Support",  s: "Chat with our team — avg. reply 2 mins" },
            { icon: Mail,          color: "#22C55E", bg: "#F0FDF4", l: "Email Us",            s: "support@fitaustin.com" },
            { icon: HelpCircle,    color: "#F59E0B", bg: "#FFFBEB", l: "FAQs",               s: "Browse common questions & answers" },
            { icon: AlertCircle,   color: "#9333EA", bg: "#F5F3FF", l: "Report a Problem",   s: "Tell us if something isn't working" },
            { icon: FileText,      color: "#64748B", bg: "#F8FAFC", l: "Privacy Policy",     s: "How we handle your data" },
          ].map(({ icon: Icon, color, bg, l, s }) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", borderBottom: "1px solid #F8FAFC", cursor: "pointer" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={18} color={color} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#0F172A", margin: "0 0 1px" }}>{l}</p>
                <p style={{ fontSize: 11, color: "#94A3B8", margin: 0 }}>{s}</p>
              </div>
              <ChevronRight size={15} color="#CBD5E1" />
            </div>
          ))}
        </div>
      )}

      {/* ══ BADGE MODAL ══ */}
      {modal === "badge" && activeBadge && (
        <div style={{ position: "absolute", inset: "auto 16px 80px", background: "#ffffff", borderRadius: 24, zIndex: 70, padding: "28px 24px", boxShadow: "0 20px 60px rgba(0,0,0,0.22)", animation: "popIn 0.22s cubic-bezier(0.34,1.56,0.64,1)" }}>
          <button onClick={() => { setModal("none"); setActiveBadge(null); }} style={{ position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: 9, background: "#F1F5F9", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={14} color="#64748B" /></button>
          <div style={{ width: 72, height: 72, borderRadius: 22, background: activeBadge.bg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <activeBadge.icon size={34} color={activeBadge.color} />
          </div>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", margin: "0 0 6px" }}>{activeBadge.label}</h2>
            {activeBadge.earned
              ? <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 20, padding: "3px 10px" }}>
                  <Check size={11} color="#16A34A" strokeWidth={3} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#16A34A" }}>Earned {activeBadge.earnedDate}</span>
                </div>
              : <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 20, padding: "3px 10px" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#D97706" }}>In Progress</span>
                </div>
            }
          </div>
          <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, textAlign: "center", margin: "0 0 16px" }}>{activeBadge.desc}</p>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#64748B" }}>Progress</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: activeBadge.color }}>{activeBadge.progress}%</span>
            </div>
            <div style={{ height: 8, background: "#F1F5F9", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${activeBadge.progress}%`, background: activeBadge.color, borderRadius: 4 }} />
            </div>
          </div>
          <button onClick={() => { setModal("none"); setActiveBadge(null); }} style={{ width: "100%", padding: "13px", borderRadius: 14, background: "linear-gradient(135deg,#1D4ED8,#2563EB)", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#ffffff" }}>
            {activeBadge.earned ? "Awesome! 🎉" : "Keep Going! 💪"}
          </button>
        </div>
      )}
    </div>
  );
}
