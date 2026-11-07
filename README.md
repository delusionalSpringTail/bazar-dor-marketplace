# বাজার দর — Bazar Dor

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**

Bazar Dor is a Bengali-language market-price web application that helps users explore essential products, browse categories, compare available market prices, and understand daily price movements through a responsive, easy-to-use interface.

**Live Website:** https://bazar-dor-marketplace.vercel.app/  
**GitHub Repository:** https://github.com/delusionalSpringTail/bazar-dor-marketplace

---

## Overview

Bazar Dor brings essential commodity prices into one place. Users can browse products, explore categories, view price trends, and access detailed product information after signing in.

The interface is designed primarily for Bengali-speaking users, with Bengali product information, prices, navigation, and market-related messaging.

## Key Features

### 1. Responsive Homepage
- Bengali branding with a market-focused navigation experience.
- Category navigation and a scrolling price ticker.
- Hero section with a call to action.
- Sections highlighting products with rising and falling prices.
- Responsive product grid for mobile, tablet, and desktop.

### 2. Product Catalogue
- Fetches product information from the Bazar Dor REST API.
- Displays product names, illustrations, units, prices, and available price-change indicators.
- Supports category-based product filtering.
- Provides product cards that link to their detail pages.

### 3. Product Details
- Protected product-detail pages that require authentication.
- Product summary, category, unit, and available pricing information.
- Minimum, maximum, average, and market-wise prices when supplied by the API.

### 4. Category Browsing and Sorting
- Browse products by category.
- Sort by default order, lowest price, or highest price.
- Compare prices numerically, including values represented with Bengali numerals.
- Handle empty or invalid category results with a helpful return-home option.

### 5. Authentication
- Email and password registration and sign-in.
- Google OAuth sign-in.
- GitHub OAuth sign-in.
- Sign-out and session-aware navigation.
- Success and error feedback for authentication actions.
- Protected routes for authenticated users.

Social sign-in requires valid provider credentials in the deployment environment.

### 6. Profile Management
- View the signed-in user's profile.
- Update the user's name through a dedicated profile-update page.
- Return to the application after saving profile information.

### 7. Loading and Error States
- Loading indicators and skeleton-style loading experiences where implemented.
- Error handling for unsuccessful requests.
- A custom not-found experience with a link back to the homepage.
- App Router routes designed to support direct navigation and page refreshes.

### 8. Responsive User Experience
- Layouts adapted for mobile, tablet, and desktop.
- Flexible product grids and page containers.
- Responsive navigation, forms, buttons, and content sections.

## Technologies

| Technology | Purpose |
| --- | --- |
| Next.js App Router | Application framework, routing, and server rendering |
| React | Component-based user interface |
| TypeScript | Type-safe application development |
| Tailwind CSS | Responsive styling |
| Better Auth | Authentication and session management |
| MongoDB | Authentication data storage |
| React Hot Toast | User feedback and notifications |
| Lucide React | Interface icons |
| Bazar Dor REST API | Product, category, and market-price data |
| Vercel | Production deployment |

## API Documentation

The application uses the Bazar Dor API to retrieve product and category information.

### Base URLs

**Primary API**
```text
https://api.api-store.workers.dev/api/bazardor
```

**Alternative API**
```text
https://api.abcz.workers.dev/api/bazardor
```

### Available Endpoints

| Endpoint | Description |
| --- | --- |
| `GET /products` | Retrieve all products |
| `GET /products?category=chal` | Filter products by category |
| `GET /products/1` | Retrieve a product by its identifier |
| `GET /categories` | Retrieve available categories |
| `GET /categories/chal` | Retrieve a category by its slug |

Replace `chal` or `1` with the appropriate category slug or product identifier when making requests.

The actual availability and shape of price-history and market-wise data depend on the API response.

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js compatible with the project's Next.js version
- npm
- A MongoDB database
- Google OAuth credentials for Google sign-in
- A GitHub OAuth App for GitHub sign-in

Social-provider credentials are required only if you want to enable the corresponding sign-in option.

### 1. Clone the repository

```bash
git clone https://github.com/delusionalSpringTail/bazar-dor-marketplace
cd bazar-dor-marketplace
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root. See the example below and replace the placeholders with your own values.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Run quality checks

```bash
npm lint
npm build
```

Run these checks before committing changes or deploying the application.

## Environment Variables

Create `.env` in the root directory:

```dotenv
# MongoDB
MONGODB_URI=

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# GitHub OAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

```

## Authentication Configuration

Bazar Dor uses Better Auth for email/password authentication and social sign-in.

### Google OAuth

Configure a Google OAuth client in the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).

For local development, configure the appropriate local origin and callback:

```text
Authorized JavaScript origin:
http://localhost:3000

Authorized redirect URI:
http://localhost:3000/api/auth/callback/google
```

For production, configure:

```text
Authorized JavaScript origin:
https://bazar-dor-marketplace.vercel.app/

Authorized redirect URI:
https://bazar-dor-marketplace.vercel.app/api/auth/callback/google
```


## Project Structure

The project uses the Next.js App Router. The main application areas include:

```text
src/
├── app/
│   ├── api/
│   │   └── auth/
│   ├── categories/
│   ├── product/
│   ├── products/
│   ├── profile/
│   ├── signin/
│   ├── signup/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
└── lib/
```

- `src/app/` contains routes and page layouts.
- `src/app/api/auth/` handles Better Auth requests.
- `src/components/` contains reusable UI components.
- `src/lib/` contains shared application and authentication utilities.

Individual filenames and additional directories may vary as the project evolves.

## Deployment

Bazar Dor is deployed on Vercel.

**Production URL:** https://bazar-dor-marketplace.vercel.app/
