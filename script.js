const body = document.body;
const menuBtn = document.getElementById("menuBtn");
const globalNav = document.getElementById("globalNav");

function closeMenu() {
  body.classList.remove("nav-open");
  menuBtn?.setAttribute("aria-expanded", "false");
}

menuBtn?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

globalNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const theater = document.querySelector(".scroll-theater");
const acts = document.querySelectorAll(".scroll-theater .act");
const idxs = document.querySelectorAll(".scroll-theater .idx span");
const actIdx = document.getElementById("actIdx");
const progressBar = document.getElementById("pbar");

if (actIdx && theater) {
  const theaterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        actIdx.classList.toggle("visible", entry.isIntersecting);
      });
    },
    { threshold: 0.05 },
  );

  theaterObserver.observe(theater);
}

function updateTheater() {
  if (!theater || !progressBar || acts.length === 0) {
    return;
  }

  const rect = theater.getBoundingClientRect();
  const total = theater.offsetHeight - window.innerHeight;
  const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
  const progress = total > 0 ? scrolled / total : 0;
  const activeIndex = Math.min(acts.length - 1, Math.floor(progress * acts.length));

  progressBar.style.transform = `scaleX(${progress})`;
  acts.forEach((act) => {
    act.classList.toggle("on", Number(act.dataset.i) === activeIndex);
  });
  idxs.forEach((item) => {
    item.classList.toggle("on", Number(item.dataset.i) === activeIndex);
  });
}

window.addEventListener("scroll", updateTheater, { passive: true });
window.addEventListener("resize", updateTheater);
updateTheater();

const pulseFx = document.querySelector(".pulse-fx");
let lastPulse = 0;

document.addEventListener(
  "mousemove",
  (event) => {
    if (!pulseFx || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const now = Date.now();
    if (now - lastPulse < 80) {
      return;
    }
    lastPulse = now;

    const dot = document.createElement("div");
    dot.className = "cursor-pulse";
    dot.style.left = `${event.clientX}px`;
    dot.style.top = `${event.clientY}px`;
    pulseFx.appendChild(dot);
    window.setTimeout(() => dot.remove(), 700);
  },
  { passive: true },
);

const pulseStyle = document.createElement("style");
pulseStyle.textContent = `
  .cursor-pulse {
    position: absolute;
    width: 8px;
    height: 8px;
    border: 1.5px solid rgba(212, 17, 28, 0.6);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    animation: cursor-pulse 0.7s ease-out forwards;
  }

  @keyframes cursor-pulse {
    to {
      width: 40px;
      height: 40px;
      opacity: 0;
    }
  }
`;
document.head.appendChild(pulseStyle);
