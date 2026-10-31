import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, Sparkles, ArrowRight, Activity, Zap, Flame } from 'lucide-react';
import { SERVICES } from '../../data/siteData';
import { ShapeDivider } from '../ShapeDivider';

interface ServicesPageProps {
  onOpenBooking: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentService = SERVICES[selectedIndex];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? SERVICES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === SERVICES.length - 1 ? 0 : prev + 1));
  };

  const equipmentList = SERVICES.filter((s) => s.image);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-14">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="font-['Caveat'] text-3xl text-stone-600 block">
          Sprave & Programi
        </span>
        <h1 className="font-['Montserrat'] font-extrabold text-3xl sm:text-5xl uppercase tracking-wider text-[#000000]">
          SAVREMENA TEHNOLOGIJA ZA MAKSIMALAN UČINAK
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 font-normal">
          Upoznaj svaku od naših sprava sa namenskim vođenim treningom od 30 minuta:
        </p>
      </div>

      {/* 1. Grid of 3 Equipment Cards with the Shape Divider Effect & Real Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {equipmentList.map((eq, idx) => (
          <motion.div
            key={eq.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            className={`bg-white rounded-3xl border shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group ${
              selectedIndex === idx ? 'border-black ring-2 ring-black/10' : 'border-stone-300/80'
            }`}
          >
            <div>
              {/* Photo Banner with Shape Divider */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-stone-900">
                <img
                  src={eq.image}
                  alt={eq.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/30" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-[#c4e117] text-black">
                    Sprava #{idx + 1}
                  </span>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-white">
                    <Clock className="w-3 h-3 text-[#c4e117]" />
                    <span>30&nbsp;min</span>
                  </div>
                </div>

                {/* Title over dark overlay for instant recognition */}
                <div className="absolute bottom-10 left-5 right-5 z-10">
                  <h3 className="font-['Montserrat'] font-extrabold text-xl sm:text-2xl uppercase tracking-wider text-white drop-shadow-md leading-tight">
                    {eq.title}
                  </h3>
                  <span className="text-xs text-[#CFF3CF] font-medium block mt-0.5">
                    {eq.subtitle}
                  </span>
                </div>

                {/* White Diagonal Layered Wave Shape Divider Transitioning into White Card Body */}
                <div className="absolute -bottom-[1px] left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
                  <ShapeDivider
                    type="diagonal-layered-waves"
                    height={50}
                    color="#ffffff"
                    accentColor="rgba(255, 255, 255, 0.45)"
                  />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 pt-3 space-y-4">
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal line-clamp-3">
                  {eq.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Glavni efekti:
                  </span>
                  {eq.benefits.slice(0, 3).map((b, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-xs text-stone-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8ea800] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0 space-y-2">
              <button
                onClick={() => {
                  setSelectedIndex(idx);
                  window.scrollTo({ top: 750, behavior: 'smooth' });
                }}
                className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  selectedIndex === idx
                    ? 'bg-black text-[#CFF3CF]'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-900'
                }`}
              >
                <span>Detaljan pregled postupka</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenBooking}
                className="w-full bg-[#c4e117] hover:bg-[#b0cb13] text-black font-['Montserrat'] font-extrabold uppercase tracking-wider py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Zakaži probni termin</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 2. Interactive Service Selector Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 bg-white p-2 rounded-2xl border border-stone-300/80 shadow-xs">
        {SERVICES.map((s, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedIndex(idx)}
              className={`p-3 rounded-xl text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#000000] text-[#CFF3CF] shadow-xs'
                  : 'bg-transparent text-stone-700 hover:bg-[#FAF3EB]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                  0{idx + 1}.
                </span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-[#CFF3CF]" />}
              </div>
              <div className="font-['Montserrat'] font-extrabold text-xs sm:text-sm uppercase tracking-wide truncate">
                {s.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Detailed Interactive Showcase Card with Image & Shape Divider */}
      <div className="relative">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-300/80 shadow-lg overflow-hidden">
          
          {/* Top Slider Navigation Controls */}
          <div className="flex items-center justify-between pb-6 border-b border-stone-100 mb-8">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#CFF3CF] text-black">
                {currentService.tag}
              </span>
              <span className="text-xs text-stone-400 font-medium">
                {currentService.duration}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-stone-300 hover:border-black flex items-center justify-center transition-colors text-stone-700 cursor-pointer"
                aria-label="Prethodna sprava"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold text-stone-500 px-2">
                {selectedIndex + 1} od {SERVICES.length}
              </span>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-stone-300 hover:border-black flex items-center justify-center transition-colors text-stone-700 cursor-pointer"
                aria-label="Sledeća sprava"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Animated Detail Presentation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentService.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              
              <div className="lg:col-span-7 space-y-5">
                <h2 className="font-['Montserrat'] font-extrabold text-3xl sm:text-4xl uppercase tracking-wider text-[#000000]">
                  {currentService.title}
                </h2>

                <p className="font-['Caveat'] text-2xl text-stone-600">
                  {currentService.subtitle}
                </p>

                <p className="text-sm text-stone-700 leading-relaxed font-normal">
                  {currentService.description}
                </p>

                {/* Key Benefits List */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                    Ključne prednosti tretmana:
                  </span>
                  {currentService.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800">
                      <CheckCircle2 className="w-4 h-4 text-[#8ea800] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF3EB] border border-stone-200/80 text-xs">
                  <strong className="text-stone-900 block mb-0.5 font-bold uppercase tracking-wider">
                    Za koga je namenjeno:
                  </strong>
                  <span className="text-stone-600">{currentService.forWho}</span>
                </div>
              </div>

              {/* Right Side Visual Box with Photo & Shape Divider */}
              <div className="lg:col-span-5 bg-stone-950 text-[#FAF3EB] rounded-3xl border border-white/10 shadow-xl overflow-hidden flex flex-col justify-between relative group">
                
                {/* Photo Header with Shape Divider */}
                {currentService.image ? (
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                    <img
                      src={currentService.image}
                      alt={currentService.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/30" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="font-['Caveat'] text-2xl text-[#CFF3CF] drop-shadow-md">
                        Vođeni postupak
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-[#c4e117] text-black">
                        1-na-1
                      </span>
                    </div>

                    {/* Shape Divider inside machine card */}
                    <div className="absolute -bottom-[1px] left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
                      <ShapeDivider
                        type="diagonal-layered-waves"
                        height={46}
                        color="#0c0a09"
                        accentColor="rgba(196, 225, 23, 0.45)"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-6 pb-0">
                    <div className="w-12 h-12 rounded-2xl bg-[#CFF3CF] text-black flex items-center justify-center font-bold">
                      <Activity className="w-6 h-6" />
                    </div>
                  </div>
                )}

                {/* Inner Content */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div>
                    <span className="font-['Caveat'] text-2xl text-[#CFF3CF] block">
                      Individualni pristup
                    </span>
                    <h3 className="font-['Montserrat'] font-extrabold text-2xl uppercase tracking-wider text-white">
                      KORAK PO KORAK
                    </h3>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed font-normal">
                    Pre svakog početka prolazimo uvodnu konsultaciju, podešavamo odelo i parametre tačno prema tvom telu. Sve vreme si u rukama Vuka i Lazara.
                  </p>

                  <div className="pt-3 border-t border-white/10 space-y-2.5">
                    <button
                      onClick={onOpenBooking}
                      className="w-full bg-[#c4e117] hover:bg-[#b0cb13] text-black font-['Montserrat'] font-extrabold uppercase tracking-wider py-3.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span>Isprobaj ovu spravu na probnom terminu</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[11px] text-center text-stone-400">
                      Kralja Petra I 87, Nova Pazova · Rezervacija unapred
                    </p>
                  </div>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>

    </div>
  );
};

