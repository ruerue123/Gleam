# Gleam Design System

## Overview
This document outlines the design tokens and patterns used throughout the Gleam e-commerce application.

## Design Tokens

All design tokens are centralized in `/src/styles/tokens.js`. **Always import and use these tokens instead of hardcoded values.**

### Usage Example

```javascript
import tokens from '../styles/tokens';

const MyComponent = () => (
  <div style={{
    color: tokens.colors.text.primary,
    padding: tokens.spacing.md,
    fontSize: tokens.typography.fontSize.base,
    fontFamily: tokens.typography.fontFamily.body,
  }}>
    Content here
  </div>
);
```

## Color Palette

### Primary Colors
- `tokens.colors.primary` - #8B7355 (Main brand color)
- `tokens.colors.primaryLight` - #A89584
- `tokens.colors.primaryDark` - #6F5943

### Text Colors
- `tokens.colors.text.primary` - #171515 (Main text)
- `tokens.colors.text.secondary` - #8B7355 (Secondary text)
- `tokens.colors.text.tertiary` - #A89584 (Tertiary text)
- `tokens.colors.text.disabled` - rgba(23, 21, 21, 0.4)

### Background Colors
- `tokens.colors.background.primary` - #ffffff
- `tokens.colors.background.secondary` - #FAFAF8
- `tokens.colors.background.tertiary` - #EDECE4

### Status Colors
Each status has `bg`, `text`, and `border` properties:
- `tokens.colors.status.success.*`
- `tokens.colors.status.error.*`
- `tokens.colors.status.warning.*`
- `tokens.colors.status.info.*`

## Spacing Scale

Based on an 8px grid system:

- `xxxs`: 4px (0.25rem)
- `xxs`: 8px (0.5rem)
- `xs`: 12px (0.75rem)
- `sm`: 16px (1rem)
- `md`: 24px (1.5rem)
- `lg`: 32px (2rem)
- `xl`: 40px (2.5rem)
- `xxl`: 48px (3rem)
- `xxxl`: 64px (4rem)
- `huge`: 80px (5rem)

### Fluid Spacing (Responsive)
Use `tokens.fluidSpacing.*` for responsive spacing that scales with viewport:
- `xs` through `xxl` with `clamp()` values

## Typography

### Font Families
- Headings: `tokens.typography.fontFamily.heading` (Cardo)
- Body: `tokens.typography.fontFamily.body` (Cormorant)

### Font Sizes
All font sizes use responsive `clamp()`:
- `xs` through `huge` (8 sizes total)

### Font Weights
- `light`: 300
- `normal`: 400
- `medium`: 500
- `semibold`: 600
- `bold`: 700

## Breakpoints

```javascript
tokens.breakpoints = {
  xs: '320px',   // Extra small phones
  sm: '576px',   // Small phones
  md: '768px',   // Tablets
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  xxl: '1536px', // Extra large desktop
}
```

### Media Query Helper

```javascript
import { mediaQuery } from '../styles/tokens';

const styles = `
  ${mediaQuery.md} {
    // Styles for tablet and up
  }
`;
```

## Shadows

- `xs` through `xxl` (7 levels)
- Use for elevation and depth

## Border Radius

- `none`: 0
- `sm`: 2px
- `base`: 4px
- `md`: 8px
- `lg`: 12px
- `xl`: 16px
- `full`: 9999px (circle)

## Transitions

- `fast`: 200ms
- `normal`: 400ms
- `slow`: 600ms

All use the same easing: `cubic-bezier(0.4, 0.0, 0.2, 1)`

## Z-Index Scale

Prevents z-index chaos:

- `hide`: -1
- `base`: 0
- `dropdown`: 1000
- `sticky`: 1020
- `overlay`: 1030
- `modal`: 1040
- `popover`: 1050
- `tooltip`: 1060

## Accessibility

### Keyboard Navigation

Use the `useKeyboardNav` hook for interactive elements:

```javascript
import { useKeyboardNav } from '../hooks/useKeyboardNav';

function MyButton({ onClick }) {
  const keyboardProps = useKeyboardNav(onClick);

  return (
    <button onClick={onClick} {...keyboardProps}>
      Click me
    </button>
  );
}
```

### Focus Styles

All interactive elements automatically get focus-visible styles from `global.css`:
- 2px solid outline in primary color
- 2px offset for visibility

### Modal Component

Replace `alert()` and `confirm()` with the accessible Modal component:

```javascript
import Modal, { ModalButton } from '../components/Modal';

<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Confirm Action"
  message="Are you sure you want to proceed?"
  type="warning"
  actions={
    <>
      <ModalButton variant="secondary" onClick={() => setShowModal(false)}>
        Cancel
      </ModalButton>
      <ModalButton variant="primary" onClick={handleConfirm} autoFocus>
        Confirm
      </ModalButton>
    </>
  }
/>
```

## Mobile-First Approach

All components should be designed mobile-first, then enhanced for larger screens.

### Responsive Patterns

1. **Stack to Grid**
```javascript
gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))'
```

2. **Fluid Typography**
```javascript
fontSize: tokens.typography.fontSize.base  // Uses clamp()
```

3. **Responsive Padding**
```javascript
padding: tokens.fluidSpacing.md
```

## Global CSS Classes

Available from `global.css`:

- `.container` - Responsive container with max-width
- `.px-responsive` - Responsive horizontal padding
- `.mx-responsive` - Responsive horizontal margin
- `.text-truncate` - Single line with ellipsis
- `.text-wrap` - Break long words
- `.table-responsive` - Scrollable table wrapper
- `.sr-only` - Screen reader only content
- `.skip-link` - Skip to main content link

## Best Practices

1. **Never hardcode values** - Always use tokens
2. **Mobile-first** - Start with mobile, enhance for desktop
3. **Keyboard accessible** - All interactive elements must be keyboard accessible
4. **Semantic HTML** - Use appropriate HTML elements
5. **ARIA labels** - Add aria-label to icon-only buttons
6. **Focus management** - Ensure logical tab order
7. **Color contrast** - Maintain WCAG AA compliance (4.5:1)
8. **Responsive images** - Always set max-width: 100%
9. **Prevent horizontal scroll** - Use overflow-x: hidden and max-width: 100vw
10. **Test on real devices** - Simulator is not enough

## Component Checklist

Before considering a component complete:

- [ ] Uses design tokens for all values
- [ ] Keyboard accessible (Enter/Space work)
- [ ] Focus-visible styles applied
- [ ] ARIA labels on icon-only buttons
- [ ] Responsive on all breakpoints (320px - 1536px+)
- [ ] No horizontal scroll
- [ ] Color contrast meets WCAG AA
- [ ] Works with screen reader
- [ ] Loading states implemented
- [ ] Error states handled gracefully

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
