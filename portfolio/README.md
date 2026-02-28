# Portfolio 

A premium, highly-interactive developer portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion. The design language focuses on a "systems-oriented", deep-dark monochrome aesthetic equipped with intricate animations, particle physics, and glassmorphic elements.

## Animations & Visual Artifacts

### 1. Canvas Particle Systems
- **Physics Engine:** Custom-built HTML5 `<canvas>` particle systems used in the `ParticleHero` and `Contact` sections.
- **Interactivity:** Particles calculate `dx/dy` distances from the cursor in a `requestAnimationFrame` loop to trigger dynamic spring repulsion, tension, and friction mechanics.
- **Morphing Shapes:** The contact section dynamically samples an off-screen canvas to arrange the particles into interactive, glowing curly braces `{ }`.

### 2. Nebula Background Layer
- **Organic Motion:** Dual-layer animated blobs using heavy SVG/CSS blurs (`blur-3xl`) and `mix-blend-mode: screen`.
- **Complex Keyframes:** Custom `@keyframes` orchestrate continuous, slow-drifting, and pulsing shape transformations (via `clip-path` and `borderRadius` manipulation), giving the background a breathing, atmospheric vibe.

### 3. Light Beam Effects
- **Vertical & Horizontal Lasers:** Pure CSS-driven shooting light beams using precise gradient masking and `@keyframes` (`beam-fall` and `beam-slide`) translating across `stretch` boundaries to simulate high-tech data transfers.
- **Continuous SVG Paths:** Animated dash-offsets (`strokeDasharray`, `strokeDashoffset`) tracking the interconnected paths between floating component nodes in the Hero section.

### 4. Framer Motion Choreography
- **Scroll Tracking:** Widespread use of `useInView` to orchestrate staggered, highly-performant entrance animations (opacity fades, vertical/horizontal sliding) across all sections.
- **Micro-interactions:** Interactive scaling, border color transitioning, and directional icon movements applied heavily to cards, buttons, and navigation links.

### 5. Premium UI Artifacts
- **Glassmorphism & Borders:** Multi-layered gradient borders (`p-[1px] bg-gradient-to-b`) surrounding dark `#0a0a0a` inner cards to create a high-contrast inner bezel effect (`border-[#1a1a1a]`).
- **Systems Aesthetic:** Terminal-inspired blocks utilizing monospace fonts for tagging (`PROJ_01`), structured grid layouts (`BottomLayerGrid`), and macOS-style pseudo-window headers (`usr/bin/about`).
- **Hero Photo Frame:** A detailed, CSS-rendered 3D gallery frame featuring metallic gradients, dimensional shadow matrices, corner bracket accents, and an animated glass reflection traversing the picture.

---

### Visocity UI
All components used in this project will be available for free.  
**Visocity UI coming soon.**
