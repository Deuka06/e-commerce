# AdminPanel Component Architecture

## Component Hierarchy

```
AdminPanel (Main Container)
├── Mobile Overlay (for mobile sidebar)
├── Sidebar
│   ├── Logo Section
│   ├── Navigation Menu
│   │   ├── Dashboard Tab
│   │   ├── Products Tab
│   │   ├── Add Product Tab
│   │   ├── Orders Tab
│   │   ├── Courier Orders Tab
│   │   ├── Analytics Tab
│   │   └── Categories Tab
│   └── User Info Footer
├── Main Content Area
│   ├── Header
│   │   ├── Hamburger Menu (Mobile)
│   │   ├── Page Title
│   │   └── Breadcrumb (Desktop)
│   └── Content Renderer (Conditional)
│       ├── DashboardTab
│       │   ├── StatsGrid
│       │   └── OrdersTable
│       ├── ProductsTab
│       │   └── ProductGrid
│       ├── AddProductTab
│       │   └── Product Form
│       ├── OrdersTab
│       │   ├── Orders Table (Desktop)
│       │   └── Orders Cards (Mobile)
│       ├── CourierOrdersTab
│       │   ├── Courier Orders Table (Desktop)
│       │   └── Courier Orders Cards (Mobile)
│       ├── AnalyticsTab
│       │   └── StatsGrid (Analytics Mode)
│       └── CategoriesTab
│           ├── Category Form
│           └── Categories List/Table
```

## Data Flow

```
Parent Component
    ↓
AdminPanel (Main State)
    ├── activeTab (current tab)
    ├── sidebarOpen (mobile sidebar state)
    ├── isMobile (responsive detection)
    ↓
Individual Tab Components (Local State)
    ├── DashboardTab (currentPage)
    ├── OrdersTab (ordersPage)
    ├── CourierOrdersTab (courierOrdersPage)
    ├── AddProductTab (formData)
    └── CategoriesTab (categoryFormData, isEditingCategory, etc)
    ↓
Presentational Components
    ├── StatsGrid
    ├── OrdersTable
    ├── ProductGrid
    └── Form Components
```

## Props Mapping

### AdminPanel receives (from parent):

- `products` - Array of products
- `orders` - Array of orders
- `courierOrders` - Array of courier orders
- `categories` - Array of categories
- `onAddProduct` - Callback function
- `onDeleteProduct` - Callback function
- `onUpdateOrderStatus` - Callback function
- `onUpdateCourierOrderStatus` - Callback function
- `onAddCategory` - Callback function
- `onDeleteCategory` - Callback function
- `onUpdateCategory` - Callback function

### Tab Components receive (from AdminPanel):

- Common: `isMobile`, `orders`/`products`/etc data
- Specific callbacks for their operations
- Additional state like `categories`, `courierOrders`

## Styling Architecture

### Styles are centralized in `adminPanelStyles.js`:

- Wrapper & layout
- Sidebar styles
- Navigation styles
- Main content area
- Header styles
- Card styles
- Form styles
- Tables & pagination
- Mobile responsive overrides

### Individual components import styles:

```js
import { styles } from "../../styles/adminPanelStyles";
// Use with: style={styles.propertyName}
```

## Helper Utilities

### `statusHelpers.js` provides:

- `getStatusText(status)` - Converts status codes to Kazakh text
- `getStatusStyle(status)` - Returns color schemes for statuses

### Used by:

- DashboardTab
- OrdersTab
- CourierOrdersTab

## Mobile Responsiveness

Each component handles mobile responsiveness by:

1. Receiving `isMobile` prop
2. Using conditional rendering for mobile-specific layouts
3. Applying mobile style overrides from `adminPanelStyles`
4. Examples:
   - Cards instead of tables on mobile
   - Hamburger menu for sidebar
   - Adjusted padding & fonts
   - Single column layouts

## State Management Summary

| State                  | Location         | Scope  | Type        |
| ---------------------- | ---------------- | ------ | ----------- |
| `activeTab`            | AdminPanel       | Global | String      |
| `sidebarOpen`          | AdminPanel       | Global | Boolean     |
| `isMobile`             | AdminPanel       | Global | Boolean     |
| `currentPage`          | DashboardTab     | Local  | Number      |
| `ordersPage`           | OrdersTab        | Local  | Number      |
| `courierOrdersPage`    | CourierOrdersTab | Local  | Number      |
| `categoriesPage`       | CategoriesTab    | Local  | Number      |
| `formData`             | AddProductTab    | Local  | Object      |
| `categoryFormData`     | CategoriesTab    | Local  | Object      |
| `isEditingCategory`    | CategoriesTab    | Local  | Boolean     |
| `categoryImagePreview` | CategoriesTab    | Local  | String/Null |

## Performance Benefits

1. **Code Splitting**: Each tab is a separate component
2. **Lazy Loading**: Components only render when needed
3. **Local State**: Tab-specific state doesn't trigger re-renders of other tabs
4. **Memoization Ready**: Can easily add React.memo() to components
5. **Smaller Bundle**: Main component is much smaller now
