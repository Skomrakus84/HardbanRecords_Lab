# 🎨 UI Design Blueprint - HardbanRecords Lab
## Kompleksowy Przewodnik Projektowania Interface'u

---

## 🎯 **OVERVIEW PROJEKTU**

**HardbanRecords Lab** to platforma all-in-one łącząca dystrybucję muzyczną z publikowaniem cyfrowym. Platforma jest zbudowana w React + TypeScript + Vite z backend Express.js i bazą Supabase.

### **Tech Stack:**
- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Zustand
- **Backend:** Express.js (CommonJS), mikrousługi (music/publishing)
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage (audio, okładki, PDF)
- **State Management:** Zustand stores

---

## 🏗️ **AKTUALNA ARCHITEKTURA**

### **Struktura Folderów:**
```
src/
├── components/
│   ├── analytics/          # Dashboard analityczny
│   ├── music/              # Komponenty muzyczne
│   ├── publishing/         # Komponenty wydawnicze
│   └── shared/             # Komponenty wspólne
├── pages/
│   ├── music/              # Strony modułu muzycznego
│   └── publishing/         # Strony modułu wydawniczego
├── store/
│   ├── appStore.ts         # Główny store
│   ├── musicStore.ts       # Store muzyczny
│   ├── analyticsStore.ts   # Store analityczny
│   └── authStore.ts        # Store autoryzacji
├── types/
│   ├── music.ts            # Typy muzyczne
│   ├── analytics.ts        # Typy analityczne
│   └── publishing.ts       # Typy wydawnicze
└── api/
    └── client.ts           # API client
```

### **Aktualnie Zaimplementowane Moduły:**

#### ✅ **1. RELEASE MANAGEMENT (Faza 1 - UKOŃCZONE)**
- **Lokalizacja:** `/src/pages/music/ReleasesPage.tsx`
- **Komponenty:** `AddReleaseForm`, `ReleasesList`, `ReleaseCard`
- **Funkcjonalności:**
  - Dodawanie nowych wydań muzycznych
  - Upload audio files i okładek
  - Metadata management (tytuł, artysta, gatunek, data premiery)
  - Lista wszystkich wydań z filtering

#### ✅ **2. ANALYTICS DASHBOARD (Faza 2 - UKOŃCZONE)**
- **Lokalizacja:** `/src/pages/music/AnalyticsPage.tsx`
- **Komponenty:**
  - `AnalyticsView` - główny dashboard
  - `OverviewCards` - karty KPI
  - `StreamingPlatforms` - breakdown platform
  - `RevenueChart` - wykres przychodów
  - `GeographicBreakdown` - analiza geograficzna
  - `DemographicInsights` - demografia słuchaczy
- **Funkcjonalności:**
  - Real-time analytics z mock data
  - Wybór okresów czasu (24h, 7d, 30d, 90d)
  - Responsive design
  - Loading states i error handling

---

## 🎨 **DESIGN SYSTEM & STYLE GUIDE**

### **Color Palette:**
```css
/* Primary Colors */
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-500: #3b82f6;  /* Main brand blue */
--primary-600: #2563eb;
--primary-700: #1d4ed8;
--primary-900: #1e3a8a;

/* Success Colors */
--success-50: #f0fdf4;
--success-500: #22c55e;
--success-600: #16a34a;

/* Warning Colors */
--warning-50: #fefce8;
--warning-500: #eab308;
--warning-600: #ca8a04;

/* Error Colors */
--error-50: #fef2f2;
--error-500: #ef4444;
--error-600: #dc2626;

/* Gray Scale */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;
```

### **Typography:**
```css
/* Font Stack */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

/* Heading Sizes */
.text-4xl { font-size: 2.25rem; }  /* H1 */
.text-3xl { font-size: 1.875rem; } /* H2 */
.text-2xl { font-size: 1.5rem; }   /* H3 */
.text-xl { font-size: 1.25rem; }   /* H4 */
.text-lg { font-size: 1.125rem; }  /* H5 */
.text-base { font-size: 1rem; }    /* Body */
.text-sm { font-size: 0.875rem; }  /* Small */
.text-xs { font-size: 0.75rem; }   /* Extra Small */
```

### **Spacing System:**
```css
/* Tailwind Spacing Scale */
.p-2 { padding: 0.5rem; }     /* 8px */
.p-4 { padding: 1rem; }       /* 16px */
.p-6 { padding: 1.5rem; }     /* 24px */
.p-8 { padding: 2rem; }       /* 32px */
.p-12 { padding: 3rem; }      /* 48px */

/* Gaps for grids */
.gap-4 { gap: 1rem; }         /* 16px */
.gap-6 { gap: 1.5rem; }       /* 24px */
.gap-8 { gap: 2rem; }         /* 32px */
```

### **Component Standards:**

#### **Buttons:**
```tsx
// Primary Button
<button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">

// Secondary Button
<button className="bg-white hover:bg-gray-50 text-gray-900 font-medium py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">

// Danger Button
<button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
```

#### **Cards:**
```tsx
<div className="bg-white overflow-hidden shadow rounded-lg p-6">
  <div className="flex items-center">
    <div className="flex-shrink-0">
      <Icon className="h-8 w-8 text-gray-400" />
    </div>
    <div className="ml-5 w-0 flex-1">
      <dl>
        <dt className="text-sm font-medium text-gray-500 truncate">Label</dt>
        <dd className="text-lg font-medium text-gray-900">Value</dd>
      </dl>
    </div>
  </div>
</div>
```

#### **Forms:**
```tsx
<div className="space-y-6">
  <div>
    <label className="block text-sm font-medium text-gray-700">Label</label>
    <input
      type="text"
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
</div>
```

---

## 🧩 **KOMPONENTY DO ZAIMPLEMENTOWANIA**

### **PRIORYTET 1: MODUŁ MUZYCZNY**

#### **1. Artist Management (`/music/artists`)**
```tsx
// Komponenty do stworzenia:
- ArtistCard.tsx         // Karta pojedynczego artysty
- ArtistForm.tsx         // Formularz dodawania/edycji artysty
- ArtistsList.tsx        // Lista wszystkich artystów
- ArtistProfile.tsx      // Szczegółowy profil artysty
- ContractModal.tsx      // Modal zarządzania kontraktami

// Interface:
interface Artist {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  socialMedia: {
    spotify?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  contracts: Contract[];
  releases: Release[];
  totalStreams: number;
  totalRevenue: number;
}
```

#### **2. Revenue Management (`/music/revenue`)**
```tsx
// Komponenty do stworzenia:
- RevenueOverview.tsx    // Przegląd przychodów
- SplitSheetsTable.tsx   // Tabela podziałów tantiem
- PayoutHistory.tsx      // Historia wypłat
- TaxReports.tsx         // Raporty podatkowe
- RevenueFilters.tsx     // Filtry czasowe i platformowe

// Interface:
interface Revenue {
  id: string;
  releaseId: string;
  platform: StreamingPlatform;
  period: string;
  streams: number;
  grossRevenue: number;
  netRevenue: number;
  currency: string;
  splitSheets: SplitSheet[];
}
```

#### **3. Distribution Management (`/music/distribution`)**
```tsx
// Komponenty do stworzenia:
- PlatformStatus.tsx     // Status dystrybucji na platformach
- ReleaseScheduler.tsx   // Harmonogram premier
- MetadataValidator.tsx  // Walidator metadanych
- TakedownManager.tsx    // Zarządzanie usuwaniem

// Interface:
interface Distribution {
  id: string;
  releaseId: string;
  platforms: {
    [platform: string]: {
      status: 'pending' | 'live' | 'processing' | 'failed';
      url?: string;
      goLiveDate?: string;
      lastUpdate: string;
    };
  };
}
```

### **PRIORYTET 2: MODUŁ WYDAWNICZY**

#### **1. Book Management (`/publishing/books`)**
```tsx
// Komponenty do stworzenia:
- BookCard.tsx           // Karta książki
- BookForm.tsx           // Formularz książki
- ChapterEditor.tsx      // Edytor rozdziałów
- BookPreview.tsx        // Podgląd książki
- CoverDesigner.tsx      // Projektant okładek

// Interface:
interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  isbn?: string;
  coverImage?: string;
  chapters: Chapter[];
  publishedAt?: string;
  status: 'draft' | 'published' | 'archived';
}
```

#### **2. Chapter Management**
```tsx
// Komponenty do stworzenia:
- ChaptersList.tsx       // Lista rozdziałów
- ChapterEditForm.tsx    // Formularz edycji rozdziału
- MarkdownEditor.tsx     // Edytor Markdown
- WordCounter.tsx        // Licznik słów
- ChapterPreview.tsx     // Podgląd rozdziału

// Interface:
interface Chapter {
  id: string;
  bookId: string;
  title: string;
  content: string;
  order: number;
  wordCount: number;
  publishedAt?: string;
}
```

### **PRIORYTET 3: ZAAWANSOWANE FUNKCJE**

#### **1. Collaboration Tools**
```tsx
// Komponenty do stworzenia:
- CollaboratorsList.tsx  // Lista współpracowników
- InviteModal.tsx        // Modal zapraszania
- PermissionsTable.tsx   // Tabela uprawnień
- ActivityFeed.tsx       // Feed aktywności
- CommentSystem.tsx      // System komentarzy
```

#### **2. Marketing Tools**
```tsx
// Komponenty do stworzenia:
- CampaignBuilder.tsx    // Kreator kampanii
- SocialMediaPosts.tsx   // Posty social media
- PressKitGenerator.tsx  // Generator press kitów
- InfluencerOutreach.tsx // Outreach do influencerów
- AnalyticsDashboard.tsx // Rozszerzony dashboard
```

---

## 📱 **RESPONSIVE DESIGN GUIDELINES**

### **Breakpoints:**
```css
/* Mobile First Approach */
sm: '640px'   /* Small devices */
md: '768px'   /* Medium devices */
lg: '1024px'  /* Large devices */
xl: '1280px'  /* Extra large devices */
2xl: '1536px' /* 2X Extra large devices */
```

### **Grid System:**
```tsx
// Desktop: 3-4 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

// Cards: Responsive sizing
<div className="col-span-1 md:col-span-2 lg:col-span-1">

// Full width on mobile, half on tablet, third on desktop
<div className="w-full md:w-1/2 lg:w-1/3">
```

### **Mobile Navigation:**
```tsx
// Hamburger menu for mobile
<div className="lg:hidden">
  <button className="mobile-menu-button">
    <svg className="w-6 h-6" /* Hamburger icon */>
  </button>
</div>

// Desktop navigation
<div className="hidden lg:flex lg:items-center lg:space-x-8">
  <NavLink />
</div>
```

---

## 🎯 **USER EXPERIENCE PATTERNS**

### **Loading States:**
```tsx
// Skeleton Loading
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
</div>

// Spinner Loading
<div className="flex justify-center items-center h-64">
  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
</div>
```

### **Error States:**
```tsx
// Error Boundary
<div className="text-center py-12">
  <div className="text-red-500 text-4xl mb-4">⚠️</div>
  <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
  <p className="text-gray-500 mb-4">We're sorry for the inconvenience.</p>
  <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Try Again</button>
</div>
```

### **Empty States:**
```tsx
// No Data State
<div className="text-center py-12">
  <div className="text-gray-400 text-6xl mb-4">📁</div>
  <h3 className="text-lg font-medium text-gray-900 mb-2">No releases yet</h3>
  <p className="text-gray-500 mb-4">Get started by creating your first release.</p>
  <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Add Release</button>
</div>
```

---

## 🛠️ **TECHNICAL IMPLEMENTATION NOTES**

### **State Management Pattern:**
```tsx
// Zustand Store Pattern
interface ModuleStore {
  // Data
  items: Item[];
  currentItem: Item | null;

  // Loading states
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchItems: () => Promise<void>;
  addItem: (item: Partial<Item>) => Promise<void>;
  updateItem: (id: string, updates: Partial<Item>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  setError: (error: string | null) => void;
}
```

### **API Client Pattern:**
```tsx
// API Client Structure
export const apiClient = {
  music: {
    releases: {
      getAll: () => Promise<Release[]>,
      getById: (id: string) => Promise<Release>,
      create: (release: CreateReleaseDto) => Promise<Release>,
      update: (id: string, updates: UpdateReleaseDto) => Promise<Release>,
      delete: (id: string) => Promise<void>
    },
    artists: { /* similar structure */ },
    analytics: { /* similar structure */ }
  },
  publishing: {
    books: { /* similar structure */ },
    chapters: { /* similar structure */ }
  }
};
```

### **Form Validation Pattern:**
```tsx
// Yup Schema Example
const releaseSchema = yup.object({
  title: yup.string().required('Title is required'),
  artist: yup.string().required('Artist is required'),
  releaseDate: yup.date().required('Release date is required'),
  genre: yup.string().required('Genre is required'),
  audioFile: yup.mixed().required('Audio file is required')
});
```

---

## 🎨 **DESIGN PRINCIPLES**

### **1. Consistency First**
- Używaj ustalonej palety kolorów
- Jednolite spacing i typography
- Spójne wzorce interakcji

### **2. Progressive Disclosure**
- Pokaż najważniejsze informacje najpierw
- Używaj rozwijanych sekcji dla detali
- Implementuj poziomy szczegółowości

### **3. Accessibility**
- Kontrast min. 4.5:1 dla tekstu
- Focus states dla wszystkich interaktywnych elementów
- Semantic HTML i ARIA labels
- Keyboard navigation support

### **4. Performance**
- Lazy loading dla obrazów
- Code splitting dla routes
- Optymalizacja bundle size
- Efficient re-renders

---

## 🚀 **NASTĘPNE KROKI IMPLEMENTACJI**

### **Faza 3: Artist Management (Następna do implementacji)**
1. Stwórz store dla artystów (`artistStore.ts`)
2. Implementuj typy dla Artist interface
3. Zbuduj komponenty ArtistCard i ArtistForm
4. Dodaj routing dla `/music/artists`
5. Połącz z backend API

### **Faza 4: Revenue Management**
1. Rozszerz analytics store o revenue data
2. Implementuj SplitSheets management
3. Zbuduj componenty revenue dashboard
4. Dodaj export funkcjonalności

### **Faza 5: Publishing Module**
1. Stwórz publishing store i typy
2. Implementuj Book i Chapter management
3. Zbuduj content editor z Markdown support
4. Dodaj PDF generation

---

## 📋 **CHECKLISTA PRZED WDROŻENIEM**

### **Quality Assurance:**
- [ ] Wszystkie komponenty mają PropTypes/TypeScript
- [ ] Loading i error states są obsłużone
- [ ] Responsive design działa na wszystkich breakpointach
- [ ] Accessibility guidelines są spełnione
- [ ] Performance jest zoptymalizowane
- [ ] Unit testy są napisane
- [ ] Integration testy przechodzą

### **Browser Compatibility:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🎨 **SEKCJA SPECJALNA DLA UI/UX DESIGNERA**

### **🎯 DESIGN BRIEF**

#### **Brand Identity:**
- **Branża:** Muzyka + Publikacje cyfrowe
- **Target:** Artyści, producenci, wydawcy, autorzy
- **Ton:** Profesjonalny, nowoczesny, kreatywny
- **Wartości:** Transparentność, innowacja, prostota

#### **Visual Mood:**
- **Style:** Modern, clean, professional
- **Inspiration:** Spotify, Bandcamp, Medium, Notion
- **Vibes:** Creative workspace meets financial dashboard
- **Aesthetic:** Minimalistic with music-focused accents

### **🎨 VISUAL HIERARCHY & LAYOUT**

#### **Information Architecture:**
```
Header Navigation
├── Logo (HardbanRecords Lab)
├── Main Navigation (Music | Publishing | Analytics | Settings)
├── User Profile & Notifications
└── Search Bar

Main Content Area
├── Page Title + Breadcrumbs
├── Action Buttons (Primary CTAs)
├── Content Cards/Tables
├── Secondary Actions
└── Pagination/Load More

Sidebar (Optional)
├── Quick Actions
├── Recent Items
├── Filters/Settings
└── Help/Support
```

#### **Grid System:**
```
Desktop (1200px+):     12 columns, 24px gutters
Tablet (768-1199px):   8 columns, 20px gutters
Mobile (320-767px):    4 columns, 16px gutters
```

### **🎵 MUSIC-SPECIFIC DESIGN ELEMENTS**

#### **Audio Player Component:**
```css
/* Mini Player (always visible) */
.mini-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: rgba(0,0,0,0.9);
  backdrop-filter: blur(10px);
}

/* Progress Bar */
.progress-bar {
  height: 4px;
  background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 2px;
}
```

#### **Waveform Visualization:**
```css
/* Audio Waveform */
.waveform {
  height: 60px;
  background: linear-gradient(to right,
    rgba(59, 130, 246, 0.3) 0%,
    rgba(59, 130, 246, 0.6) 50%,
    rgba(59, 130, 246, 0.3) 100%);
}
```

#### **Platform Icons & Colors:**
```css
/* Streaming Platform Colors */
.spotify { color: #1DB954; }
.apple-music { color: #FC3C44; }
.youtube-music { color: #FF0000; }
.amazon-music { color: #FF9900; }
.deezer { color: #FEAA2D; }
.tidal { color: #000000; }
```

### **📚 PUBLISHING-SPECIFIC DESIGN ELEMENTS**

#### **Book Cover Component:**
```css
/* Book Cover Aspect Ratio */
.book-cover {
  aspect-ratio: 2/3;  /* Standard book ratio */
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border-radius: 4px;
}

/* Chapter Progress */
.chapter-progress {
  height: 8px;
  background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
  border-radius: 4px;
}
```

#### **Reading Progress Indicators:**
```css
/* Word Count Badge */
.word-count {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.75rem;
}
```

### **📊 DATA VISUALIZATION GUIDELINES**

#### **Chart Color Schemes:**
```css
/* Revenue Charts */
.revenue-positive { color: #22c55e; }
.revenue-negative { color: #ef4444; }
.revenue-neutral { color: #6b7280; }

/* Platform Performance */
.performance-excellent { color: #22c55e; }
.performance-good { color: #84cc16; }
.performance-average { color: #eab308; }
.performance-poor { color: #f97316; }
.performance-bad { color: #ef4444; }
```

#### **KPI Card Design:**
```css
.kpi-card {
  background: linear-gradient(135deg,
    rgba(255,255,255,0.8) 0%,
    rgba(255,255,255,0.95) 100%);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
}
```

### **🎭 INTERACTION PATTERNS**

#### **Hover States:**
```css
/* Card Hover Effect */
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Button Hover */
.btn-primary:hover {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
}
```

#### **Loading Animations:**
```css
/* Pulse Loading */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Skeleton Loading */
.skeleton {
  background: linear-gradient(90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### **📱 MOBILE-FIRST DESIGN CONSIDERATIONS**

#### **Touch Targets:**
```css
/* Minimum touch target: 44px x 44px */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  padding: 12px;
}

/* Thumb-friendly navigation */
.mobile-nav {
  position: fixed;
  bottom: 0;
  height: 60px;
  safe-area-inset-bottom: env(safe-area-inset-bottom);
}
```

#### **Mobile Typography Scale:**
```css
/* Mobile Typography */
@media (max-width: 768px) {
  .mobile-h1 { font-size: 1.75rem; }  /* 28px */
  .mobile-h2 { font-size: 1.5rem; }   /* 24px */
  .mobile-h3 { font-size: 1.25rem; }  /* 20px */
  .mobile-body { font-size: 1rem; }   /* 16px */
  .mobile-small { font-size: 0.875rem; } /* 14px */
}
```

### **🌙 DARK MODE SUPPORT**

#### **Dark Mode Color Palette:**
```css
/* Dark Mode Variables */
:root[data-theme="dark"] {
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --bg-tertiary: #374151;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --text-muted: #9ca3af;
  --border-color: #374151;
}
```

### **♿ ACCESSIBILITY GUIDELINES**

#### **Color Contrast:**
- **Normal Text:** Min. 4.5:1 contrast ratio
- **Large Text:** Min. 3:1 contrast ratio
- **Non-text Elements:** Min. 3:1 contrast ratio

#### **Focus Indicators:**
```css
/* Focus Ring */
.focus-ring:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Skip Links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #3b82f6;
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
```

#### **Screen Reader Support:**
```html
<!-- ARIA Labels -->
<button aria-label="Play track: Summer Vibes by The Wave Riders">
<div role="region" aria-labelledby="analytics-heading">
<input aria-describedby="password-help" type="password">

<!-- Live Regions -->
<div aria-live="polite" aria-atomic="true">
  Status updates appear here
</div>
```

### **🎨 ICONOGRAPHY SYSTEM**

#### **Icon Categories:**
- **Actions:** Play, Pause, Download, Share, Edit, Delete
- **Navigation:** Home, Music, Books, Analytics, Settings
- **Status:** Success, Warning, Error, Info, Loading
- **Media:** Audio, Image, Video, PDF, Document
- **Platforms:** Spotify, Apple, YouTube, Amazon, etc.

#### **Icon Sizing:**
```css
.icon-xs { width: 12px; height: 12px; }  /* Inline with text */
.icon-sm { width: 16px; height: 16px; }  /* Small buttons */
.icon-md { width: 20px; height: 20px; }  /* Default */
.icon-lg { width: 24px; height: 24px; }  /* Large buttons */
.icon-xl { width: 32px; height: 32px; }  /* Headers */
```

### **🎯 USER FLOW CONSIDERATIONS**

#### **Onboarding Flow:**
1. **Welcome Screen** → Brand introduction
2. **Account Type** → Artist/Label/Publisher selection
3. **Profile Setup** → Basic information
4. **First Upload** → Guided tour
5. **Dashboard** → Main application

#### **Core User Journeys:**
- **Music Release:** Upload → Metadata → Distribution → Analytics
- **Book Publishing:** Create → Chapters → Preview → Publish
- **Revenue Tracking:** Overview → Details → Payouts → Reports

### **📐 LAYOUT TEMPLATES**

#### **Dashboard Layout:**
```html
<div class="dashboard-layout">
  <header class="dashboard-header">
    <!-- Navigation + User Menu -->
  </header>

  <aside class="dashboard-sidebar">
    <!-- Quick actions + Filters -->
  </aside>

  <main class="dashboard-main">
    <div class="page-header">
      <!-- Title + Primary CTAs -->
    </div>

    <div class="content-grid">
      <!-- KPI Cards -->
      <!-- Charts -->
      <!-- Data Tables -->
    </div>
  </main>
</div>
```

#### **Form Layout:**
```html
<div class="form-layout">
  <div class="form-header">
    <!-- Progress indicator -->
  </div>

  <div class="form-body">
    <div class="form-section">
      <!-- Grouped fields -->
    </div>
  </div>

  <div class="form-footer">
    <!-- Cancel + Save buttons -->
  </div>
</div>
```

---

*Ten dokument jest kompletnym przewodnikiem UI/UX i powinien być używany jako źródło prawdy dla wszystkich decyzji projektowych.*
