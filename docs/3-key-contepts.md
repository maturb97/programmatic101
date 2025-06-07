# 3. Kluczowe pojęcia DSP i branży programmatic

> **Cel modułu:**
> Uczestnik po ukończeniu modułu potrafi wymienić i objaśnić najważniejsze terminy związane z DSP, SSP, header bidding oraz innymi elementami ekosystemu programmatic.

---

## 1. Podstawowe akronimy
- **DSP (Demand-Side Platform)** – platforma do zakupu mediów przez reklamodawców.
- **SSP (Supply-Side Platform)** – platforma do sprzedaży powierzchni reklamowej przez wydawców.
- **RTB (Real-Time Bidding)** – licytacja w czasie rzeczywistym.
- **DMP (Data Management Platform)** – system do zbierania i zarządzania danymi o użytkownikach.
- **CDP (Customer Data Platform)** – baza danych klientów z integracją źródeł first-party.

---

## 2. Header Bidding
**Header Bidding** (Prebid)

- Technika, w której przeglądarka równolegle wysyła zapytania do wielu SSP, zanim pobierze kreację.
- Zwiększa konkurencję i yield dla wydawcy.

::: tip
Header Bidding może podnieść przychody wydawcy nawet o 10–30%.
:::

---

## 3. Ad Server vs. Ad Exchange
| Komponent       | Rola                                             |
|-----------------|--------------------------------------------------|
| Ad Server       | Przechowywanie kreacji, targetowanie, pomiar     |
| Ad Exchange     | Rynek aukcyjny, pośrednik między SSP a DSP       |

---

## 4. SDF (Structured Data Files)
- Format CSV/TSV używany w DV360 do masowych operacji (bulk edits).
- Zawiera szczegóły line items, creatives, targeting.

::: warning
Przy pracy z SDF pamiętaj o limitach wielkości pliku i poprawnym formacie nagłówków.
:::

---

## 5. DMP vs CDP
- **DMP**: dane głównie third-party, anonymized, służące do targetowania.
- **CDP**: dane first-party, personalizowane, wykorzystywane do CRM i segmentacji.

---

## 6. Practical Checklist
::: checklist
- [ ] Znam różnicę między DSP i SSP
- [ ] Wiem, na czym polega Header Bidding
- [ ] Potrafię wyjaśnić funkcję Ad Exchange vs Ad Server
- [ ] Rozumiem, kiedy używać SDF
- [ ] Znam różnicę między DMP a CDP
:::

---

## 7. Further Reading / Linki
- [Prebid.js Documentation](https://docs.prebid.org/)
- [Google DV360 SDF Guide](https://support.google.com/displayvideo/answer/...) 
- [Glossary: DMP](../glossary/dmp.md)
- [Glossary: CDP](../glossary/cdp.md)

---

<button class="flashcard">Pokaż definicję Header Bidding</button>
<div class="answer" hidden>
Header Bidding to technika, w której zapytania o reklamy wysyłane są równolegle do wielu SSP, zanim AD Server wyświetli kreację, co zwiększa konkurencję i yield.
</div>
