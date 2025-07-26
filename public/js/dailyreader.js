document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  console.log("🟩 Today's date:", today);

  fetch("/js/dailyreader.json") // Note the leading slash for server-root accuracy
    .then((res) => {
      console.log("📦 Fetched response:", res);
      return res.json();
    })
    .then((data) => {
      console.log("✅ Parsed JSON data:", data);

      const todayEntry = data.find((entry) => entry.date === today);
      console.log("🔍 Matched Entry for Today:", todayEntry);

      if (!todayEntry) {
        console.warn("⚠️ No entry found for today's date:", today);
        return;
      }

      // Inject content into HTML
      document.getElementById("daily-quote").textContent = todayEntry.quote;
      document.getElementById("daily-citation").textContent = `– ${todayEntry.citation}`;
      document.getElementById("lectio-summary").textContent = todayEntry.summary;
      document.getElementById("psalm-summary").textContent = todayEntry.psalm_summary;
      document.getElementById("gospel-summary").textContent = todayEntry.gospel_summary;
      document.getElementById("daily-prayer").textContent = todayEntry.prayer;
      document.getElementById("modern-links").textContent = todayEntry.modern_links;

      // Inject dynamic links
      const readingsLink = document.getElementById("readings-link");
      readingsLink.href = todayEntry.readings_link;

      const usccbLink = document.getElementById("usccb-link");
      usccbLink.href = todayEntry.usccb_link;
    })
    .catch((err) => {
      console.error("❌ Error loading daily readings:", err);
    });
});