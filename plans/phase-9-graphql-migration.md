# Phase 9: GraphQL Hooks Migration 🔧

**Priority:** Medium  
**Complexity:** Medium  
**Duration:** 2-3 days  
**Dependencies:** Phase 1 (Foundation)

## 📋 Overview

Migrate from manual `useQuery`, `useMutation`, and `useSubscription` hooks to fully typed, code-generated hooks from GraphQL Code Generator. This migration will improve type safety, developer experience, and reduce boilerplate code across the application.

## 🎯 Objectives

- **Type Safety**: Eliminate manual type definitions for GraphQL operations
- **Developer Experience**: Leverage auto-complete and IntelliSense for all GraphQL operations  
- **Code Consistency**: Standardize GraphQL usage patterns across the application
- **Performance**: Reduce bundle size by removing manual GraphQL operation definitions
- **Maintainability**: Automatically sync with backend schema changes

## 🔧 Current State Analysis

### Existing Setup ✅
- GraphQL Code Generator configured (`src/lib/graphql/codegen.ts`)
- Generated hooks enabled with `withHooks: true`
- All queries and mutations defined in `.graphql` files
- Generated types available in `src/lib/graphql/generated.ts`

### ⚠️ Backend Readiness Status
**Current Status**: Backend GraphQL endpoints are NOT ready for production use

**What's Been Done**:
- ✅ All GraphQL imports have been commented out with TODO markers
- ✅ Mock data system implemented in `src/lib/mock-data.ts`
- ✅ All components now use mock data to prevent build failures
- ✅ Comprehensive TODO comments added for easy restoration

**Files Using Mock Data** (31+ files):
- All user management pages (`/dashboard/users/*`)
- All article management pages (`/dashboard/articles/*`)
- All location management pages (`/dashboard/locations/*`)
- All order pages (`/dashboard/orders/*`)
- All pricing pages (`/dashboard/pricing/*`)

**Mock Data Available**:
- Users, Articles, Orders, Locations, Partners, Pricing Rules
- Delivery Types, Countries, States, Cities, Municipalities, Neighborhoods

### Current Usage Pattern (Mock Data) 🔧
```tsx
// TODO: Replace with GraphQL when backend is ready
// import { useQuery } from '@apollo/client/react';
// import { GET_USERS } from '@/lib/graphql/queries/users';
import { useMockUsersQuery } from '@/lib/mock-data';

const { data, loading, error } = useMockUsersQuery();
```

### Target Usage Pattern (When Backend Ready) ✅
```tsx
// Generated hook with full type safety
import { useGetUsersQuery } from '@/lib/graphql/generated';

const { data, loading, error } = useGetUsersQuery({
  variables: { input: { type: 'CLIENT' } }
});
```

### Migration Path 🛤️
1. **Current**: Using mock data with TODO comments
2. **Next**: Restore GraphQL imports when backend endpoints are ready
3. **Final**: Migrate from manual useQuery to generated hooks

## 📈 Migration Statistics

**Files to Migrate:** 31 files using `useQuery`
**Generated Hooks Available:** 
- Query Hooks: `useXxxQuery`, `useXxxLazyQuery`, `useXxxSuspenseQuery`
- Mutation Hooks: `useXxxMutation`
- Subscription Hooks: `useXxxSubscription`

## 🗓️ Implementation Plan

### **Day 1: Migration Infrastructure**

#### **1.1 Verify Codegen Setup** ⏱️ 30 min
- [ ] Confirm all GraphQL operations are in `.graphql` files
- [ ] Run `npm run codegen` to generate latest hooks
- [ ] Verify hook generation with proper naming conventions
- [ ] Test import paths from `@/lib/graphql/generated`

#### **1.2 Create Migration Utilities** ⏱️ 1 hour
- [ ] Create migration helper script to identify usage patterns
- [ ] Document hook mapping (manual query → generated hook)
- [ ] Create example migration patterns for common use cases

#### **1.3 Update Development Scripts** ⏱️ 30 min
- [ ] Add `codegen:watch` to development workflow
- [ ] Update `build` script to run codegen before build
- [ ] Add codegen verification to pre-commit hooks

### **Day 2: Core Migration - High Priority Files**

#### **2.1 Authentication & Core** ⏱️ 3 hours
- [ ] `src/components/auth/LoginForm.tsx`
- [ ] `src/hooks/useAuth.ts`
- [ ] `src/app/dashboard/page.tsx`
- [ ] `src/components/layout/Header.tsx`
- [ ] `src/components/layout/AppSidebar.tsx`

#### **2.2 User Management** ⏱️ 4 hours
- [ ] `src/app/dashboard/users/page.tsx`
- [ ] `src/app/dashboard/users/[id]/page.tsx`
- [ ] `src/app/dashboard/users/[id]/edit/page.tsx`
- [ ] `src/app/dashboard/users/create/page.tsx`
- [ ] `src/app/dashboard/users/clients/page.tsx`
- [ ] `src/app/dashboard/users/drivers/page.tsx`
- [ ] `src/app/dashboard/users/partners/page.tsx`
- [ ] `src/app/dashboard/users/staff/page.tsx`

### **Day 3: Remaining Modules Migration**

#### **3.1 Orders Module** ⏱️ 2 hours
- [ ] `src/app/dashboard/orders/page.tsx`
- [ ] `src/app/dashboard/orders/[id]/page.tsx`

#### **3.2 Articles & Pricing** ⏱️ 2 hours
- [ ] `src/app/dashboard/articles/page.tsx`
- [ ] `src/app/dashboard/articles/[id]/page.tsx`
- [ ] `src/app/dashboard/articles/[id]/edit/page.tsx`
- [ ] `src/app/dashboard/articles/variants/page.tsx`
- [ ] `src/app/dashboard/articles/delivery-types/page.tsx`
- [ ] `src/app/dashboard/pricing/page.tsx`
- [ ] `src/app/dashboard/pricing/calculator/page.tsx`

#### **3.3 Locations Module** ⏱️ 2 hours
- [ ] `src/app/dashboard/locations/page.tsx`
- [ ] `src/app/dashboard/locations/countries/page.tsx`
- [ ] `src/app/dashboard/locations/states/page.tsx`
- [ ] `src/app/dashboard/locations/cities/page.tsx`
- [ ] `src/app/dashboard/locations/municipalities/page.tsx`
- [ ] `src/app/dashboard/locations/neighborhoods/page.tsx`
- [ ] `src/app/dashboard/locations/components/LocationSelector.tsx`

#### **3.4 Final Cleanup** ⏱️ 2 hours
- [ ] Remove unused manual GraphQL imports
- [ ] Update any remaining components
- [ ] Verify all tests pass
- [ ] Run full type check

## 🔄 Step-by-Step Migration Process

### **For Each File:**

#### **Step 1: Identify Current Pattern**
```tsx
// Current (manual)
import { useQuery } from '@apollo/client/react';
import { GET_USERS } from '@/lib/graphql/queries/users';
import { UsersQuery, UsersQueryVariables } from '@/lib/graphql/types';

const { data, loading, error, refetch } = useQuery<UsersQuery, UsersQueryVariables>(
  GET_USERS,
  {
    variables: { input: filters },
    errorPolicy: 'all'
  }
);
```

#### **Step 2: Find Generated Hook**
```bash
# Search for available hooks
grep -n "useGetUsersQuery\|useUsersQuery" src/lib/graphql/generated.ts
```

#### **Step 3: Replace with Generated Hook**
```tsx
// Target (generated)
import { useGetUsersQuery } from '@/lib/graphql/generated';

const { data, loading, error, refetch } = useGetUsersQuery({
  variables: { input: filters },
  errorPolicy: 'all'
});
```

#### **Step 4: Update Type Usage**
```tsx
// Before: Manual type access
const users = data?.users || [];

// After: Full type inference
const users = data?.getUsers || []; // Type is automatically inferred
```

#### **Step 5: Test & Verify**
- [ ] Component compiles without TypeScript errors
- [ ] Data loading works correctly
- [ ] Error handling functions as expected
- [ ] Refetch and other methods work

### **Common Migration Patterns**

#### **Query Hooks**
```tsx
// Before
useQuery(GET_ARTICLES, { variables: { input } })
// After  
useGetArticlesQuery({ variables: { input } })
```

#### **Lazy Query Hooks**
```tsx
// Before
useLazyQuery(GET_USER, { onCompleted: handleComplete })
// After
useGetUserLazyQuery({ onCompleted: handleComplete })
```

#### **Mutation Hooks**
```tsx
// Before
useMutation(CREATE_USER, { onCompleted: handleSuccess })
// After
useCreateUserMutation({ onCompleted: handleSuccess })
```

#### **Subscription Hooks**
```tsx
// Before
useSubscription(ORDER_UPDATES, { variables: { orderId } })
// After
useOrderUpdatesSubscription({ variables: { orderId } })
```

## ✅ Verification Checklist

### **Code Quality**
- [ ] All TypeScript errors resolved
- [ ] ESLint passes without GraphQL-related warnings
- [ ] No unused GraphQL imports remain
- [ ] Prettier formatting consistent

### **Functionality**
- [ ] All data fetching works correctly
- [ ] Loading states function properly
- [ ] Error handling maintains behavior
- [ ] Refetch and cache updates work
- [ ] Variable updates trigger re-queries

### **Performance**
- [ ] Bundle size reduction verified
- [ ] No unnecessary re-renders introduced
- [ ] Query deduplication still works
- [ ] Cache policies maintained

### **Developer Experience**
- [ ] Full IntelliSense for all operations
- [ ] Auto-complete for variables and return types
- [ ] Type errors caught at compile time
- [ ] Hover information shows correct types

## 🚀 Testing Strategy

### **Unit Testing**
- [ ] Component rendering tests updated
- [ ] Mock generated hooks in test files
- [ ] Verify data transformation logic

### **Integration Testing**
- [ ] GraphQL operations work end-to-end
- [ ] Error boundaries handle failures correctly
- [ ] Loading states display properly

### **Type Testing**
- [ ] `npm run type-check` passes completely
- [ ] No `any` types introduced during migration
- [ ] All GraphQL operations fully typed

## 📚 Resources & References

### **GraphQL Code Generator Documentation**
- [React Apollo Plugin](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-react-apollo)
- [Generated Hooks API](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-react-apollo#generated-hooks-api)

### **Migration Examples**
- Example migrations in `src/examples/migrated-components-example.tsx`
- Hook usage patterns in `src/examples/auth-migration-example.tsx`

### **Commands**
```bash
# Generate hooks
npm run codegen

# Watch mode during development
npm run codegen:watch

# Type checking
npm run type-check

# Run tests
npm test
```

## 🎉 Success Metrics

- **Type Safety**: 100% of GraphQL operations fully typed
- **Code Reduction**: ~30-40% reduction in GraphQL-related boilerplate
- **Developer Experience**: Full IntelliSense for all operations
- **Performance**: Measurable bundle size reduction
- **Maintainability**: Automatic sync with schema changes

## 📝 Post-Migration Tasks

- [ ] Update development documentation
- [ ] Create coding standards for new GraphQL usage
- [ ] Set up automatic codegen in CI/CD pipeline
- [ ] Train team on new patterns and best practices

---

**⚡ Ready to start migration when Phase 1 is complete and codegen setup is verified!**