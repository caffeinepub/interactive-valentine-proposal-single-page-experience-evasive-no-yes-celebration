# Specification

## Summary
**Goal:** Update the Valentine proposal interaction so the NO button is evasive immediately, never focusable/clickable, includes the new phrase exactly, and the heart background becomes denser near the bottom after YES.

**Planned changes:**
- Make the NO button auto-move from initial page load while keeping hover/tap as the only trigger for phrase progression, size shrink, and speed-up.
- Prevent the NO button from being focusable via keyboard navigation and ensure it cannot be activated by Enter/Space, while still dodging touch interactions without causing page scroll.
- Add the phrase `One More  Chance 🥺💝💕, Please Binnu!! 🙏 🙏 ` to the existing NO button phrase progression list exactly as provided (including spacing/emojis), without removing or unexpectedly reordering other phrases.
- After YES (celebrating/completed state), increase heart background particle density and bias the concentration toward the bottom of the viewport, while keeping idle density unchanged and performance smooth on mobile.

**User-visible outcome:** From the moment the page loads, the NO button actively moves around and remains unselectable/unclickable, the updated phrase can appear during repeated attempts, and after clicking YES the bottom heart background becomes noticeably denser.
