import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import SeoHead from "./components/SeoHead";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/layout/Footer";
import MobileNav from "./components/layout/MobileNav";
import RouteErrorBoundary from "./components/RouteErrorBoundary";
import HomePage from "./pages/HomePage";
import { lazyWithReload } from "./utils/lazyWithReload";
import { getClinicWhatsAppLink } from "./utils/whatsapp";

// The home page ships in the main bundle because it is what almost every
// visitor lands on. The rest — and the photo-heavy pages especially — are
// split out so a first visit does not pay for pages it never opens.
const ServicesPage = lazyWithReload(() => import("./pages/ServicesPage"));
const CaseStudiesPage = lazyWithReload(() => import("./pages/CaseStudiesPage"));
const BookAppointmentPage = lazyWithReload(() => import("./pages/BookAppointmentPage"));
const AboutPage = lazyWithReload(() => import("./pages/AboutPage"));
const ContactPage = lazyWithReload(() => import("./pages/ContactPage"));

function RouteFallback() {
  return <div className="route-fallback" aria-busy="true" aria-label="Loading page" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SeoHead />
      <Header />
      <RouteErrorBoundary>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/before-after" element={<CaseStudiesPage />} />
            <Route path="/book" element={<BookAppointmentPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </RouteErrorBoundary>
      <Footer />
      <MobileNav />

      {/* WhatsApp Floating Action Button */}
      <a
        href={getClinicWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Chat on WhatsApp"
      >
        💬
      </a>
    </BrowserRouter>
  );
}
