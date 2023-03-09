// App wrapper and router

import React from "react";
import { Route } from "wouter";
import { TRACT_LIST, TRACT_DETAIL } from "./routes";
import { TractList, TractDetail } from "./tracts";
import { ErrorBoundary } from "./utils";
import "./App.css";

const App = () => (
  <ErrorBoundary>
    <main>
      <Route path={TRACT_LIST} component={TractList} />
      <Route path={TRACT_DETAIL} component={TractDetail} />
    </main>
  </ErrorBoundary>
);

export default App;
