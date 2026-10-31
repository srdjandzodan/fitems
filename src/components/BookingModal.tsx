import React, { useState } from 'react';
import { X, CheckCircle2, Mail, Phone, ArrowRight, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { CONTACT_INFO } from '../data/siteData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService = 'EMS Vođeni Trening'
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [service, setService] = useState(initialService);
  const [timePreference, setTimePreference] = useState('Popodne (14:00 – 18:00)');
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
          service,
          timePreference,
          message: notes.trim(),
          source: 'BookingModal',
        }),
      });

      const data = await response.json();

      if (!response.ok && !data.success) {
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

  const mailSubject = encodeURIComponent(`Upit za termin: ${service} - ${name}`);
  const mailBody = encodeURIComponent(
    `Poštovani Vuk i Lazar,\n\nZainteresovan/a sam za probni termin u New Fitems studiju.\n\nIme: ${name}\nTelefon: ${phone}\nEmail: ${email}\nIzabrani program: ${service}\nŽeljeno vreme: ${timePreference}\nNapomena: ${notes}\n\nPozdrav,\n${name}`
  );
  const directMailLink = `mailto:${CONTACT_INFO.email}?subject=${mailSubject}&body=${mailBody}`;

  const handleResetAndClose = () => {
    setSubmitted(false);
    setSubmitError(null);
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
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
            <div className="mb-6">
              <span className="font-['Caveat'] text-2xl text-stone-600 block">
                Zakaži termin
              </span>
              <h3 className="font-['Montserrat'] font-extrabold text-2xl sm:text-3xl uppercase tracking-wider text-[#000000]">
                DOBRODOŠLI U NEW FITEMS
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Pošalji upit za probni trening ili razgovor sa Vukom i Lazarom u Novoj Pazovi.
              </p>
            </div>

            {submitError && (
              <div className="mb-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold">{submitError}</p>
                  <p className="text-[11px] text-amber-800">
                    Slobodno nas pozovite direktno na <a href={`tel:${CONTACT_INFO.phone}`} className="font-bold underline">{CONTACT_INFO.phoneDisplay}</a>.
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
                  placeholder="npr. Jelena Petrović ili Marko"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-black text-sm text-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    Email <span className="text-stone-400 font-normal lowercase">(opciono)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="tvoj@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-black text-sm text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Program koji te zanima
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-black text-sm text-stone-900 cursor-pointer"
                >
                  <option value="EMS Vođeni Trening">EMS Vođeni Trening (30 min)</option>
                  <option value="Vakum Sprava sa IR Svetlima">Vakum Sprava sa IR Svetlima</option>
                  <option value="Madero Roler Terapija">Madero Roler Terapija</option>
                  <option value="90-Dnevni Total Fit">90-Dnevni Total Fit Program</option>
                  <option value="Uvodne konsultacije">Uvodne konsultacije i upoznavanje sa studijom</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Željeni deo dana
                </label>
                <select
                  value={timePreference}
                  onChange={(e) => setTimePreference(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-black text-sm text-stone-900 cursor-pointer"
                >
                  <option value="Prepodne (09:00 – 13:00)">Prepodne (09:00 – 13:00)</option>
                  <option value="Popodne (14:00 – 18:00)">Popodne (14:00 – 18:00)</option>
                  <option value="Veče (18:00 – 21:00)">Veče (18:00 – 21:00)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Poruka ili napomena <span className="text-stone-400 font-normal lowercase">(opciono)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Npr. Imate li slobodan termin ovog utorka ili četvrtka?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-black text-xs text-stone-900 resize-none"
                />
              </div>

              <div className="pt-2 space-y-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#000000] hover:bg-stone-900 disabled:opacity-75 disabled:cursor-not-allowed text-[#CFF3CF] py-3.5 rounded-xl font-['Montserrat'] font-extrabold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#CFF3CF]" />
                      <span>Slanje upita preko Brevo servera...</span>
                    </>
                  ) : (
                    <>
                      <span>Pošalji upit za termin</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

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
            <div className="w-16 h-16 bg-[#CFF3CF] border-2 border-black text-black rounded-full mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-['Montserrat'] font-extrabold text-2xl uppercase tracking-wider text-black">
              HVALA TI, {name}!
            </h3>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-sm mx-auto">
              Tvoj upit je uspešno poslat! Vuk ili Lazar će te ubrzo pozvati na broj <strong className="text-black">{phone}</strong> radi potvrde slobodnog termina.
            </p>

            <div className="p-4 bg-white rounded-2xl border border-stone-300 text-left text-xs space-y-1.5">
              <div><strong className="text-black">Izabrani program:</strong> {service}</div>
              <div><strong className="text-black">Vreme:</strong> {timePreference}</div>
              {email && <div><strong className="text-black">Email:</strong> {email}</div>}
              {notes && <div><strong className="text-black">Napomena:</strong> {notes}</div>}
              <div><strong className="text-black">Studio:</strong> Kralja Petra I Karađorđevića 87, Nova Pazova</div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={directMailLink}
                className="w-full bg-[#000000] text-[#CFF3CF] hover:bg-stone-900 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Pošalji i dodatnu kopiju na email studija</span>
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
