(async function () {
  document.addEventListener("DOMContentLoaded", function () {
    const drawer = document.getElementById("drawer-content");
    const openScheduleButton = document.getElementById("open-schedule");

    openScheduleButton.addEventListener("click", function () {
      document.getElementById("drawer-content").classList.add("open");
      openScheduleButton.style.visibility = "hidden"; // Hide the button when drawer is open
    });
    document
      .getElementById("close-schedule")
      .addEventListener("click", function () {
        document.getElementById("drawer-content").classList.remove("open");
        openScheduleButton.style.visibility = "visible";
      });
    document.addEventListener("click", function (e) {
      if (
        drawer.classList.contains("open") &&
        !drawer.contains(e.target) &&
        e.target !== openScheduleButton
      ) {
        openScheduleButton.classList.remove("hidden");
        openScheduleButton.style.visibility = "visible";
      }
    });
  });
})();
