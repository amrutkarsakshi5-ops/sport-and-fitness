import { Dumbbell, MapPin, Users, Calendar, Star, ChevronRight, Zap, Mail } from "lucide-react";

interface SplashScreenProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

const features = [
  { icon: MapPin,   color: "#2563EB", bg: "#EFF6FF", title: "Discover Nearby",  desc: "Find gyms, studios & coaches near Austin" },
  { icon: Users,    color: "#16A34A", bg: "#F0FDF4", title: "Expert Coaches",   desc: "Connect with certified fitness professionals" },
  { icon: Calendar, color: "#D97706", bg: "#FFFBEB", title: "Live Events",      desc: "Join runs, yoga sessions & competitions" },
  { icon: Star,     color: "#9333EA", bg: "#F5F3FF", title: "Trusted Reviews",  desc: "Real ratings from Austin's fitness community" },
];

export function SplashScreen({ onGetStarted, onSignIn }: SplashScreenProps) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#ffffff", overflowY: "auto" }}>

      {/* ── Hero ── */}
      <div style={{ background: "linear-gradient(160deg,#0F172A 0%,#1E3A5F 45%,#2563EB 100%)", padding: "60px 28px 36px", position: "relative", overflow: "hidden", flexShrink: 0 }}>
        {[[180, -50, -50], [110, 30, 55], [55, 22, 115]].map(([s, t, r], i) => (
          <div key={i} style={{ position: "absolute", width: s, height: s, borderRadius: s / 2, border: "1px solid rgba(255,255,255,0.1)", top: t, right: r, pointerEvents: "none" }} />
        ))}

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <div style={{ width: 54, height: 54, borderRadius: 17, background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(37,99,235,0.5)", border: "2px solid rgba(255,255,255,0.2)" }}>
            <Dumbbell size={26} color="#ffffff" />
          </div>
          <div>
            <p style={{ fontSize: 25, fontWeight: 800, color: "#ffffff", margin: "0 0 2px", letterSpacing: -0.5 }}>FitAustin</p>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: 4, background: "#22C55E" }} />
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", margin: 0 }}>Austin's #1 Fitness Directory</p>
            </div>
          </div>
        </div>

        <h1 style={{ fontSize: 27, fontWeight: 800, color: "#ffffff", margin: "0 0 10px", lineHeight: 1.2 }}>
          Your Austin Fitness{"\n"}Journey Starts Here
        </h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", margin: "0 0 24px", lineHeight: 1.6 }}>
          Discover 500+ gyms, trainers, and studios. Book classes, join events, and transform your health.
        </p>

        <div style={{ display: "flex", background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: "14px 20px" }}>
          {[["500+", "Venues"], ["200+", "Coaches"], ["12K+", "Members"]].map(([val, lbl], i) => (
            <div key={lbl} style={{ flex: 1, textAlign: "center", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.15)" : "none" }}>
              <p style={{ fontSize: 19, fontWeight: 800, color: "#ffffff", margin: "0 0 2px" }}>{val}</p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", margin: 0 }}>{lbl}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features card ── */}
      <div style={{ flex: 1, background: "#F8FAFC", padding: "0 20px 24px" }}>
        <div style={{ background: "#ffffff", borderRadius: "20px 20px 16px 16px", marginTop: -16, padding: "24px 20px", boxShadow: "0 -4px 16px rgba(0,0,0,0.06)" }}>

          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 18 }}>
            <Zap size={15} color="#2563EB" fill="#2563EB" />
            <p style={{ fontSize: 12, fontWeight: 700, color: "#2563EB", margin: 0, textTransform: "uppercase", letterSpacing: 0.7 }}>Why FitAustin?</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 26 }}>
            {features.map(({ icon: Icon, color, bg, title, desc }) => (
              <div key={title} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={20} color={color} strokeWidth={2} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", margin: "0 0 2px" }}>{title}</p>
                  <p style={{ fontSize: 12, color: "#64748B", margin: 0, lineHeight: 1.5 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onGetStarted}
            style={{ width: "100%", padding: "15px", borderRadius: 14, background: "linear-gradient(135deg,#1D4ED8,#2563EB)", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700, color: "#ffffff", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, boxShadow: "0 4px 16px rgba(37,99,235,0.35)" }}
          >
            Get Started — It's Free <ChevronRight size={17} />
          </button>

          <button
            onClick={onSignIn}
            style={{ width: "100%", padding: "14px", borderRadius: 14, background: "#F8FAFC", border: "1.5px solid #E2E8F0", cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            <Mail size={16} color="#64748B" /> I already have an account — Sign In
          </button>

          <p style={{ textAlign: "center", fontSize: 11, color: "#94A3B8", margin: "14px 0 0", lineHeight: 1.6 }}>
            By continuing you agree to our <span style={{ color: "#2563EB", fontWeight: 600 }}>Terms</span> &amp; <span style={{ color: "#2563EB", fontWeight: 600 }}>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
