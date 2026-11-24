import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Clock,
  ChevronDown,
  Phone,
  Instagram,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Users,
  Sparkles,
  MapPin
} from 'lucide-react';
import {
  BLACK_FRIDAY_FAQ,
  BLACK_FRIDAY_STEPS,
  CLIENT_STORIES,
  CONTACT_INFO,
  DEFAULT_BOOKING_SERVICE,
  PRICING_PACKAGES
} from '../../data/siteData';
import { ShapeDivider } from '../ShapeDivider';
import { OrganicShapeBanner } from '../OrganicShapeBanner';
import { BeforeAfterSlider } from '../BeforeAfterSlider';
import { BlackFridayCountdown } from '../BlackFridayCountdown';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Inline Black Friday reservation form state ([9] FORMA — Ime i prezime, Broj telefona, Email)
  const formSectionRef = useRef<HTMLElement | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const pkg = PRICING_PACKAGES[0];
  const featuredTestimonials = CLIENT_STORIES.slice(0, 2);

  const scrollToBookingForm = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          service: DEFAULT_BOOKING_SERVICE,
          message: 'Prijava za 3u1 Black Friday paket.',
          source: 'Black Friday Landing (/black-friday)',
        }),
      });

      const rawText = await response.text();
      let data: any = {};
      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch {
        throw new Error('Server nije vratio ispravan JSON odgovor. Proveri Vercel /api/send-email podešavanja.');
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Došlo je do greške prilikom slanja prijave.');
      }

      if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
        (window as any).fbq('track', 'Lead', {
          content_name: DEFAULT_BOOKING_SERVICE,
          value: 11900,
          currency: 'RSD',
        });
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Greška pri slanju prijave:', err);
      setSubmitError(
        err?.message || 'Greška pri komunikaciji sa serverom. Možeš nas pozvati i direktno telefonom.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.5, ease: 'easeOut' as const },
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 overflow-hidden">

      {/* [1] NASLOV — Clean, focused Hero without cluttered text or extra side box */}
      <OrganicShapeBanner
        imageSrc="https://64.media.tumblr.com/893cd77fa9c94a77ca17990a0430b4a8/822f13a412d29853-a1/s2048x3072/0fbe7b2cb3c43b766b4902af70338b40a712ccc6.jpg"
        imageAlt="New Fitems 3u1 paket Black Friday"
        className="-mt-4 sm:-mt-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-[#000000] text-[#c4e117] font-['Montserrat'] font-extrabold text-xs uppercase tracking-wider shadow-sm whitespace-nowrap">
            BLACK FRIDAY PONUDA · −15%
          </span>
          <span className="font-['Montserrat'] font-bold text-xs uppercase tracking-widest text-stone-700">
            NEW FITEMS · NOVA PAZOVA
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-['Montserrat'] font-extrabold text-[34px] xs:text-[40px] sm:text-5xl lg:text-[58px] tracking-tight text-black leading-[1.04] text-balance max-md:[text-shadow:_0_1px_12px_rgba(250,243,235,0.95)]"
        >
          Tvojih 75 minuta. Dva puta nedeljno.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="text-sm sm:text-lg text-stone-800 max-md:text-stone-950 leading-relaxed max-w-lg max-md:[text-shadow:_0_1px_10px_rgba(250,243,235,0.95)]"
        >
          Bez pretrpane teretane i bez znanja o vežbanju, sa trenerom koji je uz tebe od prvog do poslednjeg minuta.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="space-y-3 pt-1"
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-base sm:text-lg text-stone-500 line-through tabular-nums">
              14.000 din
            </span>
            <span className="font-['Montserrat'] font-extrabold text-2xl sm:text-4xl text-black tabular-nums">
              11.900 din mesečno
            </span>
          </div>
          <BlackFridayCountdown variant="light" compact />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-2"
        >
          <button
            onClick={scrollToBookingForm}
            className="w-full sm:w-auto bg-[#c4e117] hover:bg-[#b5d014] active:scale-[0.98] text-black px-8 py-4 rounded-2xl font-['Montserrat'] font-extrabold tracking-wider text-sm sm:text-base uppercase transition-all shadow-md inline-flex items-center justify-center gap-2.5 cursor-pointer group whitespace-nowrap"
          >
            <span>Rezerviši svoj termin</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </OrganicShapeBanner>

      {/* [2] PREPOZNAJEŠ LI SE? & [3] REŠENJE */}
      <motion.section {...fadeInUp} className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          <div className="lg:col-span-6 bg-white rounded-3xl p-7 sm:p-10 border border-stone-300/80 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="font-['Caveat'] text-2xl sm:text-3xl text-stone-600 block">
                Prepoznaješ li se?
              </span>
              <h2 className="font-['Montserrat'] font-extrabold text-2xl sm:text-3xl text-black leading-tight text-balance">
                Uvek postoji nešto preče od tebe.
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-stone-700 leading-relaxed">
                <p>
                  Posao, kuća, obaveze. Vreme za sebe ostaje „za kad stignem“.
                </p>
                <p>
                  A teretana deluje strašno: ne znaš sprave, ne znaš odakle da kreneš i ne želiš da se osećaš izgubljeno.
                </p>
              </div>
            </div>

            <div className="pt-5 border-t border-stone-200 space-y-1">
              <p className="font-semibold text-sm sm:text-base text-black">
                Ne treba ti još jedna stvar koju moraš sama da smišliš.
              </p>
              <p className="text-sm text-stone-600">
                Treba ti mesto gde dođeš, a sve ostalo je već spremno.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#000000] text-[#FAF3EB] rounded-3xl p-7 sm:p-10 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="font-['Caveat'] text-2xl sm:text-3xl text-[#c4e117] block">
                Rešenje
              </span>
              <h2 className="font-['Montserrat'] font-extrabold text-2xl sm:text-3xl text-white leading-tight text-balance">
                Tri tretmana. Jedan dolazak. Nula razmišljanja.
              </h2>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                U 3u1 paketu ne moraš da znaš ništa. Dođeš, a trener te vodi kroz tri koraka koja se međusobno nadovezuju, u malom studiju, bez gužve i bez tuđih pogleda.
              </p>
            </div>

            <div className="pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center gap-2 text-stone-300 font-medium">
                <span className="text-white font-bold">01 Vakuum 30 min</span>
                <span aria-hidden="true" className="text-[#c4e117]">·</span>
                <span className="text-white font-bold">02 Madero 15 min</span>
                <span aria-hidden="true" className="text-[#c4e117]">·</span>
                <span className="text-white font-bold">03 EMS 30 min</span>
              </div>
              <span className="font-['Montserrat'] font-extrabold text-[#c4e117] uppercase tracking-wider tabular-nums">
                = 75 min
              </span>
            </div>
          </div>

        </div>
      </motion.section>

      {/* [4] KORAK PO KORAK — Kako izgleda tvoj dolazak (Vakuum, Madero roller, EMS) */}
      <motion.section {...fadeInUp} className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-['Caveat'] text-2xl sm:text-3xl text-stone-600 block">
            Korak po korak u studiju
          </span>
          <h2 className="font-['Montserrat'] font-extrabold text-3xl sm:text-4xl uppercase tracking-wide text-black text-balance">
            Kako izgleda tvoj dolazak
          </h2>
          <p className="text-sm text-stone-600">
            Svaki tvoj termin traje ukupno 75 minuta i prati tačan redosled od tri povezana tretmana:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {BLACK_FRIDAY_STEPS.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="bg-white rounded-3xl border border-stone-300/80 shadow-md overflow-hidden flex flex-col justify-between group hover:border-black transition-colors"
            >
              <div>
                <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-stone-900">
                  <img
                    src={step.image}
                    alt={`${step.title} - ${step.subtitle}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/25" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-lg bg-[#000000] text-[#c4e117] font-['Montserrat'] font-extrabold text-xs tracking-wider uppercase tabular-nums">
                      Korak {step.step}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 tabular-nums">
                      <Clock className="w-3.5 h-3.5 text-[#c4e117]" />
                      {step.duration}
                    </span>
                  </div>

                  <div className="absolute bottom-9 left-5 right-5 z-10">
                    <p className="text-xs font-medium text-[#CFF3CF]">
                      {step.subtitle}
                    </p>
                    <h3 className="font-['Montserrat'] font-extrabold text-xl sm:text-2xl uppercase tracking-wide text-white mt-0.5">
                      {step.title}
                    </h3>
                  </div>

                  <div className="absolute -bottom-[1px] left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
                    <ShapeDivider
                      type="diagonal-layered-waves"
                      height={42}
                      color="#ffffff"
                      accentColor="rgba(196, 225, 23, 0.35)"
                    />
                  </div>
                </div>

                <div className="p-6 pt-3 space-y-3">
                  <p className="text-sm text-stone-800 leading-relaxed font-normal">
                    {step.description}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed pt-3 border-t border-stone-100">
                    {step.visualNote}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#FAF3EB] border border-stone-300 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-black text-[#c4e117] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-['Montserrat'] font-extrabold text-base sm:text-lg text-black tabular-nums">
                Ukupno: 1h 15min, dva puta nedeljno.
              </p>
              <p className="text-xs text-stone-600">
                Vakuum trening (30 min) + Madero roller (15 min) + EMS tretman (30 min) u jednom dolasku.
              </p>
            </div>
          </div>

          <button
            onClick={scrollToBookingForm}
            className="bg-black hover:bg-stone-900 text-[#c4e117] px-5 py-3 rounded-xl font-['Montserrat'] font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap"
          >
            <span>Rezerviši svoj termin</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.section>

      {/* TRANSFORMACIJA (3u1 program) — odmah posle korak po korak */}
      <motion.div {...fadeInUp}>
        <BeforeAfterSlider onOpenBooking={scrollToBookingForm} />
      </motion.div>

      {/* [5] SVE PRILAGOĐENO TEBI — Zašto New Fitems */}
      <motion.section {...fadeInUp} className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="max-w-2xl space-y-1">
          <span className="font-['Caveat'] text-2xl sm:text-3xl text-stone-600 block">
            Zašto New Fitems
          </span>
          <h2 className="font-['Montserrat'] font-extrabold text-2xl sm:text-4xl uppercase tracking-wide text-black">
            Sve prilagođeno tebi
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: <Users className="w-5 h-5" />,
              title: 'Trener uz tebe sve vreme',
              text: 'Nisi prepuštena sebi. Svaki korak vodimo zajedno.',
            },
            {
              icon: <ShieldCheck className="w-5 h-5" />,
              title: 'Mali studio, bez gužve',
              text: 'Nema čekanja na sprave ni pogleda sa strane. Samo ti i tvoj termin.',
            },
            {
              icon: <Sparkles className="w-5 h-5" />,
              title: 'Ne moraš da znaš da treniraš',
              text: 'Program prilagođavamo tvom nivou, bilo da kreneš od nule ili se vraćaš posle pauze.',
            },
            {
              icon: <MapPin className="w-5 h-5" />,
              title: 'U Novoj Pazovi, sa parkingom',
              text: 'Kralja Petra I Karađorđevića 87. Blizu kuće, bez gubljenja vremena na put.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-stone-300/80 shadow-2xs space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-black text-[#c4e117] flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="font-['Montserrat'] font-extrabold text-base sm:text-lg text-black leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* CENA PAKETA — 3u1 paket (Black Friday −15%) */}
      <motion.section {...fadeInUp} className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-[#000000] text-[#FAF3EB] rounded-3xl p-7 sm:p-10 lg:p-12 shadow-2xl ring-2 ring-[#c4e117]/70">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

            <div className="md:col-span-7 space-y-5">
              <div>
                <span className="inline-block bg-[#c4e117] text-black font-['Montserrat'] font-extrabold text-xs uppercase tracking-wider px-3.5 py-1 rounded-md mb-3">
                  {pkg.badge}
                </span>
                <h2 className="font-['Montserrat'] font-extrabold text-3xl sm:text-4xl uppercase tracking-wide text-white">
                  {pkg.name}
                </h2>
              </div>

              <div className="space-y-3 pt-1">
                {pkg.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-[#c4e117] text-black flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-stone-100 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 bg-white/5 border border-white/15 rounded-2xl p-6 space-y-4">
              <div>
                <div className="text-base text-stone-400 line-through tabular-nums">
                  {pkg.regularPrice} {pkg.currency}
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-['Montserrat'] font-extrabold text-4xl sm:text-5xl text-white tracking-tight tabular-nums">
                    {pkg.price}
                  </span>
                  <span className="text-base font-bold text-[#c4e117]">
                    {pkg.currency}
                  </span>
                </div>
                <div className="text-xs text-stone-300 mt-1 font-medium">
                  {pkg.period}
                </div>
              </div>

              <p className="text-xs text-[#CFF3CF] leading-relaxed pt-3 border-t border-white/10 font-medium">
                {pkg.deadlineNote}
              </p>

              <button
                onClick={scrollToBookingForm}
                className="w-full bg-[#c4e117] hover:bg-[#b5d014] active:scale-[0.98] text-black font-['Montserrat'] font-extrabold uppercase tracking-wider py-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Želim 3u1 paket</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </motion.section>

      {/* UTISCI — odmah ispod cene paketa */}
      <motion.section {...fadeInUp} className="max-w-6xl mx-auto px-4 sm:px-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="font-['Caveat'] text-2xl sm:text-3xl text-stone-600 block">
              Stvarne promene naših članova
            </span>
            <h2 className="font-['Montserrat'] font-extrabold text-2xl sm:text-3xl uppercase tracking-wide text-black">
              Utisci iz studija
            </h2>
          </div>
          <button
            onClick={() => onNavigate('stories')}
            className="text-xs font-bold uppercase tracking-wider text-stone-800 hover:text-black flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>Pogledaj sva iskustva i video snimke</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featuredTestimonials.map((story) => (
            <div
              key={story.name}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-300/80 shadow-xs flex flex-col justify-between space-y-4"
            >
              <p className="text-sm text-stone-800 leading-relaxed italic">
                „{story.quote}“
              </p>
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-black text-[#c4e117] font-bold flex items-center justify-center text-[11px]">
                    {story.avatar}
                  </div>
                  <div>
                    <strong className="text-black font-bold">{story.name}</strong>
                    <span className="text-stone-500"> · {story.city}</span>
                  </div>
                </div>
                <span className="font-bold text-stone-900">{story.result}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* [8] ČESTA PITANJA */}
      <motion.section {...fadeInUp} className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-1">
          <span className="font-['Caveat'] text-2xl sm:text-3xl text-stone-600 block">
            Sve što te možda zanima
          </span>
          <h2 className="font-['Montserrat'] font-extrabold text-2xl sm:text-4xl uppercase tracking-wide text-black">
            Česta pitanja
          </h2>
        </div>

        <div className="space-y-3">
          {BLACK_FRIDAY_FAQ.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-300/80 overflow-hidden transition-colors hover:border-stone-400"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-['Montserrat'] font-bold text-sm sm:text-base text-black">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-black' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-3 text-xs sm:text-sm text-stone-700 leading-relaxed border-t border-stone-100 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* [9] FORMA — Samo Ime i prezime, Broj telefona i Email */}
      <motion.section
        id="rezervacija"
        ref={formSectionRef}
        {...fadeInUp}
        className="max-w-3xl mx-auto px-4 sm:px-6 scroll-mt-24"
      >
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-300 shadow-xl">
          {!submitted ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-md bg-black text-[#c4e117] font-['Montserrat'] font-extrabold text-[11px] uppercase tracking-wider">
                  BLACK FRIDAY −15%
                </span>
                <h2 className="font-['Montserrat'] font-extrabold text-2xl sm:text-3xl text-black leading-tight text-balance">
                  Rezerviši svoj termin po Black Friday ceni od 11.900 din
                </h2>
                <p className="text-sm text-stone-600">
                  Ostavi podatke, a mi te zovemo u roku od 24h.
                </p>
              </div>

              {submitError && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">{submitError}</p>
                    <p>
                      Možeš nas pozvati direktno na{' '}
                      <a href={`tel:${CONTACT_INFO.phone}`} className="font-bold underline">
                        {CONTACT_INFO.phoneDisplay}
                      </a>
                      .
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="bf-name"
                    className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5"
                  >
                    Ime i prezime <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="bf-name"
                    type="text"
                    required
                    placeholder="npr. Jelena Petrović"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-300 bg-[#FAF3EB]/40 focus:bg-white focus:outline-none focus:border-black text-sm text-stone-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="bf-phone"
                      className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5"
                    >
                      Broj telefona <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="bf-phone"
                      type="tel"
                      required
                      placeholder="069 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-stone-300 bg-[#FAF3EB]/40 focus:bg-white focus:outline-none focus:border-black text-sm text-stone-900"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="bf-email"
                      className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="bf-email"
                      type="email"
                      placeholder="tvoj@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-stone-300 bg-[#FAF3EB]/40 focus:bg-white focus:outline-none focus:border-black text-sm text-stone-900"
                    />
                  </div>
                </div>

                <div className="pt-2 space-y-2.5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#c4e117] hover:bg-[#b5d014] disabled:opacity-75 disabled:cursor-not-allowed text-black py-4 rounded-xl font-['Montserrat'] font-extrabold uppercase tracking-wider text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        <span>Slanje prijave...</span>
                      </>
                    ) : (
                      <>
                        <span>Želim 3u1 paket</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-stone-500 text-center">
                    Tvoje podatke koristimo samo da bismo te kontaktirali u vezi sa terminom.
                  </p>
                </div>
              </form>
            </div>
          ) : (
            /* [STRANICA „HVALA“] */
            <div className="py-6 sm:py-8 text-center space-y-5">
              <div className="w-16 h-16 bg-[#c4e117] border-2 border-black text-black rounded-full mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h2 className="font-['Montserrat'] font-extrabold text-2xl sm:text-4xl uppercase tracking-wide text-black">
                  Prijava je stigla!
                </h2>
                <p className="text-base sm:text-lg font-semibold text-stone-900">
                  Napravila si prvi korak, i to je najteži deo.
                </p>
              </div>

              <p className="text-sm text-stone-700 leading-relaxed max-w-md mx-auto">
                Pozvaćemo te u roku od <strong>24 sata</strong> sa broja{' '}
                <a href={`tel:${CONTACT_INFO.phone}`} className="font-bold text-black underline whitespace-nowrap">
                  {CONTACT_INFO.phoneDisplay}
                </a>
                . Sačuvaj ga u imeniku da znaš da smo to mi.
              </p>

              <div className="pt-2 space-y-3 max-w-sm mx-auto">
                <p className="text-xs text-stone-600">
                  Do tada nas zaprati na Instagramu i upoznaj studio:
                </p>
                <a
                  href={CONTACT_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#c4e117] hover:bg-[#b5d014] text-black py-3.5 px-6 rounded-xl font-['Montserrat'] font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@newfitems.novapazova</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </motion.section>

      {/* [10] ZAVRŠNI POZIV */}
      <motion.section {...fadeInUp} className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#000000] text-[#FAF3EB] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="font-['Montserrat'] font-extrabold text-2xl sm:text-4xl text-white leading-tight text-balance">
              Dosta je bilo „od ponedeljka“. <span className="text-[#c4e117]">Kreni sada.</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              Akcija traje do 30. novembra.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={scrollToBookingForm}
              className="w-full sm:w-auto bg-[#c4e117] hover:bg-[#b5d014] text-black px-7 py-4 rounded-xl font-['Montserrat'] font-extrabold uppercase tracking-wider text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Rezerviši svoj termin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-5 py-4 rounded-xl font-bold text-xs uppercase tracking-wider border border-white/15 flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#c4e117]" />
              <span>{CONTACT_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </motion.section>

    </div>
  );
};
