import { useState } from "react";
import {
  Search, SlidersHorizontal, Map, Star, Phone, ArrowLeft, X,
  ChevronDown, Zap, Dumbbell, MessageCircle, BadgeCheck,
  TrendingUp, MapPin, Share2, Check,
} from "lucide-react";
import type { Screen } from "./BottomNav";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const RATING_OPTIONS = ["Any", "3.5+", "4.0+", "4.5+", "5.0"] as const;
type RatingOption = typeof RATING_OPTIONS[number];

const AMENITY_OPTIONS = [
  "Sunday Open",
  "24 Hours Open",
  "Locker Facility",
  "Free Trial",
  "Steam Room",
] as const;

const CATEGORIES = [
  "All",
  "Gym",
  "Yoga & Pilates",
  "CrossFit",
  "Personal Trainer",
  "Nutritionist",
  "Sports Clubs",
] as const;

const DISTANCES = ["0.5 mi", "1 mi", "2 mi", "5 mi", "10 mi"];

const allListings = [
  {
    id: "1",
    name: "Iron Temple Gym",
    category: "Gym",
    rating: 4.9,
    reviews: 312,
    distance: "0.4 mi",
    isOpen: true,
    phone: "512-555-0101",
    verified: true,
    topSearch: true,
    quickResponse: true,
    address: "1204 S Lamar Blvd, Austin, TX",
    amenities: ["Locker Facility", "24 Hours Open", "Steam Room"] as string[],
    images: [
      "https://images.unsplash.com/photo-1641159955647-1be5a28c7402?w=200&h=150&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1497369753325-69e1f26b7f56?w=200&h=150&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1641159955598-134649e62d86?w=200&h=150&fit=crop&auto=format",
    ],
    plans: [
      { name: "Monthly", price: "$59/mo" },
      { name: "Quarterly", price: "$159/3mo" },
      { name: "Annual", price: "$499/yr" },
    ],
    moreCount: 4,
    tag: "High availability",
  },
  {
    id: "2",
    name: "Zen Flow Yoga Studio",
    category: "Yoga & Pilates",
    rating: 4.8,
    reviews: 198,
    distance: "0.8 mi",
    isOpen: true,
    phone: "512-555-0202",
    verified: true,
    topSearch: false,
    quickResponse: true,
    address: "601 W 6th St, Austin, TX",
    amenities: ["Sunday Open", "Free Trial", "Locker Facility"] as string[],
    images: [
      "https://images.unsplash.com/photo-1599447421321-1c96150f0f6b?w=200&h=150&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1763403921315-f2ef8697199f?w=200&h=150&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1676496962536-d8ef110ff6f0?w=200&h=150&fit=crop&auto=format",
    ],
    plans: [
      { name: "Drop-in", price: "$18/class" },
      { name: "10 Pack", price: "$150/10" },
      { name: "Monthly", price: "$119/mo" },
    ],
    moreCount: 2,
    tag: "Quick Response",
  },
  {
    id: "4",
    name: "CrossFit Capital",
    category: "CrossFit",
    rating: 4.8,
    reviews: 256,
    distance: "0.3 mi",
    isOpen: true,
    phone: "512-555-0404",
    verified: true,
    topSearch: true,
    quickResponse: false,
    address: "2200 E 6th St, Austin, TX",
    amenities: ["24 Hours Open", "Locker Facility", "Steam Room"] as string[],
    images: [
      "https://images.unsplash.com/photo-1497369753325-69e1f26b7f56?w=200&h=150&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1514512364185-4c2b0985be01?w=200&h=150&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1641159955647-1be5a28c7402?w=200&h=150&fit=crop&auto=format",
    ],
    plans: [
      { name: "Monthly", price: "$149/mo" },
      { name: "3 Months", price: "$399/3mo" },
      { name: "Annual", price: "$1299/yr" },
    ],
    moreCount: 3,
    tag: "High availability",
  },
  {
    id: "5",
    name: "Coach Marcus – PT",
    category: "Personal Trainer",
    rating: 5.0,
    reviews: 89,
    distance: "0.6 mi",
    isOpen: true,
    phone: "512-555-0505",
    verified: true,
    topSearch: false,
    quickResponse: true,
    address: "4th Street Fitness, Austin, TX",
    amenities: ["Free Trial", "Sunday Open"] as string[],
    images: [
      "https://images.unsplash.com/photo-1514512364185-4c2b0985be01?w=200&h=150&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1599447421321-1c96150f0f6b?w=200&h=150&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1497369753325-69e1f26b7f56?w=200&h=150&fit=crop&auto=format",
    ],
    plans: [
      { name: "1 Session", price: "$75/hr" },
      { name: "10 Pack", price: "$680/10" },
      { name: "Monthly", price: "$599/mo" },
    ],
    moreCount: 2,
    tag: "Quick Response",
  },
  {
    id: "6",
    name: "NutriLife Austin",
    category: "Nutritionist",
    rating: 4.6,
    reviews: 112,
    distance: "1.0 mi",
    isOpen: false,
    phone: "512-555-0606",
    verified: false,
    topSearch: false,
    quickResponse: false,
    address: "900 S Congress Ave, Austin, TX",
    amenities: ["Sunday Open", "Free Trial"] as string[],
    images: [
      "https://images.unsplash.com/photo-1644704170910-a0cdf183649b?w=200&h=150&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1683106063169-741e57034d19?w=200&h=150&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1587996616596-b714c1c54146?w=200&h=150&fit=crop&auto=format",
    ],
    plans: [
      { name: "Consult", price: "$80/hr" },
      { name: "Meal Plan", price: "$199/mo" },
      { name: "Full Program", price: "$449/mo" },
    ],
    moreCount: 1,
    tag: "High availability",
  },
  {
    id: "7",
    name: "Barton Springs Fitness",
    category: "Gym",
    rating: 4.5,
    reviews: 187,
    distance: "1.1 mi",
    isOpen: true,
    phone: "512-555-0707",
    verified: true,
    topSearch: false,
    quickResponse: true,
    address: "2100 Barton Springs Rd, Austin, TX",
    amenities: ["24 Hours Open", "Locker Facility", "Steam Room", "Free Trial"] as string[],
    images: [
      "https://images.unsplash.com/photo-1641159955598-134649e62d86?w=200&h=150&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1641159955647-1be5a28c7402?w=200&h=150&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1497369753325-69e1f26b7f56?w=200&h=150&fit=crop&auto=format",
    ],
    plans: [
      { name: "Monthly", price: "$45/mo" },
      { name: "3 Months", price: "$119/3mo" },
      { name: "Annual", price: "$399/yr" },
    ],
    moreCount: 3,
    tag: "Quick Response",
  },
];

/* ─────────────────────────────────────────────
   SEARCH PAGE PROPS
───────────────────────────────────────────── */
interface SearchPageProps {
  onNavigate: (screen: Screen) => void;
  onSelectBusiness: (id: string) => void;
}

/* ─────────────────────────────────────────────
   LISTING CARD
───────────────────────────────────────────── */
interface CardProps {
  biz: (typeof allListings)[number];
  onOpen: () => void;
  onShare: () => void;
}

function ListingCard({ biz, onOpen, onShare }: CardProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 16,
        border: "1px solid #E2E8F0",
        boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
        overflow: "hidden",
        marginBottom: 12,
        cursor: "pointer",
      }}
    >
      {/* Info + images */}
      <div style={{ display: "flex" }}>
        {/* Left */}
        <div style={{ flex: 1, padding: "14px 10px 12px 14px", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 5 }}>
            <div
              style={{
                flexShrink: 0,
                width: 20,
                height: 20,
                borderRadius: 6,
                background: "#EFF6FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Dumbbell size={11} color="#2563EB" />
            </div>
            <p
              onClick={onOpen}
              style={{ fontSize: 14, fontWeight: 800, color: "#0F172A", margin: 0, lineHeight: 1.3 }}
            >
              {biz.name}
            </p>
          </div>

          {/* Rating + badges */}
          <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap", marginBottom: 7 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                background: "#22C55E",
                borderRadius: 6,
                padding: "2px 7px",
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>{biz.rating}</span>
              <Star size={10} fill="#fff" color="#fff" />
            </div>
            <span style={{ fontSize: 11, color: "#64748B" }}>{biz.reviews} Ratings</span>
            {biz.verified && (
              <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
                <BadgeCheck size={13} color="#2563EB" fill="#2563EB" />
                <span style={{ fontSize: 10, fontWeight: 700, color: "#2563EB" }}>Verified</span>
              </span>
            )}
            {biz.topSearch && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  background: "#FFFBEB",
                  border: "1px solid #FDE68A",
                  borderRadius: 6,
                  padding: "1px 6px",
                }}
              >
                <TrendingUp size={9} color="#D97706" />
                <span style={{ fontSize: 9, fontWeight: 700, color: "#D97706" }}>Top Search</span>
              </span>
            )}
            {biz.quickResponse && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  background: "#F5F3FF",
                  border: "1px solid #DDD6FE",
                  borderRadius: 6,
                  padding: "1px 6px",
                }}
              >
                <Zap size={9} color="#7C3AED" fill="#7C3AED" />
                <span style={{ fontSize: 9, fontWeight: 700, color: "#7C3AED" }}>Quick Response</span>
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 4, marginBottom: 4 }}>
            <MapPin size={11} color="#94A3B8" style={{ flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontSize: 11, color: "#64748B", lineHeight: 1.4 }}>{biz.address}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Zap size={11} color="#D97706" fill="#D97706" />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#D97706" }}>{biz.tag}</span>
          </div>
        </div>

        {/* Right: images + badges */}
        <div style={{ width: 106, flexShrink: 0, padding: "10px 10px 0 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginBottom: 5 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <img
                src={biz.images[0]}
                alt={biz.name}
                onClick={onOpen}
                style={{
                  width: "100%",
                  height: 52,
                  objectFit: "cover",
                  borderRadius: 8,
                  background: "#E2E8F0",
                  cursor: "pointer",
                  display: "block",
                }}
              />
            </div>
            {biz.images.slice(1, 3).map((img, i) => (
              <div key={i} style={{ position: "relative" }}>
                <img
                  src={img}
                  alt=""
                  onClick={onOpen}
                  style={{
                    width: "100%",
                    height: 38,
                    objectFit: "cover",
                    borderRadius: 6,
                    background: "#E2E8F0",
                    display: "block",
                    cursor: "pointer",
                  }}
                />
                {i === 1 && biz.moreCount > 0 && (
                  <div
                    onClick={onOpen}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 6,
                      background: "rgba(0,0,0,0.52)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 800, color: "#fff" }}>+{biz.moreCount}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: 2 }}>
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: biz.isOpen ? "#16A34A" : "#DC2626",
                background: biz.isOpen ? "#F0FDF4" : "#FEF2F2",
                border: `1px solid ${biz.isOpen ? "#BBF7D0" : "#FECACA"}`,
                borderRadius: 20,
                padding: "2px 6px",
              }}
            >
              {biz.isOpen ? "● Open" : "● Closed"}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare();
              }}
              title="Share listing"
              style={{
                width: 26,
                height: 26,
                borderRadius: 8,
                background: "#F1F5F9",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Share2 size={12} color="#64748B" />
            </button>
          </div>
        </div>
      </div>

      {/* Pricing tiers */}
      <div style={{ padding: "8px 14px 10px" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {biz.plans.map(({ name, price }) => (
            <div
              key={name}
              style={{
                flex: 1,
                padding: "7px 4px",
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: 10,
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: 10, color: "#64748B", margin: "0 0 2px", fontWeight: 500 }}>{name}</p>
              <p style={{ fontSize: 11, fontWeight: 800, color: "#0F172A", margin: 0, lineHeight: 1.2 }}>{price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action row */}
      <div style={{ display: "flex", borderTop: "1px solid #F1F5F9" }}>
        <button
          onClick={onOpen}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            padding: "11px 0",
            background: "none",
            border: "none",
            borderRight: "1px solid #F1F5F9",
            cursor: "pointer",
            fontSize: 11,
            fontWeight: 600,
            color: "#374151",
          }}
        >
          <Phone size={13} color="#374151" /> {biz.phone}
        </button>
        <button
          onClick={onOpen}
          style={{
            flex: 0.65,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            padding: "11px 0",
            background: "none",
            border: "none",
            borderRight: "1px solid #F1F5F9",
            cursor: "pointer",
            fontSize: 11,
            fontWeight: 600,
            color: "#22C55E",
          }}
        >
          <MessageCircle size={13} color="#22C55E" /> WhatsApp
        </button>
        <button
          onClick={onOpen}
          style={{
            flex: 1.1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "11px 0",
            background: "#2563EB",
            border: "none",
            cursor: "pointer",
            fontSize: 11,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          Send Enquiry
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   INLINE RATING PANEL
───────────────────────────────────────────── */
interface RatingPanelProps {
  selectedRating: RatingOption;
  onSelect: (r: RatingOption) => void;
  onClose: () => void;
}
function RatingPanel({ selectedRating, onSelect, onClose }: RatingPanelProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #E2E8F0",
        padding: "14px 16px",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: 0.7 }}>
          Rating
        </span>
        <button
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 10px",
            background: "none",
            border: "1px solid #E2E8F0",
            borderRadius: 20,
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
            color: "#64748B",
          }}
        >
          <X size={12} /> Close
        </button>
      </div>

      {/* Segmented control */}
      <div
        style={{
          display: "flex",
          gap: 0,
          background: "#F1F5F9",
          borderRadius: 12,
          padding: 3,
        }}
      >
        {RATING_OPTIONS.map((r) => {
          const active = selectedRating === r;
          return (
            <button
              key={r}
              onClick={() => onSelect(r)}
              style={{
                flex: 1,
                padding: "8px 4px",
                borderRadius: 9,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: active ? 700 : 500,
                color: active ? "#ffffff" : "#64748B",
                background: active ? "#2563EB" : "transparent",
                boxShadow: active ? "0 2px 8px rgba(37,99,235,0.3)" : "none",
                transition: "all 0.18s ease",
                whiteSpace: "nowrap",
              }}
            >
              {r === "Any" ? "Any" : `${r} ★`}
            </button>
          );
        })}
      </div>

      {selectedRating !== "Any" && (
        <p style={{ fontSize: 11, color: "#2563EB", fontWeight: 600, margin: "8px 0 0" }}>
          Showing {selectedRating} ★ and above
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   INLINE AMENITIES PANEL
───────────────────────────────────────────── */
interface AmenitiesPanelProps {
  pending: string[];
  onToggle: (a: string) => void;
  onApply: () => void;
  onClose: () => void;
}
function AmenitiesPanel({ pending, onToggle, onApply, onClose }: AmenitiesPanelProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #E2E8F0",
        padding: "14px 16px",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#374151",
          textTransform: "uppercase",
          letterSpacing: 0.7,
          display: "block",
          marginBottom: 10,
        }}
      >
        Amenities
      </span>

      <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 14 }}>
        {AMENITY_OPTIONS.map((a) => {
          const checked = pending.includes(a);
          return (
            <button
              key={a}
              onClick={() => onToggle(a)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 12px",
                background: checked ? "#EFF6FF" : "#F8FAFC",
                border: `1.5px solid ${checked ? "#BFDBFE" : "#E2E8F0"}`,
                borderRadius: 10,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s ease",
              }}
            >
              {/* Custom checkbox */}
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  border: checked ? "none" : "2px solid #CBD5E1",
                  background: checked ? "#2563EB" : "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.15s ease",
                }}
              >
                {checked && <Check size={12} color="#ffffff" strokeWidth={3} />}
              </div>
              <span style={{ fontSize: 14, fontWeight: checked ? 600 : 400, color: checked ? "#1D4ED8" : "#374151" }}>
                {a}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer actions */}
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={onApply}
          style={{
            flex: 1,
            padding: "11px",
            background: "#2563EB",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 700,
            color: "#ffffff",
            boxShadow: "0 2px 10px rgba(37,99,235,0.28)",
          }}
        >
          Apply{pending.length > 0 ? ` (${pending.length})` : ""}
        </button>
        <button
          onClick={onClose}
          style={{
            flex: 1,
            padding: "11px",
            background: "#F8FAFC",
            border: "1.5px solid #E2E8F0",
            borderRadius: 10,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 600,
            color: "#374151",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   INLINE CATEGORIES PANEL
───────────────────────────────────────────── */
interface CategoriesPanelProps {
  selectedCat: string;
  onSelect: (c: string) => void;
  onClose: () => void;
}
function CategoriesPanel({ selectedCat, onSelect, onClose }: CategoriesPanelProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #E2E8F0",
        padding: "14px 16px",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: 0.7 }}>
          Categories
        </span>
        <button
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 10px",
            background: "none",
            border: "1px solid #E2E8F0",
            borderRadius: 20,
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
            color: "#64748B",
          }}
        >
          <X size={12} /> Close
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {CATEGORIES.map((c) => {
          const active = selectedCat === c;
          return (
            <button
              key={c}
              onClick={() => { onSelect(c); onClose(); }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "11px 14px",
                background: active ? "#EFF6FF" : "#F8FAFC",
                border: `1.5px solid ${active ? "#BFDBFE" : "#E2E8F0"}`,
                borderRadius: 10,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s ease",
              }}
            >
              <span style={{ fontSize: 14, fontWeight: active ? 700 : 500, color: active ? "#1D4ED8" : "#374151" }}>
                {c}
              </span>
              {active && <Check size={14} color="#2563EB" strokeWidth={3} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SHARE TOAST
───────────────────────────────────────────── */
function ShareToast({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 100,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#0F172A",
        color: "#ffffff",
        fontSize: 13,
        fontWeight: 600,
        padding: "10px 20px",
        borderRadius: 20,
        zIndex: 9999,
        whiteSpace: "nowrap",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        pointerEvents: "none",
      }}
    >
      ✓ Link copied to clipboard
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
type ActivePanel = "none" | "rating" | "amenities" | "categories";

export function SearchPage({ onNavigate, onSelectBusiness }: SearchPageProps) {
  /* ── search & misc ── */
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDist, setSelectedDist] = useState("2 mi");
  const [shareToast, setShareToast] = useState(false);

  /* ── which inline panel is open ── */
  const [activePanel, setActivePanel] = useState<ActivePanel>("none");
  const togglePanel = (p: ActivePanel) => setActivePanel((prev) => (prev === p ? "none" : p));

  /* ── rating ── */
  const [selectedRating, setSelectedRating] = useState<RatingOption>("Any");

  /* ── amenities ── */
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [pendingAmenities, setPendingAmenities] = useState<string[]>([]);

  const openAmenitiesPanel = () => {
    setPendingAmenities(selectedAmenities);
    togglePanel("amenities");
  };
  const togglePending = (a: string) =>
    setPendingAmenities((p) => (p.includes(a) ? p.filter((x) => x !== a) : [...p, a]));
  const applyAmenities = () => {
    setSelectedAmenities(pendingAmenities);
    setActivePanel("none");
  };

  /* ── quick-toggle chips ── */
  const [openNow, setOpenNow] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [quickResponse, setQuickResponse] = useState(false);

  /* ── categories ── */
  const [selectedCat, setSelectedCat] = useState("All");

  /* ── share ── */
  const handleShare = () => {
    try { navigator.clipboard.writeText(window.location.href); } catch (_) {}
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2200);
  };

  /* ── filtered results ── */
  const filtered = allListings.filter((b) => {
    if (selectedCat !== "All" && !b.category.toLowerCase().includes(selectedCat.toLowerCase())) return false;
    if (query && !b.name.toLowerCase().includes(query.toLowerCase()) && !b.category.toLowerCase().includes(query.toLowerCase())) return false;
    if (openNow && !b.isOpen) return false;
    if (topRated && b.rating < 4.5) return false;
    if (quickResponse && !b.quickResponse) return false;
    if (selectedRating !== "Any") {
      const min = parseFloat(selectedRating);
      if (!isNaN(min) && b.rating < min) return false;
    }
    if (selectedAmenities.length > 0 && !selectedAmenities.every((a) => b.amenities.includes(a))) return false;
    return true;
  });

  /* ── chip base style ── */
  const chip = (
    active: boolean,
    onClick: () => void,
    content: React.ReactNode,
    accent = "#2563EB",
    panelOpen = false,
  ): React.ReactNode => (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "6px 12px",
        borderRadius: 20,
        border: active || panelOpen ? `1.5px solid ${accent}` : "1.5px solid #E2E8F0",
        background: panelOpen ? `${accent}20` : active ? `${accent}15` : "#F8FAFC",
        cursor: "pointer",
        fontSize: 12,
        fontWeight: 600,
        color: active || panelOpen ? accent : "#374151",
        whiteSpace: "nowrap",
        transition: "all 0.15s ease",
      }}
    >
      {content}
    </button>
  );

  /* ── active filter badges (shown above results) ── */
  const hasActiveFilters =
    selectedRating !== "Any" ||
    selectedAmenities.length > 0 ||
    openNow ||
    topRated ||
    quickResponse ||
    selectedCat !== "All";

  const clearAll = () => {
    setSelectedRating("Any");
    setSelectedAmenities([]);
    setOpenNow(false);
    setTopRated(false);
    setQuickResponse(false);
    setSelectedCat("All");
    setQuery("");
    setActivePanel("none");
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
      <ShareToast visible={shareToast} />

      {/* ══════════════════════════════════════
          STICKY HEADER
      ══════════════════════════════════════ */}
      <div
        style={{ background: "#ffffff", borderBottom: "1px solid #E2E8F0", flexShrink: 0 }}
        onClick={() => setActivePanel("none")}
      >
        {/* Search row */}
        <div style={{ padding: "52px 16px 10px", display: "flex", gap: 8 }}>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate("home"); }}
            style={{ width: 44, height: 44, borderRadius: 12, background: "#F1F5F9", border: "1.5px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
          >
            <ArrowLeft size={18} color="#0F172A" />
          </button>
          <div
            style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "9px 13px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Search size={15} color="#94A3B8" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search gyms, trainers, clubs..."
              style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 14, color: "#0F172A", fontFamily: "Inter, sans-serif" }}
            />
            {query && (
              <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={13} color="#94A3B8" />
              </button>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setShowFilters(!showFilters); }}
            style={{ width: 44, height: 44, borderRadius: 12, background: showFilters ? "#2563EB" : "#F1F5F9", border: showFilters ? "none" : "1.5px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
          >
            <SlidersHorizontal size={17} color={showFilters ? "#fff" : "#0F172A"} />
          </button>
          <button
            style={{ width: 44, height: 44, borderRadius: 12, background: "#F1F5F9", border: "1.5px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
          >
            <Map size={17} color="#0F172A" />
          </button>
        </div>

        {/* ── Filter chip bar ── */}
        <div
          style={{ padding: "0 16px 10px", display: "flex", gap: 6, overflowX: "auto", scrollbarWidth: "none" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* RATINGS */}
          {chip(
            selectedRating !== "Any",
            () => togglePanel("rating"),
            <>
              <Star size={10} fill={selectedRating !== "Any" ? "#2563EB" : "none"} color={selectedRating !== "Any" ? "#2563EB" : "#374151"} />
              Ratings{selectedRating !== "Any" ? ` ${selectedRating}` : ""}
              <ChevronDown size={10} style={{ transform: activePanel === "rating" ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </>,
            "#2563EB",
            activePanel === "rating",
          )}

          {/* AMENITIES */}
          {chip(
            selectedAmenities.length > 0,
            openAmenitiesPanel,
            <>
              Amenities{selectedAmenities.length > 0 ? ` (${selectedAmenities.length})` : ""}
              <ChevronDown size={10} style={{ transform: activePanel === "amenities" ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </>,
            "#2563EB",
            activePanel === "amenities",
          )}

          {/* OPEN NOW — quick toggle */}
          {chip(
            openNow,
            () => setOpenNow(!openNow),
            <>
              <div style={{ width: 7, height: 7, borderRadius: 4, background: openNow ? "#22C55E" : "#94A3B8" }} />
              Open Now
              {openNow && <Check size={10} color="#16A34A" strokeWidth={3} />}
            </>,
            "#16A34A",
          )}

          {/* CATEGORY */}
          {chip(
            selectedCat !== "All",
            () => togglePanel("categories"),
            <>
              <Dumbbell size={10} />
              {selectedCat === "All" ? "Category" : selectedCat}
              <ChevronDown size={10} style={{ transform: activePanel === "categories" ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </>,
            "#2563EB",
            activePanel === "categories",
          )}

          {/* TOP RATED — quick toggle */}
          {chip(
            topRated,
            () => setTopRated(!topRated),
            <>
              ⭐ Top Rated
              {topRated && <Check size={10} color="#D97706" strokeWidth={3} />}
            </>,
            "#D97706",
          )}

          {/* QUICK RESPONSE — quick toggle */}
          {chip(
            quickResponse,
            () => setQuickResponse(!quickResponse),
            <>
              <Zap size={10} fill={quickResponse ? "#7C3AED" : "none"} color={quickResponse ? "#7C3AED" : "#374151"} />
              Quick Response
              {quickResponse && <Check size={10} color="#7C3AED" strokeWidth={3} />}
            </>,
            "#7C3AED",
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════
          INLINE PANELS — push content down
      ══════════════════════════════════════ */}
      {activePanel === "rating" && (
        <RatingPanel
          selectedRating={selectedRating}
          onSelect={setSelectedRating}
          onClose={() => setActivePanel("none")}
        />
      )}

      {activePanel === "amenities" && (
        <AmenitiesPanel
          pending={pendingAmenities}
          onToggle={togglePending}
          onApply={applyAmenities}
          onClose={() => setActivePanel("none")}
        />
      )}

      {activePanel === "categories" && (
        <CategoriesPanel
          selectedCat={selectedCat}
          onSelect={setSelectedCat}
          onClose={() => setActivePanel("none")}
        />
      )}

      {/* Distance filter (expanded via ≡ button) */}
      {showFilters && (
        <div style={{ background: "#ffffff", borderBottom: "1px solid #E2E8F0", padding: "12px 16px", flexShrink: 0 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#0F172A", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 0.7 }}>
            Distance
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {DISTANCES.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDist(d)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  background: selectedDist === d ? "#EFF6FF" : "#F8FAFC",
                  border: selectedDist === d ? "1.5px solid #2563EB" : "1.5px solid #E2E8F0",
                  fontSize: 12,
                  fontWeight: 600,
                  color: selectedDist === d ? "#2563EB" : "#64748B",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          RESULTS
      ══════════════════════════════════════ */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px", paddingBottom: 80 }}>

        {/* Active filter tags */}
        {hasActiveFilters && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>Active:</span>
            {selectedCat !== "All" && (
              <span style={{ fontSize: 11, background: "#EFF6FF", color: "#2563EB", fontWeight: 700, padding: "2px 9px", borderRadius: 20 }}>
                {selectedCat}
              </span>
            )}
            {selectedRating !== "Any" && (
              <span style={{ fontSize: 11, background: "#EFF6FF", color: "#2563EB", fontWeight: 700, padding: "2px 9px", borderRadius: 20 }}>
                ⭐ {selectedRating}
              </span>
            )}
            {openNow && (
              <span style={{ fontSize: 11, background: "#F0FDF4", color: "#16A34A", fontWeight: 700, padding: "2px 9px", borderRadius: 20 }}>
                Open Now
              </span>
            )}
            {topRated && (
              <span style={{ fontSize: 11, background: "#FFFBEB", color: "#D97706", fontWeight: 700, padding: "2px 9px", borderRadius: 20 }}>
                Top Rated
              </span>
            )}
            {quickResponse && (
              <span style={{ fontSize: 11, background: "#F5F3FF", color: "#7C3AED", fontWeight: 700, padding: "2px 9px", borderRadius: 20 }}>
                Quick Response
              </span>
            )}
            {selectedAmenities.map((a) => (
              <span key={a} style={{ fontSize: 11, background: "#F8FAFC", color: "#374151", fontWeight: 600, padding: "2px 9px", borderRadius: 20, border: "1px solid #E2E8F0" }}>
                {a}
              </span>
            ))}
            <button
              onClick={clearAll}
              style={{ fontSize: 11, color: "#EF4444", fontWeight: 600, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
            >
              Clear all
            </button>
          </div>
        )}

        <p style={{ fontSize: 12, color: "#64748B", fontWeight: 500, margin: "0 0 12px" }}>
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} in Austin, TX
        </p>

        {filtered.map((biz) => (
          <ListingCard
            key={biz.id}
            biz={biz}
            onOpen={() => { onSelectBusiness(biz.id); onNavigate("business-detail"); }}
            onShare={handleShare}
          />
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "56px 20px" }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Search size={28} color="#94A3B8" />
            </div>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", margin: "0 0 6px" }}>No results found</p>
            <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 20px", lineHeight: 1.6 }}>
              No venues match your current filters.
            </p>
            <button
              onClick={clearAll}
              style={{ padding: "10px 24px", background: "#2563EB", border: "none", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#ffffff" }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
