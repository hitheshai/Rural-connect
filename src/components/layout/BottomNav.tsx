import React from 'react';
import {
  Home,
  HeartPulse,
  Wheat,
  FileText,
  Briefcase,
  AlertTriangle,
  Menu,
  ShieldAlert
} from 'lucide-react';
import { useApp, NavTab } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, t, emergencyActive } = useApp();

  const navItems: { id: NavTab; label: string; icon: any; alert?: boolean }[] = [
    { id: 'home', label: t.tabHome, icon: Home },
    { id: 'health', label: t.tabHealth, icon: HeartPulse },
    { id: 'agri', label: t.tabAgri, icon: Wheat },
    { id: 'schemes', label: t.tabSchemes, icon: FileText },
    { id: 'jobs', label: t.tabJobs, icon: Briefcase },
    { id: 'emergency', label: 'SOS', icon: ShieldAlert, alert: true }
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Bottom Navigation"
    >
      <div className="max-w-md mx-auto grid grid-cols-6 h-16 items-center px-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          if (item.alert) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab('emergency')}
                className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] -mt-2 group"
                aria-label="Emergency SOS"
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-white shadow-md transition-transform group-active:scale-90 ${
                    emergencyActive || isActive
                      ? 'bg-rose-600 ring-4 ring-rose-200 animate-pulse'
                      : 'bg-rose-600 hover:bg-rose-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-rose-600 mt-0.5 tracking-tight">
                  SOS
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors ${
                isActive ? 'text-emerald-800 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 text-emerald-800' : 'text-slate-500'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-700 rounded-full" />
                )}
              </div>
              <span className="text-[10px] font-medium tracking-tight mt-1 truncate max-w-[50px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
