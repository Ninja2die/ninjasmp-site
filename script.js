const toast = document.getElementById("toast");

function showToast(text){
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
}

document.querySelectorAll(".copy").forEach(btn => {
  btn.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const value = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      showToast("Αντιγράφηκε: " + value);
    } catch {
      showToast(value);
    }
  });
});

// Screenshot lightbox / carousel
const shots = [...document.querySelectorAll(".screenshot-link")];
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxCounter = document.getElementById("lightboxCounter");
const closeBtn = document.getElementById("lightboxClose");
const prevBtn = document.getElementById("lightboxPrev");
const nextBtn = document.getElementById("lightboxNext");

let shotIndex = 0;

function renderShot(){
  if(!shots.length) return;
  const shot = shots[shotIndex];
  lightboxImage.src = shot.currentSrc || shot.src;
  lightboxImage.alt = shot.alt || "";
  lightboxCaption.textContent = shot.dataset.caption || shot.alt || "";
  lightboxCounter.textContent = `${shotIndex + 1} / ${shots.length}`;
}

function openLightbox(index){
  shotIndex = index;
  renderShot();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-lock");
}

function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-lock");
}

let slideAnimating = false;

function moveShot(delta){
  if (!shots.length || slideAnimating) return;

  slideAnimating = true;
  const direction = delta > 0 ? 1 : -1;

  // Slide current image out.
  lightboxImage.classList.remove(
    "slide-enter-from-right",
    "slide-enter-from-left",
    "slide-enter-active"
  );
  lightboxImage.classList.add(
    direction > 0 ? "slide-exit-left" : "slide-exit-right"
  );

  window.setTimeout(() => {
    shotIndex = (shotIndex + delta + shots.length) % shots.length;

    const shot = shots[shotIndex];
    lightboxImage.src = shot.currentSrc || shot.src;
    lightboxImage.alt = shot.alt || "";
    lightboxCaption.textContent = shot.dataset.caption || shot.alt || "";
    lightboxCounter.textContent = `${shotIndex + 1} / ${shots.length}`;

    lightboxImage.classList.remove("slide-exit-left", "slide-exit-right");
    lightboxImage.classList.add(
      direction > 0 ? "slide-enter-from-right" : "slide-enter-from-left"
    );

    // Force a frame so the browser can animate from the starting position.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        lightboxImage.classList.add("slide-enter-active");
      });
    });

    window.setTimeout(() => {
      lightboxImage.classList.remove(
        "slide-enter-from-right",
        "slide-enter-from-left",
        "slide-enter-active"
      );
      slideAnimating = false;
    }, 190);
  }, 145);
}

shots.forEach((shot, index) => {
  shot.setAttribute("tabindex", "0");
  shot.setAttribute("role", "button");
  shot.setAttribute("aria-label", `Άνοιγμα φωτογραφίας ${index + 1} από ${shots.length}`);
  shot.addEventListener("click", () => openLightbox(index));
  shot.addEventListener("keydown", e => {
    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      openLightbox(index);
    }
  });
});

closeBtn?.addEventListener("click", closeLightbox);
prevBtn?.addEventListener("click", () => moveShot(-1));
nextBtn?.addEventListener("click", () => moveShot(1));

lightbox?.addEventListener("click", e => {
  if(e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", e => {
  if(!lightbox?.classList.contains("open")) return;
  if(e.key === "Escape") closeLightbox();
  if(e.key === "ArrowLeft") moveShot(-1);
  if(e.key === "ArrowRight") moveShot(1);
});

// Mobile swipe για screenshots
let touchStartX = 0;
let touchStartY = 0;
let swipeActive = false;

lightbox?.addEventListener("touchstart", (e) => {
  if (e.target.closest("button")) {
    swipeActive = false;
    return;
  }

  const touch = e.changedTouches[0];
  touchStartX = touch.screenX;
  touchStartY = touch.screenY;
  swipeActive = true;
}, { passive: true });

lightbox?.addEventListener("touchend", (e) => {
  if (!swipeActive) return;

  const touch = e.changedTouches[0];
  const deltaX = touch.screenX - touchStartX;
  const deltaY = touch.screenY - touchStartY;

  if (
    Math.abs(deltaX) > 50 &&
    Math.abs(deltaX) > Math.abs(deltaY)
  ) {
    if (deltaX < 0) {
      moveShot(1);
    } else {
      moveShot(-1);
    }
  }

  swipeActive = false;
}, { passive: true });
// Live Minecraft server status
const serverLiveBtn = document.getElementById("serverLiveBtn");
const serverStatus = document.getElementById("serverStatus");
const serverPlayers = document.getElementById("serverPlayers");
const serverDot = document.getElementById("serverDot");

async function updateServerStatus() {
  try {
    const response = await fetch(
      "https://api.mcstatus.io/v2/status/java/NinjaSMP.gr"
    );

    if (!response.ok) {
      throw new Error("Status API error");
    }

    const data = await response.json();

    if (data.online) {
      const online = data.players?.online ?? 0;
      const max = data.players?.max ?? "?";

      serverStatus.textContent = `🟢 Online • ${online}/${max} παίκτες`;
      serverPlayers.textContent = "NinjaSMP.gr";

      serverDot.classList.remove("offline");
      serverDot.classList.add("online");
    } else {
      serverStatus.textContent = "🔴 Server Offline";
      serverPlayers.textContent = "NinjaSMP.gr";

      serverDot.classList.remove("online");
      serverDot.classList.add("offline");
    }
  } catch (error) {
    serverStatus.textContent = "Status προσωρινά μη διαθέσιμο";
    serverPlayers.textContent = "NinjaSMP.gr";

    serverDot.classList.remove("online", "offline");
  }
}

updateServerStatus();

// refresh κάθε 60 δευτερόλεπτα
setInterval(updateServerStatus, 60000);
