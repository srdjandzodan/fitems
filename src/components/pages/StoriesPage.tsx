import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, Play, Instagram, ExternalLink, ArrowRight } from 'lucide-react';
import { CLIENT_STORIES, INSTAGRAM_REELS, InstagramReel, CONTACT_INFO } from '../../data/siteData';
import { InstagramReelModal } from '../InstagramReelModal';

interface StoriesPageProps {
  onOpenBooking: () => void;
}

export const StoriesPage: React.FC<StoriesPageProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'reels' | 'stories'>('reels');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterTag, setFilterTag] = useState<string>('Sve');
  const [selectedReel, setSelectedReel] = useState<InstagramReel | null>(null);

  const filteredStories = filterTag === 'Sve'
    ? CLIENT_STORIES
    : CLIENT_STORIES.filter(s => s.tag.includes(filterTag));

  const currentStory = filteredStories[currentIndex % filteredStories.length] || CLIENT_STORIES[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredStories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === filteredStories.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="font-['Caveat'] text-3xl text-stone-600 block">
          Autentični rezultati
        </span>
        <h1 className="font-['Montserrat'] font-extrabold text-3xl sm:text-5xl uppercase tracking-wider text-[#000000]">
          ISKUSTVA & SNIMCI IZ STUDIJA
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 font-normal">
          Pogledaj video snimke sa treninga na Instagramu i pročitaj utiske članova iz Nove Pazove:
        </p>
      </div>

      {/* Main Tab Switcher: Video Reels vs Text Stories */}
      <div className="flex justify-center px-2">
        <div className="bg-stone-200/60 p-1 sm:p-1.5 rounded-full border border-stone-300 flex items-center gap-1 sm:gap-2 max-w-full overflow-x-auto">
          <button
            onClick={() => setActiveTab('reels')}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'reels'
                ? 'bg-[#000000] text-[#CFF3CF] shadow-xs'
                : 'text-stone-700 hover:text-black hover:bg-white/50'
            }`}
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Video Snimci ({INSTAGRAM_REELS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('stories')}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'stories'
                ? 'bg-[#000000] text-[#CFF3CF] shadow-xs'
                : 'text-stone-700 hover:text-black hover:bg-white/50'
            }`}
          >
            <Quote className="w-3.5 h-3.5" />
            <span>Utisci & Izjave ({CLIENT_STORIES.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Video Reels View */}
      {activeTab === 'reels' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSTAGRAM_REELS.map((reel) => (
              <div
                key={reel.id}
                onClick={() => setSelectedReel(reel)}
                className="bg-white rounded-3xl p-5 border border-stone-300/80 shadow-md hover:border-black hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#CFF3CF] text-black">
                      {reel.category}
                    </span>
                    <Instagram className="w-4 h-4 text-stone-400 group-hover:text-black transition-colors" />
                  </div>

                  {/* Real Video Thumbnail Aspect Ratio */}
                  <div className="aspect-[4/5] rounded-2xl bg-stone-900 border border-stone-200 overflow-hidden relative group-hover:shadow-md transition-all">
                    <img
                      src={reel.thumbnailUrl}
                      alt={reel.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 group-hover:from-black/70 transition-all flex flex-col justify-between p-4">
                      <div className="flex justify-end">
                        <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center text-white">
                          <Instagram className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md group-hover:bg-[#CFF3CF] text-white group-hover:text-black flex items-center justify-center transition-all shadow-lg group-hover:scale-110">
                          <Play className="w-6 h-6 fill-current ml-0.5" />
                        </div>
                      </div>

                      <div className="text-[11px] text-[#CFF3CF] font-bold uppercase tracking-wider flex items-center justify-between">
                        <span>Pusti video</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>

                  {/* Video Title and Caption Underneath */}
                  <div className="mt-4 space-y-1">
                    <h3 className="font-['Montserrat'] font-extrabold text-lg uppercase tracking-wide text-black group-hover:text-[#8ea800] transition-colors leading-snug">
                      {reel.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {reel.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900 group-hover:text-[#8ea800] transition-colors">
                    Otvori u plejeru →
                  </span>
                  <a
                    href={reel.reelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-stone-400 hover:text-black flex items-center gap-1 text-[11px]"
                  >
                    <span>Instagram</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tab 2: Client Stories & Testimonials View */}
      {activeTab === 'stories' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-10"
        >
          {/* Filter Tabs */}
          <div className="flex justify-center gap-2">
            {['Sve', 'EMS', 'Vakum', 'Madero'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setFilterTag(tag);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filterTag === tag
                    ? 'bg-[#000000] text-[#CFF3CF] shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
                }`}
              >
                {tag === 'Sve' ? 'Sve priče' : tag}
              </button>
            ))}
          </div>

          {/* Big Interactive Spotlight Story Slider */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-7 sm:p-12 border border-stone-300/80 shadow-lg relative">
              
              <div className="flex items-center justify-between pb-6 border-b border-stone-100 mb-6">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#CFF3CF] text-black">
                    {currentStory.tag}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    {currentStory.city}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-9 h-9 rounded-full border border-stone-300 hover:border-black flex items-center justify-center transition-colors text-stone-700 cursor-pointer"
                    aria-label="Prethodno iskustvo"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-stone-500 px-1">
                    {(currentIndex % filteredStories.length) + 1} / {filteredStories.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="w-9 h-9 rounded-full border border-stone-300 hover:border-black flex items-center justify-center transition-colors text-stone-700 cursor-pointer"
                    aria-label="Sledeće iskustvo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStory.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <Quote className="w-10 h-10 text-stone-300 opacity-70" />

                  <p className="text-base sm:text-2xl font-normal text-stone-900 leading-relaxed italic">
                    "{currentStory.quote}"
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-stone-100 flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#000000] text-[#CFF3CF] flex items-center justify-center font-bold text-sm">
                        {currentStory.avatar}
                      </div>
                      <div>
                        <h3 className="font-['Montserrat'] font-extrabold text-xl uppercase tracking-wider text-black">
                          {currentStory.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{currentStory.result}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

          {/* Grid of all story cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CLIENT_STORIES.map((s, idx) => (
              <div
                key={s.name}
                onClick={() => {
                  setFilterTag('Sve');
                  setCurrentIndex(idx);
                }}
                className="p-6 rounded-2xl bg-white border border-stone-200/90 hover:border-black transition-all cursor-pointer flex flex-col justify-between shadow-2xs group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF3EB] text-stone-800 border border-stone-200">
                      {s.tag}
                    </span>
                    <span className="text-xs text-stone-400">{s.city}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed line-clamp-3">
                    "{s.quote}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-stone-100 text-stone-800 flex items-center justify-center text-xs font-bold">
                      {s.avatar}
                    </div>
                    <span className="font-['Montserrat'] font-extrabold text-sm uppercase tracking-wide text-black">
                      {s.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#8ea800]">
                    {s.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Bottom Consultation Box */}
      <div className="bg-[#FAF3EB] border border-stone-300 rounded-3xl p-8 text-center max-w-2xl mx-auto space-y-4">
        <h3 className="font-['Montserrat'] font-extrabold text-2xl uppercase tracking-wider text-black">
          POSTANI DEO NAŠE FIT ZAJEDNICE
        </h3>
        <p className="text-xs sm:text-sm text-stone-600">
          Zakaži svoj prvi termin i oseti razliku već nakon 30 minuta vođenog treninga sa Vukom i Marijom u Novoj Pazovi.
        </p>
        <button
          onClick={onOpenBooking}
          className="bg-[#000000] hover:bg-stone-900 text-[#CFF3CF] px-6 py-3.5 rounded-xl font-['Montserrat'] font-extrabold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Prijavi se za uvodni termin</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Instagram Reel Modal Player */}
      <InstagramReelModal
        reel={selectedReel}
        onClose={() => setSelectedReel(null)}
      />

    </div>
  );
};
