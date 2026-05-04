---
name: Core architectural patterns and recurring issues
description: Key patterns, anti-patterns, and recurring issues found during the first full codebase review
type: project
---

**Confirmed patterns in use:**
- Config-driven forms via `controllers` array in `config.tsx`; controllers use Zod validators
- `useReactiveForm` hook owns form state, validation, and input rendering
- `useTable` hook owns table state, sorting, and row rendering
- Bootstrap replaced with Tailwind + shadcn/ui (`@/components/ui/*`)
- Lodash used for `_.startCase`, `_.orderBy`
- Lazy loading applied at route level in `router.tsx` and `routes.tsx`

**Recurring issues found (first review, 2026-05-04):**

1. `deleteExpense` uses `description` as a unique key — items with duplicate descriptions will all be deleted together (correctness bug)
2. `renderActions` is recreated on every render and embedded into expense data objects, making referential equality checks impossible
3. `isFormValid` in `useReactiveForm` runs Zod parse on every render (N validators × M fields, no memoization)
4. `handleChange` in `useReactiveForm` reads `formGroup` from closure (stale closure risk) instead of using the functional updater pattern
5. `getOptions()` in `ExpenseTracker` is an inline function called during render — not memoized
6. `controllers` state in `ExpenseTracker` is a `useState` but never mutated — should be a plain `const`
7. `SpendingChart` recomputes the reduce/map aggregation on every render — needs `useMemo`
8. `Controller` interface is missing `placeholder?: string` field even though `renderInput` destructures it
9. `processErrorMessages` in `utils.ts` has fragile string-matching logic tied to Zod's internal English error messages
10. `routes.tsx` component is named with lowercase `routes` — React requires PascalCase for components
11. `eslint-disable` suppression comments on `any` types in core hooks — masks real type safety gaps
12. `amount` is stored and submitted as a string, but the Zod validator coerces to number — the stored expense data type is inconsistent with the validator
13. `useTable`'s `handleSort` parameter `current` is untyped (implicit `any`)
14. `TableComponent` uses array index as key on `tableHeader` map — fragile if columns reorder

**Why these matter:** The `deleteExpense` description-key bug is the highest-severity correctness issue. The `isFormValid` render-phase Zod parsing is the highest-severity performance issue.
