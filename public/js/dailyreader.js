document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  fetch('/js/dailyreader.json')
    .then((res) => res.json())
    .then((data) => {
      const todayEntry = data.find((entry) => entry.date === today);
      if (!todayEntry) {
        console.warn("No entry for today:", today);
        return;
      }

      document.getElementById("daily-quote").textContent = todayEntry.quote;
      document.getElementById("daily-citation").textContent = `— ${todayEntry.citation}`;
      document.getElementById("lectio-summary").textContent = todayEntry.summary;
      document.getElementById("psalm-summary").textContent = todayEntry.psalm_summary;
      document.getElementById("gospel-summary").textContent = todayEntry.gospel_summary;
      document.getElementById("daily-prayer").textContent = todayEntry.prayer;
      document.getElementById("modern-links").textContent = todayEntry.modern_links;

      const usccbLink = document.getElementById("usccb-link");
      usccbLink.href = todayEntry.usccb_link;
    })
    .catch((err) => {
      console.error("Error loading daily readings:", err);
    });
});