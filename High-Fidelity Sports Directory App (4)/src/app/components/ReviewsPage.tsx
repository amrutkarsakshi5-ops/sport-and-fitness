import { useState, useEffect } from "react";
import { ArrowLeft, Star, ThumbsUp, Plus, Camera, X } from "lucide-react";
import type { Screen } from "./BottomNav";

interface ReviewsPageProps {
  businessId: string;
  onNavigate: (screen: Screen) => void;
}

/* ──────────────────────────────────────────────
   REVIEW TYPE
────────────────────────────────────────────── */
interface Review {
  id: string;
  name: string;
  avatar: string;
  avatarColor: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
  images: string[];
}

/* ──────────────────────────────────────────────
   PER-BUSINESS REVIEWS REGISTRY
   Keyed by businessId; every listing type has
   its own contextually relevant reviews.
────────────────────────────────────────────── */
const reviewsDB: Record<string, Review[]> = {
  /* Iron Temple Gym */
  "1": [
    {
      id: "r1-1", name: "Sarah Mitchell", avatar: "SM", avatarColor: "#2563EB",
      rating: 5, date: "Jun 10, 2026",
      text: "Absolutely love Iron Temple! The equipment is state-of-the-art, the staff are incredibly welcoming, and the community vibe is unlike any other gym in Austin. Eight months in and it's genuinely transformed my fitness.",
      helpful: 24, images: ["https://images.unsplash.com/photo-1497369753325-69e1f26b7f56?w=200&h=150&fit=crop&auto=format"],
    },
    {
      id: "r1-2", name: "Jason Rodriguez", avatar: "JR", avatarColor: "#22C55E",
      rating: 5, date: "Jun 5, 2026",
      text: "Best gym I've been to in Austin. The coaches are knowledgeable and genuinely care about your progress. Clean facilities, great equipment, and a supportive community. Highly recommend!",
      helpful: 18, images: [],
    },
    {
      id: "r1-3", name: "Emily Chen", avatar: "EC", avatarColor: "#8B5CF6",
      rating: 4, date: "May 28, 2026",
      text: "Great gym overall. The free weights section is excellent and there's always space even during peak hours. My only minor gripe is that parking can get busy on weekday evenings.",
      helpful: 12, images: [],
    },
    {
      id: "r1-4", name: "Marcus Thompson", avatar: "MT", avatarColor: "#F59E0B",
      rating: 5, date: "May 20, 2026",
      text: "Personal training sessions here are worth every penny. My trainer Daniel helped me achieve more in 3 months than I did in 2 years at my old gym. The programming is legit.",
      helpful: 31, images: ["https://images.unsplash.com/photo-1514512364185-4c2b0985be01?w=200&h=150&fit=crop&auto=format"],
    },
    {
      id: "r1-5", name: "Aisha Patel", avatar: "AP", avatarColor: "#EF4444",
      rating: 4, date: "May 12, 2026",
      text: "Solid gym with great atmosphere. Group classes are well-structured and coaches are motivating. Would love to see more cardio machines added, but overall a great experience.",
      helpful: 9, images: [],
    },
  ],

  /* Zen Flow Yoga Studio */
  "2": [
    {
      id: "r2-1", name: "Priya Sharma", avatar: "PS", avatarColor: "#F59E0B",
      rating: 5, date: "Jun 12, 2026",
      text: "Zen Flow completely changed my relationship with yoga. The instructors are incredibly patient and knowledgeable. The studio space is beautiful — calm, airy, and perfectly lit. I come three times a week now.",
      helpful: 37, images: ["https://images.unsplash.com/photo-1599447421321-1c96150f0f6b?w=200&h=150&fit=crop&auto=format"],
    },
    {
      id: "r2-2", name: "Daniel Park", avatar: "DP", avatarColor: "#22C55E",
      rating: 5, date: "Jun 8, 2026",
      text: "The Yin Yoga classes here are phenomenal. Perfect for recovery days. The instructor guides you through every pose with such care. The heated studio is a bonus in winter.",
      helpful: 22, images: [],
    },
    {
      id: "r2-3", name: "Laura Kim", avatar: "LK", avatarColor: "#EC4899",
      rating: 4, date: "May 30, 2026",
      text: "Wonderful studio with a warm community. The Power Pilates class is challenging and effective. My only note is that booking slots fill up quickly — wish there were more evening sessions.",
      helpful: 14, images: [],
    },
    {
      id: "r2-4", name: "Tom Henderson", avatar: "TH", avatarColor: "#2563EB",
      rating: 5, date: "May 18, 2026",
      text: "I was a yoga skeptic before coming here. Two months in and I'm hooked. The beginner classes are welcoming and the instructors make modifications accessible for every level.",
      helpful: 19, images: [],
    },
  ],

  /* CrossFit Capital */
  "4": [
    {
      id: "r4-1", name: "Jake Rivera", avatar: "JR", avatarColor: "#A855F7",
      rating: 5, date: "Jun 11, 2026",
      text: "CrossFit Capital is the real deal. The coaches program intelligently and scale workouts for every fitness level. The community accountability keeps me showing up even on hard days.",
      helpful: 41, images: ["https://images.unsplash.com/photo-1497369753325-69e1f26b7f56?w=200&h=150&fit=crop&auto=format"],
    },
    {
      id: "r4-2", name: "Mia Torres", avatar: "MT", avatarColor: "#EF4444",
      rating: 4, date: "Jun 3, 2026",
      text: "Great box with passionate coaches. The WODs are varied and always challenging. The community here is second to none — everyone cheers you on to finish. Facilities are clean and well-equipped.",
      helpful: 17, images: [],
    },
    {
      id: "r4-3", name: "Sam Nguyen", avatar: "SN", avatarColor: "#22C55E",
      rating: 5, date: "May 25, 2026",
      text: "Best CrossFit affiliate in Austin, no contest. The programming is thoughtful, the coaches are certified and attentive, and the WODs hit different here. Signed up for the annual membership.",
      helpful: 28, images: [],
    },
    {
      id: "r4-4", name: "Rachel Bloom", avatar: "RB", avatarColor: "#F59E0B",
      rating: 4, date: "May 15, 2026",
      text: "Love the culture here. Everyone is welcoming regardless of skill level. I went from zero pull-ups to five unbroken in two months. The skill work is built into every session, which I appreciate.",
      helpful: 11, images: [],
    },
  ],

  /* Coach Marcus – PT */
  "5": [
    {
      id: "r5-1", name: "Chris Bailey", avatar: "CB", avatarColor: "#2563EB",
      rating: 5, date: "Jun 9, 2026",
      text: "Marcus is the best personal trainer I've worked with. He customised my programme completely around my injury history and goals. In 10 weeks I hit a 20 kg deadlift PR without pain. Absolute professional.",
      helpful: 53, images: [],
    },
    {
      id: "r5-2", name: "Nina Foster", avatar: "NF", avatarColor: "#22C55E",
      rating: 5, date: "May 28, 2026",
      text: "I was intimidated going into PT for the first time but Marcus made me feel completely at ease. Sessions are structured, focused, and genuinely fun. I've dropped 8 kg in 3 months and feel stronger than ever.",
      helpful: 38, images: ["https://images.unsplash.com/photo-1514512364185-4c2b0985be01?w=200&h=150&fit=crop&auto=format"],
    },
    {
      id: "r5-3", name: "Omar Khalil", avatar: "OK", avatarColor: "#D97706",
      rating: 5, date: "May 10, 2026",
      text: "Worth every cent. Marcus knows sport science and nutrition inside out. He doesn't just count reps — he teaches you WHY you're doing each exercise. That understanding has made me a better self-coached athlete too.",
      helpful: 21, images: [],
    },
  ],

  /* NutriLife Austin */
  "6": [
    {
      id: "r6-1", name: "Amelia Grant", avatar: "AG", avatarColor: "#EC4899",
      rating: 5, date: "Jun 7, 2026",
      text: "NutriLife completely transformed my approach to food. My dietician took time to understand my lifestyle, cooking habits, and health goals. The meal plan is practical, delicious, and sustainable — not just a generic calorie target.",
      helpful: 29, images: [],
    },
    {
      id: "r6-2", name: "Kevin Park", avatar: "KP", avatarColor: "#22C55E",
      rating: 4, date: "Jun 1, 2026",
      text: "Very professional service. The consultation was thorough and the follow-up support via their app is really helpful. I've lost 5 kg in 6 weeks without feeling deprived. Highly recommend for anyone serious about nutrition.",
      helpful: 16, images: ["https://images.unsplash.com/photo-1644704170910-a0cdf183649b?w=200&h=150&fit=crop&auto=format"],
    },
    {
      id: "r6-3", name: "Sofia Reyes", avatar: "SR", avatarColor: "#9333EA",
      rating: 5, date: "May 22, 2026",
      text: "Finally a nutritionist who doesn't just push supplements! The team here are evidence-based, practical, and genuinely invested in your progress. My energy levels are through the roof.",
      helpful: 22, images: [],
    },
  ],

  /* Barton Springs Fitness */
  "7": [
    {
      id: "r7-1", name: "Tyler Webb", avatar: "TW", avatarColor: "#2563EB",
      rating: 5, date: "Jun 6, 2026",
      text: "Hidden gem in Austin. Barton Springs Fitness has everything you need without the crowds of the big chains. The 24-hour access is a lifesaver for early morning sessions before work.",
      helpful: 18, images: [],
    },
    {
      id: "r7-2", name: "Hannah Mills", avatar: "HM", avatarColor: "#F59E0B",
      rating: 4, date: "May 29, 2026",
      text: "Really solid gym. The equipment is well maintained and they've added a proper squat rack area recently. Staff are friendly and the price point is excellent for the quality you get.",
      helpful: 13, images: ["https://images.unsplash.com/photo-1641159955647-1be5a28c7402?w=200&h=150&fit=crop&auto=format"],
    },
    {
      id: "r7-3", name: "Carlos Diaz", avatar: "CD", avatarColor: "#16A34A",
      rating: 5, date: "May 18, 2026",
      text: "Best value gym in South Austin. The steam room is a great post-workout bonus. The locker facilities are clean and the staff always greet you by name after a few visits.",
      helpful: 20, images: [],
    },
  ],
};

/* ──────────────────────────────────────────────
   RATING DISTRIBUTION — computed from reviews
────────────────────────────────────────────── */
function buildRatingDist(reviews: Review[]) {
  const counts = [0, 0, 0, 0, 0]; // index 0 = 1-star, 4 = 5-star
  reviews.forEach((r) => { if (r.rating >= 1 && r.rating <= 5) counts[r.rating - 1]++; });
  const total = reviews.length || 1;
  return [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: counts[stars - 1],
    pct: Math.round((counts[stars - 1] / total) * 100),
  }));
}

function avgRating(reviews: Review[]) {
  if (!reviews.length) return 0;
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
}

/* ──────────────────────────────────────────────
   SKELETON CARD
────────────────────────────────────────────── */
function SkeletonReview() {
  return (
    <div style={{ padding: "16px", background: "#ffffff", borderRadius: 18, border: "1px solid #E2E8F0" }}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.45}}`}</style>
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 20, background: "#F1F5F9", animation: "pulse 1.4s ease-in-out infinite" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ height: 12, width: "40%", borderRadius: 6, background: "#F1F5F9", animation: "pulse 1.4s ease-in-out infinite" }} />
          <div style={{ height: 10, width: "25%", borderRadius: 6, background: "#F1F5F9", animation: "pulse 1.4s ease-in-out infinite" }} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ height: 11, borderRadius: 4, background: "#F1F5F9", animation: "pulse 1.4s ease-in-out infinite" }} />
        <div style={{ height: 11, borderRadius: 4, background: "#F1F5F9", animation: "pulse 1.4s ease-in-out infinite", width: "80%" }} />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   EMPTY STATE
────────────────────────────────────────────── */
function EmptyReviews({ onWrite }: { onWrite: () => void }) {
  return (
    <div style={{ textAlign: "center", padding: "48px 24px" }}>
      <div style={{ width: 64, height: 64, borderRadius: 20, background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
        <Star size={28} color="#CBD5E1" />
      </div>
      <p style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", margin: "0 0 6px" }}>No reviews yet</p>
      <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 20px", lineHeight: 1.6 }}>
        Be the first to share your experience with this listing.
      </p>
      <button
        onClick={onWrite}
        style={{ padding: "11px 24px", background: "#2563EB", border: "none", borderRadius: 12, cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#ffffff", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}
      >
        Write a Review
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────
   BUSINESS META — derives title for the header
────────────────────────────────────────────── */
const businessMeta: Record<string, { name: string; category: string }> = {
  "1": { name: "Iron Temple Gym",        category: "Gym"              },
  "2": { name: "Zen Flow Yoga Studio",   category: "Yoga & Pilates"   },
  "4": { name: "CrossFit Capital",       category: "CrossFit"         },
  "5": { name: "Coach Marcus – PT",      category: "Personal Trainer" },
  "6": { name: "NutriLife Austin",       category: "Nutritionist"     },
  "7": { name: "Barton Springs Fitness", category: "Gym"              },
};

type FilterType = "recent" | "highest" | "lowest";

/* ──────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────── */
export function ReviewsPage({ businessId, onNavigate }: ReviewsPageProps) {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("recent");
  const [helpfulIds, setHelpfulIds] = useState<Set<string>>(new Set());
  const [showWrite, setShowWrite] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newText, setNewText] = useState("");

  /* Simulate async fetch: resolve in 700ms */
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, [businessId]);

  const rawReviews: Review[] = reviewsDB[businessId] ?? [];
  const meta = businessMeta[businessId] ?? { name: "Business", category: "Listing" };

  const sorted = [...rawReviews].sort((a, b) => {
    if (filter === "highest") return b.rating - a.rating;
    if (filter === "lowest")  return a.rating - b.rating;
    return 0; // "recent" keeps insertion order (already newest-first)
  });

  const dist = buildRatingDist(rawReviews);
  const avg  = avgRating(rawReviews).toFixed(1);

  const toggleHelpful = (id: string) =>
    setHelpfulIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#F8FAFC" }}>

      {/* ── Header ── */}
      <div style={{ background: "#ffffff", padding: "52px 20px 16px", borderBottom: "1px solid #E2E8F0", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <button
            onClick={() => onNavigate("profile")}
            style={{ width: 36, height: 36, borderRadius: 12, background: "#F1F5F9", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <ArrowLeft size={18} color="#0F172A" />
          </button>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: "0 0 1px" }}>Reviews</h1>
            <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>
              {meta.name}{" "}
              <span style={{ background: "#EFF6FF", color: "#2563EB", fontWeight: 700, fontSize: 10, padding: "1px 7px", borderRadius: 20 }}>
                {meta.category}
              </span>
            </p>
          </div>
        </div>

        {/* Rating summary — only when reviews exist and not loading */}
        {!loading && rawReviews.length > 0 && (
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 46, fontWeight: 800, color: "#0F172A", margin: 0, lineHeight: 1 }}>{avg}</p>
              <div style={{ display: "flex", justifyContent: "center", margin: "4px 0" }}>
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={13} fill={s <= Math.round(+avg) ? "#F59E0B" : "#E2E8F0"} color={s <= Math.round(+avg) ? "#F59E0B" : "#E2E8F0"} />
                ))}
              </div>
              <p style={{ fontSize: 11, color: "#64748B", margin: 0 }}>{rawReviews.length} review{rawReviews.length !== 1 ? "s" : ""}</p>
            </div>
            <div style={{ flex: 1 }}>
              {dist.map(({ stars, count, pct }) => (
                <div key={stars} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: "#64748B", width: 14, textAlign: "right" }}>{stars}</span>
                  <Star size={9} fill="#F59E0B" color="#F59E0B" />
                  <div style={{ flex: 1, height: 6, background: "#E2E8F0", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: "#F59E0B", borderRadius: 3, transition: "width 0.5s ease" }} />
                  </div>
                  <span style={{ fontSize: 11, color: "#94A3B8", width: 22, textAlign: "right" }}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Filter bar ── */}
      {!loading && rawReviews.length > 0 && (
        <div style={{ background: "#ffffff", padding: "10px 16px", borderBottom: "1px solid #E2E8F0", flexShrink: 0, display: "flex", gap: 6 }}>
          {([ ["recent", "Most Recent"], ["highest", "Highest Rated"], ["lowest", "Lowest Rated"] ] as [FilterType, string][]).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              style={{
                flexShrink: 0, padding: "6px 14px", borderRadius: 20,
                background: filter === val ? "#2563EB" : "#F8FAFC",
                border: filter === val ? "none" : "1.5px solid #E2E8F0",
                cursor: "pointer", fontSize: 12, fontWeight: 600,
                color: filter === val ? "#ffffff" : "#64748B",
                transition: "all 0.15s ease",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* ── List ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px", paddingBottom: 90 }}>

        {/* Loading skeletons */}
        {loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[1, 2, 3].map((i) => <SkeletonReview key={i} />)}
          </div>
        )}

        {/* Empty state */}
        {!loading && rawReviews.length === 0 && (
          <EmptyReviews onWrite={() => setShowWrite(true)} />
        )}

        {/* Reviews */}
        {!loading && sorted.map((review) => {
          const isHelpful = helpfulIds.has(review.id);
          return (
            <div
              key={review.id}
              style={{ padding: "16px", background: "#ffffff", borderRadius: 18, border: "1px solid #E2E8F0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)", marginBottom: 12 }}
            >
              {/* Author row */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 20, background: review.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#ffffff" }}>{review.avatar}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", margin: 0 }}>{review.name}</p>
                    <span style={{ fontSize: 11, color: "#94A3B8" }}>{review.date}</span>
                  </div>
                  <div style={{ display: "flex", gap: 1, marginTop: 3 }}>
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={12} fill={s <= review.rating ? "#F59E0B" : "#E2E8F0"} color={s <= review.rating ? "#F59E0B" : "#E2E8F0"} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Text */}
              <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, margin: "0 0 10px" }}>{review.text}</p>

              {/* Images */}
              {review.images.length > 0 && (
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  {review.images.map((img, i) => (
                    <img key={i} src={img} alt="Review" style={{ width: 80, height: 60, borderRadius: 10, objectFit: "cover", border: "1px solid #E2E8F0" }} />
                  ))}
                </div>
              )}

              {/* Helpful */}
              <button
                onClick={() => toggleHelpful(review.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "6px 12px",
                  background: isHelpful ? "#EFF6FF" : "#F8FAFC",
                  border: isHelpful ? "1px solid #BFDBFE" : "1px solid #E2E8F0",
                  borderRadius: 10, cursor: "pointer",
                  fontSize: 12, fontWeight: 600,
                  color: isHelpful ? "#2563EB" : "#64748B",
                  transition: "all 0.15s ease",
                }}
              >
                <ThumbsUp size={12} fill={isHelpful ? "#2563EB" : "none"} color={isHelpful ? "#2563EB" : "#64748B"} />
                Helpful · {review.helpful + (isHelpful ? 1 : 0)}
              </button>
            </div>
          );
        })}
      </div>

      {/* ── Write Review CTA ── */}
      {!loading && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#ffffff", borderTop: "1px solid #E2E8F0", padding: "12px 20px 20px" }}>
          <button
            onClick={() => setShowWrite(true)}
            style={{
              width: "100%", padding: "13px", borderRadius: 14,
              background: "linear-gradient(135deg,#1D4ED8,#2563EB)",
              border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#ffffff",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
            }}
          >
            <Plus size={16} /> Write a Review
          </button>
        </div>
      )}

      {/* ── Write Review modal ── */}
      {showWrite && (
        <>
          <div
            onClick={() => setShowWrite(false)}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100 }}
          />
          <div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "#ffffff", borderRadius: "24px 24px 0 0",
              padding: "20px 20px 40px", zIndex: 101,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0F172A", margin: 0 }}>Write a Review</h3>
              <button onClick={() => setShowWrite(false)} style={{ width: 30, height: 30, borderRadius: 9, background: "#F1F5F9", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <X size={14} color="#64748B" />
              </button>
            </div>

            <p style={{ fontSize: 12, color: "#64748B", margin: "0 0 10px" }}>Your rating for <strong>{meta.name}</strong></p>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {[1,2,3,4,5].map((s) => (
                <button key={s} onClick={() => setNewRating(s)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <Star size={30} fill={s <= newRating ? "#F59E0B" : "#E2E8F0"} color={s <= newRating ? "#F59E0B" : "#E2E8F0"} />
                </button>
              ))}
            </div>

            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder={`Share your experience at ${meta.name}...`}
              style={{
                width: "100%", minHeight: 100, padding: "12px 14px",
                background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 12,
                fontSize: 13, color: "#0F172A", fontFamily: "Inter, sans-serif",
                resize: "none", outline: "none", boxSizing: "border-box",
              }}
            />

            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#64748B" }}>
                <Camera size={14} /> Add Photo
              </button>
              <button
                onClick={() => setShowWrite(false)}
                style={{
                  flex: 1, padding: "10px",
                  background: newRating > 0 && newText ? "#2563EB" : "#E2E8F0",
                  borderRadius: 12, border: "none", cursor: "pointer",
                  fontSize: 14, fontWeight: 700,
                  color: newRating > 0 && newText ? "#ffffff" : "#94A3B8",
                  transition: "all 0.15s ease",
                }}
              >
                Post Review
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
