# Integration Revenue Command Center — Fictional MVP

A local, zero-dependency Node.js dashboard prototype. **Not affiliated with ShiftKey. No real company data is included.**

## Start
1. Install Node.js 18 or newer.
2. Open a terminal in this folder.
3. Run `node server.js`.
4. Open http://localhost:4173 in your browser.

Windows PowerShell: `node .\server.js` (no npm install required).

## Included
- Executive KPIs: shift requests, completed shifts, completed-shift gross value, fill, cancellations, time-to-fill, adoption
- Partner-level filtering and performance comparisons
- Five synthetic activation pipeline partners
- Interactive fill, cancellation, and volume scenario modeling
- Deterministic synthetic shift generator (1,800 shift requests across 10 fictional clients and 4 active partners)
- Downloadable CSVs and JSON endpoints
- Responsive dashboard

## API
- `GET /api/records` — synthetic shift requests
- `GET /api/partners` — synthetic partner metadata
- `GET /api/meta` — provenance and definitions
- `GET /api/export/shifts.csv`
- `GET /api/export/partners.csv`

## Data model
`ShiftRequest(id, partner, client, date, status, hours, rate, revenue, timeToFillHours)`
`Partner(name, status, launchDate, targetLaunch, progress, adoption, owner)`

For a production implementation, normalize to Partner, Facility, ShiftRequest, Fulfillment, Cancellation, RevenueTransaction, IntegrationMilestone, and AdoptionEvent entities with stable cross-system identifiers and audit trails.

## Important financial distinction
The dashboard's completed shift value is **gross transaction value** (hours × hourly rate) for completed synthetic shifts. It is **not** ShiftKey's recognized revenue, take rate, gross margin, or financial forecast. The 18.6% North Star display is a separate fictional illustration and is not calculated from these records. For a real 30% contribution metric, an approved finance definition and company-wide revenue denominator are essential.

## Architecture and next phase
Current: Browser UI → Node HTTP API → deterministic synthetic records. No third-party dependencies or external network calls.

Future: Source APIs/authorized CSVs → scheduled ingestion → normalization and account matching → PostgreSQL → metric calculation services → executive dashboard, with role-based access, logging, and reconciliation to Finance.

Suggested source mappings:
- Marketplace shift system: request, filled, completed, canceled, hours, time-to-fill
- Finance: recognized revenue, net revenue, margin, customer and partner attribution
- CRM: facility/account and opportunity identifiers
- Integration PM system: milestones, launch status, blockers, owners
- Product telemetry: facility activation and adoption events

## Demo walkthrough
1. Show 2028 North Star and clarify the example number is illustrative.
2. Compare fill/cancellation performance by partner.
3. Select a partner and explain why a lower fill rate merits investigation.
4. Show five integration launches and readiness milestones.
5. Use the simulator to discuss how improvements could change completed shift value.
6. Explain what approved source data and Finance definitions are needed to make the tool operational.

## Safety
Use synthetic data only for this demo. Before importing any actual employer data, obtain authorization and implement authentication, access controls, data classification, retention policy, and approved hosting. Do not upload customer, facility, or clinician information to an unapproved system.
