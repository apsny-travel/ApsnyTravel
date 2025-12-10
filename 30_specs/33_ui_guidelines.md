# UI Guidelines (v1.0.0)

## Tone
- Warm, calm and trustworthy; family-run vibe inspired by Caucasus hospitality.
- Avoid aggressive marketing; focus on clarity and readability.
- Evoke the beauty of Lake Ritsa's emerald waters and mountain landscapes.

## Color System

### Base: Cloud Dancer (PANTONE 11-4201)
- Main background: `#f8f7f4` — warm off-white creating calm foundation
- Card background: `#fdfcfa` — slightly lighter for elevation
- Section alternating: `#f3f1ec` — warmer for visual rhythm
- Borders: `#e8e5de` — soft cream for dividers

### Text: Ink System
- Headlines: `#1c1917` — almost black with warmth
- Primary text: `#292524` — rich charcoal
- Body text: `#44403c` — readable gray-brown
- Muted text: `#78716c` — for secondary info

### Primary Accent: Emerald (Lake Ritsa)
Inspired by Lake Ritsa's famous turquoise-emerald waters
- Primary CTA/links: `#059669`
- Hover state: `#10b981`
- Active state: `#047857`
- Light background: `#ecfdf5`

### Secondary: Lake Blue
For water-themed elements and places
- Main: `#0891b2`
- Light: `#22d3ee`

### Tertiary: Terracotta
Caucasus traditional warm clay tones for prices, highlights
- Main: `#c2410c`
- Light: `#ea580c`

### Neutral: Stone
Mountain stone colors for UI elements
- Scale from `#f5f5f4` to `#292524`

## Typography and Layout
- Font: System UI stack with Inter as preferred
- Use weight/size for hierarchy rather than decoration
- Generous spacing and clear sectioning
- Cards use subtle shadows (`shadow-soft`, `shadow-card`)

## Interactions
- Links use emerald color with underline on hover
- Buttons have smooth hover transitions with shadow lift
- Cards lift slightly on hover with scale transform
- Keep motion minimal and meaningful (300ms transitions)

## Components
- `.btn-primary` — emerald button for main CTAs
- `.btn-secondary` — outlined/ghost button
- `.card-hover` — hover effect for clickable cards
- `.badge-*` — emerald, lake, terracotta variants

## Responsiveness
- Mobile-first readable layout
- Max content width: 6xl (1152px)
- Cards stack gracefully on mobile
- Images scale without breaking text flow
