# Cash Dashboard — Next.js

A Next.js React implementation of the Cluster Yarra resident dues tracker.

## Features

- **Dashboard** (`/`) — Public view showing:
  - Hero section with animated gold shimmer background
  - Stats strip (Outstanding, Collected, Target, Completion)
  - Progress bar visualization
  - Outstanding payments with two view modes:
    - Table view: sortable list with status pills
    - Grouped view: cards grouped by status (Urgent/Behind/Almost there) or block
  - Settled households roll with gold shimmer hover effects
  - Tweaks panel for customizing view options

- **Admin** (`/admin`) — Treasurer interface for uploading PDF reports

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- CSS Modules

## Design System

Based on the original `DESIGN.md`:

- **Colors**: Warm white/cream background (#fafaf7) with antique gold accent (#b8893a)
- **Typography**: Inter for UI, IBM Plex Mono for numbers/units
- **Aesthetic**: Newspaper-meets-fintech with hairline rules, generous whitespace, minimal cards

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── TopBar.tsx       # Brand mark + navigation
│   ├── Hero.tsx         # Title with animated background
│   ├── Stats.tsx        # Four-column stats strip
│   ├── ProgressBar.tsx  # Collection progress
│   ├── UnpaidSection.tsx   # Outstanding payments (table/grouped)
│   ├── PaidRoll.tsx     # Settled households list
│   ├── TweaksPanel.tsx  # Settings panel
│   └── Footer.tsx       # Page footer
├── data/
│   └── households.ts    # Resident data
├── lib/
│   └── utils.ts         # Formatting utilities
├── page.tsx             # Dashboard page
├── layout.tsx           # Root layout with fonts
└── globals.css          # Global styles + CSS variables
```

## Tweaks Panel Options

- **View Mode**: Switch between Table and Grouped views
- **Group By**: Group by payment status or block number
- **Hide "Almost there"**: Filter out households with small remaining balances
