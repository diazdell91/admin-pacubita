# Phase 4: Articles & Pricing 🛍️

## Status: ⏳ PENDING

### Overview
Build product catalog management system with articles, variants, delivery types, and dynamic pricing engine with location-based rules.

## Planned Features

### 📦 Article Management
- [ ] **Articles List Page** (`src/app/(dashboard)/articles/page.tsx`)
  - Product catalog with images
  - Enable/disable toggle
  - Search and filtering
  - Bulk operations
  
- [ ] **Article Details Page** (`src/app/(dashboard)/articles/[id]/page.tsx`)
  - Complete product information
  - Variants management
  - Pricing rules display
  - Image gallery
  - Associated orders
  
- [ ] **Article Form** (`src/app/(dashboard)/articles/components/ArticleForm.tsx`)
  - Product information entry
  - Image upload
  - Description editor
  - Enable/disable status
  
- [ ] **Create Article Page** (`src/app/(dashboard)/articles/create/page.tsx`)
  - New product creation
  - Image upload workflow
  - Form validation
  
- [ ] **Edit Article Page** (`src/app/(dashboard)/articles/[id]/edit/page.tsx`)
  - Product modification
  - Status management
  - Variant management

### 🎯 Article Variants
- [ ] **Variants Management** (`src/app/(dashboard)/articles/[id]/variants/page.tsx`)
  - Article variant list
  - Add/edit/delete variants
  - Enable/disable variants
  - Pricing per variant
  
- [ ] **Variant Manager** (`src/app/(dashboard)/articles/components/VariantManager.tsx`)
  - Interactive variant management
  - Drag and drop reordering
  - Bulk operations
  - Price management

### 🚚 Delivery Types
- [ ] **Delivery Types Page** (`src/app/(dashboard)/articles/delivery-types/page.tsx`)
  - Service types management
  - Icon management
  - Enable/disable status
  
- [ ] **Delivery Type Form**
  - Service type creation/editing
  - Icon selection
  - Description management

### 💰 Pricing System
- [ ] **Pricing Rules Page** (`src/app/(dashboard)/pricing/page.tsx`)
  - Dynamic pricing rules list
  - Filter by location, partner, article
  - Enable/disable rules
  - Bulk operations
  
- [ ] **Pricing Rule Details** (`src/app/(dashboard)/pricing/[id]/page.tsx`)
  - Complete rule information
  - Location coverage
  - Partner assignments
  - Article/variant mapping
  
- [ ] **Create Pricing Rule** (`src/app/(dashboard)/pricing/create/page.tsx`)
  - New pricing rule creation
  - Location selection
  - Partner assignment
  - Article/variant selection
  
- [ ] **Price Calculator** (`src/app/(dashboard)/pricing/calculator/page.tsx`)
  - Interactive pricing calculator
  - Location-based pricing
  - Real-time calculations
  - Export pricing tables

### 🏗️ Article Components
- [ ] **ArticlesList** (`src/app/(dashboard)/articles/components/ArticlesList.tsx`)
  - Grid/list view toggle
  - Image thumbnails
  - Status indicators
  - Quick actions
  
- [ ] **ArticleCard** (`src/app/(dashboard)/articles/components/ArticleCard.tsx`)
  - Product card display
  - Image preview
  - Key information
  - Action buttons
  
- [ ] **ArticleFilters** (`src/app/(dashboard)/articles/components/ArticleFilters.tsx`)
  - Filter by status
  - Filter by delivery type
  - Search by name/description
  - Sort options
  
- [ ] **ImageUpload** (`src/app/(dashboard)/articles/components/ImageUpload.tsx`)
  - Drag and drop image upload
  - Image preview
  - Crop functionality
  - Multiple image support

### 💡 Pricing Components  
- [ ] **PricingRulesList** (`src/app/(dashboard)/pricing/components/PricingRulesList.tsx`)
  - Hierarchical pricing display
  - Location-based grouping
  - Status indicators
  - Quick edit actions
  
- [ ] **PricingForm** (`src/app/(dashboard)/pricing/components/PricingForm.tsx`)
  - Multi-step pricing rule creation
  - Location selector
  - Partner selection
  - Article/variant picker
  
- [ ] **PriceCalculator** (`src/app/(dashboard)/pricing/components/PriceCalculator.tsx`)
  - Dynamic price calculation
  - Location selection
  - Article selection
  - Add-ons calculation
  
- [ ] **LocationPricing** (`src/app/(dashboard)/pricing/components/LocationPricing.tsx`)
  - Location-based pricing matrix
  - Distance calculations
  - Zone management

### 🔄 Article Workflows
- [ ] **Article Creation Workflow**
  1. Basic information entry
  2. Image upload and cropping
  3. Variant creation
  4. Pricing rule assignment
  5. Delivery type selection
  6. Review and activation
  
- [ ] **Pricing Rule Creation**
  1. Rule type selection (Article/Package)
  2. Location selection
  3. Partner assignment
  4. Product selection
  5. Price configuration
  6. Validation and activation

### 📊 Article Analytics (Basic)
- [ ] **Article Metrics**
  - Most ordered articles
  - Revenue by article
  - Regional popularity
  - Pricing efficiency

## Dynamic Pricing Engine
- [ ] **Location-Based Pricing**
  - Province/municipality/neighborhood rates
  - Distance-based calculations
  - Zone management
  
- [ ] **Partner-Specific Pricing**
  - Custom partner rates
  - Volume discounts
  - Commission structures
  
- [ ] **Article-Specific Rules**
  - Per-article pricing
  - Variant-specific rates
  - Delivery type adjustments

## GraphQL Integration
- [ ] **Article Queries Implementation**
  - GET_ARTICLES with variants
  - GET_ARTICLE with details
  - GET_DELIVERY_TYPES
  
- [ ] **Article Mutations Implementation**
  - CREATE_ARTICLE mutation
  - UPDATE_ARTICLE mutation
  - CREATE_ARTICLE_VARIANT mutation
  - UPDATE_ARTICLE_VARIANT mutation
  - Delivery type mutations
  
- [ ] **Pricing Queries Implementation**
  - GET_PRICING_RULES with filters
  - GET_PRICING_RULE details
  
- [ ] **Pricing Mutations Implementation**
  - CREATE_ARTICLE_PRICING_RULE
  - UPDATE_ARTICLE_PRICING_RULE

## File Structure (Planned)
```
src/app/(dashboard)/
├── articles/
│   ├── page.tsx ⏳ (articles list)
│   ├── [id]/
│   │   ├── page.tsx ⏳ (article details)
│   │   ├── edit/page.tsx ⏳
│   │   └── variants/page.tsx ⏳
│   ├── create/page.tsx ⏳
│   ├── delivery-types/page.tsx ⏳
│   └── components/
│       ├── ArticlesList.tsx ⏳
│       ├── ArticleCard.tsx ⏳
│       ├── ArticleForm.tsx ⏳
│       ├── VariantManager.tsx ⏳
│       ├── ArticleFilters.tsx ⏳
│       └── ImageUpload.tsx ⏳
└── pricing/
    ├── page.tsx ⏳ (pricing rules)
    ├── [id]/page.tsx ⏳
    ├── create/page.tsx ⏳
    ├── calculator/page.tsx ⏳
    └── components/
        ├── PricingRulesList.tsx ⏳
        ├── PricingForm.tsx ⏳
        ├── PriceCalculator.tsx ⏳
        └── LocationPricing.tsx ⏳
```

## Dependencies Needed
- [ ] Image upload and processing library
- [ ] Rich text editor for descriptions
- [ ] Drag and drop components
- [ ] Multi-select components
- [ ] Image cropping tool
- [ ] Currency formatting utilities

## Acceptance Criteria
- ✅ Articles display with proper images and information
- ✅ Variant management works intuitively
- ✅ Pricing rules calculate correctly
- ✅ Location-based pricing works accurately  
- ✅ Image upload and processing functions properly
- ✅ Search and filtering perform well
- ✅ Price calculator shows real-time results
- ✅ Bulk operations complete successfully

## Technical Considerations
- **Performance**: Image optimization and lazy loading
- **Storage**: Efficient image storage and CDN
- **Validation**: Complex pricing rule validation
- **Real-time**: Price calculation performance
- **Accessibility**: Image alt text and screen reader support
- **Testing**: Pricing calculation accuracy tests

---

**Estimated Development Time:** 5-6 days  
**Dependencies:** Phase 1 (Foundation) ✅, Phase 3 (Users) ⏳  
**Next Phase:** Phase 5 (Locations & Geographic Management) 🗺️