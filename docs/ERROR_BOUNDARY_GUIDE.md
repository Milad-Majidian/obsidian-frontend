# ErrorBoundary - Quick Reference Guide

## 🎯 When to Use

### ✅ **DO wrap with ErrorBoundary:**
- **Root layout** - Catch all catastrophic errors
- **Feature sections** - Filters, product lists, sidebars
- **Third-party components** - External widgets, maps, charts
- **Async data fetching** - Components that call APIs
- **Complex UI** - Rich text editors, drag-and-drop

### ❌ **DON'T wrap:**
- Simple presentational components (`<Button>`, `<Card>`)
- Already wrapped children (avoid double-wrapping)
- Server Components (use `error.tsx` instead)

---

## 📦 3 Levels of Protection

### 1. **Page Level** (Entire page)
```tsx
// app/layout.tsx or page-level routes
<ErrorBoundary level="page">
  <YourPage />
</ErrorBoundary>
```

### 2. **Section Level** (Independent areas)
```tsx
// Isolate sidebar from main content
<div className="layout">
  <ErrorBoundary level="section">
    <Sidebar />
  </ErrorBoundary>
  
  <ErrorBoundary level="section">
    <MainContent />
  </ErrorBoundary>
</div>
```

### 3. **Component Level** (Risky components)
```tsx
// Optional feature that shouldn't break the page
<ErrorBoundary level="component" fallback={null}>
  <OptionalWidget />
</ErrorBoundary>
```

---

## 🔧 Common Patterns

### **Pattern 1: Custom Fallback**
```tsx
<ErrorBoundary
  fallback={
    <div className="p-4 text-center">
      <p>Unable to load products</p>
      <button onClick={() => location.reload()}>Retry</button>
    </div>
  }
>
  <ProductList />
</ErrorBoundary>
```

### **Pattern 2: With Reset Logic**
```tsx
<ErrorBoundary
  onReset={() => {
    queryClient.invalidateQueries(['products']);
  }}
>
  <ProductList />
</ErrorBoundary>
```

### **Pattern 3: Hide on Error**
```tsx
{/* If error, don't show anything */}
<ErrorBoundary fallback={null}>
  <OptionalRecommendations />
</ErrorBoundary>
```

### **Pattern 4: Graceful Degradation**
```tsx
<ErrorBoundary
  fallback={
    <div>Showing basic view (advanced features unavailable)</div>
  }
>
  <AdvancedDashboard />
</ErrorBoundary>
```

---

## 📍 Current App Structure

```
app/layout.tsx
└─ ErrorBoundary (level="page") ← Catches all critical errors
   └─ Providers
      └─ pages...

categories/[category]/page.tsx
└─ CategoryPage
   ├─ CategoryBanner (no boundary - simple)
   ├─ ErrorBoundary (section) → CategoryFilterBox
   └─ ErrorBoundary (section) → CategoryProductList
```

**Result:** If filters crash, product list still works! 🎉

---

## 🐛 What ErrorBoundary CATCHES

✅ Render errors
✅ Lifecycle method errors
✅ Constructor errors
✅ Errors in child components

## 🚫 What ErrorBoundary DOESN'T Catch

❌ Event handlers (use try/catch)
❌ Async code (use try/catch or `.catch()`)
❌ Server-side rendering errors
❌ Errors in the boundary itself

---

## 💡 Pro Tips

1. **Place boundaries strategically** - Not too few (no protection), not too many (overkill)

2. **Test boundaries work:**
   ```tsx
   // Add temporarily to test
   function ErrorTest() {
     throw new Error('Test error boundary');
   }
   ```

3. **Log errors in production:**
   ```tsx
   <ErrorBoundary
     onReset={(error) => {
       console.error('Error caught:', error);
       // Send to Sentry, LogRocket, etc.
     }}
   >
   ```

4. **Show different UI per environment:**
   ```tsx
   {process.env.NODE_ENV === 'development' && (
     <pre>{error.stack}</pre>
   )}
   ```

---

## 📚 See Also

- `DEBUGGING_GUIDE.md` - Full debugging workflow
- `ErrorBoundary.examples.tsx` - Comprehensive examples
- React Docs: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
