// Navbar shrink on scroll
const nav = document.getElementById("mainNav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
});

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 },
);
revealEls.forEach((el) => io.observe(el));

function togglePw(id, el) {
  const input = document.getElementById(id);
  if (input.type === "password") {
    input.type = "text";
    el.classList.remove("bi-eye");
    el.classList.add("bi-eye-slash");
  } else {
    input.type = "password";
    el.classList.remove("bi-eye-slash");
    el.classList.add("bi-eye");
  }
}

function checkStrength(val) {
  const bar = document.getElementById("strengthBar");
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  const pct = (score / 4) * 100;
  bar.style.width = pct + "%";
  bar.style.background =
    pct <= 25
      ? "#C2695A"
      : pct <= 50
        ? "#B08D4F"
        : pct <= 75
          ? "#8C9A5C"
          : "#5C6B54";
}
