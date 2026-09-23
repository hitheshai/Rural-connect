export type UserRole = 'resident' | 'farmer' | 'provider' | 'admin';

export type Language = 'en' | 'kn' | 'hi';

export interface LocationInfo {
  village: string;
  panchayat: string;
  taluk: string;
  district: string;
  state: string;
  pincode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface WeatherData {
  temp: number;
  condition: string;
  conditionKn: string;
  conditionHi: string;
  humidity: number;
  rainProbability: number;
  windSpeed: string;
  advisory: string;
  advisoryKn: string;
  advisoryHi: string;
}

export interface HealthFacility {
  id: string;
  name: string;
  type: 'phc' | 'taluk_hospital' | 'clinic' | 'pharmacy';
  distanceKm: number;
  village: string;
  doctorAvailable: boolean;
  doctorName?: string;
  contactNumber: string;
  timing: string;
  services: string[];
  ambulanceAvailable: boolean;
  emergency24x7: boolean;
  address: string;
}

export interface DoctorConsultation {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  phone: string;
  symptoms: string[];
  notes?: string;
  preferredTime: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface HealthTip {
  id: string;
  title: string;
  titleKn: string;
  titleHi: string;
  category: 'firstaid' | 'maternal' | 'hygiene' | 'seasonal';
  summary: string;
  summaryKn: string;
  summaryHi: string;
  steps: string[];
  stepsKn: string[];
  stepsHi: string[];
  urgency: 'low' | 'medium' | 'high';
}

export interface MandiPrice {
  id: string;
  cropName: string;
  cropNameKn: string;
  cropNameHi: string;
  variety: string;
  marketName: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string; // e.g. "Quintal"
  priceChange: number; // positive or negative percentage
  updatedAt: string;
}

export interface FarmerProduce {
  id: string;
  farmerName: string;
  cropName: string;
  variety: string;
  quantity: number;
  unit: string; // "Quintal", "Bags", "Kg"
  pricePerUnit: number;
  village: string;
  phoneNumber: string;
  listedDate: string;
  harvestDate: string;
  isOrganic?: boolean;
}

export interface GovtScheme {
  id: string;
  title: string;
  titleKn: string;
  titleHi: string;
  department: string;
  category: 'farmer' | 'women' | 'senior' | 'youth' | 'housing' | 'health';
  benefitAmount: string;
  summary: string;
  summaryKn: string;
  summaryHi: string;
  eligibility: string[];
  eligibilityKn: string[];
  eligibilityHi: string[];
  documents: string[];
  documentsKn: string[];
  documentsHi: string[];
  howToApply: string;
  deadline?: string;
  helpline: string;
  officialLink?: string;
}

export interface LocalJob {
  id: string;
  title: string;
  employerName: string;
  location: string;
  wage: string;
  wageType: 'daily' | 'monthly' | 'piece_rate';
  workType: 'skilled' | 'unskilled' | 'agricultural' | 'construction';
  openings: number;
  duration: string;
  phone: string;
  postedDate: string;
  requirements: string[];
}

export interface ServiceProvider {
  id: string;
  name: string;
  profession: 'electrician' | 'plumber' | 'mechanic' | 'driver' | 'agri_worker' | 'carpenter' | 'mason' | 'borewell';
  village: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  phone: string;
  isVerified: boolean;
  rateEstimate: string;
  availableNow: boolean;
}

export interface TransportOption {
  id: string;
  driverName: string;
  vehicleType: 'auto' | 'taxi' | 'pickup' | 'ambulance';
  vehicleNumber: string;
  villageBase: string;
  capacity: string;
  contactNumber: string;
  ratePerKm: number;
  isAvailable: boolean;
  isEmergencyReady: boolean;
}

export interface CommunityNotice {
  id: string;
  title: string;
  titleKn: string;
  titleHi: string;
  category: 'announcement' | 'water_supply' | 'power_cut' | 'camp' | 'lost_found' | 'event';
  content: string;
  contentKn: string;
  contentHi: string;
  postedBy: string;
  date: string;
  isUrgent?: boolean;
  contactPhone?: string;
}

export interface Grievance {
  id: string;
  trackingId: string;
  category: 'water' | 'roads' | 'electricity' | 'sanitation' | 'health' | 'other';
  subject: string;
  description: string;
  village: string;
  citizenName: string;
  phone: string;
  status: 'submitted' | 'under_review' | 'resolved';
  submittedDate: string;
  resolutionNotes?: string;
}

export interface DesignatedContact {
  id: string;
  name: string;
  relationship: string;
  relationshipKn?: string;
  relationshipHi?: string;
  phone: string;
  notifyViaSms: boolean;
  notifyViaWhatsapp: boolean;
  status: 'idle' | 'notified' | 'viewing_map' | 'responding' | 'arrived';
  lastViewedAt?: string;
  distanceKm: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  avatarColor?: string;
  isPrimary?: boolean;
}

export interface SosLocationTrackPoint {
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  timestamp: number;
  speedKmh?: number;
}

export interface EmergencyResponder {
  id: string;
  name: string;
  role: string;
  phone: string;
  distanceKm: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  status: 'available' | 'dispatched' | 'en_route';
  etaMins: number;
  type: 'ambulance' | 'police' | 'volunteer' | 'doctor';
}

