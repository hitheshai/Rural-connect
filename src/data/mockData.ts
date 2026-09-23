import {
  LocationInfo,
  WeatherData,
  HealthFacility,
  HealthTip,
  MandiPrice,
  FarmerProduce,
  GovtScheme,
  LocalJob,
  ServiceProvider,
  TransportOption,
  CommunityNotice,
  Grievance
} from '../types';

export const INITIAL_LOCATIONS: LocationInfo[] = [
  {
    village: 'Rampura',
    panchayat: 'Rampura Gram Panchayat',
    taluk: 'Bailhongal',
    district: 'Belagavi',
    state: 'Karnataka',
    pincode: '591102',
    coordinates: { latitude: 15.8497, longitude: 74.4977 }
  },
  {
    village: 'Channapatna Rural',
    panchayat: 'Mangalwarpet GP',
    taluk: 'Channapatna',
    district: 'Ramanagara',
    state: 'Karnataka',
    pincode: '562160',
    coordinates: { latitude: 12.6518, longitude: 77.2089 }
  },
  {
    village: 'Sidlaghatta Border',
    panchayat: 'Mallenahalli GP',
    taluk: 'Sidlaghatta',
    district: 'Chikkaballapur',
    state: 'Karnataka',
    pincode: '562105',
    coordinates: { latitude: 13.3926, longitude: 77.8631 }
  },
  {
    village: 'Belur Hobli',
    panchayat: 'Arehalli GP',
    taluk: 'Belur',
    district: 'Hassan',
    state: 'Karnataka',
    pincode: '573115',
    coordinates: { latitude: 13.1622, longitude: 75.8569 }
  }
];

export const INITIAL_WEATHER: WeatherData = {
  temp: 29,
  condition: 'Partly Cloudy · Good Sowing Weather',
  conditionKn: 'ಭಾಗಶಃ ಮೋಡ ಕವಿದ ವಾತಾವರಣ · ಬಿತ್ತನೆಗೆ ಸೂಕ್ತ ಸಮಯ',
  conditionHi: 'आंशिक रूप से बादल · बुवाई के लिए उत्तम मौसम',
  humidity: 58,
  rainProbability: 20,
  windSpeed: '12 km/h ENE',
  advisory: 'Optimal window for Kharif pest monitoring and drip irrigation before afternoon.',
  advisoryKn: 'ಖಾರಿಫ್ ಬೆಳೆಗಳ ಕೀಟ ಬಾಧೆ ತಪಾಸಣೆ ಮತ್ತು ಮಧ್ಯಾಹ್ನದ ಮುನ್ನ ಹನಿ ನೀರಾವರಿ ಒದಗಿಸಲು ಉತ್ತಮ ಸಮಯ.',
  advisoryHi: 'दोपहर से पहले खरीफ कीटों की निगरानी और ड्रिप सिंचाई के लिए सर्वोत्तम समय।'
};

export const INITIAL_HEALTH_FACILITIES: HealthFacility[] = [
  {
    id: 'hf-1',
    name: 'Government Primary Health Centre (PHC) Rampura',
    type: 'phc',
    distanceKm: 1.8,
    village: 'Rampura',
    doctorAvailable: true,
    doctorName: 'Dr. Ramesh Kulkarni (MBBS, DNB)',
    contactNumber: '+91 94481 20491',
    timing: '8:00 AM - 4:00 PM (Emergency 24x7)',
    services: ['General OPD', 'Maternity Delivery', 'Snake Venom Antiserum', 'Child Immunization', 'Free Generic Medicines'],
    ambulanceAvailable: true,
    emergency24x7: true,
    address: 'Near Old Panchayat Office, Main Road, Rampura'
  },
  {
    id: 'hf-2',
    name: 'Taluk General Hospital Bailhongal',
    type: 'taluk_hospital',
    distanceKm: 8.5,
    village: 'Bailhongal Town',
    doctorAvailable: true,
    doctorName: 'Dr. Savitha Patil & Surgical Team',
    contactNumber: '+91 82882 33100',
    timing: '24 Hours Open',
    services: ['Emergency Trauma', 'Operation Theatre', 'Blood Storage Unit', 'X-Ray & Ultrasound', 'ICU Care'],
    ambulanceAvailable: true,
    emergency24x7: true,
    address: 'Station Road, Opp. KSRTC Bus Stand, Bailhongal'
  },
  {
    id: 'hf-3',
    name: 'Pradhan Mantri Jan Aushadhi Kendra (Generic Medicine)',
    type: 'pharmacy',
    distanceKm: 2.2,
    village: 'Rampura Cross',
    doctorAvailable: false,
    contactNumber: '+91 98450 77123',
    timing: '8:30 AM - 9:00 PM',
    services: ['50-90% Discounted Generic Medicines', 'BP & Sugar Testing', 'Surgical Bandages & First Aid'],
    ambulanceAvailable: false,
    emergency24x7: false,
    address: 'Shop #4, Sri Lakshmi Complex, Rampura Cross'
  },
  {
    id: 'hf-4',
    name: 'Sanjeevini Mobile Health Clinic Van',
    type: 'clinic',
    distanceKm: 0.5,
    village: 'Rampura Temple Ground',
    doctorAvailable: true,
    doctorName: 'Dr. Anand Gowda (Visiting Govt Medical Officer)',
    contactNumber: '+91 94808 61002',
    timing: 'Visiting Tuesday & Friday: 10:00 AM - 2:00 PM',
    services: ['Free Health Checkup', 'Geriatric & Eye Screening', 'Diabetes & Hypertension Medication'],
    ambulanceAvailable: false,
    emergency24x7: false,
    address: 'Camp at Grama Chavadi, Rampura'
  }
];

export const INITIAL_HEALTH_TIPS: HealthTip[] = [
  {
    id: 'tip-1',
    title: 'Emergency Snake Bite First-Aid Protocol',
    titleKn: 'ಹಾವು ಕಡಿತದ ತುರ್ತು ಪ್ರಥಮ ಚಿಕಿತ್ಸಾ ಕ್ರಮಗಳು',
    titleHi: 'साँप काटने पर आपातकालीन प्राथमिक उपचार',
    category: 'firstaid',
    summary: 'Never cut the wound or tie tight tourniquets. Immobilize the limb and reach the nearest PHC immediately.',
    summaryKn: 'ಗಾಯವನ್ನು ಕೊಯ್ಯಬೇಡಿ ಅಥವಾ ಬಿಗಿಯಾಗಿ ಹಗ್ಗ ಕಟ್ಟಬೇಡಿ. ಕಾಲನ್ನು ಅಲ್ಲಾಡಿಸದೆ ತಕ್ಷಣವೇ ಸಮೀಪದ ಪಿಎಚ್‌ಸಿಗೆ ಕರೆದೊಯ್ಯಿರಿ.',
    summaryHi: 'घाव को कभी न काटें और न ही कसकर रस्सी बांधें। अंग को स्थिर रखें और तुरंत प्राथमिक स्वास्थ्य केंद्र जाएं।',
    steps: [
      'Keep the patient calm and completely still to slow venom circulation.',
      'Remove tight rings, anklets, or footwear before swelling starts.',
      'Immobilize the affected limb using a wooden splint or soft cloth wrap.',
      'Do NOT suck venom, apply cow dung, or make blade cuts.',
      'Rush to Rampura PHC or Taluk Hospital which has free Anti-Snake Venom (ASV).'
    ],
    stepsKn: [
      'ರೋಗಿ ಭಯಪಡದಂತೆ ಶಾಂತವಾಗಿರಿಸಿ, ಹೆಚ್ಚು ನಡೆದಾಡಲು ಬಿಡಬೇಡಿ.',
      'ಊತ ಬರುವ ಮುನ್ನ ಕಾಲುಂಗುರ, ಬಳೆ, ಬಟ್ಟೆಗಳನ್ನು ಸಡಿಲಗೊಳಿಸಿ.',
      'ಕಚ್ಚಿದ ಜಾಗವನ್ನು ಬಿದಿರಿನ ಪಟ್ಟಿ ಅಥವಾ ಬಟ್ಟೆಯಿಂದ ಅಲುಗಾಡದಂತೆ ಕಟ್ಟಿ.',
      'ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ಬ್ಲೇಡ್‌ನಿಂದ ಕೊಯ್ಯುವುದು ಅಥವಾ ಸಗಣಿ ಹಚ್ಚುವುದು ಮಾಡಬೇಡಿ.',
      'ಉಚಿತ ಆಂಟಿ-ಸ್ನೇಕ್ ವೆನಮ್ ಲಭ್ಯವಿರುವ ಸಮೀಪದ ಪಿಎಚ್‌ಸಿಗೆ ತಕ್ಷಣ ಕೊಂಡೊಯ್ಯಿರಿ.'
    ],
    stepsHi: [
      'मरीज को शांत रखें और ज्यादा हिलने-डुलने न दें।',
      'सूजन शुरू होने से पहले कड़े, अंगूठी आदि उतार दें।',
      'कटे हुए अंग को लकड़ी या कपड़े के सहारे स्थिर रखें।',
      'घाव पर चीरा लगाना या गोबर लगाना जानलेवा हो सकता है, ऐसा बिल्कुल न करें।',
      'तुरंत नजदीकी अस्पताल ले जाएं जहां एंटी-वेनम इंजेक्शन उपलब्ध है।'
    ],
    urgency: 'high'
  },
  {
    id: 'tip-2',
    title: 'Protecting From Heatstroke During Farm Work',
    titleKn: 'ಹೊಲದ ಕೆಲಸದ ವೇಳೆ ಬಿಸಿಲಿನ ಆಘಾತದಿಂದ ರಕ್ಷಣೆ',
    titleHi: 'खेत में काम करते समय लू और गर्मी से बचाव',
    category: 'firstaid',
    summary: 'Drink ORS water, buttermilk or tender coconut water regularly. Rest under tree shade between 12 PM - 3 PM.',
    summaryKn: 'ನಿಯಮಿತವಾಗಿ ಮಜ್ಜಿಗೆ, ಎಳನೀರು ಅಥವಾ ಒಆರ್‌ಎಸ್ ನೀರು ಕುಡಿಯಿರಿ. ಮಧ್ಯಾಹ್ನ 12 ರಿಂದ 3 ರವರೆಗೆ ನೆರಳಿನಲ್ಲಿ ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ.',
    summaryHi: 'नियमित रूप से छाछ, नारियल पानी या ओआरएस घोल पिएं। दोपहर 12 से 3 बजे के बीच धूप में कड़ी मेहनत से बचें।',
    steps: [
      'Wear wide-brim straw hat or white cotton cloth around your head.',
      'Carry 2 litres of water with a pinch of salt and jaggery to the farm.',
      'If dizziness occurs, move to shade immediately and sprinkle cool water on forehead.'
    ],
    stepsKn: [
      'ತಲೆಗೆ ಹತ್ತಿ ಟವಲ್ ಅಥವಾ ಅಗಲವಾದ ಹುಲ್ಲಿನ ಟೋಪಿ ಧರಿಸಿ.',
      'ಹೊಲಕ್ಕೆ ಹೋಗುವಾಗ ಉಪ್ಪು-ಬೆಲ್ಲ ಬೆರೆಸಿದ ನೀರು ಅಥವಾ ಮಜ್ಜಿಗೆ ಕೊಂಡೊಯ್ಯಿರಿ.',
      'ತಲೆಸುತ್ತು ಬಂದರೆ ತಕ್ಷಣವೇ ಮರದ ನೆರಳಿಗೆ ಹೋಗಿ ಮುಖದ ಮೇಲೆ ತಣ್ಣೀರು ಚಿಮುಕಿಸಿ.'
    ],
    stepsHi: [
      'सिर पर सूती गमछा या टोपी जरूर रखें।',
      'खेत में काम करते समय नमक-गुड़ का पानी या छाछ साथ रखें।',
      'चक्कर या कमजोरी महसूस होने पर तुरंत छाया में बैठें और सिर पर ठंडा पानी डालें।'
    ],
    urgency: 'medium'
  }
];

export const INITIAL_MANDI_PRICES: MandiPrice[] = [
  {
    id: 'mp-1',
    cropName: 'Tomato (Local Hybrid)',
    cropNameKn: 'ಟೊಮ್ಯಾಟೊ (ನಾಟಿ & ಹೈಬ್ರಿಡ್)',
    cropNameHi: 'टमाटर (देसी/हाइब्रिड)',
    variety: 'Shivam / Sahu',
    marketName: 'Bailhongal APMC',
    minPrice: 1400,
    maxPrice: 2200,
    modalPrice: 1850,
    unit: 'Quintal',
    priceChange: 8.5,
    updatedAt: 'Today, 07:30 AM'
  },
  {
    id: 'mp-2',
    cropName: 'Ragi (Finger Millet)',
    cropNameKn: 'ರಾಗಿ (ಕೆಂಪು ರಾಗಿ)',
    cropNameHi: 'रागी (मड़ुआ)',
    variety: 'GPU-28 / MR-1',
    marketName: 'Belagavi APMC',
    minPrice: 3800,
    maxPrice: 4350,
    modalPrice: 4200,
    unit: 'Quintal',
    priceChange: 3.2,
    updatedAt: 'Today, 08:15 AM'
  },
  {
    id: 'mp-3',
    cropName: 'Onion (Red Bellary)',
    cropNameKn: 'ಈರುಳ್ಳಿ (ಬಳ್ಳಾರಿ ಕೆಂಪು)',
    cropNameHi: 'प्याज (लाल)',
    variety: 'Bellary Medium',
    marketName: 'Hubballi APMC',
    minPrice: 1600,
    maxPrice: 2400,
    modalPrice: 2100,
    unit: 'Quintal',
    priceChange: -2.4,
    updatedAt: 'Today, 07:45 AM'
  },
  {
    id: 'mp-4',
    cropName: 'Paddy / Rice (Sona Masuri)',
    cropNameKn: 'ಭತ್ತ (ಸೋನಾ ಮಸೂರಿ)',
    cropNameHi: 'धान (सोना मसूरी)',
    variety: 'BPT 5204',
    marketName: 'Dharwad APMC',
    minPrice: 2600,
    maxPrice: 3100,
    modalPrice: 2950,
    unit: 'Quintal',
    priceChange: 1.8,
    updatedAt: 'Today, 08:30 AM'
  },
  {
    id: 'mp-5',
    cropName: 'Cotton (Medium Staple)',
    cropNameKn: 'ಹತ್ತಿ (ಮಧ್ಯಮ ಎಳೆ)',
    cropNameHi: 'कपास (कॉटन)',
    variety: 'Bt Cotton DCH-32',
    marketName: 'Bailhongal APMC',
    minPrice: 7100,
    maxPrice: 7900,
    modalPrice: 7600,
    unit: 'Quintal',
    priceChange: 4.1,
    updatedAt: 'Today, 08:00 AM'
  },
  {
    id: 'mp-6',
    cropName: 'Sugarcane (Crushing Grade)',
    cropNameKn: 'ಕಬ್ಬು (ಸಕ್ಕರೆ ಕಾರ್ಖಾನೆ ಗ್ರೇಡ್)',
    cropNameHi: 'गन्ना (फैक्ट्री ग्रेड)',
    variety: 'Co-86032',
    marketName: 'Sankeshwar Sugar Mill Gate',
    minPrice: 3150,
    maxPrice: 3400,
    modalPrice: 3300,
    unit: 'Tonne',
    priceChange: 0.0,
    updatedAt: 'Yesterday'
  },
  {
    id: 'mp-7',
    cropName: 'Maize (Corn)',
    cropNameKn: 'ಮೆಕ್ಕೆಜೋಳ (ಹಳದಿ)',
    cropNameHi: 'मक्का (पीला)',
    variety: 'Hybrid Yellow',
    marketName: 'Ranebennur APMC',
    minPrice: 2150,
    maxPrice: 2450,
    modalPrice: 2320,
    unit: 'Quintal',
    priceChange: -1.2,
    updatedAt: 'Today, 09:00 AM'
  }
];

export const INITIAL_FARMER_PRODUCE: FarmerProduce[] = [
  {
    id: 'fp-1',
    farmerName: 'Basavaraj Maradagi',
    cropName: 'Organic Ragi (Cleaned & Bagged)',
    variety: 'GPU-28 Red Ragi',
    quantity: 35,
    unit: 'Quintal',
    pricePerUnit: 4100,
    village: 'Rampura East Field',
    phoneNumber: '+91 94812 55901',
    listedDate: 'Yesterday',
    harvestDate: 'Harvested 10 days ago (Dry)',
    isOrganic: true
  },
  {
    id: 'fp-2',
    farmerName: 'Mallikarjun Patil',
    cropName: 'Grade-A Fresh Red Tomatoes',
    variety: 'Sahu Hybrid Firm Fruit',
    quantity: 40,
    unit: 'Crates (25kg each)',
    pricePerUnit: 480,
    village: 'Rampura Cross Garden',
    phoneNumber: '+91 98442 11983',
    listedDate: 'Today, 6:00 AM',
    harvestDate: 'Fresh Morning Plucking',
    isOrganic: false
  },
  {
    id: 'fp-3',
    farmerName: 'Ningappa Goudar',
    cropName: 'Desi Pure Yellow Maize',
    variety: 'Pioneer 3302',
    quantity: 60,
    unit: 'Quintal',
    pricePerUnit: 2280,
    village: 'Bailhongal Rural',
    phoneNumber: '+91 97410 88234',
    listedDate: '2 days ago',
    harvestDate: 'Sun-dried at 11% moisture',
    isOrganic: false
  }
];

export const INITIAL_GOVT_SCHEMES: GovtScheme[] = [
  {
    id: 'sch-1',
    title: 'PM-Kisan Samman Nidhi (17th Installment)',
    titleKn: 'ಪಿಎಂ-ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ (₹6,000 ವಾರ್ಷಿಕ ನೆರವು)',
    titleHi: 'पीएम-किसान सम्मान निधि (₹6,000 वार्षिक सहायता)',
    department: 'Department of Agriculture & Farmers Welfare',
    category: 'farmer',
    benefitAmount: '₹6,000 per year (3 equal installments of ₹2,000 in DBT)',
    summary: 'Direct income support transferred straight to small and marginal farmer bank accounts.',
    summaryKn: 'ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ನೇರವಾಗಿ ವಾರ್ಷಿಕ ₹6,000 ಹಣ ಜಮೆ ಮಾಡುವ ಕೇಂದ್ರ ಸರ್ಕಾರದ ಯೋಜನೆ.',
    summaryHi: 'किसानों के बैंक खातों में सीधे सालाना ₹6,000 की नकद सहायता उपलब्ध कराने वाली योजना।',
    eligibility: [
      'Landholding farmer families with cultivable land in their name',
      'Aadhaar seeded bank account with e-KYC verified',
      'Institutional landholders and income tax payers are excluded'
    ],
    eligibilityKn: [
      'ತಮ್ಮ ಹೆಸರಿನಲ್ಲಿ ಸಾಗುವಳಿ ಜಮೀನು ಅಥವಾ ಪಹಣಿ (RTC) ಹೊಂದಿರುವ ರೈತರು',
      'ಆಧಾರ್ ಲಿಂಕ್ ಆದ ಬ್ಯಾಂಕ್ ಖಾತೆ ಮತ್ತು ಇ-ಕೆವೈಸಿ ಪೂರ್ಣಗೊಂಡಿರಬೇಕು',
      'ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿದಾರರು ಅಥವಾ ಸರ್ಕಾರಿ ನೌಕರರಿಗೆ ಅನ್ವಯಿಸುವುದಿಲ್ಲ'
    ],
    eligibilityHi: [
      'जिनके नाम पर कृषि भूमि की खतौनी/जमाबंदी दर्ज है',
      'आधार से जुड़ा बैंक खाता और ई-केवाईसी पूरा होना अनिवार्य है',
      'आयकर दाता या सरकारी पेंशनभोगी अपात्र हैं'
    ],
    documents: ['Aadhaar Card', 'Land Record / Pahani (RTC)', 'Bank Passbook copy', 'Active Mobile Number'],
    documentsKn: ['ಆಧಾರ್ ಕಾರ್ಡ್', 'ಜಮೀನಿನ ಪಹಣಿ (RTC)', 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಪ್ರತಿ', 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ'],
    documentsHi: ['आधार कार्ड', 'खतौनी/जमीन का पर्चा', 'बैंक पासबुक', 'मोबाइल नंबर'],
    howToApply: 'Visit Grama One / Bangalore One or apply via PM-Kisan Portal. Gram Sevak can verify RTC on portal.',
    helpline: '155261 / 011-24300606',
    officialLink: 'https://pmkisan.gov.in'
  },
  {
    id: 'sch-2',
    title: 'Gruha Lakshmi Scheme (Financial Independence)',
    titleKn: 'ಗೃಹಲಕ್ಷ್ಮಿ ಯೋಜನೆ (ಮನೆಯೊಡತಿಗೆ ₹2,000 ಮಾಸಿಕ)',
    titleHi: 'गृह लक्ष्मी योजना (घर की मुखिया महिला को ₹2,000 महीना)',
    department: 'Women and Child Development Department, Karnataka',
    category: 'women',
    benefitAmount: '₹2,000 per month direct to woman head of household',
    summary: 'Financial empowerment assistance for women heads of family to meet household and nutritional needs.',
    summaryKn: 'ಕುಟುಂಬದ ಯಜಮಾನಿ ಮಹಿಳೆಗೆ ಪ್ರತಿ ತಿಂಗಳು ₹2,000 ಆರ್ಥಿಕ ನೆರವು ನೀಡುವ ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಗ್ಯಾರಂಟಿ ಯೋಜನೆ.',
    summaryHi: 'परिवार की महिला मुखिया को हर महीने ₹2,000 की वित्तीय सहायता प्रदान करने वाली योजना।',
    eligibility: [
      'Woman registered as head of family in Antyodaya (AAY) or BPL/APL ration card',
      'Neither the woman nor her husband should be an income tax payer or GST filer',
      'Only one woman per household eligible'
    ],
    eligibilityKn: [
      'ರೇಷನ್ ಕಾರ್ಡ್‌ನಲ್ಲಿ ಮನೆಯೊಡತಿ ಎಂದು ಹೆಸರಿರುವ ಮಹಿಳೆ',
      'ಮಹಿಳೆ ಅಥವಾ ಆಕೆಯ ಪತಿ ಆದಾಯ ತೆರಿಗೆ ಅಥವಾ ಜಿಎಸ್‌ಟಿ ಪಾವತಿದಾರರಾಗಿರಬಾರದು',
      'ಒಂದು ಪಡಿತರ ಚೀಟಿಗೆ ಒಬ್ಬ ಮಹಿಳೆಗೆ ಮಾತ್ರ ಲಭ್ಯ'
    ],
    eligibilityHi: [
      'राशन कार्ड में मुखिया के रूप में दर्ज महिला',
      'महिला या पति आयकर अथवा जीएसटी दाता न हों',
      'एक राशन कार्ड पर केवल एक महिला पात्र'
    ],
    documents: ['Ration Card (BPL/APL)', 'Aadhaar Card of Woman & Husband', 'Aadhaar-seeded Bank Account'],
    documentsKn: ['ಪಡಿತರ ಚೀಟಿ (BPL/APL)', 'ಮಹಿಳೆ ಮತ್ತು ಪತಿಯ ಆಧಾರ್ ಕಾರ್ಡ್', 'ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರ'],
    documentsHi: ['राशन कार्ड', 'महिला एवं पति का आधार कार्ड', 'बैंक खाता'],
    howToApply: 'Register at Grama One, Bapuji Seva Kendra, or Karnataka One centre with SMS appointment.',
    helpline: '1902 / 080-22279954'
  },
  {
    id: 'sch-3',
    title: 'PM KUSUM Solar Agriculture Pump Scheme (Subsidized)',
    titleKn: 'ಪಿಎಂ ಕುಸುಮ್ ಸೌರ ಕೃಷಿ ಪಂಪ್ ಯೋಜನೆ (ಶೇ.90 ವರೆಗೆ ಸಹಾಯಧನ)',
    titleHi: 'पीएम कुसुम सोलर कृषि पंप योजना (90% तक सब्सिडी)',
    department: 'Ministry of New and Renewable Energy & KREDL',
    category: 'farmer',
    benefitAmount: 'Up to 90% subsidy on 3HP to 7.5HP solar water pump sets',
    summary: 'Reliable daytime irrigation for farms with zero electricity bills and uninterrupted solar power.',
    summaryKn: 'ರೈತರ ಹೊಲಗಳಿಗೆ 3 ರಿಂದ 7.5 ಎಚ್‌ಪಿ ಸೌರ ಪಂಪ್‌ಸೆಟ್‌ಗಳಿಗೆ ಶೇ.90 ರವರೆಗೆ ಸಹಾಯಧನ ನೀಡಿ ಹಗಲು ನೀರಾವರಿ ಕಲ್ಪಿಸುವ ಯೋಜನೆ.',
    summaryHi: 'किसानों को 3 से 7.5 एचपी तक के सोलर पंप सेट पर 90% तक की छूट पर दिन में सिंचाई की सुविधा।',
    eligibility: [
      'Farmers with borewell or open water source without electrical grid connection or seeking solar upgrade',
      'Valid land RTC and water source certificate from Gram Panchayat',
      'Preference to SC/ST and small/marginal farmers'
    ],
    eligibilityKn: [
      'ಕೊಳವೆಬಾವಿ ಅಥವಾ ತೆರೆದ ಬಾವಿ ಹೊಂದಿರುವ ರೈತರು',
      'ಪಹಣಿ (RTC) ಮತ್ತು ಜಲಮೂಲ ದೃಢೀಕರಣ ಪತ್ರ',
      'ಪರಿಶಿಷ್ಟ ಜಾತಿ / ಪಂಗಡ ಮತ್ತು ಸಣ್ಣ ರೈತರಿಗೆ ಮೊದಲ ಆದ್ಯತೆ'
    ],
    eligibilityHi: [
      'जिनके पास खेत में बोरवेल या कुआं उपलब्ध है',
      'जमीन का पर्चा और पंचायत से जल स्रोत प्रमाण पत्र',
      'छोटे एवं सीमांत किसानों को विशेष प्राथमिकता'
    ],
    documents: ['RTC Land Record', 'Borewell Yield Certificate', 'Aadhaar Card', 'Caste Certificate (if applicable)'],
    documentsKn: ['ಆರ್‌ಟಿಸಿ ಪಹಣಿ', 'ಕೊಳವೆಬಾವಿ ಪ್ರಮಾಣಪತ್ರ', 'ಆಧಾರ್ ಕಾರ್ಡ್', 'ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ'],
    documentsHi: ['जमीन की खतौनी', 'बोरवेल प्रमाण पत्र', 'आधार कार्ड', 'जाति प्रमाण पत्र'],
    howToApply: 'Apply through KREDL or HESCOM / BESCOM portal online or submit at Taluk Agriculture Officer.',
    helpline: '1800-180-3333'
  },
  {
    id: 'sch-4',
    title: 'Ayushman Bharat - Arogya Karnataka (Free Healthcare)',
    titleKn: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ್ - ಆರೋಗ್ಯ ಕರ್ನಾಟಕ (ಉಚಿತ ಚಿಕಿತ್ಸೆ ಕಾರ್ಡ್)',
    titleHi: 'आयुष्मान भारत - आरोग्य कर्नाटक (मुफ्त इलाज कार्ड)',
    department: 'Health and Family Welfare Department',
    category: 'health',
    benefitAmount: 'Up to ₹5,00,000 per family per year for secondary & tertiary treatment',
    summary: 'Cashless hospitalisation across government and empannelled private specialty hospitals.',
    summaryKn: 'ಬಿಪಿಎಲ್ ಕುಟುಂಬಗಳಿಗೆ ಪ್ರತಿ ವರ್ಷ ₹5 ಲಕ್ಷದವರೆಗೆ ಉಚಿತ ಆಸ್ಪತ್ರೆ ದಾಖಲಾತಿ ಮತ್ತು ಶಸ್ತ್ರಚಿಕಿತ್ಸಾ ಸೌಲಭ್ಯ.',
    summaryHi: 'गरीब परिवारों को गंभीर बीमारियों के इलाज और सर्जरी के लिए सालाना ₹5 लाख तक का कैशलेस इलाज।',
    eligibility: [
      'BPL/AAY ration card holders get 100% free treatment for 1,600+ surgical and medical procedures',
      'Referral from Government Taluk/District Hospital or PHC for private empannelled hospitals'
    ],
    eligibilityKn: [
      'ಬಿಪಿಎಲ್ ಅಥವಾ ಅಂತ್ಯೋದಯ ಪಡಿತರ ಚೀಟಿ ಹೊಂದಿರುವ ಕುಟುಂಬಗಳು',
      'ಸರ್ಕಾರಿ ತಾಲೂಕು ಆಸ್ಪತ್ರೆಯಿಂದ ರೆಫರಲ್ ಪತ್ರ ಪಡೆದು ಖಾಸಗಿ ಆಸ್ಪತ್ರೆಗಳಲ್ಲಿ ಚಿಕಿತ್ಸೆ'
    ],
    eligibilityHi: [
      'बीपीएल राशन कार्ड धारक परिवार',
      'सरकारी अस्पताल से रेफरल मिलने पर सूचीबद्ध निजी अस्पतालों में भी मान्य'
    ],
    documents: ['Aadhaar Card', 'Ration Card (BPL)', 'Active Mobile Number'],
    documentsKn: ['ಆಧಾರ್ ಕಾರ್ಡ್', 'ಬಿಪಿಎಲ್ ರೇಷನ್ ಕಾರ್ಡ್', 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ'],
    documentsHi: ['आधार कार्ड', 'राशन कार्ड', 'मोबाइल नंबर'],
    howToApply: 'Get Ayushman Health Card made at any PHC, Taluk Hospital or Grama One center for ₹10.',
    helpline: '104 / 1800-425-8330'
  },
  {
    id: 'sch-5',
    title: 'PMAY-G (Pradhan Mantri Awaas Yojana - Gramin)',
    titleKn: 'ಪ್ರಧಾನಮಂತ್ರಿ ಆವಾಸ್ ಯೋಜನೆ - ಗ್ರಾಮೀಣ (ಪಕ್ಕಾ ಮನೆ ನಿರ್ಮಾಣ ನೆರವು)',
    titleHi: 'प्रधानमंत्री आवास योजना - ग्रामीण (पक्के मकान का अनुदान)',
    department: 'Ministry of Rural Development',
    category: 'housing',
    benefitAmount: '₹1,20,000 grant + 90 days MGNREGA wages (approx ₹30,000) + ₹12,000 toilet grant',
    summary: 'Financial grant directly into bank account to build a pucca hygienic house with toilet.',
    summaryKn: 'ಸ್ವಂತ ನಿವೇಶನವಿರುವ ಬಡವರಿಗೆ ಪಕ್ಕಾ ಮನೆ ನಿರ್ಮಿಸಲು ನೇರ ಆರ್ಥಿಕ ಅನುದಾನ ನೀಡುವ ವಸತಿ ಯೋಜನೆ.',
    summaryHi: 'कच्चे घरों में रहने वाले ग्रामीणों को पक्का मकान बनाने के लिए ₹1.2 लाख से अधिक की सीधी सहायता।',
    eligibility: [
      'Houseless rural households or living in kutcha/dilapidated homes',
      'Name listed in Gram Panchayat housing priority beneficiary register (SECC)'
    ],
    eligibilityKn: [
      'ಸ್ವಂತ ಸೂರು ಇಲ್ಲದ ಅಥವಾ ಕಚ್ಚಾ ಗುಡಿಸಲಿನಲ್ಲಿ ವಾಸಿಸುವ ಕುಟುಂಬಗಳು',
      'ಗ್ರಾಮ ಪಂಚಾಯತ್ ವಸತಿ ಫಲಾನುಭವಿ ಪಟ್ಟಿಯಲ್ಲಿ ಹೆಸರು ಇರಬೇಕು'
    ],
    eligibilityHi: [
      'बेघर या कच्चे/टूटे-फूटे मकानों में रहने वाले परिवार',
      'ग्राम सभा द्वारा अनुमोदित आवास वरीयता सूची में नाम होना चाहिए'
    ],
    documents: ['Aadhaar Card', 'Ration Card', 'Site Title Deed (Hakku Patra)', 'Bank Passbook', 'MGNREGA Job Card'],
    documentsKn: ['ಆಧಾರ್ ಕಾರ್ಡ್', 'ರೇಷನ್ ಕಾರ್ಡ್', 'ನಿವೇಶನದ ಹಕ್ಕುಪತ್ರ', 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್', 'ಉದ್ಯೋಗ ಖಾತರಿ ಕಾರ್ಡ್'],
    documentsHi: ['आधार कार्ड', 'राशन कार्ड', 'जमीन का पट्टा/कागजात', 'बैंक पासबुक', 'जॉब कार्ड'],
    howToApply: 'Contact Panchayat Development Officer (PDO) or apply during Grama Sabhe meeting.',
    helpline: '1800-11-6446'
  }
];

export const INITIAL_LOCAL_JOBS: LocalJob[] = [
  {
    id: 'job-1',
    title: 'Paddy Harvesting & Bundling Team (Men & Women)',
    employerName: 'Veeranna Gowda (Farm Owner)',
    location: 'Rampura North Fields (Near canal)',
    wage: '₹550 / day + Lunch & Tea',
    wageType: 'daily',
    workType: 'agricultural',
    openings: 8,
    duration: '4-5 Days immediate work',
    phone: '+91 94483 44012',
    postedDate: 'Today, 06:45 AM',
    requirements: ['Experienced in manual sickle harvesting and sheaf tying', 'Early morning 7:00 AM start']
  },
  {
    id: 'job-2',
    title: 'Tractor Driver with Rotary Tiller Experience',
    employerName: 'Suresh Patil Agri Services',
    location: 'Rampura & Nearby 3 Villages',
    wage: '₹800 / day or ₹20,000 / month',
    wageType: 'daily',
    workType: 'skilled',
    openings: 2,
    duration: 'Full Kharif Season (3 Months)',
    phone: '+91 98860 11942',
    postedDate: 'Yesterday',
    requirements: ['Valid Commercial / Tractor Driving License', 'Familiar with Mahindra 575 DI operation']
  },
  {
    id: 'job-3',
    title: 'Stone Mason & Helper for Check-dam Construction',
    employerName: 'Mahadevappa (Rural Contractor)',
    location: 'Rampura Stream Check-dam site',
    wage: '₹750 / day (Mason) | ₹480 / day (Helper)',
    wageType: 'daily',
    workType: 'construction',
    openings: 6,
    duration: '15 Days continuous work',
    phone: '+91 94801 88301',
    postedDate: '2 days ago',
    requirements: ['Stone dressing and cement mortar experience', 'Hardworking and punctual']
  },
  {
    id: 'job-4',
    title: 'Dairy Farm Assistant & Milking Attendant',
    employerName: 'Shri Someshwara Dairy Farm',
    location: 'Rampura Cross Road',
    wage: '₹14,500 / month + Free accommodation',
    wageType: 'monthly',
    workType: 'agricultural',
    openings: 1,
    duration: 'Permanent role',
    phone: '+91 94490 22718',
    postedDate: '3 days ago',
    requirements: ['Feeding HF cows, hygiene maintenance, machine milking guidance']
  }
];

export const INITIAL_SERVICES: ServiceProvider[] = [
  {
    id: 'srv-1',
    name: 'Prakash Badiger',
    profession: 'electrician',
    village: 'Rampura Center',
    experienceYears: 9,
    rating: 4.9,
    reviewsCount: 38,
    phone: '+91 94805 11029',
    isVerified: true,
    rateEstimate: '₹200 - ₹400 per visit (Agri pump starter wiring ₹350)',
    availableNow: true
  },
  {
    id: 'srv-2',
    name: 'Shankar Kamble',
    profession: 'plumber',
    village: 'Rampura High School Road',
    experienceYears: 12,
    rating: 4.8,
    reviewsCount: 29,
    phone: '+91 98451 90214',
    isVerified: true,
    rateEstimate: '₹250 per visit (Drip line repair, overhead PVC tank fitting)',
    availableNow: true
  },
  {
    id: 'srv-3',
    name: 'Kallappa Mechanic (Omkar Garage)',
    profession: 'mechanic',
    village: 'Rampura Cross Main Road',
    experienceYears: 16,
    rating: 4.9,
    reviewsCount: 64,
    phone: '+91 94488 77610',
    isVerified: true,
    rateEstimate: 'Tractor engine repair, tiller blade welding, diesel pump overhaul',
    availableNow: true
  },
  {
    id: 'srv-4',
    name: 'Anand Kumar (Borewell Specialist)',
    profession: 'borewell',
    village: 'Bailhongal / Rampura Border',
    experienceYears: 14,
    rating: 4.7,
    reviewsCount: 42,
    phone: '+91 97420 33819',
    isVerified: true,
    rateEstimate: 'Submersible pump retrieval, camera inspection, column pipe change',
    availableNow: false
  },
  {
    id: 'srv-5',
    name: 'Basappa Kumbar (Mason & Tile Worker)',
    profession: 'mason',
    village: 'Rampura Ward 2',
    experienceYears: 11,
    rating: 4.8,
    reviewsCount: 22,
    phone: '+91 96112 44901',
    isVerified: true,
    rateEstimate: '₹750/day (Compound wall, cattle shed flooring, house plastering)',
    availableNow: true
  }
];

export const INITIAL_TRANSPORTS: TransportOption[] = [
  {
    id: 'tr-1',
    driverName: 'Manjunath (Manju Auto)',
    vehicleType: 'auto',
    vehicleNumber: 'KA-24-B-4412',
    villageBase: 'Rampura Bus Stand Standby',
    capacity: '3 Passengers + Luggage',
    contactNumber: '+91 94486 31209',
    ratePerKm: 18,
    isAvailable: true,
    isEmergencyReady: true
  },
  {
    id: 'tr-2',
    driverName: 'Raju Gaddi (Shared Cruiser Taxi)',
    vehicleType: 'taxi',
    vehicleNumber: 'KA-24-TR-9081',
    villageBase: 'Rampura to Bailhongal Route (Every 30 Mins)',
    capacity: '10 Passengers',
    contactNumber: '+91 98801 44521',
    ratePerKm: 25,
    isAvailable: true,
    isEmergencyReady: false
  },
  {
    id: 'tr-3',
    driverName: 'Hanumanth (Mahindra Bolero Pickup)',
    vehicleType: 'pickup',
    vehicleNumber: 'KA-24-G-1102',
    villageBase: 'Rampura Mandi Gate',
    capacity: '1.5 Tonne Agri Goods / Fertilizers',
    contactNumber: '+91 94819 77800',
    ratePerKm: 32,
    isAvailable: true,
    isEmergencyReady: false
  },
  {
    id: 'tr-4',
    driverName: '108 Govt Arogya Kavacha Ambulance (Taluk Base)',
    vehicleType: 'ambulance',
    vehicleNumber: 'KA-01-G-7711',
    villageBase: 'Stationed at Bailhongal Taluk Hospital (7 mins response)',
    capacity: 'Patient Stretcher + 2 Attendants + Oxygen Support',
    contactNumber: '108',
    ratePerKm: 0, // Free emergency service
    isAvailable: true,
    isEmergencyReady: true
  }
];

export const INITIAL_NOTICES: CommunityNotice[] = [
  {
    id: 'cn-1',
    title: 'Drinking Water Pipeline Maintenance & Shutdown',
    titleKn: 'ಕುಡಿಯುವ ನೀರಿನ ಪೈಪ್‌ಲೈನ್ ದುರಸ್ತಿ ಮತ್ತು ಸರಬರಾಜು ವ್ಯತ್ಯಯ',
    titleHi: 'पीने के पानी की पाइपलाइन मरम्मत और आपूर्ति सूचना',
    category: 'water_supply',
    content: 'Main valve repair on Rampura South tank tomorrow (Thursday) from 9:00 AM to 3:00 PM. Please store sufficient drinking water today evening.',
    contentKn: 'ನಾಳೆ ಗುರುವಾರ ಬೆಳಗ್ಗೆ 9:00 ರಿಂದ ಮಧ್ಯಾಹ್ನ 3:00 ರವರೆಗೆ ದಕ್ಷಿಣ ಟ್ಯಾಂಕ್ ವಾಲ್ವ್ ದುರಸ್ತಿ ಇರುತ್ತದೆ. ಗ್ರಾಮಸ್ಥರು ಇಂದು ಸಂಜೆಯೇ ಅಗತ್ಯ ನೀರನ್ನು ಸಂಗ್ರಹಿಸಿಟ್ಟುಕೊಳ್ಳಲು ಕೋರಲಾಗಿದೆ.',
    contentHi: 'कल गुरुवार सुबह 9 से दोपहर 3 बजे तक मुख्य पाइपलाइन की मरम्मत के कारण पानी की आपूर्ति बंद रहेगी। कृपया आज ही पानी भरकर रख लें।',
    postedBy: 'Panchayat Development Officer (PDO)',
    date: 'Today, 08:30 AM',
    isUrgent: true,
    contactPhone: '+91 82882 22104'
  },
  {
    id: 'cn-2',
    title: 'Free Cattle Foot & Mouth Disease Vaccination Camp',
    titleKn: 'ಉಚಿತ ಜಾನುವಾರು ಕಾಲುಬಾಯಿ ರೋಗ ಲಸಿಕಾ ಶಿಬಿರ',
    titleHi: 'निःशुल्क पशु मुंहपका-खुरपका (FMD) टीकाकरण शिविर',
    category: 'camp',
    content: 'Veterinary hospital team visiting Rampura Grama Chavadi this Saturday. Bring all cows, buffaloes, and calves for free vaccine protection.',
    contentKn: 'ಬರುವ ಶನಿವಾರ ಪಶು ವೈದ್ಯಾಧಿಕಾರಿಗಳ ತಂಡ ರಾಂಪುರ ಗ್ರಾಮ ಚಾವಡಿಗೆ ಭೇಟಿ ನೀಡಲಿದೆ. ರೈತರು ತಮ್ಮ ಎಲ್ಲಾ ಹಸು, ಎಮ್ಮೆ, ಕರುಗಳನ್ನು ಲಸಿಕೆಗೆ ಕರೆತರಲು ಕೋರಲಾಗಿದೆ.',
    contentHi: 'आगामी शनिवार को पशु चिकित्सा टीम गाँव के चौपाल पर आएगी। सभी पशुपालक अपने गाय-भैंसों को मुफ्त टीकाकरण के लिए अवश्य लाएं।',
    postedBy: 'Veterinary Department Bailhongal',
    date: 'Yesterday',
    isUrgent: false,
    contactPhone: '+91 94481 99201'
  },
  {
    id: 'cn-3',
    title: 'Lost Holstein-Friesian (HF) Cow Near Lake Road',
    titleKn: 'ಕೆರೆ ರಸ್ತೆ ಬಳಿ ಕಳೆದುಹೋಗಿರುವ ಎಚ್‌ಎಫ್ ಹಸು',
    titleHi: 'झील के पास खोई हुई एचएफ दुधारू गाय',
    category: 'lost_found',
    content: 'Black & white HF cow with yellow ear-tag #4092 missing since Tuesday evening near Rampura lake pasture. Suitable reward to finder.',
    contentKn: 'ಹಳದಿ ಕಿವಿ ಟ್ಯಾಗ್ #4092 ಇರುವ ಕಪ್ಪು-ಬಿಳಿ ಮಿಶ್ರಿತ ಎಚ್‌ಎಫ್ ಹಸು ಕೆರೆಯ ಬಳಿ ಕಳೆದುಹೋಗಿದೆ. ಪತ್ತೆ ಹಚ್ಚಿದವರಿಗೆ ಸೂಕ್ತ ಬಹುಮಾನ ನೀಡಲಾಗುವುದು.',
    contentHi: 'काले और सफेद रंग की गाय, जिसके कान में पीला टैग #4092 लगा है, मंगलवार शाम से लापता है। पता बताने वाले को उचित इनाम दिया जाएगा।',
    postedBy: 'Shivappa Gaddi (Farmer)',
    date: '2 days ago',
    isUrgent: false,
    contactPhone: '+91 94812 33901'
  }
];

export const INITIAL_GRIEVANCES: Grievance[] = [
  {
    id: 'grv-1',
    trackingId: 'RC-2026-BL-1082',
    category: 'electricity',
    subject: 'Agri feeder transformer spark and frequent low voltage',
    description: 'The 25kVA transformer near field #41 is sparking heavily in the evening, causing pump motor trip.',
    village: 'Rampura North Fields',
    citizenName: 'Gurulingappa',
    phone: '+91 94482 10459',
    status: 'under_review',
    submittedDate: '2026-09-20',
    resolutionNotes: 'HESCOM line inspector assigned. New fuse and oil replacement scheduled for tomorrow.'
  },
  {
    id: 'grv-2',
    trackingId: 'RC-2026-BL-0994',
    category: 'roads',
    subject: 'Deep potholes on Rampura School approach road',
    description: 'During rain the schoolchildren are unable to walk due to stagnant mud pool in front of Primary School.',
    village: 'Rampura School Street',
    citizenName: 'Renuka Hiremath',
    phone: '+91 98451 22890',
    status: 'submitted',
    submittedDate: '2026-09-21'
  },
  {
    id: 'grv-3',
    trackingId: 'RC-2026-BL-0821',
    category: 'water',
    subject: 'RO Drinking Water Plant coin machine jammed',
    description: 'Pure water ATM coin sensor not accepting 5 rupee coins for 20L can dispensing.',
    village: 'Rampura Village Center',
    citizenName: 'Chetan Patil',
    phone: '+91 97410 44102',
    status: 'resolved',
    submittedDate: '2026-09-18',
    resolutionNotes: 'Service technician cleaned coin mechanism and tested dispensing. Fully functional now.'
  }
];

export const EMERGENCY_CONTACTS = [
  {
    name: 'National Emergency Response',
    number: '112',
    desc: 'Police, Fire & Emergency Response All-in-One'
  },
  {
    name: '108 Ambulance (Free Govt Medical)',
    number: '108',
    desc: 'Medical trauma, cardiac arrest, maternity emergency'
  },
  {
    name: '104 Health Advisory & Doctor on Call',
    number: '104',
    desc: 'Medical queries, minor ailments, emergency doctor consultation'
  },
  {
    name: 'Women & Child Helpline',
    number: '181',
    desc: '24/7 Domestic safety, harassment and counselling'
  },
  {
    name: 'Kisan Call Centre (Farmer Helpline)',
    number: '1800-180-1551',
    desc: 'Free agricultural scientist advice in local language'
  },
  {
    name: 'Electricity Board Fault Helpline (BESCOM/HESCOM)',
    number: '1912',
    desc: 'Broken wire, transformer burst or prolonged blackout'
  }
];

export const VILLAGE_VOLUNTEERS = [
  {
    name: 'Kumaraswamy (Civil Defense First Responder)',
    village: 'Rampura Ward 1',
    phone: '+91 94481 00213',
    role: 'Trained in CPR, Snakebite First Aid & Stretcher handling'
  },
  {
    name: 'Dr. Ramesh Kulkarni (PHC Medical Officer)',
    village: 'Rampura PHC Quarters',
    phone: '+91 94481 20491',
    role: 'Primary Medical Officer on call'
  },
  {
    name: 'Geetha Anganwadi Worker',
    village: 'Rampura East',
    phone: '+91 98450 66120',
    role: 'Maternal health, delivery transport coordination'
  }
];

export const INITIAL_DESIGNATED_CONTACTS: import('../types').DesignatedContact[] = [
  {
    id: 'dc-1',
    name: 'Suresh Maradagi',
    relationship: 'Brother / Immediate Family',
    relationshipKn: 'ಸಹೋದರ / ಕುಟುಂಬದ ಸದಸ್ಯ',
    relationshipHi: 'भाई / परिवार का सदस्य',
    phone: '+91 98451 12345',
    notifyViaSms: true,
    notifyViaWhatsapp: true,
    status: 'idle',
    distanceKm: 0.6,
    coordinates: {
      latitude: 15.8542,
      longitude: 74.4998
    },
    avatarColor: 'bg-emerald-600',
    isPrimary: true
  },
  {
    id: 'dc-2',
    name: 'Kumaraswamy',
    relationship: 'Civil Defense Volunteer',
    relationshipKn: 'ಗ್ರಾಮ ರಕ್ಷಣಾ ಕಾರ್ಯಕರ್ತ',
    relationshipHi: 'नागरिक सुरक्षा स्वयंसेवक',
    phone: '+91 94481 00213',
    notifyViaSms: true,
    notifyViaWhatsapp: true,
    status: 'idle',
    distanceKm: 0.8,
    coordinates: {
      latitude: 15.8441,
      longitude: 74.4932
    },
    avatarColor: 'bg-indigo-600',
    isPrimary: true
  },
  {
    id: 'dc-3',
    name: 'Dr. Ramesh Kulkarni',
    relationship: 'Primary Health Officer',
    relationshipKn: 'ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ವೈದ್ಯಾಧಿಕಾರಿ',
    relationshipHi: 'प्राथमिक स्वास्थ्य चिकित्सक',
    phone: '+91 94481 20491',
    notifyViaSms: true,
    notifyViaWhatsapp: false,
    status: 'idle',
    distanceKm: 1.1,
    coordinates: {
      latitude: 15.8580,
      longitude: 74.4925
    },
    avatarColor: 'bg-blue-600',
    isPrimary: false
  },
  {
    id: 'dc-4',
    name: 'Ningamma',
    relationship: 'ASHA Health Worker',
    relationshipKn: 'ಆಶಾ ಆರೋಗ್ಯ ಕಾರ್ಯಕರ್ತೆ',
    relationshipHi: 'आशा स्वास्थ्य कार्यकर्ता',
    phone: '+91 97405 88124',
    notifyViaSms: true,
    notifyViaWhatsapp: true,
    status: 'idle',
    distanceKm: 0.7,
    coordinates: {
      latitude: 15.8465,
      longitude: 74.5030
    },
    avatarColor: 'bg-amber-600',
    isPrimary: false
  }
];

export const INITIAL_EMERGENCY_RESPONDERS: import('../types').EmergencyResponder[] = [
  {
    id: 'resp-1',
    name: '108 Ambulance (Unit #KA-24-G-4012)',
    role: 'Govt Advanced Life Support (ALS)',
    phone: '108',
    distanceKm: 1.4,
    coordinates: {
      latitude: 15.8610,
      longitude: 74.5050
    },
    status: 'en_route',
    etaMins: 4,
    type: 'ambulance'
  },
  {
    id: 'resp-2',
    name: '112 Rural Police Quick Response (ERSS)',
    role: 'Bailhongal Taluk Patrol',
    phone: '112',
    distanceKm: 1.8,
    coordinates: {
      latitude: 15.8390,
      longitude: 74.5020
    },
    status: 'dispatched',
    etaMins: 6,
    type: 'police'
  }
];

