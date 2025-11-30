# Portfolio Saïd ARIKAMA CHABI

A premium, immersive scrollytelling portfolio built with Vue 3, TailwindCSS v4, and GSAP.

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## 📂 Project Structure

- `src/components/`: UI components for each universe (Network, Web, Data) and transitions.
- `src/composables/`: Shared logic (GSAP animations).
- `src/data/`: Resume data (content source).
- `src/views/`: Main page assembly.

## 🎨 Customization

### Changing the Photo
1. Place your photo in `public/assets/`.
2. Update `src/data/resumeData.js`:
   ```javascript
   assets: {
     photoUrl: "/assets/your-photo.jpg",
     ...
   }
   ```
   If `photoUrl` is empty, a generative avatar (initials) will be used.

### Updating the CV
1. Place your PDF in `public/assets/`.
2. Update `src/data/resumeData.js`:
   ```javascript
   assets: {
     cvUrl: "/assets/Your_CV.pdf",
     ...
   }
   ```

### Modifying Content
Edit `src/data/resumeData.js` to update profile info, experience, projects, and skills.

## 🛠 Tech Stack
- **Vue 3** (Composition API, `<script setup>`)
- **TailwindCSS v4** (Utility-first CSS)
- **GSAP** (Animations & ScrollTrigger)
- **Vite** (Build tool)
