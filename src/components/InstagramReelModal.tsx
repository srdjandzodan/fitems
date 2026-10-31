import React from 'react';
import { X, ExternalLink, Instagram } from 'lucide-react';
import { InstagramReel } from '../data/siteData';

interface InstagramReelModalProps {
  reel: InstagramReel | null;
  onClose: () => void;
}

export const InstagramReelModal: React.FC<InstagramReelModalProps> = ({ reel, onClose }) => {
  if (!reel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#000000] text-[#FAF3EB] w-full max-w-md rounded-3xl p-5 border border-white/15 shadow-2xl relative flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white">
              <Instagram className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#CFF3CF] block">
                {reel.category}
              </span>
              <h4 className="text-xs font-bold text-white truncate max-w-[220px]">
                {reel.title}
              </h4>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Zatvori video"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Instagram Reel Embed Frame */}
        <div className="relative w-full flex-grow aspect-[9/16] max-h-[560px] rounded-2xl overflow-hidden bg-stone-900 border border-white/10">
          <iframe
            src={`${reel.embedUrl}`}
            className="w-full h-full border-0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title={reel.title}
          />
        </div>

        {/* Footer with caption and direct button */}
        <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
          <p className="text-[11px] text-stone-400 line-clamp-1">
            {reel.description}
          </p>

          <a
            href={reel.reelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#CFF3CF] hover:bg-[#b5f0b5] text-black px-3 py-1.5 rounded-lg font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition-colors"
          >
            <span>Instagram</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </div>
  );
};
