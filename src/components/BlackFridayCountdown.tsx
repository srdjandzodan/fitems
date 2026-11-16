import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

const TARGET_DATE = new Date('2026-11-30T23:59:59+01:00').getTime();

function calculateTimeLeft(): TimeLeft {
  const now = Date.now();
  const diff = TARGET_DATE - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

interface BlackFridayCountdownProps {
  variant?: 'light' | 'dark';
  compact?: boolean;
}

export const BlackFridayCountdown: React.FC<BlackFridayCountdownProps> = ({
  variant = 'light',
  compact = false,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  const units = [
    { label: 'Dana', value: pad(timeLeft.days) },
    { label: 'Sati', value: pad(timeLeft.hours) },
    { label: 'Min', value: pad(timeLeft.minutes) },
    { label: 'Sek', value: pad(timeLeft.seconds) },
  ];

  const isDark = variant === 'dark';

  return (
    <div className="space-y-2">
      <div className={`flex items-center gap-1.5 text-xs font-medium ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
        <Clock className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-[#c4e117]' : 'text-black'}`} />
        <span>
          {timeLeft.expired
            ? 'Black Friday rok za prijavu (30. novembar)'
            : 'Odbrojavanje do 30. novembra:'}
        </span>
      </div>

      <div className="inline-flex items-center gap-2 sm:gap-2.5">
        {units.map((unit) => (
          <div
            key={unit.label}
            className={`flex flex-col items-center justify-center rounded-xl border ${
              compact ? 'min-w-[48px] px-2.5 py-1.5' : 'min-w-[56px] sm:min-w-[64px] px-3 py-2'
            } ${
              isDark
                ? 'bg-white/10 border-white/15 text-white'
                : 'bg-white border-stone-300 text-black shadow-2xs'
            }`}
          >
            <span
              className={`font-['Montserrat'] font-extrabold tabular-nums leading-none ${
                compact ? 'text-base sm:text-lg' : 'text-xl sm:text-2xl'
              } ${isDark ? 'text-[#c4e117]' : 'text-black'}`}
            >
              {unit.value}
            </span>
            <span
              className={`text-[10px] uppercase tracking-wider font-semibold mt-1 ${
                isDark ? 'text-stone-400' : 'text-stone-500'
              }`}
            >
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
