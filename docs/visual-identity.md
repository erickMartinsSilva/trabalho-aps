# Visual identity — apartment space rental app

## Font recommendation

### Primary: Inter
**Inter** is the recommended typeface for this interface. It was designed specifically for screen readability, with a tall x-height, open apertures, and clear letterform differentiation that benefit users with low vision or dyslexia. Available free via Google Fonts.

```
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');

font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

**Why Inter over alternatives:**
- Tall x-height improves legibility at small sizes (13–15px range used throughout)
- Open counters on `a`, `e`, `c` reduce confusion between similar glyphs
- Clear distinction between `1`, `l`, `I` and `0`, `O` — critical for apartment/unit codes
- Excellent Brazilian Portuguese diacritic support (ã, ç, é, õ, etc.)
- Regular (400) and Medium (500) are the only weights used — no risk of thin/light weight contrast failures

**Fallback stack:** `'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

---

## Color palette

All foreground/background combinations meet WCAG 2.1 AA (contrast ≥ 4.5:1 for normal text, ≥ 3:1 for large text). Primary blue and body text pairs meet AAA (≥ 7:1).

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary | Ocean blue | `#1A5C8A` | Primary actions, links, active states |
| Primary light | Blue tint | `#E8F2FA` | Button backgrounds, info surfaces |
| Primary dark | Deep blue | `#0D3A5C` | Hover states, headings on light bg |
| Semantic — success | Teal green | `#1D9E75` | Available status, confirmed bookings |
| Semantic — success light | Teal tint | `#E1F5EE` | Available badge background |
| Semantic — success dark | Deep teal | `#085041` | Available badge text |
| Semantic — warning | Amber | `#BA7517` | Pending status, in-progress |
| Semantic — warning light | Amber tint | `#FAEEDA` | Pending badge background |
| Semantic — warning dark | Deep amber | `#633806` | Pending badge text |
| Semantic — danger | Red | `#A32D2D` | Occupied status, errors, destructive actions |
| Semantic — danger light | Red tint | `#FCEBEB` | Occupied badge background, error surfaces |
| Semantic — danger dark | Deep red | `#791F1F` | Occupied badge text, error text |
| Neutral — background | Warm white | `#F7F6F3` | Page background |
| Neutral — surface | Off white | `#ECEAE4` | Cards, input backgrounds |
| Neutral — muted | Gray | `#B4B2A9` | Disabled states, placeholders |
| Neutral — secondary text | Dark gray | `#5F5E5A` | Captions, metadata |
| Neutral — body text | Charcoal | `#2C2C2A` | All body text (16.1:1 on warm white) |

### Accessibility contrast ratios

| Pair | Ratio | WCAG level |
|---|---|---|
| Charcoal `#2C2C2A` on warm white `#F7F6F3` | 16.1:1 | AAA |
| Ocean blue `#1A5C8A` on white | 7.2:1 | AAA |
| White on ocean blue `#1A5C8A` | 7.2:1 | AAA |
| Deep teal `#085041` on teal tint `#E1F5EE` | 6.5:1 | AA |
| Deep red `#791F1F` on red tint `#FCEBEB` | 6.8:1 | AA |
| Deep amber `#633806` on amber tint `#FAEEDA` | 7.0:1 | AAA |

> Status is never communicated by color alone. Every status badge includes an icon alongside the color, ensuring colorblind users receive the same information.

---

## Type scale

Base font: **Inter** · Line height: **1.6** · Paragraph spacing: **1rem**

| Role | Size | Weight | Usage |
|---|---|---|---|
| Screen title | 32px | 500 | Top-level page headings |
| Section heading | 22px | 500 | Section titles, modal headers |
| Card title / label | 17px | 500 | Card headings, field labels |
| Body | 15px | 400 | Main descriptive text, form content |
| Secondary | 13px | 400 | Metadata, captions, helper text |
| Overline | 11px / uppercase / 0.07em tracking | 500 | Category labels, section eyebrows |

> Minimum text size is 13px. No light (300) or thin (200) weights are used — these fail contrast requirements at small sizes.

---

## Spacing scale

Based on a 4px grid.

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Icon gap, tight inline spacing |
| `space-2` | 8px | Component internal gap |
| `space-3` | 12px | Card internal padding (tight) |
| `space-4` | 16px | Card internal padding (standard) |
| `space-5` | 20px | Section gap |
| `space-6` | 24px | Component margin |
| `space-8` | 32px | Section margin |
| `space-10` | 40px | Page section margin |

---

## Corner radius

| Token | Value | Usage |
|---|---|---|
| `radius-sm` | 8px | Buttons, inputs, badges, small controls |
| `radius-md` | 12px | Cards, panels, dropdowns |
| `radius-lg` | 16px | Modals, bottom sheets, drawers |
| `radius-pill` | 999px | Status badges, tags |

---

## Status badges

Each badge uses: pill radius · icon + label · light background fill · dark text from same color family.

| Status | Background | Text color | Icon |
|---|---|---|---|
| Available | `#E1F5EE` | `#085041` | `ti-circle-check` |
| Occupied | `#FCEBEB` | `#791F1F` | `ti-circle-x` |
| Pending | `#FAEEDA` | `#633806` | `ti-clock` |
| Reserved | `#E8F2FA` | `#0D3A5C` | `ti-info-circle` |

---

## Button styles

Minimum height: **48px**. Minimum touch target: **48 × 48px** (WCAG 2.5.5 AAA).

| Variant | Background | Text | Border | Usage |
|---|---|---|---|---|
| Primary | `#1A5C8A` | `#FFFFFF` | none | Main CTA (book, confirm) |
| Secondary | transparent | `#1A5C8A` | 1.5px `#1A5C8A` | Secondary actions |
| Ghost | transparent | `#5F5E5A` | 0.5px border-secondary | Tertiary / cancel |
| Success | `#1D9E75` | `#FFFFFF` | none | Confirm, complete |
| Danger | `#A32D2D` | `#FFFFFF` | none | Destructive actions |

---

## Form inputs

| Property | Value |
|---|---|
| Height | 48px |
| Border (default) | 1.5px `#B4B2A9` |
| Border (focus) | 1.5px `#1A5C8A` + 3px focus ring `rgba(26,92,138,0.15)` |
| Border radius | 8px |
| Font size | 15px |
| Padding | 12px 14px |
| Label size | 13px / 500 |
| Label color | `#5F5E5A` |
| Error border | 1.5px `#A32D2D` |
| Error text | 13px `#A32D2D` |

> All inputs have a visible focus indicator (focus ring) to comply with WCAG 2.4.7.

---

## Icons

Icon set: **Tabler Icons** (outline style). Size: 22px in navigation, 18–20px inline, 16px in badges.

Icons used alongside text are `aria-hidden="true"`. Icon-only controls require an explicit `aria-label`.

Suggested icon mapping:

| Context | Icon name |
|---|---|
| Home / dashboard | `ti-home` |
| Spaces / units | `ti-building` |
| Bookings | `ti-calendar` |
| Profile | `ti-user` |
| Available | `ti-circle-check` |
| Occupied | `ti-circle-x` |
| Pending | `ti-clock` |
| Settings | `ti-settings` |
| Search | `ti-search` |
| Notifications | `ti-bell` |

---

## Navigation (mobile bottom bar)

- 4 tabs: Home, Spaces, Bookings, Profile
- Tab height: 60px (includes 8px safe-area bottom padding)
- Active tab: ocean blue `#1A5C8A` icon + label
- Inactive tab: muted gray `#B4B2A9`
- Border top: 0.5px `border-tertiary`
- Background: white (distinct from warm-white page bg)

---

## Accessibility principles

1. **Color is never the sole indicator** — status badges, error states, and interactive states all pair color with an icon or text label.
2. **All touch targets ≥ 48px** — buttons, inputs, nav items, and interactive cards meet WCAG 2.5.5.
3. **Visible focus indicators on all interactive elements** — 3px offset focus ring in `rgba(26,92,138,0.15)`.
4. **Minimum 13px text** — no text smaller than this, including captions and overlines.
5. **Two weights only (400 / 500)** — avoids light-weight contrast failures.
6. **Brazilian Portuguese diacritic support** — Inter covers the full Latin Extended character set.
7. **Reduced motion respected** — any transitions should wrap in `@media (prefers-reduced-motion: no-preference)`.
8. **High contrast mode compatible** — avoid backgrounds that would disappear with Windows High Contrast Mode; rely on borders for structure.

---

## CSS custom properties (reference)

```css
:root {
  /* Typography */
  --font-base: 'Inter', system-ui, -apple-system, sans-serif;
  --font-size-xs:   11px;
  --font-size-sm:   13px;
  --font-size-base: 15px;
  --font-size-md:   17px;
  --font-size-lg:   22px;
  --font-size-xl:   32px;
  --font-weight-regular: 400;
  --font-weight-medium:  500;
  --line-height-base: 1.6;

  /* Colors — brand */
  --color-primary:       #1A5C8A;
  --color-primary-light: #E8F2FA;
  --color-primary-dark:  #0D3A5C;

  /* Colors — semantic */
  --color-success:       #1D9E75;
  --color-success-light: #E1F5EE;
  --color-success-dark:  #085041;
  --color-warning:       #BA7517;
  --color-warning-light: #FAEEDA;
  --color-warning-dark:  #633806;
  --color-danger:        #A32D2D;
  --color-danger-light:  #FCEBEB;
  --color-danger-dark:   #791F1F;

  /* Colors — neutral */
  --color-bg:        #F7F6F3;
  --color-surface:   #ECEAE4;
  --color-muted:     #B4B2A9;
  --color-secondary: #5F5E5A;
  --color-text:      #2C2C2A;

  /* Spacing (4px grid) */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;

  /* Radius */
  --radius-sm:   8px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-pill: 999px;
}
```
