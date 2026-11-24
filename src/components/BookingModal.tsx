import React, { useState } from 'react';
import { X, CheckCircle2, Mail, Phone, ArrowRight, MapPin, Loader2, AlertCircle, Instagram } from 'lucide-react';
import { CONTACT_INFO, DEFAULT_BOOKING_SERVICE } from '../data/siteData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService = DEFAULT_BOOKING_SERVICE
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
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
          service: initialService,
          message: 'Prijava za 3u1 Black Friday paket.',
          source: 'BookingModal (Black Friday)',
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
        throw new Error(data.error || 'Došlo je do greške prilikom slanja poruke.');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Greška pri slanju upita:', err);
      setSubmitError(
        err?.message || 'Greška pri komunikaciji sa serverom. Možete nas pozvati i direktno telefonom.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailSubject = encodeURIComponent(`Black Friday Upit: ${initialService} - ${name}`);
  const mailBody = encodeURIComponent(
    `Poštovani Vuk i Lazar,\n\nZainteresovana sam za Black Friday termin u New Fitems studiju.\n\nIme: ${name}\nTelefon: ${phone}\nEmail: ${email}\nProgram: ${initialService}\n\nPozdrav,\n${name}`
  );
  const directMailLink = `mailto:${CONTACT_INFO.email}?subject=${mailSubject}&body=${mailBody}`;

  const handleResetAndClose = () => {
    setSubmitted(false);
    setSubmitError(null);
    setName('');
    setPhone('');
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF3EB] w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-stone-300 shadow-2xl relative max-h-[90vh] overflow-y-auto text-black">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Zatvori"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6 pr-6">
              <span className="inline-block px-2.5 py-1 rounded-md bg-black text-[#c4e117] font-['Montserrat'] font-extrabold text-[10px] uppercase tracking-wider mb-2.5">
                BLACK FRIDAY −15% · 11.900 DIN
              </span>
              <h3 className="font-['Montserrat'] font-extrabold text-xl sm:text-2xl uppercase tracking-wide text-[#000000] leading-tight">
                Rezerviši svoj termin
              </h3>
              <p className="text-xs text-stone-600 mt-1.5">
                Ostavi podatke, a mi te zovemo u roku od 24h.
              </p>
            </div>

            {submitError && (
              <div className="mb-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold">{submitError}</p>
                  <p className="text-[11px] text-amber-800">
                    Slobodno nas pozovi direktno na <a href={`tel:${CONTACT_INFO.phone}`} className="font-bold underline">{CONTACT_INFO.phoneDisplay}</a>.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Ime i prezime <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="npr. Jelena Petrović"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-black text-sm text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Broj telefona <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="069 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-black text-sm text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="tvoj@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-black text-sm text-stone-900"
                />
              </div>

              <div className="pt-2 space-y-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#c4e117] hover:bg-[#b5d014] disabled:opacity-75 disabled:cursor-not-allowed text-black py-3.5 rounded-xl font-['Montserrat'] font-extrabold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
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

                <p className="text-[11px] text-center text-stone-500">
                  Tvoje podatke koristimo samo da bismo te kontaktirali u vezi sa terminom.
                </p>

                <div className="relative flex items-center justify-center my-2">
                  <div className="border-t border-stone-300 w-full" />
                  <span className="bg-[#FAF3EB] px-3 text-[10px] uppercase tracking-wider text-stone-500 font-bold absolute">
                    ili pozovi
                  </span>
                </div>

                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="w-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-900 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-black" />
                  <span>Pozovi direktno: {CONTACT_INFO.phoneDisplay}</span>
                </a>
              </div>
            </form>

            <div className="mt-4 pt-3 border-t border-stone-300 flex items-center justify-between text-xs text-stone-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Kralja Petra I 87
              </span>
              <a href={`mailto:${CONTACT_INFO.email}`} className="font-medium text-stone-700 hover:underline flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                <span>{CONTACT_INFO.email}</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-[#c4e117] border-2 border-black text-black rounded-full mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-['Montserrat'] font-extrabold text-2xl uppercase tracking-wider text-black">
                Prijava je stigla!
              </h3>
              <p className="text-sm font-semibold text-stone-900">
                Napravila si prvi korak, i to je najteži deo.
              </p>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-sm mx-auto">
              Pozvaćemo te u roku od <strong>24 sata</strong> sa broja{' '}
              <a href={`tel:${CONTACT_INFO.phone}`} className="font-bold text-black underline">
                {CONTACT_INFO.phoneDisplay}
              </a>
              . Sačuvaj ga u imeniku da znaš da smo to mi.
            </p>

            <div className="p-4 bg-white rounded-2xl border border-stone-300 text-left text-xs space-y-1.5">
              <div><strong className="text-black">Ime i prezime:</strong> {name}</div>
              <div><strong className="text-black">Broj telefona:</strong> {phone}</div>
              {email && <div><strong className="text-black">Email:</strong> {email}</div>}
              <div><strong className="text-black">Studio:</strong> Kralja Petra I Karađorđevića 87, Nova Pazova</div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <p className="text-xs text-stone-600">
                Do tada nas zaprati na Instagramu i upoznaj studio:
              </p>
              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#c4e117] hover:bg-[#b5d014] text-black py-3.5 rounded-xl text-xs font-['Montserrat'] font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Instagram className="w-4 h-4" />
                <span>@newfitems.novapazova</span>
              </a>

              <a
                href={directMailLink}
                className="w-full bg-black text-[#CFF3CF] hover:bg-stone-900 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Pošalji i dodatnu kopiju na email</span>
              </a>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full bg-stone-200 text-stone-800 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-stone-300 transition-colors cursor-pointer"
              >
                Zatvori prozor
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
