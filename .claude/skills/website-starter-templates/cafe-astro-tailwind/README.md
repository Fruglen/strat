# ☕ Kopi Ruang Temu - Modern Coffee Shop Template

A premium, SEO-optimized, and fully responsive landing page template designed for modern coffee shops and boutiques. Built with the latest **Astro 5** and **Tailwind CSS**.

---

## ✨ Features

- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop views.
- 🚀 **High Performance**: Lightning fast load times with Astro's zero-JS-by-default architecture.
- 🎨 **Premium Aesthetic**: Warm coffee-inspired color palette with modern typography.
- 🔍 **SEO Ready**: Dynamic meta tags, semantic HTML, and pre-configured SEO fields.
- 📍 **Conversion Optimized**: Strategic CTA buttons (Order via WhatsApp) and clear menu sections.
- 🖼️ **Aesthetic Assets**: Includes high-quality AI-generated coffee photography.

---

## 🛠️ Tech Stack

- **Framework**: [Astro 5](https://astro.build/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Typography**: [Google Fonts](https://fonts.google.com/) (Outfit for headings, Inter for body)
- **Icons/Media**: Custom AI-generated assets and Lucide-inspired components.

---

## 📂 Project Structure

```text
/
├── public/
│   └── images/          # Aesthetic coffee photography assets
├── src/
│   ├── components/      # Reusable UI components (e.g., MenuCard.astro)
│   ├── layouts/         # Base HTML layout and SEO meta tags
│   ├── pages/           # Landing page content (index.astro)
│   └── styles/          # Global CSS and Tailwind imports
├── astro.config.mjs     # Astro configuration (Tailwind & Vite)
└── package.json         # Project dependencies and scripts
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18.17.1 or higher) installed on your system.

### 2. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 3. Development
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser to see the result.

### 4. Build
To create a production-ready build:
```bash
npm run build
```
The output will be located in the `dist/` directory.

---

## 🎨 Customization Guide

### Changing Colors
The project uses a curated color palette. To modify it, update the background and text classes in `src/layouts/Layout.astro`:
- **Background**: `#FAF7F2` (Cream)
- **Primary Text**: `#2C1E12` (Espresso)
- **Accent**: `#8B5E3C` (Warm Brown)

### Updating Images
Replace the images in `public/images/` with your own photography. Ensure the filenames match or update the paths in `src/pages/index.astro`.

### Modifying the Menu
The menu items are stored in a simple array at the top of `src/pages/index.astro`. You can easily add, remove, or edit items there:
```javascript
const menuItems = [
	{
		title: "New Coffee Name",
		description: "Short description here...",
		price: "Rp 30.000",
		image: "/images/your-image.png"
	},
    // ...
];
```

---

## � License

This template is open-source and free to use for personal or commercial projects.

---

> Built with ❤️ and **Antigravity AI**.
