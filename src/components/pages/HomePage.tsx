import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Clock,
  Users,
  Zap,
  ChevronLeft,
  ChevronRight,
  Play,
  Instagram,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { CONTACT_INFO, INSTAGRAM_HIGHLIGHTS, INSTAGRAM_REELS, InstagramReel } from '../../data/siteData';
import { InstagramReelModal } from '../InstagramReelModal';
import { ShapeDivider } from '../ShapeDivider';
import { OrganicShapeBanner } from '../OrganicShapeBanner';
import { BeforeAfterSlider } from '../BeforeAfterSlider';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBooking }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedReel, setSelectedReel] = useState<InstagramReel | null>(null);
  const [reelSlideIndex, setReelSlideIndex] = useState(0);

  const heroSlides = [
    {
      tag: "30\u00A0MINUTA · MAKSIMALNI UČINAK",
      title: "EMS Trening & Stimulacija",
      desc: "Preko 90% aktiviranih mišićnih vlakana u samo 30\u00A0minuta vođenog treninga. Idealan za zaposlene žene i muškarce koji nemaju sate za klasičnu teretanu.",
      badge: "Sprava\u00A0#1",
      image: "https://64.media.tumblr.com/78b135ec5509e73cc4afe1e85ec4317b/822f13a412d29853-5b/s2048x3072/9be4a61ff24135879e903a852e495094cc7e68f7.jpg",
    },
    {
      tag: "INFRACRVENA CIRKULACIJA",
      title: "Vakum Kapsula sa IR Svetlima",
      desc: "Topi uporne masne naslage na stomaku, bokovima i butinama, poboljšava mikrocirkulaciju i podstiče efikasno izbacivanje zadržane vode.",
      badge: "Sprava\u00A0#2",
      image: "https://64.media.tumblr.com/fec0be0b29e6d5f4f2cbd57edd261ad7/822f13a412d29853-57/s2048x3072/6dfd9655f65c52e15b59451da6b2cecf8845d6ac.jpg",
    },
    {
      tag: "ZATEZANJE I RELAKSACIJA",
      title: "Madero Roler Terapija",
      desc: "Mehanička masaža anatomskim drvenim rolerima posle treninga koja pegla celulit, zateže kožu i pruža prijatan oporavak muskulature.",
      badge: "Sprava\u00A0#3",
      image: "https://64.media.tumblr.com/14f5653bb31d374ba0bf4b77cc72e5bb/822f13a412d29853-f1/s2048x3072/dde0f364bf813796496bcd845be9510bf1cf26cc.jpg",
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Video carousel navigation: on mobile moves 1 by 1, on desktop slides through 6 reels
  const totalReels = INSTAGRAM_REELS.length;
  const nextReel = () => {
    setReelSlideIndex((prev) => (prev + 1) % totalReels);
  };

  const prevReel = () => {
    setReelSlideIndex((prev) => (prev - 1 + totalReels) % totalReels);
  };

  // Visible reels on desktop: 3 at a time starting from reelSlideIndex
  const visibleReelsDesktop = [
    INSTAGRAM_REELS[reelSlideIndex % totalReels],
    INSTAGRAM_REELS[(reelSlideIndex + 1) % totalReels],
    INSTAGRAM_REELS[(reelSlideIndex + 2) % totalReels],
  ];

  // Common scroll reveal motion props for smooth lazy-loading effect
  const fadeInUp = {
    initial: { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6, ease: 'easeOut' as const }
  };

  return (
    <div className="space-y-14 sm:space-y-20 pb-12 overflow-hidden">
      
      {/* 1. Hero Section using Organic Shape Divider matching user's graphic reference */}
      <OrganicShapeBanner
        imageSrc="https://64.media.tumblr.com/893cd77fa9c94a77ca17990a0430b4a8/822f13a412d29853-a1/s2048x3072/0fbe7b2cb3c43b766b4902af70338b40a712ccc6.jpg"
        imageAlt="New Fit EMS Trening"
        className="-mt-4 sm:-mt-8"
        rightContent={
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-sm sm:max-w-md"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-stone-200/90 shadow-2xl relative overflow-hidden group">
              
              {/* Equipment Photo Header */}
              <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-stone-900">
                <img
                  src={heroSlides[activeSlide].image}
                  alt={heroSlides[activeSlide].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/30" />

                {/* Top Header inside Image */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="font-['Caveat'] text-2xl text-[#CFF3CF] drop-shadow-md">
                    Upoznaj opremu
                  </span>
                  <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/20">
                    <button
                      onClick={prevSlide}
                      className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors text-white cursor-pointer active:scale-95"
                      aria-label="Prethodna sprava"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-[11px] font-bold text-stone-200 px-1">
                      {activeSlide + 1} / {heroSlides.length}
                    </span>
                    <button
                      onClick={nextSlide}
                      className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors text-white cursor-pointer active:scale-95"
                      aria-label="Sledeća sprava"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Mini Shape Divider cutting into card content */}
                <div className="absolute -bottom-[1px] left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
                  <ShapeDivider
                    type="layered-waves"
                    height={38}
                    color="#ffffff"
                    accentColor="rgba(196, 225, 23, 0.45)"
                  />
                </div>
              </div>

              {/* Card Lower Content */}
              <div className="p-5 sm:p-6 space-y-3.5 bg-white text-stone-900">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center shrink-0 whitespace-nowrap px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-[#c4e117] text-black">
                        {heroSlides[activeSlide].badge}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-500 whitespace-nowrap">
                        {heroSlides[activeSlide].tag}
                      </span>
                    </div>

                    <h3 className="font-['Montserrat'] font-extrabold text-xl sm:text-2xl uppercase tracking-wide text-black">
                      {heroSlides[activeSlide].title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      {heroSlides[activeSlide].desc}
                    </p>

                    <div className="p-3 rounded-2xl bg-[#FAF3EB] border border-stone-200 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-stone-700">
                        <span className="font-medium">Trajanje sesije:</span>
                        <strong className="text-black font-bold whitespace-nowrap">30&nbsp;minuta</strong>
                      </div>
                      <div className="flex items-center justify-between text-stone-700">
                        <span className="font-medium">Prisustvo trenera:</span>
                        <strong className="text-[#8ea800] font-bold whitespace-nowrap">100%&nbsp;vremena</strong>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate('services')}
                      className="w-full bg-[#000000] hover:bg-stone-900 active:scale-[0.99] text-[#CFF3CF] font-['Montserrat'] font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span>Pogledaj sve sprave i programe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        }
      >
        {/* Preheader */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 flex-wrap"
        >
          <span className="font-['Caveat'] text-2xl sm:text-3xl text-stone-800 font-semibold leading-tight">
            Savremeni fitnes studio
          </span>
          <span className="text-[#8ea800] font-bold text-lg">•</span>
          <span className="font-['Montserrat'] font-extrabold text-xs sm:text-sm uppercase tracking-widest text-[#838487]">
            Nova Pazova
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-['Montserrat'] font-extrabold text-[36px] xs:text-[44px] sm:text-6xl lg:text-[70px] tracking-tight text-black uppercase leading-[0.98] sm:leading-[1.02] max-md:[text-shadow:_0_1px_12px_rgba(250,243,235,0.95),_0_2px_24px_rgba(250,243,235,0.9)]"
        >
          <span className="whitespace-nowrap">30&nbsp;MINUTA</span> KOJA <br />
          <span className="text-black">
            MENJAJU TVOJE TELO
          </span>
        </motion.h1>

        {/* Descriptive Lead */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-sm sm:text-base md:text-lg text-stone-700 max-md:text-stone-900 max-md:font-medium leading-relaxed font-normal max-md:[text-shadow:_0_1px_10px_rgba(250,243,235,0.95),_0_2px_18px_rgba(250,243,235,0.85)]"
        >
          New FIT EMS je savremeni fitness program namenjen <strong className="text-stone-950 font-semibold">ženama i muškarcima</strong>. Vežbanje na naprednim spravama koje aktiviraju preko 90% mišićnih vlakana uz vođeni trening 1-na-1 sa trenerima Vukom i Lazarom.
        </motion.p>

        {/* Quick Info Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center gap-2 pt-1"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF3EB] border border-stone-300 text-xs font-semibold text-stone-800 shadow-2xs shrink-0 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 text-stone-700 shrink-0" />
            <span className="whitespace-nowrap">30&nbsp;min po terminu</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF3EB] border border-stone-300 text-xs font-semibold text-stone-800 shadow-2xs shrink-0 whitespace-nowrap">
            <Users className="w-3.5 h-3.5 text-stone-700 shrink-0" />
            <span className="whitespace-nowrap">1-na-1 vođenje trenera</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#CFF3CF] border border-stone-300 text-xs font-semibold text-stone-900 shadow-2xs shrink-0 whitespace-nowrap">
            <Zap className="w-3.5 h-3.5 text-[#8ea800] shrink-0" />
            <span className="whitespace-nowrap">EMS + Vakum + Madero</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        >
          <button
            onClick={onOpenBooking}
            className="bg-[#000000] hover:bg-stone-900 active:scale-[0.98] text-[#CFF3CF] px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl font-['Montserrat'] font-extrabold tracking-wider text-sm sm:text-base uppercase transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <span>Zakaži probni termin</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('concept')}
            className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl border border-stone-300 hover:border-black bg-white hover:bg-stone-50 active:scale-[0.98] text-stone-900 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Saznaj kako radimo</span>
          </button>
        </motion.div>
      </OrganicShapeBanner>

      {/* 2. NOVA STVAR: Pre i Posle Nas Interactive Comparison Slider */}
      <motion.div {...fadeInUp}>
        <BeforeAfterSlider onOpenBooking={onOpenBooking} />
      </motion.div>

      {/* 3. Instagram Video Slider: Rezultati & Transformacije (SLIDER / CAROUSEL on Home!) */}
      <motion.section
        {...fadeInUp}
        className="max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="bg-[#000000] text-[#FAF3EB] rounded-3xl p-5 sm:p-9 border border-white/10 shadow-xl relative">
          
          {/* Header with Slider Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white">
                  <Instagram className="w-3.5 h-3.5" />
                </div>
                <span className="font-['Caveat'] text-2xl text-[#CFF3CF]">
                  Video rezultati i transformacije
                </span>
              </div>
              <h2 className="font-['Montserrat'] font-extrabold text-2xl sm:text-3xl uppercase tracking-wider text-white mt-0.5">
                REZULTATI NAŠIH ČLANOVA
              </h2>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-stone-400 font-bold mr-1">
                {reelSlideIndex + 1} / {totalReels}
              </span>
              <button
                onClick={prevReel}
                className="w-9 h-9 rounded-full border border-white/20 hover:border-[#CFF3CF] hover:bg-[#CFF3CF] hover:text-black flex items-center justify-center transition-colors text-white cursor-pointer"
                aria-label="Prethodni video"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextReel}
                className="w-9 h-9 rounded-full border border-white/20 hover:border-[#CFF3CF] hover:bg-[#CFF3CF] hover:text-black flex items-center justify-center transition-colors text-white cursor-pointer"
                aria-label="Sledeći video"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Slider View: 3 visible at a time with smooth transition */}
          <div className="hidden lg:grid grid-cols-3 gap-5">
            {visibleReelsDesktop.map((reel, idx) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => setSelectedReel(reel)}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#CFF3CF] rounded-2xl p-4 flex flex-col justify-between transition-all cursor-pointer relative overflow-hidden"
              >
                <div>
                  {/* Real Video Thumbnail Box */}
                  <div className="aspect-[4/5] rounded-xl bg-stone-900 border border-white/10 overflow-hidden relative group-hover:shadow-[0_0_20px_rgba(207,243,207,0.2)] transition-all">
                    <img
                      src={reel.thumbnailUrl}
                      alt={reel.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 group-hover:from-black/75 transition-all flex flex-col justify-between p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#CFF3CF] text-black shadow-xs">
                          {reel.category}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center text-white">
                          <Instagram className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md group-hover:bg-[#CFF3CF] text-white group-hover:text-black flex items-center justify-center transition-all shadow-lg group-hover:scale-110">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>

                      <div className="text-[11px] text-[#CFF3CF] font-bold uppercase tracking-wider flex items-center justify-between">
                        <span>Pusti video</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>

                  {/* Video Name and Caption Underneath */}
                  <div className="mt-3.5 space-y-1">
                    <h3 className="font-['Montserrat'] font-extrabold text-base uppercase tracking-wide text-white group-hover:text-[#CFF3CF] transition-colors leading-snug">
                      {reel.title}
                    </h3>
                    <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">
                      {reel.description}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-[#CFF3CF] font-semibold">
                  <span>Pogledaj transformaciju</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile & Tablet Slider View: 1 single focus card at a time with indicator dots */}
          <div className="lg:hidden">
            {(() => {
              const reel = INSTAGRAM_REELS[reelSlideIndex];
              return (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={reel.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => setSelectedReel(reel)}
                    className="group bg-white/5 border border-white/15 rounded-2xl p-4 flex flex-col justify-between cursor-pointer"
                  >
                    <div className="aspect-[4/5] rounded-xl bg-stone-900 border border-white/10 overflow-hidden relative">
                      <img
                        src={reel.thumbnailUrl}
                        alt={reel.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35 flex flex-col justify-between p-4">
                        <div className="flex justify-end">
                          <div className="w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white">
                            <Instagram className="w-4 h-4" />
                          </div>
                        </div>

                        <div className="flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md text-white flex items-center justify-center shadow-lg">
                            <Play className="w-6 h-6 fill-current ml-0.5" />
                          </div>
                        </div>

                        <div className="text-xs text-[#CFF3CF] font-bold uppercase tracking-wider flex items-center justify-between">
                          <span>Dodirni za video</span>
                          <span>→</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3.5 space-y-1">
                      <h3 className="font-['Montserrat'] font-extrabold text-lg uppercase tracking-wide text-white leading-snug">
                        {reel.title}
                      </h3>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {reel.description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              );
            })()}

            {/* Indicator Dots on Mobile */}
            <div className="flex justify-center items-center gap-1.5 mt-4">
              {INSTAGRAM_REELS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReelSlideIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    reelSlideIndex === i ? 'w-6 bg-[#CFF3CF]' : 'w-1.5 bg-white/30'
                  }`}
                  aria-label={`Video ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Footer of the Video Section */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-3">
            <span>Stvarni rezultati članova iz našeg studija u Novoj Pazovi.</span>
            <button
              onClick={() => onNavigate('stories')}
              className="text-[#CFF3CF] hover:underline font-bold uppercase tracking-wider cursor-pointer"
            >
              Pogledaj svih 6 video transformacija i izjave →
            </button>
          </div>

        </div>
      </motion.section>

      {/* 3. Instagram Story Highlights Strip (From Page 6 of PDF) */}
      <motion.section
        {...fadeInUp}
        className="max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-stone-300/80 shadow-xs overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-stone-100">
            <div>
              <span className="font-['Caveat'] text-2xl text-stone-500 block">
                Zaprati nas na mrežama
              </span>
              <h3 className="font-['Montserrat'] font-extrabold text-lg sm:text-2xl uppercase tracking-wider text-[#000000]">
                @newfitems.novapazova
              </h3>
            </div>

            <a
              href={CONTACT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-wider text-stone-800 hover:text-black flex items-center gap-1.5"
            >
              <span>Poseti Instagram profil</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Highlights Circles */}
          <div className="flex items-center gap-3.5 sm:gap-6 overflow-x-auto py-2 scrollbar-none w-full max-w-full min-w-0 justify-start sm:justify-between px-0.5">
            {INSTAGRAM_HIGHLIGHTS.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate(idx === 1 ? 'stories' : idx === 2 ? 'services' : 'concept')}
                className="flex flex-col items-center gap-1.5 min-w-[72px] sm:min-w-[90px] shrink-0 cursor-pointer group"
              >
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full p-1 border-2 border-stone-300 group-hover:border-[#000000] transition-colors flex items-center justify-center">
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center font-['Montserrat'] font-extrabold uppercase text-[11px] sm:text-xs tracking-wider transition-transform group-hover:scale-105 shadow-2xs"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.title}
                  </div>
                </div>
                <span className="text-[10px] sm:text-[11px] font-medium text-stone-600 text-center leading-tight group-hover:text-black">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. 3 Pillars Quick Grid */}
      <motion.section
        {...fadeInUp}
        className="max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="bg-[#FAF3EB] border border-stone-300/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:border-black transition-all"
          >
            <div className="space-y-2">
              <span className="font-['Caveat'] text-2xl text-stone-600">
                01. Efikasnost
              </span>
              <h3 className="font-['Montserrat'] font-extrabold text-2xl uppercase tracking-wider text-black whitespace-nowrap">
                Samo 30&nbsp;minuta
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                Uštedi sate na put i pretrpanu teretanu. Tehnologija stimuliše mišiće višestruko brže od običnog treninga.
              </p>
            </div>
            <button
              onClick={() => onNavigate('concept')}
              className="text-xs font-bold uppercase tracking-wider text-stone-800 hover:text-black flex items-center gap-1.5 self-start cursor-pointer"
            >
              <span>Zašto radi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="bg-white border border-stone-300/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:border-black transition-all"
          >
            <div className="space-y-2">
              <span className="font-['Caveat'] text-2xl text-stone-600">
                02. Vođenje
              </span>
              <h3 className="font-['Montserrat'] font-extrabold text-2xl uppercase tracking-wider text-black">
                Vuk & Marija 1-na-1
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                Nisi prepušten/a samom sebi. Svaka vežba, tempo i intenzitet su prilagođeni tvojoj kondiciji i cilju.
              </p>
            </div>
            <button
              onClick={() => onNavigate('stories')}
              className="text-xs font-bold uppercase tracking-wider text-stone-800 hover:text-black flex items-center gap-1.5 self-start cursor-pointer"
            >
              <span>Iskustva članova</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="bg-[#000000] text-[#FAF3EB] rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <span className="font-['Caveat'] text-2xl text-[#CFF3CF]">
                03. Transparentnost
              </span>
              <h3 className="font-['Montserrat'] font-extrabold text-2xl uppercase tracking-wider text-white">
                Jasne cene & paketi
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                Bez skrivenih troškova i obmanjujućih ugovora. Mesečni paketi i opcije na rate za svakoga.
              </p>
            </div>
            <button
              onClick={() => onNavigate('pricing')}
              className="text-xs font-bold uppercase tracking-wider text-[#CFF3CF] hover:text-white flex items-center gap-1.5 self-start cursor-pointer"
            >
              <span>Pogledaj cenovnik</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

        </div>
      </motion.section>

      {/* 5. Direct Studio Map & Location on Home Page */}
      <motion.section
        {...fadeInUp}
        className="max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="bg-white rounded-3xl p-5 sm:p-9 border border-stone-300/80 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Info */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-5">
              <div>
                <span className="font-['Caveat'] text-2xl text-stone-600 block">
                  Naša lokacija
                </span>
                <h2 className="font-['Montserrat'] font-extrabold text-2xl sm:text-4xl uppercase tracking-wider text-[#000000]">
                  GDE NAS MOŽEŠ NAĆI
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  New Fitems studio u Novoj Pazovi je lako dostupan sa obezbeđenim parkingom.
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF3EB] border border-stone-200">
                  <MapPin className="w-5 h-5 text-black shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 font-bold uppercase text-xs">
                      Adresa
                    </strong>
                    <span>{CONTACT_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF3EB] border border-stone-200">
                  <Phone className="w-5 h-5 text-black shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 font-bold uppercase text-xs">
                      Telefon za pozive
                    </strong>
                    <a href={`tel:${CONTACT_INFO.phone}`} className="font-bold hover:underline">
                      {CONTACT_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF3EB] border border-stone-200">
                  <Mail className="w-5 h-5 text-black shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 font-bold uppercase text-xs">
                      Email upiti
                    </strong>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="font-semibold text-stone-800 hover:underline">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href={CONTACT_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#000000] hover:bg-stone-900 text-[#CFF3CF] px-5 py-3 rounded-xl font-['Montserrat'] font-extrabold uppercase tracking-wider text-xs flex items-center gap-2 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Google Maps navigacija</span>
                </a>

                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-white hover:bg-stone-100 text-black border border-stone-300 px-4 py-3 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 text-black fill-black" />
                  <span>Video: Kako doći do nas</span>
                </button>

                <button
                  onClick={onOpenBooking}
                  className="bg-[#CFF3CF] hover:bg-[#b2f0b2] text-black px-5 py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-all cursor-pointer"
                >
                  Zakaži posetu
                </button>
              </div>
            </div>

            {/* Map Frame - Fixed height & min-w-0 to strictly fit mobile screens */}
            <div className="lg:col-span-7 min-w-0 w-full max-w-full bg-stone-100 rounded-2xl overflow-hidden border border-stone-300/80 shadow-xs h-[260px] sm:h-[340px] lg:h-[380px]">
              <iframe
                title="New Fitems Google Map na početnoj"
                src="https://maps.google.com/maps?q=Kralja%20Petra%20I%20Kara%C4%91or%C4%91evi%C4%87a%2087,%20Nova%20Pazova&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 block"
                loading="lazy"
              />
            </div>

          </div>
        </div>
      </motion.section>

      {/* 6. Call to Action Banner (Without WhatsApp, with Email inquiry and Phone call) */}
      <motion.section
        {...fadeInUp}
        className="max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="bg-[#CFF3CF] rounded-3xl p-6 sm:p-10 border border-stone-300 text-black flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="font-['Caveat'] text-2xl sm:text-3xl text-stone-800">
              Uveri se lično
            </span>
            <h2 className="font-['Montserrat'] font-extrabold text-2xl sm:text-4xl uppercase tracking-wider text-black">
              Isprobaj New Fit EMS u Novoj Pazovi
            </h2>
            <p className="text-xs sm:text-sm text-stone-800 max-w-lg">
              Dođi na uvodni razgovor i kratak probni termin. Upoznaj se sa spravama i oseti kako tehnologija radi za tvoje telo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto bg-[#000000] hover:bg-stone-900 text-[#CFF3CF] px-6 py-3.5 rounded-xl font-['Montserrat'] font-extrabold uppercase tracking-wider text-xs sm:text-sm transition-all cursor-pointer text-center"
            >
              Pošalji upit za termin
            </button>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="w-full sm:w-auto bg-white hover:bg-stone-50 text-black px-5 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider border border-stone-300 flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-black" />
              <span>{CONTACT_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </motion.section>

      {/* Instagram Reel Modal Player */}
      <InstagramReelModal
        reel={selectedReel}
        onClose={() => setSelectedReel(null)}
      />

    </div>
  );
};
