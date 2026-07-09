import { useState } from "react";
import { Search, Calendar, MapPin, Clock, ChevronRight, Users } from "lucide-react";
import type { Screen } from "./BottomNav";

interface EventsPageProps {
  onNavigate: (screen: Screen) => void;
  onSelectEvent: (id: string) => void;
}

const categories = ["All", "Running", "Yoga", "CrossFit", "Martial Arts", "Soccer", "Basketball", "Cycling"];

const events = [
  {
    id: "e1",
    title: "Austin 5K Fun Run",
    organizer: "Austin Running Club",
    date: "Jun 22, 2026",
    time: "7:00 AM",
    venue: "Zilker Park, Austin",
    capacity: 500,
    registered: 312,
    fee: "Free",
    category: "Running",
    image: "https://images.unsplash.com/photo-1745790289741-12a211a8325d?w=600&h=300&fit=crop&auto=format",
    featured: true,
  },
  {
    id: "e2",
    title: "Sunrise Yoga on Barton Creek",
    organizer: "Zen Flow Studio",
    date: "Jun 25, 2026",
    time: "6:30 AM",
    venue: "Barton Creek Greenbelt",
    capacity: 60,
    registered: 47,
    fee: "$15",
    category: "Yoga",
    image: "https://images.unsplash.com/photo-1763403921315-f2ef8697199f?w=600&h=300&fit=crop&auto=format",
    featured: false,
  },
  {
    id: "e3",
    title: "CrossFit Open Championship",
    organizer: "CrossFit Capital",
    date: "Jun 28, 2026",
    time: "9:00 AM",
    venue: "Auditorium Shores, Austin",
    capacity: 200,
    registered: 155,
    fee: "$25",
    category: "CrossFit",
    image: "https://images.unsplash.com/photo-1497369753325-69e1f26b7f56?w=600&h=300&fit=crop&auto=format",
    featured: false,
  },
  {
    id: "e4",
    title: "Boxing Fundamentals Workshop",
    organizer: "Austin Combat Academy",
    date: "Jul 2, 2026",
    time: "10:00 AM",
    venue: "Austin Combat Academy",
    capacity: 30,
    registered: 18,
    fee: "$40",
    category: "Martial Arts",
    image: "https://images.unsplash.com/photo-1495555687398-3f50d6e79e1e?w=600&h=300&fit=crop&auto=format",
    featured: false,
  },
  {
    id: "e5",
    title: "Saturday Soccer League",
    organizer: "Austin FC Community",
    date: "Jul 5, 2026",
    time: "8:00 AM",
    venue: "Brush Square Park",
    capacity: 100,
    registered: 64,
    fee: "$10",
    category: "Soccer",
    image: "https://images.unsplash.com/photo-1759674861540-afed9f86f94a?w=600&h=300&fit=crop&auto=format",
    featured: false,
  },
];

export function EventsPage({ onNavigate, onSelectEvent }: EventsPageProps) {
  const [selectedCat, setSelectedCat] = useState("All");
  const [query, setQuery] = useState("");

  const featured = events.find((e) => e.featured);
  const regular = events.filter((e) => {
    const matchCat = selectedCat === "All" || e.category === selectedCat;
    const matchQ = !query || e.title.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
      {/* Header */}
      <div style={{ background: "#ffffff", padding: "52px 20px 12px", borderBottom: "1px solid #E2E8F0", flexShrink: 0 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", margin: "0 0 14px" }}>Events</h1>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 14, padding: "10px 14px", marginBottom: 12,
        }}>
          <Search size={16} color="#94A3B8" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events..."
            style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 14, color: "#0F172A", fontFamily: "Inter, sans-serif" }}
          />
        </div>

        {/* Category Chips */}
        <div style={{ display: "flex", gap: 6, overflowX: "auto", scrollbarWidth: "none" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              style={{
                flexShrink: 0, padding: "7px 14px", borderRadius: 20,
                background: selectedCat === cat ? "#2563EB" : "#F8FAFC",
                border: selectedCat === cat ? "none" : "1.5px solid #E2E8F0",
                cursor: "pointer", fontSize: 13, fontWeight: 600,
                color: selectedCat === cat ? "#ffffff" : "#64748B",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px", paddingBottom: 80 }}>
        {/* Featured Event Banner */}
        {featured && (selectedCat === "All" || selectedCat === featured.category) && !query && (
          <button
            onClick={() => { onSelectEvent(featured.id); onNavigate("event-detail"); }}
            style={{ width: "100%", marginBottom: 20, borderRadius: 20, overflow: "hidden", cursor: "pointer", border: "none", display: "block", textAlign: "left" }}
          >
            <div style={{ position: "relative", height: 180 }}>
              <img
                src={featured.image}
                alt={featured.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", background: "#E2E8F0" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)" }} />
              <div style={{ position: "absolute", top: 12, left: 12, background: "#2563EB", borderRadius: 8, padding: "4px 10px" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#ffffff" }}>★ FEATURED</span>
              </div>
              <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#22C55E", background: "rgba(34,197,94,0.15)", padding: "2px 8px", borderRadius: 6 }}>
                    {featured.fee}
                  </span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>{featured.category}</span>
                </div>
                <p style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", margin: "0 0 6px" }}>{featured.title}</p>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Calendar size={12} color="rgba(255,255,255,0.8)" />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.9)" }}>{featured.date}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <MapPin size={12} color="rgba(255,255,255,0.8)" />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.9)" }}>{featured.venue}</span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        )}

        {/* Upcoming Events */}
        <div style={{ marginBottom: 12 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: "0 0 14px" }}>Upcoming Events</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {regular.map((event) => (
              <button
                key={event.id}
                onClick={() => { onSelectEvent(event.id); onNavigate("event-detail"); }}
                style={{
                  display: "flex", gap: 12, padding: 14, background: "#ffffff",
                  borderRadius: 18, border: "1px solid #E2E8F0",
                  boxShadow: "0 1px 8px rgba(0,0,0,0.05)", cursor: "pointer", textAlign: "left",
                }}
              >
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <img
                    src={event.image}
                    alt={event.title}
                    style={{ width: 90, height: 90, borderRadius: 14, objectFit: "cover", background: "#E2E8F0" }}
                  />
                  <div style={{
                    position: "absolute", top: 4, right: 4,
                    background: event.fee === "Free" ? "#22C55E" : "#2563EB",
                    borderRadius: 6, padding: "2px 6px",
                  }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: "#ffffff" }}>{event.fee}</span>
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", padding: "2px 7px", borderRadius: 5 }}>
                    {event.category}
                  </span>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", margin: "6px 0 4px", lineHeight: 1.3 }}>{event.title}</p>
                  <p style={{ fontSize: 11, color: "#64748B", margin: "0 0 6px" }}>By {event.organizer}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Calendar size={11} color="#94A3B8" />
                      <span style={{ fontSize: 11, color: "#64748B" }}>{event.date} at {event.time}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <MapPin size={11} color="#94A3B8" />
                      <span style={{ fontSize: 11, color: "#64748B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{event.venue}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Users size={11} color="#94A3B8" />
                      <span style={{ fontSize: 11, color: "#64748B" }}>{event.registered}/{event.capacity} registered</span>
                      <div style={{ flex: 1, height: 3, background: "#E2E8F0", borderRadius: 2, maxWidth: 60 }}>
                        <div style={{ height: "100%", width: `${(event.registered / event.capacity) * 100}%`, background: "#2563EB", borderRadius: 2 }} />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
