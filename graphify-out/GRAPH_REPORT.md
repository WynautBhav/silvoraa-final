# Graph Report - .  (2026-05-02)

## Corpus Check
- Large corpus: 1067 files · ~8,623,221 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 528 nodes · 467 edges · 34 communities detected
- Extraction: 92% EXTRACTED · 7% INFERRED · 1% AMBIGUOUS · INFERRED: 35 edges (avg confidence: 0.83)
- Token cost: 9,800 input · 3,200 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Appwrite Backend Config|Appwrite Backend Config]]
- [[_COMMUNITY_Analytics Hooks|Analytics Hooks]]
- [[_COMMUNITY_App Entry and Fonts|App Entry and Fonts]]
- [[_COMMUNITY_Supabase Query Builder|Supabase Query Builder]]
- [[_COMMUNITY_Admin Products Page|Admin Products Page]]
- [[_COMMUNITY_Visual Hero Editor|Visual Hero Editor]]
- [[_COMMUNITY_Account Page|Account Page]]
- [[_COMMUNITY_Auth and Cart Contexts|Auth and Cart Contexts]]
- [[_COMMUNITY_Product Editor Admin|Product Editor Admin]]
- [[_COMMUNITY_Product Service|Product Service]]
- [[_COMMUNITY_Appwrite Auth Client|Appwrite Auth Client]]
- [[_COMMUNITY_Banner Hero Config|Banner Hero Config]]
- [[_COMMUNITY_Iolite Gemstone|Iolite Gemstone]]
- [[_COMMUNITY_Product Data Generator|Product Data Generator]]
- [[_COMMUNITY_Amethyst Gemstone|Amethyst Gemstone]]
- [[_COMMUNITY_Citrine Gemstone|Citrine Gemstone]]
- [[_COMMUNITY_Tourmaline Gemstone|Tourmaline Gemstone]]
- [[_COMMUNITY_Order Service|Order Service]]
- [[_COMMUNITY_AI Search and Stylist Service|AI Search and Stylist Service]]
- [[_COMMUNITY_Media Manager Admin|Media Manager Admin]]
- [[_COMMUNITY_Cubic Zirconia Gemstone|Cubic Zirconia Gemstone]]
- [[_COMMUNITY_Garnet Gemstone|Garnet Gemstone]]
- [[_COMMUNITY_Lapis Lazuli Gemstone|Lapis Lazuli Gemstone]]
- [[_COMMUNITY_Topaz Gemstone|Topaz Gemstone]]
- [[_COMMUNITY_Config Provider and Footer|Config Provider and Footer]]
- [[_COMMUNITY_Smart Search Component|Smart Search Component]]
- [[_COMMUNITY_Admin Site Editor|Admin Site Editor]]
- [[_COMMUNITY_Admin Dashboard|Admin Dashboard]]
- [[_COMMUNITY_Gemini AI Service|Gemini AI Service]]
- [[_COMMUNITY_Admin Image Upload|Admin Image Upload]]
- [[_COMMUNITY_Product Description|Product Description]]
- [[_COMMUNITY_Silvoraa Stylist Component|Silvoraa Stylist Component]]
- [[_COMMUNITY_Pre-render Script|Pre-render Script]]
- [[_COMMUNITY_Supabase Data Enrichment|Supabase Data Enrichment]]

## God Nodes (most connected - your core abstractions)
1. `SupabaseQueryBuilder` - 19 edges
2. `Silvoraa E-commerce Platform` - 14 edges
3. `isGAEnabled()` - 9 edges
4. `Appwrite Project Configuration` - 9 edges
5. `Iolite Gemstone` - 8 edges
6. `Products Collection` - 7 edges
7. `enrichProduct()` - 6 edges
8. `lib/appwrite.ts Frontend Integration` - 6 edges
9. `ES Module Import Map` - 6 edges
10. `VisualHeroEditor Component` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Razorpay Payments` --semantically_similar_to--> `Razorpay Integration Setup`  [INFERRED] [semantically similar]
  README.md → supabase/SETUP.md
- `Appwrite Project Configuration` --semantically_similar_to--> `Supabase Project Setup`  [AMBIGUOUS] [semantically similar]
  BACKEND_STRUCTURE.md → supabase/SETUP.md
- `Supabase Database (Scripts Context)` --semantically_similar_to--> `Supabase Project Setup`  [AMBIGUOUS] [semantically similar]
  scripts/README.md → supabase/SETUP.md
- `LovedBy Admin Panel` --conceptually_related_to--> `Silvoraa E-commerce Platform`  [AMBIGUOUS]
  scripts/python_legacy/admin-freeform-banner.md → README.md
- `Google OAuth Authentication` --semantically_similar_to--> `Google OAuth via Supabase`  [INFERRED] [semantically similar]
  BACKEND_STRUCTURE.md → supabase/SETUP.md

## Hyperedges (group relationships)
- **Product Data Sync Pipeline: Supabase â†’ JSON â†’ constants.ts â†’ Product UI** — scripts_readme_supabase_db, scripts_readme_fetch_supabase, scripts_readme_constants_ts, scripts_readme_product_data_generator, scripts_readme_product_ui [EXTRACTED 0.95]
- **Visual Hero Editor System: ConfigProvider + VisualHeroEditor + HeroSection** — banner_config_provider, banner_visual_hero_editor, banner_hero_section, banner_hero_config_schema [EXTRACTED 0.90]
- **Appwrite Backend: Project + Four Collections + Image Bucket** — backend_appwrite_project, backend_products_collection, backend_orders_collection, backend_profiles_collection, backend_images_bucket [EXTRACTED 0.95]

## Communities

### Community 0 - "Appwrite Backend Config"
Cohesion: 0.09
Nodes (29): Appwrite Project Configuration, constants.ts Local Fallback Data, Dynamically Generated Product Fields, Google OAuth Authentication, Images Storage Bucket, lib/appwrite.ts Frontend Integration, Orders Collection, Products Collection (+21 more)

### Community 1 - "Analytics Hooks"
Cohesion: 0.13
Nodes (19): captureCartAdd(), captureCartRemove(), captureIdentify(), isGAEnabled(), trackAddToCart(), trackBeginCheckout(), trackLogin(), trackPageView() (+11 more)

### Community 2 - "App Entry and Fonts"
Cohesion: 0.13
Nodes (20): Cormorant Garamond Font, index.html Application Entry Point, ES Module Import Map, lucide-react Icon Library, Manrope Font, react-router-dom v7, Silvoraa Brand Theme (Tailwind Config), AI Stylist Feature (+12 more)

### Community 3 - "Supabase Query Builder"
Cohesion: 0.13
Nodes (1): SupabaseQueryBuilder

### Community 4 - "Admin Products Page"
Cohesion: 0.13
Nodes (6): fetchProducts(), handleExport(), handleSaveBulkEdits(), handleDownloadTemplate(), exportProductsToCsv(), generateCsvTemplate()

### Community 5 - "Visual Hero Editor"
Cohesion: 0.18
Nodes (7): addLayer(), clamp(), handleCanvasPointerMove(), handleLayerPointerMove(), persistLayers(), removeLayer(), updateLayer()

### Community 6 - "Account Page"
Cohesion: 0.21
Nodes (7): handleAddressUpdate(), handleNameSave(), addToWishlist(), isInWishlist(), removeFromWishlist(), toggleWishlist(), updateProfile()

### Community 7 - "Auth and Cart Contexts"
Cohesion: 0.17
Nodes (6): AdminRoute(), useAuth(), CartProvider(), useCart(), AdminConsole(), ProductDetail()

### Community 8 - "Product Editor Admin"
Cohesion: 0.18
Nodes (2): extractContentFromHtml(), handleSmartFill()

### Community 9 - "Product Service"
Cohesion: 0.2
Nodes (3): getProducts(), getProductTypes(), getStoneTypes()

### Community 10 - "Appwrite Auth Client"
Cohesion: 0.22
Nodes (4): createClient(), signInWithEmail(), signUpWithEmail(), seedProducts()

### Community 11 - "Banner Hero Config"
Cohesion: 0.31
Nodes (9): ConfigProvider Component, Hero Slide Config Schema, HeroSection Component, ImageUploadButton Component, LovedBy Admin Panel, lovedby-hero-images Storage Bucket, ResizeHandle Component, SliderControl Component (+1 more)

### Community 12 - "Iolite Gemstone"
Cohesion: 0.25
Nodes (9): Transparent to Semi-Transparent Clarity, Violet-Purple Color, Faceted Cut, Iolite Gemstone, Soft Diffused Lighting, Multiple Stones Collection Display, White Fabric Surface Presentation, Oval and Elongated Shape (+1 more)

### Community 13 - "Product Data Generator"
Cohesion: 0.46
Nodes (7): decodeHtmlEntities(), enrichProduct(), extractDescriptionText(), generateCareGuide(), generateProductSpecifications(), generateStoneBenefits(), getStylistNote()

### Community 14 - "Amethyst Gemstone"
Cohesion: 0.25
Nodes (8): Cream White Fabric Background, Amethyst Gemstone, Soft Natural Lighting, Lifestyle Product Photography, Purple Lavender Color, Quartz Mineral Family, Semi-Translucent Clarity, Tumbled Stone

### Community 15 - "Citrine Gemstone"
Cohesion: 0.25
Nodes (8): White Linen Background, Strong Brilliance and Light Interaction, Semi-Precious Gemstone Category, High Transparency and Clarity, Golden Yellow to Orange-Amber Color, Oval Brilliant Faceted Cut, Citrine Gemstone, Professional Product Photography

### Community 16 - "Tourmaline Gemstone"
Cohesion: 0.29
Nodes (8): Editorial Flat-Lay Photography Style, Tourmaline Gemstone, Multicolor Pink Green Yellow-Green, Elongated Prismatic Crystal Shape, Rough Natural Crystal Form, Translucent with Internal Reflections, Watermelon Tourmaline Variety, White Cream Fabric Background

### Community 18 - "Order Service"
Cohesion: 0.33
Nodes (2): cancelOrder(), getOrderById()

### Community 19 - "AI Search and Stylist Service"
Cohesion: 0.57
Nodes (6): analyzeQuery(), buildContextFromHistory(), consultOracle(), findMatchingProducts(), generateStylistResponse(), regexIsNegated()

### Community 20 - "Media Manager Admin"
Cohesion: 0.38
Nodes (4): fetchFiles(), handleUpload(), generateFilename(), processImage()

### Community 21 - "Cubic Zirconia Gemstone"
Cohesion: 0.29
Nodes (7): Colorless White Stone, Cubic Zirconia Gemstone, High Brilliance and Clarity, Oval Faceted Cut, Soft Pink Fabric Background, Clean Product Photography, Synthetic Gemstone

### Community 22 - "Garnet Gemstone"
Cohesion: 0.29
Nodes (7): Beige Textured Fabric Background, Deep Red Color, Warm Dramatic Lighting, Oval Cushion Faceted Cut, Garnet Gemstone, Professional Product Photography, Translucent with Internal Brilliance

### Community 23 - "Lapis Lazuli Gemstone"
Cohesion: 0.29
Nodes (7): Deep Royal Blue Color, Lapis Lazuli Gemstone, Light Linen Fabric Background, Opaque Surface Clarity, Clean Product Photography, Golden Pyrite Inclusions, Tumbled Oval Rounded Shape

### Community 24 - "Topaz Gemstone"
Cohesion: 0.29
Nodes (7): Eye-Clean High Clarity, Blue Topaz Gemstone, Oval Elliptical Faceted Cut, Soft Pink-Toned Ambient Lighting, Professional Product Photography, Sky Blue Color, Strong Brilliance and Light Refraction

### Community 26 - "Config Provider and Footer"
Cohesion: 0.5
Nodes (3): useConfig(), useSiteConfig(), Footer()

### Community 27 - "Smart Search Component"
Cohesion: 0.8
Nodes (4): handleKeyDown(), handleResultClick(), handleViewAll(), saveRecentSearch()

### Community 31 - "Admin Site Editor"
Cohesion: 0.5
Nodes (2): handleImageSelect(), handleSave()

### Community 36 - "Admin Dashboard"
Cohesion: 0.67
Nodes (2): fetchDashboardData(), getLast7Days()

### Community 38 - "Gemini AI Service"
Cohesion: 0.67
Nodes (2): generateSmartImage(), getClient()

### Community 39 - "Admin Image Upload"
Cohesion: 1.0
Nodes (2): getFileExtension(), handleFile()

### Community 40 - "Product Description"
Cohesion: 1.0
Nodes (2): decodeHtmlEntities(), parseProductHtml()

### Community 41 - "Silvoraa Stylist Component"
Cohesion: 1.0
Nodes (2): djb2(), generateSmartAdvice()

### Community 47 - "Pre-render Script"
Cohesion: 1.0
Nodes (2): injectMeta(), main()

### Community 93 - "Supabase Data Enrichment"
Cohesion: 1.0
Nodes (1): # NOTE: This script will be updated to use the productDataGenerator.ts enrichPro

## Ambiguous Edges - Review These
- `Silvoraa E-commerce Platform` → `LovedBy Admin Panel`  [AMBIGUOUS]
  scripts/python_legacy/admin-freeform-banner.md · relation: conceptually_related_to
- `Appwrite Project Configuration` → `Supabase Project Setup`  [AMBIGUOUS]
  BACKEND_STRUCTURE.md · relation: semantically_similar_to
- `Supabase Database (Scripts Context)` → `Supabase Project Setup`  [AMBIGUOUS]
  scripts/README.md · relation: semantically_similar_to

## Knowledge Gaps
- **65 isolated node(s):** `# NOTE: This script will be updated to use the productDataGenerator.ts enrichPro`, `TypeScript`, `Vite`, `Framer Motion`, `Vitest Testing Framework` (+60 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Supabase Query Builder`** (19 nodes): `SupabaseQueryBuilder`, `.cleanData()`, `.constructor()`, `.delete()`, `.eq()`, `.execute()`, `.gte()`, `.in()`, `.insert()`, `.limit()`, `.lte()`, `.neq()`, `.or()`, `.order()`, `.select()`, `.single()`, `.then()`, `.update()`, `.upsert()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Product Editor Admin`** (12 nodes): `extractContentFromHtml()`, `fetchAllProducts()`, `fetchProduct()`, `getImageUrl()`, `handleChange()`, `handleDelete()`, `handleImageUpload()`, `handleRemoveImage()`, `handleSetPrimary()`, `handleSmartFill()`, `handleSubmit()`, `ProductEditorPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Order Service`** (7 nodes): `cancelOrder()`, `createOrder()`, `getOrderById()`, `getOrderStats()`, `getUserOrders()`, `orderService.ts`, `updateOrderStatus()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Admin Site Editor`** (5 nodes): `handleImageSelect()`, `handleSave()`, `isVisualHeroManagedKey()`, `openMediaManager()`, `SiteEditorPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Admin Dashboard`** (4 nodes): `fetchDashboardData()`, `formatCurrency()`, `getLast7Days()`, `DashboardPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Gemini AI Service`** (4 nodes): `generateSmartImage()`, `getClient()`, `getGeminiStylingAdvice()`, `geminiService.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Admin Image Upload`** (3 nodes): `getFileExtension()`, `handleFile()`, `ImageUploadButton.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Product Description`** (3 nodes): `ProductDescription.tsx`, `decodeHtmlEntities()`, `parseProductHtml()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Silvoraa Stylist Component`** (3 nodes): `SilvoraaStylist.tsx`, `djb2()`, `generateSmartAdvice()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Pre-render Script`** (3 nodes): `injectMeta()`, `main()`, `prerender.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Supabase Data Enrichment`** (2 nodes): `enrich-supabase.py`, `# NOTE: This script will be updated to use the productDataGenerator.ts enrichPro`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Silvoraa E-commerce Platform` and `LovedBy Admin Panel`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Appwrite Project Configuration` and `Supabase Project Setup`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **What is the exact relationship between `Supabase Database (Scripts Context)` and `Supabase Project Setup`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **Why does `Silvoraa E-commerce Platform` connect `App Entry and Fonts` to `Banner Hero Config`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Why does `Appwrite Project Configuration` connect `Appwrite Backend Config` to `App Entry and Fonts`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Why does `Appwrite Backend` connect `App Entry and Fonts` to `Appwrite Backend Config`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **What connects `# NOTE: This script will be updated to use the productDataGenerator.ts enrichPro`, `TypeScript`, `Vite` to the rest of the system?**
  _65 weakly-connected nodes found - possible documentation gaps or missing edges._