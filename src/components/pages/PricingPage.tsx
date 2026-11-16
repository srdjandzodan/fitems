import React from 'react';
import { ArrowRight, ShieldCheck, Clock, Users, Sparkles } from 'lucide-react';
import { PRICING_PACKAGES } from '../../data/siteData';
import { OrganicShapeBanner } from '../OrganicShapeBanner';
import { BlackFridayCountdown } from '../BlackFridayCountdown';

interface PricingPageProps {
  onOpenBooking: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenBooking }) => {
  const pkg = PRICING_PACKAGES[0];

  return (
    <div className="space-y-12 pb-16 overflow-hidden">
      
      {/* 1. Cenovnik Hero with background image on LEFT and organic shape divider covering RIGHT */}
      <OrganicShapeBanner
        imagePosition="left"
        imageSrc="https://64.media.tumblr.com/7b1c6284676c98713e149ec851cce6eb/822f13a412d29853-53/s2048x3072/8d5e2a3040cb212763ededa0c87bb9b379e0910b.jpg"
        imageAlt="New Fit EMS Studio Nova Pazova Cenovnik"
        className="-mt-4 sm:-mt-8"
      >
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center px-3 py-1 rounded-md bg-black text-[#c4e117] font-['Montserrat'] font-extrabold text-xs uppercase tracking-wider">
              {pkg.badge}
            </span>
            <span className="text-xs uppercase font-['Montserrat'] font-extrabold tracking-widest text-stone-600">
              Nova Pazova
            </span>
          </div>

          <h1 className="font-['Montserrat'] font-extrabold text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wider text-[#000000] leading-tight">
            3u1 PAKET · BLACK FRIDAY PONUDA
          </h1>

          <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-normal max-w-xl">
            Tri tretmana u jednom dolasku: <strong className="text-stone-950 font-semibold">vakuum trening, madero roller i EMS tretman</strong>. Ukupno 75 minuta, dva puta nedeljno — sa trenerom uz tebe od prvog do poslednjeg minuta.
          </p>

          {/* Clean unboxed key facts */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs font-semibold text-stone-800">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-black shrink-0" />
              75 min po dolasku
            </span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-black shrink-0" />
              Trener uz tebe sve vreme
            </span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span className="inline-flex items-center gap-1.5 text-stone-950">
              <Sparkles className="w-3.5 h-3.5 text-[#768c00] shrink-0" />
              Ušteda {pkg.savings}
            </span>
          </div>

          <div className="pt-1">
            <BlackFridayCountdown variant="light" compact />
          </div>

          {/* Booking CTA Button */}
          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="bg-[#c4e117] hover:bg-[#b5d014] active:scale-[0.98] text-black px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl font-['Montserrat'] font-extrabold tracking-wider text-sm sm:text-base uppercase transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <span>Želim 3u1 paket</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </OrganicShapeBanner>

      {/* 2. Single Focused Black Friday Offer Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="bg-[#000000] text-[#FAF3EB] rounded-3xl p-7 sm:p-10 lg:p-12 shadow-2xl ring-2 ring-[#c4e117]/70 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Details */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <span className="inline-block bg-[#c4e117] text-black text-[11px] font-['Montserrat'] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-md mb-3">
                  {pkg.badge}
                </span>
                <h2 className="font-['Montserrat'] font-extrabold text-3xl sm:text-4xl uppercase tracking-wider text-white">
                  {pkg.name}
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-white/10">
                {pkg.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <span className="w-5 h-5 rounded-full bg-[#c4e117] text-black flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-stone-100 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Price Box */}
            <div className="md:col-span-5 bg-white/5 border border-white/15 rounded-2xl p-6 space-y-4">
              <div>
                <div className="text-sm text-stone-400 line-through tabular-nums">
                  {pkg.regularPrice} {pkg.currency}
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-['Montserrat'] font-extrabold text-4xl sm:text-5xl tracking-tight text-white tabular-nums">
                    {pkg.price}
                  </span>
                  <span className="text-base font-bold text-[#c4e117]">
                    {pkg.currency}
                  </span>
                </div>
                <div className="text-xs text-stone-300 mt-1 font-medium">
                  {pkg.period}
                </div>
              </div>

              <p className="text-xs text-[#CFF3CF] leading-relaxed pt-3 border-t border-white/10 font-medium">
                {pkg.deadlineNote}
              </p>

              <button
                onClick={onOpenBooking}
                className="w-full py-4 rounded-xl text-xs font-['Montserrat'] font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer bg-[#c4e117] hover:bg-[#b5d014] text-black shadow-md"
              >
                <span>Želim 3u1 paket</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* 3. Consultation Note */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-300/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#c4e117] text-black flex items-center justify-center font-bold shrink-0 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-['Montserrat'] font-extrabold text-lg sm:text-xl uppercase tracking-wide text-black">
                Imaš pitanje pre prijave?
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                Ostavi nam broj telefona, a naš tim te zove u roku od 24h da odgovorimo na sva pitanja i izaberemo termine.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="bg-[#000000] hover:bg-stone-900 text-[#CFF3CF] px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer transition-all shadow-xs whitespace-nowrap"
          >
            Rezerviši svoj termin
          </button>
        </div>
      </div>

    </div>
  );
};
