import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Instagram, Facebook, Phone, MapPin, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '../data/siteData';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activePage: string;
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const FullScreenMenu: React.FC<FullScreenMenuProps> = ({
  isOpen,
  onClose,
  activePage,
  onNavigate,
  onOpenBooking
}) => {
  const menuItems = [
    { id: 'home', label: 'POČETNA', note: 'Dobrodošli u studio', path: '/' },
    { id: 'concept', label: 'BREND KONCEPT', note: 'Zašto 30 minuta EMS', path: '/koncept' },
    { id: 'services', label: 'SPRAVE & TRENINZI', note: 'EMS · Vakum · Madero', path: '/usluge' },
    { id: 'stories', label: 'ISKUSTVA KLIJENATA', note: 'Stvarni rezultati', path: '/iskustva' },
    { id: 'pricing', label: 'CENOVNIK & PAKETI', note: 'Transparentne cene', path: '/cenovnik' },
    { id: 'contact', label: 'LOKACIJA & KONTAKT', note: 'Kralja Petra I 87', path: '/kontakt' },
  ];

  const handleItemClick = (pageId: string) => {
    onNavigate(pageId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* First color wave layer (Pastel Mint #CFF3CF) */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-[#CFF3CF] z-10"
          />

          {/* Second layer: Deep Black #000000 content layer */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-[#000000] text-[#FAF3EB] z-20 flex flex-col justify-between p-6 sm:p-12 overflow-y-auto"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <img
                  src="https://64.media.tumblr.com/4c9afc8a1321f2ee4a9d3a0bc5032ec4/e27a06b482c9590f-11/s2048x3072/30d185a435993ee9d11123fa54d43579535e5139.jpg"
                  alt="New Fit EMS Logo"
                  referrerPolicy="no-referrer"
                  className="h-8 sm:h-10 w-auto object-contain"
                />
                <span className="hidden sm:inline font-['Caveat'] text-2xl text-[#CFF3CF]">
                  Nova Pazova
                </span>
              </div>

              <button
                onClick={onClose}
                className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-[#CFF3CF] hover:bg-[#CFF3CF] hover:text-black transition-all cursor-pointer"
                aria-label="Zatvori meni"
              >
                <span className="text-xs uppercase font-bold tracking-wider">Zatvori</span>
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>

            {/* Menu Links with Staggered Motion */}
            <div className="max-w-4xl mx-auto w-full py-8 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 flex flex-col gap-2 sm:gap-4">
                {menuItems.map((item, index) => {
                  const isActive = activePage === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.07, duration: 0.4 }}
                      className="group"
                    >
                      <a
                        href={item.path}
                        onClick={(e) => {
                          e.preventDefault();
                          handleItemClick(item.id);
                        }}
                        className="text-left w-full flex items-baseline justify-between py-1.5 transition-all"
                      >
                        <div className="flex items-baseline gap-3">
                          <span className="font-['Caveat'] text-sm sm:text-lg text-stone-500 group-hover:text-[#CFF3CF]">
                            0{index + 1}.
                          </span>
                          <span
                            className={`font-['Montserrat'] font-extrabold tracking-wider text-2xl sm:text-4xl lg:text-5xl uppercase transition-colors ${
                              isActive
                                ? 'text-[#CFF3CF]'
                                : 'text-[#FAF3EB] group-hover:text-[#CFF3CF]'
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                        <span className="text-xs text-stone-400 font-['Poppins'] hidden sm:inline group-hover:text-stone-200">
                          {item.note} →
                        </span>
                      </a>
                    </motion.div>
                  );
                })}
              </div>

              {/* Menu Aside Widget */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="md:col-span-4 bg-[#FAF3EB]/5 border border-white/10 rounded-3xl p-6 sm:p-7 space-y-5"
              >
                <div>
                  <span className="font-['Caveat'] text-2xl text-[#CFF3CF] block">
                    Rezerviši posetu
                  </span>
                  <h4 className="font-bold text-white text-base mt-1">
                    Upoznaj New Fitems tim
                  </h4>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                    Probni trening ili razgovor u studiju u Novoj Pazovi. Nema pritiska ni nerealnih obećanja.
                  </p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="w-full bg-[#CFF3CF] hover:bg-[#b2f0b2] text-black font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Zakaži probni termin</span>
                </button>

                <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#CFF3CF]" />
                    <span>{CONTACT_INFO.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#CFF3CF]" />
                    <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-white">
                      {CONTACT_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Footer inside Menu */}
            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
              <div className="flex items-center gap-4">
                <a
                  href={CONTACT_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#CFF3CF] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-rose-400" />
                  <span>@newfitems.novapazova</span>
                </a>
                <a
                  href={CONTACT_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#CFF3CF] transition-colors"
                >
                  <Facebook className="w-4 h-4 text-blue-400" />
                  <span>Facebook</span>
                </a>
                <a
                  href={CONTACT_INFO.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#CFF3CF] transition-colors"
                >
                  <span className="font-bold">TikTok</span>
                </a>
              </div>

              <div>
                © {new Date().getFullYear()} NEW FITEMS · Savremena teretana & EMS
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
