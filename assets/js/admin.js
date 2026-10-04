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
