# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Dev server with HMR
npm run build    # Production build
npm test         # Run Jest tests (all)
nx test --testFile=src/path/to/file.spec.tsx  # Run a single test file
```

All commands delegate to Nx under the hood. The Nx project name is `intermediate-topics`.

## Architecture

This is a single-view React 18 app built as an educational reference for intermediate React patterns.

**Entry point:** `src/main.tsx` → wraps `App` in `BrowserRouter` → `router.tsx` lazy-loads `/expensetracker` → `ExpenseTracker` component.

**State:** No Redux or Context. `ExpenseTracker` holds the `expenses` array in `useState` and passes data/callbacks down as props.

### Library (`src/app/library/`)

Reusable primitives that are framework-agnostic within this app:

- **`forms/hooks/useReactiveForm`** — the central form hook. Takes a Zod schema and field config, returns `{ formGroup, handleChange, handleBlur, handleSubmit, resetForm, renderInput, renderSelect, errorMessages }`. See `src/app/library/forms/README.md` for detailed usage.
- **`tables/hooks/useTable`** — manages column definitions, sorted table body rendering, and exposes `updateTable(rows)` to sync new data. Uses `lodash.orderBy` for sorting.
- **`library/components/`** — generic `Button` and `Alerts` presentational components.
- **`library/forms/`** — `InputGroup`, `Select`, `FormGroup`, and `ErrorsComponent` presentational form primitives consumed by `useReactiveForm`.

### Views (`src/app/views/exercises/building-form/`)

- **`expense-tracker.tsx`** — the main page component; wires `useReactiveForm` + `useTable` together.
- **`config.tsx`** — mock initial data and form field configuration (field names, labels, Zod validators). Changing the schema here propagates through validation and the table columns automatically.
- **`interfaces.tsx`** — `IExpense` and `IButtonAction` types.

## Key Conventions

- **Validation** is declared in `config.tsx` as Zod schemas passed to `useReactiveForm`. No ad-hoc inline validation.
- **Form fields** are defined as an array of controller objects in `config.tsx`; `useReactiveForm` renders them via `renderInput`/`renderSelect` so adding a field only requires updating config.
- **Styling** uses SCSS Modules for component scope (`*.module.scss`) and Bootstrap 5 utility classes for layout. Global styles live in `src/styles.scss`.
- **TypeScript** strict mode is disabled; prefer explicit types on function signatures rather than relying on inference for exported APIs.
- **Prettier** enforces single quotes and 4-space indentation.
