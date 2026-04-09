# Design Brief — jobbly.ai

## Vision
Premium SaaS job automation platform with glassmorphism UI — luxury minimalism meets cutting-edge AI (Linear/Vercel aesthetic). Deep black foundation with frosted glass cards, white text, and soft cyan glow accents for interactive elements.

## Tone & Differentiation
Effortless sophistication. Every interaction feels precise and premium. Glassmorphism creates visual depth; strategic white glow accents on logo and CTAs signal premium AI automation. Anti-clutter: 60% white space.

## Color Palette

| Role              | OKLCH           | Hex     | Purpose                           |
|-------------------|-----------------|---------|-----------------------------------|
| Background        | 0.08 0 0        | #0a0a0a | Deep black, premium foundation    |
| Foreground        | 0.97 0 0        | #ffffff | Primary text, high contrast       |
| Card (glass)      | 0.12 0.02 270   | #161822 | Frosted glass, subtle cool tint   |
| Border (glass)    | 0.18 0.02 270   | #22242e | Frosted glass edge                |
| Text Secondary    | 0.6 0.02 270    | #9ca3af | Muted content, labels             |
| Accent (glow)     | 0.85 0.08 215   | #8bdcff | Cyan glow, CTAs, highlights       |
| Destructive       | 0.65 0.19 22    | #ff6b6b | Error, danger states              |

## Typography
- **Display**: General Sans (modern, geometric, premium)
- **Body**: Inter/DMSans (refined, neutral, 16px base)
- **Mono**: Geist Mono (technical, inline code/timestamps)
- **Hierarchy**: 48px / 32px / 24px / 16px / 14px

## Elevation & Depth
- Base: flat black background
- L1 (cards): glass cards with `backdrop-blur-xl` + `border border-border`
- L2 (hover/active): `shadow-glass-md` inset light + outset shadow
- L3 (modals): `shadow-glass-md` with higher opacity

## Structural Zones

| Zone              | Treatment                                  | Purpose                           |
|-------------------|--------------------------------------------|-----------------------------------|
| Hero (landing)    | Full screen, centered, minimal text        | First impression, branding        |
| Sidebar (auth)    | Fixed left, glass panel, active highlight  | Persistent navigation, context    |
| Header (page)     | Transparent, minimal bar on landing only   | Subtle visual anchor              |
| Card (content)    | Glass card, rounded-2xl, soft shadow       | Content container, emphasis       |
| Input (form)      | Glass input, rounded-xl, focus glow        | Form acceptance, affordance       |
| Footer (landing)  | Dark, minimal links, centered               | Humble information                |

## Spacing & Rhythm
- **Grid**: 6px base (p-6 = 24px, gap-6 = 24px)
- **Card padding**: p-6
- **Input height**: h-10 (40px)
- **Gaps**: gap-4 (content), gap-6 (sections)
- **Asymmetry**: Hero 1:1.5 text-to-space ratio

## Component Patterns
- **Buttons**: Primary (accent bg, glass border, hover glow), Secondary (text-only), Destructive (red, ghost)
- **Cards**: Glass with inset border, rounded-2xl, soft shadow on hover
- **Inputs**: Glass bg, focused ring = accent glow
- **Chips**: Rounded-full, muted bg, hover highlight
- **Toggles**: Minimal, smooth transition, no bounding box

## Motion & Animation
- **Entrance**: fade-in-up (0.5s, ease-out)
- **Hover**: scale-95, shadow-glow-accent-lg (smooth transition)
- **Floating**: subtle up/down 3s ease-in-out (logo, icons)
- **Transitions**: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

## Responsive
- **Mobile-first**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Sidebar**: Hidden < md, fixed left ≥ md
- **Content**: Full width < md, gutter left ≥ md

## Constraints
- NO default Tailwind blues or greys — use OKLCH tokens exclusively
- NO animated gradients or bouncy effects — smoothness only
- NO opaque overlays — use glass + blur
- NO clutter — whitespace > content

## Signature Detail
White glow accent on jobbly.ai logo (text-shadow or SVG filter) + soft cyan glow on primary CTA button. Both signals premium automation AI.
