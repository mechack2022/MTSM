# Business Requirements Document (BRD)
## Single-School Learner & Attendance System (Pilot)

---

### Document control

| Field | Value |
|---|---|
| Document title | BRD — Single-School Learner & Attendance System (Pilot) |
| Version | 0.1 (Draft) |
| Status | For review |
| Author | Product Owner |
| Date | June 2026 |
| Related vision | National School Central Repository (future state — see §13) |

> **Scope note up front:** This BRD covers a **single school**, two capabilities — managing learners and recording attendance — with **offline-first capture and sync**. It is deliberately *not* the national platform. The national repository is the long-term vision; this pilot is the smallest version that proves the hardest part (reliable offline data capture) works. Anything beyond a single school is explicitly out of scope (see §5).

---

## 1. Executive summary

Schools in low-connectivity environments still record attendance on paper, which makes the data slow to aggregate, easy to lose, and impossible to trust at higher levels. This pilot delivers a small, reliable system for **one school** to record learner enrollment and daily attendance on a device, **even with no internet connection**, and synchronize that data to a central backend once connectivity returns.

The pilot's purpose is twofold: (1) give one school a working, trustworthy attendance tool, and (2) prove the offline-capture-and-sync foundation that the eventual national repository will depend on. Success is measured by data never being lost during offline periods and by attendance being recordable in under a few seconds per class, regardless of network state.

---

## 2. Background and business problem

Paper-based attendance creates four recurring problems:

- **Data loss** — registers are misplaced, damaged, or never digitized.
- **No timely visibility** — a head teacher cannot see this week's absence pattern without manually tallying sheets.
- **No single source of truth** — different copies disagree, and there is no authoritative record.
- **Connectivity assumption** — most existing digital tools assume reliable internet, which many schools do not have.

The core insight driving this pilot: the binding constraint is **not** features — it is **reliable capture under intermittent connectivity**. Solve that for one school first; everything else builds on top.

---

## 3. Business objectives

| # | Objective | Why it matters |
|---|---|---|
| BO-1 | Enable daily attendance capture that works fully offline | Connectivity cannot be assumed; capture must never be blocked. |
| BO-2 | Guarantee no recorded data is lost when syncing | Trust in the system is the whole point; silent data loss destroys it. |
| BO-3 | Provide a single authoritative record per learner per day | Eliminates conflicting paper copies. |
| BO-4 | Give the head teacher timely visibility into attendance | Turns raw records into a usable signal. |
| BO-5 | Establish a reusable foundation for future scale | De-risks the eventual national rollout. |

---

## 4. Stakeholders

| Stakeholder | Role / interest |
|---|---|
| Class teacher | Primary user — records daily attendance per class. |
| Head teacher | Secondary user — views attendance summaries, manages learner records. |
| School administrator | Maintains the school profile and class structure. |
| Product Owner | Defines scope, priorities, and acceptance. |
| Developer (you) | Designs and builds the system. |
| Future: State/Federal education bodies | Out of scope for the pilot; relevant to the national vision only. |

---

## 5. Scope

### 5.1 In scope

- A single school's learner records (create, view, update, deactivate).
- A single school's class/section structure.
- Enrollment linking a learner to a class for a given term/year.
- Daily attendance capture (present / absent, optionally late) per learner per class day.
- **Offline-first capture**: all of the above must work with no internet.
- **Sync**: local changes reconcile to the central backend when connectivity returns.
- Basic attendance views/summaries for the head teacher (e.g. absences this week).
- Defined conflict-resolution, duplicate-prevention, and schema-evolution rules (see §8, §9).

### 5.2 Out of scope (pilot)

- More than one school; cross-school or district/state/national aggregation.
- Federal/state system integration or any external "integration gateway."
- AI-assisted features (e.g. extracting attendance from photos of paper registers) — **deferred to a later phase**.
- Natural-language querying / analytics dashboards beyond basic summaries.
- Payments, fees, grading, timetabling, parent communication.
- Native mobile app store distribution (a simple web/PWA client is sufficient for the pilot).
- Biometric or hardware-based attendance capture.

> Items in 5.2 are not rejected forever — they are sequenced *after* the pilot proves the foundation.

---

## 6. User roles and permissions

| Role | Can do |
|---|---|
| Class teacher | Record/edit attendance for their assigned class; view their class roster. |
| Head teacher | All teacher actions, plus view all classes, manage learner records, view summaries. |
| Administrator | Manage school profile and class structure; manage user accounts. |

> Role granularity is kept deliberately minimal for the pilot. Authentication exists, but advanced access control is out of scope.

---

## 7. Functional requirements

Each requirement has an ID for traceability. Priority uses MoSCoW (Must / Should / Could / Won't-for-now).

### 7.1 Learner management

| ID | Requirement | Priority |
|---|---|---|
| FR-1 | The system shall allow creating a learner record with at least: name, date of birth, sex, and a unique learner identifier. | Must |
| FR-2 | The system shall allow viewing and editing a learner's details. | Must |
| FR-3 | The system shall allow deactivating (not hard-deleting) a learner who has left. | Must |
| FR-4 | The system shall preserve a learner's history when their class or status changes over time. | Must |

### 7.2 School & class structure

| ID | Requirement | Priority |
|---|---|---|
| FR-5 | The system shall store a single school profile (name, location). | Must |
| FR-6 | The system shall allow defining classes/sections within the school. | Must |
| FR-7 | The system shall allow enrolling a learner into a class for a given term/year. | Must |

### 7.3 Attendance capture

| ID | Requirement | Priority |
|---|---|---|
| FR-8 | The system shall allow a teacher to mark each enrolled learner present or absent for a given class and date. | Must |
| FR-9 | The system shall support marking a learner late as a distinct state. | Should |
| FR-10 | The system shall prevent more than one attendance record for the same learner, class, and date (after sync reconciliation). | Must |
| FR-11 | The system shall allow correcting a previously recorded attendance entry. | Must |
| FR-12 | The system shall record who made each attendance entry and when. | Should |

### 7.4 Offline capture & sync

| ID | Requirement | Priority |
|---|---|---|
| FR-13 | The system shall allow all learner and attendance actions to be performed with no network connection. | Must |
| FR-14 | The system shall persist offline changes locally on the device until they can be synced. | Must |
| FR-15 | The system shall automatically sync local changes to the backend when connectivity is available. | Must |
| FR-16 | The system shall ensure a change synced more than once is applied only once (idempotency). | Must |
| FR-17 | The system shall reconcile conflicting edits to the same record according to a defined rule (see §9). | Must |
| FR-18 | The system shall not silently discard data during conflict resolution; superseded values shall be retained/logged. | Must |
| FR-19 | The system shall indicate sync status to the user (e.g. pending / synced). | Should |

### 7.5 Visibility & reporting

| ID | Requirement | Priority |
|---|---|---|
| FR-20 | The system shall let the head teacher view attendance for a class on a given date. | Must |
| FR-21 | The system shall let the head teacher view absences across a date range (e.g. this week). | Should |
| FR-22 | The system shall show simple attendance totals per class (present/absent counts). | Should |

---

## 8. Data requirements

The pilot's data model is intentionally small — four core entities:

| Entity | Key attributes | Notes |
|---|---|---|
| School | name, location | Single record for the pilot. |
| Learner | learner ID, name, DOB, sex, status | Status supports deactivation without deletion. |
| Enrollment | learner, class, term/year, start/end | Links a learner to a class over time; supports history. |
| Attendance | learner, class, date, state, recorded-by, recorded-at, change ID | One authoritative record per learner/class/date; carries a stable change ID for idempotent sync. |

Data principles:

- **No hard deletes** of learners or attendance; use status flags and corrections so history is preserved.
- **Every offline-originated change carries a stable unique identifier** so the backend can recognize duplicates.
- **Temporal correctness**: a learner's enrollment is time-bound, not a single mutable field, so moving classes does not erase history.

---

## 9. Business rules

| ID | Rule |
|---|---|
| BR-1 | There may be at most one authoritative attendance record per (learner, class, date). |
| BR-2 | When two offline edits conflict for the same record, the most recent edit (by recorded-at timestamp) becomes authoritative; the superseded value is retained in a change log rather than discarded. |
| BR-3 | A sync operation must be idempotent: re-sending the same change must not create a duplicate. |
| BR-4 | A change created on an older app/schema version must remain syncable to a newer backend. |
| BR-5 | Learners and attendance are never hard-deleted; they are deactivated or corrected. |
| BR-6 | Attendance can be recorded only for learners actively enrolled in the class on that date. |

> BR-2 through BR-4 are the decisions that prevent data loss. They are stated here as business rules precisely because they must be *decided* before they are coded.

---

## 10. Non-functional requirements

| ID | Requirement | Target |
|---|---|---|
| NFR-1 | Offline availability | All capture functions usable with zero connectivity. |
| NFR-2 | Capture speed | Marking a full class's attendance takes seconds, not minutes, regardless of network. |
| NFR-3 | Data durability | No committed local change is lost across app restarts or device sleep before sync. |
| NFR-4 | Sync resilience | Sync recovers correctly from interruption mid-transfer. |
| NFR-5 | Integrity | After sync, no duplicate or conflicting authoritative records remain. |
| NFR-6 | Usability | A teacher with minimal training can record attendance unaided. |
| NFR-7 | Security | Users authenticate; only authorized roles can view or edit records. |
| NFR-8 | Maintainability | The system is structured so future capabilities (AI, multi-school) can be added without redesign. |

---

## 11. Assumptions, constraints, and dependencies

### Assumptions
- The pilot school has at least one device per recording teacher (or shared devices).
- Connectivity is intermittent but exists periodically (sync is possible eventually).
- Teachers will record attendance daily.

### Constraints
- Single school only for the pilot.
- A lightweight web/PWA client is acceptable; no native app required.
- Built and maintained by a single developer — scope must stay small.

### Dependencies
- A backend service and a central database.
- A local on-device store capable of persisting data offline.

---

## 12. Success metrics & acceptance criteria

The pilot is considered successful when:

| Metric | Target |
|---|---|
| Offline data loss | Zero committed offline records lost across the pilot period. |
| Duplicate/conflict integrity | Zero duplicate or unresolved-conflict authoritative records after sync. |
| Capture time | A class register completed in seconds, offline or online. |
| Adoption | The pilot school records attendance through the system on the large majority of school days. |
| Head-teacher visibility | The head teacher can retrieve this week's absences without manual tallying. |

**Definition of done (pilot):** a teacher can record a full class's attendance with the device offline; the data survives an app restart; on reconnection it syncs to the backend; re-running sync creates no duplicates; a conflicting edit resolves by the defined rule without losing data; and the head teacher can view the resulting records and a weekly absence summary.

---

## 13. Future considerations (out of scope — vision only)

These are explicitly **not** part of the pilot and are listed only to show the intended direction so pilot decisions don't foreclose them:

- **Multi-school and hierarchical aggregation** (school → district → state → national).
- **External system integration** with federal/state education systems.
- **AI-assisted capture** — extracting attendance from photos of paper registers.
- **Natural-language analytics** — querying attendance/enrollment in plain language.
- **Record verification** — tamper-resistant authoritative records at scale.

The pilot's data principles (no hard deletes, stable change IDs, time-bound enrollment, a clean backend-mediated boundary) are chosen so these future capabilities can be added later without rework.

---

## 14. Glossary

| Term | Meaning |
|---|---|
| Offline-first | Designed so the app works fully without a network and syncs later. |
| Sync | The process of carrying locally recorded changes to the central backend. |
| Idempotency | The property that applying the same change more than once has the same effect as applying it once. |
| Conflict resolution | The defined rule for deciding the authoritative value when two edits disagree. |
| Schema evolution | Keeping older data/clients compatible as the data structure changes over time. |
| Authoritative record | The single agreed-upon version of a record (e.g. one attendance entry per learner/class/date). |

---

*End of document.*
