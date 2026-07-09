import { useState, useEffect } from "react";
import {
  ArrowLeft, Star, Navigation, Phone, Heart, SlidersHorizontal,
  Search, MapPin, PackageSearch,
} from "lucide-react";
import { categories } from "./HomePage";
import type { Screen } from "./BottomNav";

interface CategoryPageProps {
  categoryId: string;
  onNavigate: (screen: Screen) => void;
  onSelectBusiness: (id: string) => void;
}

/* ── Master vendor registry keyed by category id ── */
const vendorRegistry: Record<string, {
  id: string; name: string; tagline: string; rating: number; reviews: number;
  distance: string; isOpen: boolean; price: string; image: string; address: string;
}[]> = {
  gym: [
    {
      id: "1", name: "Iron Temple Gym", tagline: "Austin's premier strength facility",
      rating: 4.9, reviews: 312, distance: "0.4 mi", isOpen: true, price: "$$",
      address: "1204 S Lamar Blvd", image: "https://images.unsplash.com/photo-1641159955647-1be5a28c7402?w=300&h=200&fit=crop&auto=format",
    },
    {
      id: "g2", name: "Barton Springs Fitness", tagline: "Community gym with outdoor access",
      rating: 4.6, reviews: 187, distance: "1.1 mi", isOpen: true, price: "$",
      address: "2100 Barton Springs Rd", image: "https://images.unsplash.com/photo-1497369753325-69e1f26b7f56?w=300&h=200&fit=crop&auto=format",
    },
    {
      id: "g3", name: "Domain Athletic Club", tagline: "Luxury gym in North Austin",
      rating: 4.7, reviews: 241, distance: "3.2 mi", isOpen: false, price: "$$$",
      address: "11721 Rock Rose Ave", image: "https://images.unsplash.com/photo-1514512364185-4c2b0985be01?w=300&h=200&fit=crop&auto=format",
    },
    {
      id: "g4", name: "East Austin Fitness Co.", tagline: "No-frills lifting, serious results",
      rating: 4.5, reviews: 98, distance: "0.9 mi", isOpen: true, price: "$",
      address: "979 Springdale Rd", image: "https://images.unsplash.com/photo-1641159955598-134649e62d86?w=300&h=200&fit=crop&auto=format",
    },
  ],
  trainer: [
    {
      id: "5", name: "Coach Marcus Williams", tagline: "Strength & conditioning specialist",
      rating: 5.0, reviews: 89, distance: "0.6 mi", isOpen: true, price: "$$$$",
      address: "4th Street Fitness", image: "https://images.unsplash.com/photo-1514512364185-4c2b0985be01?w=300&h=200&fit=crop&auto=format",
    },
    {
      id: "t2", name: "Priya Sharma – NASM CPT", tagline: "Weight loss & mobility coaching",
      rating: 4.9, reviews: 64, distance: "1.3 mi", isOpen: true, price: "$$$",
      address: "SoCo Fitness Studio", image: "https://images.unsplash.com/photo-1763403921315-f2ef8697199f?w=300&h=200&fit=crop&auto=format",
    },
    {
      id: "t3", name: "Derek Okafor – CSCS", tagline: "Athletic performance & sports rehab",
      rating: 4.8, reviews: 112, distance: "2.0 mi", isOpen: false, price: "$$$",
      address: "North Loop Training", image: "https://images.unsplash.com/photo-1599447421321-1c96150f0f6b?w=300&h=200&fit=crop&auto=format",
    },
  ],
  yoga: [
    {
      id: "2", name: "Zen Flow Yoga Studio", tagline: "Vinyasa · Yin · Power Pilates",
      rating: 4.8, reviews: 198, distance: "0.8 mi", isOpen: true, price: "$$",
      address: "601 W 6th St", image: "https://images.unsplash.com/photo-1599447421321-1c96150f0f6b?w=300&h=200&fit=crop&auto=format",
    },
    {
      id: "y2", name: "Black Swan Yoga", tagline: "Donation-based hot yoga",
      rating: 4.7, reviews: 304, distance: "1.5 mi", isOpen: true, price: "$",
      address: "2715 Exposition Blvd", image: "https://images.unsplash.com/photo-1763403921315-f2ef8697199f?w=300&h=200&fit=crop&auto=format",
    },
    {
      id: "y3", name: "Practice Yoga Austin", tagline: "Hot yoga in a boutique space",
      rating: 4.6, reviews: 156, distance: "0.5 mi", isOpen: true, price: "$$",
      address: "1300 S Congress Ave", image: "https://images.unsplash.com/photo-1676496962536-d8ef110ff6f0?w=300&h=200&fit=crop&auto=format",
    },
    {
      id: "y4", name: "CorePower Yoga – Domain", tagline: "Sculpt & hot yoga classes",
      rating: 4.5, reviews: 88, distance: "3.8 mi", isOpen: false, price: "$$$",
      address: "3601 S Congress Ave", image: "https://images.unsplash.com/photo-1676496962536-d8ef110ff6f0?w=300&h=200&fit=crop&auto=format",
    },
  ],
  crossfit: [
    {
      id: "4", name: "CrossFit Capital", tagline: "Community-driven WODs daily",
      rating: 4.8, reviews: 256, distance: "0.3 mi", isOpen: true, price: "$$$",
      address: "2200 E 6th St", image: "https://images.unsplash.com/photo-1497369753325-69e1f26b7f56?w=300&h=200&fit=crop&auto=format",
    },
    {
      id: "cf2", name: "CrossFit South Austin", tagline: "Coaching for all skill levels",
      rating: 4.7, reviews: 143, distance: "2.1 mi", isOpen: true, price: "$$",
      address: "4801 S Lamar Blvd", image: "https://images.unsplash.com/photo-1641159955598-134649e62d86?w=300&h=200&fit=crop&auto=format",
    },
  ],
  sports: [
    {
      id: "s1", name: "Austin FC Community League", tagline: "Adult soccer leagues & coaching",
      rating: 4.6, reviews: 78, distance: "1.8 mi", isOpen: true, price: "$$",
      address: "Parmer Lane Sports Complex", image: "https://images.unsplash.com/photo-1759674861540-afed9f86f94a?w=300&h=200&fit=crop&auto=format",
    },
    {
      id: "s2", name: "Austin Basketball Club", tagline: "Pickup games & leagues year-round",
      rating: 4.4, reviews: 55, distance: "2.5 mi", isOpen: true, price: "$",
      address: "Metz Recreation Center", image: "https://images.unsplash.com/photo-1745790289741-12a211a8325d?w=300&h=200&fit=crop&auto=format",
    },
  ],
  nutrition: [
    {
      id: "6", name: "NutriLife Austin", tagline: "Personalized nutrition & meal plans",
      rating: 4.6, reviews: 112, distance: "1.0 mi", isOpen: true, price: "$$",
      address: "900 S Congress Ave", image: "https://images.unsplash.com/photo-1644704170910-a0cdf183649b?w=300&h=200&fit=crop&auto=format",
    },
    {
      id: "n2", name: "Dr. Amara Obi – RDN", tagline: "Sports nutrition & weight management",
      rating: 4.9, reviews: 67, distance: "1.6 mi", isOpen: false, price: "$$$",
      address: "Central Austin Wellness", image: "https://images.unsplash.com/photo-1683106063169-741e57034d19?w=300&h=200&fit=crop&auto=format",
    },
  ],
  physio: [
    {
      id: "p1", name: "Dr. Kim – Sports Physio", tagline: "Injury recovery & movement screening",
      rating: 4.9, reviews: 134, distance: "0.7 mi", isOpen: true, price: "$$$",
      address: "Medical Arts Center", image: "https://images.unsplash.com/photo-1644704170910-a0cdf183649b?w=300&h=200&fit=crop&auto=format",
    },
    {
      id: "p2", name: "Austin Sports Rehab", tagline: "Physical therapy for athletes",
      rating: 4.7, reviews: 89, distance: "1.4 mi", isOpen: true, price: "$$",
      address: "Shoal Creek Blvd", image: "https://images.unsplash.com/photo-1683106063169-741e57034d19?w=300&h=200&fit=crop&auto=format",
    },
  ],
};

type SortKey = "rating" | "distance" | "reviews";

function SkeletonCard() {
  return (
    <div style={{ display: "flex", gap: 12, padding: 14, background: "#ffffff", borderRadius: 18, border: "1px solid #E2E8F0" }}>
      <div style={{ width: 88, height: 88, borderRadius: 14, background: "#F1F5F9", flexShrink: 0, animation: "pulse 1.5s ease-in-out infinite" }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, paddingTop: 2 }}>
        <div style={{ height: 14, borderRadius: 6, background: "#F1F5F9", width: "70%" }} />
        <div style={{ height: 11, borderRadius: 6, background: "#F1F5F9", width: "45%" }} />
        <div style={{ height: 11, borderRadius: 6, background: "#F1F5F9", width: "55%" }} />
        <div style={{ display: "flex", gap: 6, marginTop: 2 }}>
          <div style={{ height: 26, borderRadius: 10, background: "#F1F5F9", width: 56 }} />
          <div style={{ height: 26, borderRadius: 10, background: "#F1F5F9", width: 72 }} />
        </div>
      </div>
    </div>
  );
}

export function CategoryPage({ categoryId, onNavigate, onSelectBusiness }: CategoryPageProps) {
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [sortBy, setSortBy] = useState<SortKey>("rating");
  const [openOnly, setOpenOnly] = useState(false);

  const cat = categories.find((c) => c.id === categoryId);
  const Icon = cat?.icon;

  /* Simulate async fetch */
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, [categoryId]);

  const allVendors = vendorRegistry[categoryId] ?? [];

  const vendors = allVendors
    .filter((v) => !openOnly || v.isOpen)
    .sort((a, b) => {
      if (sortBy === "rating")   return b.rating - a.rating;
      if (sortBy === "reviews")  return b.reviews - a.reviews;
      if (sortBy === "distance") return parseFloat(a.distance) - parseFloat(b.distance);
      return 0;
    });

  const toggleSave = (id: string) => setSaved((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
      `}</style>

      {/* ── Header ── */}
      <div style={{ background: "#ffffff", padding: "52px 20px 0", borderBottom: "1px solid #E2E8F0", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <button
            onClick={() => onNavigate("home")}
            style={{ width: 38, height: 38, borderRadius: 12, background: "#F1F5F9", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
          >
            <ArrowLeft size={18} color="#0F172A" />
          </button>
          {Icon && (
            <div style={{ width: 38, height: 38, borderRadius: 12, background: cat?.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon size={18} color={cat?.iconColor} strokeWidth={1.8} />
            </div>
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: "0 0 1px" }}>
              {cat?.label ?? "Category"}
            </h1>
            <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>
              {loading ? "Loading…" : `${vendors.length} vendor${vendors.length !== 1 ? "s" : ""} in Austin, TX`}
            </p>
          </div>
        </div>

        {/* Sort + filter strip */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, paddingBottom: 12, overflowX: "auto", scrollbarWidth: "none" }}>
          {(["rating", "distance", "reviews"] as SortKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              style={{
                flexShrink: 0, padding: "6px 14px", borderRadius: 20,
                background: sortBy === key ? "#2563EB" : "#F1F5F9",
                border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
                color: sortBy === key ? "#ffffff" : "#64748B",
              }}
            >
              {key === "rating" ? "⭐ Top Rated" : key === "distance" ? "📍 Nearest" : "💬 Most Reviewed"}
            </button>
          ))}
          <button
            onClick={() => setOpenOnly((v) => !v)}
            style={{
              flexShrink: 0, padding: "6px 14px", borderRadius: 20,
              background: openOnly ? "#F0FDF4" : "#F1F5F9",
              border: openOnly ? "1.5px solid #22C55E" : "none",
              cursor: "pointer", fontSize: 12, fontWeight: 600,
              color: openOnly ? "#16A34A" : "#64748B",
            }}
          >
            🟢 Open Now
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", paddingBottom: 80 }}>

        {/* Skeleton state */}
        {loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Empty state */}
        {!loading && vendors.length === 0 && (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: "60px 24px", textAlign: "center",
          }}>
            <div style={{ width: 80, height: 80, borderRadius: 24, background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <PackageSearch size={36} color="#94A3B8" strokeWidth={1.5} />
            </div>
            <p style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: "0 0 8px" }}>No vendors available</p>
            <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 24px", lineHeight: 1.6 }}>
              No vendors available in this category right now.{"\n"}Check back soon or explore other categories.
            </p>
            <button
              onClick={() => onNavigate("home")}
              style={{ padding: "12px 28px", background: "#2563EB", border: "none", borderRadius: 14, cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#ffffff", boxShadow: "0 4px 14px rgba(37,99,235,0.3)" }}
            >
              Explore Other Categories
            </button>
          </div>
        )}

        {/* Vendor cards */}
        {!loading && vendors.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {vendors.map((v) => (
              <div
                key={v.id}
                onClick={() => { onSelectBusiness(v.id); onNavigate("business-detail"); }}
                style={{ display: "flex", gap: 12, padding: 14, background: "#ffffff", borderRadius: 18, border: "1px solid #E2E8F0", boxShadow: "0 1px 8px rgba(0,0,0,0.05)", cursor: "pointer" }}
              >
                {/* Thumbnail */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <img
                    src={v.image}
                    alt={v.name}
                    style={{ width: 88, height: 88, borderRadius: 14, objectFit: "cover", background: "#E2E8F0" }}
                  />
                  <div style={{ position: "absolute", bottom: 4, right: 4, background: v.isOpen ? "#22C55E" : "#EF4444", borderRadius: 6, padding: "2px 6px" }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: "#ffffff" }}>{v.isOpen ? "Open" : "Closed"}</span>
                  </div>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", margin: "0 0 1px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.name}</p>
                      <p style={{ fontSize: 11, color: "#64748B", margin: "0 0 6px" }}>{v.tagline}</p>
                    </div>
                    <div
                      onClick={(e) => { e.stopPropagation(); toggleSave(v.id); }}
                      style={{ marginLeft: 8, flexShrink: 0, cursor: "pointer" }}
                    >
                      <Heart size={16} fill={saved[v.id] ? "#EF4444" : "none"} color={saved[v.id] ? "#EF4444" : "#CBD5E1"} strokeWidth={2} />
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
                    <Star size={12} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#0F172A" }}>{v.rating}</span>
                    <span style={{ fontSize: 11, color: "#94A3B8" }}>({v.reviews})</span>
                    <span style={{ color: "#E2E8F0" }}>·</span>
                    <Navigation size={11} color="#94A3B8" />
                    <span style={{ fontSize: 11, color: "#64748B" }}>{v.distance}</span>
                    <span style={{ color: "#E2E8F0" }}>·</span>
                    <span style={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>{v.price}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
                    <MapPin size={11} color="#94A3B8" />
                    <span style={{ fontSize: 11, color: "#64748B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.address}</span>
                  </div>

                  <div style={{ display: "flex", gap: 6 }}>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", background: "#EFF6FF", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#2563EB" }}
                    >
                      <Phone size={11} /> Call
                    </div>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", background: "#F0FDF4", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#22C55E" }}
                    >
                      <Navigation size={11} /> Directions
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
