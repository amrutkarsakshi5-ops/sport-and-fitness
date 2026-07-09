import { useState } from "react";
import { ArrowLeft, Share2, Heart, Calendar, Clock, MapPin, Users, DollarSign, CheckCircle } from "lucide-react";
import type { Screen } from "./BottomNav";

interface EventDetailPageProps {
  eventId: string;
  onNavigate: (screen: Screen) => void;
}

const eventsData: Record<string, {
  id: string; title: string; organizer: string; description: string;
  date: string; time: string; endTime: string; venue: string; address: string;
  capacity: number; registered: number; fee: string; category: string; image: string;
}> = {
  "e1": {
    id: "e1",
    title: "Austin 5K Fun Run",
    organizer: "Austin Running Club",
    description: "Join hundreds of Austin residents for our monthly 5K Fun Run through the scenic trails of Zilker Park. All fitness levels welcome! The route winds through some of Austin's most beautiful green spaces along Lady Bird Lake. Refreshments and medal ceremony follow the race.\n\nPost-race festivities include live music, food trucks, and vendor booths from local fitness brands. Bring the whole family — there's a kids' 1K dash at 8:30 AM too.",
    date: "Sunday, Jun 22, 2026",
    time: "7:00 AM",
    endTime: "10:00 AM",
    venue: "Zilker Park",
    address: "2100 William Barton Dr, Austin, TX 78746",
    capacity: 500,
    registered: 312,
    fee: "Free",
    category: "Running",
    image: "https://images.unsplash.com/photo-1745790289741-12a211a8325d?w=800&h=400&fit=crop&auto=format",
  },
  "e2": {
    id: "e2",
    title: "Sunrise Yoga on Barton Creek",
    organizer: "Zen Flow Studio",
    description: "Start your week right with a transformative outdoor yoga session at the stunning Barton Creek Greenbelt. Our certified instructor will guide you through a 75-minute Vinyasa flow designed to energize your body and calm your mind.\n\nBring your own mat. All levels welcome. Water and light snacks provided. Please arrive 10 minutes early to settle in.",
    date: "Wednesday, Jun 25, 2026",
    time: "6:30 AM",
    endTime: "8:00 AM",
    venue: "Barton Creek Greenbelt",
    address: "3755 S Capital of Texas Hwy, Austin, TX 78704",
    capacity: 60,
    registered: 47,
    fee: "$15",
    category: "Yoga",
    image: "https://images.unsplash.com/photo-1763403921315-f2ef8697199f?w=800&h=400&fit=crop&auto=format",
  },
};

const defaultEvent = eventsData["e1"];

const avatarColors = ["#2563EB", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];
const attendees = ["AK", "BM", "CR", "DL", "EP", "FN", "GR", "HT"];

export function EventDetailPage({ eventId, onNavigate }: EventDetailPageProps) {
  const event = eventsData[eventId] || defaultEvent;
  const [saved, setSaved] = useState(false);
  const [registered, setRegistered] = useState(false);
  const pct = (event.registered / event.capacity) * 100;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
        {/* Hero Image */}
        <div style={{ position: "relative", height: 260, background: "#E2E8F0" }}>
          <img
            src={event.image}
            alt={event.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 40%, transparent 55%, rgba(0,0,0,0.6) 100%)" }} />

          {/* Controls */}
          <div style={{ position: "absolute", top: 52, left: 16, right: 16, display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={() => onNavigate("events")}
              style={{ width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.95)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <ArrowLeft size={20} color="#0F172A" />
            </button>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.95)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Share2 size={18} color="#0F172A" />
              </button>
              <button
                onClick={() => setSaved(!saved)}
                style={{ width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.95)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                <Heart size={18} fill={saved ? "#EF4444" : "none"} color={saved ? "#EF4444" : "#0F172A"} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Date Badge */}
          <div style={{
            position: "absolute", bottom: -22, left: 20,
            background: "#2563EB", borderRadius: 14, padding: "10px 16px",
            boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
          }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.8)", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: 0.8 }}>
              {event.date.split(",")[0]}
            </p>
            <p style={{ fontSize: 15, fontWeight: 800, color: "#ffffff", margin: 0 }}>
              {event.date.split(",")[1]?.trim()}
            </p>
          </div>

          {/* Fee badge */}
          <div style={{
            position: "absolute", bottom: -22, right: 20,
            background: event.fee === "Free" ? "#22C55E" : "#0F172A",
            borderRadius: 14, padding: "10px 16px",
          }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.7)", margin: "0 0 2px", textTransform: "uppercase" }}>Entry</p>
            <p style={{ fontSize: 15, fontWeight: 800, color: "#ffffff", margin: 0 }}>{event.fee}</p>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "36px 20px 0" }}>
          {/* Title */}
          <span style={{ fontSize: 11, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", padding: "3px 10px", borderRadius: 8 }}>
            {event.category}
          </span>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", margin: "10px 0 4px" }}>{event.title}</h1>
          <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 20px" }}>Organized by <span style={{ fontWeight: 600, color: "#2563EB" }}>{event.organizer}</span></p>

          {/* Info Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {[
              { icon: Calendar, label: "Date", value: event.date.split(",").slice(1).join(",").trim(), color: "#2563EB", bg: "#EFF6FF" },
              { icon: Clock, label: "Time", value: `${event.time} – ${event.endTime}`, color: "#8B5CF6", bg: "#F5F3FF" },
              { icon: MapPin, label: "Venue", value: event.venue, color: "#22C55E", bg: "#F0FDF4" },
              { icon: Users, label: "Capacity", value: `${event.registered}/${event.capacity} spots`, color: "#F59E0B", bg: "#FFFBEB" },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} style={{ padding: "14px", background: bg, borderRadius: 14, border: `1px solid ${bg === "#EFF6FF" ? "#BFDBFE" : bg === "#F5F3FF" ? "#DDD6FE" : bg === "#F0FDF4" ? "#BBF7D0" : "#FDE68A"}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <Icon size={14} color={color} />
                  <span style={{ fontSize: 11, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
                </div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#0F172A", margin: 0, lineHeight: 1.4 }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Capacity Bar */}
          <div style={{ padding: "14px 16px", background: "#ffffff", borderRadius: 14, border: "1px solid #E2E8F0", marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>Spots Filling Up</span>
              <span style={{ fontSize: 12, color: "#64748B" }}>{event.capacity - event.registered} left</span>
            </div>
            <div style={{ height: 8, background: "#E2E8F0", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: pct > 80 ? "#EF4444" : pct > 60 ? "#F59E0B" : "#22C55E", borderRadius: 4, transition: "width 0.5s ease" }} />
            </div>
            <p style={{ fontSize: 11, color: "#64748B", margin: "6px 0 0" }}>{Math.round(pct)}% registered</p>
          </div>

          {/* Description */}
          <div style={{ padding: "16px", background: "#ffffff", borderRadius: 16, border: "1px solid #E2E8F0", marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: "0 0 10px" }}>About This Event</h3>
            {event.description.split("\n\n").map((para, i) => (
              <p key={i} style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, margin: i > 0 ? "10px 0 0" : 0 }}>{para}</p>
            ))}
          </div>

          {/* Map Preview */}
          <div style={{ padding: "16px", background: "#ffffff", borderRadius: 16, border: "1px solid #E2E8F0", marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: "0 0 10px" }}>Location</h3>
            <div style={{
              height: 120, background: "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 50%, #7DD3FC 100%)",
              borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 8, position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", inset: 0, opacity: 0.3, backgroundImage: "repeating-linear-gradient(0deg, #93C5FD 0, #93C5FD 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #93C5FD 0, #93C5FD 1px, transparent 1px, transparent 40px)" }} />
              <div style={{ width: 36, height: 36, borderRadius: 18, background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(37,99,235,0.4)" }}>
                <MapPin size={18} color="#ffffff" fill="#ffffff" />
              </div>
            </div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", margin: "0 0 2px" }}>{event.venue}</p>
            <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>{event.address}</p>
          </div>

          {/* Attendees */}
          <div style={{ padding: "16px", background: "#ffffff", borderRadius: 16, border: "1px solid #E2E8F0", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: 0 }}>Attendees</h3>
              <span style={{ fontSize: 13, color: "#64748B" }}>{event.registered} going</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
              {attendees.slice(0, 7).map((initials, i) => (
                <div
                  key={i}
                  style={{
                    width: 34, height: 34, borderRadius: 17,
                    background: avatarColors[i % avatarColors.length],
                    border: "2px solid #ffffff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginLeft: i > 0 ? -10 : 0,
                    zIndex: 10 - i,
                  }}
                >
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#ffffff" }}>{initials}</span>
                </div>
              ))}
              <div style={{
                width: 34, height: 34, borderRadius: 17,
                background: "#F1F5F9", border: "2px solid #ffffff",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginLeft: -10,
              }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: "#64748B" }}>+{event.registered - 7}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "#ffffff", borderTop: "1px solid #E2E8F0",
        padding: "12px 20px 24px",
      }}>
        <button
          onClick={() => setRegistered(!registered)}
          style={{
            width: "100%", padding: "15px", borderRadius: 16,
            background: registered
              ? "linear-gradient(135deg, #16A34A, #22C55E)"
              : "linear-gradient(135deg, #1D4ED8, #2563EB)",
            border: "none", cursor: "pointer",
            fontSize: 15, fontWeight: 700, color: "#ffffff",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            boxShadow: registered ? "0 4px 16px rgba(34,197,94,0.35)" : "0 4px 16px rgba(37,99,235,0.35)",
            transition: "all 0.3s ease",
          }}
        >
          {registered ? (
            <><CheckCircle size={18} /> Registered! ✓</>
          ) : (
            <>Register Now {event.fee !== "Free" ? `· ${event.fee}` : "· Free"}</>
          )}
        </button>
      </div>
    </div>
  );
}
