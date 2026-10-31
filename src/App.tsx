/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { FullScreenMenu } from './components/FullScreenMenu';
import { HomePage } from './components/pages/HomePage';
import { ConceptPage } from './components/pages/ConceptPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { StoriesPage } from './components/pages/StoriesPage';
import { PricingPage } from './components/pages/PricingPage';
import { ContactPage } from './components/pages/ContactPage';
import { BookingModal } from './components/BookingModal';
import { LocationAndFooter } from './components/LocationAndFooter';
import { PageId, ROUTE_TO_PAGE, PAGE_TO_ROUTE, updateDocumentSEO } from './services/seoConfig';

function getInitialPage(): PageId {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  return ROUTE_TO_PAGE[path] || 'home';
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(getInitialPage);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Ažuriraj SEO meta podatke i slušaj Back/Forward dugmad u pretraživaču
  useEffect(() => {
    updateDocumentSEO(activePage);

    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      const resolvedPage = ROUTE_TO_PAGE[path] || 'home';
      setActivePage(resolvedPage);
      updateDocumentSEO(resolvedPage);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activePage]);

  const handleNavigate = (page: string) => {
    const pageId = page as PageId;
    setActivePage(pageId);
    updateDocumentSEO(pageId);

    const targetRoute = PAGE_TO_ROUTE[pageId] || '/';
    if (window.location.pathname !== targetRoute) {
      window.history.pushState(null, '', targetRoute);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF3EB] text-[#000000] font-sans selection:bg-[#CFF3CF] selection:text-black overflow-x-hidden relative">
      {/* Scroll Progress Bar in brand lime green (#c4e117) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 sm:h-1.5 bg-[#c4e117] origin-left z-50 shadow-[0_0_10px_rgba(196,225,23,0.85)] pointer-events-none"
        style={{ scaleX }}
      />
      {/* Modern Header / Navigation (Starts directly from the top) */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      {/* Animated Full-Screen Color Reveal Menu */}
      <FullScreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Main Page View with Fluid Page Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
          >
            {activePage === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onOpenBooking={() => setIsBookingOpen(true)}
              />
            )}
            {activePage === 'concept' && (
              <ConceptPage
                onOpenBooking={() => setIsBookingOpen(true)}
                onNavigate={handleNavigate}
              />
            )}
            {activePage === 'services' && (
              <ServicesPage
                onOpenBooking={() => setIsBookingOpen(true)}
              />
            )}
            {activePage === 'stories' && (
              <StoriesPage
                onOpenBooking={() => setIsBookingOpen(true)}
              />
            )}
            {activePage === 'pricing' && (
              <PricingPage
                onOpenBooking={() => setIsBookingOpen(true)}
              />
            )}
            {activePage === 'contact' && (
              <ContactPage
                onOpenBooking={() => setIsBookingOpen(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer with Studio Address and Socials */}
      <LocationAndFooter
        onNavigate={handleNavigate}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Booking / Trial Schedule Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
