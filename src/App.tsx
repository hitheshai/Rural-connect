/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { VoiceAssistantModal } from './components/common/VoiceAssistantModal';

import { HomeScreen } from './components/screens/HomeScreen';
import { HealthScreen } from './components/screens/HealthScreen';
import { AgricultureScreen } from './components/screens/AgricultureScreen';
import { SchemesScreen } from './components/screens/SchemesScreen';
import { JobsScreen } from './components/screens/JobsScreen';
import { ServicesScreen } from './components/screens/ServicesScreen';
import { TransportScreen } from './components/screens/TransportScreen';
import { EmergencyScreen } from './components/screens/EmergencyScreen';
import { CommunityScreen } from './components/screens/CommunityScreen';
import { AdminScreen } from './components/screens/AdminScreen';

const MainAppContent: React.FC = () => {
  const {
    activeTab,
    isMobileFrame,
    isLargeText,
    isHighContrast
  } = useApp();

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'health':
        return <HealthScreen />;
      case 'agri':
        return <AgricultureScreen />;
      case 'schemes':
        return <SchemesScreen />;
      case 'jobs':
        return <JobsScreen />;
      case 'services':
        return <ServicesScreen />;
      case 'transport':
        return <TransportScreen />;
      case 'emergency':
        return <EmergencyScreen />;
      case 'community':
        return <CommunityScreen />;
      case 'admin':
        return <AdminScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const appContent = (
    <div
      className={`min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-all font-sans antialiased ${
        isLargeText ? 'text-base font-medium' : 'text-sm'
      } ${isHighContrast ? 'contrast-125 saturate-150' : ''}`}
    >
      <Header />
      <main className="flex-1 w-full max-w-3xl mx-auto px-3 sm:px-6 pt-3 sm:pt-4">
        {renderActiveScreen()}
      </main>
      <BottomNav />
      <VoiceAssistantModal />
    </div>
  );

  if (isMobileFrame) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-2 sm:p-6">
        <div className="w-full max-w-[420px] h-[880px] max-h-[96vh] bg-black rounded-[48px] p-3 shadow-2xl ring-1 ring-white/20 relative flex flex-col overflow-hidden">
          {/* Mobile Speaker / Island notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-center">
            <div className="w-12 h-1 bg-neutral-800 rounded-full" />
          </div>

          {/* Internal Device Screen */}
          <div className="w-full h-full bg-slate-50 rounded-[38px] overflow-y-auto overflow-x-hidden relative flex flex-col">
            {appContent}
          </div>
        </div>
      </div>
    );
  }

  return appContent;
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
