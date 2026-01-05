import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/layout/PublicLayout";
import AdminRoutes from "./admin/routes";

import HomePage from "./pages/HomePage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import Portfolio from "./components/sections/Portfolio";
import BlogPage from "./pages/BlogPage";
import BlogsPageDetail from "./pages/BlogsPageDetail";
import PrivacyPolicy from "./pages/Policy";
import TermsConditions from "./pages/TermsConditions";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/portfolio" element={<Portfolio />} />

        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogsPageDetail />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
      </Route>

      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
};

export default App;
