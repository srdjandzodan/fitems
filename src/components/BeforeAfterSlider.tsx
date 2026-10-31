import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeftRight, ArrowRight, CheckCircle2, User, UserCheck, Sparkles, ShieldCheck } from 'lucide-react';

interface TransformationItem {
  id: 'zena' | 'muskarac';
  title: string;
  subtitle: string;
  period: string;
  badge: string;
  beforeImg: string;
  afterImg: string;
  details: string[];
}

const TRANSFORMATIONS: TransformationItem[] = [
  {
    id: 'zena',
    title: 'Transformacija · Ženski program',
    subtitle: 'EMS Vođeni Trening + Vakum sa IR Svetlima',
    period: '8 nedelja (2× nedeljno)',
    badge: 'Individualno prilagođen program',
    beforeImg: 'https://64.media.tumblr.com/e7b242fe3182b264b6e62e40c63298e5/888341b81c0db6d0-04/s1280x1920/40465a2df5ab9f66115a19f21f652e83490dc596.jpg',
    afterImg: 'https://64.media.tumblr.com/99cea156ff1d6d6b2e52c2e082a0d43d/888341b81c0db6d0-40/s1280x1920/e629a49abf446ca957e8ff827dcb779be21f23e1.jpg',
    details: [
      'Vidno zategnuta i oblikovana linija tela',
      'Efikasno izbacivanje viška zadržane vode i otoka',
      'Primetno glađa koža i manji celulit uz madero roler',
      'Povećana energija i osećaj lakoće nakon svakog termina'
    ]
  },
  {
    id: 'muskarac',
    title: 'Transformacija · Muški program',
    subtitle: 'EMS Trening & Duboka Stimulacija',
    period: '6 nedelja (2× nedeljno)',
    badge: 'Kondicija, snaga i držanje tela',
    beforeImg: 'https://64.media.tumblr.com/b049f88dfafa109fb61bae96ddeba8db/888341b81c0db6d0-23/s1280x1920/730642fe197e923f777321c04c7a560a2388e712.jpg',
    afterImg: 'https://64.media.tumblr.com/cf92e5b2a06850a833352b0fe54d2a60/888341b81c0db6d0-e4/s1280x1920/e27feb93d224d042f34a384108703afd0e8f301b.jpg',
    details: [
      'Izražena definicija i vidno uspravnije držanje tela',
      'Aktivacija dubokih stabilizatora i jezgra tela',
      'Otklanjanje ukočenosti i bolova usled dugotrajnog sedenja',
      'Značajno veći nivo svakodnevne snage i izdržljivosti'
    ]
  }
];

interface BeforeAfterSliderProps {
  onOpenBooking: () => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'zena' | 'muskarac'>('zena');
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentItem = TRANSFORMATIONS.find(t => t.id === activeTab) || TRANSFORMATIONS[0];

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/10 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-['Caveat'] text-2xl sm:text-3xl text-[#CFF3CF]">
                Rezultati koji govore sami za sebe
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
              Prevuci liniju levo-desno i uporedi stvarnu promenu kod naših članova u Novoj Pazovi.
            </p>
          </div>

          {/* Toggle Buttons: Žena vs Muškarac */}
          <div className="flex items-center gap-2 bg-stone-900/90 p-1.5 rounded-2xl border border-white/15 self-start md:self-auto shrink-0">
            <button
              onClick={() => {
                setActiveTab('zena');
                setSliderPos(50);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-['Montserrat'] font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'zena'
                  ? 'bg-[#c4e117] text-black shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Žena</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('muskarac');
                setSliderPos(50);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-['Montserrat'] font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'muskarac'
                  ? 'bg-[#c4e117] text-black shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Muškarac</span>
            </button>
          </div>
        </div>

        {/* Interactive Comparison Split Slider Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Column: The Interactive Split Viewer in 9:16 Aspect Ratio */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              ref={containerRef}
              onMouseDown={(e) => handlePointerDown(e.clientX)}
              onTouchStart={(e) => {
                if (e.touches[0]) handlePointerDown(e.touches[0].clientX);
              }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 select-none cursor-ew-resize bg-stone-950 group touch-none"
            >
              {/* Layer 1: "POSLE" (Full background image) */}
              <img
                src={currentItem.afterImg}
                alt={`${currentItem.title} - Posle`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
              />

              {/* Layer 2: "PRE" (Clipped overlay image on left side via polygon clip-path) */}
              <div
                className="absolute inset-0 pointer-events-none select-none overflow-hidden"
                style={{
                  clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                  WebkitClipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
                }}
              >
                <img
                  src={currentItem.beforeImg}
                  alt={`${currentItem.title} - Pre`}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
                />
              </div>

              {/* Badges: PRE (Top Left) & POSLE (Top Right) */}
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

              {/* Divider Line & Interactive Grab Handle */}
              <div
                className="absolute top-0 bottom-0 z-30 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Vertical Divider Line */}
                <div className="absolute inset-y-0 -left-[1.5px] w-[3px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.95)]" />

                {/* Circular Center Handle with arrows */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-5 w-10 h-10 rounded-full bg-white text-black border-2 border-[#c4e117] shadow-xl flex items-center justify-center pointer-events-auto cursor-ew-resize transition-transform group-hover:scale-110 active:scale-95">
                  <ArrowLeftRight className="w-4 h-4 text-black" />
                </div>
              </div>

              {/* Bottom Instruction pill */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wide bg-black/75 backdrop-blur-md text-stone-200 border border-white/15 shadow-sm whitespace-nowrap">
                  ⟵ Prevuci za poređenje ⟶
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Information, Program Details & Call to Action */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c4e117]/15 border border-[#c4e117]/30 text-xs font-semibold text-[#c4e117] mb-2.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{currentItem.subtitle}</span>
                  </div>
                  <h3 className="font-['Montserrat'] font-extrabold text-3xl sm:text-4xl uppercase tracking-wider text-white">
                    {currentItem.title}
                  </h3>
                </div>

                {/* Program Overview Info Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/15 space-y-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm text-stone-300 font-medium pb-3 border-b border-white/10">
                    <span className="text-stone-400 uppercase tracking-wider font-semibold">Trajanje programa:</span>
                    <strong className="text-white font-['Montserrat'] font-extrabold tracking-wider uppercase text-sm sm:text-base">
                      {currentItem.period}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-stone-300 font-medium">
                    <span className="text-stone-400 uppercase tracking-wider font-semibold">Fokus:</span>
                    <span className="text-[#c4e117] font-semibold">{currentItem.badge}</span>
                  </div>
                </div>

                {/* Key Benefits Checklist */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                    Postignuti efekti:
                  </span>
                  {currentItem.details.map((d, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-200">
                      <CheckCircle2 className="w-4 h-4 text-[#c4e117] shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <button
                    onClick={onOpenBooking}
                    className="w-full bg-[#c4e117] hover:bg-[#b0cb13] active:scale-[0.98] text-black font-['Montserrat'] font-extrabold uppercase tracking-wider py-4 rounded-2xl text-sm transition-all shadow-[0_0_25px_rgba(196,225,23,0.4)] flex items-center justify-center gap-2.5 cursor-pointer group"
                  >
                    <span>Zakaži probni termin i kreni</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[11px] text-center text-stone-400 mt-2.5">
                    Studio u Novoj Pazovi · Vođeni treninzi sa Vukom i Lazarom
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
