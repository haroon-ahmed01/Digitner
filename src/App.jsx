import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const PageNotFound = React.lazy(() => import("./Pages/PageNotFound/Index"));
const Public = React.lazy(() => import("./Pages/Public/Index"));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/*" element={<Public />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
