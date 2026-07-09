import { useState } from "react";
import { BottomNav, type Screen } from "./components/BottomNav";
import { SplashScreen } from "./components/SplashScreen";
import { HomePage } from "./components/HomePage";
import { SearchPage } from "./components/SearchPage";
import { BusinessDetailPage } from "./components/BusinessDetailPage";
import { EventsPage } from "./components/EventsPage";
import { EventDetailPage } from "./components/EventDetailPage";
import { FavoritesPage } from "./components/FavoritesPage";
import { ReviewsPage } from "./components/ReviewsPage";
import { ProfilePage } from "./components/ProfilePage";
import { AuthPage } from "./components/AuthPage";
import { AdminDashboard } from "./components/AdminDashboard";
import { CategoryPage } from "./components/CategoryPage";

/* MARKER-MAKE-KIT-INVOKED */
/* MARKER-MAKE-KIT-DISCOVERY-READ */

const PHONE_W = 393;
const PHONE_H = 852;

function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0F172A 0%, #1E3A5F 45%, #2563EB 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div style={{ position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", borderRadius: 20, padding: "6px 16px" }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: "#22C55E" }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 500, fontFamily: "Inter, sans-serif" }}>
            FitAustin — Austin Sports & Fitness Directory
          </span>
        </div>
      </div>

      <div
        style={{
          width: PHONE_W,
          height: PHONE_H,
          maxWidth: "100%",
          maxHeight: "calc(100vh - 80px)",
          background: "#ffffff",
          borderRadius: 52,
          overflow: "hidden",
          position: "relative",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.15), 0 0 0 8px rgba(0,0,0,0.5), 0 40px 80px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", width: 120, height: 34, background: "#000000", borderRadius: 17, zIndex: 200 }} />
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {children}
        </div>
      </div>

      <div style={{ position: "absolute", left: `calc(50% - ${PHONE_W / 2 + 14}px)`, top: "calc(50% - 40px)", width: 4, height: 80, background: "rgba(255,255,255,0.25)", borderRadius: 2 }} />
      <div style={{ position: "absolute", right: `calc(50% - ${PHONE_W / 2 + 14}px)`, top: "calc(50% - 50px)", width: 4, height: 60, background: "rgba(255,255,255,0.25)", borderRadius: 2 }} />
    </div>
  );
}

const BOTTOM_NAV_SCREENS: Screen[] = ["home", "search", "events", "profile"];

export default function App() {
  const [screen, setScreen] = useState<Screen | "splash">("splash");
  const [authInitMode, setAuthInitMode] = useState<"login" | "register">("login");
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>("1");
  const [selectedEventId, setSelectedEventId] = useState<string>("e1");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("gym");

  const handleNavigate = (s: Screen | "splash") => setScreen(s);

  const showBottomNav =
    screen !== "splash" &&
    screen !== "admin" &&
    screen !== "auth" &&
    (BOTTOM_NAV_SCREENS.includes(screen as Screen) ||
      screen === "favorites" ||
      screen === "reviews" ||
      screen === "business-detail" ||
      screen === "event-detail" ||
      screen === "category");

  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return (
          <SplashScreen
            onGetStarted={() => { setAuthInitMode("register"); setScreen("auth"); }}
            onSignIn={() => { setAuthInitMode("login"); setScreen("auth"); }}
          />
        );
      case "home":
        return <HomePage onNavigate={handleNavigate} onSelectBusiness={setSelectedBusinessId} onSelectEvent={setSelectedEventId} onSelectCategory={setSelectedCategoryId} />;
      case "category":
        return <CategoryPage categoryId={selectedCategoryId} onNavigate={handleNavigate} onSelectBusiness={setSelectedBusinessId} />;
      case "search":
        return <SearchPage onNavigate={handleNavigate} onSelectBusiness={setSelectedBusinessId} />;
      case "business-detail":
        return <BusinessDetailPage businessId={selectedBusinessId} onNavigate={handleNavigate} onReviews={() => setScreen("reviews")} />;
      case "events":
        return <EventsPage onNavigate={handleNavigate} onSelectEvent={setSelectedEventId} />;
      case "event-detail":
        return <EventDetailPage eventId={selectedEventId} onNavigate={handleNavigate} />;
      case "favorites":
        return <FavoritesPage onNavigate={handleNavigate} onSelectBusiness={setSelectedBusinessId} />;
      case "reviews":
        return <ReviewsPage businessId={selectedBusinessId} onNavigate={handleNavigate} />;
      case "profile":
        return <ProfilePage onNavigate={handleNavigate} />;
      case "auth":
        return <AuthPage initialMode={authInitMode} onNavigate={handleNavigate} />;
      case "admin":
        return <AdminDashboard onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} onSelectBusiness={setSelectedBusinessId} onSelectEvent={setSelectedEventId} />;
    }
  };

  return (
    <PhoneShell>
      {renderScreen()}
      {showBottomNav && (
        <BottomNav active={screen as Screen} onNavigate={handleNavigate} />
      )}
    </PhoneShell>
  );
}
