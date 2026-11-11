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
const AcademyLayout = React.lazy(() => import("./Academy/Layout"));
const AcademyHome = React.lazy(() => import("./Academy/Home"));
const AcademyProgrammes = React.lazy(() => import("./Academy/Programmes"));
const AcademyBlueprint = React.lazy(() => import("./Academy/Blueprint"));
const AcademyPlaybook = React.lazy(() => import("./Academy/Playbook"));
const AcademyRegister = React.lazy(() => import("./Academy/Register"));
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
            <Route element={<AcademyLayout />}>
              <Route path={PATHS.academy} element={<AcademyHome />} />
              <Route path={PATHS.academyProgrammes} element={<AcademyProgrammes />} />
              <Route path={PATHS.academyBlueprint} element={<AcademyBlueprint />} />
              <Route path={PATHS.academyPlaybook} element={<AcademyPlaybook />} />
              <Route path={PATHS.academyRegister} element={<AcademyRegister />} />
            </Route>
            <Route path={PATHS.contact} element={<ContactPage />} />
            <Route path={PATHS.terms} element={<TermsPage />} />
          </Route>

          {/* the AI Marketplace has its own header and footer, so it sits outside the shared layout */}
          <Route path={PATHS.marketplace} element={<MarketplacePage />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};
export default Index;
