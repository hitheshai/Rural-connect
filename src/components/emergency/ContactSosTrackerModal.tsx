import React, { useState } from 'react';
import {
  X,
  MapPin,
  PhoneCall,
  Navigation2,
  Clock,
  BatteryCharging,
  Radio,
  CheckCircle,
  AlertTriangle,
  Ambulance,
  Compass
} from 'lucide-react';
import { DesignatedContact } from '../../types';
import { useApp } from '../../context/AppContext';

interface ContactSosTrackerModalProps {
  contact: DesignatedContact;
  onClose: () => void;
}

export const ContactSosTrackerModal: React.FC<ContactSosTrackerModalProps> = ({
  contact,
  onClose
}) => {
  const {
    currentLocation,
    sosLocation,
    updateDesignatedContact,
    setNotificationBanner
  } = useApp();

  const [acknowledged, setAcknowledged] = useState(contact.status === 'responding');
  const [etaMins, setEtaMins] = useState(4);

  const handleRespond = () => {
    updateDesignatedContact(contact.id, {
      status: 'responding',
      lastViewedAt: 'Just now'
    });
    setAcknowledged(true);
    setNotificationBanner(
      `✓ ${contact.name} confirmed: "I am responding and on my way! (ETA ~${etaMins} mins)"`
    );
  };

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${sosLocation.latitude},${sosLocation.longitude}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Recipient Header */}
        <div className="p-4 bg-rose-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-700 flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-rose-200">
                Designated Contact Portal Preview
              </div>
              <h3 className="text-sm sm:text-base font-black">
                Viewing as: {contact.name} ({contact.relationship})
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-rose-800 hover:bg-rose-700 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Victim Status Alert Card */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono font-bold bg-rose-600 text-white px-2 py-0.5 rounded-full uppercase">
                  ACTIVE DISTRESS CALL
                </span>
                <h4 className="text-base font-black text-slate-900 mt-1.5">
                  Basavaraj Maradagi triggered Emergency SOS
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Location: Near {currentLocation.village} fields ({currentLocation.taluk})
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-rose-700 font-mono block">
                  {contact.distanceKm} km away
                </span>
                <span className="text-[10px] text-slate-500">From your home</span>
              </div>
            </div>

            {/* Victim Telemetry */}
            <div className="mt-3 pt-3 border-t border-rose-200/70 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-white/70 rounded-xl border border-rose-100">
                <span className="text-[10px] text-slate-500 block">GPS Coordinates</span>
                <span className="font-mono font-bold text-slate-900 text-[11px]">
                  {sosLocation.latitude.toFixed(4)}, {sosLocation.longitude.toFixed(4)}
                </span>
              </div>
              <div className="p-2 bg-white/70 rounded-xl border border-rose-100">
                <span className="text-[10px] text-slate-500 block">Phone Battery</span>
                <span className="font-bold text-slate-900 text-[11px]">82% (4G LTE)</span>
              </div>
              <div className="p-2 bg-white/70 rounded-xl border border-rose-100">
                <span className="text-[10px] text-slate-500 block">GPS Precision</span>
                <span className="font-bold text-emerald-700 text-[11px]">±{sosLocation.accuracy}m</span>
              </div>
            </div>
          </div>

          {/* Simulated Map Visual */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-300 h-48 bg-slate-100 flex items-center justify-center">
            {/* Embedded map representation */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80')`
              }}
            />
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]" />

            {/* Center victim pin */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-rose-600 border-4 border-white shadow-2xl flex items-center justify-center text-white text-lg animate-bounce">
                📍
              </div>
              <div className="mt-1 px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-full shadow-lg border border-white/20">
                Basavaraj is HERE (SOS Active)
              </div>
            </div>

            {/* Recipient pin */}
            <div className="absolute bottom-3 left-3 z-10 bg-white/95 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-800 shadow-md flex items-center gap-1.5 border border-slate-200">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
              <span>You: {contact.name} ({contact.distanceKm}km)</span>
            </div>
          </div>

          {/* Interactive Response Actions */}
          <div className="space-y-2">
            {!acknowledged ? (
              <button
                onClick={handleRespond}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <CheckCircle className="w-5 h-5" />
                <span>I AM ON MY WAY (Notify Victim & Responders)</span>
              </button>
            ) : (
              <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-2xl text-center text-xs font-bold text-emerald-900 flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-700" />
                <span>You confirmed response! Victim notified: ETA ~{etaMins} mins.</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={openGoogleMaps}
                className="py-3 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
              >
                <Navigation2 className="w-4 h-4 text-blue-600" />
                <span>Navigate in Maps</span>
              </button>

              <a
                href="tel:108"
                className="py-3 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
              >
                <Ambulance className="w-4 h-4" />
                <span>Call 108 Ambulance</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
          This portal link is encrypted and accessible only to designated emergency contacts.
        </div>
      </div>
    </div>
  );
};
