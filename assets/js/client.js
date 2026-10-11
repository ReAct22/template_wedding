function toggleSidebar(forceClose) {
  const sb = document.getElementById("sidebar");
  const ov = document.getElementById("overlay");
  if (forceClose) {
    sb.classList.remove("open");
    ov.classList.remove("show");
    return;
  }
  sb.classList.toggle("open");
  ov.classList.toggle("show");
}

function filterTimeline(btn, status) {
  document
    .querySelectorAll(".timeline-filter button")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll("#timelineList .timeline-item").forEach((item) => {
    item.style.display =
      status === "all" || item.dataset.status === status ? "" : "none";
  });
}

function showSession(btn, key) {
  document
    .querySelectorAll(".rundown-tabs button")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("session-akad").style.display =
    key === "akad" ? "" : "none";
  document.getElementById("session-resepsi").style.display =
    key === "resepsi" ? "" : "none";
}

const starIcons = document.querySelectorAll("#starInput i");
starIcons.forEach((star) => {
  star.addEventListener("click", () => {
    const val = parseInt(star.dataset.val);
    starIcons.forEach((s) =>
      s.classList.toggle("active", parseInt(s.dataset.val) <= val),
    );
  });
});

function filterVendors() {
  const q = document.getElementById("searchVendor").value.toLowerCase();
  const cat = document.getElementById("filterCategory").value;
  document.querySelectorAll("#vendorGrid > div").forEach((card) => {
    const matchQ = card.dataset.name.includes(q);
    const matchCat = !cat || card.dataset.category === cat;
    card.style.display = matchQ && matchCat ? "" : "none";
  });
}

let currentStatus = "all";

function filterBooking(btn, status) {
  document
    .querySelectorAll(".booking-filter button")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  currentStatus = status;
  applyBookingFilter();
}

function applyBookingFilter() {
  const q = document.getElementById("searchBooking").value.toLowerCase();
  let visible = 0;
  document.querySelectorAll("#bookingList .booking-card").forEach((card) => {
    const matchQ = card.dataset.name.includes(q);
    const matchStatus =
      currentStatus === "all" || card.dataset.status === currentStatus;
    const show = matchQ && matchStatus;
    card.style.display = show ? "" : "none";
    if (show) visible++;
  });
  document.getElementById("noResult").style.display =
    visible === 0 ? "block" : "none";
}

function filterExpenses() {
  const q = document.getElementById("searchExpense").value.toLowerCase();
  const cat = document.getElementById("filterCategory").value;
  document.querySelectorAll("#expenseList .expense-item").forEach((item) => {
    const desc = item.dataset.desc;
    const rowCat = item.dataset.category.replace("&amp;", "&");
    const matchQ = desc.includes(q);
    const matchCat = !cat || rowCat === cat;
    item.style.display = matchQ && matchCat ? "" : "none";
  });
}

function filterPayments(btn, status) {
  document
    .querySelectorAll(".payment-filter button")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll("#paymentList .payment-item").forEach((item) => {
    item.style.display =
      status === "all" || item.dataset.status === status ? "" : "none";
  });
}

function filterCheckin(btn, status) {
  document
    .querySelectorAll(".checkin-filter button")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll("#checkinAllList .checkin-item").forEach((item) => {
    item.style.display =
      status === "all" || item.dataset.status === status ? "" : "none";
  });
}

function filterGuests() {
  const q = document.getElementById("searchGuest").value.toLowerCase();
  const grp = document.getElementById("filterGroup").value;
  const rsvp = document.getElementById("filterRsvp").value;
  document.querySelectorAll("#guestTable tbody tr").forEach((row) => {
    const name = row.querySelector(".guest-name").textContent.toLowerCase();
    const matchQ = name.includes(q);
    const matchGrp = !grp || row.dataset.group === grp;
    const matchRsvp = !rsvp || row.dataset.rsvp === rsvp;
    row.style.display = matchQ && matchGrp && matchRsvp ? "" : "none";
  });
}

function filterResponses(btn, status) {
  document
    .querySelectorAll(".rsvp-filter button")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll("#responseList .response-item").forEach((item) => {
    item.style.display =
      status === "all" || item.dataset.status === status ? "" : "none";
  });
}

function filterNotes() {
  const q = document.getElementById("searchNote").value.toLowerCase();
  const cat = document.getElementById("filterNoteCat").value;
  document.querySelectorAll("#notesGrid > div").forEach((card) => {
    const matchQ =
      card.dataset.title.includes(q) || card.dataset.content.includes(q);
    const matchCat = !cat || card.dataset.category === cat;
    card.style.display = matchQ && matchCat ? "" : "none";
  });
}
document.querySelectorAll(".note-pin").forEach((pin) => {
  pin.addEventListener("click", () => {
    pin.classList.toggle("bi-pin-angle");
    pin.classList.toggle("bi-pin-angle-fill");
  });
});

function showSaved() {
  const toastEl = document.getElementById("savedToast");
  const toast = new bootstrap.Toast(toastEl, { delay: 2500 });
  toast.show();
}
