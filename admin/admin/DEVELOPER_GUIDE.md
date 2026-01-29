# Quick Reference Guide - AdminPanel Refactoring

## 📁 File Locations

### Main Component

- **AdminPanel.jsx** - `/admin/src/pages/AdminPanel.jsx`

### Tab Components

- Located in `/admin/src/components/tabs/`
  - `DashboardTab.jsx` - Dashboard overview
  - `ProductsTab.jsx` - Product listing
  - `AddProductTab.jsx` - Add new products
  - `OrdersTab.jsx` - Customer orders management
  - `CourierOrdersTab.jsx` - Courier deliveries
  - `AnalyticsTab.jsx` - Sales analytics
  - `CategoriesTab.jsx` - Category management

### Shared Resources

- **adminPanelStyles.js** - `/admin/src/styles/adminPanelStyles.js`
- **statusHelpers.js** - `/admin/src/utils/statusHelpers.js`

## 🔄 How It Works

### 1. Main AdminPanel Component

Handles:

- Tab switching (`activeTab` state)
- Mobile sidebar toggle (`sidebarOpen` state)
- Responsive detection (`isMobile` state)
- Renders appropriate tab component based on `activeTab`

### 2. Individual Tab Components

Each tab component:

- Has its own local state for forms/pagination
- Receives data props from parent
- Receives callback functions for actions
- Handles both desktop and mobile layouts
- Imports from centralized `adminPanelStyles`

### 3. Shared Styles

- No inline styles in components
- All styles imported from `adminPanelStyles.js`
- Mobile responsive styles are included

## 📝 Common Tasks

### Adding a New Tab

1. Create new component in `/components/tabs/NewTab.jsx`:

```jsx
import React from "react";
import { styles } from "../../styles/adminPanelStyles";

function NewTab(
  {
    /* props */
  },
) {
  return <div style={styles.card}>{/* content */}</div>;
}

export default NewTab;
```

2. Import in AdminPanel.jsx:

```jsx
import NewTab from "../components/tabs/NewTab";
```

3. Add to tabs array:

```jsx
const tabs = [
  // ... existing tabs
  { id: "new-tab", label: "New Tab", icon: "📌" },
];
```

4. Add conditional render:

```jsx
{
  activeTab === "new-tab" && <NewTab {...props} />;
}
```

### Using Status Styling

```jsx
import { getStatusText, getStatusStyle } from "../../utils/statusHelpers";

// In JSX:
<div style={{ ...styles.statusBadge, ...getStatusStyle(order.status) }}>
  {getStatusText(order.status)}
</div>;
```

### Responsive Design

All components receive `isMobile` prop:

```jsx
<div style={{
  ...styles.containerStyle,
  ...(isMobile ? styles.containerStyleMobile : {})
}}>
```

### Pagination Pattern

```jsx
const [currentPage, setCurrentPage] = React.useState(1);
const itemsPerPage = 6;

const indexOfLastItem = currentPage * itemsPerPage;
const currentItems =
  data?.slice(indexOfLastItem - itemsPerPage, indexOfLastItem) || [];
const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};
```

## 🎨 Styling

### Using Styles

```jsx
import { styles } from '../../styles/adminPanelStyles';

// Simple usage
<div style={styles.card}>

// Conditional styling
<div style={{
  ...styles.button,
  ...(isActive ? styles.buttonActive : {})
}}>

// Mobile responsive
<div style={{
  ...styles.header,
  ...(isMobile ? styles.headerMobile : {})
}}>
```

### Common Style Properties

- `styles.card` - Card container
- `styles.button` - Base button
- `styles.input` - Input fields
- `styles.table` - Table styles
- `styles.pagination` - Pagination controls
- `styles.emptyState` - Empty state message
- `styles.statusBadge` - Status badge base
- `*Mobile` variants - Mobile responsive overrides

## 🔗 Component Dependencies

```
AdminPanel
  ├── Uses: styles from adminPanelStyles.js
  ├── Renders: DashboardTab
  │   └── Uses: StatsGrid, OrdersTable, statusHelpers
  ├── Renders: ProductsTab
  │   └── Uses: ProductGrid
  ├── Renders: AddProductTab
  │   └── Uses: styles only
  ├── Renders: OrdersTab
  │   └── Uses: OrdersTable, statusHelpers
  ├── Renders: CourierOrdersTab
  │   └── Uses: statusHelpers
  ├── Renders: AnalyticsTab
  │   └── Uses: StatsGrid
  └── Renders: CategoriesTab
      └── Uses: styles only
```

## 🚀 Performance Tips

1. Each tab has local state - doesn't affect other tabs
2. Pagination is local to each tab
3. Forms are local to each tab
4. Consider adding React.memo() to prevent unnecessary re-renders
5. Use useCallback() for frequently passed callbacks

## 🐛 Debugging

### Check which tab is active

```jsx
// In console: check this.state.activeTab or activeTab state
```

### Debug mobile responsiveness

```jsx
// Check isMobile state or resize browser window
// Mobile breakpoint is 768px
```

### Check data flow

1. Props passed from parent → AdminPanel
2. AdminPanel passes to specific tab
3. Tab manages local state and actions

## 📋 Checklist for New Features

- [ ] Create tab component in `/components/tabs/`
- [ ] Import tab in AdminPanel.jsx
- [ ] Add to tabs array with icon and label
- [ ] Add conditional render in content area
- [ ] Import necessary styles from adminPanelStyles
- [ ] Handle mobile responsiveness
- [ ] Add any new helper functions to utils/
- [ ] Test on both desktop and mobile views
- [ ] Verify no ESLint errors
- [ ] Update documentation

## 🔗 Related Files

- Parent component that uses AdminPanel: Check where it's imported
- Backend API endpoints: Check controller files in `/server/src/controllers/`
- Data models: Check `/server/prisma/schema.prisma`
