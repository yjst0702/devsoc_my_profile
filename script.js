const hamburgerMenu = document.querySelector("#hamburger-menu");
const overlay = document.querySelector("#overlay");
const nav1 = document.querySelector("#nav-1");
const nav2 = document.querySelector("#nav-2");
const nav3 = document.querySelector("#nav-3");
const nav4 = document.querySelector("#nav-4");
const nav5 = document.querySelector("#nav-5");
const navItems = [nav1, nav2, nav3, nav4, nav5];

function navAnimation(val1, val2) {
  navItems.forEach((nav, i) => {
    nav.classList.replace(`slide-${val1}-${i + 1}`, `slide-${val2}-${i + 1}`);
  });
}

function toggleNav() {
  hamburgerMenu.classList.toggle("active");
  overlay.classList.toggle("overlay-active");

  if (overlay.classList.contains("overlay-active")) {
    overlay.classList.replace("overlay-slide-left", "overlay-slide-right");
    navAnimation("out", "in");
  } else {
    overlay.classList.replace("overlay-slide-right", "overlay-slide-left");
    navAnimation("in", "out");
  }
}

hamburgerMenu.addEventListener("click", toggleNav);
navItems.forEach((nav) => nav.addEventListener("click", toggleNav));

//scroll animation
document.addEventListener("DOMContentLoaded", () => {
  const bars = document.querySelectorAll(".progress-bar");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // start 0%
  bars.forEach((bar) => {
    const inlineTarget = bar.style.getPropertyValue("--target-width");
    const dataTarget = bar.dataset.target;
    const finalTarget = dataTarget || inlineTarget || "0%";
    bar.dataset.targetWidth = finalTarget;
    bar.style.setProperty("--target-width", finalTarget);
    if (reduceMotion) bar.style.width = finalTarget;
    else {
      bar.style.width = "0%";
      bar.style.animationPlayState = "paused";
    }
  });

  if (reduceMotion) return;

  // reset
  const restartAnim = (bar) => {
    bar.style.animation = "none";
    void bar.offsetWidth;
    bar.style.animation = "";
    bar.style.animationPlayState = "running";
  };

  const resetBar = (bar) => {
    bar.style.animation = "none";
    bar.style.width = "0%";
    void bar.offsetWidth;
    bar.style.animation = "";
    bar.style.animationPlayState = "paused";
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const bar = entry.target;
        if (entry.isIntersecting) {
          const target = bar.dataset.targetWidth || "0%";
          bar.style.setProperty("--target-width", target);
          restartAnim(bar);
        } else {
          resetBar(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  bars.forEach((bar) => observer.observe(bar));
});
