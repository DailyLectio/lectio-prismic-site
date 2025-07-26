document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  ffetch('/js/dailyreader.json')
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

      const usccbLink = document.getElementById("usccb-link");
      usccbLink.href = todayEntry.usccb_link;
    })
    .catch((err) => {
      console.error("Error loading daily readings:", err);
    });
    document.addEventListener('DOMContentLoaded', async () => {
  const today = new Date().toISOString().split('T')[0];
  const response = await fetch('/data/dailyreader.json');
  const data = await response.json();
  const todayData = data[today];

  if (todayData) {
    document.getElementById('quote').textContent = todayData.quote;
    document.getElementById('citation').textContent = `— ${todayData.citation || ''}`;
    document.getElementById('readings-link').href = todayData.usccb_link || '#';
    document.getElementById('modern-links').textContent = todayData.modern_links || '';
    // Other existing injections…
  }
});