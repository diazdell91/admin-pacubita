# Phase 2: Orders Management 📦

## Status: ⏳ PENDING

### Overview

Build complete order management functionality with CRUD operations, filtering, status tracking, and real-time updates.

## Planned Features

### 📋 Order List & Management

- [ ] **Orders List Page** (`src/app/(dashboard)/orders/page.tsx`)
  - DataTable with order information
  - Real-time status updates
  - Advanced filtering and search
  - Export functionality
- [ ] **Order Filters** (`src/app/(dashboard)/orders/components/OrderFilters.tsx`)
  - Status filter (PENDING, CONFIRMED, DELIVERED, etc.)
  - Service type filter (DELIVERY, WRAPPING)
  - Date range picker
  - Partner/Client/Driver filters
- [ ] **Order Cards** (`src/app/(dashboard)/orders/components/OrderCard.tsx`)
  - Compact order display
  - Status badges with colors
  - Quick actions (view, edit, track)

### 📄 Order Details & CRUD

- [ ] **Order Details Page** (`src/app/(dashboard)/orders/[id]/page.tsx`)
  - Complete order information display
  - Client, driver, partner details
  - Sender and recipient information
  - Payment method details
  - Order items with products
  - Add-ons (home pickup, wrapping)
  - Status timeline
- [ ] **Order Form** (`src/app/(dashboard)/orders/components/OrderForm.tsx`)
  - Multi-step form wizard
  - Client selection/creation
  - Sender/recipient information
  - Product selection (articles/luggage)
  - Add-ons configuration
  - Pricing calculation
  - Payment method selection
- [ ] **Create Order Page** (`src/app/(dashboard)/orders/create/page.tsx`)
  - New order creation workflow
  - Form validation with Zod
  - Real-time price calculation
- [ ] **Edit Order Page** (`src/app/(dashboard)/orders/[id]/edit/page.tsx`)
  - Order modification functionality
  - Status change permissions
  - History tracking

### 📍 Order Tracking

- [ ] **Order Tracking** (`src/app/(dashboard)/orders/components/OrderTracking.tsx`)
  - Visual status timeline
  - Real-time location updates
  - Driver information display
  - ETA calculations
- [ ] **Order Status Management**
  - Status change workflows
  - Automatic notifications
  - Driver assignment
  - Route optimization

### 🏗️ Order Components

- [ ] **OrdersList** (`src/app/(dashboard)/orders/components/OrdersList.tsx`)
  - Paginated table with sorting
  - Bulk actions support
  - Export to CSV/PDF
- [ ] **OrderStatusBadge** (extend existing StatusBadge)
  - Order-specific status styling
  - Interactive status changes
  - Tooltip with details
- [ ] **OrderActions** (`src/app/(dashboard)/orders/components/OrderActions.tsx`)
  - Dropdown menu with actions
  - Status-dependent actions
  - Bulk operations
- [ ] **OrderSearch** (`src/app/(dashboard)/orders/components/OrderSearch.tsx`)
  - Advanced search functionality
  - Search by order code, client, phone
  - Search suggestions

### 🔄 Order Workflows

- [ ] **Order Creation Workflow**
  1. Client information
  2. Pickup/delivery addresses
  3. Product selection
  4. Add-ons configuration
  5. Pricing review
  6. Payment method
  7. Order confirmation
- [ ] **Order Status Updates**
  - PENDING → CONFIRMED → ACCEPTED → PICKED_UP → DROPPED_OFF → SHIPPED → DELIVERED
  - Failed/Cancelled states
  - Driver notifications
  - Client notifications

### 📊 Order Analytics (Basic)

- [ ] **Order Metrics**
  - Daily/weekly/monthly order counts
  - Status distribution
  - Average delivery time
  - Revenue by service type

## GraphQL Integration

- [ ] **Order Queries Implementation**
  - Connect GET_ORDERS query
  - Connect GET_ORDER query
  - Implement real-time subscriptions
- [ ] **Order Mutations Implementation**
  - CREATE_ORDER mutation
  - UPDATE_ORDER mutation
  - DROP_OFF_ORDER mutation
  - Status change mutations

## File Structure (Planned)

```
src/app/(dashboard)/orders/
├── page.tsx ⏳
├── [id]/
│   ├── page.tsx ⏳ (order details)
│   └── edit/page.tsx ⏳
├── create/page.tsx ⏳
└── components/
    ├── OrdersList.tsx ⏳
    ├── OrderCard.tsx ⏳
    ├── OrderForm.tsx ⏳
    ├── OrderStatusBadge.tsx ⏳
    ├── OrderTracking.tsx ⏳
    ├── OrderFilters.tsx ⏳
    ├── OrderSearch.tsx ⏳
    └── OrderActions.tsx ⏳
```

## Dependencies Needed

- [ ] React Hook Form for complex forms
- [ ] Date picker component (shadcn/ui)
- [ ] Multi-select components
- [ ] Map integration (optional)
- [ ] Real-time subscriptions setup

## Acceptance Criteria

- ✅ Orders list loads with pagination and filtering
- ✅ Order details page shows complete information
- ✅ Order creation workflow is intuitive and validated
- ✅ Status updates work correctly with permissions
- ✅ Real-time updates reflect across the app
- ✅ Search and filtering perform well with large datasets
- ✅ Mobile responsive design

## Technical Considerations

- **Performance**: Virtual scrolling for large order lists
- **Real-time**: WebSocket or GraphQL subscriptions
- **Caching**: Apollo Client caching strategy
- **Validation**: Comprehensive form validation
- **Accessibility**: WCAG 2.1 compliance
- **Testing**: Unit tests for critical workflows

---

**Estimated Development Time:** 3-4 days  
**Dependencies:** Phase 1 (Foundation) ✅  
**Next Phase:** Phase 3 (User Management) 👥
