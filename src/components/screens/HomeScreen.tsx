import React from 'react';
import {
  CloudSun,
  Droplets,
  Wind,
  PhoneCall,
  HeartPulse,
  Wheat,
  FileText,
  Briefcase,
  Wrench,
  Car,
  Users,
  AlertOctagon,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Volume2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AudioSpeakerButton } from '../common/AudioSpeakerButton';

export const HomeScreen: React.FC = () => {
  const {
    t,
    language,
    weather,
    mandiPrices,
    notices,
    setActiveTab,
    triggerEmergencySos,
    emergencyActive
  } = useApp();

  const weatherCond =
    language === 'kn'
      ? weather.conditionKn
      : language === 'hi'
      ? weather.conditionHi
      : weather.condition;

  const weatherAdv =
    language === 'kn'
      ? weather.advisoryKn
      : language === 'hi'
      ? weather.advisoryHi
      : weather.advisory;

  const urgentNotice = notices.find((n) => n.isUrgent) || notices[0];

  const quickCards = [
    {
      id: 'emergency',
      title: t.emergencySos,
      sub: t.sosSub,
      icon: AlertOctagon,
      color: 'bg-rose-50 text-rose-700 border-rose-200 hover:border-rose-400',
      iconBg: 'bg-rose-600 text-white',
      badge: '24/7'
    },
    {
      id: 'health',
      title: t.healthCare,
      sub: t.healthSub,
      icon: HeartPulse,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:border-emerald-400',
      iconBg: 'bg-emerald-700 text-white',
      badge: 'PHC Online'
    },
    {
      id: 'agri',
      title: t.agriMandi,
      sub: t.agriSub,
      icon: Wheat,
      color: 'bg-amber-50 text-amber-900 border-amber-200 hover:border-amber-400',
      iconBg: 'bg-amber-700 text-white',
      badge: 'APMC Live'
    },
    {
      id: 'schemes',
      title: t.govtSchemes,
      sub: t.schemesSub,
      icon: FileText,
      color: 'bg-indigo-50 text-indigo-900 border-indigo-200 hover:border-indigo-400',
      iconBg: 'bg-indigo-700 text-white',
      badge: 'PM Kisan'
    },
    {
      id: 'jobs',
      title: t.localJobs,
      sub: t.jobsSub,
      icon: Briefcase,
      color: 'bg-teal-50 text-teal-900 border-teal-200 hover:border-teal-400',
      iconBg: 'bg-teal-700 text-white',
      badge: '₹550/day'
    },
    {
      id: 'services',
      title: t.localServices,
      sub: t.servicesSub,
      icon: Wrench,
      color: 'bg-orange-50 text-orange-900 border-orange-200 hover:border-orange-400',
      iconBg: 'bg-orange-700 text-white',
      badge: 'Mechanic/Plumber'
    },
    {
      id: 'transport',
      title: t.transportation,
      sub: t.transportSub,
      icon: Car,
      color: 'bg-blue-50 text-blue-900 border-blue-200 hover:border-blue-400',
      iconBg: 'bg-blue-700 text-white',
      badge: 'Auto/Cruiser'
    },
    {
      id: 'community',
      title: t.communityBoard,
      sub: t.communitySub,
      icon: Users,
      color: 'bg-violet-50 text-violet-900 border-violet-200 hover:border-violet-400',
      iconBg: 'bg-violet-700 text-white',
      badge: 'Grama Sabhe'
    }
  ];

  return (
    <div className="space-y-4 pb-20 sm:pb-8">
      {/* Active SOS High-Alert Banner */}
      {emergencyActive && (
        <div
          onClick={() => setActiveTab('emergency')}
          className="cursor-pointer bg-rose-600 hover:bg-rose-700 text-white rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-lg border-2 border-rose-400 animate-pulse transition-transform active:scale-[0.99]"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-3 h-3 rounded-full bg-white animate-ping shrink-0" />
            <div className="min-w-0">
              <div className="text-[11px] font-black uppercase tracking-wider text-rose-100 flex items-center gap-1.5">
                <span>🚨 EMERGENCY SOS ACTIVE</span>
                <span>·</span>
                <span>STREAMING DYNAMIC GPS</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-white truncate">
                Real-time location is visible to designated contacts & 108 ambulance. Tap to view map.
              </p>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-white text-rose-800 text-xs font-black shrink-0 flex items-center gap-1 shadow-xs">
            <span>View Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      )}

      {/* Urgent Notice Banner */}
      {urgentNotice && (
        <div
          onClick={() => setActiveTab('community')}
          className="cursor-pointer bg-amber-500/10 border border-amber-300 rounded-2xl p-3.5 flex items-center justify-between gap-3 transition-colors hover:bg-amber-500/15"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="shrink-0 w-2.5 h-2.5 rounded-full bg-amber-600 animate-ping" />
            <div className="min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <span>{urgentNotice.postedBy}</span>
                <span className="text-amber-700">· {urgentNotice.date}</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                {language === 'kn'
                  ? urgentNotice.titleKn
                  : language === 'hi'
                  ? urgentNotice.titleHi
                  : urgentNotice.title}
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-amber-800 shrink-0" />
        </div>
      )}

      {/* Farming Weather Card */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <CloudSun className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">{t.weatherTitle}</h2>
              <p className="text-xs text-slate-500">{weatherCond}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="text-2xl font-black text-slate-900 tabular-nums">
                {weather.temp}°C
              </span>
            </div>
            <AudioSpeakerButton
              size="sm"
              textToRead={`${weather.temp} degrees celsius. ${weatherCond}. ${weatherAdv}`}
            />
          </div>
        </div>

        {/* Weather Sub-metrics */}
        <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs mb-3">
          <div>
            <span className="text-slate-400 block text-[10px]">{t.rainRisk}</span>
            <span className="font-bold text-slate-800 tabular-nums flex items-center gap-1">
              <Droplets className="w-3 h-3 text-blue-500" />
              {weather.rainProbability}%
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">{t.humidity}</span>
            <span className="font-bold text-slate-800 tabular-nums">{weather.humidity}%</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">{t.wind}</span>
            <span className="font-bold text-slate-800 truncate block">{weather.windSpeed}</span>
          </div>
        </div>

        {/* Agri Advisory */}
        <div className="text-xs text-slate-700 flex items-start gap-1.5 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
          <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-emerald-900">{t.advisory}: </strong>
            {weatherAdv}
          </p>
        </div>
      </section>

      {/* Main Quick Access Grid */}
      <section>
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            {language === 'kn' ? 'ಮುಖ್ಯ ಸೇವೆಗಳು' : language === 'hi' ? 'मुख्य सेवाएं' : 'Essential Services'}
          </h2>
          <span className="text-[11px] text-slate-500">
            {language === 'kn' ? 'ದೊಡ್ಡ ಬಟನ್‌ಗಳು' : language === 'hi' ? 'आसान नेविगेशन' : 'Easy 1-Tap Access'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {quickCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => {
                  if (card.id === 'emergency') {
                    setActiveTab('emergency');
                  } else {
                    setActiveTab(card.id as any);
                  }
                }}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left flex flex-col justify-between min-h-[110px] sm:min-h-[125px] transition-all active:scale-[0.98] shadow-xs ${card.color}`}
              >
                <div className="flex items-start justify-between w-full">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 bg-white/80 px-2 py-0.5 rounded-md border border-black/5">
                    {card.badge}
                  </span>
                </div>

                <div className="mt-2">
                  <h3 className="text-sm sm:text-base font-bold leading-tight line-clamp-1">
                    {card.title}
                  </h3>
                  <p className="text-[11px] opacity-80 line-clamp-1 mt-0.5">
                    {card.sub}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Today's Live APMC Mandi Rate Snapshot */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">{t.mandiRates}</h2>
            <p className="text-xs text-slate-500">
              {language === 'kn' ? 'ಇಂದಿನ ಮುಖ್ಯಾಂಶಗಳು' : language === 'hi' ? 'आज का मुख्य भाव' : 'Today’s market snapshot'}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('agri')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
          >
            <span>{language === 'kn' ? 'ಎಲ್ಲಾ ನೋಡಿ' : language === 'hi' ? 'सभी देखें' : 'View All'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {mandiPrices.slice(0, 3).map((item) => {
            const cropTitle =
              language === 'kn'
                ? item.cropNameKn
                : language === 'hi'
                ? item.cropNameHi
                : item.cropName;

            return (
              <div
                key={item.id}
                onClick={() => setActiveTab('agri')}
                className="cursor-pointer p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex items-center justify-between transition-colors"
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">{cropTitle}</div>
                  <div className="text-[11px] text-slate-500">
                    {item.marketName} · {item.variety}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs sm:text-sm font-black text-slate-900 tabular-nums">
                    ₹{item.modalPrice.toLocaleString('en-IN')}{' '}
                    <span className="text-[10px] font-normal text-slate-500">/{item.unit}</span>
                  </div>
                  <div
                    className={`text-[10px] font-semibold flex items-center justify-end gap-0.5 ${
                      item.priceChange >= 0 ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    {item.priceChange >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{item.priceChange > 0 ? `+${item.priceChange}%` : `${item.priceChange}%`}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Emergency Speed Dial Bar */}
      <section className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-rose-700" />
            <h2 className="text-sm font-bold text-rose-900">
              {language === 'kn' ? 'ತುರ್ತು ತ್ವರಿತ ಕರೆ' : language === 'hi' ? 'त्वरित आपातकालीन नंबर' : 'Direct Emergency Speed Dial'}
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('emergency')}
            className="text-xs font-bold text-rose-800 underline"
          >
            {language === 'kn' ? 'ಸಂಪೂರ್ಣ ಮಾಹಿತಿ' : language === 'hi' ? 'विस्तार से' : 'Full SOS'}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-2">
          <a
            href="tel:108"
            className="p-2.5 rounded-xl bg-white border border-rose-200 text-center flex flex-col items-center justify-center hover:bg-rose-100 transition-colors shadow-2xs"
          >
            <span className="text-base font-black text-rose-700">108</span>
            <span className="text-[10px] font-bold text-slate-700">Ambulance</span>
          </a>

          <a
            href="tel:112"
            className="p-2.5 rounded-xl bg-white border border-rose-200 text-center flex flex-col items-center justify-center hover:bg-rose-100 transition-colors shadow-2xs"
          >
            <span className="text-base font-black text-rose-700">112</span>
            <span className="text-[10px] font-bold text-slate-700">Police/SOS</span>
          </a>

          <a
            href="tel:104"
            className="p-2.5 rounded-xl bg-white border border-rose-200 text-center flex flex-col items-center justify-center hover:bg-rose-100 transition-colors shadow-2xs"
          >
            <span className="text-base font-black text-rose-700">104</span>
            <span className="text-[10px] font-bold text-slate-700">Health Help</span>
          </a>
        </div>
      </section>
    </div>
  );
};
