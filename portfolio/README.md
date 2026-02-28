<div align="center">

<!-- Animated Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=timeGradient&height=250&section=header&text=Devansh%20Behl&fontSize=70&fontAlignY=35&desc=Full%20Stack%20%7C%20Web3%20%7C%20Systems&descAlignY=55&descAlign=50&animation=twinkling" width="100%" />

<!-- Animated Typing Text -->
<a href="https://github.com/DevanshBehl">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=A1A1A1&center=true&vCenter=true&width=600&lines=Full+Stack+Software+Engineer;Web3+%26+Blockchain+Developer;Systems+Architecture+Enthusiast;Building+Scalable+Solutions" alt="Typing SVG" />
</a>

<br />

[![Portfolio](https://img.shields.io/badge/View_Portfolio-050505?style=for-the-badge&logo=vercel&logoColor=white)](https://devanshbehl.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/devansh-behl)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/devansh_behl_)
[![Email](https://img.shields.io/badge/Email-devanshbhel@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:devanshbhel@gmail.com)

<br/>
<br/>

<i>"Clean, maintainable architecture. Performance-first mindset."</i>

</div>

---

## 🌌 Platform Architecture & Complex Animations

A premium, highly-interactive developer portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion. The design language focuses on an expansive "systems-oriented", deep-dark monochrome aesthetic equipped with intricate animations, fluid particle physics, and advanced glassmorphic elements. The platform leverages multiple rendering pipelines (CSS, HTML5 Canvas, SVG, Framer Motion) to deliver a 60FPS fluid experience.

### 1. Mathematical Choreography & Parallax (`Framer Motion`)
- **Scroll Tracking & Interpolation:** Widespread use of `useScroll` and `useTransform` to map raw vertical scroll pixel data (`scrollYProgress`) directly onto opacity curves, 3D translation matrices, and component scaling layers to generate deep parallax effects. As you scroll, the foreground interface panels decouple and move faster than the midground (`Hero tablet mock`), which moves faster than the background (`Nebula`).
- **Precision Staggering:** Elements leverage `useInView` to orchestrate hyper-smooth, highly-performant staggered entrance animations. Arrays map over indices (`i * 0.1s + 0.3s`) to cascade blocks fluidly.
- **Micro-interactions:** Interactive scaling (`whileHover={{ scale: 1.02 }}`), border color transitioning (`border-[#2a2a2a]`), and directional icon movements applied heavily to cards, buttons, and navigation links.

### 2. Advanced HTML5 Canvas Particle Systems (`ParticleHero.tsx`, `Contact.tsx`)
- **Physics Engine:** Custom-built `<canvas>` particle systems handle thousands of nodes simulating complex spring physics, kinetic friction, and dynamic repulsion simultaneously.
- **Interactivity & Vector Math:** The system calculates exact `dx/dy` vector distances from the user's cursor within a high-performance `requestAnimationFrame` loop. When the cursor breaches the `REPEL_RADIUS`, particles recalculate their targets, applying inverse-square forces (`REPEL_FORCE / distance`) to scatter smoothly out of the cursor's path before snapping back to their base grid via configurable `TENSION` and `FRICTION` mechanics.
- **Morphing Shapes via Off-screen Sampling:** In the Contact section, the particle engine loads an invisible set of coordinates and maps the physics nodes dynamically, transitioning abstract grids into massive, glowing curly braces `{ }`, creating an interactive piece of typographic art.

### 3. Light Beam & Data Transfer Simulation (`Hero.tsx`)
- **Vertical & Horizontal Lasers:** Pure CSS-driven shooting light beams using precise gradient masking and `@keyframes` (`beam-fall` and `beam-slide`) translating across 100% of their structural `flow` boundaries to simulate high-tech data transfers.
- **Mathematical Positioning:** Beams scale seamlessly via fractional viewport widths (`100vw`) and absolute bounds, masking themselves immediately as they pass behind glass panels (via `z-index` layering).
- **Continuous SVG Data Paths:** The Hero's architectural `BottomLayerGrid` utilizes advanced SVG line drawings with `strokeDasharray` and `strokeDashoffset`. Framer Motion animates these properties from `1` to `0` along complex cubic bezier paths, visualizing connections between the microservice blocks.

### 4. Deep Nebula Background Layer (`Hero.tsx`)
- **Organic Motion:** Dual-layer animated blobs act as the deep-space background. They utilize intense CSS filters (`blur-[120px]`) and are strictly layered with `mix-blend-mode: screen` to give them volumetric depth and a gaseous appearance.
- **Complex Keyframes:** The SVG base paths are heavily animated using long-cycle (20s+ delay loops) custom `@keyframes`. These keyframes manipulate `border-radius` morphing, scale translating, and 360-degree rotational translating (`transform: translate(...) rotate(...)`) simulating organic fluid dynamics behind the primary UI components.

### 5. Premium UI Artifacts
- **Glassmorphism & Inner Bezels:** Multi-layered gradient borders built by nesting elements. An outer container with `p-[1px] bg-gradient-to-b from-[#1a1a1a] to-transparent` wraps an inner `#080808` card, creating a high-contrast inner bezel effect indistinguishable from native desktop operating system containers.
- **Structured Systems Aesthetic:** Terminal-inspired blocks utilizing highly legible monospace fonts (`font-mono`) for systemic tagging (`PROJ_01`), structured grid systems mapping directly to screen sizes (`sm:grid-cols-2 lg:grid-cols-4`), and macOS-style pseudo-window headers utilizing simple triple-dot elements and raw file paths (`usr/bin/about`).
- **3D Gallery Hero Photo Frame:** A hyper-detailed, CSS-rendered 3D gallery frame enveloping the central headshot (`devansh.jpg`). The frame leverages heavy `border` shading, dimensional dual-inset shadows (`shadow-[inset_0_10px_20px_rgba...`), structural corner bracket accents, and an animated glass reflection gradient sliding diagonally across the subject to simulate environmental lighting.

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=DevanshBehl&show_icons=true&theme=radical&hide_border=true&bg_color=050505&title_color=fff&text_color=888&icon_color=fff" width="48%" />
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=DevanshBehl&theme=radical&hide_border=true&background=050505&ring=fff&fire=fff&currStreakLabel=fff" width="48%" />
</div>

<br/>

---

<div align="center">
  <p><b>Visocity UI coming soon. All portfolio components will be available for free.</b></p>
  <a href="#top"><img src="https://img.shields.io/badge/Back%20To%20Top-050505?style=for-the-badge&logo=upwork&logoColor=white" /></a>
</div>
