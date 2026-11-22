import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowLeftRight, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

const TRANSFORMATION = {
  id: 'zena',
  title: 'Transformacija · 3u1 program',
  subtitle: '3u1 program · Vakuum trening + Madero roller + EMS tretman',
  period: '8 nedelja (2× nedeljno)',
  badge: 'Rezultat iz 3u1 programa',
  beforeImg: '/images/transformacija-pre.jpg',
  afterImg: '/images/transformacija-posle.jpg',
  details: [
    'Vidno zategnuta i oblikovana linija tela',
    'Efikasno izbacivanje viška zadržane vode i otoka',
    'Primetno glađa koža i manji celulit uz madero roller',
    'Povećana energija i osećaj lakoće nakon svakog termina',
  ],
};

interface BeforeAfterSliderProps {
  onOpenBooking: () => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onOpenBooking }) => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handlePointerDown = (clientX: number) => {
    setIsDragging(true);
    updatePosition(clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX);
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        updatePosition(e.touches[0].clientX);
      }
    };

    const onTouchEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, updatePosition]);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-[#000000] text-[#FAF3EB] rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/10 shadow-2xl relative overflow-hidden">

        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c4e117]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#CFF3CF]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Section Header */}
        <div className="mb-8 pb-6 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-['Caveat'] text-2xl sm:text-3xl text-[#CFF3CF]">
              Stvarna promena iz 3u1 programa
            </span>
            <span className="text-[#c4e117] font-bold text-lg">•</span>
            <span className="text-xs uppercase font-['Montserrat'] font-extrabold tracking-widest text-stone-400">
              Pre & Posle
            </span>
          </div>
          <h2 className="font-['Montserrat'] font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wider text-white">
            PRE I POSLE NAS
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl font-normal">
            Prevuci liniju levo-desno i pogledaj stvaran rezultat naše članice iz 3u1 programa u Novoj Pazovi.
          </p>
        </div>

        {/* Interactive Comparison Split Slider Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

          {/* Left Column: Interactive Split Viewer aligned 1:1 to 488x1252 */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              ref={containerRef}
              onMouseDown={(e) => handlePointerDown(e.clientX)}
              onTouchStart={(e) => {
                if (e.touches[0]) handlePointerDown(e.touches[0].clientX);
              }}
              className="relative w-full max-w-[260px] sm:max-w-[285px] aspect-[488/1252] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 select-none cursor-ew-resize bg-stone-950 group touch-none"
            >
              {/* Layer 1: "POSLE" */}
              <img
                src={TRANSFORMATION.afterImg}
                alt={`${TRANSFORMATION.title} - Posle`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
              />

              {/* Layer 2: "PRE" */}
              <div
                className="absolute inset-0 pointer-events-none select-none overflow-hidden"
                style={{
                  clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                  WebkitClipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                }}
              >
                <img
                  src={TRANSFORMATION.beforeImg}
                  alt={`${TRANSFORMATION.title} - Pre`}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
                />
              </div>

              {/* Badges: PRE & POSLE */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-['Montserrat'] font-extrabold uppercase tracking-wider bg-black/80 backdrop-blur-md text-white border border-white/25 shadow-md">
                  Pre
                </span>
              </div>
              <div className="absolute top-4 right-4 z-20 pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-['Montserrat'] font-extrabold uppercase tracking-wider bg-[#c4e117] text-black font-bold shadow-[0_0_15px_rgba(196,225,23,0.6)]">
                  Posle
                </span>
              </div>

              {/* Divider Line & Grab Handle */}
              <div
                className="absolute top-0 bottom-0 z-30 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute inset-y-0 -left-[1.5px] w-[3px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.95)]" />
                <div className="absolute top-1/2 -translate-y-1/2 -left-5 w-10 h-10 rounded-full bg-white text-black border-2 border-[#c4e117] shadow-xl flex items-center justify-center pointer-events-auto cursor-ew-resize transition-transform group-hover:scale-110 active:scale-95">
                  <ArrowLeftRight className="w-4 h-4 text-black" />
                </div>
              </div>

              {/* Bottom Instruction */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wide bg-black/75 backdrop-blur-md text-stone-200 border border-white/15 shadow-sm whitespace-nowrap">
                  ⟵ Prevuci za poređenje ⟶
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Program Details & Call to Action */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c4e117]/15 border border-[#c4e117]/30 text-xs font-semibold text-[#c4e117] mb-2.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{TRANSFORMATION.subtitle}</span>
              </div>
              <h3 className="font-['Montserrat'] font-extrabold text-3xl sm:text-4xl uppercase tracking-wider text-white">
                {TRANSFORMATION.title}
              </h3>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/15 space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm text-stone-300 font-medium pb-3 border-b border-white/10">
                <span className="text-stone-400 uppercase tracking-wider font-semibold">Trajanje programa:</span>
                <strong className="text-white font-['Montserrat'] font-extrabold tracking-wider uppercase text-sm sm:text-base tabular-nums">
                  {TRANSFORMATION.period}
                </strong>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm text-stone-300 font-medium">
                <span className="text-stone-400 uppercase tracking-wider font-semibold">Fokus:</span>
                <span className="text-[#c4e117] font-semibold">{TRANSFORMATION.badge}</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                Postignuti efekti:
              </span>
              {TRANSFORMATION.details.map((d, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-[#c4e117] shrink-0 mt-0.5" />
                  <span>{d}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full bg-[#c4e117] hover:bg-[#b0cb13] active:scale-[0.98] text-black font-['Montserrat'] font-extrabold uppercase tracking-wider py-4 rounded-2xl text-sm transition-all shadow-[0_0_25px_rgba(196,225,23,0.4)] flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <span>Rezerviši svoj termin</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[11px] text-center text-stone-400 mt-2.5">
                Studio u Novoj Pazovi · Vođeni treninzi sa trenerom uz tebe sve vreme
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
