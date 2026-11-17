/* Phase 2.5 — Executive Intelligence Expansion
   Fictional operational sample. Replace existing phase2.js; load after app.js.
   Keeps Phase 1 and its baseline unchanged. Actions persist in this browser only. */
(() => {
  "use strict";
  if (document.getElementById("intelligence")) return;
  const $ = (id) => document.getElementById(id);
  const usd = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(n) || 0);
  const num = (n) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
      Number(n) || 0,
    );
  const pct = (n) => (100 * n).toFixed(1) + "%";
  const esc = (s) =>
    String(s ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const BASE = {
    revenue: 80300000,
    share: 0.16,
    target: 0.3,
    buildings: 929,
    spend: 20000,
    scheduled: 3470000,
    worked: 2080000,
  };
  const storageKey = "integration-revenue-command-center-phase25-actions-v1";
  const scenarioKey = "integration-revenue-command-center-partner-scenarios-v1";
  const section = document.createElement("section");
  section.id = "intelligence";
  section.innerHTML = `
    <div class="sectionhead"><h2>Growth Opportunities</h2><span>Demo data</span></div>
    <div class="p25-grid">
      <div class="panel p25-panel"><div class="p25-label">Unfilled & Canceled Shift Value</div><div class="p25-big" id="p25-exposure">—</div></div>
      <div class="panel p25-panel"><div class="p25-label">Potential Completed Shift Value Gain</div><div class="p25-big" id="p25-recovery">—</div></div>
      <div class="panel p25-panel"><div class="p25-label">Potential New Building Spend</div><div class="p25-big" id="p25-spend">—</div></div>
    </div>
    <p class="p25-linked-note">Portfolio recovery uses the fill and cancellation improvements in <a href="#simulator">Unified Growth Simulator</a>. New-building spend uses your entries in <a href="#partners">Building Expansion</a>. No duplicate assumptions to maintain.</p>
    <div class="panel p25-panel p25-scroll"><div class="paneltitle"><h3>Partner opportunity ranking</h3></div>
      <table><thead><tr><th>Partner</th><th>Unfilled</th><th>Canceled</th><th>Fill</th><th>Cancel</th><th>Exposure</th><th>Potential gain</th><th>Suggested focus</th></tr></thead><tbody id="p25-rows"></tbody></table>
    </div>
    <div class="panel p25-panel"><div class="paneltitle"><h3>Partner drilldown</h3></div>
      <label for="p25-partner">Select integration partner</label> <select id="p25-partner" aria-label="Select partner"></select>
      <div id="p25-detail" class="p25-detail"></div>
    </div>
    <div id="p25-north-panel" class="panel p25-panel"><div class="paneltitle"><h3>2028 Integration Revenue Goal Tracker</h3><span>Illustrative planning · 30% goal</span></div>
      <div class="p25-north-layout">
        <div class="p25-north-controls">
          <div class="control"><label for="p25-company-growth">Company-wide revenue growth (excluding new facility revenue) <b id="p25-company-growth-label">0%</b></label><input id="p25-company-growth" type="range" min="-20" max="100" step="5" value="0"></div>
          <div class="control"><label for="p25-capture">Estimated company revenue captured from new facility spend <b id="p25-capture-label">0%</b></label><input id="p25-capture" type="range" min="0" max="100" step="5" value="0"></div>
          <div class="control"><label for="p25-core-growth">Growth in revenue from existing integrations <b id="p25-core-growth-label">0%</b></label><input id="p25-core-growth" type="range" min="-20" max="200" step="5" value="0"></div>
        </div>
        <div id="p25-north-results" class="p25-north-results"></div>
      </div>
    </div>
    <div class="panel p25-panel"><div class="paneltitle"><h3>Executive action tracker</h3></div>
      <form id="p25-action-form" class="p25-form">
        <label>Initiative<input id="p25-action-title" maxlength="120" required placeholder="e.g., Review cancellations at Beacon"></label>
        <label>Partner<select id="p25-action-partner"></select></label>
        <label>Owner<input id="p25-action-owner" maxlength="80" placeholder="Name or team"></label>
        <label>Priority<select id="p25-action-priority"><option>High</option><option selected>Medium</option><option>Low</option></select></label>
        <label>Due date<input id="p25-action-due" type="date"></label>
        <button type="submit">Add action</button>
      </form>
      <div class="p25-scroll"><table><thead><tr><th>Initiative</th><th>Partner</th><th>Owner</th><th>Priority</th><th>Due</th><th>Status</th><th>Remove</th></tr></thead><tbody id="p25-action-rows"></tbody></table></div>
    </div>`;
  const css = document.createElement("style");
  css.textContent = `#intelligence .p25-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-bottom:16px}#intelligence .p25-panel{margin-bottom:16px}#intelligence .p25-label{font-size:12px;font-weight:700;opacity:.75}#intelligence .p25-big{font-size:clamp(22px,3vw,34px);font-weight:750;margin:10px 0}#intelligence .p25-panel p{line-height:1.55}#intelligence .p25-scroll{overflow-x:auto}#intelligence td,#intelligence th{white-space:nowrap}#intelligence .p25-focus{white-space:normal;min-width:180px}#intelligence .p25-detail{margin-top:16px}#intelligence .p25-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:14px 0}#intelligence .p25-stat{padding:12px;border:1px solid rgba(127,127,127,.25);border-radius:10px}#intelligence .p25-stat small{display:block;opacity:.7;margin-bottom:6px}#intelligence .p25-stat strong{font-size:20px}#intelligence .p25-form{display:grid;grid-template-columns:2fr 1.2fr 1.2fr 1fr 1fr auto;gap:10px;align-items:end;margin:14px 0}#intelligence .p25-form label{font-size:12px;display:flex;flex-direction:column;gap:6px}#intelligence .p25-form input,#intelligence .p25-form select,#intelligence #p25-partner,#intelligence select[data-action-status]{max-width:100%;padding:8px;border-radius:6px;border:1px solid rgba(127,127,127,.45);background:var(--panel,#192330);color:inherit}#intelligence .p25-note{font-size:12px;opacity:.75}#intelligence .p25-simulator{margin:18px 0;padding:16px;border:1px solid rgba(127,127,127,.3);border-radius:12px}#intelligence .p25-slider-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}#intelligence .p25-slider-grid input{width:100%}#intelligence .p25-negative{color:#d98d7c}#intelligence .p25-positive{color:#76bda7}@media(max-width:1000px){#intelligence .p25-form{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:850px){#intelligence .p25-grid,#intelligence .p25-stats,#intelligence .p25-slider-grid{grid-template-columns:1fr}}`;
  // Readable action entry fields and consistent blue dropdowns, overriding earlier dark input rules.
  css.textContent += `
    #intelligence #p25-action-form input[type="text"],
    #intelligence #p25-action-form input:not([type]),
    #intelligence #p25-action-form input[type="date"] {
      background:#fff !important;color:#17365d !important;
      border:1px solid #b9cce2 !important;border-radius:7px;
      padding:10px 12px;min-width:0;box-sizing:border-box;
    }
    #intelligence #p25-action-form input::placeholder{color:#687c91 !important;opacity:1}
    #intelligence #p25-action-form input[type="date"]{color-scheme:light}
    #intelligence #p25-action-form select,
    #intelligence #p25-partner,
    #intelligence select[data-action-status]{background:#215d9f !important;color:#fff !important;border:1px solid #3478bd !important}
    #intelligence #p25-action-form input:focus,
    #intelligence #p25-action-form select:focus{outline:2px solid #74b4f5;outline-offset:1px}
  `;
  css.textContent += `
    #intelligence .p25-note {display:block; font-size:11px; color:#61758b}
    #intelligence .p25-panel > p {display:block}
    #intelligence .p25-grid .p25-panel {min-height:94px}
    #intelligence #p25-north-results .p25-stats {grid-template-columns:repeat(3,minmax(0,1fr))}
    #intelligence #p25-north-results .p25-stat strong {font-size:clamp(16px,2vw,22px);overflow-wrap:anywhere}
    #intelligence .p25-panel {line-height:1.4}
  `;
  // Revenue contribution model: center the three result cards alongside the scenario sliders.
  css.textContent += `
    #p25-north-panel .p25-north-layout {
      display:grid;
      grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);
      gap:28px;
      align-items:center;
    }
    #p25-north-panel .p25-north-controls {min-width:0;}
    #p25-north-panel .p25-north-results {min-width:0;display:flex;align-items:center;}
    #p25-north-panel .p25-north-results .p25-stats {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:12px;
      width:100%;
      margin:0;
      align-items:stretch;
    }
    #p25-north-panel .p25-north-results .p25-stat {
      min-width:0;
      min-height:110px;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      text-align:center;
      padding:14px 10px;
      background:#f7faff;
      border:1px solid #dce5ef;
    }
    #p25-north-panel .p25-north-results .p25-stat strong {
      font-size:clamp(16px,1.7vw,23px);
      overflow-wrap:anywhere;
      line-height:1.25;
    }
    @media(max-width:1150px) {
      #p25-north-panel .p25-north-layout {grid-template-columns:1fr;}
    }
    @media(max-width:520px) {
      #p25-north-panel .p25-north-results .p25-stats {grid-template-columns:1fr;}
    }
  `;
  css.textContent += `
    #intelligence .p25-linked-note{font-size:12px;color:#4b6682;line-height:1.6;margin:4px 0 18px}
    #intelligence .p25-linked-note a{color:#215d9f;font-weight:650}
    #p25-north-panel .p25-north-layout{display:grid;grid-template-columns:minmax(260px,.85fr) minmax(0,1.5fr);gap:28px;align-items:start}
    #p25-north-panel .p25-north-results{display:block;min-width:0}
    #p25-north-panel .goal-tracker{width:100%;color:#19334f}
    #p25-north-panel .goal-topline{display:flex;align-items:center;justify-content:space-between;gap:14px;font-size:13px;font-weight:650}
    #p25-north-panel .goal-topline strong{font-size:28px;color:#1d5b9d;white-space:nowrap}
    #p25-north-panel .goal-topline small{font-size:12px;color:#6d8198;font-weight:500}
    #p25-north-panel .goal-progress{height:16px;background:#e5edf7;border-radius:20px;overflow:hidden;margin-top:12px}
    #p25-north-panel .goal-progress>div{height:100%;background:linear-gradient(90deg,#337cce,#185a9f);border-radius:20px}
    #p25-north-panel .goal-progress-labels{display:flex;justify-content:space-between;gap:10px;font-size:11px;color:#637a92;margin-top:7px}
    #p25-north-panel .goal-metrics{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:20px 0}
    #p25-north-panel .goal-metrics>div{border:1px solid #dce7f3;background:#f6f9fe;border-radius:10px;padding:15px 12px;min-width:0}
    #p25-north-panel .goal-metrics small{display:block;font-size:11px;color:#60758d;min-height:31px}
    #p25-north-panel .goal-metrics strong{display:block;font-size:clamp(15px,1.6vw,22px);margin-top:8px;overflow-wrap:anywhere}
    #p25-north-panel .goal-breakdown{border-top:1px solid #e1e9f3;padding-top:14px}
    #p25-north-panel .goal-breakdown h4{margin:0 0 10px;font-size:13px}
    #p25-north-panel .goal-breakdown>div{display:flex;justify-content:space-between;gap:12px;padding:7px 0;border-bottom:1px solid #edf1f6;font-size:12px}
    #p25-north-panel .goal-breakdown b{white-space:nowrap}
    #p25-north-panel .goal-explain,#p25-north-panel .goal-disclaimer{display:block!important;font-size:11px;line-height:1.6;color:#58718b;margin:12px 0 0}
    #p25-north-panel .goal-disclaimer{color:#71859a}
    @media(max-width:1200px){#p25-north-panel .p25-north-layout{grid-template-columns:1fr}}
    @media(max-width:700px){#p25-north-panel .goal-metrics{grid-template-columns:1fr}#p25-north-panel .goal-topline{flex-wrap:wrap}}
  `;
  document.head.appendChild(css);
  const anchor = $("simulator");
  if (!anchor) {
    console.error("Phase 2.5: #simulator not found.");
    return;
  }
  anchor.parentNode.insertBefore(section, anchor);
  // Keep Phase 1 sections intact; place revenue contribution planning after the portfolio simulator.
  const northPanel = $("p25-north-panel");
  anchor.insertAdjacentElement("afterend", northPanel);
  const nav = document.querySelector("aside .nav");
  if (nav) {
    const a = document.createElement("a");
    a.href = "#intelligence";
    a.textContent = "↗   Growth opportunities";
    const before = nav.querySelector('a[href="#simulator"]');
    if (before) nav.insertBefore(a, before);
    else nav.appendChild(a);
  }
  let records = [],
    partners = [],
    ranked = [],
    actions = [],
    partnerScenarios = {};
  const controls = ["p25-company-growth", "p25-capture", "p25-core-growth"];
  const val = (id) => Number($(id).value) || 0;
  function calc(rows) {
    const unfilled = rows.filter((r) => r.status === "Unfilled").length;
    const canceled = rows.filter((r) => r.status === "Canceled").length;
    const completed = rows.filter((r) => r.status === "Completed");
    const filled = rows.length - unfilled;
    const avg = completed.length
      ? completed.reduce((s, r) => s + (Number(r.revenue) || 0), 0) /
        completed.length
      : 0;
    return {
      requests: rows.length,
      unfilled,
      canceled,
      completed: completed.length,
      avg,
      fill: rows.length ? filled / rows.length : 0,
      cancel: filled ? canceled / filled : 0,
      exposure: (unfilled + canceled) * avg,
    };
  }
  function focus(p) {
    if (!p.unfilled && !p.canceled) return "Monitor performance";
    return p.unfilled >= p.canceled
      ? "Review matching and fill barriers"
      : "Review cancellations and reliability";
  }
  function activePartners() {
    return partners.filter((p) => String(p.status).toLowerCase() === "active");
  }
  function getBuildings(p, index) {
    const allocations = [280, 240, 220, 189];
    return allocations[index] ?? 0; // fictional allocations totaling 929 for four active partners
  }
  function render() {
    const fillPP = Number($("fillSlider")?.value || 0) / 100;
    const cancelPP = Number($("cancelSlider")?.value || 0) / 100;
    const volumeGrowth = Number($("volumeSlider")?.value || 0) / 100;
    const buildingCount = Array.isArray(window.commandCenterBuildingAdds) ? window.commandCenterBuildingAdds.reduce((s,n)=>s+(Number(n)||0),0) : 0;
    const monthlySpend = Math.max(0, Number($("buildingSpend")?.value || BASE.spend));
    $("p25-company-growth-label").textContent = val("p25-company-growth") + "%";
    $("p25-capture-label").textContent = val("p25-capture") + "%";
    $("p25-core-growth-label").textContent = val("p25-core-growth") + "%";
    ranked = activePartners()
      .map((p, index) => {
        const a = calc(records.filter((r) => r.partner === p.name));
        return {
          ...a,
          name: p.name,
          buildings: getBuildings(p, index),
          recoverable: Math.max(0, a.requests * (1 + volumeGrowth) * Math.min(1, a.fill + fillPP) * (1 - Math.max(0, a.cancel - cancelPP)) - a.completed) * a.avg,
        };
      })
      .sort((a, b) => b.recoverable - a.recoverable);
    const total = calc(records),
      recovery = ranked.reduce((s, p) => s + p.recoverable, 0),
      annualSpend = buildingCount * monthlySpend * 12;
    $("p25-exposure").textContent = usd(total.exposure);
    $("p25-recovery").textContent = usd(recovery);
    $("p25-spend").textContent = usd(annualSpend) + "/yr";
    $("p25-rows").innerHTML = ranked
      .map(
        (p) =>
          `<tr><td><button type="button" data-partner="${esc(p.name)}">${esc(p.name)}</button></td><td>${num(p.unfilled)}</td><td>${num(p.canceled)}</td><td>${pct(p.fill)}</td><td>${pct(p.cancel)}</td><td>${usd(p.exposure)}</td><td>${usd(p.recoverable)}</td><td class="p25-focus">${esc(focus(p))}</td></tr>`,
      )
      .join("");
    renderDetail();
    updateNorthFromScenarios();
  }
  function defaultScenario(p) {
    return {
      buildings: 0,
      fill: Math.ceil(p.fill * 1000) / 10,
      cancel: Math.floor(p.cancel * 1000) / 10,
      adoption: 0,
    };
  }
  function scenarioFor(p) {
    return { ...defaultScenario(p), ...(partnerScenarios[p.name] || {}) };
  }
  function persistScenarios() {
    try {
      localStorage.setItem(scenarioKey, JSON.stringify(partnerScenarios));
    } catch (e) {
      console.warn("Scenario storage unavailable", e);
    }
  }
  function renderDetail() {
    const p = ranked.find((x) => x.name === $("p25-partner").value);
    if (!p) {
      $("p25-detail").textContent =
        "Select an active partner to view its metrics.";
      return;
    }
    const stats = [
      ["Fictional buildings", num(p.buildings)],
      ["Sample requests", num(p.requests)],
      ["Completed shifts", num(p.completed)],
      ["Fill rate", pct(p.fill)],
      ["Cancellation rate", pct(p.cancel)],
      ["Potential gross value gain", usd(p.recoverable)],
    ];
    const s = scenarioFor(p);
    $("p25-detail").innerHTML =
      `<div class="p25-stats">${stats.map(([label, value]) => `<div class="p25-stat"><small>${esc(label)}</small><strong>${esc(value)}</strong></div>`).join("")}</div>
      <p><b>Suggested focus:</b> ${esc(focus(p))}. <b>Modeled exposure:</b> ${usd(p.exposure)}. <b>Unfilled:</b> ${num(p.unfilled)}; <b>canceled:</b> ${num(p.canceled)}.</p>
      <p class="p25-note">Baseline is synthetic and read-only. Adoption is not measured in the sample API; the adoption slider is an independent hypothetical uplift, not an actual adoption rate.</p>
      <div class="p25-simulator"><div class="paneltitle"><h3>Partner growth simulator · independent what-if</h3><span>Adjust assumptions for ${esc(p.name)}</span></div>
        <div class="p25-slider-grid">
          <div class="control"><label for="p25-p-buildings">Additional buildings <b id="p25-p-buildings-label">+${num(s.buildings)}</b></label><input id="p25-p-buildings" data-partner-slider="buildings" type="range" min="0" max="100" step="1" value="${s.buildings}"></div>
          <div class="control"><label for="p25-p-fill">Target fill rate <b id="p25-p-fill-label">${s.fill.toFixed(1)}%</b></label><input id="p25-p-fill" data-partner-slider="fill" type="range" min="25" max="100" step="0.1" value="${s.fill}"></div>
          <div class="control"><label for="p25-p-cancel">Target cancellation rate <b id="p25-p-cancel-label">${s.cancel.toFixed(1)}%</b></label><input id="p25-p-cancel" data-partner-slider="cancel" type="range" min="0" max="30" step="0.1" value="${s.cancel}"></div>
          <div class="control"><label for="p25-p-adoption">Hypothetical adoption uplift <b id="p25-p-adoption-label">+${s.adoption}%</b></label><input id="p25-p-adoption" data-partner-slider="adoption" type="range" min="0" max="50" step="5" value="${s.adoption}"></div>
        </div>
        <div class="p25-stats" id="p25-p-results"></div>
        <p class="p25-note" id="p25-p-explain"></p>
        <button type="button" id="p25-p-reset">Reset this partner</button>
      </div>
      <button id="p25-create-partner-action" type="button">Create action for this partner</button>`;
    $("p25-detail")
      .querySelectorAll("[data-partner-slider]")
      .forEach((el) =>
        el.addEventListener("input", () => {
          const current = scenarioFor(p);
          current[el.dataset.partnerSlider] = Number(el.value);
          partnerScenarios[p.name] = current;
          persistScenarios();
          updatePartnerResults(p);
          updateNorthFromScenarios();
        }),
      );
    $("p25-p-reset").addEventListener("click", () => {
      delete partnerScenarios[p.name];
      persistScenarios();
      renderDetail();
      updateNorthFromScenarios();
    });
    $("p25-create-partner-action").addEventListener("click", () => {
      $("p25-action-partner").value = p.name;
      $("p25-action-title").value = "";
      $("p25-action-title").focus();
      $("p25-action-form").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
    updatePartnerResults(p);
  }
  function updatePartnerResults(p) {
    const s = scenarioFor(p),
      rateFill = s.fill / 100,
      rateCancel = s.cancel / 100;
    // Compare expected completed requests using the same fixed synthetic sample volume.
    const baselineCompleted = p.requests * p.fill * (1 - p.cancel);
    const projectedCompleted = p.requests * rateFill * (1 - rateCancel);
    const operationalGain = (projectedCompleted - baselineCompleted) * p.avg;
    const adoptionIncrement = (Math.max(0, operationalGain) * s.adoption) / 100; // hypothetical uplift only for positive operational improvement
    const annualSpend = s.buildings * BASE.spend * 12;
    $("p25-p-buildings-label").textContent = "+" + num(s.buildings);
    $("p25-p-fill-label").textContent = s.fill.toFixed(1) + "%";
    $("p25-p-cancel-label").textContent = s.cancel.toFixed(1) + "%";
    $("p25-p-adoption-label").textContent = "+" + s.adoption + "%";
    $("p25-p-results").innerHTML =
      `<div class="p25-stat"><small>Buildings: current → projected</small><strong>${num(p.buildings)} → ${num(p.buildings + s.buildings)}</strong></div><div class="p25-stat"><small>Incremental annual facility spend</small><strong>${usd(annualSpend)}</strong></div><div class="p25-stat"><small>Modeled change in sample shift value</small><strong>${usd(operationalGain + adoptionIncrement)}</strong></div>`;
    $("p25-p-explain").textContent =
      "Shift-value change can be positive or negative versus the synthetic baseline. It uses fixed sample request volume and mean completed-shift value. Adoption uplift applies only to positive operational improvement and is hypothetical. Facility spend is separate, annualized, and not recognized revenue.";
  }
  function updateNorthFromScenarios() {
    const count = Array.isArray(window.commandCenterBuildingAdds) ? window.commandCenterBuildingAdds.reduce((s,n)=>s+(Number(n)||0),0) : 0;
    const spend = Math.max(0, Number($("buildingSpend")?.value || BASE.spend));
    renderNorth(count, count * spend * 12);
  }
  function renderNorth(buildings, annualSpend) {
    const denominator = BASE.revenue / BASE.share;
    const company = denominator * (1 + val("p25-company-growth") / 100);
    const core = BASE.revenue * (1 + val("p25-core-growth") / 100);
    const converted = (annualSpend * val("p25-capture")) / 100;
    const integration = core + converted;
    // If new integration revenue also increases company revenue, include it in denominator.
    const totalCompany = company + converted;
    const share = totalCompany > 0 ? integration / totalCompany : 0;
    const gap = BASE.target - share;
    const additionalNeeded =
      totalCompany > 0
        ? Math.max(
            0,
            (BASE.target * totalCompany - integration) / (1 - BASE.target),
          )
        : 0;
    const progress = Math.min(100, Math.max(0, share / BASE.target * 100));
    const gapLabel = gap > 0 ? (gap * 100).toFixed(1) + " percentage points" : "Goal achieved";
    $("p25-north-results").innerHTML = `
      <div class="goal-tracker">
        <div class="goal-topline"><span>Projected share of company revenue from integrations</span><strong>${pct(share)} <small>of 30% goal</small></strong></div>
        <div class="goal-progress" role="progressbar" aria-label="Progress toward 30 percent integration revenue goal" aria-valuemin="0" aria-valuemax="30" aria-valuenow="${(share * 100).toFixed(1)}"><div style="width:${progress}%"></div></div>
        <div class="goal-progress-labels"><span>Current baseline: ${pct(BASE.share)}</span><span>2028 goal: 30.0%</span></div>
        <div class="goal-metrics">
          <div><small>Projected integration revenue</small><strong>${usd(integration)}</strong></div>
          <div><small>Remaining percentage-point gap</small><strong>${gapLabel}</strong></div>
          <div><small>Additional integration revenue needed</small><strong>${usd(additionalNeeded)}</strong></div>
        </div>
        <div class="goal-breakdown"><h4>How this projection is calculated</h4>
          <div><span>Current integration revenue (2026 YTD baseline)</span><b>${usd(BASE.revenue)}</b></div>
          <div><span>Projected revenue from existing integrations</span><b>${usd(core)}</b></div>
          <div><span>Modeled additional recognized revenue from new facilities</span><b>${usd(converted)}</b></div>
          <div><span>Projected total company revenue</span><b>${usd(totalCompany)}</b></div>
        </div>
        <p class="goal-explain">${usd(additionalNeeded)} is the further recognized integration revenue required to reach 30%, assuming it also increases total company revenue. The model uses Building Expansion: ${num(buildings)} additional buildings × ${usd(annualSpend / (buildings || 1) / 12)}/month per building. Facility spending and gross shift value are <b>not</b> automatically recognized company revenue.</p>
        <p class="goal-disclaimer">Illustrative scenario, not a 2028 forecast. The $80.3M and 16% are 2026 YTD inputs; the model holds them as a starting baseline rather than projecting elapsed time to 2028. Company-wide growth and integration growth are independent assumptions. The synthetic shift-value gain shown above is not converted to recognized company revenue automatically.</p>
      </div>`;
  }
  function loadActions() {
    try {
      const a = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return Array.isArray(a) ? a : [];
    } catch {
      return [];
    }
  }
  function saveActions() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(actions));
    } catch (e) {
      console.warn("Action storage unavailable", e);
    }
  }
  function renderActions() {
    $("p25-action-rows").innerHTML = actions.length
      ? actions
          .map(
            (a) =>
              `<tr><td>${esc(a.title)}</td><td>${esc(a.partner)}</td><td>${esc(a.owner || "Unassigned")}</td><td>${esc(a.priority)}</td><td>${esc(a.due || "—")}</td><td><select data-action-status="${esc(a.id)}" aria-label="Status for ${esc(a.title)}">${["Not started", "In progress", "Blocked", "Complete"].map((s) => `<option ${a.status === s ? "selected" : ""}>${s}</option>`).join("")}</select></td><td><button type="button" data-action-delete="${esc(a.id)}">Remove</button></td></tr>`,
          )
          .join("")
      : '<tr><td colspan="7">No actions yet. Add an initiative above.</td></tr>';
  }
  async function start() {
    try {
      const res = await Promise.all([
        fetch("./data/records.json"),
        fetch("./data/partners.json"),
      ]);
      if (res.some((r) => !r.ok)) throw new Error("Backend data unavailable");
      [records, partners] = await Promise.all(res.map((r) => r.json()));
      const active = activePartners();
      $("p25-partner").innerHTML = active
        .map((p) => `<option value="${esc(p.name)}">${esc(p.name)}</option>`)
        .join("");
      $("p25-action-partner").innerHTML =
        '<option value="All partners">All partners</option>' +
        partners
          .map((p) => `<option value="${esc(p.name)}">${esc(p.name)}</option>`)
          .join("");
      controls.forEach((id) => $(id).addEventListener("input", render));
      ["fillSlider", "cancelSlider", "volumeSlider", "partnerFilter"].forEach(id => $(id)?.addEventListener("input", render));
      window.addEventListener("commandCenterScenarioChange", render);
      $("p25-partner").addEventListener("change", renderDetail);
      $("p25-rows").addEventListener("click", (e) => {
        const b = e.target.closest("button[data-partner]");
        if (!b) return;
        $("p25-partner").value = b.dataset.partner;
        renderDetail();
        $("p25-detail").scrollIntoView({ behavior: "smooth", block: "center" });
      });
      try {
        const saved = JSON.parse(localStorage.getItem(scenarioKey) || "{}");
        if (saved && typeof saved === "object" && !Array.isArray(saved))
          partnerScenarios = saved;
      } catch (e) {
        console.warn("Partner scenarios unavailable", e);
      }
      actions = loadActions();
      renderActions();
      $("p25-action-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const title = $("p25-action-title").value.trim();
        if (!title) return;
        actions.push({
          id:
            Date.now().toString(36) +
            "-" +
            Math.random().toString(36).slice(2, 8),
          title,
          partner: $("p25-action-partner").value,
          owner: $("p25-action-owner").value.trim(),
          priority: $("p25-action-priority").value,
          due: $("p25-action-due").value,
          status: "Not started",
        });
        saveActions();
        renderActions();
        $("p25-action-title").value = "";
        $("p25-action-owner").value = "";
        $("p25-action-due").value = "";
      });
      $("p25-action-rows").addEventListener("change", (e) => {
        const s = e.target.closest("select[data-action-status]");
        if (!s) return;
        const a = actions.find((x) => x.id === s.dataset.actionStatus);
        if (a) {
          a.status = s.value;
          saveActions();
        }
      });
      $("p25-action-rows").addEventListener("click", (e) => {
        const b = e.target.closest("button[data-action-delete]");
        if (!b) return;
        actions = actions.filter((x) => x.id !== b.dataset.actionDelete);
        saveActions();
        renderActions();
      });
      render();
    } catch (e) {
      console.error("Phase 2.5:", e);
    }
  }
  start();
})();
