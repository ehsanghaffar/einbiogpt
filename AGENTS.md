# AGENTS.md - Coding Guidelines for AI Agents

## Project Overview
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript 4.9.4
- **UI**: React 18.2.0 + Tailwind CSS 3.2.4
- **Components**: shadcn/ui (Radix UI primitives)
- **Package Manager**: Yarn 1.22.22
- **Language**: Persian/Farsi (RTL direction)

## Build/Development Commands

```bash
# Development server
yarn dev

# Production build
yarn build

# Start production server
yarn start

# Clean and reinstall dependencies
yarn run clean

# Docker commands (via Makefile)
make build          # Build Docker containers
make start          # Start containers in detached mode
make logs           # View container logs
make stop           # Stop containers
```

**Note**: No lint, test, or format commands are currently configured.

## Code Style Guidelines

### TypeScript Configuration
- Target: ES5
- Strict mode enabled
- Module resolution: Node
- Path alias: `@/*` maps to root directory
- JSX: preserve (Next.js handles compilation)

### Import Order
1. React/Next.js imports
2. Third-party libraries
3. Internal UI components (`@/components/ui/*`)
4. Other internal components (`@/components/*`)
5. Utilities (`@/lib/utils`)
6. Types
7. Styles

### Naming Conventions
- **Components**: PascalCase (e.g., `BioGenerator`, `Header`)
- **Hooks**: camelCase starting with `use` (e.g., `useState`)
- **Utilities**: camelCase (e.g., `cn`, `errorHandler`)
- **Types/Interfaces**: PascalCase (e.g., `ButtonProps`)
- **Files**: kebab-case for utilities, PascalCase for components

### Component Structure
```tsx
"use client"; // If client component (before imports)

import { useState } from "react"; // React imports first
import { motion } from "framer-motion"; // Third-party
import { Button } from "@/components/ui/button"; // UI components
import { cn } from "@/lib/utils"; // Utilities

// Types
interface Props {
  // ...
}

// Component
export const ComponentName = ({ prop }: Props) => {
  // Hooks
  const [state, setState] = useState();
  
  // Handlers
  const handleClick = () => {};
  
  // Render
  return <div>...</div>;
};

export default ComponentName;
```

### Styling Guidelines
- Use Tailwind CSS utility classes exclusively
- Use `cn()` utility for conditional classes
- Color scheme uses HSL CSS variables (--background, --foreground, etc.)
- Dark mode: `darkMode: ["class"]` in tailwind.config.js
- RTL support: `dir="rtl"` on main container

### Error Handling
- Use try/catch with typed errors
- Use `sonner` for toast notifications
- API errors: Return JSON with `{ message: string }`
- Use ServerError class for custom errors (see `types/types.ts`)

### API Routes
- Location: `app/api/*/route.ts`
- Use Next.js App Router convention
- Return `NextResponse.json()` for responses
- Implement rate limiting/cooldown for generation endpoints

### Key Dependencies
- `framer-motion`: Animations
- `lucide-react`: Icons
- `sonner`: Toast notifications
- `zod`: Schema validation
- `class-variance-authority`: Component variants
- `tailwind-merge` + `clsx`: Class merging

### File Organization
```
app/
  api/           # API routes
  page.tsx       # Main page
  layout.tsx     # Root layout
components/
  ui/            # shadcn/ui components
  *.tsx          # Custom components
lib/
  utils.ts       # Utility functions (cn, errorHandler)
types/
  types.ts       # TypeScript types
styles/
  globals.css    # Global styles + CSS variables
```
