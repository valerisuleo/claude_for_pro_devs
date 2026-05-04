/* eslint-disable react/jsx-no-useless-fragment */
import React, { Fragment, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './common/navbar/navbar';

const ExercisesRouter = lazy(() => import('./views/exercises/routes'));

const RoutingModule = () => {
    return (
        <Fragment>
            <NavbarComponent />
            <main className="container">
                <div className="row">

                    <div className="col">
                        <Suspense fallback={'Loading...'}>
                            <Routes>
                                {/* Redirect from base path to /games */}
                                <Route
                                    path="/"
                                    element={<Navigate replace to="/expensetracker" />}
                                />
                                <Route
                                    path="/expensetracker/*"
                                    element={<ExercisesRouter />}
                                />
                            </Routes>
                        </Suspense>
                    </div>
                </div>
            </main>
        </Fragment>
    );
};

export default RoutingModule;
