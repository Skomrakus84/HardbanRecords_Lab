# 🎨 UI Design Blueprint - HardbanRecords Lab (Compact)

## 🎯 **PROJECT OVERVIEW**
**HardbanRecords Lab** - All-in-one platform combining music distribution with digital publishing.

**Tech Stack:** React 18 + TypeScript + Vite + Tailwind CSS + Zustand + Express.js + Supabase

---

## 🎨 **DESIGN SYSTEM**

### **Color Palette:**
```css
/* Primary */
--blue-500: #3b82f6;  /* Main brand */
--blue-600: #2563eb;  /* Hover */

/* Status */
--green-500: #22c55e;  /* Success */
--red-500: #ef4444;    /* Error */
--yellow-500: #eab308; /* Warning */

/* Grays */
--gray-50: #f9fafb;   /* Background */
--gray-900: #111827;  /* Text */
--gray-500: #6b7280;  /* Muted */
```

### **Typography:**
```css
.text-4xl { font-size: 2.25rem; }  /* H1 */
.text-2xl { font-size: 1.5rem; }   /* H2 */
.text-lg { font-size: 1.125rem; }  /* H3 */
.text-base { font-size: 1rem; }    /* Body */
.text-sm { font-size: 0.875rem; }  /* Small */
```

### **Component Standards:**

**Buttons:**
```tsx
// Primary
<button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">

// Secondary
<button className="bg-white hover:bg-gray-50 text-gray-900 py-2 px-4 border border-gray-300 rounded-md">
```

**Cards:**
```tsx
<div className="bg-white shadow rounded-lg p-6">
  <div className="flex items-center">
    <div className="flex-shrink-0">
      <Icon className="h-8 w-8 text-gray-400" />
    </div>
    <div className="ml-5 w-0 flex-1">
      <dt className="text-sm font-medium text-gray-500">Label</dt>
      <dd className="text-lg font-medium text-gray-900">Value</dd>
    </div>
  </div>
</div>
```

---

## 📱 **RESPONSIVE DESIGN**

### **Breakpoints:**
```css
sm: '640px'   /* Small */
md: '768px'   /* Medium */
lg: '1024px'  /* Large */
xl: '1280px'  /* Extra large */
```

### **Grid System:**
```tsx
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Responsive sizing
<div className="w-full md:w-1/2 lg:w-1/3">
```

---

## 🧩 **KEY COMPONENTS**

### **Current Implementation Status:**
- ✅ **Release Management** (Complete)
- ✅ **Analytics Dashboard** (Complete)
- 🚧 **Artist Management** (85% Complete)
- ⏳ **Revenue Management** (Planned)
- ⏳ **Publishing Module** (Planned)

### **Artist Management Components:**
```tsx
// Core interfaces
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
    youtube?: string;
  };
  contracts: Contract[];
  totalStreams: number;
  totalRevenue: number;
  status: 'active' | 'inactive' | 'pending';
}

interface Contract {
  id: string;
  title: string;
  type: 'recording' | 'publishing' | 'management';
  startDate: string;
  endDate: string;
  revenueShare: number;
  status: 'active' | 'expired' | 'pending';
}
```

### **Component Structure:**
- `ArtistCard.tsx` - Individual artist display
- `ArtistForm.tsx` - Add/edit artist modal
- `ArtistsList.tsx` - Grid view with filtering
- `ArtistProfile.tsx` - Detailed artist view
- `ContractModal.tsx` - Contract management
- `ArtistManagement.tsx` - Main container

---

## 🎭 **UX PATTERNS**

### **Loading States:**
```tsx
// Skeleton
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
</div>

// Spinner
<div className="flex justify-center items-center h-64">
  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
</div>
```

### **Empty States:**
```tsx
<div className="text-center py-12">
  <div className="text-gray-400 text-6xl mb-4">🎵</div>
  <h3 className="text-lg font-medium text-gray-900 mb-2">No artists yet</h3>
  <p className="text-gray-500 mb-4">Get started by adding your first artist.</p>
  <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Add Artist</button>
</div>
```

---

## 🎵 **MUSIC-SPECIFIC ELEMENTS**

### **Platform Colors:**
```css
.spotify { color: #1DB954; }
.apple-music { color: #FC3C44; }
.youtube { color: #FF0000; }
.amazon { color: #FF9900; }
```

### **Audio Player:**
```css
.mini-player {
  position: fixed;
  bottom: 0;
  height: 80px;
  background: rgba(0,0,0,0.9);
  backdrop-filter: blur(10px);
}
```

---

## 🛠️ **TECHNICAL PATTERNS**

### **Zustand Store:**
```tsx
interface Store {
  items: Item[];
  isLoading: boolean;
  error: string | null;

  fetchItems: () => Promise<void>;
  addItem: (item: Partial<Item>) => Promise<void>;
  updateItem: (id: string, updates: Partial<Item>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}
```

### **API Client:**
```tsx
export const musicApi = {
  artists: {
    getAll: () => fetch('/api/music/artists').then(r => r.json()),
    create: (data) => fetch('/api/music/artists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  }
};
```

---

## ♿ **ACCESSIBILITY**

### **Requirements:**
- **Contrast:** Min. 4.5:1 for text
- **Focus:** Visible focus indicators
- **Keyboard:** Full keyboard navigation
- **ARIA:** Proper labels and roles

```css
.focus-ring:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

---

## 📐 **LAYOUT TEMPLATES**

### **Dashboard:**
```html
<div className="min-h-screen bg-gray-50">
  <header className="bg-white shadow">
    <!-- Navigation -->
  </header>

  <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div className="px-4 py-6 sm:px-0">
      <!-- Content -->
    </div>
  </main>
</div>
```

### **Mobile Navigation:**
```tsx
<div className="lg:hidden">
  <button className="mobile-menu-button p-2">
    <svg className="w-6 h-6">/* Hamburger */</svg>
  </button>
</div>
```

---

## 🚀 **IMPLEMENTATION PRIORITY**

### **Phase 3: Artist Management** (Current)
1. Complete contract management
2. Add social media integrations
3. Implement revenue tracking
4. Add search and filtering

### **Phase 4: Revenue Management** (Next)
1. Revenue dashboard
2. Split sheets management
3. Payout history
4. Tax reporting

### **Phase 5: Publishing Module**
1. Book management system
2. Chapter editor
3. Cover designer
4. Distribution channels

---

**This condensed blueprint provides the essential UI/UX guidelines for efficient development while maintaining design consistency.**
