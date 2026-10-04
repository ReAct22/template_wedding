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
function filterClients() {
  const q = document.getElementById("searchClient").value.toLowerCase();
  const status = document.getElementById("filterStatus").value;
  const pkg = document.getElementById("filterPackage").value;
  document.querySelectorAll("#clientList .client-item").forEach((item) => {
    const matchQ = item.dataset.name.includes(q);
    const matchStatus = !status || item.dataset.status === status;
    const matchPkg = !pkg || item.dataset.package === pkg;
    item.style.display = matchQ && matchStatus && matchPkg ? "" : "none";
  });
}

function showPublished() {
  const toastEl = document.getElementById("publishedToast");
  new bootstrap.Toast(toastEl, { delay: 2500 }).show();
}

// ===== Package data =====
let packages = [
  {
    name: "Intimate",
    price: "Rp 15 jt",
    features: "Day-of coordination\nTim 3 koordinator\nHingga 100 tamu",
  },
  {
    name: "Signature",
    price: "Rp 35 jt",
    features: "Full wedding planning\nTim 6 koordinator\nHingga 300 tamu",
  },
  {
    name: "Grand",
    price: "Rp 65 jt",
    features:
      "Full planning + desain custom\nTim 10+ koordinator\nTamu tanpa batas",
  },
];

function renderPkgEditor() {
  const wrap = document.getElementById("pkgEditorList");
  wrap.innerHTML = "";
  packages.forEach((pkg, i) => {
    const card = document.createElement("div");
    card.className = "pkg-editor-card";
    card.innerHTML = `
        <div class="pkg-editor-head">
          <span>Paket ${i + 1}</span>
          <span class="row-action danger" onclick="removePackage(${i})" title="Hapus"><i class="bi bi-trash"></i></span>
        </div>
        <div class="mb-2">
          <label class="builder-label">Nama Paket</label>
          <input type="text" class="form-control" value="${pkg.name}" oninput="updatePkg(${i},'name',this.value)">
        </div>
        <div class="mb-2">
          <label class="builder-label">Harga</label>
          <input type="text" class="form-control" value="${pkg.price}" oninput="updatePkg(${i},'price',this.value)">
        </div>
        <div>
          <label class="builder-label">Fitur (satu per baris)</label>
          <textarea class="form-control" rows="3" oninput="updatePkg(${i},'features',this.value)">${pkg.features}</textarea>
        </div>
      `;
    wrap.appendChild(card);
  });
}

function updatePkg(i, field, val) {
  packages[i][field] = val;
  syncPreview();
}
function addPackage() {
  packages.push({
    name: "Paket Baru",
    price: "Rp 0",
    features: "Fitur 1\nFitur 2",
  });
  renderPkgEditor();
  syncPreview();
}
function removePackage(i) {
  packages.splice(i, 1);
  renderPkgEditor();
  syncPreview();
}

function syncFromHex(colorId, hexId) {
  const hexVal = document.getElementById(hexId).value;
  document.getElementById(colorId).value = hexVal;
  syncPreview();
}

function syncPreview() {
  const businessName = document.getElementById("inBusinessName").value;
  const slug = document.getElementById("inSlug").value;
  const initial = document.getElementById("inInitial").value || "S";
  const primary = document.getElementById("inPrimary").value;
  const accent = document.getElementById("inAccent").value;
  const bg = document.getElementById("inBg").value;
  const fontStyle = document.getElementById("inFontStyle").value;

  document.getElementById("inPrimaryHex").value = primary;
  document.getElementById("inAccentHex").value = accent;
  document.getElementById("inBgHex").value = bg;

  const url = `selaras-app.id/w/${slug || "website-anda"}`;
  document.getElementById("urlPreviewText").textContent = url;
  document.getElementById("browserUrlPill").textContent = url;

  const fontFamily =
    fontStyle === "sans" ? "'Jost', sans-serif" : "'Cormorant Garamond', serif";

  // Hero
  const hero = document.getElementById("prevHero");
  hero.style.background = bg;
  document.getElementById("prevEyebrow").textContent =
    document.getElementById("inEyebrow").value;
  document.getElementById("prevEyebrow").style.color = accent;
  const headlineEl = document.getElementById("prevHeadline");
  headlineEl.textContent = document.getElementById("inHeadline").value;
  headlineEl.style.color = primary;
  headlineEl.style.fontFamily = fontFamily;
  document.getElementById("prevSub").textContent =
    document.getElementById("inSubheadline").value;
  const ctaEl = document.getElementById("prevCta");
  ctaEl.textContent = document.getElementById("inCtaText").value;
  ctaEl.style.background = accent;

  // About
  document.getElementById("prevAboutTitle").textContent =
    document.getElementById("inAboutTitle").value;
  document.getElementById("prevAboutTitle").style.color = primary;
  document.getElementById("prevAboutTitle").style.fontFamily = fontFamily;
  document.getElementById("prevAboutText").textContent =
    document.getElementById("inAboutText").value;

  // Packages
  document.getElementById("prevPkgSection").style.background = bg;
  document.getElementById("prevPkgTitle").style.color = primary;
  document.getElementById("prevPkgTitle").style.fontFamily = fontFamily;
  const pkgRow = document.getElementById("prevPkgRow");
  pkgRow.innerHTML = "";
  packages.forEach((pkg) => {
    const featuresHtml = pkg.features
      .split("\n")
      .filter((f) => f.trim())
      .map((f) => `<li>${f}</li>`)
      .join("");
    const card = document.createElement("div");
    card.className = "prev-pkg-card";
    card.innerHTML = `
        <div class="prev-pkg-name" style="color:${accent};">${pkg.name}</div>
        <div class="prev-pkg-price">${pkg.price}</div>
        <ul class="prev-pkg-features">${featuresHtml}</ul>
      `;
    pkgRow.appendChild(card);
  });

  // Footer
  document.getElementById("prevFooterName").textContent = businessName;
  document.getElementById("prevFooterWa").textContent =
    document.getElementById("inWhatsapp").value;
  document.getElementById("prevFooterIg").textContent =
    document.getElementById("inInstagram").value;
}

renderPkgEditor();
syncPreview();

function showSaved() {
  const toastEl = document.getElementById("savedToast");
  const toast = new bootstrap.Toast(toastEl, { delay: 2500 });
  toast.show();
}
