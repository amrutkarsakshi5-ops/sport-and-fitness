# Product Requirements Document (PRD) - Sports & Fitness Discovery Platform

## 1. Product Overview
The Sports & Fitness Discovery Platform enables customers to discover gym sessions, trainer classes, wellness activities, and sports programs. This backend system supports the **Super Admin Panel** (for platform moderation, vendor KYC approval, and financial oversight) and the **Vendor Management Backend** (for gym owners, studios, and coaches to manage schedules, bookings, trainers, and revenue payouts).

---

## 2. Target Users & Personas
- **Super Admin (Platform Owner)**: Oversees platform health, approves and configures commission splits for onboarding vendors, verifies KYC documentations, and monitors transactions.
- **Vendor Admin (Gym/Studio Owner)**: Registers physical branch locations, configures class services, assigns trainers to timetables, manages customer bookings, and tracks revenue.
- **Vendor Staff (Front Desk/Coaches)**: Views daily timetables, checks attendee check-ins, and manages calendar session overrides.

---

## 3. Core Backend Features (V1 In Scope)

### 3.1 Super Admin Module
- **Vendor Approvals & KYC Verification**: Review business licenses, tax registrations, and change statuses (`PENDING`, `APPROVED`, `REJECTED`, `SUSPENDED`).
- **Commission Split Configuration**: Set global or per-vendor percentage splits.
- **Platform Invoices & Financial Reports**: Audit platform commission fee income, net sales, and pending settlements.

### 3.2 Vendor Management Module
- **Service & Category Directory**: CRUD operations for activities under predefined classes (`FITNESS`, `WELLNESS`, `SPORTS`, `HIIT`, `NUTRITION`, `RECOVERY`).
- **Trainer Management**: CRUD for certified instructors, specialties, and statuses.
- **Dynamic Class Scheduler**: Multi-tier scheduling (regular days of week, blocked slots, specific dates).
- **Booking Lifecycle Handlers**: Process bookings from `PENDING` -> `CONFIRMED` or `CANCELLED`, and complete bookings with check-in.
- **Payment Reconciliation Ledger**: Track sales transactions, platform fees, gateway fees, and net vendor payout shares.
- **Ratings & Reviews Moderator**: Fetch scores and submit response comments to feedback

---

## 4. Out of Scope (V1)
- Customer-facing mobile APIs (to be developed in V2).
- Advanced automated recurring subscriptions.
- GPS maps distance calculation handlers (V1 matches simple coordinates query).

---

## 5. Success Criteria
- Super Admin can verify a vendor onboarding request in under 3 backend validation checks.
- Vendors can fetch their dynamic calendar availability slots and reconcile their daily booking logs in under 200ms API response time.
- All transactional audits calculate net vendor revenue exactly down to 2 decimal places.
