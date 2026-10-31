import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Clock, Users, CreditCard } from 'lucide-react';
import { PRICING_PACKAGES } from '../../data/siteData';
import { OrganicShapeBanner } from '../OrganicShapeBanner';

interface PricingPageProps {
  onOpenBooking: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenBooking }) => {
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
          <div className="flex items-center gap-2">
            <span className="font-['Caveat'] text-2xl sm:text-3xl text-stone-700">
              Jasno i transparentno
            </span>
            <span className="text-[#8ea800] font-bold text-lg">•</span>
            <span className="text-xs uppercase font-['Montserrat'] font-extrabold tracking-widest text-stone-600">
              Nova Pazova
            </span>
          </div>

          <h1 className="font-['Montserrat'] font-extrabold text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wider text-[#000000] leading-tight">
            CENOVNIK & PAKETI TRENINGA
          </h1>

          <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-normal max-w-xl">
            Izaberi program koji najviše odgovara tvojim ciljevima. Bez skrivenih troškova — u svaki paket uključeno je <strong className="text-stone-950 font-semibold">1-na-1 vođenje sa trenerima Vukom i Lazarom</strong> i kompletna oprema.
          </p>

          {/* Quick Benefit Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-300 text-xs font-semibold text-stone-900 shadow-2xs">
              <Users className="w-3.5 h-3.5 text-stone-700 shrink-0" />
              <span>1-na-1 vođenje</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-300 text-xs font-semibold text-stone-900 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-stone-700 shrink-0" />
              <span>30 min termin</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#CFF3CF] border border-stone-300 text-xs font-semibold text-stone-950 shadow-2xs">
              <CreditCard className="w-3.5 h-3.5 text-[#768c00] shrink-0" />
              <span>Moguće plaćanje na rate</span>
            </div>
          </div>

          {/* Booking CTA Button */}
          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="bg-[#000000] hover:bg-stone-900 active:scale-[0.98] text-[#CFF3CF] px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl font-['Montserrat'] font-extrabold tracking-wider text-sm sm:text-base uppercase transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <span>Zakaži besplatan probni termin</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </OrganicShapeBanner>

      {/* 2. Packages Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PRICING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all relative ${
                pkg.popular
                  ? 'bg-[#000000] text-[#FAF3EB] shadow-2xl ring-2 ring-[#c4e117]/60'
                  : 'bg-white text-stone-900 border border-stone-300/80 shadow-xs hover:border-black'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 right-6 bg-[#c4e117] text-black text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md font-['Montserrat'] font-extrabold">
                  {pkg.badge}
                </div>
              )}

              <div>
                <div className="mb-4">
                  {!pkg.popular && (
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 inline-block mb-2">
                      {pkg.badge}
                    </span>
                  )}
                  <h3 className="font-['Montserrat'] font-extrabold text-2xl uppercase tracking-wider">
                    {pkg.name}
                  </h3>
                  <p className={`text-xs mt-1.5 leading-relaxed ${
                    pkg.popular ? 'text-stone-300' : 'text-stone-600'
                  }`}>
                    {pkg.description}
                  </p>
                </div>

                {/* Price display */}
                <div className="py-4 border-y border-stone-200/20 my-4">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-['Montserrat'] font-extrabold text-4xl sm:text-5xl tracking-tight">
                      {pkg.price}
                    </span>
                    <span className={`text-sm font-semibold ${
                      pkg.popular ? 'text-[#c4e117]' : 'text-stone-600'
                    }`}>
                      RSD
                    </span>
                  </div>
                  <div className={`text-xs mt-1 ${
                    pkg.popular ? 'text-stone-300' : 'text-stone-600'
                  }`}>
                    {pkg.period} {pkg.installments && `· ${pkg.installments}`}
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-3 py-2">
                  <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                    pkg.popular ? 'text-[#c4e117]' : 'text-stone-700'
                  }`}>
                    Šta paket obuhvata:
                  </span>
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 ${
                        pkg.popular ? 'bg-[#c4e117] text-black' : 'bg-stone-100 text-stone-900'
                      }`}>
                        ✓
                      </span>
                      <span className={pkg.popular ? 'text-stone-200' : 'text-stone-700'}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-200/20">
                <button
                  onClick={onOpenBooking}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    pkg.popular
                      ? 'bg-[#c4e117] hover:bg-[#b0cb13] text-black shadow-md font-sans font-bold'
                      : 'bg-[#000000] hover:bg-stone-900 text-white'
                  }`}
                >
                  <span>Izaberi ovaj paket</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* 3. Transparency & Consultation Note */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-300/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#c4e117] text-black flex items-center justify-center font-bold shrink-0 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-['Montserrat'] font-extrabold text-lg sm:text-xl uppercase tracking-wide text-black">
                Nisi siguran/na koji paket je najbolji za tebe?
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                Dođi na uvodni razgovor u studiju, Vuk i Lazar će analizirati tvoje ciljeve i preporučiti idealan raspored.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="bg-[#000000] hover:bg-stone-900 text-[#CFF3CF] px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer transition-all shadow-xs"
          >
            Konsultuj se sa nama
          </button>
        </div>
      </div>

    </div>
  );
};
