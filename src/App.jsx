import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import SeoHead from "./components/SeoHead";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/layout/Footer";
import MobileNav from "./components/layout/MobileNav";
import HomePage from "./pages/HomePage";
import { getClinicWhatsAppLink } from "./utils/whatsapp";

// The home page ships in the main bundle because it is what almost every
// visitor lands on. The rest — and the photo-heavy pages especially — are
// split out so a first visit does not pay for pages it never opens.
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const CaseStudiesPage = lazy(() => import("./pages/CaseStudiesPage"));
const BookAppointmentPage = lazy(() => import("./pages/BookAppointmentPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

function RouteFallback() {
  return <div className="route-fallback" aria-busy="true" aria-label="Loading page" />;
}

export default function App() {
  return (
    <HashRouter basename="/">
      <ScrollToTop />
      <SeoHead />
      <Header />
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
    </HashRouter>
  );
}
