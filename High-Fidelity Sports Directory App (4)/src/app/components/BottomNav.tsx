import { Home, Search, Calendar, User } from "lucide-react";

export type Screen =
  | "home"
  | "search"
  | "events"
  | "profile"
  | "favorites"
  | "business-detail"
  | "event-detail"
  | "reviews"
  | "auth"
  | "admin"
  | "category";

interface BottomNavProps {
  active: Screen;
  onNavigate: (screen: Screen) => void;
}

const tabs = [
  { id: "home" as Screen, label: "Home", icon: Home },
  { id: "search" as Screen, label: "Search", icon: Search },
  { id: "events" as Screen, label: "Events", icon: Calendar },
  { id: "profile" as Screen, label: "Profile", icon: User },
];

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  const activeTab = ["home", "search", "events", "profile"].includes(active)
    ? active
    : active === "favorites" || active === "reviews" || active === "admin"
    ? "profile"
    : active === "business-detail" || active === "category"
    ? "search"
    : active === "event-detail"
    ? "events"
    : "home";

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#ffffff",
        borderTop: "1px solid #E2E8F0",
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
        zIndex: 50,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", paddingTop: 8, paddingBottom: 8 }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                padding: "6px 16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: isActive ? "#2563EB" : "#94A3B8",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ position: "relative" }}>
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  style={{ transition: "all 0.2s ease" }}
                />
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: -4,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: "#2563EB",
                    }}
                  />
                )}
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: 0.3,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
