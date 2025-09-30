// Hover highlight for skills
document.querySelectorAll(".skills li").forEach(item => {
  item.addEventListener("mouseover", () => {
    item.style.color = "#ffcc66";
  });
  item.addEventListener("mouseout", () => {
    item.style.color = "white";
  });
});

