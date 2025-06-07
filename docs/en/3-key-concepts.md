# 3. Core Programmatic Concepts

> **Module goal:**
> Upon completion, you will be able to list and explain the most important terms related to DSPs, SSPs, header bidding, and other programmatic ecosystem elements.

---

## 1. Acronyms
- **DSP (Demand-Side Platform)** – platform for advertisers to buy media.
- **SSP (Supply-Side Platform)** – platform for publishers to sell inventory.
- **RTB (Real-Time Bidding)** – real-time auction.
- **DMP (Data Management Platform)** – system for collecting and managing audience data.
- **CDP (Customer Data Platform)** – first-party customer database with integrated sources.

---

## 2. Header Bidding
**Header Bidding** (Prebid)

- A technique where the browser sends requests to multiple SSPs in parallel before fetching the creative.
- Increases competition and publisher yield.

::: tip
Header Bidding can boost publisher revenue by 10–30%.
:::

---

## 3. Ad Server vs. Ad Exchange
| Component    | Role                                           |
|--------------|------------------------------------------------|
| Ad Server    | Stores creatives, handles targeting, measures impressions |
| Ad Exchange  | Auction marketplace, intermediary between SSPs and DSPs |

---

## 4. SDF (Structured Data Files)
- A CSV/TSV format used in DV360 for bulk operations.
- Contains details of line items, creatives, targeting.

::: warning
Watch out for file size limits and correct header formatting when working with SDF.
:::

---

## 5. DMP vs. CDP
- **DMP**: mainly third-party, anonymized data for targeting.
- **CDP**: first-party, personalized data for CRM and segmentation.

---

## 6. Practical Checklist
::: checklist
- [ ] I know the difference between DSP and SSP
- [ ] I understand how Header Bidding works
- [ ] I can explain the roles of Ad Exchange vs. Ad Server
- [ ] I know when to use SDF
- [ ] I understand the difference between DMP and CDP
:::

---

## 7. Further Reading / Links
- [Prebid.js Documentation](https://docs.prebid.org/)
- [Google DV360 SDF Guide](https://support.google.com/displayvideo/answer/)
- [Glossary: DMP](../glossary/dmp.md)
- [Glossary: CDP](../glossary/cdp.md)

---

<button class="flashcard">Show Header Bidding definition</button>
<div class="answer" hidden>
Header Bidding is a technique where the browser sends ad requests to multiple SSPs in parallel before the Ad Server renders the creative, increasing competition and yield.
</div>
