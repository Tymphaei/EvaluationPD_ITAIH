document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth < 800) {
    window.location.href = "/forbidden";
  }
});
