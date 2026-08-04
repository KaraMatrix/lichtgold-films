/* Lichtgold Films — Vanilla JS, keine Abhängigkeiten, kein externer Request.
   1) Klick-zum-Laden Video-Player: iframe wird ERST beim Klick injiziert.
   2) Scroll-Reveal (Fade + TranslateY): respektiert prefers-reduced-motion.
   3) Mobile Nav (Burger-Button + Overlay), einmal zentral statt pro Seite dupliziert. */

(function () {
  var burger = document.querySelector(".burger");
  var overlay = document.getElementById("nav-overlay");
  if (!burger || !overlay) return;

  burger.addEventListener("click", function () {
    var isOpen = overlay.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  overlay.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      overlay.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
})();

document.addEventListener("click", function (event) {
  var button = event.target.closest(".video-facade");
  if (!button) return;

  var platform = button.dataset.platform;
  var id = button.dataset.videoId;
  var src = platform === "youtube"
    ? "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0"
    : "https://player.vimeo.com/video/" + id + "?autoplay=1&dnt=1";

  var iframe = document.createElement("iframe");
  iframe.src = src;
  iframe.title = (button.getAttribute("aria-label") || "Video").replace(" – Video laden und abspielen", "");
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer";
  iframe.allow = "autoplay; fullscreen; picture-in-picture";
  iframe.allowFullscreen = true;
  iframe.className = "video-embed__iframe";
  button.replaceWith(iframe);
});

(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var elements = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    elements.forEach(function (el) { el.classList.add("reveal--visible"); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal--visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(function (el) { observer.observe(el); });
})();
