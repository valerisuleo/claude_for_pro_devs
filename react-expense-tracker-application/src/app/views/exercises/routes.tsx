
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy load route components
const ExpenseTracker = lazy(() => import("./building-form/expense-tracker"));

const routes = () => {
    return (
        <Suspense >
            <Routes>
                <Route path="/" element={<ExpenseTracker />} />
            </Routes>
        </Suspense>
    );
};

export default routes;
