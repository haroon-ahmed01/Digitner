import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import PublicLayout from "@/layouts/PublicLayout/Index";
import { PATHS } from "@/constant/routes";

const PageNotFound = React.lazy(() => import("../PageNotFound/Index"));
const HomePage = React.lazy(() => import("./Home/Index"));
const AboutPage = React.lazy(() => import("./About/Index"));
const ServicesPage = React.lazy(() => import("./Services/Index"));
const ServiceGroupPage = React.lazy(() => import("./Services/Detail"));
const ProductsPage = React.lazy(() => import("./Products/Index"));
const ProductDetailPage = React.lazy(() => import("./Products/ProductDetail"));
const AiSolutionsPage = React.lazy(() => import("./AiSolutions/Index"));
const AiProductDetailPage = React.lazy(() => import("./AiSolutions/AiProductDetail"));
const MarketplacePage = React.lazy(() => import("./Marketplace/Index"));
const ContactPage = React.lazy(() => import("./Contact/Index"));
const TermsPage = React.lazy(() => import("./Terms/Index"));

const Index = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* all public pages share the layout shell (Header + Footer) */}
          <Route element={<PublicLayout />}>
            <Route path={PATHS.home} element={<HomePage />} />
            <Route path={PATHS.about} element={<AboutPage />} />
            <Route path={PATHS.services} element={<ServicesPage />} />
            <Route path={PATHS.serviceGroup()} element={<ServiceGroupPage />} />
            <Route path={PATHS.products} element={<ProductsPage />} />
            <Route path={PATHS.product()} element={<ProductDetailPage />} />
            <Route path={PATHS.ai} element={<AiSolutionsPage />} />
            <Route path={PATHS.aiProduct()} element={<AiProductDetailPage />} />
            <Route path={PATHS.marketplace} element={<MarketplacePage />} />
            <Route path={PATHS.contact} element={<ContactPage />} />
            <Route path={PATHS.terms} element={<TermsPage />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};
export default Index;
