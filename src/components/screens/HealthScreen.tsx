import React, { useState } from 'react';
import {
  HeartPulse,
  PhoneCall,
  MapPin,
  Clock,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  Stethoscope,
  Pill,
  User,
  CheckCircle2,
  X,
  Volume2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INITIAL_HEALTH_TIPS } from '../../data/mockData';
import { AudioSpeakerButton } from '../common/AudioSpeakerButton';

export const HealthScreen: React.FC = () => {
  const {
    t,
    language,
    currentLocation,
    healthFacilities,
    consultations,
    bookConsultation
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'phc' | 'taluk_hospital' | 'pharmacy'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTabSub, setActiveTabSub] = useState<'facilities' | 'consult' | 'guides'>('facilities');

  // Consultation form state
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [preferredTime, setPreferredTime] = useState('Morning (9 AM - 12 PM)');
  const [notes, setNotes] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const symptomOptions = [
    { en: 'Fever & Chills', kn: 'ಜ್ವರ ಮತ್ತು ಚಳಿ', hi: 'बुखार और ठंड' },
    { en: 'Cough & Breathing Issue', kn: 'ಕೆಮ್ಮು ಮತ್ತು ಉಸಿರಾಟ ತೊಂದರೆ', hi: 'खांसी और सांस की तकलीफ' },
    { en: 'Stomach Pain / Vomiting', kn: 'ಹೊಟ್ಟೆ ನೋವು / ವಾಂತಿ', hi: 'पेट दर्द / उल्टी' },
    { en: 'Joint / Back Pain', kn: 'ಕೀಲು ನೋವು / ಬೆನ್ನು ನೋವು', hi: 'जोड़ों का दर्द / कमर दर्द' },
    { en: 'Skin Rash / Allergy', kn: 'ಚರ್ಮದ ತುರಿಕೆ / ಅಲರ್ಜಿ', hi: 'त्वचा में खुजली / एलर्जी' },
    { en: 'Blood Pressure / Dizziness', kn: 'ರಕ್ತದೊತ್ತಡ / ತಲೆಸುತ್ತು', hi: 'रक्तचाप / चक्कर आना' }
  ];

  const filteredFacilities = healthFacilities.filter((f) => {
    if (activeFilter === 'all') return true;
    return f.type === activeFilter;
  });

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !phone) return;

    bookConsultation({
      patientName,
      age: Number(age) || 35,
      gender,
      phone,
      symptoms: selectedSymptoms.length > 0 ? selectedSymptoms : ['General Consultation'],
      notes,
      preferredTime
    });

    setSubmittedTicket(`RC-DOC-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const resetForm = () => {
    setPatientName('');
    setAge('');
    setPhone('');
    setSelectedSymptoms([]);
    setNotes('');
    setSubmittedTicket(null);
    setModalOpen(false);
  };

  return (
    <div className="space-y-4 pb-20 sm:pb-8">
      {/* Top Banner & Quick Doctor Request CTA */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-3xl p-4 sm:p-5 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/20 text-xs font-semibold mb-2">
              <Stethoscope className="w-3.5 h-3.5 text-emerald-200" />
              <span>
                {language === 'kn' ? 'ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಸೇವೆ' : language === 'hi' ? 'ग्रामीण स्वास्थ्य सेवा' : 'Rural Tele-Health'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              {t.healthCare}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-lg mt-1">
              {language === 'kn'
                ? 'ನಿಮ್ಮ ಗ್ರಾಮಕ್ಕೆ ಹತ್ತಿರದ ಪಿಎಚ್‌ಸಿ, ಔಷಧಿ ಕೇಂದ್ರಗಳು ಮತ್ತು ಆನ್‌ಲೈನ್ ವೈದ್ಯರ ಸಮಾಲೋಚನೆ ಪಡೆಯಿರಿ.'
                : language === 'hi'
                ? 'अपने गाँव के निकटतम प्राथमिक स्वास्थ्य केंद्र, दवा दुकान और डॉक्टर सलाह प्राप्त करें।'
                : 'Find nearby primary health centres, generic pharmacies, and request doctor consultation.'}
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="h-12 px-5 rounded-2xl bg-white text-emerald-900 font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-50 active:scale-95 transition-all shadow-md shrink-0"
          >
            <Calendar className="w-4 h-4 text-emerald-700" />
            <span>{t.requestDoctor}</span>
          </button>
        </div>

        {/* 108 Direct Speed Bar */}
        <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping" />
            <span className="font-semibold">
              {language === 'kn' ? 'ತುರ್ತು ಆಂಬ್ಯುಲೆನ್ಸ್:' : language === 'hi' ? 'आपातकालीन एम्बुलेंस:' : 'Emergency 24x7 Ambulance:'}
            </span>
          </div>
          <a
            href="tel:108"
            className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 font-bold text-white flex items-center gap-1.5 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call 108 Free</span>
          </a>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
        <button
          onClick={() => setActiveTabSub('facilities')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all whitespace-nowrap text-center ${
            activeTabSub === 'facilities'
              ? 'bg-white text-emerald-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t.findHospital}
        </button>

        <button
          onClick={() => setActiveTabSub('guides')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all whitespace-nowrap text-center ${
            activeTabSub === 'guides'
              ? 'bg-white text-emerald-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t.healthGuides}
        </button>

        {consultations.length > 0 && (
          <button
            onClick={() => setActiveTabSub('consult')}
            className={`py-2 px-3 text-xs font-bold rounded-lg transition-all whitespace-nowrap text-center ${
              activeTabSub === 'consult'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'kn' ? `ನನ್ನ ಬುಕಿಂಗ್ (${consultations.length})` : language === 'hi' ? `मेरी बुकिंग (${consultations.length})` : `My Requests (${consultations.length})`}
          </button>
        )}
      </div>

      {/* Content based on sub-tab */}
      {activeTabSub === 'facilities' && (
        <div className="space-y-3">
          {/* Facility Type Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap border transition-colors ${
                activeFilter === 'all'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {t.allFacilities}
            </button>
            <button
              onClick={() => setActiveFilter('phc')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap border transition-colors ${
                activeFilter === 'phc'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              PHC Centres
            </button>
            <button
              onClick={() => setActiveFilter('taluk_hospital')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap border transition-colors ${
                activeFilter === 'taluk_hospital'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              Taluk Hospitals
            </button>
            <button
              onClick={() => setActiveFilter('pharmacy')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap border transition-colors ${
                activeFilter === 'pharmacy'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              Pharmacies
            </button>
          </div>

          {/* Facility Cards */}
          <div className="space-y-3">
            {filteredFacilities.map((fac) => (
              <div
                key={fac.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-emerald-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-emerald-800">
                        {fac.distanceKm} km away
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-500 font-medium">
                        {fac.village}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {fac.name}
                    </h3>
                  </div>

                  {fac.emergency24x7 && (
                    <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 font-bold text-[10px] shrink-0">
                      24/7
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{fac.address}</span>
                </p>

                {fac.doctorName && (
                  <div className="mt-2 text-xs flex items-center gap-1.5 text-slate-700">
                    <Stethoscope className="w-3.5 h-3.5 text-emerald-700" />
                    <span>
                      <strong>Doctor:</strong> {fac.doctorName}
                    </span>
                    {fac.doctorAvailable ? (
                      <span className="text-emerald-700 font-semibold text-[11px]">(On Duty)</span>
                    ) : (
                      <span className="text-amber-700 font-semibold text-[11px]">(Visiting)</span>
                    )}
                  </div>
                )}

                {/* Services Tags as quiet text */}
                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="font-semibold text-slate-800">Available:</span>
                  {fac.services.map((srv, idx) => (
                    <span key={idx} className="flex items-center gap-1">
                      <span>{srv}</span>
                      {idx < fac.services.length - 1 && <span className="text-slate-400">·</span>}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{fac.timing}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <AudioSpeakerButton
                      size="sm"
                      textToRead={`${fac.name}. Distance ${fac.distanceKm} kilometers. ${fac.doctorName || ''}. Timing ${fac.timing}.`}
                    />
                    <a
                      href={`tel:${fac.contactNumber.replace(/\s+/g, '')}`}
                      className="h-9 px-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow-2xs"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{t.callNow}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Health Guides Sub Tab */}
      {activeTabSub === 'guides' && (
        <div className="space-y-3">
          {INITIAL_HEALTH_TIPS.map((tip) => {
            const title =
              language === 'kn' ? tip.titleKn : language === 'hi' ? tip.titleHi : tip.title;
            const summary =
              language === 'kn' ? tip.summaryKn : language === 'hi' ? tip.summaryHi : tip.summary;
            const steps =
              language === 'kn' ? tip.stepsKn : language === 'hi' ? tip.stepsHi : tip.steps;

            return (
              <div
                key={tip.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
                      Emergency First-Aid
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">{title}</h3>
                  </div>
                  <AudioSpeakerButton
                    size="sm"
                    textToRead={`${title}. ${summary}. Step 1: ${steps[0]}. Step 2: ${steps[1] || ''}`}
                  />
                </div>

                <p className="text-xs text-slate-700 leading-relaxed bg-amber-50/80 p-2.5 rounded-xl border border-amber-200">
                  {summary}
                </p>

                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-slate-800">
                    {language === 'kn' ? 'ಪಾಲಿಸಬೇಕಾದ ಕ್ರಮಗಳು:' : language === 'hi' ? 'महत्वपूर्ण चरण:' : 'Important Steps:'}
                  </div>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {steps.map((st, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-emerald-700 shrink-0">{idx + 1}.</span>
                        <span>{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Consultations Requests List */}
      {activeTabSub === 'consult' && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-900">
            {language === 'kn' ? 'ವೈದ್ಯರ ಸಮಾಲೋಚನೆ ವಿನಂತಿಗಳು' : language === 'hi' ? 'डॉक्टर परामर्श अनुरोध' : 'Doctor Consultation Requests'}
          </h2>
          {consultations.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-emerald-800">Ticket #{c.id}</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  {c.status.toUpperCase()}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{c.patientName} ({c.age} yrs, {c.gender})</h3>
              <p className="text-xs text-slate-500">Phone: {c.phone} · Preferred Time: {c.preferredTime}</p>
              <div className="mt-2 text-xs text-slate-700">
                <strong>Symptoms:</strong> {c.symptoms.join(', ')}
              </div>
              {c.notes && (
                <div className="text-xs text-slate-500 italic mt-1">"{c.notes}"</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Doctor Consultation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-emerald-300" />
                <h3 className="text-base font-bold">{t.requestDoctor}</h3>
              </div>
              <button
                onClick={resetForm}
                className="w-8 h-8 rounded-full bg-emerald-700 hover:bg-emerald-600 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto">
              {submittedTicket ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {language === 'kn' ? 'ವಿನಂತಿ ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಗಿದೆ!' : language === 'hi' ? 'अनुरोध सफलतापूर्वक दर्ज हुआ!' : 'Consultation Request Confirmed!'}
                  </h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    {language === 'kn'
                      ? 'ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರದ ವೈದ್ಯರು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮ ಫೋನ್‌ಗೆ ಕರೆ ಮಾಡಿ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತಾರೆ.'
                      : language === 'hi'
                      ? 'प्राथमिक स्वास्थ्य केंद्र के डॉक्टर जल्द ही आपके फोन पर संपर्क कर परामर्श देंगे।'
                      : 'The Primary Health Centre medical team will call your registered number during the selected time slot.'}
                  </p>
                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-800">
                    {submittedTicket}
                  </div>
                  <button
                    onClick={resetForm}
                    className="w-full py-3 rounded-xl bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider"
                  >
                    {t.close}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConsultSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Patient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ningappa Patil"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Age *</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 42"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-emerald-600"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Child">Child</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Active Mobile Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Select Symptoms (Tap applicable)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {symptomOptions.map((s, idx) => {
                        const sLabel =
                          language === 'kn' ? s.kn : language === 'hi' ? s.hi : s.en;
                        const isChecked = selectedSymptoms.includes(s.en);
                        return (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => toggleSymptom(s.en)}
                            className={`p-2 text-xs font-medium rounded-xl border text-left transition-colors ${
                              isChecked
                                ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {isChecked ? '✓ ' : '+ '}
                            {sLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Call Time
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-emerald-600"
                    >
                      <option value="Morning (9 AM - 12 PM)">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="Afternoon (2 PM - 5 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                      <option value="Evening (6 PM - 8 PM)">Evening (6:00 PM - 8:00 PM)</option>
                      <option value="Immediate Emergency">Immediate / Urgent Callback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Additional Notes / Medicine History (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Taking BP medicine since 2 years, having fever since yesterday..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-colors"
                  >
                    Confirm Doctor Consultation Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
