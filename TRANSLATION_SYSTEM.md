# Frontend Translation System - Opsi 1 (Frontend Only)

## 📋 Overview

Sistem ini menggunakan **MyMemory Translation API** untuk translate data dinamis dari database ke bahasa yang dipilih user, sementara text statis tetap menggunakan **i18n**.

### Arsitektur:

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React/Next.js)               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Static Content (i18n)     Dynamic Content (from DB)        │
│  ├─ Navigation            ├─ Product name/description      │
│  ├─ Labels                ├─ Article content                │
│  ├─ Buttons               ├─ User input                     │
│  └─ Messages              └─ Custom data                    │
│         │                        │                          │
│         ├────────────┬───────────┤                          │
│                      │                                       │
│                  Language Selector                          │
│                      │                                       │
│         ┌────────────┴───────────┐                          │
│         │                        │                          │
│      i18n.ts              useTranslatedData()               │
│    (Static trans)        (Google Translate)                 │
│                                 │                          │
│                        MyMemory API / Cache                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘

NO Backend Changes! ✅
```

## 🚀 Implementasi

### 1. **Files yang dibuat:**

- **[app/lib/google-translate-api.ts](../lib/google-translate-api.ts)** - Utility untuk translate
- **[app/hooks/useTranslatedData.ts](../hooks/useTranslatedData.ts)** - React hook untuk data dinamis

### 2. **Cara Penggunaan:**

#### Di Component:
```tsx
import { useTranslatedData } from '@/app/hooks/useTranslatedData';
import { useLanguage } from '@/app/providers/LanguageProvider';

export default function MyComponent() {
  const { language } = useLanguage();
  const [data, setData] = useState(null);
  
  // Translate data dinamis, hanya field tertentu
  const { translated, isLoading, error } = useTranslatedData(
    data, 
    language,
    ['name', 'description', 'keywords'] // Fields to translate
  );
  
  return (
    <div>
      {isLoading && <p>Translating...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <h1>{translated?.name}</h1>
      <p>{translated?.description}</p>
    </div>
  );
}
```

### 3. **Fitur Utama:**

✅ **Automatic Caching** - Tidak perlu translate ulang
✅ **No Backend Changes** - Pure frontend solution
✅ **Rate Limit Safe** - Ada delay built-in (100ms)
✅ **Smart Field Selection** - Hanya translate field yang perlu
✅ **Fallback Handling** - Jika error, gunakan original text
✅ **Language-aware** - Skip translate jika language = 'en'
✅ **CORS Safe** - Menggunakan MyMemory API yang support CORS

## 📊 Performance

| Metric | Value | Catatan |
|--------|-------|---------|
| First Load | ~2-5s | Tergantung network & data size |
| Cached Load | <100ms | Dari cache |
| Translation Delay | 100ms/field | Built-in rate limit |
| Cache Size | Unlimited | Per session (cleared on refresh) |

## 🔍 Debugging

### Cek cache size:
```typescript
import { getCacheSize, clearTranslationCache } from '@/app/lib/google-translate-api';

console.log('Cache entries:', getCacheSize());
clearTranslationCache(); // Clear jika perlu
```

### Console logs:
```
[PROD] Translation error: ... (error message)
[PROD] Translation API rate limited or error
[PROD] Translating...
```

## ⚙️ Konfigurasi

### API Configuration:

**File:** [app/lib/google-translate-api.ts](../lib/google-translate-api.ts)

```typescript
const LANGUAGE_MAP: Record<string, string> = {
  'en': 'en',    // English → en
  'id': 'id',    // Indonesian → id
  // Tambahkan bahasa baru di sini
};
```

Untuk menambah bahasa baru (contoh: Mandarin):
```typescript
const LANGUAGE_MAP: Record<string, string> = {
  'en': 'en',
  'id': 'id',
  'zh': 'zh',    // Tambah Mandarin
};
```

### API Endpoint:

```
https://api.mymemory.translated.net/get
Parameters:
  - q: text to translate
  - langpair: source|target (e.g., en|id)
```

## 🐛 Troubleshooting

### Problem: Text tidak tertranslate
**Solusi:**
1. Buka DevTools → Console → lihat error message
2. Cek apakah field berada di `fieldsToTranslate` array
3. Cek apakah language = 'en' (tidak perlu translate)
4. Cek network → apakah MyMemory API request berhasil

### Problem: Translation lambat
**Solusi:**
- Transparansi ke user: `{isLoading && <p>Translating...</p>}`
- Tambah loading skeleton:
```tsx
if (isLoading) return <Skeleton active />;
```

### Problem: Cache penuh
**Solusi:**
- Cache per-session, otomatis clear on page refresh
- Jika perlu, panggil `clearTranslationCache()` programmatically

## 📚 Referensi

- **MyMemory API**: https://mymemory.translated.net/doc/spec.php
- **Hook Documentation**: React Hooks best practices
- **i18n System**: Static translations di `i18n/locales/`

## ✨ Keunggulan Approach Ini:

1. ✅ **Tidak perlu ubah backend** (sesuai requirement)
2. ✅ **Instant deployment** - no backend rebuild needed
3. ✅ **Scalable** - client-side translation
4. ✅ **Cache efficient** - reduce API calls
5. ✅ **User-friendly** - fallback jika ada error
6. ✅ **Type-safe** - full TypeScript support

## 🔄 Masa Depan (Optional Upgrades)

Jika perlu upgrade lebih lanjut:
1. Tambah backend endpoint untuk translate (higher quality)
2. Store translated data di database (persistent cache)
3. Integrate Google Cloud Translation API (if budget allows)
4. Auto-detect language (if needed)
