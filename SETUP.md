# SETUP GUIDE — Govind Legal Associates Website

## Prerequisites
- Node.js 18+ installed
- npm or yarn

---

## 1. Install Dependencies

```bash
cd legal-site
npm install
```

---

## 2. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in:
- `EMAIL_USER` — your Gmail address
- `EMAIL_PASS` — your Gmail App Password (see below)
- `RECIPIENT_EMAIL` — email where contact form submissions arrive

**How to get Gmail App Password:**
1. Go to myaccount.google.com → Security
2. Enable 2-Step Verification (required)
3. Go to Security → App passwords
4. Select app: Mail, device: Other → enter "Website"
5. Copy the 16-character password → paste into `EMAIL_PASS`

---

## 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 4. How to Change WhatsApp Number

Open `lib/constants.ts` and change:
```ts
whatsappNumber: '91XXXXXXXXXX',  // ← your number, no + sign, with country code
// Example: '919999065534'
```

That is the **only** file you need to edit. All WhatsApp buttons read from this one value.

---

## 5. How to Change Phone Numbers

In `lib/constants.ts`:
```ts
phone1: '+91 9999065534',
phone2: '+91 9650845906',
```

All phone links across the site update automatically.

---

## 6. How to Change Email Address

In `lib/constants.ts`:
```ts
email: 'rs@high-endlawyers.in',
```

Also update `RECIPIENT_EMAIL` in `.env.local` to match.

---

## 7. How to Change Office Address

In `lib/constants.ts`:
```ts
address: 'A-53, Gulab Bagh, Main Najafgarh Road, Uttam Nagar, New Delhi – 110059',
```

**Then also update the Google Maps embed URL:**
1. Go to [maps.google.com](https://maps.google.com)
2. Search your address
3. Click Share → Embed a map
4. Copy the `src="..."` value from the `<iframe>` code
5. Paste it into `lib/constants.ts`:
```ts
googleMapsEmbedURL: 'https://www.google.com/maps/embed?pb=...',
```

---

## 8. How to Add Advocate Photo

1. Add your photo file to `/public/images/` (e.g. `advocate.jpg`)
2. Open `components/home/AdvocateSection.tsx` and `components/about/AdvocateProfile.tsx`
3. Find the comment `// TO ADD ADVOCATE PHOTO`
4. Replace the `src` URL:
```tsx
// Before:
src="https://images.unsplash.com/..."

// After:
src="/images/advocate.jpg"
```

---

## 9. How to Add Your Videos

1. Place your video files in `/public/videos/` (e.g. `bail-video.mp4`)
2. Open `components/home/VideoInsightsSection.tsx`
3. Find the `VIDEOS` array at the top
4. Replace each `src`:
```ts
// Before:
src: '/videos/placeholder.mp4',

// After:
src: '/videos/bail-video.mp4',
title: 'Understanding Your Bail Rights',
```

**Supported formats:** MP4 (H.264), WebM. Keep files under 50MB for fast loading.

---

## 10. How to Update Advocate Name & Bio

In `lib/constants.ts`:
```ts
advocateName: 'Advocate Govind Sharma',
```

Then update the bio text in:
- `components/home/AdvocateSection.tsx` — look for `// REPLACE`
- `components/about/AdvocateProfile.tsx` — look for `// REPLACE`

---

## 11. How to Update Social Media Links

In `lib/constants.ts`:
```ts
instagram1: 'https://instagram.com/your_handle',
instagram2: 'https://instagram.com/your_second_handle',
linkedin:   'https://linkedin.com/in/your_profile',
facebook:   'https://facebook.com/your_page',
twitter:    'https://x.com/your_handle',
```

---

## 12. How to Update FAQ / Terms Content

- **FAQ:** Edit `components/about/FAQSection.tsx` — the `FAQS` array at the top
- **Terms:** Edit `components/services/TermsSection.tsx` — the `TERMS` array at the top

---

## 13. How to Update Blog Articles

- Blog post 1: `app/blog/civil-case/page.tsx`
- Blog post 2: `app/blog/ndps-bail/page.tsx`

Both files have `// REPLACE` comments marking editable sections.

---

## 14. Build for Production

```bash
npm run build
npm start
```

---

## 15. Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard (Settings → Environment Variables):
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `RECIPIENT_EMAIL`
4. Deploy

---

## 16. Security Checklist Before Going Live

- [ ] `.env.local` is in `.gitignore` (already set)
- [ ] No personal data hardcoded anywhere except `lib/constants.ts`
- [ ] Gmail App Password used (not account password)
- [ ] Add rate limiting to `app/api/contact/route.ts` (see TODO comment in file)
- [ ] Update Content-Security-Policy in `app/layout.tsx` for your actual domains
- [ ] Replace all placeholder `// REPLACE` images with actual images
- [ ] Replace all placeholder video files with actual videos
- [ ] Review and update Terms & Conditions content

---

## Project Structure Reference

```
legal-site/
├── app/
│   ├── layout.tsx              ← Root layout, fonts, head tags
│   ├── page.tsx                ← Home page
│   ├── about/page.tsx          ← About Us page
│   ├── services/page.tsx       ← Services page
│   ├── contact/page.tsx        ← Contact page
│   ├── blog/
│   │   ├── page.tsx            ← Blog listing
│   │   ├── civil-case/page.tsx ← Blog post 1
│   │   └── ndps-bail/page.tsx  ← Blog post 2
│   └── api/contact/route.ts    ← Nodemailer API
├── components/
│   ├── layout/                 ← Navbar, Footer, WhatsApp, Disclaimer, Cookie
│   ├── home/                   ← Hero, Advocate, Services, Testimonials, Videos
│   ├── about/                  ← AboutHero, AdvocateProfile, FAQ
│   ├── services/               ← ServiceCard, WhyChooseUs, Terms
│   ├── contact/                ← ContactForm, OfficeMap
│   ├── blog/                   ← BlogCard, BlogPost
│   └── ui/                     ← Button, SectionHeading, AnimatedCounter
├── lib/
│   ├── constants.ts            ← ⭐ ALL editable site data here
│   └── types.ts                ← TypeScript interfaces
├── public/
│   ├── images/                 ← Add advocate photo here
│   └── videos/                 ← Add video files here
├── .env.local.example          ← Copy → .env.local, fill credentials
├── SETUP.md                    ← This file
└── tailwind.config.ts          ← Brand colors, fonts
```
