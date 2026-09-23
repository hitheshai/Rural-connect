import React, { useState } from 'react';
import {
  Car,
  PhoneCall,
  MapPin,
  Users,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  X,
  Truck,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TransportOption } from '../../types';
import { AudioSpeakerButton } from '../common/AudioSpeakerButton';

export const TransportScreen: React.FC = () => {
  const {
    t,
    language,
    transportOptions,
    requestEmergencyRide,
    currentLocation
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'auto' | 'taxi' | 'pickup' | 'ambulance'>('all');
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [pickupSpot, setPickupSpot] = useState(currentLocation.village);
  const [confirmedTicket, setConfirmedTicket] = useState<string | null>(null);

  const filteredTransports = transportOptions.filter((tr) => {
    if (activeFilter === 'all') return true;
    return tr.vehicleType === activeFilter;
  });

  const handleEmergencyRideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) return;

    const ticket = requestEmergencyRide(patientName, patientPhone, pickupSpot);
    setConfirmedTicket(ticket);
  };

  const resetEmergencyForm = () => {
    setPatientName('');
    setPatientPhone('');
    setConfirmedTicket(null);
    setEmergencyModalOpen(false);
  };

  return (
    <div className="space-y-4 pb-20 sm:pb-8">
      {/* Top Banner with Emergency Ride Highlight */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-3xl p-4 sm:p-5 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 text-xs font-semibold mb-2">
              <Car className="w-3.5 h-3.5 text-blue-300" />
              <span>
                {language === 'kn' ? 'ಗ್ರಾಮೀಣ ಸಾರಿಗೆ ಸಂಪರ್ಕ' : language === 'hi' ? 'ग्रामीण परिवहन संपर्क' : 'Gramin Sarige'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">{t.transportation}</h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-lg mt-1">
              {language === 'kn'
                ? 'ಗ್ರಾಮದ ಆಟೋ, ಶೇರ್ಡ್ ಟ್ಯಾಕ್ಸಿ, ಸರಕು ಪಿಕಪ್ ಹಾಗೂ ತುರ್ತು ಆಸ್ಪತ್ರೆ ವಾಹನಗಳ ನೇರ ಸಂಪರ್ಕ.'
                : language === 'hi'
                ? 'गाँव के ऑटो रिक्शा, साझा जीप, मालवाहक पिकअप और आपातकालीन वाहन संपर्क।'
                : 'Connect with local auto rickshaws, shared taxis, goods pickups, and medical transport.'}
            </p>
          </div>

          <button
            onClick={() => setEmergencyModalOpen(true)}
            className="h-12 px-5 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shrink-0"
          >
            <ShieldAlert className="w-4 h-4 text-white" />
            <span>{t.emergencyRideBtn}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap border transition-colors ${
            activeFilter === 'all'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          {t.all} ({transportOptions.length})
        </button>
        <button
          onClick={() => setActiveFilter('auto')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap border transition-colors ${
            activeFilter === 'auto'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          {t.auto}
        </button>
        <button
          onClick={() => setActiveFilter('taxi')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap border transition-colors ${
            activeFilter === 'taxi'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          {t.taxi}
        </button>
        <button
          onClick={() => setActiveFilter('pickup')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap border transition-colors ${
            activeFilter === 'pickup'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          {t.pickup}
        </button>
        <button
          onClick={() => setActiveFilter('ambulance')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap border transition-colors ${
            activeFilter === 'ambulance'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          {t.ambulance}
        </button>
      </div>

      {/* Transport Cards */}
      <div className="space-y-3">
        {filteredTransports.map((tr) => (
          <div
            key={tr.id}
            className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">
                    {tr.vehicleType}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500 font-mono font-medium">
                    {tr.vehicleNumber}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{tr.driverName}</h3>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-800">
                  {tr.ratePerKm === 0 ? 'Free Govt Service' : `₹${tr.ratePerKm} / km`}
                </span>
                <span className="block text-[10px] text-slate-400">
                  {tr.isAvailable ? 'Available Now' : 'On Trip'}
                </span>
              </div>
            </div>

            <div className="mt-2.5 p-2 rounded-xl bg-slate-50 text-xs text-slate-700 space-y-1 border border-slate-100">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>
                  <strong>Standby Base:</strong> {tr.villageBase}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>
                  <strong>Capacity:</strong> {tr.capacity}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <AudioSpeakerButton
                size="sm"
                textToRead={`${tr.driverName}. Vehicle: ${tr.vehicleType}. Base: ${tr.villageBase}. Phone: ${tr.contactNumber}`}
              />

              <a
                href={`tel:${tr.contactNumber.replace(/\s+/g, '')}`}
                className="h-9 px-4 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{tr.contactNumber === '108' ? 'Call 108 Free' : 'Call Driver'}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Emergency Ride Request */}
      {emergencyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-4 bg-rose-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-200" />
                <h3 className="text-base font-bold">{t.emergencyRideBtn}</h3>
              </div>
              <button
                onClick={resetEmergencyForm}
                className="w-8 h-8 rounded-full bg-rose-800 hover:bg-rose-900 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">
              {confirmedTicket ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    Emergency Dispatch Alerted!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Nearest standby driver and 108 ambulance base alerted. They are dispatching immediately to {pickupSpot}.
                  </p>
                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 font-mono font-bold text-xs text-slate-800">
                    {confirmedTicket}
                  </div>
                  <button
                    onClick={resetEmergencyForm}
                    className="w-full py-3 rounded-xl bg-rose-700 text-white font-bold text-xs uppercase"
                  >
                    {t.close}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEmergencyRideSubmit} className="space-y-3.5">
                  <p className="text-xs text-rose-800 bg-rose-50 p-2.5 rounded-xl border border-rose-200 font-medium">
                    Priority dispatch for pregnant women, snakebite victims, cardiac or severe illness.
                  </p>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Patient / Villager Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Parvathi Patil"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-rose-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-rose-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Pickup Spot in Village *
                    </label>
                    <input
                      type="text"
                      required
                      value={pickupSpot}
                      onChange={(e) => setPickupSpot(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-rose-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-sm shadow-md transition-colors"
                  >
                    Dispatch Emergency Vehicle Now
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
