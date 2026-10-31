import React from 'react';

interface OrganicShapeBannerProps {
  imageSrc: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right'; // 'right' for home (photo on right), 'left' for pricing (photo on left)
  children: React.ReactNode;
  rightContent?: React.ReactNode;
  fillColor?: string; // defaults to site's warm beige #FAF3EB
  accentColor?: string; // energetic brand lime accent
  className?: string;
  minHeight?: string;
}

export const OrganicShapeBanner: React.FC<OrganicShapeBannerProps> = ({
  imageSrc,
  imageAlt = 'Visual Banner',
  imagePosition = 'right',
  children,
  rightContent,
  fillColor = '#FAF3EB',
  accentColor = 'rgba(196, 225, 23, 0.55)',
  className = '',
  minHeight = 'min-h-[560px] lg:min-h-[660px]',
}) => {
  return (
    <div className={`relative w-full overflow-hidden ${minHeight} flex flex-col justify-between ${className}`}>
      
      {/* 1. Full Background Photo - positioned without distortion or awkward clipping */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <img
          src={imageSrc}
          alt={imageAlt}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover scale-100 transition-transform duration-1000 ${
            imagePosition === 'left'
              ? 'object-[18%_center] sm:object-[15%_center] lg:object-left'
              : 'object-center'
          }`}
        />
        {/* Very subtle edge gradient */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            imagePosition === 'left'
              ? 'bg-gradient-to-r from-transparent via-transparent to-black/5'
              : 'bg-gradient-to-l from-transparent via-transparent to-black/5'
          }`}
        />
      </div>

      {/* 2. MOBILE SVG SHAPE DIVIDER (< 768px)
          Cuts diagonally from left to right (~61% at top down to ~42% at bottom)
          with a subtle organic wave, letting the centered photo showcase the space. */}
      <div className="md:hidden absolute inset-0 w-full h-full pointer-events-none z-10 select-none">
        <svg
          viewBox="0 0 400 720"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          {imagePosition === 'left' ? (
            // Mobile Cenovnik: photo on left, divider covers right side from ~48%
            <>
              {/* Lime accent curve layer */}
              <path
                d="M 400,0
                   L 170,0
                   C 205,160 145,320 180,480
                   C 205,580 155,660 170,720
                   L 400,720 Z"
                fill={accentColor}
              />
              {/* Main solid beige layer covering right */}
              <path
                d="M 400,0
                   L 190,0
                   C 225,160 165,320 200,480
                   C 225,580 175,660 190,720
                   L 400,720 Z"
                fill={fillColor}
              />
            </>
          ) : (
            // Mobile Home: photo in center, divider cuts reverse-diagonally (narrower at top ~165px, expanding to bottom ~250px)
            <>
              {/* Lime accent curve layer */}
              <path
                d="M 0,0
                   L 180,0
                   C 185,180 200,360 225,520
                   C 240,610 250,670 265,720
                   L 0,720 Z"
                fill={accentColor}
              />
              {/* Main solid beige layer covering left */}
              <path
                d="M 0,0
                   L 165,0
                   C 170,180 185,360 210,520
                   C 225,610 235,670 250,720
                   L 0,720 Z"
                fill={fillColor}
              />
            </>
          )}
        </svg>
      </div>

      {/* 3. DESKTOP & TABLET SVG SHAPE DIVIDER (>= 768px)
          Hero cuts reverse-diagonally from top (X=705, ~49% width) down to bottom (X=890, ~62% width).
          With centered photo, the top right studio space opens up naturally. */}
      <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10 select-none">
        <svg
          viewBox="0 0 1440 850"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          {imagePosition === 'left' ? (
            // Desktop Cenovnik: Photo is on LEFT (0 to 670).
            // Divider covers RIGHT (starts from 670-695 all the way to 1440).
            // Left 0 to 670 is completely untouched so the photo subject is fully visible!
            <>
              {/* Accent lime wave layer */}
              <path
                d="M 1440,0
                   L 660,0
                   C 720,180 620,320 660,470
                   C 700,620 630,730 670,850
                   L 1440,850 Z"
                fill={accentColor}
              />
              {/* Main signature beige layer covering right completely */}
              <path
                d="M 1440,0
                   L 685,0
                   C 745,180 645,320 685,470
                   C 725,620 655,730 695,850
                   L 1440,850 Z"
                fill={fillColor}
              />
            </>
          ) : (
            // Desktop Home: Photo is in center. Divider cuts reverse-diagonally from X=705 at top to X=890 at bottom
            <>
              {/* Accent lime wave layer */}
              <path
                d="M 0,0
                   L 730,0
                   C 745,200 760,380 820,560
                   C 855,670 870,760 915,850
                   L 0,850 Z"
                fill={accentColor}
              />
              {/* Main signature beige layer covering left */}
              <path
                d="M 0,0
                   L 705,0
                   C 720,200 735,380 795,560
                   C 830,670 845,760 890,850
                   L 0,850 Z"
                fill={fillColor}
              />
            </>
          )}
        </svg>
      </div>

      {/* 4. Foreground Content Grid (Both Mobile & Desktop)
          NO wrapper box/div around children! Text sits directly on the organic background. */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14 lg:py-18 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {imagePosition === 'left' ? (
            // Cenovnik layout: Left 6 columns leave space for photo; Right 6 columns hold text on solid #FAF3EB
            <>
              <div className="hidden lg:block lg:col-span-5 xl:col-span-6 pointer-events-none">
                {rightContent}
              </div>

              <div className="lg:col-span-7 xl:col-span-6 space-y-4 text-stone-900 max-w-xl ml-auto relative">
                {/* Soft ambient diffused glow on mobile from halfway across text */}
                <div className="md:hidden absolute -inset-y-4 -left-10 -right-4 bg-radial from-[#FAF3EB]/70 via-[#FAF3EB]/40 to-transparent blur-2xl pointer-events-none -z-10" />
                {children}
              </div>
            </>
          ) : (
            // Home Hero layout: Left 6 columns hold text directly on solid #FAF3EB; Right 6 columns hold preview card & photo
            <>
              <div className="lg:col-span-6 xl:col-span-6 space-y-4 text-stone-900 max-w-xl relative">
                {/* Soft ambient diffused glow on mobile from halfway across text */}
                <div className="md:hidden absolute -inset-y-4 -left-4 -right-10 bg-radial from-[#FAF3EB]/70 via-[#FAF3EB]/40 to-transparent blur-2xl pointer-events-none -z-10" />
                {children}
              </div>

              {rightContent && (
                <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end w-full">
                  {rightContent}
                </div>
              )}
            </>
          )}

        </div>
      </div>

      {/* 5. Bottom organic wave lip for seamless connection into page background */}
      <div className="relative z-20 w-full overflow-hidden leading-none pointer-events-none -mt-1">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full block h-7 sm:h-10"
        >
          <path
            d={
              imagePosition === 'left'
                ? "M1440,0 C1060,55 480,58 0,25 L0,60 L1440,60 Z"
                : "M0,0 C380,55 960,58 1440,25 L1440,60 L0,60 Z"
            }
            fill={fillColor}
          />
        </svg>
      </div>

    </div>
  );
};
