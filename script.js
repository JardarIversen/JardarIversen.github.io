function scrollToSection(event) {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute("href");
  const target = document.querySelector(targetId);
  const headerHeight = document.querySelector("header").offsetHeight;

  window.scrollTo({
    top: target.offsetTop - headerHeight - 200,
    behavior: "smooth",
  });
}
