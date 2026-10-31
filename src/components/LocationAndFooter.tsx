import React from 'react';
import { MapPin, Phone, Instagram, Facebook, Mail, ExternalLink, Clock, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../data/siteData';

interface LocationAndFooterProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const LocationAndFooter: React.FC<LocationAndFooterProps> = ({
  onNavigate,
  onOpenBooking
}) => {
  return (
    <footer className="bg-[#000000] text-[#FAF3EB] pt-14 pb-24 md:pb-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10 items-start">
          
          {/* Logo & Concept column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://64.media.tumblr.com/4c9afc8a1321f2ee4a9d3a0bc5032ec4/e27a06b482c9590f-11/s2048x3072/30d185a435993ee9d11123fa54d43579535e5139.jpg"
                alt="New Fit EMS Logo"
                referrerPolicy="no-referrer"
                className="h-9 sm:h-11 w-auto object-contain"
              />
              <span className="font-['Caveat'] text-2xl text-[#CFF3CF]">
                Nova Pazova
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Savremeni EMS fitness studio sa modernim spravama i kratkim treninzima od 30 minuta, idealnim za zauzete žene i muškarce koji žele maksimalne efekte.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#CFF3CF] hover:text-black flex items-center justify-center transition-colors text-white"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={CONTACT_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#CFF3CF] hover:text-black flex items-center justify-center transition-colors text-white"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={CONTACT_INFO.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#CFF3CF] hover:text-black flex items-center justify-center transition-colors text-white text-xs font-bold"
                title="TikTok"
              >
                Tk
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#CFF3CF] hover:text-black flex items-center justify-center transition-colors text-white"
                title="Email upit"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Page Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-['Montserrat'] font-extrabold text-sm uppercase tracking-wider text-stone-300 block">
              Stranice sajta
            </span>
            <nav aria-label="Footer navigacija" className="flex flex-col gap-2 text-xs text-stone-400">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('home');
                }}
                className="text-left hover:text-[#CFF3CF] transition-colors cursor-pointer"
              >
                Početna
              </a>
              <a
                href="/koncept"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('concept');
                }}
                className="text-left hover:text-[#CFF3CF] transition-colors cursor-pointer"
              >
                Brend koncept & tim
              </a>
              <a
                href="/usluge"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('services');
                }}
                className="text-left hover:text-[#CFF3CF] transition-colors cursor-pointer"
              >
                EMS treninzi & sprave
              </a>
              <a
                href="/iskustva"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('stories');
                }}
                className="text-left hover:text-[#CFF3CF] transition-colors cursor-pointer"
              >
                Iskustva klijenata
              </a>
              <a
                href="/cenovnik"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('pricing');
                }}
                className="text-left hover:text-[#CFF3CF] transition-colors cursor-pointer"
              >
                Cenovnik & paketi
              </a>
              <a
                href="/kontakt"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                }}
                className="text-left hover:text-[#CFF3CF] transition-colors cursor-pointer"
              >
                Lokacija & kontakt
              </a>
            </nav>
          </div>

          {/* Studio Contact Info */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-['Montserrat'] font-extrabold text-sm uppercase tracking-wider text-stone-300 block">
              Studio & Zakazivanje
            </span>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#CFF3CF] shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#CFF3CF] shrink-0" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-white">
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#CFF3CF] shrink-0" />
                <span>Ponedeljak – Subota, po zakazanim terminima</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="bg-[#CFF3CF] hover:bg-[#b5f0b5] text-black font-['Montserrat'] font-extrabold uppercase text-xs tracking-wider px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Zakaži probni termin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <div>
            © {new Date().getFullYear()} NEW FITEMS · Savremeni fitness studio Nova Pazova.
          </div>
          <div className="flex items-center gap-4 text-stone-400 text-[11px]">
            <span>EMS tehnologija</span>
            <span>•</span>
            <span>Vakum kapsula</span>
            <span>•</span>
            <span>Maderoterapija</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
