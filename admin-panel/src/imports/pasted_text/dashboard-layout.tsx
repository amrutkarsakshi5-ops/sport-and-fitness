You are an expert frontend engineer. Generate a production-ready, high-fidelity React component (or set of component modules) for an enterprise SaaS dashboard called "Active Enterprise"—a Sports & Fitness Vendor Portal serving Austin, Texas. 

Follow these strict design token specs, layout architectures, and modular state requirements:

---

## 1. DESIGN SYSTEM & TOKENS

### Color Palette (Apply via Tailwind CSS utility classes or inline variables):
- **Primary / Brand Accent**: Austin Orange (`#FF5F1F`). Use for active navigation states, primary CTAs, KPI micro-trends, and active chart fills.
- **Supporting Neutral Dark**: Deep Slate (`#0F172A`). Use for the sidebar container, main headers, and primary typography.
- **Success State**: Success Green (`#10B981`). Use for revenue growth percentages, positive trends, and "Completed" badges.
- **Background Application**: Main app workspace background must be Soft Gray (`#F8FAFC`). Core dashboard cards must be Crisp White (`#FFFFFF`). All borders must be Subtle Slate (`#E2E8F0`).

### Typography:
- Headings & Primary UI Actions: Set font family to 'Hanken Grotesk' or system Sans-Serif Bold for a premium enterprise aesthetic.
- Body Copy & Tabular Metrics: Set font family to 'Inter'. Ensure all numbers in data tables use monospace tabular layouts (`font-variant-numeric: tabular-nums` / `tabular-nums`) to protect grid alignment.

---

## 2. APP LAYOUT ARCHITECTURE (Desktop-First Grid)

Implement a sticky layout consisting of:
1. **Left Navigation Sidebar**: 
   - Fixed width, full height (`h-screen`), background styled in Deep Slate (`#0F172A`).
   - Links: Dashboard, Bookings, Calendar, Services, Customers, Memberships, Payments, Reviews, Promotions, Analytics, Notifications, Support, Settings.
   - Active route styling: Left indicator border or background tile utilizing Austin Orange (`#FF5F1F`).
2. **Main Application Frame**:
   - Scrollable workspace with background `#F8FAFC`.
   - **Sticky Top Header**: Clean layout containing a Global Search Input, Notification/Message icons with badges, a user Profile Avatar dropdown, and a prominent "+ Quick Add" action button.

---

## 3. SCREEN COMPONENT IMPLEMENTATIONS

Implement state-driven UI modules or tab panels for the following sections:

### A. Dashboard Overview Screen
- **6 KPI Grid Rows**: Create responsive metric cards for [Total Bookings, Today's Sessions, Monthly Revenue, Active Customers, Membership Sales, Average Rating]. Include a mini-trend tag (e.g., "+12.3% vs last month") utilizing Success Green or Austin Orange indicators.
- **Main Analytics Workspace**: 
  - Left panel: A high-fidelity mock SVG Line Chart depicting 'Revenue Analytics' (Daily, Weekly, Monthly toggles).
  - Right panel: A Donut Chart breakout displaying 'Booking Status' distributions [Pending, Confirmed, Completed, Cancelled].
- **Upcoming Sessions Table**: Data grid mapping Customer profiles, selected Service, Time slots, Trainer assignments, and Status Badges.

### B. Bookings Management Screen
- **Filter Row Component**: Fully styled input bar for Date Range picker, Service Type dropdown, Booking Status selector, and Customer lookup.
- **Enterprise Data Table**: Render standard columns [Booking ID, Customer, Service, Date, Time, Payment Status, Booking Status]. 
- Include interactive button controls on rows for `[Accept]`, `[Reject]`, and `[Reschedule]`. 
- Integrate a hidden/toggleable HTML Side Drawer component showing deep detailed booking snapshots upon clicking a row.

### C. Interactive Calendar Screen
- Build a Google Calendar-inspired scheduling block grid interface layout customizable across [Day / Week / Month] tabs.
- Model data blocks to distinctly highlight Trainer availability zones, booked operational sessions, blocked personal slots, and local holidays.

### D. Services Management Screen
- Render a dynamic Card Grid displaying current active fitness tiers (e.g., Personal Training, Yoga Classes, Basketball Coaching, CrossFit Training).
- Each card must explicitly show: Service Image placeholder, Category Badge, Duration, Capacity, Price tag, and an Action Menu icon dot grouping `[Edit, Pause, Duplicate, Delete]`.

### E. Customer Directory (CRM Hub)
- Setup segment filters at the top: `[All, New, Active, VIP, At Risk]`.
- Build an advanced data row table featuring circular User Avatars alongside stacked layout data fields for Name/Email, Membership class tier, completed sessions counters, and Lifetime Value ($ LTV).

### F. Membership & Subscription Sub-Panel
- Pricing-card style grid presenting active tiers: Basic, Pro, and Elite. 
- Map metric summaries within each card for active subscriber enrollment counts, revenue generated, and monthly retention/renewal percentage outputs.

### G. Payments & Stripe-Style Wallet
- Stripe-inspired balance dashboard.
- Display a top row summary of: Wallet Balance, Pending Payouts, Gross Monthly Earnings, and Platform Processing Fees.
- Append a clean ledger table listing recent granular financial transaction histories.

### H. Reviews & Feedback Center
- Render a sentiment distribution layout bar chart (5-star down to 1-star breakouts).
- Provide feedback component logs displaying customer quotes, date logs, stars, and contextual management toggles for `[Reply, Flag, Resolve]`.

### I. Empty State Fallbacks
- Provide conditional state handling where, if an item list array is empty, a beautiful fallback card is rendered using a clean SVG placeholder icon, motivational messaging ("No services created yet"), and a clear action button ("Add your first fitness service").

---

## 4. CODE EXECUTION CODE REQUIREMENTS
- Use highly semantic HTML elements (`<aside>`, `<main>`, `<header>`, `<table>`, `<nav>`).
- Ensure all states (modals, dropdowns, active side drawers) use local React state hooks (`useState`) so the prototype is interactive.
- Optimize all borders, spacing ratios, and padding parameters to emulate Stripe Dashboard and ClassPass Partner Hub guidelines. Output clean, fully un-truncated functional code.