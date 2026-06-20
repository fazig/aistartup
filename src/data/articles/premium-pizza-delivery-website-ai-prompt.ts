import { BlogPost } from "../posts";

export const postPremiumPizzaDeliveryWebsite: BlogPost = {
  slug: "premium-pizza-delivery-website-ai-prompt",
  title: "Build a Premium 3D Pizza Delivery App with AI — Full Prompt & Source Code",
  description:
    "Complete AI prompt, tech stack, and open-source code to build a futuristic Next.js pizza delivery website with 3D models, glassmorphism UI, cart, checkout, live tracking, and admin dashboard.",
  date: "June 20, 2026",
  readTime: "30 min read",
  category: "AI & Technology",
  author: "Faizan Arif",
  image: "/pizza_delivery_website_cover.png",
  content: `# Build a Premium 3D Pizza Delivery Website with AI — Full Prompt & Source Code

In this guide, I share the **exact AI prompt** I used to generate a complete, production-ready pizza delivery web application — plus the **full open-source codebase** you can clone, customize, and deploy today.

This is not a basic HTML pizza page. The result is a next-generation startup-quality product: 3D rotating pizza models, glassmorphism UI, Framer Motion animations, full e-commerce flow, live order tracking, admin dashboard, and Vercel-ready architecture.

---

## Source Code (GitHub)

Clone the complete project here:

**[github.com/fazig/pizzawebsite](https://github.com/fazig/pizzawebsite)**

### Quick Start

\`\`\`bash
git clone https://github.com/fazig/pizzawebsite.git
cd pizzawebsite
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) — the full app runs locally in minutes.

### Deploy to Vercel

1. Push the repo to your GitHub account
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — click Deploy

---

## What Was Built

| Page | Features |
| :--- | :--- |
| **Landing** | 3D rotating pizza hero, floating reviews, delivery scooter animation, neon CTA |
| **Menu** | Premium cards, filters (Veg, Chicken, Beef, Spicy, Premium), instant search |
| **Product Detail** | 3D model, size/crust/cheese/toppings, live price calculator |
| **Cart** | Quantity controls, promo codes, animated remove, dynamic totals |
| **Checkout** | Delivery form, COD / Card / Stripe UI, order summary |
| **Confirmation** | Success animation, delivery countdown timer |
| **Live Tracking** | Progress steps, animated map, rider movement, ETA |
| **Offers** | Deals with countdown timers |
| **Account** | Login, signup, order history, saved addresses |
| **About & Contact** | Brand story, FAQ accordion, support chat widget |
| **Admin** | Revenue charts, orders table, inventory, menu management |

### Tech Stack

* **Next.js 15** (App Router, Turbopack)
* **React 19** + TypeScript
* **Tailwind CSS 4**
* **Framer Motion** — page transitions & micro-interactions
* **React Three Fiber** — 3D pizza models
* **Zustand** — cart & order persistence
* **Radix UI / Shadcn-style** components
* **PWA** support, SEO metadata, sitemap, robots.txt

---

## The Complete AI Prompt

Copy the prompt below into **Cursor**, **ChatGPT**, **Claude**, or any AI coding agent to recreate or extend this project.

\`\`\`text
You are a senior frontend engineer and award-winning UI/UX designer.

Your task is to build a COMPLETE premium pizza delivery web application that looks futuristic, modern, highly animated, visually stunning, and production-ready.

IMPORTANT GOAL:
Do NOT create a normal pizza website.
This must look like a next-generation startup website with 3D visuals, glassmorphism, smooth transitions, floating objects, premium interactions, and extremely polished UI.

TECH STACK REQUIRED:
- Next.js latest version
- React latest version
- Tailwind CSS
- Framer Motion animations
- Three.js / React Three Fiber for 3D pizza models
- Shadcn UI components
- TypeScript
- Fully responsive
- Optimized for deployment on Vercel
- Code structure clean for GitHub upload
- SEO optimized
- Fast loading
- Mobile first architecture

DESIGN STYLE:
Create a futuristic luxury food ordering website combining:
- Apple level premium design
- Stripe quality animations
- Tesla style smooth transitions
- Floating 3D pizza models
- Dark mode + neon orange + red glowing accents
- Glassmorphism cards
- Depth shadows, smooth hover effects
- Floating ingredient particles
- Realistic cheese melting effect animation
- Animated flame effects near CTA buttons
- Soft blur backgrounds, borderless premium layout
- Smooth scrolling sections, fully immersive UI

DO NOT USE: boxy old UI, cheap templates, generic bootstrap style, normal food website designs.

CREATE COMPLETE WEBSITE WITH ALL PAGES:

1. LANDING PAGE — Hero with massive 3D rotating pizza, floating toppings, tagline "Pizza Reimagined.", Order Now CTA, animated delivery scooter, floating review cards, premium navbar (Home, Menu, Deals, Track Order, About, Contact, Login, Cart icon).

2. MENU PAGE — Premium pizza cards with image, 3D hover, name, ingredients, calories, spice level, price, add-to-cart animation. Filters: Veg, Chicken, Beef, Cheese Burst, Spicy, Premium Specials. Search bar with instant filtering.

3. PRODUCT DETAIL PAGE — Large rotating 3D pizza, ingredient breakdown, nutrition, size selection (Small/Medium/Large/XL), crust selection, cheese slider, extra toppings, quantity, live price update, Add to Cart button.

4. CART PAGE — Product list, quantity change, remove animation, promo code, dynamic totals, tax, delivery fee, estimated delivery time, Proceed to Checkout.

5. CHECKOUT PAGE — Full name, phone, email, address, apartment, city, payment method (COD, Stripe structure, card UI), order summary sidebar.

6. ORDER CONFIRMATION — Success animation, pizza preparing animation, delivery countdown, order ID, address, payment status, Track Order / Back Home buttons.

7. LIVE ORDER TRACKING — Full screen tracking with steps: Order received, Cooking, Packing, Rider assigned, On the way, Delivered. Animated map UI, rider movement, ETA countdown.

8. OFFERS PAGE — Buy 1 get 1, family deals, limited time offers with countdown timers.

9. USER ACCOUNT — Login, signup, forgot password, order history, saved addresses, payment methods, reward points.

10. ABOUT PAGE — Brand story, chef section, ingredients sourcing, animated kitchen visuals.

11. CONTACT PAGE — Contact form, Google maps embed placeholder, support chat widget, FAQ accordion.

12. ADMIN DASHBOARD — Manage menu, view orders, update delivery status, customer analytics, revenue graph, inventory management.

ADVANCED FEATURES:
PWA support, loading skeletons, lazy loading, smooth page transitions, toast notifications, SEO metadata, Open Graph tags, favicon, robots.txt, sitemap.xml, error pages, 404 page, custom cursor, scroll animations, mobile gestures, accessibility support.

ANIMATIONS:
Page transitions, floating pizza rotation, cheese dripping, ingredient flying, hover depth, cart add animation, checkout success animation.

FOLDER STRUCTURE:
/app, /components, /hooks, /lib, /utils, /public, /styles, /constants, /types

IMPORTANT:
Generate COMPLETE working code. Do NOT leave placeholders. Every page interconnected. Production-level architecture. Deployable on GitHub and Vercel instantly. Quality better than Domino's, Pizza Hut, Uber Eats, and FoodPanda.
\`\`\`

---

## Project Structure

\`\`\`text
pizzawebsite/
├── app/                  # All pages (menu, cart, checkout, track, admin...)
├── components/           # UI, 3D models, layout, animations
├── constants/            # Pizza data, navigation, deals
├── hooks/                # Toast, mounted state
├── lib/                  # Zustand store, utils, metadata
├── types/                # TypeScript interfaces
├── public/               # PWA manifest, service worker
└── styles/               # Global CSS + Tailwind theme
\`\`\`

---

## Key Implementation Notes

### 3D Pizza Hero
The landing page uses **React Three Fiber** with a procedurally built pizza model — crust, sauce, cheese layer, floating toppings, and ingredient particles. The Canvas is lazy-loaded with \`dynamic(..., { ssr: false })\` to avoid SSR issues.

### State Management
Cart, orders, and auth use **Zustand** with \`localStorage\` persistence. Stores use \`skipHydration: true\` to prevent React hydration mismatches between server and client.

### Design System
Dark background (#050508), neon orange (#ff6b2c) and red (#ff2d2d) accents, glassmorphism cards (\`backdrop-blur-xl\`, semi-transparent borders), and Framer Motion page transitions on every route.

### SEO & PWA
Includes \`sitemap.ts\`, \`robots.ts\`, Open Graph metadata, dynamic favicon, and a service worker for installable PWA support.

---

## Customization Ideas

* Replace placeholder pizza data in \`constants/pizzas.ts\` with your restaurant menu
* Connect Stripe API keys in checkout for live payments
* Add Google Maps API key on the contact page
* Deploy admin panel behind authentication middleware
* Swap Unsplash pizza images with your own photography

---

## Final Thoughts

This project demonstrates how a single, well-structured AI prompt can produce a **complete commercial-grade web application** — not a demo, but a deployable product with 12 interconnected pages, 3D visuals, and full ordering flow.

**Get the code:** [github.com/fazig/pizzawebsite](https://github.com/fazig/pizzawebsite)

Fork it, customize it for your brand, and deploy to Vercel in under 10 minutes.
`,
};
