# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based Expense Tracker application built as a single-project Nx monorepo. The application demonstrates advanced React patterns including custom hooks for state management (form handling and table operations) and component composition with TypeScript.

### Key Technologies
- **React 18.2.0** - UI framework with functional components and hooks
- **TypeScript 5.2** - Type safety and developer experience
- **Nx 17.2.5** - Monorepo management and build orchestration
- **Zod 3.22.4** - Schema validation (used in `useReactiveForm`)
- **React Router DOM 6.23.0** - Routing and navigation
- **Bootstrap 5** - CSS framework for styling
- **Axios** - HTTP client for API requests
- **Jest + React Testing Library** - Unit and component testing
- **ESLint + Prettier** - Code quality and formatting

## Build and Development Commands

### Development Server
```bash
npm start
# Runs: nx serve (watches for changes and hot-reloads)
```

### Production Build
```bash
npm run build
# Runs: nx build (optimized bundle output)
```

### Testing
```bash
npm test
# Runs: nx test (all test files)

# Run tests for a specific file
nx test --testFile=src/app/path/to/file.spec.tsx

# Run tests in watch mode
nx test --watch

# Run tests with coverage
nx test --coverage

# Run a specific test by name pattern
nx test --testNamePattern="should validate form"
```

### Linting
```bash
nx lint
# Runs ESLint on the codebase

# Fix linting errors automatically
nx lint --fix
```

## High-Level Architecture

### Directory Structure

```
src/app/
├── common/                    # Shared across the app
│   ├── interfaces.ts         # Global TypeScript interfaces
│   ├── utilities.tsx         # Helper functions
│   └── navbar/               # Navigation component
├── library/                  # Reusable, self-contained components and hooks
│   ├── components/           # Presentational components (Alerts, Button, etc.)
│   ├── forms/                # Form-related utilities
│   │   ├── hooks/
│   │   │   ├── useReactiveForm.tsx  # Custom hook for form state + validation
│   │   │   └── interfaces.ts         # Form-related types
│   │   ├── input-group/      # Input wrapper component
│   │   └── select/           # Select/dropdown component
│   └── tables/               # Table utilities
│       ├── hooks/
│       │   └── useTable.tsx  # Custom hook for table state + sorting
│       └── table.tsx         # Table component
├── views/                    # Page-level components and views
│   └── exercises/
│       ├── building-form/
│       │   ├── expense-tracker.tsx      # Main expense tracker view
│       │   ├── config.tsx               # Form controllers, mock data, table config
│       │   └── interfaces.tsx           # Component-specific types
│       └── routes.tsx                   # Sub-router for exercises
├── router.tsx               # Main application router
└── app.tsx                  # Root component
```

### Entry Point Flow
1. `src/main.tsx` → `App` component
2. `App` → `RoutingModule` (router.tsx)
3. `RoutingModule` → lazy-loads `ExercisesRouter` → `ExpenseTracker` view
4. Base path `/` redirects to `/expensetracker`

### Data Flow Architecture

#### Form Management (`useReactiveForm` hook)
The `useReactiveForm` hook is the core form state management utility:

```typescript
// Location: src/app/library/forms/hooks/useReactiveForm.tsx
useReactiveForm(
  schema: FormSchema,              // Initial form state object
  controllers: Controller[],         // Array defining form fields
  doSubmit: () => void,             // Callback when form validates successfully
  config?: ReactiveFormConfig       // Optional config (e.g., resetOnSchemaChange)
)
```

**Key features:**

- Manages form state and error messages
- Field-level validation with Zod schemas (multiple validators per field)
- Real-time validation on change and blur events
- Renders input components via `renderInput()` and `renderSelect()`
- Provides `resetForm()` to clear all fields and errors

**Controller structure** (from config.tsx):
```typescript
{
  name: "amount",
  label: "Amount",
  type: "number",
  placeholder: "Enter amount",
  validators: [z.number().positive("Must be positive")]
}
```

#### Table Management (`useTable` hook)
The `useTable` hook handles table data display and sorting:

```typescript
// Location: src/app/library/tables/hooks/useTable.tsx
useTable<T>(
  data: T[],
  columns: Column[],
  config: Config
)
```

**Key features:**

- Renders rows dynamically from data
- Column-based configuration (mapping to object keys)
- Sortable columns (click header to toggle asc/desc)
- Supports function cells for rendering actions (edit, delete buttons)
- Returns `tableBody` (JSX), `updateTable()`, and `handleSort()`

**Usage in ExpenseTracker:**

```typescript
const { tableBody, updateTable, handleSort } = useTable(expenses, tableHeader, {
  sortable: true,
  defaultSortOrder: 'asc',
  mode: 'default'
});

// After adding/editing expenses, update the table:
updateTable(newExpensesArray);
```

### Component Organization

**Library Components** (`src/app/library/components/`):

- `AlertsComponent` - Display alerts/messages
- `ButtonComponent` - Reusable button with variants
- `InputGroup` - Input field with label and error message
- `SelectComponent` - Dropdown selector with options
- `TableComponent` - Dynamic table renderer

**View Components** (`src/app/views/`):

- `ExpenseTracker` - Main page component that orchestrates form, table, and state
- Uses config-driven setup (form controllers, table headers, mock data)

## Key Patterns and Conventions

### Form Configuration
Forms are configured declaratively via a `controllers` array in `config.tsx`. This keeps configuration separate from component logic:

- Each controller maps to a form field
- Validators array allows multiple Zod schemas per field (first failure stops validation)
- The hook renders inputs based on controller `type` field

### Validation
- Zod schema validation is performed field-by-field on change/blur and on form submission
- Error messages are extracted from `ZodError` and formatted via `processErrorMessages()`
- Errors are cleared when fields become valid

### State Updates in ExpenseTracker

The expense-tracker component uses local state (`useState`) for:

- `expenses` - array of expense objects
- `form` - current form state
- `category` - filter state

After operations (create, edit, delete), call `updateTable(newExpensesArray)` to re-render the table.

### Table Actions
Table columns can include a computed `actions` cell:

```typescript
{
  name: 'actions',
  text: 'Actions',
  value: (row) => renderActions(row)  // Function receives the entire row object
}
```

Actions are typically edit/delete buttons that trigger modal or direct form updates.

## Testing Strategy

- **Unit tests** located alongside source files (e.g., `component.spec.tsx`)
- **Testing Library** used for component testing with focus on user behavior
- **Jest** configured via Nx with caching enabled
- Test files follow the pattern: `describe()` → `it()` with `render()` and assertions

**Running tests:**

```bash
npm test                    # All tests
nx test --watch           # Watch mode
nx test --coverage        # Coverage report
```

## Development Workflow

### Adding a New Form Field
1. Add controller to `config.tsx` formControllers array
2. Import Zod validators in config
3. Define controller with `name`, `label`, `type`, `validators`
4. Validators validate form state before submission

### Modifying Table Columns
1. Update `tableHeader` in `config.tsx`
2. Column `name` must match object property key in data array
3. Use `value` as a function for computed columns (e.g., actions)

### Editing/Deleting Expenses
1. The table's action cell calls `renderActions()` which generates edit/delete buttons
2. Delete: removes from state via filter, calls `updateTable()`
3. Edit: populates form with existing values, submission updates the expense object

## Important Notes

- The project uses **lazy loading** for route chunks to improve initial load time
- **Bootstrap classes** are used directly in components (no custom CSS module for basic layout)
- **Lodash** is used for utility functions (e.g., `_.orderBy` for sorting, `_.startCase` for text formatting)
- **Zod** provides compile-time type safety with runtime validation
- The `formMaker()` utility in `src/app/library/forms/hooks/utils.ts` converts controllers to initial form state objects
- Error messages from Zod are processed in `processErrorMessages()` to extract human-readable strings
