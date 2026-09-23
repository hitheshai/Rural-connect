import React, { useState } from 'react';
import {
  AlertOctagon,
  PhoneCall,
  Share2,
  MapPin,
  ShieldCheck,
  CheckCircle,
  Copy,
  Volume2,
  VolumeX,
  Users,
  Compass,
  Radio,
  Eye,
  UserPlus,
  AlertTriangle,
  Ambulance,
  HeartPulse
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EMERGENCY_CONTACTS, VILLAGE_VOLUNTEERS } from '../../data/mockData';
import { DynamicSosMap } from '../emergency/DynamicSosMap';
import { ContactSosTrackerModal } from '../emergency/ContactSosTrackerModal';
import { AddEmergencyContactModal } from '../emergency/AddEmergencyContactModal';
import { DesignatedContact } from '../../types';

export const EmergencyScreen: React.FC = () => {
  const {
    t,
    language,
    currentLocation,
    emergencyActive,
    triggerEmergencySos,
    cancelEmergencySos,
    designatedContacts,
    sosReason,
    setSosReason,
    sosSirenMuted,
    setSosSirenMuted,
    sosLocation
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [selectedPreviewContact, setSelectedPreviewContact] = useState<DesignatedContact | null>(null);
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);

  const lat = sosLocation?.latitude || currentLocation.coordinates?.latitude || 15.8497;
  const lon = sosLocation?.longitude || currentLocation.coordinates?.longitude || 74.4977;

  const trackingLink = `https://ruralconnect.in/sos/live-track?id=SOS-RAMP-${Math.floor(lat * 1000)}`;

  const emergencyMessage = `🚨 EMERGENCY SOS ALERT from ${currentLocation.village} (${currentLocation.taluk}, ${currentLocation.district}):
Reason: ${sosReason}
I need urgent assistance!
📍 Live Dynamic GPS Map: ${trackingLink}
Exact Coordinates: https://maps.google.com/?q=${lat.toFixed(5)},${lon.toFixed(5)}
Village: ${currentLocation.village}, ${currentLocation.panchayat}`;

  const copyLocation = () => {
    navigator.clipboard.writeText(emergencyMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const shareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(emergencyMessage)}`;
    window.open(url, '_blank');
  };

  const emergencyReasons = [
    { id: 'Medical Emergency', label: t.medicalEmergency || 'Medical Emergency', icon: '🚑' },
    { id: 'Accident / Fall', label: t.accident || 'Accident / Fall', icon: '⚠️' },
    { id: 'Snakebite / Wild Animal', label: t.snakebite || 'Snakebite / Animal', icon: '🐍' },
    { id: 'Fire Hazard', label: t.fireHazard || 'Fire Hazard', icon: '🔥' }
  ];

  return (
    <div className="space-y-4 pb-20 sm:pb-8">
      {/* Active SOS High-Alert Banner */}
      {emergencyActive && (
        <div className="p-3.5 bg-rose-600 text-white rounded-2xl shadow-lg border-2 border-rose-400 flex items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-2.5">
            <Radio className="w-5 h-5 text-white animate-spin" />
            <div>
              <div className="text-xs font-black uppercase tracking-wider">
                SOS ACTIVE · LIVE GPS BROADCASTING
              </div>
              <div className="text-[11px] text-rose-100">
                Broadcasting real-time position to {designatedContacts.length} designated emergency contacts
              </div>
            </div>
          </div>

          <button
            onClick={() => setSosSirenMuted(!sosSirenMuted)}
            className="px-2.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold flex items-center gap-1.5 shrink-0"
          >
            {sosSirenMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{sosSirenMuted ? 'Unmute' : 'Mute'}</span>
          </button>
        </div>
      )}

      {/* Big One-Tap SOS Emergency Control Panel */}
      <div
        className={`rounded-3xl p-5 sm:p-7 text-center text-white transition-all shadow-xl ${
          emergencyActive
            ? 'bg-rose-950 border-4 border-rose-500'
            : 'bg-gradient-to-b from-rose-700 to-rose-900 border border-rose-600'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] uppercase tracking-widest font-black text-rose-200">
            {currentLocation.village} · {currentLocation.taluk}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-mono bg-rose-900/60 px-2 py-0.5 rounded-full border border-rose-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>GPS Locked</span>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider mb-1">
          {t.sosHeading}
        </h1>
        <p className="text-xs sm:text-sm text-rose-100 max-w-sm mx-auto mb-4">
          {language === 'kn'
            ? 'ತಕ್ಷಣದ ಪೊಲೀಸ್, ಆಂಬ್ಯುಲೆನ್ಸ್ ಹಾಗೂ ನಿಮ್ಮ ನಿಗದಿತ ಸಂಪರ್ಕಗಳಿಗೆ ಲೈವ್ ನಕ್ಷೆ ಕಳುಹಿಸಲು ಬಟನ್ ಒತ್ತಿರಿ.'
            : language === 'hi'
            ? 'तत्काल पुलिस, एम्बुलेंस और आपके नामित संपर्कों को लाइव नक्शा भेजने के लिए नीचे बटन दबाएं।'
            : 'Tap below to trigger emergency alarm and stream your dynamic GPS location.'}
        </p>

        {/* Emergency Reason Quick Selector */}
        {!emergencyActive && (
          <div className="mb-5 max-w-md mx-auto">
            <label className="block text-[11px] font-bold text-rose-200 uppercase tracking-wider mb-1.5">
              Select Emergency Reason:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
              {emergencyReasons.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSosReason(r.id)}
                  className={`py-1.5 px-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-all ${
                    sosReason === r.id
                      ? 'bg-white text-rose-900 shadow-sm'
                      : 'bg-rose-800/70 hover:bg-rose-800 text-rose-100 border border-rose-600/60'
                  }`}
                >
                  <span>{r.icon}</span>
                  <span className="truncate">{r.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SOS Giant Button */}
        <div className="relative inline-block mb-3">
          {emergencyActive && (
            <div className="absolute inset-0 rounded-full bg-rose-400/50 animate-ping" />
          )}
          <button
            onClick={() => (emergencyActive ? cancelEmergencySos() : triggerEmergencySos(sosReason))}
            className={`relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center font-black text-2xl sm:text-3xl shadow-2xl active:scale-95 transition-all ${
              emergencyActive
                ? 'bg-white text-rose-800 ring-8 ring-rose-400 hover:bg-rose-50'
                : 'bg-rose-600 hover:bg-rose-500 text-white ring-8 ring-rose-800/60'
            }`}
          >
            <AlertOctagon className="w-12 h-12 mb-1" />
            <span>{emergencyActive ? 'STOP SOS' : 'PRESS SOS'}</span>
          </button>
        </div>

        {emergencyActive && (
          <div className="mt-3 p-3 bg-white/20 backdrop-blur-xs rounded-2xl text-xs sm:text-sm font-bold text-white max-w-md mx-auto border border-white/20">
            {t.sosActiveNotice}
          </div>
        )}
      </div>

      {/* Dynamic Real-Time Map Interface */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-600" />
            <h2 className="text-sm font-bold text-slate-900">
              {t.liveMapTitle || 'Dynamic SOS Real-Time Map'}
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-slate-500">
            {emergencyActive ? '🔴 Real-Time Tracking ON' : 'Standby Mode'}
          </span>
        </div>

        {/* Interactive Dynamic SOS Map Component */}
        <DynamicSosMap
          onOpenContactPreview={(contact) => setSelectedPreviewContact(contact)}
          onOpenAddContact={() => setIsAddContactOpen(true)}
        />
      </section>

      {/* Share Current GPS Coordinates Quick Card */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-700" />
            <h2 className="text-sm font-bold text-slate-900">{t.shareGps}</h2>
          </div>
          <span className="text-[11px] font-mono text-slate-500 tabular-nums">
            {lat.toFixed(4)}, {lon.toFixed(4)}
          </span>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 mb-3 border border-slate-100 font-mono">
          {currentLocation.village}, {currentLocation.taluk}, {currentLocation.district} (GPS: {lat.toFixed(4)}, {lon.toFixed(4)})
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={copyLocation}
            className="py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-600" />
                <span>Copy Message</span>
              </>
            )}
          </button>

          <button
            onClick={shareWhatsApp}
            className="py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <Share2 className="w-4 h-4" />
            <span>Send to WhatsApp</span>
          </button>
        </div>
      </section>

      {/* Speed Dial Helplines */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 mb-3">{t.nationalHelplines}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {EMERGENCY_CONTACTS.map((c, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 flex items-center justify-between gap-2 hover:border-slate-200"
            >
              <div>
                <div className="text-xs font-bold text-slate-900">{c.name}</div>
                <div className="text-[11px] text-slate-500 line-clamp-1">{c.desc}</div>
              </div>

              <a
                href={`tel:${c.number.replace(/\s+/g, '')}`}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1 shrink-0 shadow-2xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{c.number}</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Village First Responders & Volunteers */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-700" />
            <h2 className="text-sm font-bold text-slate-900">{t.villageVolunteers}</h2>
          </div>
          <span className="text-[11px] text-slate-500">Verified Volunteers</span>
        </div>

        <div className="space-y-2.5">
          {VILLAGE_VOLUNTEERS.map((v, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between gap-2"
            >
              <div>
                <div className="text-xs font-bold text-slate-900">{v.name}</div>
                <div className="text-[11px] text-slate-500">{v.village} · {v.role}</div>
              </div>

              <a
                href={`tel:${v.phone.replace(/\s+/g, '')}`}
                className="h-8 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center gap-1 shrink-0"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Simulated Contact Tracking Modal Preview */}
      {selectedPreviewContact && (
        <ContactSosTrackerModal
          contact={selectedPreviewContact}
          onClose={() => setSelectedPreviewContact(null)}
        />
      )}

      {/* Add Emergency Contact Modal */}
      {isAddContactOpen && (
        <AddEmergencyContactModal onClose={() => setIsAddContactOpen(false)} />
      )}
    </div>
  );
};

