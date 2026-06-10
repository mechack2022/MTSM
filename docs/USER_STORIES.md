# User Stories
## Single-School Learner & Attendance System (Pilot)

Companion to the BRD (v0.1). Stories are grouped into epics. Each story carries:
an ID, the standard *As a / I want / so that* form, acceptance criteria, a MoSCoW
priority, and the BRD requirement(s) it traces to.

Format reminder: **As a** \<role\>, **I want** \<capability\>, **so that** \<benefit\>.

---

## Epic A — Learner management

### US-A1 — Register a learner *(Must · FR-1)*
**As a** head teacher, **I want** to add a new learner with their basic details,
**so that** they can be enrolled and have attendance recorded.

**Acceptance criteria**
- Given I am on the learner list, when I add a learner with name, date of birth,
  sex, and a unique learner ID, then the learner is saved and appears in the list.
- Given I try to save without a required field, then I see a clear validation
  message and the learner is not saved.
- Given a learner ID already exists, then the system prevents a duplicate.

### US-A2 — View and edit a learner *(Must · FR-2)*
**As a** head teacher, **I want** to view and update a learner's details,
**so that** records stay accurate as information changes.

**Acceptance criteria**
- Given a learner exists, when I open their record, then I see their current details.
- When I edit and save a field, then the change is reflected immediately and
  the previous value is not lost from history.

### US-A3 — Deactivate a learner who has left *(Must · FR-3, BR-5)*
**As a** head teacher, **I want** to mark a learner as inactive rather than delete them,
**so that** historical attendance is preserved while they no longer appear in active rosters.

**Acceptance criteria**
- When I deactivate a learner, then they no longer appear in the active class roster.
- Then their past attendance records remain intact and viewable.
- There is no option to permanently delete a learner.

### US-A4 — Preserve a learner's history across changes *(Must · FR-4)*
**As a** head teacher, **I want** a learner's class and status history kept over time,
**so that** moving a learner between classes does not erase where they were before.

**Acceptance criteria**
- Given a learner moves from one class to another, then their prior enrollment
  remains recorded with its dates, and the new enrollment is added separately.

---

## Epic B — School & class structure

### US-B1 — Maintain the school profile *(Must · FR-5)*
**As an** administrator, **I want** to set up the school's name and location,
**so that** records are anchored to the correct school.

**Acceptance criteria**
- When I save the school profile, then it is stored and shown across the app.

### US-B2 — Define classes *(Must · FR-6)*
**As an** administrator, **I want** to create classes/sections,
**so that** learners can be organized and teachers assigned.

**Acceptance criteria**
- When I create a class, then it becomes available for enrollment and attendance.

### US-B3 — Enroll a learner into a class *(Must · FR-7, BR-6)*
**As a** head teacher, **I want** to enroll a learner into a class for a term/year,
**so that** attendance can be recorded for them in that class.

**Acceptance criteria**
- When I enroll a learner, then they appear on that class's roster for the term.
- Then attendance can be recorded for that learner only while the enrollment is active.

---

## Epic C — Attendance capture

### US-C1 — Mark daily attendance *(Must · FR-8)*
**As a** class teacher, **I want** to mark each enrolled learner present or absent
for today, **so that** the day's attendance is recorded.

**Acceptance criteria**
- Given my class roster for today, when I mark a learner present or absent,
  then the state is saved against that learner, class, and date.
- Then I can complete the whole class quickly without reloading per learner.

### US-C2 — Mark a learner late *(Should · FR-9)*
**As a** class teacher, **I want** to mark a learner late as a distinct state,
**so that** lateness is captured separately from a plain present/absent.

**Acceptance criteria**
- When I select "late" for a learner, then it is stored as its own state,
  distinguishable from present and absent in views.

### US-C3 — Correct an attendance entry *(Must · FR-11)*
**As a** class teacher, **I want** to correct a previously recorded entry,
**so that** mistakes can be fixed without creating a duplicate.

**Acceptance criteria**
- When I change an existing entry, then the authoritative record updates and
  the prior value is retained in the change history (not silently overwritten).
- Then there is still only one authoritative record for that learner/class/date.

### US-C4 — Prevent duplicate attendance *(Must · FR-10, BR-1)*
**As a** head teacher, **I want** at most one authoritative attendance record per
learner per class per day, **so that** the data is trustworthy.

**Acceptance criteria**
- Given attendance already exists for a learner on a date, when another entry is
  made for the same learner/class/date, then it updates rather than duplicates.

### US-C5 — See who recorded an entry *(Should · FR-12)*
**As a** head teacher, **I want** to see who recorded each attendance entry and when,
**so that** records are accountable.

**Acceptance criteria**
- When I view an entry, then I can see the recording user and timestamp.

---

## Epic D — Offline capture & sync *(the heart of the pilot)*

### US-D1 — Record attendance with no internet *(Must · FR-13, NFR-1)*
**As a** class teacher, **I want** to record attendance when the device has no
connection, **so that** capture is never blocked by the network.

**Acceptance criteria**
- Given the device is offline, when I mark attendance, then it saves immediately
  on the device and I can continue without waiting for a network.
- Then nothing in the capture flow requires connectivity to succeed.

### US-D2 — Keep offline changes safe until sync *(Must · FR-14, NFR-3)*
**As a** class teacher, **I want** my offline entries kept safely on the device,
**so that** they survive closing the app or the device sleeping before sync.

**Acceptance criteria**
- Given I recorded attendance offline, when I close and reopen the app, then my
  unsynced entries are still present.
- No committed offline change is lost before it has had a chance to sync.

### US-D3 — Sync automatically when back online *(Must · FR-15)*
**As a** class teacher, **I want** my pending changes to sync automatically when
connectivity returns, **so that** I don't have to remember to trigger it.

**Acceptance criteria**
- Given pending local changes and the device regains connectivity, then the
  changes are sent to the backend without manual action.
- Given sync succeeds, then those changes are marked as synced locally.

### US-D4 — Avoid duplicates on repeated sync *(Must · FR-16, BR-3, NFR-5)*
**As a** head teacher, **I want** a change that gets synced more than once to apply
only once, **so that** retries and flaky networks never create duplicates.

**Acceptance criteria**
- Given a change carries a stable unique identifier, when the same change is sent
  twice, then the backend applies it exactly once.
- Given a sync is interrupted and retried, then no duplicate record results.

### US-D5 — Resolve conflicting edits without losing data *(Must · FR-17, FR-18, BR-2)*
**As a** head teacher, **I want** conflicting offline edits to the same record
resolved by a clear rule that never silently discards data, **so that** I can trust
the result.

**Acceptance criteria**
- Given two devices edited the same learner/class/date offline, when both sync,
  then the most recent edit (by recorded-at timestamp) becomes authoritative.
- Then the superseded value is retained in a change log, not deleted.
- After reconciliation, exactly one authoritative record remains for that key.

### US-D6 — Sync changes from an older app version *(Must · FR-16, BR-4)*
**As a** class teacher whose device has been offline a long time, **I want** my
older entries to still sync to an updated backend, **so that** being behind on
updates doesn't strand my data.

**Acceptance criteria**
- Given a change was created on an older schema version, when it syncs to a newer
  backend, then it is accepted and correctly stored.

### US-D7 — See sync status *(Should · FR-19)*
**As a** class teacher, **I want** to see whether my entries are pending or synced,
**so that** I know my data has reached the central record.

**Acceptance criteria**
- When I view recent entries, then each clearly indicates pending vs synced.

---

## Epic E — Visibility & reporting

### US-E1 — View a class's attendance for a date *(Must · FR-20)*
**As a** head teacher, **I want** to view attendance for a class on a chosen date,
**so that** I can check who was present.

**Acceptance criteria**
- When I select a class and date, then I see each learner's recorded state.

### US-E2 — View absences across a week *(Should · FR-21)*
**As a** head teacher, **I want** to see absences over a date range,
**so that** I can spot patterns without tallying paper.

**Acceptance criteria**
- When I select a range, then I see learners and their absence counts/days for it.

### US-E3 — See attendance totals per class *(Should · FR-22)*
**As a** head teacher, **I want** present/absent totals per class,
**so that** I get a quick health check of the day.

**Acceptance criteria**
- When I open a class for a date, then I see present and absent counts.

---

## Build order suggestion

A pragmatic sequence that mirrors your milestones, so stories ship as working slices:

1. **Milestone 0 (online core):** US-B1, US-B2, US-A1, US-A2, US-B3, US-C1, US-C4,
   US-E1 — a teacher can mark attendance online and the head teacher can view it.
2. **Milestone 1 (offline & sync):** US-D1, US-D2, US-D3, US-D4, US-D5, US-D6 —
   the heart of the pilot; each is its own wall and its own win.
3. **Fill-ins:** US-A3, US-A4, US-C2, US-C3, US-C5, US-D7, US-E2, US-E3 —
   the Shoulds that round out the experience once the spine holds.

> Tip: treat US-D5 (conflict resolution) as the single most important story to get
> right. If it works and you understand *why*, the pilot has proven its hardest claim.

---

*End of document.*
