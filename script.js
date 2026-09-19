const $ = (s) => document.querySelector(s);

/* Project content is carried over from the v2 portfolio. Edit here; cards and modal render from this list. */
const projects = [
  { cat: "Professional", title: "Commercial KPI and revenue reporting", blurb: "One reporting model for revenue, quotes, client activity and delivery KPIs.",
    tags: ["Power BI", "DAX", "Power Query", "Dataverse"],
    problem: "Commercial stakeholders needed one consistent view of revenue, quotes, client activity, win performance and delivery KPIs.",
    points: ["Combined business-system data into a single reporting model.", "Built KPI logic and time-based views for quotes, transits, revenue and commercial performance.", "Designed executive pages with drill-downs to client and operational detail.", "Kept report performance and metric definitions consistent."] },
  { cat: "Professional", title: "Operations performance reporting", blurb: "Workload, task status and regional trends, from overview to detail.",
    tags: ["Power BI", "DAX", "SQL", "Dataverse"],
    problem: "Operational teams needed fast visibility of current workload, task status, performance and regional trends.",
    points: ["Modelled operational data into reusable measures and report views.", "Created status, workload and trend reporting.", "Used filtering and drill-through to move from overview to detail.", "Reviewed report health and data quality issues.", "Led compliance and maritime reporting, reducing overdue tasks by 25%."] },
  { cat: "Professional", title: "Commercial email response KPI", blurb: "Measures how quickly a shared mailbox first responds to new enquiries.",
    tags: ["Exchange Online", "Power Automate", "Power BI"],
    problem: "Measure response time to new enquiries while excluding CC-only traffic and later replies.",
    points: ["Used Exchange Online metadata for sent and received events.", "Used Power Automate to capture conversation-level data and find the first qualifying response.", "Applied business rules to exclude CC-only, follow-up and unrelated messages.", "Showed response-time distributions and SLA-style KPIs in Power BI."],
    note: "The definition of the first response matters as much as the calculation itself." },
  { cat: "Professional", title: "Vessel and maritime operations intelligence", blurb: "Operational records joined to vessel master data and API information.",
    tags: ["Power BI", "APIs", "DAX", "Dataverse"],
    problem: "Maritime reporting needed operational records combined with vessel master data, status and API-derived information.",
    points: ["Related activity to vessel information using IMO identifiers.", "Combined business data with API responses where appropriate.", "Surfaced vessel type, status, activity and location context.", "Designed pages from fleet level down to individual records."],
    note: "This case study is anonymised." },
  { cat: "Professional", title: "Operations stateboard and daily numbers", blurb: "Current-state visibility instead of waiting for periodic reports.",
    tags: ["Power BI", "Dataverse", "DAX"],
    problem: "Operational teams needed to see the current state of work without waiting for periodic reports.",
    points: ["Represented states such as Live, Pending, Cancelled and Completed.", "Provided daily operational numbers and workload context.", "Used Dataverse-backed reporting patterns."] },
  { cat: "Professional", title: "Guard utilisation dashboard", blurb: "Automated daily deployment tracking, lifting utilisation from 60-65% to 75%.",
    tags: ["Power BI", "Power Query", "DAX", "Forecasting"],
    problem: "Vessel security teams tracked guard deployment manually, which made high utilisation hard to maintain.",
    points: ["Combined internal databases and partner records in one Power BI model.", "Used Power Query for ETL and DAX for daily deployments, fixed posts, guards in transit, training status and partner guards.", "Added a 7-day forecast to support resource planning.", "Utilisation rose from an average of 60-65% with the manual process to 75% after automation."] },
  { cat: "Professional", title: "Financial performance dashboard", blurb: "Revenue, cost and variance reporting that cut manual effort by 27%.",
    tags: ["Power BI", "SQL", "Excel", "DAX"],
    problem: "Finance needed clearer visibility of revenue, cost trends and variance, and manual reporting took too long.",
    points: ["Reviewed existing KPIs with finance stakeholders, found gaps and added measures aligned to business goals.", "Connected SQL databases and Excel data, with Power Query for ETL.", "Built DAX calculations for accurate, interactive financial reports.", "Reduced manual reporting time by 27%."] },
  { cat: "Independent", title: "Sales performance dashboard", blurb: "A complete sales analytics workflow, from SQL to interactive Power BI.",
    tags: ["SQL", "Power BI", "DAX"],
    problem: "A reusable portfolio project showing a full sales analytics workflow.",
    points: ["Revenue and target performance.", "Conversion and win analysis.", "Customer and product rankings.", "Month-on-month and year-on-year trends with interactive segmentation."] },
  { cat: "Independent", title: "Retail sales and executive BI dashboard", blurb: "Executive KPIs on a clean star schema with drill-through.",
    tags: ["Power BI", "Power Query", "DAX"],
    problem: "A polished executive dashboard built around a clean star schema.",
    points: ["Executive KPI overview.", "Revenue and margin trends.", "Product and category performance.", "Customer segmentation with drill-through to transaction level."] },
  { cat: "Independent", title: "Customer churn prediction", blurb: "Python model scores customers; Power BI turns scores into decisions.",
    tags: ["Python", "pandas", "scikit-learn", "Power BI"],
    problem: "Show how predictive analytics can sit alongside a BI reporting layer.",
    points: ["Profiled and cleaned customer data with Python.", "Created behavioural features for modelling.", "Trained and evaluated a classification model with scikit-learn.", "Exposed risk scores and segment insights in Power BI."],
    note: "Flow: Python, feature engineering, model, scored dataset, Power BI." },
  { cat: "Independent", title: "E-commerce market research analytics", blurb: "Category, price band and discount patterns from public listing data.",
    tags: ["Python", "ETL", "Power BI"],
    problem: "Understand public e-commerce listing data in the Indian market.",
    points: ["Category and product distribution.", "Price bands and discount patterns.", "Rating and review signals.", "Historical trends once collection is repeated."],
    note: "Only data collected in line with site terms and applicable law is used." },
  { cat: "Academic", title: "Botnet detection with federated learning", blurb: "MSc dissertation: deep-learning detection with data kept on-device.",
    tags: ["Python", "Deep learning", "Federated learning"],
    problem: "Detect botnets on decentralised edge devices without centralising data, to protect privacy.",
    points: ["Trained models across multiple devices using federated learning.", "Achieved a detection accuracy of 96%."] }
];

/* Navigation */
const nav = $("#nav"), menuBtn = $("#menuBtn");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
});

/* Project cards */
const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const grid = $("#projects");
grid.innerHTML = projects.map((p, i) =>
  `<button class="card" data-i="${i}" data-cat="${p.cat}">
     ${p.image ? `<img class="thumb" src="${esc(p.image)}" alt="" loading="lazy">` : ""}<span class="kicker">${p.cat}</span><h3>${esc(p.title)}</h3><p>${esc(p.blurb)}</p>
     <span class="tags">${p.tags.slice(0, 3).map((t) => `<span>${esc(t)}</span>`).join("")}</span>
   </button>`).join("");

document.querySelectorAll(".filters button").forEach((b) => b.addEventListener("click", () => {
  document.querySelectorAll(".filters button").forEach((x) => x.classList.remove("on"));
  b.classList.add("on");
  grid.querySelectorAll(".card").forEach((c) => { c.hidden = b.dataset.f !== "all" && c.dataset.cat !== b.dataset.f; });
}));

/* Modal */
const modal = $("#modal");
const media = (p) => (p.image ? `<img class="shot" src="${esc(p.image)}" alt="${esc(p.title)} dashboard screenshot">` : "") +
  (p.embed ? `<button class="btn ghost load" data-src="${esc(p.embed)}">Load interactive report</button>` : "");
$("#mBody").addEventListener("click", (e) => {
  const b = e.target.closest(".load"); if (!b) return;
  const f = document.createElement("iframe");
  f.className = "embed"; f.title = "Interactive Power BI report"; f.allowFullscreen = true; f.src = b.dataset.src;
  b.replaceWith(f);
});
grid.addEventListener("click", (e) => {
  const c = e.target.closest(".card"); if (!c) return;
  const p = projects[c.dataset.i];
  $("#mKicker").textContent = p.cat;
  $("#mTitle").textContent = p.title;
  $("#mTags").innerHTML = p.tags.map((t) => `<span>${esc(t)}</span>`).join("");
  $("#mBody").innerHTML = media(p) + `<h4>The problem</h4><p>${esc(p.problem)}</p><h4>What I did</h4><ul>${p.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>${p.note ? `<h4>Note</h4><p>${esc(p.note)}</p>` : ""}`;
  modal.showModal();
});
$("#mClose").addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

/* Contact form: opens a prepared email. Swap for Formspree/Netlify Forms if you want direct submissions. */
$("#contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(e.target);
  const subject = encodeURIComponent(`Project enquiry: ${d.get("type")}`);
  const body = encodeURIComponent(`Name: ${d.get("name")}\nEmail: ${d.get("email")}\nType: ${d.get("type")}\n\n${d.get("message")}`);
  location.href = `mailto:ukanibhavesh00@gmail.com?subject=${subject}&body=${body}`;
  $("#formNote").textContent = "Your email app should open with the message ready to send.";
});

$("#yr").textContent = new Date().getFullYear();
document.querySelectorAll(".mock-bars i").forEach((el, i) => el.style.setProperty("--n", i));
