import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Users, Clock, ShieldCheck, Dumbbell, HeartHandshake, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { CONTACT_INFO } from '../../data/siteData';
import { ShapeDivider } from '../ShapeDivider';

interface ConceptPageProps {
  onOpenBooking: () => void;
  onNavigate: (page: string) => void;
}

export const ConceptPage: React.FC<ConceptPageProps> = ({ onOpenBooking, onNavigate }) => {
  return (
    <div className="space-y-16 pb-16 overflow-hidden">
      
      {/* 1. Distinctive Brand Concept Hero with Dark Contrast, Background Image & Diagonal Layered Divider */}
      <section className="relative w-full -mt-4 sm:-mt-8 bg-stone-950 text-white pt-24 sm:pt-28 md:pt-16 pb-28 sm:pb-36 lg:pb-44 overflow-hidden">
        
        {/* Background Image with Dark Scrim */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
          <img
            src="https://64.media.tumblr.com/893cd77fa9c94a77ca17990a0430b4a8/822f13a412d29853-a1/s2048x3072/0fbe7b2cb3c43b766b4902af70338b40a712ccc6.jpg"
            alt="New Fit EMS Koncept"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 opacity-40 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/90 to-stone-950/70" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c4e117]/15 rounded-full blur-[100px] pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Bold Editorial Typography */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2">
                <span className="font-['Caveat'] text-2xl sm:text-3xl text-[#CFF3CF]">
                  Brend koncept
                </span>
                <span className="text-[#c4e117] font-bold text-lg">•</span>
                <span className="font-['Montserrat'] font-extrabold text-xs sm:text-sm uppercase tracking-widest text-stone-300">
                  Nova Pazova
                </span>
              </div>

              <h1 className="font-['Montserrat'] font-extrabold text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wider text-white leading-tight">
                FITNES PROGRAM ZA ŽENE I MUŠKARCE KOJI CENE SVOJE VREME
              </h1>

              {/* Designer Document Quote in Dark Contrast Div */}
              <div className="p-6 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-md text-stone-200 text-sm sm:text-base leading-relaxed font-normal shadow-lg">
                "New FIT EMS je fitness program namenjen muškarcima i ženama. Program se sastoji iz vežbanja na spravama koje aktiviraju i stimulišu rad mišića uz vođeni trening. Treninzi traju 30 minuta što je idealno za klijente koji nemaju vremena da se dovoljno posvete treninzima u teretani, ali ipak žele da ostanu u formi i aktiviraju mišiće."
              </div>

              <div className="flex flex-wrap gap-3 pt-2 text-xs font-bold uppercase tracking-wider">
                <button
                  onClick={onOpenBooking}
                  className="bg-[#c4e117] hover:bg-[#b0cb13] text-black font-['Montserrat'] font-extrabold px-7 py-4 rounded-2xl transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_20px_rgba(196,225,23,0.35)]"
                >
                  <span>Zakaži termin za razgovor</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('services')}
                  className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-4 rounded-2xl transition-all cursor-pointer"
                >
                  Upoznaj sve sprave
                </button>
              </div>
            </div>

            {/* Right Column: Dark Floating Feature Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-stone-900/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#c4e117]/20 border border-[#c4e117]/40 flex items-center justify-center text-[#c4e117]">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="font-['Montserrat'] font-extrabold text-xl uppercase tracking-wider text-white">
                    3 STUBA PROGRAMA
                  </h3>
                </div>

                <div className="space-y-3 text-xs text-stone-300">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#c4e117] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-bold mb-0.5">Maksimalna mišićna kontrakcija</strong>
                      Preko 90% aktivnih vlakana istovremeno u 30 minuta.
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#c4e117] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-bold mb-0.5">Podrška 1-na-1 bez stresa</strong>
                      Trener je uvek uz tebe, podešava opremu i prati formu.
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#c4e117] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-bold mb-0.5">Bez teških tegova i povreda</strong>
                      Kičma i zglobovi su zaštićeni tokom celog treninga.
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Distinctive Diagonal Slanted Wave Shape Divider merging into #FAF3EB */}
        <div className="absolute -bottom-[1px] left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
          <ShapeDivider
            type="slant"
            height={90}
            color="#FAF3EB"
          />
        </div>

      </section>

      {/* 2. Team & Philosophy Section with the Requested Team Image in the Background (Vuk & Lazar) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden border border-stone-300/80 shadow-xl bg-stone-950 text-white">
          
          {/* Background Team Photo with Gradient Overlay */}
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
            <img
              src="https://64.media.tumblr.com/543f5f7db81e11fd74b55399f9b704fc/822f13a412d29853-8d/s2048x3072/3e166ea931fd21dd0f1ae668a0b153b814956405.jpg"
              alt="Stručni tim Vuk i Lazar"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center lg:object-right opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/95 to-stone-950/75" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Vuk & Lazar */}
              <div className="lg:col-span-5 space-y-5">
                <div className="space-y-2">
                  <span className="font-['Caveat'] text-2xl sm:text-3xl text-[#CFF3CF]">
                    Tvoj stručni tim
                  </span>
                  <h2 className="font-['Montserrat'] font-extrabold text-3xl sm:text-4xl uppercase tracking-wider text-white">
                    VUK & LAZAR
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                  Licencirani treneri posvećeni tome da svaki vežbač izvuče maksimum iz svog termina. Nema osuđivanja, nema poređenja sa drugima — samo iskrena podrška, pravilan stav i motivacija.
                </p>

                {/* Stress-Free Approach Card */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#c4e117]">
                    <HeartHandshake className="w-4 h-4" />
                    <span className="font-bold uppercase tracking-wider">Pristup bez stresa</span>
                  </div>
                  <p className="text-stone-300">
                    Prilagođavamo intenzitet prema tvom danu i kondiciji. Bilo da si tek rodila, imaš sedelački posao ili se vraćaš treninzima posle pauze.
                  </p>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto bg-[#c4e117] hover:bg-[#b0cb13] text-black font-['Montserrat'] font-extrabold uppercase tracking-wider px-6 py-3.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Zakaži probni termin sa Vukom i Lazarom</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right Column: Philosophy 4 Pillars */}
              <div className="lg:col-span-7 bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/15 space-y-5">
                <div>
                  <span className="font-['Caveat'] text-2xl text-[#CFF3CF] block">
                    Naša filozofija
                  </span>
                  <h3 className="font-['Montserrat'] font-extrabold text-xl sm:text-2xl uppercase tracking-wider text-white">
                    ZAŠTO OVO RADI TAMO GDE KLASIČNA TERETANA NIJE?
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div className="p-4 bg-stone-900/80 rounded-2xl border border-white/10 space-y-1">
                    <span className="font-['Montserrat'] font-extrabold text-sm uppercase text-[#c4e117] block">
                      1. Nema praznog hoda
                    </span>
                    <p className="text-stone-300 leading-relaxed font-normal">
                      U klasičnoj teretani 70% vremena ode na čekanje sprava i pauze. Kod nas je svaki od 30 minuta isplaniran i vođen.
                    </p>
                  </div>

                  <div className="p-4 bg-stone-900/80 rounded-2xl border border-white/10 space-y-1">
                    <span className="font-['Montserrat'] font-extrabold text-sm uppercase text-[#c4e117] block">
                      2. Zaštita zglobova
                    </span>
                    <p className="text-stone-300 leading-relaxed font-normal">
                      EMS stvara snažnu mišićnu kontrakciju bez teških tegova koji opterećuju kolena, ramena ili lumbalni deo.
                    </p>
                  </div>

                  <div className="p-4 bg-stone-900/80 rounded-2xl border border-white/10 space-y-1">
                    <span className="font-['Montserrat'] font-extrabold text-sm uppercase text-[#c4e117] block">
                      3. Sinergija tehnologije
                    </span>
                    <p className="text-stone-300 leading-relaxed font-normal">
                      Kombinacija EMS-a, vakum kapsule sa IR svetlima i madero rolera daje trostruki učinak na tonus i cirkulaciju.
                    </p>
                  </div>

                  <div className="p-4 bg-stone-900/80 rounded-2xl border border-white/10 space-y-1">
                    <span className="font-['Montserrat'] font-extrabold text-sm uppercase text-[#c4e117] block">
                      4. Opušten ambijent
                    </span>
                    <p className="text-stone-300 leading-relaxed font-normal">
                      Studio u Novoj Pazovi je intiman i prijatan. Dolaziš u zakazani termin i radiš 1-na-1 sa Vukom ili Lazarom.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. Visual Identity Palette Reference */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-300/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="font-['Caveat'] text-2xl text-stone-600">
                Paleta boja i estetika
              </span>
              <h3 className="font-['Montserrat'] font-extrabold text-2xl uppercase tracking-wider text-black">
                MINIMALIZAM I ENERGIJA STUDIJA
              </h3>
            </div>
            <p className="text-xs text-stone-500 max-w-sm">
              Kombinacija svetlih pastelnih tonova, neutralne sive i čistih crnih linija stvara umirujuć, prijatan prostor za vežbanje.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl border border-stone-200 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-[#000000] mb-3 shadow-xs" />
              <span className="font-['Montserrat'] font-extrabold text-xs uppercase tracking-wider text-black">#000000</span>
              <span className="text-[11px] text-stone-500">Crna / Kontrast</span>
            </div>

            <div className="p-4 rounded-2xl border border-stone-200 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-[#CFF3CF] mb-3 shadow-xs" />
              <span className="font-['Montserrat'] font-extrabold text-xs uppercase tracking-wider text-black">#CFF3CF</span>
              <span className="text-[11px] text-stone-500">Pastelno zelena</span>
            </div>

            <div className="p-4 rounded-2xl border border-stone-200 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-[#FAF3EB] border border-stone-300 mb-3 shadow-xs" />
              <span className="font-['Montserrat'] font-extrabold text-xs uppercase tracking-wider text-black">#FAF3EB</span>
              <span className="text-[11px] text-stone-500">Topla bež</span>
            </div>

            <div className="p-4 rounded-2xl border border-stone-200 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-[#838487] mb-3 shadow-xs" />
              <span className="font-['Montserrat'] font-extrabold text-xs uppercase tracking-wider text-black">#838487</span>
              <span className="text-[11px] text-stone-500">Neutralna siva</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
