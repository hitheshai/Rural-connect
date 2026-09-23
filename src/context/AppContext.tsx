import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserRole,
  Language,
  LocationInfo,
  WeatherData,
  HealthFacility,
  DoctorConsultation,
  MandiPrice,
  FarmerProduce,
  GovtScheme,
  LocalJob,
  ServiceProvider,
  TransportOption,
  CommunityNotice,
  Grievance,
  DesignatedContact,
  EmergencyResponder,
  SosLocationTrackPoint
} from '../types';
import {
  INITIAL_LOCATIONS,
  INITIAL_WEATHER,
  INITIAL_HEALTH_FACILITIES,
  INITIAL_MANDI_PRICES,
  INITIAL_FARMER_PRODUCE,
  INITIAL_GOVT_SCHEMES,
  INITIAL_LOCAL_JOBS,
  INITIAL_SERVICES,
  INITIAL_TRANSPORTS,
  INITIAL_NOTICES,
  INITIAL_GRIEVANCES,
  INITIAL_DESIGNATED_CONTACTS,
  INITIAL_EMERGENCY_RESPONDERS
} from '../data/mockData';
import { translations } from '../i18n/translations';
import { speechService } from '../services/speechService';
import { sirenService } from '../services/sirenService';

export type NavTab =
  | 'home'
  | 'health'
  | 'agri'
  | 'schemes'
  | 'jobs'
  | 'services'
  | 'transport'
  | 'emergency'
  | 'community'
  | 'admin';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentLocation: LocationInfo;
  setCurrentLocation: (loc: LocationInfo) => void;
  locationsList: LocationInfo[];
  detectGPSLocation: () => Promise<void>;
  gpsLoading: boolean;

  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;

  weather: WeatherData;
  healthFacilities: HealthFacility[];
  consultations: DoctorConsultation[];
  bookConsultation: (consultation: Omit<DoctorConsultation, 'id' | 'createdAt' | 'status'>) => void;

  mandiPrices: MandiPrice[];
  farmerProduce: FarmerProduce[];
  listProduce: (item: Omit<FarmerProduce, 'id' | 'listedDate'>) => void;

  govtSchemes: GovtScheme[];
  addScheme: (scheme: Omit<GovtScheme, 'id'>) => void;

  localJobs: LocalJob[];
  postJob: (job: Omit<LocalJob, 'id' | 'postedDate'>) => void;

  serviceProviders: ServiceProvider[];
  registerServiceProvider: (provider: Omit<ServiceProvider, 'id' | 'rating' | 'reviewsCount' | 'isVerified'>) => void;
  approveServiceProvider: (id: string) => void;

  transportOptions: TransportOption[];
  requestEmergencyRide: (patientName: string, phone: string, location: string) => string;

  notices: CommunityNotice[];
  addNotice: (notice: Omit<CommunityNotice, 'id' | 'date'>) => void;

  grievances: Grievance[];
  submitGrievance: (grievance: Omit<Grievance, 'id' | 'trackingId' | 'status' | 'submittedDate'>) => string;
  updateGrievanceStatus: (id: string, status: 'submitted' | 'under_review' | 'resolved', notes?: string) => void;

  emergencyActive: boolean;
  triggerEmergencySos: (reason?: string) => void;
  cancelEmergencySos: () => void;

  designatedContacts: DesignatedContact[];
  addDesignatedContact: (contact: Omit<DesignatedContact, 'id'>) => void;
  removeDesignatedContact: (id: string) => void;
  updateDesignatedContact: (id: string, updates: Partial<DesignatedContact>) => void;
  emergencyResponders: EmergencyResponder[];
  sosLocation: { latitude: number; longitude: number; accuracy: number; speedKmh: number };
  updateSosLocation: (coords: { latitude: number; longitude: number; accuracy?: number; speedKmh?: number }) => void;
  sosPathHistory: SosLocationTrackPoint[];
  isSimulatingMovement: boolean;
  setIsSimulatingMovement: (val: boolean | ((prev: boolean) => boolean)) => void;
  sosStartedAt: number | null;
  sosReason: string;
  setSosReason: (reason: string) => void;
  sosSirenMuted: boolean;
  setSosSirenMuted: (val: boolean | ((prev: boolean) => boolean)) => void;

  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean | ((prev: boolean) => boolean)) => void;

  isLargeText: boolean;
  setIsLargeText: (val: boolean | ((prev: boolean) => boolean)) => void;

  isHighContrast: boolean;
  setIsHighContrast: (val: boolean | ((prev: boolean) => boolean)) => void;

  voiceAssistantOpen: boolean;
  setVoiceAssistantOpen: (open: boolean) => void;

  readAloud: (text: string) => void;
  stopAudio: () => void;
  isAudioPlaying: boolean;

  notificationBanner: string | null;
  setNotificationBanner: (msg: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('rc_lang') as Language) || 'en';
  });

  const [userRole, setUserRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem('rc_role') as UserRole) || 'resident';
  });

  const [currentLocation, setCurrentLocation] = useState<LocationInfo>(() => {
    const saved = localStorage.getItem('rc_loc');
    return saved ? JSON.parse(saved) : INITIAL_LOCATIONS[0];
  });

  const [locationsList] = useState<LocationInfo[]>(INITIAL_LOCATIONS);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [weather] = useState<WeatherData>(INITIAL_WEATHER);

  // Health
  const [healthFacilities] = useState<HealthFacility[]>(INITIAL_HEALTH_FACILITIES);
  const [consultations, setConsultations] = useState<DoctorConsultation[]>(() => {
    const saved = localStorage.getItem('rc_consultations');
    return saved ? JSON.parse(saved) : [];
  });

  // Agri
  const [mandiPrices] = useState<MandiPrice[]>(INITIAL_MANDI_PRICES);
  const [farmerProduce, setFarmerProduce] = useState<FarmerProduce[]>(() => {
    const saved = localStorage.getItem('rc_farmer_produce');
    return saved ? JSON.parse(saved) : INITIAL_FARMER_PRODUCE;
  });

  // Schemes
  const [govtSchemes, setGovtSchemes] = useState<GovtScheme[]>(() => {
    const saved = localStorage.getItem('rc_schemes');
    return saved ? JSON.parse(saved) : INITIAL_GOVT_SCHEMES;
  });

  // Jobs
  const [localJobs, setLocalJobs] = useState<LocalJob[]>(() => {
    const saved = localStorage.getItem('rc_jobs');
    return saved ? JSON.parse(saved) : INITIAL_LOCAL_JOBS;
  });

  // Services
  const [serviceProviders, setServiceProviders] = useState<ServiceProvider[]>(() => {
    const saved = localStorage.getItem('rc_providers');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  // Transport
  const [transportOptions] = useState<TransportOption[]>(INITIAL_TRANSPORTS);

  // Notices
  const [notices, setNotices] = useState<CommunityNotice[]>(() => {
    const saved = localStorage.getItem('rc_notices');
    return saved ? JSON.parse(saved) : INITIAL_NOTICES;
  });

  // Grievances
  const [grievances, setGrievances] = useState<Grievance[]>(() => {
    const saved = localStorage.getItem('rc_grievances');
    return saved ? JSON.parse(saved) : INITIAL_GRIEVANCES;
  });

  // Emergency SOS state & dynamic tracking
  const [emergencyActive, setEmergencyActive] = useState<boolean>(false);
  const [sosStartedAt, setSosStartedAt] = useState<number | null>(null);
  const [sosReason, setSosReason] = useState<string>('Medical Emergency');
  const [sosSirenMuted, setSosSirenMuted] = useState<boolean>(false);
  const [isSimulatingMovement, setIsSimulatingMovement] = useState<boolean>(false);

  const [designatedContacts, setDesignatedContacts] = useState<DesignatedContact[]>(() => {
    const saved = localStorage.getItem('rc_designated_contacts');
    return saved ? JSON.parse(saved) : INITIAL_DESIGNATED_CONTACTS;
  });

  const [emergencyResponders] = useState<EmergencyResponder[]>(INITIAL_EMERGENCY_RESPONDERS);

  const [sosLocation, setSosLocation] = useState<{
    latitude: number;
    longitude: number;
    accuracy: number;
    speedKmh: number;
  }>(() => ({
    latitude: currentLocation.coordinates?.latitude || 15.8497,
    longitude: currentLocation.coordinates?.longitude || 74.4977,
    accuracy: 6,
    speedKmh: 0
  }));

  const [sosPathHistory, setSosPathHistory] = useState<SosLocationTrackPoint[]>([
    {
      latitude: currentLocation.coordinates?.latitude || 15.8497,
      longitude: currentLocation.coordinates?.longitude || 74.4977,
      accuracyMeters: 6,
      timestamp: Date.now(),
      speedKmh: 0
    }
  ]);

  // Settings & Accessibility
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);
  const [isLargeText, setIsLargeText] = useState<boolean>(false);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [voiceAssistantOpen, setVoiceAssistantOpen] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [notificationBanner, setNotificationBanner] = useState<string | null>(null);

  const t = translations[language] || translations.en;

  // Persist helpers
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('rc_lang', lang);
  };

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    localStorage.setItem('rc_role', role);
    if (role === 'admin' && activeTab !== 'admin') {
      setActiveTab('admin');
    }
  };

  const handleSetLocation = (loc: LocationInfo) => {
    setCurrentLocation(loc);
    localStorage.setItem('rc_loc', JSON.stringify(loc));
  };

  const detectGPSLocation = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLoading(false);
        const newLoc: LocationInfo = {
          village: 'Current GPS Spot (Rampura Sector)',
          panchayat: 'Rampura GP',
          taluk: 'Bailhongal Taluk',
          district: 'Belagavi District',
          state: 'Karnataka',
          pincode: '591102',
          coordinates: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        };
        handleSetLocation(newLoc);
        setNotificationBanner(`GPS Detected: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        setTimeout(() => setNotificationBanner(null), 4000);
      },
      () => {
        setGpsLoading(false);
        // Fallback default
        handleSetLocation(INITIAL_LOCATIONS[0]);
        setNotificationBanner('Could not fetch exact GPS. Set to default: Rampura.');
        setTimeout(() => setNotificationBanner(null), 4000);
      },
      { timeout: 7000 }
    );
  };

  // Audio helper
  const readAloud = (text: string) => {
    setIsAudioPlaying(true);
    speechService.speak(text, language, () => {
      setIsAudioPlaying(false);
    });
  };

  const stopAudio = () => {
    speechService.stop();
    setIsAudioPlaying(false);
  };

  // Consultations
  const bookConsultation = (consultation: Omit<DoctorConsultation, 'id' | 'createdAt' | 'status'>) => {
    const newDoc: DoctorConsultation = {
      ...consultation,
      id: `doc-${Date.now()}`,
      status: 'confirmed',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updated = [newDoc, ...consultations];
    setConsultations(updated);
    localStorage.setItem('rc_consultations', JSON.stringify(updated));
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
  };

  // List farmer produce
  const listProduce = (item: Omit<FarmerProduce, 'id' | 'listedDate'>) => {
    const newItem: FarmerProduce = {
      ...item,
      id: `fp-${Date.now()}`,
      listedDate: 'Just now'
    };
    const updated = [newItem, ...farmerProduce];
    setFarmerProduce(updated);
    localStorage.setItem('rc_farmer_produce', JSON.stringify(updated));
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
  };

  // Post Job
  const postJob = (job: Omit<LocalJob, 'id' | 'postedDate'>) => {
    const newJob: LocalJob = {
      ...job,
      id: `job-${Date.now()}`,
      postedDate: 'Just now'
    };
    const updated = [newJob, ...localJobs];
    setLocalJobs(updated);
    localStorage.setItem('rc_jobs', JSON.stringify(updated));
    confetti({ particleCount: 40, spread: 60 });
  };

  // Register service provider
  const registerServiceProvider = (provider: Omit<ServiceProvider, 'id' | 'rating' | 'reviewsCount' | 'isVerified'>) => {
    const newProvider: ServiceProvider = {
      ...provider,
      id: `srv-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      isVerified: false // Needs admin approval
    };
    const updated = [newProvider, ...serviceProviders];
    setServiceProviders(updated);
    localStorage.setItem('rc_providers', JSON.stringify(updated));
    confetti({ particleCount: 40, spread: 60 });
  };

  const approveServiceProvider = (id: string) => {
    const updated = serviceProviders.map((p) => (p.id === id ? { ...p, isVerified: true } : p));
    setServiceProviders(updated);
    localStorage.setItem('rc_providers', JSON.stringify(updated));
  };

  // Schemes
  const addScheme = (scheme: Omit<GovtScheme, 'id'>) => {
    const newScheme: GovtScheme = {
      ...scheme,
      id: `sch-${Date.now()}`
    };
    const updated = [newScheme, ...govtSchemes];
    setGovtSchemes(updated);
    localStorage.setItem('rc_schemes', JSON.stringify(updated));
  };

  // Grievance
  const submitGrievance = (grievance: Omit<Grievance, 'id' | 'trackingId' | 'status' | 'submittedDate'>): string => {
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `RC-2026-${currentLocation.district.substring(0, 2).toUpperCase()}-${randNum}`;
    const newGrv: Grievance = {
      ...grievance,
      id: `grv-${Date.now()}`,
      trackingId,
      status: 'submitted',
      submittedDate: new Date().toISOString().split('T')[0]
    };
    const updated = [newGrv, ...grievances];
    setGrievances(updated);
    localStorage.setItem('rc_grievances', JSON.stringify(updated));
    confetti({ particleCount: 40, spread: 50 });
    return trackingId;
  };

  const updateGrievanceStatus = (id: string, status: 'submitted' | 'under_review' | 'resolved', notes?: string) => {
    const updated = grievances.map((g) => (g.id === id ? { ...g, status, resolutionNotes: notes || g.resolutionNotes } : g));
    setGrievances(updated);
    localStorage.setItem('rc_grievances', JSON.stringify(updated));
  };

  // Notices
  const addNotice = (notice: Omit<CommunityNotice, 'id' | 'date'>) => {
    const newNotice: CommunityNotice = {
      ...notice,
      id: `cn-${Date.now()}`,
      date: 'Just now'
    };
    const updated = [newNotice, ...notices];
    setNotices(updated);
    localStorage.setItem('rc_notices', JSON.stringify(updated));
  };

  // Contact management
  const addDesignatedContact = (contact: Omit<DesignatedContact, 'id'>) => {
    const newContact: DesignatedContact = {
      ...contact,
      id: `dc-${Date.now()}`
    };
    const updated = [...designatedContacts, newContact];
    setDesignatedContacts(updated);
    localStorage.setItem('rc_designated_contacts', JSON.stringify(updated));
    confetti({ particleCount: 30, spread: 50 });
  };

  const removeDesignatedContact = (id: string) => {
    const updated = designatedContacts.filter((c) => c.id !== id);
    setDesignatedContacts(updated);
    localStorage.setItem('rc_designated_contacts', JSON.stringify(updated));
  };

  const updateDesignatedContact = (id: string, updates: Partial<DesignatedContact>) => {
    const updated = designatedContacts.map((c) => (c.id === id ? { ...c, ...updates } : c));
    setDesignatedContacts(updated);
    localStorage.setItem('rc_designated_contacts', JSON.stringify(updated));
  };

  const updateSosLocation = (coords: {
    latitude: number;
    longitude: number;
    accuracy?: number;
    speedKmh?: number;
  }) => {
    const newPoint: SosLocationTrackPoint = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracyMeters: coords.accuracy || 6,
      timestamp: Date.now(),
      speedKmh: coords.speedKmh || 0
    };
    setSosLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy || 6,
      speedKmh: coords.speedKmh || 0
    });
    setSosPathHistory((prev) => [...prev.slice(-25), newPoint]);
  };

  // Emergency SOS
  const triggerEmergencySos = (reason?: string) => {
    setEmergencyActive(true);
    setSosStartedAt(Date.now());
    if (reason) setSosReason(reason);

    // Audio siren
    if (!sosSirenMuted) {
      sirenService.startSiren();
    }

    // Set designated contacts to notified
    setDesignatedContacts((prev) =>
      prev.map((c) => ({
        ...c,
        status: 'notified',
        lastViewedAt: 'Receiving SOS alert...'
      }))
    );

    // Simulated contact response progression:
    // At 3.5s: Primary contact opens live tracking link
    setTimeout(() => {
      setDesignatedContacts((prev) =>
        prev.map((c, idx) =>
          idx === 0 ? { ...c, status: 'viewing_map', lastViewedAt: 'Just now' } : c
        )
      );
    }, 3500);

    // At 7s: Civil defense volunteer responds and heads over
    setTimeout(() => {
      setDesignatedContacts((prev) =>
        prev.map((c, idx) =>
          idx === 1
            ? { ...c, status: 'responding', lastViewedAt: 'Responding • ETA 4m' }
            : c
        )
      );
    }, 7000);

    readAloud(
      language === 'kn'
        ? 'ತುರ್ತು ಎಚ್ಚರಿಕೆ ರವಾನಿಸಲಾಗಿದೆ! ಆಂಬ್ಯುಲೆನ್ಸ್ ಮತ್ತು ನಿಮ್ಮ ನಿಗದಿತ ಸಂಪರ್ಕಗಳಿಗೆ ಲೈವ್ ಜಿಪಿಎಸ್ ನಕ್ಷೆ ತಲುಪಿದೆ.'
        : language === 'hi'
        ? 'आपातकालीन अलर्ट सक्रिय किया गया! एम्बुलेंस और आपके नामित संपर्कों को लाइव जीपीएस मैप भेज दिया गया है।'
        : 'Emergency alert activated! Ambulance and your designated emergency contacts are tracking your live GPS location.'
    );

    setNotificationBanner('🚨 SOS Triggered: Broadcasting real-time GPS location to designated contacts.');
  };

  const cancelEmergencySos = () => {
    setEmergencyActive(false);
    setSosStartedAt(null);
    setIsSimulatingMovement(false);
    sirenService.stopSiren();
    stopAudio();

    // Reset contacts to idle
    setDesignatedContacts((prev) =>
      prev.map((c) => ({
        ...c,
        status: 'idle'
      }))
    );

    setNotificationBanner('SOS cancelled. Emergency contacts and responders notified.');
    setTimeout(() => setNotificationBanner(null), 4000);
  };

  // Emergency transport request
  const requestEmergencyRide = (patientName: string, phone: string, location: string): string => {
    const ticketId = `MED-RIDE-${Math.floor(100 + Math.random() * 900)}`;
    setNotificationBanner(`Emergency Ride Request Sent! Ticket #${ticketId}. Driver dispatching.`);
    setTimeout(() => setNotificationBanner(null), 6000);
    return ticketId;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        userRole,
        setUserRole,
        currentLocation,
        setCurrentLocation: handleSetLocation,
        locationsList,
        detectGPSLocation,
        gpsLoading,
        activeTab,
        setActiveTab,
        weather,
        healthFacilities,
        consultations,
        bookConsultation,
        mandiPrices,
        farmerProduce,
        listProduce,
        govtSchemes,
        addScheme,
        localJobs,
        postJob,
        serviceProviders,
        registerServiceProvider,
        approveServiceProvider,
        transportOptions,
        requestEmergencyRide,
        notices,
        addNotice,
        grievances,
        submitGrievance,
        updateGrievanceStatus,
        emergencyActive,
        triggerEmergencySos,
        cancelEmergencySos,
        designatedContacts,
        addDesignatedContact,
        removeDesignatedContact,
        updateDesignatedContact,
        emergencyResponders,
        sosLocation,
        updateSosLocation,
        sosPathHistory,
        isSimulatingMovement,
        setIsSimulatingMovement,
        sosStartedAt,
        sosReason,
        setSosReason,
        sosSirenMuted,
        setSosSirenMuted,
        isMobileFrame,
        setIsMobileFrame,
        isLargeText,
        setIsLargeText,
        isHighContrast,
        setIsHighContrast,
        voiceAssistantOpen,
        setVoiceAssistantOpen,
        readAloud,
        stopAudio,
        isAudioPlaying,
        notificationBanner,
        setNotificationBanner
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
