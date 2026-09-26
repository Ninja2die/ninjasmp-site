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

function moveShot(delta){
  shotIndex = (shotIndex + delta + shots.length) % shots.length;
  renderShot();
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
