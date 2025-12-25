# Wedding Website - Localized Dynamic Site Plan

## Overview

Build a dynamic, multi-page wedding website with full localization support for German and Polish. The site will automatically detect the browser's language preference and allow manual language switching via a toggle. All content will be dynamically loaded based on the selected language using JavaScript.

## File Structure

```javascript
marriage-website/
├── index.html          # Homepage (language-agnostic structure)
├── whatsapp.html       # WhatsApp groups page
├── rsvp.html          # RSVP page with Google Form link
├── photos.html        # Photos page (placeholder for future)
├── styles/
│   └── main.css        # Shared styling for all pages
├── scripts/
│   ├── main.js         # Navigation and general functionality
│   └── i18n.js         # Localization system and language management
└── assets/
    ├── images/         # For future photos and any current images
    └── locales/
        ├── de.json     # German translations
        └── pl.json     # Polish translations
```



## Localization System

### Language Detection

- Automatically detect browser locale on page load
- Check for `navigator.language` or `navigator.languages`
- Default to German if browser language doesn't match German or Polish
- Store selected language in `localStorage` for persistence across pages

### Language Toggle

- Language selector in navigation bar (flag icons or language codes: DE/PL)
- Dropdown or button group for language selection
- Updates all content immediately when language changes
- Persists selection across page navigation

### Translation Files

- **de.json**: All German translations organized by page and section
- **pl.json**: All Polish translations with matching structure
- JSON structure with nested objects for organization (e.g., `homepage.hero.title`, `nav.home`)

## Page Structure

### Navigation Bar (on all pages)

- Consistent header navigation across all pages
- Links to: Home, WhatsApp Groups, RSVP, Photos
- Language toggle (DE/PL selector)
- Responsive mobile menu (hamburger menu for small screens)
- Active page indicator

### 1. Homepage (index.html)

- **Hero Section**: Large, welcoming header with couple's names and wedding date (localized)
- **Information Section**: Wedding details (venue, time, dress code, etc.) and organizational information (all localized)
- Clean, readable layout with elegant styling

### 2. WhatsApp Groups Page (whatsapp.html)

- Links to WhatsApp group chats
- Organized by category (e.g., "Main Group", "Travel Arrangements", etc.)
- Each link opens WhatsApp web/app when clicked
- Clear instructions on how to join (localized)

### 3. RSVP Page (rsvp.html)

- Prominent call-to-action button/link
- Links to existing Google Form
- Opens in new tab
- Brief instructions or additional information (localized)

### 4. Photos Page (photos.html)

- Placeholder structure ready for future photo gallery
- Placeholder text indicating photos will be added after the event (localized)
- Styled to match the rest of the site
- Grid layout prepared for future image display

## Implementation Details

### i18n.js Features

- `detectLanguage()`: Detects browser locale
- `loadLanguage(lang)`: Loads translation file and applies translations
- `translate(key)`: Gets translation for a given key
- `updatePageContent()`: Updates all page elements with current language
- `initI18n()`: Initializes the localization system on page load

### Translation Key Structure

```json
{
  "nav": {
    "home": "Home",
    "whatsapp": "WhatsApp Groups",
    "rsvp": "RSVP",
    "photos": "Photos"
  },
  "homepage": {
    "hero": {
      "title": "We're Getting Married!",
      "date": "Save the Date",
      "subtitle": "Join us for a celebration of love"
    },
    "info": {
      "title": "Wedding Information",
      "date": "Date & Time",
      "venue": "Venue",
      "dressCode": "Dress Code",
      "accommodation": "Accommodation"
    }
  }
}
```



### HTML Structure

- All text content will have `data-i18n` attributes pointing to translation keys
- Example: `<h1 data-i18n="homepage.hero.title"></h1>`
- JavaScript will populate these elements on page load and language change

### Design Approach

- Modern, clean aesthetic with wedding-appropriate color scheme
- Fully responsive (mobile, tablet, desktop)
- Language toggle prominently displayed in navigation
- Smooth transitions when switching languages
- Accessible and semantic HTML
- No external dependencies (vanilla JS/CSS)

## Technical Implementation

- Use CSS Grid/Flexbox for layouts
- Mobile-first responsive design
- Shared CSS file for consistent styling across all pages
- Navigation bar component included in each HTML page
- Active page highlighting in navigation