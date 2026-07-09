import { useState } from "react";
import {
  ArrowLeft, Share2, Heart, Star, Phone, Navigation, Globe, Clock,
  MapPin, Wifi, Car, Dumbbell, Coffee, ShowerHead, ChevronRight,
  CheckCircle, X
} from "lucide-react";
import type { Screen } from "./BottomNav";

interface BusinessDetailPageProps {
  businessId: string;
  onNavigate: (screen: Screen) => void;
  onReviews: () => void;
}

const businessData: Record<string, {
  id: string; name: string; category: string; rating: number; reviews: number;
  address: string; phone: string; website: string; isOpen: boolean; distance: string;
  images: string[]; description: string; price: string;
}> = {
  "1": {
    id: "1",
    name: "Iron Temple Gym",
    category: "Gym",
    rating: 4.9,
    reviews: 312,
    address: "1204 S Lamar Blvd, Austin, TX 78704",
    phone: "+1 (512) 555-0101",
    website: "irontemple.com",
    isOpen: true,
    distance: "0.4 mi",
    images: [
      "https://images.unsplash.com/photo-1641159955647-1be5a28c7402?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1497369753325-69e1f26b7f56?w=800&h=500&fit=crop&auto=format",
    ],
    description: "Austin's premier strength and conditioning facility. Iron Temple offers state-of-the-art equipment, expert coaches, and a welcoming community for athletes of all levels. From powerlifters to weekend warriors, we have everything you need to crush your goals.",
    price: "$$",
  },
  "2": {
    id: "2",
    name: "Zen Flow Yoga Studio",
    category: "Yoga & Pilates",
    rating: 4.8,
    reviews: 198,
    address: "601 W 6th St, Austin, TX 78701",
    phone: "+1 (512) 555-0202",
    website: "zenflowaustin.com",
    isOpen: true,
    distance: "0.8 mi",
    images: [
      "https://images.unsplash.com/photo-1599447421321-1c96150f0f6b?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1763403921315-f2ef8697199f?w=800&h=500&fit=crop&auto=format",
    ],
    description: "A sanctuary for mind, body, and spirit in the heart of Austin. Offering over 40 weekly classes spanning Hatha, Vinyasa, Yin, and Power Pilates. Our certified instructors create transformative experiences for beginners and advanced practitioners alike.",
    price: "$$",
  },
};

const defaultBusiness = businessData["1"];

const facilities = [
  { icon: Car, label: "Parking", available: true },
  { icon: Wifi, label: "WiFi", available: true },
  { icon: Dumbbell, label: "Lockers", available: true },
  { icon: ShowerHead, label: "Showers", available: true },
  { icon: Coffee, label: "Café", available: false },
];

const hours = [
  { day: "Monday – Friday", time: "5:00 AM – 11:00 PM" },
  { day: "Saturday", time: "6:00 AM – 10:00 PM" },
  { day: "Sunday", time: "7:00 AM – 9:00 PM" },
];

const plans = [
  { name: "Day Pass", price: "$15", period: "per visit", highlight: false },
  { name: "Monthly", price: "$59", period: "per month", highlight: true },
  { name: "Annual", price: "$499", period: "per year", highlight: false },
];

const reviewSamples = [
  { name: "Sarah M.", rating: 5, text: "Best gym in Austin! The equipment is top-notch and the coaches are incredibly knowledgeable.", avatar: "SM" },
  { name: "Jason R.", rating: 5, text: "I've been a member for 2 years and couldn't be happier. Great community vibes.", avatar: "JR" },
];

const relatedBusinesses = [
  { id: "4", name: "CrossFit Capital", category: "CrossFit", rating: 4.8, image: "https://images.unsplash.com/photo-1497369753325-69e1f26b7f56?w=120&h=120&fit=crop&auto=format" },
  { id: "5", name: "Coach Marcus – PT", category: "Trainer", rating: 5.0, image: "https://images.unsplash.com/photo-1514512364185-4c2b0985be01?w=120&h=120&fit=crop&auto=format" },
];

export function BusinessDetailPage({ businessId, onNavigate, onReviews }: BusinessDetailPageProps) {
  const biz = businessData[businessId] || defaultBusiness;
  const [saved, setSaved] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
        {/* Image Gallery */}
        <div style={{ position: "relative", height: 280, background: "#E2E8F0" }}>
          <img
            src={biz.images[activeImg]}
            alt={biz.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Gradient overlay */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.15) 100%)" }} />

          {/* Top Controls */}
          <div style={{ position: "absolute", top: 52, left: 16, right: 16, display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={() => onNavigate("search")}
              style={{ width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.95)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <ArrowLeft size={20} color="#0F172A" />
            </button>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                style={{ width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.95)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
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

          {/* Image Dots */}
          {biz.images.length > 1 && (
            <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
              {biz.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  style={{
                    width: activeImg === i ? 20 : 7, height: 7, borderRadius: 4,
                    background: activeImg === i ? "#ffffff" : "rgba(255,255,255,0.5)",
                    border: "none", cursor: "pointer", transition: "all 0.2s",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Business Info */}
        <div style={{ padding: "20px 20px 0", background: "#ffffff", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", padding: "2px 8px", borderRadius: 6 }}>
                  {biz.category}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: biz.isOpen ? "#22C55E" : "#EF4444" }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: biz.isOpen ? "#22C55E" : "#EF4444" }}>
                    {biz.isOpen ? "Open Now" : "Closed"}
                  </span>
                </div>
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", margin: "0 0 6px" }}>{biz.name}</h1>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <div style={{ display: "flex" }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} fill={s <= Math.round(biz.rating) ? "#F59E0B" : "#E2E8F0"} color={s <= Math.round(biz.rating) ? "#F59E0B" : "#E2E8F0"} />
              ))}
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{biz.rating}</span>
            <button onClick={onReviews} style={{ fontSize: 13, color: "#2563EB", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
              {biz.reviews} reviews →
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 16 }}>
            <MapPin size={13} color="#64748B" />
            <span style={{ fontSize: 13, color: "#64748B" }}>{biz.address}</span>
            <span style={{ color: "#CBD5E1" }}>·</span>
            <Navigation size={11} color="#64748B" />
            <span style={{ fontSize: 13, color: "#64748B" }}>{biz.distance}</span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 8, paddingBottom: 20 }}>
            {[
              { label: "Call", icon: Phone, color: "#2563EB", bg: "#EFF6FF" },
              { label: "Directions", icon: Navigation, color: "#22C55E", bg: "#F0FDF4" },
              { label: "Website", icon: Globe, color: "#8B5CF6", bg: "#F5F3FF" },
            ].map(({ label, icon: Icon, color, bg }) => (
              <button
                key={label}
                style={{
                  flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  padding: "10px 0", background: bg, borderRadius: 12, border: "none", cursor: "pointer",
                }}
              >
                <Icon size={18} color={color} />
                <span style={{ fontSize: 11, fontWeight: 600, color }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div style={{ padding: "20px", background: "#ffffff", marginTop: 8, borderBottom: "1px solid #E2E8F0" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: "0 0 10px" }}>About</h3>
          <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, margin: 0 }}>{biz.description}</p>
        </div>

        {/* Facilities */}
        <div style={{ padding: "20px", background: "#ffffff", marginTop: 8, borderBottom: "1px solid #E2E8F0" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: "0 0 14px" }}>Facilities & Amenities</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {facilities.map(({ icon: Icon, label, available }) => (
              <div
                key={label}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 14px", borderRadius: 10,
                  background: available ? "#F0FDF4" : "#F8FAFC",
                  border: `1px solid ${available ? "#BBF7D0" : "#E2E8F0"}`,
                }}
              >
                <Icon size={14} color={available ? "#22C55E" : "#94A3B8"} />
                <span style={{ fontSize: 12, fontWeight: 600, color: available ? "#166534" : "#94A3B8" }}>{label}</span>
                {!available && <X size={10} color="#94A3B8" />}
              </div>
            ))}
          </div>
        </div>

        {/* Operating Hours */}
        <div style={{ padding: "20px", background: "#ffffff", marginTop: 8, borderBottom: "1px solid #E2E8F0" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: "0 0 12px" }}>Operating Hours</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {hours.map(({ day, time }) => (
              <div key={day} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Clock size={13} color="#64748B" />
                  <span style={{ fontSize: 13, color: "#475569" }}>{day}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>{time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Plans */}
        <div style={{ padding: "20px", background: "#ffffff", marginTop: 8, borderBottom: "1px solid #E2E8F0" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: "0 0 14px" }}>Membership Plans</h3>
          <div style={{ display: "flex", gap: 10 }}>
            {plans.map((plan) => (
              <div
                key={plan.name}
                style={{
                  flex: 1, padding: "14px 10px", borderRadius: 16, textAlign: "center",
                  background: plan.highlight ? "#2563EB" : "#F8FAFC",
                  border: plan.highlight ? "none" : "1.5px solid #E2E8F0",
                  position: "relative",
                }}
              >
                {plan.highlight && (
                  <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", background: "#22C55E", borderRadius: 6, padding: "2px 8px" }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: "#ffffff" }}>POPULAR</span>
                  </div>
                )}
                <p style={{ fontSize: 11, fontWeight: 600, color: plan.highlight ? "rgba(255,255,255,0.8)" : "#64748B", margin: "0 0 4px" }}>{plan.name}</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: plan.highlight ? "#ffffff" : "#0F172A", margin: "0 0 2px" }}>{plan.price}</p>
                <p style={{ fontSize: 10, color: plan.highlight ? "rgba(255,255,255,0.7)" : "#94A3B8", margin: 0 }}>{plan.period}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Preview */}
        <div style={{ padding: "20px", background: "#ffffff", marginTop: 8, borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: 0 }}>Reviews</h3>
            <button onClick={onReviews} style={{ fontSize: 13, color: "#2563EB", fontWeight: 600, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 2 }}>
              View all <ChevronRight size={13} />
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {reviewSamples.map((r) => (
              <div key={r.name} style={{ display: "flex", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#ffffff" }}>{r.avatar}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{r.name}</span>
                    <div style={{ display: "flex" }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={10} fill={s <= r.rating ? "#F59E0B" : "#E2E8F0"} color={s <= r.rating ? "#F59E0B" : "#E2E8F0"} />
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, margin: 0 }}>{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Businesses */}
        <div style={{ padding: "20px", background: "#ffffff", marginTop: 8 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: "0 0 14px" }}>Similar Nearby</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {relatedBusinesses.map((b) => (
              <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px", background: "#F8FAFC", borderRadius: 14, border: "1px solid #E2E8F0" }}>
                <img src={b.image} alt={b.name} style={{ width: 48, height: 48, borderRadius: 12, objectFit: "cover", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", margin: "0 0 2px" }}>{b.name}</p>
                  <p style={{ fontSize: 11, color: "#64748B", margin: 0 }}>{b.category}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Star size={11} fill="#F59E0B" color="#F59E0B" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#0F172A" }}>{b.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div style={{
        position: "absolute", bottom: 64, left: 0, right: 0,
        background: "#ffffff", borderTop: "1px solid #E2E8F0",
        padding: "12px 20px",
      }}>
        <button
          onClick={() => setShowBooking(true)}
          style={{
            width: "100%", padding: "15px", borderRadius: 16,
            background: "linear-gradient(135deg, #1D4ED8, #2563EB)",
            border: "none", cursor: "pointer",
            fontSize: 15, fontWeight: 700, color: "#ffffff",
            boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
          }}
        >
          Book a Session
        </button>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div
          style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", zIndex: 100 }}
          onClick={() => setShowBooking(false)}
        >
          <div
            style={{ width: "100%", background: "#ffffff", borderRadius: "24px 24px 0 0", padding: "24px 20px 40px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ width: 40, height: 4, borderRadius: 2, background: "#E2E8F0", margin: "0 auto 20px" }} />
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>Contact {biz.name}</h3>
            <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 20px" }}>Choose how you'd like to get in touch</p>
            {[
              { label: "Call Now", detail: biz.phone, icon: Phone, color: "#2563EB", bg: "#EFF6FF" },
              { label: "Get Directions", detail: biz.address, icon: Navigation, color: "#22C55E", bg: "#F0FDF4" },
              { label: "Visit Website", detail: biz.website, icon: Globe, color: "#8B5CF6", bg: "#F5F3FF" },
            ].map(({ label, detail, icon: Icon, color, bg }) => (
              <button
                key={label}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 16px", background: bg, borderRadius: 14,
                  border: "none", cursor: "pointer", marginBottom: 10,
                }}
              >
                <div style={{ width: 42, height: 42, borderRadius: 12, background: color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={20} color="#ffffff" />
                </div>
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", margin: "0 0 2px" }}>{label}</p>
                  <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>{detail}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
