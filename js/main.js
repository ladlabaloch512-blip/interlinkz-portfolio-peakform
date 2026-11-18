/* PeakForm Fitness demo site: shared data and behaviour.
   All plans, prices, classes and timetable data live here and are rendered
   into the pages, so the timetable and prices stay in one place. */

const PLANS = [
  {
    id: "starter", name: "Starter Plan", price: 4000, per: "per month",
    tag: "Best for beginners",
    features: ["Open gym floor access during staffed hours", "1 group class per week", "Locker room"]
  },
  {
    id: "all-access", name: "All Access Plan", price: 6500, per: "per month",
    tag: "Most popular", popular: true,
    features: ["Open gym all hours", "Unlimited group classes", "1 personal training session per month", "Locker room and showers"]
  },
  {
    id: "peak", name: "Peak Plan", price: 9500, per: "per month",
    tag: "The full package",
    features: ["Everything in All Access", "4 personal training sessions per month", "Nutrition starter plan", "Guest pass every month"]
  },
  {
    id: "student", name: "Student Plan", price: 3000, per: "per month",
    tag: "For students",
    features: ["Open gym off peak hours (10 am to 4 pm)", "2 group classes per week", "Valid student card required"]
  },
  {
    id: "couple", name: "Couple Plan", price: 11000, per: "per month for two people",
    tag: "For two people",
    features: ["All Access benefits for both people", "Shared account", "2 personal training sessions per month between the pair"]
  }
];

const EXTRAS = [
  { name: "Joining fee", price: "Rs 2,000", note: "One time fee. Waived when you pay annually." },
  { name: "Annual payment", price: "2 months free", note: "Pay for a year on any plan and two months are free." },
  { name: "Day pass", price: "Rs 800", note: "Full open gym access for one day." },
  { name: "One week pass", price: "Rs 2,500", note: "Seven days of open gym access." },
  { name: "Personal training add on", price: "Rs 3,500", note: "Per session, or Rs 30,000 for a block of 10 sessions." }
];

const CLASSES = {
  "Strength Circuit": { desc: "Barbell and dumbbell based full body strength, coach led.", duration: "45 minutes", coach: "Daniyal Raza", img: "images/class-strength.jpg" },
  "HIIT Burn": { desc: "Short intense intervals for fitness and fat burn.", duration: "30 minutes", coach: "Usman Tariq", img: "images/class-hiit.jpg" },
  "Yoga Flow": { desc: "Mobility, balance and breathing, for all levels.", duration: "60 minutes", coach: "Sara Malik", img: "images/class-yoga.jpg" },
  "Spin Ride": { desc: "Indoor cycling to music, legs and cardio.", duration: "45 minutes", coach: "Hira Shah", img: "images/class-spin.jpg" },
  "Boxing Basics": { desc: "Pads, footwork and fitness, gloves provided.", duration: "60 minutes", coach: "Usman Tariq", img: "images/class-boxing.jpg" },
  "Core and Mobility": { desc: "Core strength and stretching, at a gentle pace.", duration: "30 minutes", coach: "Sara Malik", img: "images/class-core.jpg" }
};

const TIMETABLE = [
  { day: "Monday", slots: [["7:00 am", "Spin Ride"], ["12:15 pm", "Core and Mobility"], ["6:00 pm", "Strength Circuit"], ["7:30 pm", "Yoga Flow"]] },
  { day: "Tuesday", slots: [["7:00 am", "HIIT Burn"], ["12:15 pm", "Strength Circuit"], ["6:00 pm", "Boxing Basics"], ["7:30 pm", "Spin Ride"]] },
  { day: "Wednesday", slots: [["7:00 am", "Yoga Flow"], ["12:15 pm", "HIIT Burn"], ["6:00 pm", "Strength Circuit"], ["7:30 pm", "Boxing Basics"]] },
  { day: "Thursday", slots: [["7:00 am", "Spin Ride"], ["12:15 pm", "Core and Mobility"], ["6:00 pm", "HIIT Burn"], ["7:30 pm", "Yoga Flow"]] },
  { day: "Friday", slots: [["7:00 am", "Strength Circuit"], ["12:15 pm", "Boxing Basics"], ["6:00 pm", "Spin Ride"], ["7:00 pm", "Core and Mobility"]] },
  { day: "Saturday", slots: [["9:00 am", "HIIT Burn"], ["10:00 am", "Yoga Flow"], ["11:00 am", "Strength Circuit"], ["4:00 pm", "Boxing Basics"]] },
  { day: "Sunday", slots: [["10:00 am", "Yoga Flow"], ["11:00 am", "Core and Mobility"]], note: "Open gym only after 12 pm on Sundays." }
];

const TRAINERS = [
  { name: "Daniyal Raza", role: "Head Coach", spec: "Strength and conditioning", leads: "Leads Strength Circuit", img: "images/trainer-daniyal.jpg" },
  { name: "Sara Malik", role: "Yoga and Mobility Coach", spec: "Yoga, mobility and gentle training", leads: "Leads Yoga Flow and Core and Mobility", img: "images/trainer-sara.jpg" },
  { name: "Usman Tariq", role: "Boxing and HIIT Coach", spec: "Boxing and high intensity training", leads: "Leads Boxing Basics and HIIT Burn", img: "images/trainer-usman.jpg" },
  { name: "Hira Shah", role: "Spin and Endurance Coach", spec: "Indoor cycling and endurance", leads: "Leads Spin Ride", img: "images/trainer-hira.jpg" }
];

function fmt(n) { return "Rs " + n.toLocaleString("en-US"); }
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
function bookUrl(day, time, cls) {
  return "book.html?day=" + encodeURIComponent(day) + "&time=" + encodeURIComponent(time) + "&class=" + encodeURIComponent(cls);
}

/* ---------- Plan cards (home) ---------- */
function renderPlanCards(el) {
  const pick = PLANS.slice(0, 3);
  el.innerHTML = pick.map(function (p) {
    return '<article class="plan-card' + (p.popular ? " popular" : "") + '">' +
      (p.popular ? '<span class="badge">Most Popular</span>' : "") +
      "<h3>" + p.name + "</h3>" +
      '<p class="price">' + fmt(p.price) + ' <span>' + p.per + "</span></p>" +
      "<ul>" + p.features.map(function (f) { return "<li>" + f + "</li>"; }).join("") + "</ul>" +
      '<a class="btn ' + (p.popular ? "btn-coral" : "btn-outline") + '" href="membership.html?plan=' + p.id + '#signup">Choose Plan</a>' +
      "</article>";
  }).join("");
}

/* ---------- Membership comparison table ---------- */
function renderCompareTable(el) {
  let html = '<table class="compare"><thead><tr><th>Plan</th><th>Price</th><th>What is included</th><th></th></tr></thead><tbody>';
  PLANS.forEach(function (p) {
    html += "<tr" + (p.popular ? ' class="popular-row"' : "") + ">" +
      '<td data-label="Plan"><strong>' + p.name + "</strong>" + (p.popular ? ' <span class="badge badge-inline">Most Popular</span>' : "") + '<br><span class="muted">' + p.tag + "</span></td>" +
      '<td data-label="Price"><strong class="price-cell">' + fmt(p.price) + '</strong><br><span class="muted">' + p.per + "</span></td>" +
      '<td data-label="What is included">' + p.features.join(". ") + ".</td>" +
      '<td><a class="btn btn-coral btn-sm" href="membership.html?plan=' + p.id + '#signup">Join</a></td></tr>';
  });
  html += "</tbody></table>";
  el.innerHTML = html;
}

function renderExtras(el) {
  el.innerHTML = EXTRAS.map(function (e) {
    return '<div class="extra-row"><div><strong>' + e.name + '</strong><br><span class="muted">' + e.note + '</span></div><div class="extra-price">' + e.price + "</div></div>";
  }).join("");
}

/* ---------- Timetable ---------- */
function timetableRows(filter) {
  let rows = "";
  TIMETABLE.forEach(function (d) {
    d.slots.forEach(function (s) {
      const time = s[0], cls = s[1];
      if (filter && filter !== "All" && cls !== filter) return;
      const c = CLASSES[cls];
      rows += "<tr>" +
        '<td data-label="Day">' + d.day + "</td>" +
        '<td data-label="Time">' + time + "</td>" +
        '<td data-label="Class"><strong>' + cls + "</strong></td>" +
        '<td data-label="Coach">' + c.coach + "</td>" +
        '<td data-label="Length">' + c.duration + "</td>" +
        '<td><a class="btn btn-coral btn-sm" href="' + bookUrl(d.day, time, cls) + '">Book</a></td></tr>';
    });
    if (d.note && (!filter || filter === "All")) {
      rows += '<tr class="note-row"><td colspan="6">' + d.note + "</td></tr>";
    }
  });
  return rows;
}

function renderTimetable(tbody, filter) {
  tbody.innerHTML = timetableRows(filter);
  const count = tbody.querySelectorAll("tr:not(.note-row)").length;
  const counter = document.getElementById("tt-count");
  if (counter) counter.textContent = count + (count === 1 ? " class slot" : " class slots") + (filter && filter !== "All" ? " for " + filter : " this week");
}

function renderPreview(el) {
  let html = '<table class="preview"><thead><tr><th>Day</th><th>Classes</th></tr></thead><tbody>';
  TIMETABLE.forEach(function (d) {
    html += "<tr><td><strong>" + d.day + "</strong></td><td>" +
      d.slots.map(function (s) {
        return '<a class="slot-chip" href="' + bookUrl(d.day, s[0], s[1]) + '">' + s[0] + " " + s[1] + "</a>";
      }).join(" ") +
      (d.note ? '<span class="muted"> ' + d.note + "</span>" : "") +
      "</td></tr>";
  });
  html += "</tbody></table>";
  el.innerHTML = html;
}

/* ---------- Class cards ---------- */
function renderClassCards(el) {
  el.innerHTML = Object.keys(CLASSES).map(function (name) {
    const c = CLASSES[name];
    return '<article class="class-card">' +
      '<img src="' + c.img + '" alt="' + name + ' class at PeakForm Fitness">' +
      '<div class="class-card-body"><h3>' + name + "</h3><p>" + c.desc + "</p>" +
      '<p class="muted">' + c.duration + " · Coach: " + c.coach + "</p>" +
      '<a class="btn btn-outline btn-sm" href="classes.html">See times</a></div></article>';
  }).join("");
}

function renderClassDescriptions(el) {
  el.innerHTML = Object.keys(CLASSES).map(function (name) {
    const c = CLASSES[name];
    const times = [];
    TIMETABLE.forEach(function (d) {
      d.slots.forEach(function (s) { if (s[1] === name) times.push(d.day + " " + s[0]); });
    });
    return '<article class="desc-row">' +
      '<img src="' + c.img + '" alt="' + name + ' class at PeakForm Fitness">' +
      '<div><h3>' + name + '</h3><p>' + c.desc + " Sessions run for " + c.duration.toLowerCase() + " and are led by " + c.coach + ".</p>" +
      '<p class="muted">Weekly times: ' + times.join(", ") + ".</p></div></article>";
  }).join("");
}

/* ---------- Trainers ---------- */
function renderTrainers(el, withTimes) {
  el.innerHTML = TRAINERS.map(function (t) {
    let times = "";
    if (withTimes) {
      const list = [];
      TIMETABLE.forEach(function (d) {
        d.slots.forEach(function (s) { if (CLASSES[s[1]].coach === t.name) list.push(d.day + " " + s[0] + " " + s[1]); });
      });
      times = '<p class="muted">Class times: ' + list.join(", ") + ".</p>";
    }
    return '<article class="trainer-card">' +
      '<img src="' + t.img + '" alt="Portrait of ' + t.name + '">' +
      '<div class="trainer-body"><h3>' + t.name + '</h3><p class="role">' + t.role + "</p>" +
      "<p>" + t.spec + ". " + t.leads + ".</p>" + times +
      '<p><span class="demo-tag">Demo profile</span></p></div></article>';
  }).join("");
}

/* ---------- FAQ accordion ---------- */
function initFaq() {
  document.querySelectorAll(".faq-item").forEach(function (item) {
    const btn = item.querySelector(".faq-q");
    const panel = item.querySelector(".faq-a");
    btn.addEventListener("click", function () {
      const open = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* ---------- Mobile nav ---------- */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", function () {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

/* ---------- Form helpers ---------- */
function showErrors(form, errors) {
  let box = form.querySelector(".form-errors");
  if (!box) {
    box = document.createElement("div");
    box.className = "form-errors";
    box.setAttribute("role", "alert");
    form.prepend(box);
  }
  if (errors.length === 0) { box.style.display = "none"; box.innerHTML = ""; return; }
  box.style.display = "block";
  box.innerHTML = "<strong>Please fix the following:</strong><ul>" +
    errors.map(function (e) { return "<li>" + e + "</li>"; }).join("") + "</ul>";
}
function fieldVal(form, name) {
  const f = form.elements[name];
  return f ? f.value.trim() : "";
}
function makeRef() {
  return "PF-" + Math.floor(100000 + Math.random() * 900000);
}

/* ---------- Booking page ---------- */
function initBooking() {
  const form = document.getElementById("booking-form");
  if (!form) return;
  const daySel = form.elements["day"];
  const classSel = form.elements["class"];
  const timeSel = form.elements["time"];

  TIMETABLE.forEach(function (d) {
    const o = document.createElement("option"); o.value = d.day; o.textContent = d.day; daySel.appendChild(o);
  });
  Object.keys(CLASSES).forEach(function (name) {
    const o = document.createElement("option"); o.value = name; o.textContent = name; classSel.appendChild(o);
  });

  function refreshTimes(keep) {
    const day = daySel.value, cls = classSel.value;
    const current = keep ? timeSel.value : "";
    timeSel.innerHTML = "";
    let slots = [];
    TIMETABLE.forEach(function (d) { if (d.day === day) slots = d.slots.filter(function (s) { return s[1] === cls; }); });
    if (slots.length === 0) {
      const o = document.createElement("option"); o.value = ""; o.textContent = "No slot for this day and class";
      timeSel.appendChild(o);
    } else {
      slots.forEach(function (s) {
        const o = document.createElement("option"); o.value = s[0]; o.textContent = s[0]; timeSel.appendChild(o);
      });
      if (current && slots.some(function (s) { return s[0] === current; })) timeSel.value = current;
    }
  }
  daySel.addEventListener("change", function () { refreshTimes(false); });
  classSel.addEventListener("change", function () { refreshTimes(false); });

  const params = new URLSearchParams(window.location.search);
  const pDay = params.get("day"), pClass = params.get("class"), pTime = params.get("time");
  if (pDay && TIMETABLE.some(function (d) { return d.day === pDay; })) daySel.value = pDay;
  if (pClass && CLASSES[pClass]) classSel.value = pClass;
  refreshTimes(false);
  if (pTime) {
    const has = Array.prototype.some.call(timeSel.options, function (o) { return o.value === pTime; });
    if (has) timeSel.value = pTime;
  }

  let submitted = false;
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (submitted) return;
    const errors = [];
    if (!daySel.value) errors.push("Choose a day.");
    if (!classSel.value) errors.push("Choose a class.");
    if (!timeSel.value) errors.push("Choose a time. If no slot is listed, pick another day or class.");
    if (!fieldVal(form, "name")) errors.push("Enter your full name.");
    const phone = fieldVal(form, "phone");
    if (!phone) errors.push("Enter your phone number.");
    else if (phone.replace(/[^0-9]/g, "").length < 10) errors.push("Enter a valid phone number.");
    showErrors(form, errors);
    if (errors.length) return;
    submitted = true;
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true; btn.textContent = "Booking...";
    const ref = makeRef();
    const cls = classSel.value;
    document.getElementById("confirm-details").innerHTML =
      "<p><strong>Class:</strong> " + esc(cls) + "</p>" +
      "<p><strong>Day and time:</strong> " + esc(daySel.value) + " at " + esc(timeSel.value) + "</p>" +
      "<p><strong>Coach:</strong> " + esc(CLASSES[cls].coach) + "</p>" +
      "<p><strong>Length:</strong> " + esc(CLASSES[cls].duration) + "</p>" +
      "<p><strong>Name:</strong> " + esc(fieldVal(form, "name")) + "</p>" +
      "<p><strong>Booking type:</strong> " + esc(fieldVal(form, "kind") || "Guest") + "</p>" +
      '<p class="ref">Booking reference: <strong>' + ref + "</strong></p>";
    form.style.display = "none";
    const conf = document.getElementById("booking-confirm");
    conf.style.display = "block";
    conf.scrollIntoView({ block: "start" });
  });
}

/* ---------- Trial form ---------- */
function initTrial() {
  const form = document.getElementById("trial-form");
  if (!form) return;
  let submitted = false;
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (submitted) return;
    const errors = [];
    if (!fieldVal(form, "name")) errors.push("Enter your full name.");
    const phone = fieldVal(form, "phone");
    if (!phone) errors.push("Enter your phone number.");
    else if (phone.replace(/[^0-9]/g, "").length < 10) errors.push("Enter a valid phone number.");
    if (!fieldVal(form, "goal")) errors.push("Choose your main goal.");
    if (!fieldVal(form, "time")) errors.push("Choose a preferred time.");
    showErrors(form, errors);
    if (errors.length) return;
    submitted = true;
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true; btn.textContent = "Sending...";
    document.getElementById("trial-name").textContent = fieldVal(form, "name");
    document.getElementById("trial-when").textContent = fieldVal(form, "time");
    form.style.display = "none";
    const conf = document.getElementById("trial-confirm");
    conf.style.display = "block";
    conf.scrollIntoView({ block: "start" });
  });
}

/* ---------- Signup form (membership) ---------- */
function initSignup() {
  const form = document.getElementById("signup-form");
  if (!form) return;
  const planSel = form.elements["plan"];
  PLANS.forEach(function (p) {
    const o = document.createElement("option");
    o.value = p.id; o.textContent = p.name + " (" + fmt(p.price) + " " + p.per + ")";
    planSel.appendChild(o);
  });
  const params = new URLSearchParams(window.location.search);
  const wanted = params.get("plan");
  if (wanted && PLANS.some(function (p) { return p.id === wanted; })) planSel.value = wanted;

  function updateSummary() {
    const p = PLANS.find(function (x) { return x.id === planSel.value; }) || PLANS[1];
    const billing = form.elements["billing"].value;
    const el = document.getElementById("signup-summary");
    if (!el) return;
    if (billing === "annual") {
      el.innerHTML = "<strong>" + p.name + ":</strong> " + fmt(p.price * 10) + " for the year (two months free), joining fee waived.";
    } else {
      el.innerHTML = "<strong>" + p.name + ":</strong> " + fmt(p.price) + " " + p.per + ", plus the one time joining fee of Rs 2,000.";
    }
  }
  planSel.addEventListener("change", updateSummary);
  form.querySelectorAll('input[name="billing"]').forEach(function (r) {
    r.addEventListener("change", updateSummary);
  });
  updateSummary();

  let submitted = false;
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (submitted) return;
    const errors = [];
    if (!fieldVal(form, "name")) errors.push("Enter your full name.");
    const phone = fieldVal(form, "phone");
    if (!phone) errors.push("Enter your phone number.");
    else if (phone.replace(/[^0-9]/g, "").length < 10) errors.push("Enter a valid phone number.");
    if (!planSel.value) errors.push("Choose a plan.");
    showErrors(form, errors);
    if (errors.length) return;
    submitted = true;
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true; btn.textContent = "Sending...";
    const p = PLANS.find(function (x) { return x.id === planSel.value; });
    document.getElementById("signup-plan-name").textContent = p.name;
    document.getElementById("signup-ref").textContent = makeRef();
    form.style.display = "none";
    const conf = document.getElementById("signup-confirm");
    conf.style.display = "block";
    conf.scrollIntoView({ block: "start" });
  });
}

/* ---------- Contact form ---------- */
function initContact() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  let submitted = false;
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (submitted) return;
    const errors = [];
    if (!fieldVal(form, "name")) errors.push("Enter your full name.");
    const email = fieldVal(form, "email");
    if (!email) errors.push("Enter your email address.");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Enter a valid email address.");
    if (!fieldVal(form, "message")) errors.push("Write a short message.");
    showErrors(form, errors);
    if (errors.length) return;
    submitted = true;
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true; btn.textContent = "Sending...";
    form.style.display = "none";
    const conf = document.getElementById("contact-confirm");
    conf.style.display = "block";
    conf.scrollIntoView({ block: "start" });
  });
}

/* ---------- Page wiring ---------- */
document.addEventListener("DOMContentLoaded", function () {
  initNav();
  initFaq();
  const pc = document.getElementById("plan-cards");
  if (pc) renderPlanCards(pc);
  const ct = document.getElementById("compare-table");
  if (ct) renderCompareTable(ct);
  const ex = document.getElementById("extras-list");
  if (ex) renderExtras(ex);
  const tt = document.getElementById("tt-body");
  if (tt) {
    renderTimetable(tt, "All");
    document.querySelectorAll(".filter-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        document.querySelectorAll(".filter-btn").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        renderTimetable(tt, b.getAttribute("data-filter"));
      });
    });
  }
  const pv = document.getElementById("tt-preview");
  if (pv) renderPreview(pv);
  const cc = document.getElementById("class-cards");
  if (cc) renderClassCards(cc);
  const cd = document.getElementById("class-descriptions");
  if (cd) renderClassDescriptions(cd);
  const tr = document.getElementById("trainers-grid");
  if (tr) renderTrainers(tr, tr.getAttribute("data-times") === "1");
  initBooking();
  initTrial();
  initSignup();
  initContact();
});
