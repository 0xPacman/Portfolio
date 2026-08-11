# Ahmed Jadani - Portfolio

[![Deploy to GitHub Pages](https://github.com/0xPacman/Portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/0xPacman/Portfolio/actions/workflows/deploy.yml)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8)](https://tailwindcss.com/)

A modern, responsive portfolio website showcasing cloud infrastructure expertise and open-source projects. Built with Next.js, TypeScript, and Tailwind CSS featuring glassmorphism design and dark/light theme support.

## 🚀 Live Demo 

- **Portfolio**: [https://0xpacman.com](https://0xpacman.com)

## 👨‍💻 About

**Cloud Infrastructure Engineer** based in Casablanca, Morocco. Open to collaboration and consultation. Specializing in:

- 🏗️ Private & Public Cloud Architecture
- 🔧 Enterprise Infrastructure Automation
- 🛡️ Network Security & Data Center Operations
- 📊 System Monitoring & DevOps Tools

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Radix UI + Custom Components
- **Icons**: Lucide React
- **Deployment**: GitHub Pages via GitHub Actions
- **Theme**: Dark/Light mode with glassmorphism effects

## 🎨 Features

- ✨ Modern glassmorphism design
- 🌙 Dark/Light theme toggle
- 📱 Fully responsive layout
- ⚡ Optimized performance
- 🎯 Smooth scrolling navigation
- 🔗 Direct contact information
- 🚀 Fast loading animations
- 📊 Skills visualization
- 💼 Featured projects showcase

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/0xPacman/Portfolio.git
cd Portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 📁 Project Structure

```
Portfolio/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main portfolio page
├── components/            # Reusable UI components
│   └── ui/               # Shadcn/ui components
├── public/               # Static assets
│   └── media/           # Images and media files
├── lib/                  # Utility functions
├── hooks/               # Custom React hooks
└── styles/              # Additional stylesheets
```

## 🎨 Customization

### Personal Information

Update the personal information in `app/page.tsx`:

```tsx
// Update profile information
const personalInfo = {
  name: "Ahmed Jadani",
  title: "Cloud Infrastructure Engineer",
  location: "Casablanca, Morocco",
  email: "ahmed.jadani@0xpacman.com",
  phone: "+212 708 429 995"
}
```

### Skills & Projects

Modify the skills and projects arrays in `app/page.tsx` to reflect your expertise and portfolio.

### Styling

- **Colors**: Customize the color scheme in `tailwind.config.ts`
- **Fonts**: Update font configurations in `app/layout.tsx`
- **Theme**: Modify glassmorphism effects and gradients

## 🚀 Deployment

This portfolio is configured for automatic deployment to GitHub Pages using GitHub Actions.

### GitHub Pages Setup

1. Go to repository Settings → Pages
2. Source: "GitHub Actions"
3. The workflow will automatically deploy on push to `main`

### Manual Deployment

```bash
# Build for static export
pnpm build

# Deploy the out/ directory to your hosting platform
```

## 📱 Contact

- **Email**: [ahmed.jadani@0xpacman.com](mailto:ahmed.jadani@0xpacman.com)
- **LinkedIn**: [linkedin.com/in/0xpacman](https://linkedin.com/in/0xpacman)
- **GitHub**: [github.com/0xPacman](https://github.com/0xPacman)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/0xPacman/Portfolio/issues).

---

**Built with ❤️ by Ahmed Jadani (@0xPacman)**  
*Cloud Infrastructure Engineer — open to collaboration & consultation*
