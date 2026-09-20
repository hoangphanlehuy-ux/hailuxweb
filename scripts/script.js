/* ===================================================================
   HAILUX — interactions
   - Hamburger nav toggle
   - Scroll reveal (IntersectionObserver)
   - Before/After compare slider (mouse + touch + keyboard)
   - Copyright year
   =================================================================== */

(function () {
  "use strict";

  /* ---------- Hamburger nav ---------- */
  const burger = document.getElementById("navBurger");
  const menu = document.getElementById("navMenu");
  if (burger && menu) {
    const close = () => {
      menu.classList.remove("is-open");
      burger.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    };
    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  }

  /* ---------- Nav scroll state ---------- */
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".scroll-reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("reveal-active"));
  }

  /* ---------- Before/After compare ---------- */
  function initCompare(el) {
    const range = el.querySelector(".compare__range");
    const setPos = (pct) => {
      const v = Math.max(0, Math.min(100, pct));
      el.style.setProperty("--pos", v + "%");
      if (range && Number(range.value) !== v) range.value = v;
    };

    if (range) range.addEventListener("input", () => setPos(Number(range.value)));

    const moveFromX = (clientX) => {
      const r = el.getBoundingClientRect();
      setPos(((clientX - r.left) / r.width) * 100);
    };
    let dragging = false;
    el.addEventListener("pointerdown", (e) => {
      dragging = true;
      el.setPointerCapture(e.pointerId);
      moveFromX(e.clientX);
    });
    el.addEventListener("pointermove", (e) => { if (dragging) moveFromX(e.clientX); });
    const stop = () => (dragging = false);
    el.addEventListener("pointerup", stop);
    el.addEventListener("pointercancel", stop);

    setPos(range ? Number(range.value) : 50);
  }
  document.querySelectorAll("[data-compare]").forEach(initCompare);

  /* ---------- Phone popup ---------- */
  const phoneToggle = document.getElementById("phoneToggle");
  const phonePopup = document.getElementById("phonePopup");
  if (phoneToggle && phonePopup) {
    const closePopup = () => {
      phonePopup.classList.remove("is-open");
      phonePopup.setAttribute("aria-hidden", "true");
      phoneToggle.setAttribute("aria-expanded", "false");
    };
    const openPopup = () => {
      phonePopup.classList.add("is-open");
      phonePopup.setAttribute("aria-hidden", "false");
      phoneToggle.setAttribute("aria-expanded", "true");
    };
    phoneToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      phonePopup.classList.contains("is-open") ? closePopup() : openPopup();
    });
    document.addEventListener("click", (e) => {
      if (!phonePopup.contains(e.target) && e.target !== phoneToggle) closePopup();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closePopup();
    });
  }

  /* ---------- Copyright year ---------- */
  const yearEl = document.getElementById("copyrightYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
