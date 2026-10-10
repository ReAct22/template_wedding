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
