---
target: full portfolio
total_score: 28
p0_count: 0
p1_count: 2
timestamp: 2026-06-14T07-06-49Z
slug: full-portfolio
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Splash screen + skeletons solid; lazy route loads have a brief visual void (null Suspense fallback) |
| 2 | Match System / Real World | 4 | Lowercase copy, bracket notation — clear and idiomatic throughout |
| 3 | User Control and Freedom | 3 | ESC + Tab trap on island nav. No active-page indicator in nav; can't tell where you are |
| 4 | Consistency and Standards | 3 | AnimatedSplit system is coherent. transition: padding bug in selected-works breaks the pattern |
| 5 | Error Prevention | 2 | Contact form error paths not visible; low error surface overall |
| 6 | Recognition Rather Than Recall | 3 | Nav clear, skip-link present. Current page not highlighted in island nav |
| 7 | Flexibility and Efficiency | 2 | ESC for nav, language toggle reachable. Contact CTA is mouse-only |
| 8 | Aesthetic and Minimalist Design | 3 | Clean. Principles section and contact CTA section visually underpowered |
| 9 | Error Recovery | 2 | Project load error shows basic fallback. Contact form recovery unknown |
| 10 | Help and Documentation | 3 | Self-explanatory; Discover section subtitles give good orientation |
| **Total** | | **28/40** | **Good — solid foundation, meaningful gaps** |

## Anti-Patterns Verdict

LLM: Outfit is on the reflex-reject list. Works grid is identical-card anti-pattern (repeat(4, 1fr), same clip-path reveal, same stagger). No gradient text, glassmorphism, numbered section markers, or eyebrow-per-section. Bracket notation and word-spawn contact CTA are distinctive.

Deterministic scan: 1 finding — layout-transition in src/pages/about/selected-works/style.module.css:54 (transition: padding on hover causes layout thrash).

## Overall Impression

Competent and cohesive but not distinctive enough for Awwwards SOTD. Technical foundation is impressive (GSAP custom eases, Lenis, i18n, accessibility). Voice is present (bracket notation, terse copy). The visitor cannot answer "who is this and why does it matter" within 5 seconds above the fold — the most expensive gap for Awwwards.

Estimated score: Design 6.5, Usability 7, Creativity 6.5, Content 7 → ~6.8 average. Honorable Mention territory. SOTD requires 7.5+.

## What's Working

1. Intro marquee + video clip-path masking — genuinely distinctive interaction
2. Island navbar concept — pill→card transition with inset corner animation and focus trap
3. Voice: bracket notation + all-lowercase copy — consistent and non-replicable

## Priority Issues

[P1] Outfit typeface — explicit reflex-reject, "minimalist portfolio" training-data default when combined with monochrome + lowercase. Fix: replace with genuinely distinctive typeface.

[P1] No above-the-fold identity — name appears only in WelcomeSec (second section). Visitor sees abstract marquee values (minimalism, aesthetics) without identity anchor. Fix: add name + role in IntroSec.

[P2] Works grid — repeat(4, 1fr), identical card sizes, identical clip-path reveals. Identical card anti-pattern. Fix: varied scale layout, at least one hero project.

[P2] transition: padding bug in selected-works/style.module.css:54 — layout thrash on hover. Fix: transform: translateX instead.

[P2] Principles section visually underpowered — strong copy ("say less, tell more") rendered at font-weight:300, opacity:0.85 in a whisper. Fix: dramatic font-size increase or stronger visual rhythm.

## Persona Red Flags

Jordan (recruiter): Lands on marquee, no name visible above fold. Nav "aboutme" reads as typo. No active-page state in nav.

Casey (mobile): 60vh video in intro heavy on slow connection. Contact CTA word-spawn is mouse-only interaction — section appears empty on mobile.
