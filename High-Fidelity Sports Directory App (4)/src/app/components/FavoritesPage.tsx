import { useState } from "react";
import { ArrowLeft, Star, Navigation, Phone, Heart, Dumbbell, User, Leaf } from "lucide-react";
import type { Screen } from "./BottomNav";

interface FavoritesPageProps {
  onNavigate: (screen: Screen) => void;
  onSelectBusiness: (id: string) => void;
}

const savedGyms = [
  {
    id: "1", name: "Iron Temple Gym", rating: 4.9, distance: "0.4 mi", isOpen: true,
    image: "https://images.unsplash.com/photo-1641159955647-1be5a28c7402?w=120&h=120&fit=crop&auto=format",
    address: "1204 S Lamar Blvd",
  },
  {
    id: "4", name: "CrossFit Capital", rating: 4.8, distance: "0.3 mi", isOpen: true,
    image: "https://images.unsplash.com/photo-1497369753325-69e1f26b7f56?w=120&h=120&fit=crop&auto=format",
    address: "2200 E 6th St",
  },
];

const savedTrainers = [
  {
    id: "5", name: "Coach Marcus", specialty: "Strength & Conditioning", rating: 5.0, isOpen: true,
    image: "https://images.unsplash.com/photo-1514512364185-4c2b0985be01?w=120&h=120&fit=crop&auto=format",
    address: "4th Street Fitness",
  },
];

const savedStudios = [
  {
    id: "2", name: "Zen Flow Yoga Studio", rating: 4.8, distance: "0.8 mi", isOpen: true,
    image: "https://images.unsplash.com/photo-1599447421321-1c96150f0f6b?w=120&h=120&fit=crop&auto=format",
    address: "601 W 6th St",
  },
];

interface SavedCardProps {
  item: { id: string; name: string; rating: number; isOpen: boolean; image: string; address: string; distance?: string; specialty?: string };
  onSelect: (id: string) => void;
  onNavigate: (screen: Screen) => void;
}

function SavedCard({ item, onSelect, onNavigate }: SavedCardProps) {
  const [saved, setSaved] = useState(true);

  if (!saved) return null;

  return (
    <div style={{ display: "flex", gap: 12, padding: "14px", background: "#ffffff", borderRadius: 18, border: "1px solid #E2E8F0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
      <button onClick={() => { onSelect(item.id); onNavigate("business-detail"); }} style={{ display: "contents" }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: 64, height: 64, borderRadius: 14, objectFit: "cover", background: "#E2E8F0", flexShrink: 0, cursor: "pointer" }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", margin: "0 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
          {item.specialty && <p style={{ fontSize: 11, color: "#64748B", margin: "0 0 4px" }}>{item.specialty}</p>}
          <p style={{ fontSize: 11, color: "#94A3B8", margin: "0 0 6px" }}>{item.address}{item.distance ? ` · ${item.distance}` : ""}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Star size={11} fill="#F59E0B" color="#F59E0B" />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#0F172A" }}>{item.rating}</span>
            </div>
            <span style={{ color: "#E2E8F0" }}>·</span>
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: item.isOpen ? "#22C55E" : "#EF4444" }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: item.isOpen ? "#22C55E" : "#EF4444" }}>{item.isOpen ? "Open" : "Closed"}</span>
            </div>
          </div>
        </div>
      </button>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
        <button
          style={{ width: 34, height: 34, borderRadius: 10, background: "#EFF6FF", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Phone size={14} color="#2563EB" />
        </button>
        <button
          onClick={() => setSaved(false)}
          style={{ width: 34, height: 34, borderRadius: 10, background: "#FEF2F2", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Heart size={14} fill="#EF4444" color="#EF4444" />
        </button>
      </div>
    </div>
  );
}

export function FavoritesPage({ onNavigate, onSelectBusiness }: FavoritesPageProps) {
  const sections = [
    { title: "Saved Gyms & CrossFit", icon: Dumbbell, color: "#2563EB", items: savedGyms },
    { title: "Saved Trainers", icon: User, color: "#22C55E", items: savedTrainers },
    { title: "Saved Studios", icon: Leaf, color: "#F59E0B", items: savedStudios },
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
      {/* Header */}
      <div style={{ background: "#ffffff", padding: "52px 20px 16px", borderBottom: "1px solid #E2E8F0", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => onNavigate("profile")}
            style={{ width: 36, height: 36, borderRadius: 18, background: "#F1F5F9", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <ArrowLeft size={18} color="#0F172A" />
          </button>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", margin: 0 }}>My Favorites</h1>
            <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>{savedGyms.length + savedTrainers.length + savedStudios.length} saved places</p>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px", paddingBottom: 80 }}>
        {sections.map(({ title, icon: Icon, color, items }) => (
          <div key={title} style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={14} color={color} />
              </div>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: 0 }}>{title}</h2>
              <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}>({items.length})</span>
            </div>
            {items.length === 0 ? (
              <div style={{ padding: "24px", background: "#ffffff", borderRadius: 16, border: "1px dashed #E2E8F0", textAlign: "center" }}>
                <Heart size={28} color="#E2E8F0" style={{ margin: "0 auto 8px" }} />
                <p style={{ fontSize: 13, color: "#94A3B8", margin: 0 }}>No saved {title.split(" ").slice(1).join(" ").toLowerCase()} yet</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((item) => (
                  <SavedCard key={item.id} item={item} onSelect={onSelectBusiness} onNavigate={onNavigate} />
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Suggestions */}
        <div style={{ padding: "16px", background: "linear-gradient(135deg, #1D4ED8, #2563EB)", borderRadius: 20, textAlign: "center" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#ffffff", margin: "0 0 6px" }}>Discover More Places</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", margin: "0 0 12px" }}>Find Austin's best fitness spots near you</p>
          <button
            onClick={() => onNavigate("search")}
            style={{ padding: "10px 24px", background: "#ffffff", borderRadius: 12, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#2563EB" }}
          >
            Browse All
          </button>
        </div>
      </div>
    </div>
  );
}
