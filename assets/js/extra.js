document.addEventListener('DOMContentLoaded', function() {
  // === Message of the Day ===
  const tips = [
    "RTB (Real-Time Bidding) odbywa się w mniej niż 100 ms.",
    "Header Bidding może zwiększyć yield nawet o 20%.",
    "DV360 jest częścią Google Marketing Platform.",
    "Equativ Maestro umożliwia zaawansowaną analizę viewability.",
    "SDF (Structured Data Files) to eksporty używane w DV360."
  ];

  const motdKeyDate = 'motd-date';
  const motdKeyTip = 'motd-tip';
  const today = new Date().toISOString().slice(0, 10);
  const lastDate = localStorage.getItem(motdKeyDate);

  if (lastDate !== today) {
    const tip = tips[Math.floor(Math.random() * tips.length)];
    localStorage.setItem(motdKeyDate, today);
    localStorage.setItem(motdKeyTip, tip);
  }

  const motdEl = document.getElementById('motd');
  if (motdEl) {
    motdEl.innerHTML = `**Czy wiesz, że...**<br>${localStorage.getItem(motdKeyTip)}`;
  }

  // === Flashcards ===
  document.querySelectorAll('.flashcard').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      if (answer) {
        answer.hidden = !answer.hidden;
        btn.textContent = answer.hidden ? 'Pokaż definicję' : 'Ukryj definicję';
      }
    });
  });
});
