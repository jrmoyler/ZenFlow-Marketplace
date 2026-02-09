# DESIGN SYSTEM (ZenFlow Marketplace)

This document defines the visual language of the ZenFlow Marketplace. Any change to the UI must reference these tokens.

## Colors

### Brand
- **Primary (Amber/Gold)**:
  - `primary-50`: `#fffbeb` (light backgrounds)
  - `primary-400`: `#fbbf24` (highlights)
  - `primary-500`: `#f59e0b` (primary actions)
  - `primary-600`: `#d97706` (hover states)

### Neutrals (Slate)
- **Backgrounds**:
  - `slate-900`: `#0f172a` (App Background - Deep)
  - `slate-950`: `#020617` (Section Backgrounds - Deepest)
  - `slate-800`: `#1e293b` (Card Backgrounds - Surface)
- **Text**:
  - `slate-100`: `#f1f5f9` (Primary Text)
  - `slate-300`: `#cbd5e1` (Secondary Text)
  - `slate-400`: `#94a3b8` (Tertiary Text)
  - `slate-500`: `#64748b` (Disabled/Footer Text)

## Typography

### Font Family
- **Sans Serif**: `font-sans` (System default stack: Inter, Roboto, Helvetica, Arial, sans-serif)

### Hierarchy
- **H1 (Page Title)**: `text-4xl` or `text-5xl`, `font-bold`, `text-slate-100`
- **H2 (Section Title)**: `text-3xl`, `font-bold`, `text-slate-100`
- **H3 (Card Title)**: `text-xl`, `font-semibold`, `text-slate-100`
- **Body**: `text-base`, `text-slate-300`, `leading-relaxed`
- **Small**: `text-sm`, `text-slate-400`
- **Tiny/Label**: `text-xs`, `font-medium`, `uppercase`, `tracking-wide`

## Spacing & Layout

### Grid
- **Container**: `container mx-auto px-4` or `px-6`
- **Columns**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- **Gap**: `gap-8` (standard), `gap-12` (loose)

### Vertical Rhythm
- **Section Padding**: `py-12` or `py-16` (large), `py-8` (standard)
- **Component Padding**: `p-6` (card internal), `p-4` (compact)

## Components

### Buttons
- **Primary**: `bg-primary-600 text-white hover:bg-primary-500 rounded-lg py-3 px-6 font-bold shadow-lg`
- **Secondary**: `bg-slate-700 text-slate-200 hover:bg-slate-600 rounded-lg py-3 px-6 font-medium`
- **Ghost/Link**: `text-slate-400 hover:text-white transition-colors`

### Cards (Product)
- **Container**: `bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden`
- **Interaction**: `hover:shadow-xl hover:border-primary-500/30 transition-all duration-300 cursor-pointer`
- **Content**: Clean hierarchy. Image -> Title -> Price. Remove clutter.

### Inputs
- **Field**: `bg-slate-800 border border-slate-600 rounded-lg py-2 px-4 text-slate-200 focus:ring-2 focus:ring-primary-500`

## Motion
- **Transitions**: `transition-all duration-300 ease-out`
- **Hover**: Subtle lift (`-translate-y-1` or scale `1.02`), avoid jumpiness.
