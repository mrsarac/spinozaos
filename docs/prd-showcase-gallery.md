# PRD: SpinozaOS Showcase Gallery

**Document Version:** 1.0
**Status:** Draft
**Author:** Product Manager
**Last Updated:** 2025-12-09
**Target Release:** Q1 2025

---

## Context & Why Now

### Market Timing

- SpinozaOS v0.2.0 has 25+ production-ready components, but no interactive demonstration platform exists
- Documentation (Astro Starlight) and Storybook serve isolated component views; developers lack holistic application context
- Source: Storybook Showcase shows leading teams publish public instances to build trust and adoption
- The "Monolith Strategy" requires SpinozaOS to establish credibility before Substance, Spinoza, and Forge consume it

### Strategic Rationale

1. **Adoption Barrier:** Developers cannot visualize how components compose into real applications
2. **Component Evolution:** No feedback loop exists to identify gaps and extract new patterns from real usage
3. **Marketing Asset:** Award-worthy showcase (Awwwards 9/10 target) differentiates SpinozaOS in crowded design system market
4. **Ecosystem Proof:** Demonstrates SpinozaOS viability for sister projects (Substance AGI Engine, Spinoza Emotional Tool)

### Competitive Pressure

- Source: Shadcn/UI achieves adoption through copy-paste code visibility and real-world examples
- Source: UIverse demonstrates Pinterest-style component exploration drives engagement
- Source: The Component Gallery provides reference implementations from production design systems

---

## Users & JTBD

### Primary Users

| Persona | Description | % of Traffic |
|---------|-------------|--------------|
| **Evaluating Developer** | Frontend engineer assessing SpinozaOS for their project | 50% |
| **Learning Developer** | Developer learning SpinozaOS patterns and best practices | 30% |
| **Design System Maintainer** | Internal team member extracting/contributing patterns | 15% |
| **Hiring Manager / Stakeholder** | Non-technical person evaluating quality | 5% |

### Jobs to Be Done

| User | Job | Success Metric |
|------|-----|----------------|
| Evaluating Developer | "I want to see how SpinozaOS handles a complete dashboard before committing to adoption" | Time from landing to code copy <3 min |
| Learning Developer | "I want to understand how components compose together with motion and tokens" | Finds code example for any pattern <60s |
| Design System Maintainer | "I want to identify patterns that should be extracted into core library" | Pattern identification rate measured |
| Stakeholder | "I want to see if this looks professional enough for our product" | Qualitative satisfaction score >8/10 |

### Anti-Personas (Out of Scope)

- Designers seeking Figma files (served by separate Figma library)
- Non-React developers (SpinozaOS is React-first)
- Users seeking component API documentation (served by docs site)

---

## Business Goals & Success Metrics

### North Star Metric

**Monthly Active Developers (MAD):** Unique developers who interact with demos and view/copy code

### Leading Indicators (Weekly/Monthly)

| Metric | Target (M1) | Target (M3) | Target (M6) |
|--------|-------------|-------------|-------------|
| Gallery pageviews | 500 | 2,000 | 5,000 |
| Demo interactions (clicks, hovers, form inputs) | 1,000 | 5,000 | 15,000 |
| Code copy events | 200 | 800 | 2,500 |
| Time on demo page | >2 min avg | >2.5 min avg | >3 min avg |
| Demo-to-docs navigation rate | 15% | 20% | 25% |

### Lagging Indicators (Quarterly)

| Metric | Target (Q1) | Target (Q2) |
|--------|-------------|-------------|
| npm downloads (@spinozaos/*) | 1,000/month | 5,000/month |
| GitHub stars | 100 | 500 |
| External projects using SpinozaOS | 3 | 10 |
| Components extracted from demos to core | 2 | 5 |
| Awwwards nomination | Submitted | Honorable mention |

---

## Functional Requirements

### FR-1: Gallery Homepage

**Description:** A visually striking landing page displaying all available demos organized by category.

**Acceptance Criteria:**
- 1.1: Page loads in <1.5s on 4G connection (Lighthouse Performance >90)
- 1.2: Displays 5 demo categories as filterable grid: Dashboard, Landing Page, AI Interface, Data Visualization, Forms
- 1.3: Each demo card shows: thumbnail preview, title, description, component count badge, "View Demo" CTA
- 1.4: Demo cards animate on scroll with VARIANTS.fadeInUp from @spinozaos/motion
- 1.5: Category filter applies SPRING.tight animation on grid reflow
- 1.6: Search functionality filters demos by name, description, or component usage
- 1.7: Responsive layout: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
- 1.8: Hero section displays SpinozaOS branding with Prophetic Gold (#fbbf24) accent

### FR-2: Demo Viewer Page

**Description:** Individual demo page showing live, interactive mini-application alongside source code.

**Acceptance Criteria:**
- 2.1: Split-pane layout: live demo (left/top), code panel (right/bottom)
- 2.2: Demo renders at 100% interactive fidelity (buttons click, forms submit, modals open)
- 2.3: Code panel syntax-highlighted with JetBrains Mono font, void theme
- 2.4: Tab system in code panel: "Preview" | "Code" | "Tokens Used" | "Motion Used"
- 2.5: Code copy button with toast notification on success
- 2.6: Mobile: stacked layout with collapsible code panel (SPRING.soft animation)
- 2.7: Breadcrumb navigation: Gallery > Category > Demo Name
- 2.8: "Open in Sandbox" button launches CodeSandbox/StackBlitz with demo code
- 2.9: Device frame toggle: desktop, tablet, mobile viewport simulation

### FR-3: Component Inspector

**Description:** Overlay system allowing developers to inspect any component within a demo.

**Acceptance Criteria:**
- 3.1: Toggle button activates "Inspector Mode" with gold (#fbbf24) border on hover
- 3.2: Clicking any component shows: component name, variant used, props applied
- 3.3: "View in Storybook" link for each inspected component
- 3.4: "View in Docs" link for each inspected component
- 3.5: Props panel is copy-able as JSX snippet
- 3.6: Component boundaries visualized with glassmorphism overlay

### FR-4: Initial Demo Suite (5 Demos)

**Description:** Launch with five complete mini-applications demonstrating SpinozaOS capabilities.

#### FR-4.1: Dashboard Demo ("Substance Intel Dashboard")

**Acceptance Criteria:**
- 4.1.1: Header with Avatar, navigation tabs, notification badge
- 4.1.2: StatCard grid (4 cards) with trend indicators and animated numbers
- 4.1.3: Data table with sortable columns, pagination
- 4.1.4: Sidebar with Accordion navigation
- 4.1.5: ConfidenceIndicator widgets for AI prediction scores
- 4.1.6: ClearanceBadge system demonstrating security levels
- 4.1.7: Time period selector using PeriodTabs preset
- Components used: StatCard, Tabs, Avatar, Badge, Card, Progress, ClearanceBadge, ConfidenceIndicator, Accordion

#### FR-4.2: Landing Page Demo ("SpinozaOS Marketing")

**Acceptance Criteria:**
- 4.2.1: Hero section with GlitchText heading, primary CTA button
- 4.2.2: Feature grid with animated Card components
- 4.2.3: Testimonial carousel with Avatar and quote styling
- 4.2.4: Pricing table with three tiers (Standard, Pro, Oracle variants)
- 4.2.5: FAQ section using FAQAccordion preset
- 4.2.6: Footer with DecorativeLine separators
- Components used: Button, Text, Card, Avatar, Accordion, GlitchText, DecorativeLine, Badge

#### FR-4.3: AI Interface Demo ("Oracle Chat")

**Acceptance Criteria:**
- 4.3.1: Chat message list with user/AI message styling
- 4.3.2: Message input with Textarea, character count, send Button
- 4.3.3: Typing indicator with LoadingDots
- 4.3.4: Confidence scores on AI responses using ConfidenceIndicator
- 4.3.5: Model selector using Select component
- 4.3.6: Conversation history sidebar with EmptyState for new users
- Components used: Input, Textarea, Button, Select, Progress, ConfidenceIndicator, EmptyState, Avatar, Badge

#### FR-4.4: Data Visualization Demo ("Analytics Command")

**Acceptance Criteria:**
- 4.4.1: Multiple StatCard layouts (horizontal, vertical, compact)
- 4.4.2: Trend sparklines within cards (CSS/SVG, not heavy chart library)
- 4.4.3: Progress indicators for completion metrics
- 4.4.4: Data refresh animation with Skeleton loading states
- 4.4.5: Tooltip overlays on data points
- 4.4.6: Time range selector with Tabs
- Components used: StatCard, Progress, Skeleton, Tabs, Tooltip, Badge, Card

#### FR-4.5: Forms Demo ("Settings Panel")

**Acceptance Criteria:**
- 4.5.1: Profile form with Input, Textarea, Avatar upload placeholder
- 4.5.2: Preferences section with Toggle, Checkbox groupings
- 4.5.3: Notification settings with Select dropdowns
- 4.5.4: Form validation with error states on Input/Select
- 4.5.5: Save button with loading state, success Toast notification
- 4.5.6: Modal confirmation for destructive actions
- Components used: Input, Textarea, Select, Checkbox, Toggle, Button, Toast, Modal, Avatar, Card

### FR-5: Code Extraction Workflow

**Description:** System for promoting demo patterns into core @spinozaos/react library.

**Acceptance Criteria:**
- 5.1: Each demo folder contains EXTRACTION_CANDIDATES.md listing potential components
- 5.2: "Propose for Core" button in Inspector opens GitHub issue template
- 5.3: Issue template includes: component code, usage context, design rationale
- 5.4: Monthly review process documented in CONTRIBUTING.md
- 5.5: Extracted components receive "Demo Origin: [demo-name]" in JSDoc

### FR-6: Navigation & Discovery

**Description:** Global navigation system for seamless movement between gallery, demos, docs, and Storybook.

**Acceptance Criteria:**
- 6.1: Persistent header with links: Gallery | Docs | Storybook | GitHub
- 6.2: "Related Demos" section at bottom of each demo page
- 6.3: Component usage index: "See all demos using Button" functionality
- 6.4: Keyboard navigation: arrow keys for gallery, Escape to exit demo
- 6.5: URL structure: /showcase, /showcase/[category], /showcase/[category]/[demo-slug]

---

## Non-Functional Requirements

### NFR-1: Performance

| Metric | Requirement | Measurement |
|--------|-------------|-------------|
| Time to First Contentful Paint (FCP) | <1.2s | Lighthouse CI |
| Largest Contentful Paint (LCP) | <2.5s | Lighthouse CI |
| Cumulative Layout Shift (CLS) | <0.1 | Lighthouse CI |
| First Input Delay (FID) | <100ms | Real User Monitoring |
| Animation frame rate | 60fps minimum | Performance monitor |
| Bundle size (initial) | <150KB gzipped | Build analysis |
| Code-split demo chunks | <50KB each | Build analysis |

### NFR-2: Scale

| Dimension | Initial | 6-Month | 12-Month |
|-----------|---------|---------|----------|
| Concurrent users | 100 | 500 | 1,000 |
| Demo count | 5 | 15 | 30 |
| Monthly pageviews | 5,000 | 25,000 | 100,000 |

### NFR-3: Availability & SLOs

| SLO | Target | Measurement |
|-----|--------|-------------|
| Uptime | 99.5% | Coolify health checks |
| Error rate (5xx) | <0.1% | Server logs |
| CDN cache hit rate | >90% | Cloudflare analytics |

### NFR-4: Privacy & Security

- No user accounts required; no PII collected
- Analytics via privacy-respecting solution (Plausible or self-hosted Umami)
- CSP headers preventing XSS in code preview panels
- Sandbox iframe isolation for "Open in Sandbox" feature
- No third-party tracking scripts

### NFR-5: Accessibility

| Requirement | Standard |
|-------------|----------|
| WCAG compliance | 2.1 AA minimum, AAA target |
| Keyboard navigation | Full site navigable without mouse |
| Screen reader | ARIA labels on all interactive elements |
| Motion | Respects prefers-reduced-motion |
| Color contrast | 4.5:1 text, 3:1 UI elements |
| Focus indicators | Gold (#fbbf24) focus rings on all focusable elements |

### NFR-6: Observability

- Structured logging for all user interactions (anonymized)
- Error tracking via Sentry (or self-hosted alternative)
- Real User Monitoring (RUM) for performance metrics
- Build size tracking in CI pipeline
- Lighthouse CI scores tracked per deployment

---

## Scope

### In Scope (MVP)

- Gallery homepage with filtering
- 5 complete demo applications
- Code viewer with syntax highlighting
- Component Inspector (basic version)
- Responsive design (mobile-first)
- Deploy to showcase-spinozaos.mustafasarac.com
- Integration with existing docs and Storybook

### Out of Scope (MVP)

- User accounts / saved preferences
- Demo customization (theme switching)
- Community-submitted demos
- Video walkthroughs
- Figma file downloads
- Non-React framework demos
- Internationalization (English only)
- Dark/light mode toggle (dark-only per brand)

### Future Considerations (Post-MVP)

| Feature | Priority | Target Release |
|---------|----------|----------------|
| Interactive code editing (Monaco) | High | v1.1 |
| Demo playground (modify props live) | High | v1.1 |
| Community demo submissions | Medium | v1.2 |
| Component comparison tool | Medium | v1.2 |
| AI-assisted code generation | Low | v2.0 |
| Performance benchmarking dashboard | Low | v2.0 |

---

## Technical Architecture

### Stack

```yaml
Framework: React 18 + Vite
Router: React Router v6
Styling: @spinozaos/tailwind + Tailwind CSS
Animation: @spinozaos/motion + Framer Motion
Code Highlighting: Shiki (Void theme custom)
State: React Context (no external state library)
Build: Vite + Turborepo integration
Deploy: Coolify (Hetzner Cloud)
CDN: Cloudflare
Analytics: Plausible (or Umami self-hosted)
```

### Monorepo Integration

```
spinozaos/
├── apps/
│   ├── docs/           # Existing Astro Starlight
│   ├── storybook/      # Existing Storybook
│   └── showcase/       # NEW - This project
│       ├── src/
│       │   ├── demos/
│       │   │   ├── dashboard/
│       │   │   ├── landing/
│       │   │   ├── ai-interface/
│       │   │   ├── data-viz/
│       │   │   └── forms/
│       │   ├── components/
│       │   │   ├── Gallery/
│       │   │   ├── DemoViewer/
│       │   │   ├── CodePanel/
│       │   │   └── Inspector/
│       │   └── pages/
│       ├── package.json
│       └── vite.config.ts
```

### Data Model

```typescript
interface Demo {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'dashboard' | 'landing' | 'ai-interface' | 'data-viz' | 'forms';
  thumbnail: string;
  componentsUsed: string[];
  tokensUsed: string[];
  motionPresetsUsed: string[];
  sourceCode: string;
  extractionCandidates?: string[];
}
```

---

## Rollout Plan

### Phase 1: Foundation (Week 1-2)

- [ ] Scaffold apps/showcase with Vite + React
- [ ] Implement Gallery homepage (FR-1)
- [ ] Create demo template structure
- [ ] Set up Turborepo integration

**Guardrails:**
- Must pass Lighthouse CI >90 before proceeding
- Code review required for all PRs

### Phase 2: Demo Development (Week 3-4)

- [ ] Build Dashboard demo (FR-4.1)
- [ ] Build Landing Page demo (FR-4.2)
- [ ] Build AI Interface demo (FR-4.3)
- [ ] Implement DemoViewer component (FR-2)

**Guardrails:**
- Each demo must use minimum 8 SpinozaOS components
- Animation FPS must maintain 60fps

### Phase 3: Code Features (Week 5-6)

- [ ] Implement CodePanel with syntax highlighting
- [ ] Add code copy functionality
- [ ] Build basic Component Inspector (FR-3)
- [ ] Build Data Viz demo (FR-4.4)
- [ ] Build Forms demo (FR-4.5)

**Guardrails:**
- Accessibility audit before release
- Bundle size must stay <150KB gzipped

### Phase 4: Polish & Launch (Week 7-8)

- [ ] Performance optimization
- [ ] Responsive design QA
- [ ] Deploy to Coolify
- [ ] DNS configuration
- [ ] Analytics setup
- [ ] Soft launch to design system community

**Kill Switch:**
- Coolify deployment can be rolled back to previous version in <5 minutes
- Feature flags for Inspector and Code Copy features
- DNS can point to maintenance page if critical issues

---

## Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Demo code complexity exceeds maintenance capacity | Medium | High | Keep demos minimal; document all patterns; automate testing |
| Performance degradation from complex demos | Medium | High | Lazy loading; code splitting; performance budget in CI |
| Low adoption despite quality | Medium | Medium | Launch on Product Hunt; submit to Awwwards; promote on X/Twitter |
| Component API changes break demos | Low | High | Demos use locked @spinozaos versions; automated dependency updates |
| Scope creep delays launch | Medium | Medium | Strict MVP scope; defer interactive editor to v1.1 |

---

## Open Questions

| Question | Owner | Due Date | Status |
|----------|-------|----------|--------|
| Should demos include mock backend (MSW) or be fully static? | Tech Lead | Week 1 | Open |
| What analytics solution aligns with privacy requirements? | Product | Week 1 | Open |
| Should code panel support multiple file tabs per demo? | Design | Week 2 | Open |
| How do we handle component version mismatches between demos? | Tech Lead | Week 2 | Open |
| Do we need a content management layer for demo metadata? | Product | Week 3 | Open |

---

## Appendix

### Competitive Analysis Summary

| Product | Strength | Gap |
|---------|----------|-----|
| [Storybook Showcase](https://storybook.js.org/showcase/) | Large catalog; community trust | Isolated components; no app context |
| [Shadcn/UI](https://ui.shadcn.com/) | Copy-paste code; owns your code | No full app demos |
| [The Component Gallery](https://component.gallery/) | Cross-system reference | No interactive demos |
| [Mantine](https://mantine.dev/) | 100+ components; excellent docs | Generic styling; not distinctive |

### Reference Designs

- Source: [UXPin Design System Examples](https://www.uxpin.com/studio/blog/best-design-system-examples/) - 13 production design systems
- Source: [DesignRush Storybook Examples](https://www.designrush.com/best-designs/websites/trends/storybook-examples) - Award-worthy Storybook implementations
- Source: [Untitled UI Figma Dashboards](https://www.untitledui.com/components/dashboards) - SaaS dashboard patterns
- Source: [Eleken Dashboard Examples](https://www.eleken.co/blog-posts/dashboard-design-examples-that-catch-the-eye) - Data visualization best practices

### SpinozaOS Brand Guidelines (Summary)

| Element | Value |
|---------|-------|
| Primary Background | #020617 (void) |
| Primary Accent | #fbbf24 (spinoza-yellow) |
| Font Display | Playfair Display |
| Font UI | Inter |
| Font Data | JetBrains Mono |
| Animation Default | SPRING.soft |
| Target Quality | Awwwards 9/10 |

---

*Document prepared by Product Manager*
*SpinozaOS - "More Geometrico"*
