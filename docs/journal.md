# Journal: Dziennik nauki

> **Jak korzystać?**
> Ten dziennik możesz edytować bezpośrednio w przeglądarce. Twoje notatki, pytania i wnioski będą automatycznie zapisywane w pamięci przeglądarki (localStorage).

---

<textarea id="journal-entry" style="width:100%; height:300px; font-family:inherit; font-size:1rem; padding:0.5rem; border:1px solid #ccc; border-radius:0.25rem;">
</textarea>

<button id="save-journal" style="margin-top:0.5rem; padding:0.5rem 1rem; background-color:#4caf50; color:#fff; border:none; border-radius:0.25rem; cursor:pointer;">
  Zapisz notatki
</button>

<style>
  #journal-entry {
    background-color: var(--md-default-background);
    color: var(--md-default-text);
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const key = 'programmatic-journal';
    const textarea = document.getElementById('journal-entry');
    const saveBtn = document.getElementById('save-journal');
    let timeoutId;

    // Load saved content
    const saved = localStorage.getItem(key);
    if (saved) {
      textarea.value = saved;
    }

    // Auto-save on input (debounced)
    textarea.addEventListener('input', function() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        localStorage.setItem(key, textarea.value);
        saveBtn.textContent = 'Zapisano ✓';
        setTimeout(() => { saveBtn.textContent = 'Zapisz notatki'; }, 2000);
      }, 1000); // autosave 1s po ostatnim wpisie
    });

    // Save on button click (fallback)
    saveBtn.addEventListener('click', function() {
      localStorage.setItem(key, textarea.value);
      saveBtn.textContent = 'Zapisano ✓';
      setTimeout(() => { saveBtn.textContent = 'Zapisz notatki'; }, 2000);
    });
  });
</script>
