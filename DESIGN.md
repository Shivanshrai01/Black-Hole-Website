---
name: Event Horizon
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#3a393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1c1b1c'
  surface-container: '#201f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e5e2e3'
  on-surface-variant: '#d7c3b4'
  inverse-surface: '#e5e2e3'
  inverse-on-surface: '#313031'
  outline: '#9f8d80'
  outline-variant: '#524439'
  surface-tint: '#ffb874'
  primary: '#ffd8b7'
  on-primary: '#4b2800'
  primary-container: '#ffb36a'
  on-primary-container: '#784300'
  inverse-primary: '#8a510e'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#b6e6ff'
  on-tertiary: '#003547'
  tertiary-container: '#7ecdf2'
  on-tertiary-container: '#005772'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdcc0'
  primary-fixed-dim: '#ffb874'
  on-primary-fixed: '#2d1600'
  on-primary-fixed-variant: '#6b3b00'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#bfe9ff'
  tertiary-fixed-dim: '#82d0f6'
  on-tertiary-fixed: '#001f2a'
  on-tertiary-fixed-variant: '#004d65'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 80px
    fontWeight: '300'
    lineHeight: 100%
    letterSpacing: 0.05em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 42px
    fontWeight: '300'
    lineHeight: 120%
    letterSpacing: 0.04em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '300'
    lineHeight: 120%
    letterSpacing: 0.04em
  body-base:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 160%
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 100%
    letterSpacing: 0.2em
  mono-technical:
    fontFamily: jetbrainsMono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 140%
    letterSpacing: 0.05em
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  container-max: 1440px
---

## Brand & Style
The design system is rooted in the "Astro-Minimalist" aesthetic, blending the precision of aerospace instrumentation with the luxury of high-end consumer electronics. It targets a sophisticated audience that values clarity, technical mastery, and cinematic scale.

The visual narrative avoids the frenetic energy of typical sci-fi in favor of a calm, vast, and atmospheric experience. It utilizes a mix of **Minimalism** and **Glassmorphism**, characterized by expansive negative space, high-performance typography, and "physical" light behavior. Every interface element should feel like a projection onto a glass pane within a quiet, pressurized cabin orbiting a distant star.

## Colors
The palette is monochromatic and functional, punctuated by a single "warm-star" primary color.

- **Primary (#FFB36A):** A warm, solar orange used for critical actions, navigation highlights, and data indicators. It represents heat and human presence against the cold.
- **Surface (#0A0A0B):** Not a pure black, but a deep, "void" charcoal that provides a canvas for light-based elements.
- **Glass & Borders:** Use the white spectrum at extremely low opacities. The goal is to define edges through light refraction rather than solid color.
- **Overlays:** Background blurs (40px+) must be used behind glass surfaces to create a sense of depth and atmospheric perspective.

## Typography
Typography is the primary vehicle for the "scientific" feel. It balances the geometric, futuristic character of **Space Grotesk** for headings and the technical precision of **Geist** for body copy.

- **Scale:** Use extreme contrast. Very large, thin headers paired with small, widely tracked labels.
- **Letter Spacing:** Generous tracking is essential for the "premium" feel, particularly in uppercase labels and display text.
- **Utility:** Use monospaced fonts (JetBrains Mono) for numerical data, coordinates, or status codes to reinforce the NASA-inspired instrumentation aesthetic.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to maintain a cinematic composition, transitioning to a fluid model on smaller devices.

- **Margins:** Large outer margins (64px+) are required to evoke the sense of vastness in space. Content should never feel cramped.
- **Rhythm:** Use a 4px baseline grid. Spacing between sections should be aggressive (128px, 160px) to allow the "atmosphere" to breathe.
- **Alignment:** Use asymmetrical layouts for hero sections to mimic technical schematics, but maintain strict vertical alignment for data-heavy views.

## Elevation & Depth
In this design system, depth is achieved through **Glassmorphism** and light behavior rather than traditional shadows.

- **Layers:** Use "Stacking Tiers" of glass. Each tier further from the background increases in both border opacity and backdrop blur.
- **Ambient Glow:** Instead of drop shadows, use a soft, primary-colored outer glow (`box-shadow: 0 0 30px rgba(255, 179, 106, 0.1)`) on active or high-priority elements.
- **Borders:** All panels must have a 1px border. Use a linear gradient for borders (from top-left to bottom-right) to simulate a light source hitting the edge of a glass pane.

## Shapes
The shape language is strictly **Sharp (0px)** or **Perfectly Circular**. 

- **Hard Edges:** All containers, input fields, and panels use 90-degree angles to reflect structural engineering and aerospace modules.
- **Geometric Contrast:** Circles are reserved for specific functional elements: primary action buttons, status indicators, and iconography. This contrast makes circular elements feel like "controls" on a technical dashboard.

## Components
Consistent implementation of components ensures the technical-luxury feel.

- **Buttons:** 
  - *Primary:* Perfectly circular, thin 1px primary-color border, no fill. On hover, a subtle primary color wash (10% opacity) and a sharp 2px inner glow.
  - *Secondary:* Ghost style, sharp corners, white 1px border at 20% opacity.
- **Input Fields:** Bottom-border only (1px white at 30% opacity). Labels are always `label-caps` positioned above the input. 
- **Cards/Panels:** Background: `rgba(255, 255, 255, 0.04)`, Backdrop-filter: `blur(24px)`. Border: `1px solid rgba(255, 255, 255, 0.12)`.
- **Data Tables:** No vertical lines. Horizontal lines are 1px, `rgba(255,255,255, 0.08)`. Header text uses `mono-technical` in primary orange.
- **Status Indicators:** Small 6px solid circles. Use primary orange for "Active," white for "Neutral," and a muted red for "Critical."
- **Scrollbars:** Ultra-thin (2px), primary orange thumb, no track background.