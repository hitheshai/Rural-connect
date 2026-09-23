import React, { useState } from 'react';
import {
  MapPin,
  Globe,
  Mic,
  Smartphone,
  Maximize2,
  Sliders,
  Shield,
  User,
  Wheat,
  Wrench,
  UserCheck,
  ChevronDown,
  Volume2
} from 'lucide-react';
import { useApp, NavTab } from '../../context/AppContext';
import { Language, UserRole } from '../../types';
import { LocationSelectorModal } from '../common/LocationSelectorModal';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    userRole,
    setUserRole,
    currentLocation,
    activeTab,
    setActiveTab,
    isMobileFrame,
    setIsMobileFrame,
    isLargeText,
    setIsLargeText,
    isHighContrast,
    setIsHighContrast,
    setVoiceAssistantOpen,
    notificationBanner,
    emergencyActive
  } = useApp();

  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const roleLabels: Record<UserRole, { label: string; icon: any }> = {
    resident: { label: t.resident, icon: User },
    farmer: { label: t.farmer, icon: Wheat },
    provider: { label: t.provider, icon: Wrench },
    admin: { label: t.admin, icon: Shield }
  };

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200">
        {/* Notification Banner if active */}
        {notificationBanner && (
          <div className="bg-emerald-700 text-white text-xs py-1.5 px-4 text-center font-medium transition-all">
            {notificationBanner}
          </div>
        )}

        {/* Emergency Active Banner */}
        {emergencyActive && (
          <div className="bg-rose-600 text-white text-xs py-2 px-4 text-center font-bold animate-pulse flex items-center justify-center gap-2">
            <span>🚨 {t.sosActiveNotice}</span>
            <button
              onClick={() => setActiveTab('emergency')}
              className="underline font-black ml-2 uppercase text-[11px]"
            >
              View SOS Screen
            </button>
          </div>
        )}

        {/* Zone 1, Zone 2, Zone 3 Top Bar Contract */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Zone 1: Wordmark / Brand title */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('home')}
              className="text-left flex items-center gap-2 group"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black text-lg shadow-sm group-hover:bg-emerald-800 transition-colors">
                RC
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors">
                  RuralConnect
                </span>
                <span className="hidden sm:inline-block text-[11px] text-slate-500 ml-2 font-medium">
                  {t.tagline}
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (hidden on compact view, clean unboxed navigation) */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('home')}
              className={`hover:text-slate-900 transition-colors ${activeTab === 'home' ? 'text-emerald-700 font-bold' : ''}`}
            >
              {t.tabHome}
            </button>
            <button
              onClick={() => setActiveTab('health')}
              className={`hover:text-slate-900 transition-colors ${activeTab === 'health' ? 'text-emerald-700 font-bold' : ''}`}
            >
              {t.tabHealth}
            </button>
            <button
              onClick={() => setActiveTab('agri')}
              className={`hover:text-slate-900 transition-colors ${activeTab === 'agri' ? 'text-emerald-700 font-bold' : ''}`}
            >
              {t.tabAgri}
            </button>
            <button
              onClick={() => setActiveTab('schemes')}
              className={`hover:text-slate-900 transition-colors ${activeTab === 'schemes' ? 'text-emerald-700 font-bold' : ''}`}
            >
              {t.tabSchemes}
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`hover:text-slate-900 transition-colors ${activeTab === 'jobs' ? 'text-emerald-700 font-bold' : ''}`}
            >
              {t.tabJobs}
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`hover:text-slate-900 transition-colors ${activeTab === 'services' ? 'text-emerald-700 font-bold' : ''}`}
            >
              {t.tabServices}
            </button>
            <button
              onClick={() => setActiveTab('transport')}
              className={`hover:text-slate-900 transition-colors ${activeTab === 'transport' ? 'text-emerald-700 font-bold' : ''}`}
            >
              {t.tabTransport}
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`hover:text-slate-900 transition-colors ${activeTab === 'community' ? 'text-emerald-700 font-bold' : ''}`}
            >
              {t.tabCommunity}
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`hover:text-slate-900 transition-colors flex items-center gap-1 ${activeTab === 'admin' ? 'text-emerald-700 font-bold' : ''}`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{t.tabAdmin}</span>
            </button>
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Voice Assistant Trigger */}
            <button
              onClick={() => setVoiceAssistantOpen(true)}
              title={t.voiceAssistant}
              className="h-9 px-2.5 sm:px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Mic className="w-4 h-4 text-emerald-700 animate-pulse" />
              <span className="hidden sm:inline">{t.voiceAssistant}</span>
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setRoleDropdownOpen(false);
                }}
                className="h-9 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1 transition-colors"
                title="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-slate-600" />
                <span>
                  {language === 'kn' ? 'ಕನ್ನಡ' : language === 'hi' ? 'हिन्दी' : 'EN'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-slate-100 ${
                        language === l.code ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-700'
                      }`}
                    >
                      <span>{l.native}</span>
                      <span className="text-[10px] text-slate-400">{l.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Role Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setRoleDropdownOpen(!roleDropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="h-9 px-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
                title="Switch User Role"
              >
                {React.createElement(roleLabels[userRole].icon, { className: 'w-3.5 h-3.5 text-emerald-400' })}
                <span className="hidden md:inline">{roleLabels[userRole].label}</span>
                <ChevronDown className="w-3 h-3 text-slate-300" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                  <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    {language === 'kn' ? 'ಪಾತ್ರ ಬದಲಿಸಿ' : language === 'hi' ? 'भूमिका बदलें' : 'Switch Role (Preview)'}
                  </div>
                  {(['resident', 'farmer', 'provider', 'admin'] as UserRole[]).map((r) => {
                    const RoleIcon = roleLabels[r].icon;
                    return (
                      <button
                        key={r}
                        onClick={() => {
                          setUserRole(r);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-100 ${
                          userRole === r ? 'bg-emerald-50 font-bold text-emerald-800' : 'text-slate-700'
                        }`}
                      >
                        <RoleIcon className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{roleLabels[r].label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Accessibility / Presentation Mode Controls */}
            <div className="hidden sm:flex items-center gap-1 pl-1 border-l border-slate-200">
              {/* Large Text */}
              <button
                onClick={() => setIsLargeText((prev) => !prev)}
                title={t.largeText}
                className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-colors ${
                  isLargeText ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                A+
              </button>

              {/* Mobile Presentation View Toggle */}
              <button
                onClick={() => setIsMobileFrame((prev) => !prev)}
                title={isMobileFrame ? t.fullscreenMode : t.mobileMode}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  isMobileFrame ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isMobileFrame ? <Maximize2 className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Location & Village Selector Sub-Bar */}
        <div className="bg-slate-50 border-t border-slate-200/80 px-3 sm:px-6 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
              <div className="truncate">
                <span className="font-bold text-slate-900">{currentLocation.village}</span>
                <span className="text-slate-500 hidden sm:inline">
                  {' '}· {currentLocation.taluk}, {currentLocation.district} ({currentLocation.pincode})
                </span>
              </div>
            </div>

            <button
              onClick={() => setLocationModalOpen(true)}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-2 shrink-0 ml-2"
            >
              {t.changeLocation}
            </button>
          </div>
        </div>
      </header>

      {/* Village Location Modal */}
      <LocationSelectorModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      />
    </>
  );
};
