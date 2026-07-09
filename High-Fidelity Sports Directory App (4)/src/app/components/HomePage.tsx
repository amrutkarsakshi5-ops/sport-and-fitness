import { useState, useEffect, useRef } from "react";
import {
  Bell, MapPin, Star, Heart, ChevronRight, Navigation,
  Dumbbell, User, Zap, Leaf, Apple, Trophy, UserCheck,
  Calendar, ArrowRight, Settings, LogOut, X, CheckCircle,
  Clock, BookCheck, Activity,
} from "lucide-react";
import type { Screen } from "./BottomNav";

interface HomePageProps {
  onNavigate: (screen: Screen) => void;
  onSelectBusiness: (id: string) => void;
  onSelectEvent: (id: string) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const categories = [
  { id: "gym",        label: "Gym",             icon: Dumbbell,    color: "#EFF6FF", iconColor: "#2563EB" },
  { id: "trainer",    label: "Personal Trainer", icon: User,        color: "#F0FDF4", iconColor: "#22C55E" },
  { id: "yoga",       label: "Yoga & Pilates",   icon: Leaf,        color: "#FFF7ED", iconColor: "#F59E0B" },
  { id: "crossfit",   label: "CrossFit",         icon: Zap,         color: "#FDF4FF", iconColor: "#A855F7" },
  { id: "sports",     label: "Sports Clubs",     icon: Trophy,      color: "#ECFDF5", iconColor: "#059669" },
  { id: "nutrition",  label: "Nutritionists",    icon: Apple,       color: "#FFF1F2", iconColor: "#FB7185" },
  { id: "coach",      label: "Sports Coaches",   icon: UserCheck,      color: "#FFF8F0", iconColor: "#D97706" },
];

const featuredListings = [
  {
    id: "1", name: "Iron Temple Gym", category: "Gym", rating: 4.9, reviews: 312,
    distance: "0.4 mi", isOpen: true, tag: "Top Rated",
    image: "https://images.unsplash.com/photo-1641159955647-1be5a28c7402?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "2", name: "Zen Flow Yoga Studio", category: "Yoga & Pilates", rating: 4.8, reviews: 198,
    distance: "0.8 mi", isOpen: true, tag: "Popular",
    image: "https://images.unsplash.com/photo-1599447421321-1c96150f0f6b?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "4", name: "CrossFit Capital", category: "CrossFit", rating: 4.8, reviews: 256,
    distance: "0.3 mi", isOpen: true, tag: "Trending",
    image: "https://images.unsplash.com/photo-1497369753325-69e1f26b7f56?w=600&h=400&fit=crop&auto=format",
  },
];

const nearbyListings = [
  {
    id: "5", name: "Coach Marcus – PT", category: "Personal Trainer", rating: 5.0, reviews: 89,
    distance: "0.6 mi", isOpen: true,
    image: "https://images.unsplash.com/photo-1514512364185-4c2b0985be01?w=120&h=120&fit=crop&auto=format",
  },
  {
    id: "6", name: "NutriLife Austin", category: "Nutritionist", rating: 4.6, reviews: 112,
    distance: "1.0 mi", isOpen: true,
    image: "https://images.unsplash.com/photo-1644704170910-a0cdf183649b?w=120&h=120&fit=crop&auto=format",
  },
  {
    id: "4", name: "CrossFit Capital", category: "CrossFit", rating: 4.8, reviews: 256,
    distance: "0.3 mi", isOpen: true,
    image: "https://images.unsplash.com/photo-1497369753325-69e1f26b7f56?w=120&h=120&fit=crop&auto=format",
  },
];

const trendingEvents = [
  {
    id: "e1", title: "Austin 5K Fun Run", date: "Jun 22, 2026", location: "Zilker Park", fee: "Free",
    image: "https://images.unsplash.com/photo-1745790289741-12a211a8325d?w=600&h=300&fit=crop&auto=format",
  },
  {
    id: "e2", title: "Sunrise Yoga on Barton Creek", date: "Jun 25, 2026", location: "Barton Creek Greenbelt", fee: "$15",
    image: "https://images.unsplash.com/photo-1763403921315-f2ef8697199f?w=600&h=300&fit=crop&auto=format",
  },
];

const dropdownItems = [
  { label: "Profile",           icon: User,     screen: "profile" as Screen },
  { label: "Account Settings",  icon: Settings, screen: "auth"    as Screen },
  { label: "Logout",            icon: LogOut,   screen: "auth"    as Screen, danger: true },
];

const notifications = [
  {
    id: "n1", type: "new",      icon: Bell,        color: "#2563EB", bg: "#EFF6FF",
    title: "New Gym Listed Nearby",
    body:  "Peak Performance Gym just joined FitAustin — 0.5 mi away.",
    time:  "2 min ago", unread: true,
  },
  {
    id: "n2", type: "activity", icon: Activity,    color: "#22C55E", bg: "#F0FDF4",
    title: "Review Liked",
    body:  "24 people found your Iron Temple review helpful.",
    time:  "1 hr ago", unread: true,
  },
  {
    id: "n3", type: "event",    icon: Clock,       color: "#F59E0B", bg: "#FFFBEB",
    title: "Event Reminder",
    body:  "Austin 5K Fun Run starts tomorrow at 7:00 AM — Zilker Park.",
    time:  "3 hr ago", unread: true,
  },
  {
    id: "n4", type: "booking",  icon: BookCheck,   color: "#8B5CF6", bg: "#F5F3FF",
    title: "Booking Confirmed",
    body:  "Your session with Coach Marcus is confirmed for Jun 20 at 9 AM.",
    time:  "Yesterday", unread: false,
  },
  {
    id: "n5", type: "activity", icon: CheckCircle, color: "#22C55E", bg: "#F0FDF4",
    title: "Badge Earned",
    body:  "You earned the \"Event Goer\" badge. Keep it up!",
    time:  "2 days ago", unread: false,
  },
];

export function HomePage({ onNavigate, onSelectBusiness, onSelectEvent, onSelectCategory }: HomePageProps) {
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const avatarRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLButtonElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const toggleSave = (id: string) => setSaved((p) => ({ ...p, [id]: !p[id] }));
  const unreadCount = notifications.filter((n) => n.unread && !readIds.has(n.id)).length;

  const markAllRead = () => setReadIds(new Set(notifications.map((n) => n.id)));

  /* Close dropdowns on outside click */
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      const t = e.target as Node;
      if (dropdownOpen && avatarRef.current && !avatarRef.current.contains(t) && dropdownRef.current && !dropdownRef.current.contains(t)) {
        setDropdownOpen(false);
      }
      if (notifOpen && bellRef.current && !bellRef.current.contains(t) && notifRef.current && !notifRef.current.contains(t)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [dropdownOpen, notifOpen]);

  return (
    <div style={{ height: "100%", overflowY: "auto", background: "#F8FAFC", paddingBottom: 80 }}>

      {/* ── Header ── */}
      <div style={{ background: "#ffffff", padding: "52px 20px 16px", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
              <MapPin size={13} color="#2563EB" strokeWidth={2.5} />
              <span style={{ fontSize: 12, color: "#64748B", fontWeight: 500 }}>Your location</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: "#0F172A" }}>Austin, Texas</span>
              <ChevronRight size={16} color="#64748B" />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Notification bell */}
            <div style={{ position: "relative" }}>
              <button
                ref={bellRef}
                onClick={() => { setNotifOpen((v) => !v); setDropdownOpen(false); }}
                style={{ width: 40, height: 40, borderRadius: 20, background: notifOpen ? "#EFF6FF" : "#F1F5F9", border: notifOpen ? "1.5px solid #BFDBFE" : "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}
              >
                <Bell size={18} color={notifOpen ? "#2563EB" : "#0F172A"} />
                {unreadCount > 0 && (
                  <div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: 4, background: "#EF4444", border: "1.5px solid #ffffff" }} />
                )}
              </button>

              {/* Notification panel */}
              {notifOpen && (
                <div
                  ref={notifRef}
                  style={{
                    position: "absolute", top: 50, right: -8,
                    width: 300, background: "#ffffff",
                    borderRadius: 20, border: "1px solid #E2E8F0",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
                    zIndex: 300, overflow: "hidden",
                    animation: "dropIn 0.18s ease",
                  }}
                >
                  <style>{`@keyframes dropIn { from{opacity:0;transform:translateY(-8px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }`}</style>

                  {/* Panel header */}
                  <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <p style={{ fontSize: 14, fontWeight: 800, color: "#0F172A", margin: 0 }}>Notifications</p>
                      {unreadCount > 0 && (
                        <div style={{ background: "#EF4444", borderRadius: 10, padding: "1px 6px" }}>
                          <span style={{ fontSize: 10, fontWeight: 700, color: "#ffffff" }}>{unreadCount}</span>
                        </div>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      {unreadCount > 0 && (
                        <button onClick={markAllRead} style={{ fontSize: 11, fontWeight: 600, color: "#2563EB", background: "none", border: "none", cursor: "pointer" }}>
                          Mark all read
                        </button>
                      )}
                      <button onClick={() => setNotifOpen(false)} style={{ width: 24, height: 24, borderRadius: 8, background: "#F1F5F9", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        <X size={13} color="#64748B" />
                      </button>
                    </div>
                  </div>

                  {/* Notifications list */}
                  <div style={{ maxHeight: 320, overflowY: "auto" }}>
                    {notifications.map((n, i) => {
                      const isUnread = n.unread && !readIds.has(n.id);
                      const Icon = n.icon;
                      return (
                        <div
                          key={n.id}
                          onClick={() => setReadIds((p) => new Set([...p, n.id]))}
                          style={{
                            display: "flex", gap: 10, padding: "12px 16px",
                            borderBottom: i < notifications.length - 1 ? "1px solid #F8FAFC" : "none",
                            background: isUnread ? "#FAFBFF" : "#ffffff",
                            cursor: "pointer",
                          }}
                        >
                          <div style={{ width: 36, height: 36, borderRadius: 10, background: n.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Icon size={16} color={n.color} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 4 }}>
                              <p style={{ fontSize: 12, fontWeight: isUnread ? 700 : 600, color: "#0F172A", margin: "0 0 2px", lineHeight: 1.3 }}>{n.title}</p>
                              {isUnread && <div style={{ width: 7, height: 7, borderRadius: 4, background: "#2563EB", flexShrink: 0, marginTop: 3 }} />}
                            </div>
                            <p style={{ fontSize: 11, color: "#64748B", margin: "0 0 4px", lineHeight: 1.5 }}>{n.body}</p>
                            <p style={{ fontSize: 10, color: "#94A3B8", margin: 0, fontWeight: 500 }}>{n.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Avatar + dropdown wrapper */}
            <div style={{ position: "relative" }}>
              <button
                ref={avatarRef}
                onClick={() => setDropdownOpen((v) => !v)}
                style={{
                  width: 40, height: 40, borderRadius: 20,
                  background: dropdownOpen ? "#1D4ED8" : "#2563EB",
                  border: dropdownOpen ? "2px solid #93C5FD" : "2px solid transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.15s ease",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 700, color: "#ffffff" }}>JD</span>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  style={{
                    position: "absolute", top: 48, right: 0,
                    width: 186, background: "#ffffff",
                    borderRadius: 16, border: "1px solid #E2E8F0",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                    overflow: "hidden", zIndex: 300,
                    animation: "dropIn 0.15s ease",
                  }}
                >
                  <style>{`
                    @keyframes dropIn {
                      from { opacity: 0; transform: translateY(-6px) scale(0.97); }
                      to   { opacity: 1; transform: translateY(0)   scale(1); }
                    }
                  `}</style>

                  {/* User info header */}
                  <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid #F1F5F9" }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", margin: "0 0 1px" }}>Jordan Davis</p>
                    <p style={{ fontSize: 11, color: "#94A3B8", margin: 0 }}>jordan@email.com</p>
                  </div>

                  {/* Menu items */}
                  {dropdownItems.map(({ label, icon: Icon, screen, danger }) => (
                    <button
                      key={label}
                      onClick={() => { setDropdownOpen(false); onNavigate(screen); }}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", gap: 10,
                        padding: "11px 14px", background: "none", border: "none",
                        cursor: "pointer", textAlign: "left",
                        borderTop: label === "Logout" ? "1px solid #F1F5F9" : "none",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = danger ? "#FEF2F2" : "#F8FAFC")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                    >
                      <div style={{
                        width: 30, height: 30, borderRadius: 8,
                        background: danger ? "#FEF2F2" : "#F1F5F9",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        <Icon size={14} color={danger ? "#EF4444" : "#64748B"} />
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: danger ? "#EF4444" : "#0F172A" }}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Explore Categories ── */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: "0 0 2px" }}>Explore Categories</h2>
            <p style={{ fontSize: 11, color: "#94A3B8", margin: 0, fontWeight: 500 }}>Tap a category to see all listings</p>
          </div>
          <button
            onClick={() => onNavigate("search")}
            style={{ fontSize: 13, color: "#2563EB", fontWeight: 600, background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}
          >
            See all
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => { onSelectCategory(cat.id); onNavigate("category"); }}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                  padding: "12px 6px", background: "#ffffff", borderRadius: 16,
                  border: "1px solid #E2E8F0", cursor: "pointer",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 14, background: cat.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={20} color={cat.iconColor} strokeWidth={1.8} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: "#374151", textAlign: "center", lineHeight: 1.3 }}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Featured Near You ── */}
      <div style={{ padding: "20px 0 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", marginBottom: 14 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: 0 }}>Featured Near You</h2>
          <button
            onClick={() => onNavigate("search")}
            style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 13, color: "#2563EB", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}
          >
            View all <ArrowRight size={13} />
          </button>
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", padding: "0 20px 4px", scrollbarWidth: "none" }}>
          {featuredListings.map((biz) => (
            <div
              key={biz.id}
              onClick={() => { onSelectBusiness(biz.id); onNavigate("business-detail"); }}
              style={{ flexShrink: 0, width: 220, background: "#ffffff", borderRadius: 20, border: "1px solid #E2E8F0", overflow: "hidden", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              <div style={{ position: "relative" }}>
                <img src={biz.image} alt={biz.name} style={{ width: "100%", height: 130, objectFit: "cover", background: "#E2E8F0" }} />
                <div style={{ position: "absolute", top: 10, left: 10, background: "#2563EB", borderRadius: 8, padding: "3px 8px" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#ffffff" }}>{biz.tag}</span>
                </div>
                <div
                  onClick={(e) => { e.stopPropagation(); toggleSave(biz.id); }}
                  style={{ position: "absolute", top: 10, right: 10, width: 32, height: 32, borderRadius: 16, background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                >
                  <Heart size={16} fill={saved[biz.id] ? "#EF4444" : "none"} color={saved[biz.id] ? "#EF4444" : "#64748B"} strokeWidth={2} />
                </div>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", margin: "0 0 2px" }}>{biz.name}</p>
                <p style={{ fontSize: 11, color: "#64748B", margin: "0 0 8px", fontWeight: 500 }}>{biz.category}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Star size={12} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#0F172A" }}>{biz.rating}</span>
                    <span style={{ fontSize: 11, color: "#94A3B8" }}>({biz.reviews})</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 7, height: 7, borderRadius: 4, background: biz.isOpen ? "#22C55E" : "#EF4444" }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: biz.isOpen ? "#22C55E" : "#EF4444" }}>
                      {biz.isOpen ? "Open" : "Closed"}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 6 }}>
                  <Navigation size={11} color="#94A3B8" />
                  <span style={{ fontSize: 11, color: "#94A3B8" }}>{biz.distance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Popular Near You ── */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: 0 }}>Popular Near You</h2>
          <button onClick={() => onNavigate("search")} style={{ fontSize: 13, color: "#2563EB", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
            See all
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {nearbyListings.map((biz) => (
            <div
              key={biz.id}
              onClick={() => { onSelectBusiness(biz.id); onNavigate("business-detail"); }}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, background: "#ffffff", borderRadius: 16, border: "1px solid #E2E8F0", cursor: "pointer", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
            >
              <img src={biz.image} alt={biz.name} style={{ width: 60, height: 60, borderRadius: 14, objectFit: "cover", background: "#E2E8F0", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", margin: "0 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{biz.name}</p>
                <p style={{ fontSize: 12, color: "#64748B", margin: "0 0 6px" }}>{biz.category}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Star size={11} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#0F172A" }}>{biz.rating}</span>
                  </div>
                  <span style={{ color: "#E2E8F0" }}>·</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Navigation size={11} color="#94A3B8" />
                    <span style={{ fontSize: 12, color: "#64748B" }}>{biz.distance}</span>
                  </div>
                  <span style={{ color: "#E2E8F0" }}>·</span>
                  <div style={{ width: 7, height: 7, borderRadius: 4, background: biz.isOpen ? "#22C55E" : "#EF4444" }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: biz.isOpen ? "#22C55E" : "#EF4444" }}>
                    {biz.isOpen ? "Open" : "Closed"}
                  </span>
                </div>
              </div>
              <ChevronRight size={18} color="#CBD5E1" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Trending Events ── */}
      <div style={{ padding: "20px 0 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", marginBottom: 14 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: 0 }}>Trending Events</h2>
          <button onClick={() => onNavigate("events")} style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 13, color: "#2563EB", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
            All events <ArrowRight size={13} />
          </button>
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", padding: "0 20px 4px", scrollbarWidth: "none" }}>
          {trendingEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => { onSelectEvent(event.id); onNavigate("event-detail"); }}
              style={{ flexShrink: 0, width: 240, background: "#ffffff", borderRadius: 20, border: "1px solid #E2E8F0", overflow: "hidden", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              <div style={{ position: "relative" }}>
                <img src={event.image} alt={event.title} style={{ width: "100%", height: 120, objectFit: "cover", background: "#E2E8F0" }} />
                <div style={{ position: "absolute", top: 10, right: 10, background: event.fee === "Free" ? "#22C55E" : "#2563EB", borderRadius: 8, padding: "3px 8px" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#ffffff" }}>{event.fee}</span>
                </div>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", margin: "0 0 6px" }}>{event.title}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                  <Calendar size={11} color="#64748B" />
                  <span style={{ fontSize: 11, color: "#64748B" }}>{event.date}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <MapPin size={11} color="#64748B" />
                  <span style={{ fontSize: 11, color: "#64748B" }}>{event.location}</span>
                </div>
                <div style={{ marginTop: 10, padding: "8px", borderRadius: 10, background: "#EFF6FF", textAlign: "center", fontSize: 12, fontWeight: 700, color: "#2563EB" }}>
                  Register Now
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Community Banner ── */}
      <div style={{ margin: "20px", borderRadius: 20, background: "linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #3B82F6 100%)", padding: "20px" }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: "#ffffff", margin: "0 0 4px" }}>Austin Fitness Community</p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", margin: "0 0 16px" }}>Join 12,000+ active members</p>
        <div style={{ display: "flex", gap: 20 }}>
          {[["500+", "Gyms & Studios"], ["200+", "Trainers"], ["50+", "Events/mo"]].map(([num, label]) => (
            <div key={label}>
              <p style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", margin: "0 0 2px" }}>{num}</p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
