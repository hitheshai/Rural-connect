import React, { useState } from 'react';
import {
  Wrench,
  Zap,
  Droplet,
  Truck,
  PhoneCall,
  ShieldCheck,
  Star,
  PlusCircle,
  MapPin,
  Clock,
  CheckCircle2,
  X,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ServiceProvider } from '../../types';
import { AudioSpeakerButton } from '../common/AudioSpeakerButton';

export const ServicesScreen: React.FC = () => {
  const {
    t,
    language,
    serviceProviders,
    registerServiceProvider,
    currentLocation
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [bookModalProvider, setBookModalProvider] = useState<ServiceProvider | null>(null);
  const [bookingAddress, setBookingAddress] = useState(currentLocation.village);
  const [bookingProblem, setBookingProblem] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Register Form State
  const [name, setName] = useState('');
  const [profession, setProfession] = useState<ServiceProvider['profession']>('electrician');
  const [village, setVillage] = useState(currentLocation.village);
  const [experienceYears, setExperienceYears] = useState('5');
  const [phone, setPhone] = useState('');
  const [rateEstimate, setRateEstimate] = useState('₹250 - ₹400 per visit');

  const categories: { id: string; labelEn: string; labelKn: string; labelHi: string }[] = [
    { id: 'all', labelEn: 'All Artisans', labelKn: 'ಎಲ್ಲಾ ಕುಶಲಕರ್ಮಿಗಳು', labelHi: 'सभी कारीगर' },
    { id: 'electrician', labelEn: 'Electricians', labelKn: 'ಎಲೆಕ್ಟ್ರಿಷಿಯನ್', labelHi: 'इलेक्ट्रीशियन' },
    { id: 'plumber', labelEn: 'Plumbers', labelKn: 'ಪ್ಲಂಬರ್', labelHi: 'प्लंबर' },
    { id: 'mechanic', labelEn: 'Mechanics', labelKn: 'ಮೆಕ್ಯಾನಿಕ್', labelHi: 'मैकेनिक' },
    { id: 'borewell', labelEn: 'Borewell Experts', labelKn: 'ಕೊಳವೆಬಾವಿ ತಜ್ಞರು', labelHi: 'बोरवेल मिस्त्री' },
    { id: 'mason', labelEn: 'Masons', labelKn: 'ಮೇಸ್ತ್ರಿ / ಕಲ್ಲು ಕೆಲಸ', labelHi: 'राजमिस्त्री' }
  ];

  const filteredProviders = serviceProviders.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.profession === activeFilter;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    registerServiceProvider({
      name,
      profession,
      village: village || currentLocation.village,
      experienceYears: Number(experienceYears) || 3,
      phone,
      rateEstimate,
      availableNow: true
    });

    setRegisterModalOpen(false);
    setName('');
    setPhone('');
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookModalProvider(null);
      setBookingProblem('');
    }, 2200);
  };

  return (
    <div className="space-y-4 pb-20 sm:pb-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-800 to-amber-900 rounded-3xl p-4 sm:p-5 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/15 text-xs font-semibold mb-2">
              <Wrench className="w-3.5 h-3.5 text-orange-200" />
              <span>
                {language === 'kn' ? 'ಗ್ರಾಮ ಕುಶಲಕರ್ಮಿಗಳ ವೇದಿಕೆ' : language === 'hi' ? 'ग्राम कुशल कारीगर मंच' : 'Village Artisan Directory'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">{t.localServices}</h1>
            <p className="text-xs sm:text-sm text-orange-100 max-w-lg mt-1">
              {language === 'kn'
                ? 'ಗ್ರಾಮದ ಎಲೆಕ್ಟ್ರಿಷಿಯನ್, ಪ್ಲಂಬರ್, ಟ್ರ್ಯಾಕ್ಟರ್ ಮೆಕ್ಯಾನಿಕ್ ಹಾಗೂ ಬೋರ್‌ವೆಲ್ ಪರಿಣಿತರ ಸಂಪರ್ಕ.'
                : language === 'hi'
                ? 'गाँव के इलेक्ट्रीशियन, प्लंबर, ट्रैक्टर मैकेनिक और बोरवेल मिस्त्री से सीधा संपर्क।'
                : 'Verified local technicians, electricians, plumbers, and tractor pump mechanics.'}
            </p>
          </div>

          <button
            onClick={() => setRegisterModalOpen(true)}
            className="h-12 px-5 rounded-2xl bg-white text-orange-950 font-bold text-sm flex items-center justify-center gap-2 hover:bg-orange-50 active:scale-95 transition-all shadow-md shrink-0"
          >
            <UserCheck className="w-4 h-4 text-orange-700" />
            <span>{t.joinAsProvider}</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => {
          const isSelected = activeFilter === cat.id;
          const label =
            language === 'kn' ? cat.labelKn : language === 'hi' ? cat.labelHi : cat.labelEn;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors border ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Providers Cards Grid */}
      <div className="space-y-3">
        {filteredProviders.map((prov) => (
          <div
            key={prov.id}
            className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-orange-300 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-orange-800 uppercase tracking-wide">
                    {prov.profession}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500 font-medium">
                    {prov.experienceYears} {t.yearsExp}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                  <span>{prov.name}</span>
                  {prov.isVerified && (
                    <span title="Verified Worker" className="inline-flex">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    </span>
                  )}
                </h3>
              </div>

              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md text-amber-900 font-bold text-xs shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{prov.rating}</span>
                <span className="text-[10px] text-slate-400">({prov.reviewsCount})</span>
              </div>
            </div>

            <div className="mt-2 text-xs text-slate-600 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{prov.village}</span>
              <span className="text-slate-300">·</span>
              <span
                className={`font-semibold ${
                  prov.availableNow ? 'text-emerald-700' : 'text-slate-400'
                }`}
              >
                {prov.availableNow ? t.available : t.busy}
              </span>
            </div>

            {/* Rate Estimate */}
            <div className="mt-2.5 p-2 rounded-xl bg-slate-50 text-xs text-slate-700 border border-slate-100">
              <strong className="text-slate-800">Estimated Rate: </strong>
              <span>{prov.rateEstimate}</span>
            </div>

            {/* Actions */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <AudioSpeakerButton
                size="sm"
                textToRead={`${prov.name}. Profession: ${prov.profession}. ${prov.experienceYears} years experience. Location: ${prov.village}. Phone: ${prov.phone}`}
              />

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setBookModalProvider(prov)}
                  className="h-9 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-800 transition-colors"
                >
                  {t.bookVisit}
                </button>

                <a
                  href={`tel:${prov.phone.replace(/\s+/g, '')}`}
                  className="h-9 px-3.5 rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{t.callNow}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Book Service Visit */}
      {bookModalProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-4 bg-orange-900 text-white flex items-center justify-between">
              <h3 className="text-base font-bold">Request Technician Visit</h3>
              <button
                onClick={() => setBookModalProvider(null)}
                className="w-8 h-8 rounded-full bg-orange-800 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">
              {bookingSuccess ? (
                <div className="text-center py-6 space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">Visit Request Sent!</h4>
                  <p className="text-xs text-slate-600">
                    {bookModalProvider.name} has received your booking details and will call you to confirm arrival time.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="font-bold text-slate-900">{bookModalProvider.name}</div>
                    <div className="text-slate-500">
                      Profession: {bookModalProvider.profession} · {bookModalProvider.rateEstimate}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Problem Description *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="e.g. Pump starter burnt, capacitor replacement needed..."
                      value={bookingProblem}
                      onChange={(e) => setBookingProblem(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-orange-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your House / Field Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingAddress}
                      onChange={(e) => setBookingAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-orange-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 94812 XXXXX"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-orange-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-orange-800 hover:bg-orange-900 text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Confirm Visit Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Register as Service Provider */}
      {registerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-4 bg-orange-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-orange-300" />
                <h3 className="text-base font-bold">{t.joinAsProvider}</h3>
              </div>
              <button
                onClick={() => setRegisterModalOpen(false)}
                className="w-8 h-8 rounded-full bg-orange-800 hover:bg-orange-700 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Badiger"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-orange-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Trade / Profession *
                  </label>
                  <select
                    value={profession}
                    onChange={(e) => setProfession(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-orange-600"
                  >
                    <option value="electrician">Electrician</option>
                    <option value="plumber">Plumber</option>
                    <option value="mechanic">Tractor / Pump Mechanic</option>
                    <option value="borewell">Borewell Specialist</option>
                    <option value="mason">Mason (Building)</option>
                    <option value="driver">Driver</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Years Experience
                  </label>
                  <input
                    type="number"
                    required
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-orange-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98XXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-orange-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Village / Town *
                  </label>
                  <input
                    type="text"
                    required
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-orange-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Rate Estimate / Charges
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹200 per visit, wiring extra"
                  value={rateEstimate}
                  onChange={(e) => setRateEstimate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-orange-600"
                />
              </div>

              <p className="text-[11px] text-slate-500">
                After submission, your profile will be reviewed by the Gram Panchayat admin to verify credentials and add the Verified badge.
              </p>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-orange-800 hover:bg-orange-900 text-white font-bold text-sm shadow-md transition-colors"
              >
                Register as Village Service Provider
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
