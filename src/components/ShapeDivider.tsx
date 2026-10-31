import React from 'react';

export type ShapeDividerType =
  | 'diagonal-layered-waves'
  | 'layered-waves'
  | 'waves'
  | 'slant'
  | 'curve'
  | 'triangle'
  | 'clouds';

interface ShapeDividerProps {
  type?: ShapeDividerType;
  height?: number; // Height in pixels
  color?: string; // Fill color (e.g. #ffffff)
  accentColor?: string; // Secondary layer color
  flipHorizontal?: boolean;
  invert?: boolean;
  className?: string;
}

export const ShapeDivider: React.FC<ShapeDividerProps> = ({
  type = 'diagonal-layered-waves',
  height = 110,
  color = '#ffffff',
  accentColor = 'rgba(255, 255, 255, 0.45)',
  flipHorizontal = false,
  invert = false,
  className = '',
}) => {
  const transform = [
    flipHorizontal ? 'scaleX(-1)' : '',
    invert ? 'rotate(180deg)' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const renderShape = () => {
    switch (type) {
      case 'diagonal-layered-waves':
        return (
          <>
            {/* Third subtle brand accent wave layer for depth */}
            <path
              d="M0,120 L640,120 C760,120 860,50 1060,35 C1220,20 1340,10 1440,0 L1440,120 Z"
              fill="rgba(196, 225, 23, 0.4)"
            />
            {/* Background semi-transparent wave rising diagonally from the middle */}
            <path
              d="M0,120 L680,120 C820,120 910,65 1110,45 C1260,30 1360,18 1440,8 L1440,120 Z"
              fill={accentColor}
            />
            {/* Foreground crisp wave starting from midpoint and sweeping diagonally to the edge */}
            <path
              d="M0,120 L720,120 C850,120 950,85 1140,55 C1280,32 1380,24 1440,18 L1440,120 Z"
              fill={color}
            />
          </>
        );

      case 'layered-waves':
        return (
          <>
            {/* Background semi-transparent accent wave for depth */}
            <path
              d="M0,32 C220,110 440,-20 720,40 C1000,100 1200,15 1440,65 L1440,120 L0,120 Z"
              fill={accentColor}
            />
            {/* Foreground crisp wave */}
            <path
              d="M0,55 C240,15 480,95 720,50 C960,5 1200,85 1440,40 L1440,120 L0,120 Z"
              fill={color}
            />
          </>
        );

      case 'slant':
        return (
          <path
            d="M0,120 L1440,25 L1440,120 L0,120 Z"
            fill={color}
          />
        );

      case 'curve':
        return (
          <path
            d="M0,100 Q720,0 1440,100 L1440,120 L0,120 Z"
            fill={color}
          />
        );

      case 'triangle':
        return (
          <path
            d="M0,120 L720,15 L1440,120 Z"
            fill={color}
          />
        );

      case 'clouds':
        return (
          <path
            d="M0,90 C80,75 140,85 200,60 C260,35 340,30 400,55 C470,80 540,50 620,40 C700,30 760,60 840,50 C920,40 980,25 1060,45 C1130,65 1200,50 1280,65 C1350,80 1400,75 1440,85 L1440,120 L0,120 Z"
            fill={color}
          />
        );

      case 'waves':
      default:
        return (
          <path
            d="M0,45 C320,115 420,-15 740,45 C1060,105 1160,5 1440,40 L1440,120 L0,120 Z"
            fill={color}
          />
        );
    }
  };

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
      style={{
        transform: transform || undefined,
        transformOrigin: 'center center',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full block"
        style={{ height: `${height}px` }}
      >
        {renderShape()}
      </svg>
    </div>
  );
};
