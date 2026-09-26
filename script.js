const toast = document.getElementById("toast");
function showToast(text){
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(window.__t);
  window.__t = setTimeout(()=>toast.classList.remove("show"),1600);
}
document.querySelectorAll(".copy").forEach(btn=>{
  btn.addEventListener("click", async ()=>{
    const value = btn.dataset.copy;
    try{
      await navigator.clipboard.writeText(value);
      showToast("Αντιγράφηκε: " + value);
    }catch(e){
      showToast(value);
    }
  });
});
