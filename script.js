const projects = {
  commercial: {
    no:"01", title:"Commercial KPI & Revenue Dashboard",
    tags:["Power BI","DAX","Power Query","Dataverse"],
    html:`<h3>Business Problem</h3><p>Commercial stakeholders need a consistent view of quotes, revenue, client activity and performance without relying on manually prepared reports.</p><h3>Solution</h3><p>Designed a Power BI reporting solution with a structured data model, Power Query transformations and DAX measures for commercial KPIs.</p><h3>Key Metrics</h3><ul><li>Revenue and monthly revenue trend</li><li>Quote volume and status</li><li>Win percentage</li><li>Client performance</li><li>Quote / response turnaround</li></ul><h3>Stack</h3><p>Dataverse → Power Query → Data Model → DAX → Power BI</p>`
  },
  operations: {
    no:"02", title:"Operations Performance Dashboard",
    tags:["Power BI","DAX","SQL"],
    html:`<h3>Purpose</h3><p>Provide an operational view of workload, VRA activity, active tasks and regional performance.</p><h3>Key Metrics</h3><ul><li>Total VRAs completed</li><li>Active task count</li><li>Average task duration</li><li>Weekly VRA summary</li><li>Region-wise performance</li></ul><h3>Design Approach</h3><p>Used weekly time alignment, KPI cards and trend visuals so stakeholders can quickly identify changes in operational workload and delivery.</p>`
  },
  email: {
    no:"03", title:"Automated Email Response KPI",
    tags:["Power Automate","Exchange Online","Power BI"],
    html:`<h3>Business Problem</h3><p>Measure how quickly the commercial mailbox responds to incoming enquiries while avoiding duplicate replies and irrelevant CC messages.</p><h3>Architecture</h3><p>Shared Mailbox → Power Automate → Email metadata → Response matching logic → Power BI</p><h3>Key Metrics</h3><ul><li>First received email timestamp</li><li>First valid response timestamp</li><li>Response time</li><li>% within SLA</li><li>Pending / unanswered enquiries</li></ul><p>The logic is designed around the first meaningful inbound enquiry and first valid response rather than counting every reply in a thread.</p>`
  },
  maritime: {
    no:"04", title:"Maritime Operations Dashboard",
    tags:["Power BI","DAX","APIs"],
    html:`<h3>Purpose</h3><p>An anonymised portfolio concept based on maritime analytics experience. It demonstrates how operational vessel and task data can be presented without exposing confidential company information.</p><h3>Possible KPIs</h3><ul><li>Active vessels / tasks</li><li>Regional activity</li><li>ETA confirmation</li><li>Operational workload</li><li>Task delivery performance</li></ul><h3>Data Integration</h3><p>API / operational systems → Power Query → Power BI. Location information can be validated before including map visuals.</p>`
  },
  sales: {
    no:"05", title:"Sales Performance Dashboard",
    tags:["SQL","Power BI","DAX"],
    html:`<h3>Business Problem</h3><p>Give management a single view of revenue performance and sales conversion.</p><h3>Key Metrics</h3><ul><li>Revenue</li><li>Target vs Actual</li><li>Conversion rate</li><li>Top customers</li><li>Product performance</li><li>YoY growth</li></ul><h3>Stack</h3><p>SQL → Power Query → Star Schema → DAX → Power BI</p>`
  },
  churn: {
    no:"06", title:"Customer Churn Prediction",
    tags:["Python","Pandas","scikit-learn","Power BI"],
    html:`<h3>Advanced Analytics</h3><p>A portfolio project designed to demonstrate the combination of Python machine learning and Power BI.</p><h3>Workflow</h3><p>Data cleaning → Feature engineering → Model training → Churn probability → Power BI dashboard</p><h3>Dashboard</h3><ul><li>Churn probability</li><li>Customer segments</li><li>High-risk customer list</li><li>Drivers of churn</li><li>Trend and cohort analysis</li></ul>`
  }
};

const modal = document.getElementById("projectModal");
const closeModal = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); };
document.querySelectorAll(".case-btn").forEach(btn => btn.addEventListener("click", () => {
  const p = projects[btn.dataset.project];
  document.getElementById("modalKicker").textContent = `${p.no} — CASE STUDY`;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalTags").innerHTML = p.tags.map(t => `<span>${t}</span>`).join("");
  document.getElementById("modalContent").innerHTML = p.html;
  modal.classList.add("open"); modal.setAttribute("aria-hidden","false");
}));
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if(e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });

const menu = document.querySelector(".menu-toggle");
const nav = document.getElementById("nav");
menu.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id));
    }
  });
}, {rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s => observer.observe(s));

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const subject = encodeURIComponent(`Portfolio enquiry — ${data.get("type") || "Data Analytics Project"}`);
  const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\nCompany: ${data.get("company") || ""}\nProject: ${data.get("type") || ""}\n\n${data.get("message")}`);
  window.location.href = `mailto:bhavesh.ukani@gmail.com?subject=${subject}&body=${body}`;
  document.getElementById("formNote").textContent = "Opening your email client…";
});
