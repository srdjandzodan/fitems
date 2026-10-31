import React from 'react';
import { Menu, Calendar, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../data/siteData';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
  onOpenMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenBooking,
  onOpenMenu,
}) => {
  const pages = [
    { id: 'home', label: 'Početna', path: '/' },
    { id: 'concept', label: 'Brend Koncept', path: '/koncept' },
    { id: 'services', label: 'Sprave & EMS', path: '/usluge' },
    { id: 'stories', label: 'Iskustva', path: '/iskustva' },
    { id: 'pricing', label: 'Cenovnik', path: '/cenovnik' },
    { id: 'contact', label: 'Lokacija', path: '/kontakt' },
  ];

  const isConcept = activePage === 'concept';

  return (
    <header
      className={`transition-colors duration-300 ${
        isConcept
          ? 'max-md:absolute max-md:top-0 max-md:left-0 max-md:right-0 max-md:bg-transparent max-md:border-none max-md:shadow-none max-md:backdrop-blur-none sticky top-0 z-30 md:bg-stone-950/90 md:backdrop-blur-md md:border-b md:border-white/10 text-white'
          : 'sticky top-0 z-30 bg-[#FAF3EB]/90 backdrop-blur-md border-b border-stone-300/60 text-stone-900'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            title="NEW FITEMS Početna"
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <img
              src="/assets/aistudio/download_03664904.png"
              alt="NEW FITEMS EMS Trening Studio Nova Pazova Logo"
              width="140"
              height="40"
              className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div
              className={`hidden lg:flex flex-col border-l pl-3 transition-colors ${
                isConcept ? 'border-white/20' : 'border-stone-300'
              }`}
            >
              <span
                className={`font-['Montserrat'] font-extrabold tracking-wider text-xs uppercase leading-tight ${
                  isConcept ? 'text-white' : 'text-stone-900'
                }`}
              >
                Nova Pazova
              </span>
              <span
                className={`font-['Caveat'] text-sm leading-tight ${
                  isConcept ? 'text-[#c4e117]' : 'text-[#838487]'
                }`}
              >
                savremeni EMS studio
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Page Switcher Nav */}
        <nav
          aria-label="Glavna navigacija"
          className={`hidden md:flex items-center gap-1 lg:gap-2 p-1.5 rounded-full border transition-colors ${
            isConcept
              ? 'bg-stone-900/80 border-white/15'
              : 'bg-stone-200/50 border-stone-300/50'
          }`}
        >
          {pages.map((p) => {
            const isActive = activePage === p.id;
            return (
              <a
                key={p.id}
                href={p.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(p.id);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? isConcept
                      ? 'bg-[#c4e117] text-black shadow-xs font-bold'
                      : 'bg-[#000000] text-[#CFF3CF] shadow-xs'
                    : isConcept
                      ? 'text-stone-300 hover:text-white hover:bg-white/10'
                      : 'text-stone-700 hover:text-black hover:bg-white/60'
                }`}
              >
                {p.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA + Full Screen Menu Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className={`hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer group ${
              isConcept
                ? 'bg-[#c4e117] hover:bg-[#b0cb13] text-black shadow-[0_0_15px_rgba(196,225,23,0.3)] font-bold'
                : 'bg-[#000000] hover:bg-stone-900 text-[#CFF3CF]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span>Probni trening</span>
          </button>

          {/* Cool Animated Menu Trigger Button */}
          <button
            onClick={onOpenMenu}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs border ${
              isConcept
                ? 'bg-white/15 hover:bg-white/25 text-white border-white/20'
                : 'bg-[#CFF3CF] text-black hover:bg-[#bbf0bb] border-stone-300/40'
            }`}
            aria-label="Otvori navigacioni meni"
          >
            <span className="hidden sm:inline">Meni</span>
            <Menu className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
