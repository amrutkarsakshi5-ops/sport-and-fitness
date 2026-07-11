# System Architecture & Technical Specifications

## 1. Tech Stack
- **Runtime Environment**: Node.js (v18+) with TypeScript
- **Web Framework**: Express.js (REST APIs)
- **Database**: PostgreSQL (Relational store)
- **Object-Relational Mapping (ORM)**: Prisma
- **Authentication Services**: Firebase Authentication (ID Token verification + Custom User Claims)
- **Payment Processing**: Razorpay (Orders, Webhooks, Transfers/Payouts)
- **Logging & Monitoring**: Winston & Morgan

---

## 2. System Architecture & Auth Flow
We use a hybrid Auth system. User identity and credentials are managed by Firebase. Database records track the user roles and business relationships. 

### Custom User Claims Setup
To enforce security boundaries without expensive database queries on every HTTP request, user roles are stored in Firebase's Custom User Claims:
- Claims payload: `{ "role": "SUPER_ADMIN" | "VENDOR_ADMIN" | "VENDOR_STAFF" | "CUSTOMER" }`
- Token validation middleware decodes the ID token and validates the claim directly.

---

## 3. Database Schema Layout (PostgreSQL)

We organize the database entities as follows:
- **User**: System user accounts (mapped 1:1 with Firebase UID).
- **Vendor**: Gym / Studio business entities.
- **VendorStaff**: Intersection table mapping users to their vendor company.
- **VendorBranch**: Physical location details with geolocation coordinates.
- **Trainer**: Coaches and trainers working at the gym/studio.
- **Service**: Service offerings (classes, memberships).
- **ClassSchedule**: Weekly schedule intervals and time blocks.
- **Booking**: Customer bookings of services.
- **Transaction**: Payment processing tracking record.
- **Payout**: Payout settlements transfer ledger to vendors.
- **Review**: Ratings feedback from customers.

---

## 4. API Endpoint Map

### Auth & Onboarding Router
- `POST /api/v1/auth/verify-token` — Validates Firebase JWT, maps to local User record, establishes Custom Claims.
- `POST /api/v1/auth/onboard-vendor` — Initiates a new Vendor onboarding request.

### Super Admin Router (`/api/v1/admin`)
- `GET /dashboard/metrics` — Global KPI reports.
- `GET /vendors/pending` — List of pending vendor signups.
- `PATCH /vendors/:id/approve` — Promotes vendor to `APPROVED` and activates their portal access.
- `PATCH /vendors/:id/commission` — Updates vendor-specific commission overrides.
- `GET /reports/payouts` — Track payout balances and historical transfers.

### Vendor Manager Router (`/api/v1/vendor`)
- `GET /dashboard/metrics` — Business KPI cards (gross revenues, booking ratios).
- `GET /services` — List all services.
- `POST /services` — Create a new class category.
- `PUT /services/:id` — Update pricing, capacity, or branch assignment.
- `DELETE /services/:id` — Soft-delete class service.
- `GET /bookings` — Paginated bookings ledger.
- `PATCH /bookings/:id/status` — Modify booking status (`CONFIRMED`, `COMPLETED`, `CANCELLED`).
- `GET /calendar` — Get schedules and time blocks.
- `POST /calendar/events` — Map new class schedules.
- `GET /customers` — View customer profile list with LTV and tier markers.
- `GET /payments` — Financial reports and payout summaries.
- `POST /reviews/:id/reply` — Submit response comments.
