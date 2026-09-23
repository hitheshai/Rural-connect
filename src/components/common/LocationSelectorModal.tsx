import React from 'react';
import { MapPin, Navigation, Check, X, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LocationInfo } from '../../types';

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationSelectorModal: React.FC<LocationSelectorModalProps> = ({ isOpen, onClose }) => {
  const {
    currentLocation,
    setCurrentLocation,
    locationsList,
    detectGPSLocation,
    gpsLoading,
    language
  } = useApp();

  if (!isOpen) return null;

  const handleSelect = (loc: LocationInfo) => {
    setCurrentLocation(loc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold">
              {language === 'kn' ? 'ಗ್ರಾಮ / ಸ್ಥಳ ಆಯ್ಕೆಮಾಡಿ' : language === 'hi' ? 'गाँव / स्थान चुनें' : 'Select Village / Location'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* GPS Auto Detect */}
        <div className="p-4 border-b border-slate-100 bg-emerald-50/50">
          <button
            onClick={async () => {
              await detectGPSLocation();
              onClose();
            }}
            disabled={gpsLoading}
            className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Navigation className={`w-4 h-4 ${gpsLoading ? 'animate-spin' : ''}`} />
            <span>
              {gpsLoading
                ? (language === 'kn' ? 'ಜಿಪಿಎಸ್ ಪತ್ತೆ ಮಾಡಲಾಗುತ್ತಿದೆ...' : language === 'hi' ? 'जीपीएस पता लगाया जा रहा है...' : 'Detecting GPS Location...')
                : (language === 'kn' ? 'ನನ್ನ ಪ್ರಸ್ತುತ ಜಿಪಿಎಸ್ ಸ್ಥಳ ಬಳಸಿ' : language === 'hi' ? 'वर्तमान जीपीएस स्थान का उपयोग करें' : 'Use My Current GPS Location')}
            </span>
          </button>
        </div>

        {/* Locations List */}
        <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            {language === 'kn' ? 'ಜನಪ್ರಿಯ ಗ್ರಾಮೀಣ ಕ್ಲಸ್ಟರ್‌ಗಳು' : language === 'hi' ? 'प्रमुख ग्रामीण क्षेत्र' : 'Selected Rural Clusters'}
          </p>

          {locationsList.map((loc, idx) => {
            const isSelected = currentLocation.village === loc.village;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(loc)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/70 text-slate-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{loc.village}</span>
                    <span className="text-xs font-normal text-slate-500">· {loc.taluk}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {loc.panchayat}, {loc.district}, {loc.state} - {loc.pincode}
                  </div>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-500">
            {language === 'kn'
              ? 'ಆಯ್ಕೆಮಾಡಿದ ಗ್ರಾಮಕ್ಕೆ ತಕ್ಕಂತೆ ಆಸ್ಪತ್ರೆ, ಮಾರುಕಟ್ಟೆ ಹಾಗೂ ಸೇವೆಗಳ ಪಟ್ಟಿ ಸರಿಹೊಂದುತ್ತದೆ.'
              : language === 'hi'
              ? 'चयनित गाँव के अनुसार अस्पताल, मंडी और सेवा सूची अपडेट होगी।'
              : 'Services, hospital distance, and APMC rates adapt to selected village.'}
          </p>
        </div>
      </div>
    </div>
  );
};
