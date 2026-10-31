import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Clock,
  Car,
  Shield,
  ExternalLink,
  ArrowRight,
  Navigation,
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { CONTACT_INFO } from '../../data/siteData';

interface ContactPageProps {
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'EMS Vođeni Trening',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'ContactPage',
        }),
      });

      const data = await response.json();
      if (!response.ok && !data.success) {
        throw new Error(data.error || 'Došlo je do greške prilikom slanja poruke.');
      }

      setSubmitSuccess(true);
    } catch (err: any) {
      console.error('Greška pri slanju:', err);
      setSubmitError(err?.message || 'Greška pri slanju. Pozovite nas direktno telefonom.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="font-['Caveat'] text-3xl text-stone-600 block">
          Poseti nas
        </span>
        <h1 className="font-['Montserrat'] font-extrabold text-3xl sm:text-5xl uppercase tracking-wider text-[#000000]">
          LOKACIJA & KONTAKT
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 font-normal">
          New Fitems se nalazi u Novoj Pazovi. Radimo isključivo po zakazanim individualnim terminima kako bismo svakom klijentu posvetili 100% pažnje.
        </p>
      </div>

      {/* Main Studio Card & Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Info Column */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-stone-300/80 shadow-md flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div>
              <span className="font-['Caveat'] text-2xl text-stone-600">
                Studio Nova Pazova
              </span>
              <h2 className="font-['Montserrat'] font-extrabold text-2xl sm:text-3xl uppercase tracking-wider text-black">
                NEW FITEMS
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#8ea800] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-bold uppercase text-xs">
                    Adresa
                  </strong>
                  <span>{CONTACT_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#8ea800] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-bold uppercase text-xs">
                    Telefon za pozive
                  </strong>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-black font-semibold">
                    {CONTACT_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#8ea800] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-bold uppercase text-xs">
                    Email upiti
                  </strong>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-black font-semibold">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#8ea800] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-bold uppercase text-xs">
                    Radno vreme
                  </strong>
                  <span>Ponedeljak – Subota: po zakazanim terminima</span>
                </div>
              </div>
            </div>

            {/* Studio amenities */}
            <div className="pt-4 border-t border-stone-100 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-stone-700">
                <Car className="w-4 h-4 text-stone-500" />
                <span>Obezbeđen parking ispred i u blizini studija</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <Shield className="w-4 h-4 text-stone-500" />
                <span>Mirno, intimno okruženje bez gužve i radoznalih pogleda</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex flex-col gap-2.5">
            <button
              onClick={onOpenBooking}
              className="w-full bg-[#000000] hover:bg-stone-900 text-[#CFF3CF] py-3.5 rounded-xl font-['Montserrat'] font-extrabold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Zakaži termin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={CONTACT_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-stone-100 hover:bg-stone-200 text-stone-900 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Otvori na Google Maps</span>
            </a>
          </div>
        </div>

        {/* Map Column */}
        <div className="lg:col-span-7 min-w-0 w-full max-w-full bg-white rounded-3xl p-2.5 sm:p-3 border border-stone-300/80 shadow-md overflow-hidden flex flex-col">
          <div className="w-full min-w-0 h-[280px] sm:h-[420px] rounded-2xl overflow-hidden border border-stone-200 relative bg-stone-100">
            <iframe
              title="New Fitems Google Map"
              src="https://maps.google.com/maps?q=Kralja%20Petra%20I%20Kara%C4%91or%C4%91evi%C4%87a%2087,%20Nova%20Pazova&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 block"
              loading="lazy"
            />
          </div>
        </div>

      </div>

      {/* Video vodič - Kako doći do nas */}
      <div id="kako-doci-do-nas" className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-300/80 shadow-md overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text & Guidance details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CFF3CF] text-black font-bold text-xs uppercase tracking-wider">
              <Navigation className="w-3.5 h-3.5 text-black" />
              <span>Video vodič</span>
            </div>

            <div>
              <span className="font-['Caveat'] text-2xl text-stone-600 block">
                Prvi put dolaziš?
              </span>
              <h2 className="font-['Montserrat'] font-extrabold text-2xl sm:text-4xl uppercase tracking-wider text-black">
                Kako doći do nas
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
              Pogledajte kratak video snimak sa tačnim smernicama za dolazak do New Fitems studija u Novoj Pazovi — gde skrenuti, gde parkirati vozilo i gde se tačno nalazi ulaz.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-stone-700">
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FAF3EB] border border-stone-200">
                <MapPin className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-bold uppercase text-[11px]">
                    Adresa
                  </strong>
                  <span>{CONTACT_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FAF3EB] border border-stone-200">
                <Car className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-bold uppercase text-[11px]">
                    Parking
                  </strong>
                  <span>Obezbeđen slobodan parking ispred studija</span>
                </div>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap gap-3">
              <a
                href={CONTACT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#000000] hover:bg-stone-900 text-[#CFF3CF] px-5 py-3 rounded-xl font-['Montserrat'] font-extrabold uppercase tracking-wider text-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Otvori Google navigaciju</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="bg-[#CFF3CF] hover:bg-[#b2f0b2] text-black px-5 py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-all cursor-pointer"
              >
                Zakaži termin
              </button>
            </div>
          </div>

          {/* Video Player */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-black rounded-3xl p-2 sm:p-3 shadow-xl border border-stone-800">
              <div className="relative rounded-2xl overflow-hidden bg-stone-950 aspect-[9/16] max-h-[560px] mx-auto flex items-center justify-center">
                <video
                  src="https://64.media.tumblr.com/9920210a235710b56168d3835a20c527/3972bd7ddfb573a9-a7/s720/002fd65caf8babbda2826f1f2e992dc36eed4118.mov"
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain block"
                  title="Kako doći do nas - New Fitems Nova Pazova"
                >
                  <source
                    src="https://64.media.tumblr.com/9920210a235710b56168d3835a20c527/3972bd7ddfb573a9-a7/s720/002fd65caf8babbda2826f1f2e992dc36eed4118.mov"
                    type="video/mp4"
                  />
                  <source
                    src="https://64.media.tumblr.com/9920210a235710b56168d3835a20c527/3972bd7ddfb573a9-a7/s720/002fd65caf8babbda2826f1f2e992dc36eed4118.mov"
                    type="video/quicktime"
                  />
                  Vaš pretraživač ne podržava reprodukciju ovog videa.
                </video>
              </div>

              <div className="pt-2 px-2 pb-1 flex items-center justify-between text-[11px] text-stone-400">
                <span className="flex items-center gap-1.5 text-[#CFF3CF] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#c4e117] animate-pulse"></span>
                  Video: Kako doći do nas
                </span>
                <span>New Fitems · Nova Pazova</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Online Contact Form powered by Brevo SMTP */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-300/80 shadow-md">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <span className="font-['Caveat'] text-2xl text-stone-600 block">
            Direktna poruka
          </span>
          <h2 className="font-['Montserrat'] font-extrabold text-2xl sm:text-3xl uppercase tracking-wider text-black">
            PIŠITE NAM DIREKTNO
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Imate pitanje ili želite više informacija? Pošaljite nam poruku i odgovorićemo vam u najkraćem roku.
          </p>
        </div>

        {submitSuccess ? (
          <div className="max-w-lg mx-auto text-center p-8 bg-[#FAF3EB] rounded-2xl border border-stone-300 space-y-4">
            <div className="w-14 h-14 bg-[#CFF3CF] border-2 border-black rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-black" />
            </div>
            <h3 className="font-['Montserrat'] font-extrabold text-xl uppercase tracking-wider text-black">
              Hvala na poruci!
            </h3>
            <p className="text-xs sm:text-sm text-stone-700">
              Vaš upit je uspešno prosleđen našem timu preko Brevo email sistema. Javićemo vam se ubrzo na broj telefona ili email.
            </p>
            <button
              onClick={() => {
                setSubmitSuccess(false);
                setFormData({ name: '', phone: '', email: '', service: 'EMS Vođeni Trening', message: '' });
              }}
              className="bg-black text-[#CFF3CF] hover:bg-stone-900 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Pošalji novu poruku
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
            {submitError && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p>{submitError}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                  Vaše Ime i Prezime <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="npr. Milica Jovanović"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-[#FAF3EB]/50 focus:bg-white focus:outline-none focus:border-black text-sm text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                  Broj telefona <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="069 123 4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-[#FAF3EB]/50 focus:bg-white focus:outline-none focus:border-black text-sm text-stone-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                  Email adresa <span className="text-stone-400 font-normal lowercase">(opciono)</span>
                </label>
                <input
                  type="email"
                  placeholder="vas.email@primer.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-[#FAF3EB]/50 focus:bg-white focus:outline-none focus:border-black text-sm text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                  Program koji vas interesuje
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-[#FAF3EB]/50 focus:bg-white focus:outline-none focus:border-black text-sm text-stone-900 cursor-pointer"
                >
                  <option value="EMS Vođeni Trening">EMS Vođeni Trening (30 min)</option>
                  <option value="Vakum Sprava sa IR Svetlima">Vakum Sprava sa IR Svetlima</option>
                  <option value="Madero Roler Terapija">Madero Roler Terapija</option>
                  <option value="90-Dnevni Total Fit">90-Dnevni Total Fit Program</option>
                  <option value="Opšta pitanja i konsultacije">Opšta pitanja i konsultacije</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                Vaša poruka ili pitanje
              </label>
              <textarea
                rows={3}
                placeholder="Napišite pitanje o terminima, treninzima, spravama ili cenama..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-[#FAF3EB]/50 focus:bg-white focus:outline-none focus:border-black text-sm text-stone-900 resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-black hover:bg-stone-900 disabled:opacity-75 disabled:cursor-not-allowed text-[#CFF3CF] rounded-xl font-['Montserrat'] font-extrabold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#CFF3CF]" />
                    <span>Slanje preko Brevo servera...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Pošalji poruku</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Social Networks Strip */}
      <div className="bg-[#000000] text-[#FAF3EB] rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <span className="font-['Caveat'] text-2xl text-[#CFF3CF]">
            Povežimo se
          </span>
          <h3 className="font-['Montserrat'] font-extrabold text-2xl uppercase tracking-wider text-white">
            PRATI NAS NA DRUŠTVENIM MREŽAMA
          </h3>
          <p className="text-xs text-stone-400">
            Objavljujemo savete za trening, prikaze vežbi i atmosferu iz studija.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={CONTACT_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-[#CFF3CF] hover:text-black flex items-center justify-center transition-all cursor-pointer"
            title="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href={CONTACT_INFO.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-[#CFF3CF] hover:text-black flex items-center justify-center transition-all cursor-pointer"
            title="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href={CONTACT_INFO.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-[#CFF3CF] hover:text-black flex items-center justify-center transition-all cursor-pointer font-bold text-xs"
            title="TikTok"
          >
            Tk
          </a>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-[#CFF3CF] hover:text-black flex items-center justify-center transition-all cursor-pointer"
            title="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

    </div>
  );
};
