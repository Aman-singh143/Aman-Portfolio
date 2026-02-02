const typed = new Typed(".auto-type", {
  strings: ["Python Developer", "Data Analytics", "AI + RAG Systems"],
  typeSpeed: 40,
  backSpeed: 30,
  loop: true,
});

const navToggle = document.getElementById("nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navToggle) {
      navToggle.checked = false;
    }
  });
});
