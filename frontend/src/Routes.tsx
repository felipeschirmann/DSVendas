import React, { lazy, Suspense } from "react";
import Home from "pages/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Dashboard = lazy(() => import("pages/Dashboard"));

const Routes = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={
                <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }>
                <Switch>
                    <Route path="/" exact>
                        <Home/>
                    </Route>
                    <Route path="/dashboard" >
                        <Dashboard/>
                    </Route>
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
  };
  
  export default Routes;