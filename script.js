/*
 * RIATIS Sports — Pulse Driven
 * 機能単位の init*() で構成する。新規コンポーネントも同パターンで追加する。
 * docs/DESIGN.md §5 参照。
 */

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

/* MobileMenu: ハンバーガー開閉とフォーカス周り */
function initMobileMenu() {
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
}

/* Reveal: .reveal 要素のスクロール表示 */
function initReveal() {
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
}

/* StatementBlock: scroll-theater のsticky演出と進捗バー
   reduced-motion時は §4.2 のフォールバック(縦積みリスト)に CSS 側で
   切り替わるため、scroll/resize リスナーや transform 更新は不要 */
function initScrollTheater() {
  if (reducedMotionQuery.matches) return;

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
}

/* CursorPulse: カーソル追従の波紋(reduced-motion時は無効) */
function initCursorPulse() {
  const pulseFx = document.querySelector(".pulse-fx");
  let lastPulse = 0;

  document.addEventListener(
    "mousemove",
    (event) => {
      if (!pulseFx || reducedMotionQuery.matches) {
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
}

/* HeaderTheme: ヘッダー直下にあるセクションの data-theme を .site-header に反映。
   DESIGN.md §9 Phase 5 サブ課題(:466)。mix-blend-mode を使わずに、IntersectionObserver
   と probe(ヘッダー下端付近の y 座標)で active セクションを判定して属性をトグルする。 */
function initHeaderTheme() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const themed = Array.from(
    document.querySelectorAll("section[data-theme], footer[data-theme]"),
  );
  if (themed.length === 0) return;

  const PROBE_Y = 32; // ヘッダー上端から少し下のスキャンライン
  let current = null;

  function apply(active) {
    if (!active || active === current) return;
    current = active;
    if (active.dataset.theme === "light") {
      header.setAttribute("data-on-light", "");
    } else {
      header.removeAttribute("data-on-light");
    }
  }

  function resolveActive() {
    for (const el of themed) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= PROBE_Y && rect.bottom > PROBE_Y) {
        return el;
      }
    }
    // ページ最上部より上の場合は最初、最下部より下の場合は最後を採用。
    const firstRect = themed[0].getBoundingClientRect();
    return firstRect.top > PROBE_Y ? themed[0] : themed[themed.length - 1];
  }

  const observer = new IntersectionObserver(
    () => apply(resolveActive()),
    { rootMargin: "0px 0px -70% 0px", threshold: [0, 0.5, 1] },
  );
  themed.forEach((el) => observer.observe(el));

  window.addEventListener("resize", () => apply(resolveActive()));
  apply(resolveActive());
}

/* Opening: マスクライズ オープニング演出の終了処理(タイムラインはCSS主導)
   - 通常時: CSSのopening-overlay-fade完了でクリーンアップ
   - reduced-motion時: 最終状態を即時表示 → 1秒ホールド → フェードアウト
   - 1セッション1回再生にしたい場合は sessionStorage gate を有効化 */
function initOpening() {
  const overlay = document.getElementById("opening");
  const body = document.body;

  if (!overlay) {
    body.classList.remove("opening-active");
    return;
  }

  // const OPENING_KEY = "riatis-opening-played";
  // if (sessionStorage.getItem(OPENING_KEY) === "1") {
  //   overlay.remove();
  //   body.classList.remove("opening-active");
  //   return;
  // }
  // sessionStorage.setItem(OPENING_KEY, "1");

  /* 立体押し出しシャドウ: dx/dy方向に0.5px刻みでtext-shadow多段を重ね、
     文字本体から連続した押し出しを作る。CSS transitionでは段数変動を
     補間できないため rAF で毎フレーム再生成して適用する。 */
  function buildExtrudeShadow(depth, dx, dy, color) {
    if (depth <= 0.01) return "none";
    const step = 0.5;
    const layers = [];
    for (let d = step; d < depth - 0.001; d += step) {
      layers.push(`${(d * dx).toFixed(2)}px ${(d * dy).toFixed(2)}px 0 ${color}`);
    }
    layers.push(`${(depth * dx).toFixed(2)}px ${(depth * dy).toFixed(2)}px 0 ${color}`);
    return layers.join(", ");
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateExtrudeShadow(target, params) {
    const t0 = performance.now();
    function tick(now) {
      if (!target.isConnected) return;
      const t = Math.min(1, (now - t0) / params.duration);
      const depth = easeOutCubic(t) * params.maxDepth;
      target.style.textShadow = buildExtrudeShadow(depth, params.dx, params.dy, params.color);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function readShadowParams() {
    const cs = getComputedStyle(overlay);
    return {
      start: parseFloat(cs.getPropertyValue("--t-shadow-start")) || 3200,
      duration: parseFloat(cs.getPropertyValue("--t-shadow-dur")) || 340,
      maxDepth: parseFloat(cs.getPropertyValue("--shadow-depth")) || 7,
      dx: parseFloat(cs.getPropertyValue("--shadow-dx")) || 1,
      dy: parseFloat(cs.getPropertyValue("--shadow-dy")) || -1,
      color: (cs.getPropertyValue("--shadow-color") || "#7f0b00").trim(),
    };
  }

  let finished = false;
  function finish() {
    if (finished) return;
    finished = true;
    overlay.remove();
    body.classList.remove("opening-active");
  }

  function start() {
    overlay.classList.add("opening--ready");
    const logo = overlay.querySelector(".opening__logo");
    const shadow = readShadowParams();

    if (reducedMotionQuery.matches) {
      overlay.classList.add("opening--reduced");
      if (logo) {
        logo.style.textShadow = buildExtrudeShadow(
          shadow.maxDepth, shadow.dx, shadow.dy, shadow.color,
        );
      }
      window.setTimeout(() => {
        overlay.classList.add("opening--fading");
      }, 1000);
      // ホールド1s + フェード600ms + 余裕
      window.setTimeout(finish, 2000);
      return;
    }

    if (logo) {
      window.setTimeout(() => {
        animateExtrudeShadow(logo, shadow);
      }, shadow.start);
    }

    overlay.addEventListener("animationend", (event) => {
      if (event.target === overlay && event.animationName === "opening-overlay-fade") {
        finish();
      }
    });

    // セーフティネット: animationend が発火しない環境向けの保険
    window.setTimeout(finish, 6500);
  }

  // フォント読み込み完了を待つ(Inter / Noto Sans JP の幅確定後にマスクライズ開始)。
  // 環境によりフォントが極端に遅い場合に備え 2.5s でタイムアウトして強制開始。
  if (document.fonts && document.fonts.ready) {
    let started = false;
    const startOnce = () => {
      if (started) return;
      started = true;
      start();
    };
    document.fonts.ready.then(startOnce);
    window.setTimeout(startOnce, 2500);
  } else {
    start();
  }
}

initMobileMenu();
initReveal();
initScrollTheater();
initCursorPulse();
initHeaderTheme();
initOpening();
