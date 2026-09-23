import React, { useState } from 'react';
import {
  Wheat,
  Search,
  PlusCircle,
  PhoneCall,
  TrendingUp,
  TrendingDown,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle,
  X,
  Volume2,
  DollarSign,
  Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AudioSpeakerButton } from '../common/AudioSpeakerButton';

export const AgricultureScreen: React.FC = () => {
  const {
    t,
    language,
    currentLocation,
    mandiPrices,
    farmerProduce,
    listProduce,
    weather,
    setActiveTab
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'mandi' | 'marketplace' | 'tips'>('mandi');
  const [searchQuery, setSearchQuery] = useState('');
  const [listModalOpen, setListModalOpen] = useState(false);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [selectedProduce, setSelectedProduce] = useState<any>(null);
  const [buyerOffer, setBuyerOffer] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [offerSuccess, setOfferSuccess] = useState(false);

  // Form states for listing produce
  const [farmerName, setFarmerName] = useState('');
  const [cropName, setCropName] = useState('');
  const [variety, setVariety] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('Quintal');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [village, setVillage] = useState(currentLocation.village);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOrganic, setIsOrganic] = useState(false);
  const [harvestDate, setHarvestDate] = useState('Harvested recently (Dry & Cleaned)');

  const filteredMandi = mandiPrices.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      m.cropName.toLowerCase().includes(q) ||
      m.cropNameKn.toLowerCase().includes(q) ||
      m.cropNameHi.toLowerCase().includes(q) ||
      m.marketName.toLowerCase().includes(q)
    );
  });

  const handleListSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName || !cropName || !pricePerUnit || !phoneNumber) return;

    listProduce({
      farmerName,
      cropName,
      variety: variety || 'Standard Local Hybrid',
      quantity: Number(quantity) || 10,
      unit,
      pricePerUnit: Number(pricePerUnit),
      village: village || currentLocation.village,
      phoneNumber,
      harvestDate,
      isOrganic
    });

    setListModalOpen(false);
    setActiveSubTab('marketplace');
    // reset
    setCropName('');
    setQuantity('');
    setPricePerUnit('');
  };

  const handleOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOfferSuccess(true);
    setTimeout(() => {
      setOfferSuccess(false);
      setOfferModalOpen(false);
      setBuyerOffer('');
    }, 2000);
  };

  const farmingTips = [
    {
      title: 'Kharif Soil Health & Drip Irrigation Strategy',
      titleKn: 'ಖಾರಿಫ್ ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು ಹನಿ ನೀರಾವರಿ ನಿರ್ವಹಣೆ',
      titleHi: 'खरीफ में मिट्टी का स्वास्थ्य और ड्रिप सिंचाई प्रबंधन',
      content: 'Maintain mulch cover with sugarcane trash or paddy straw to prevent evaporation. Apply Trichoderma bio-fungicide to prevent root rot during sudden rain spells.',
      contentKn: 'ಮಣ್ಣಿನಲ್ಲಿ ತೇವಾಂಶ ಉಳಿಸಿಕೊಳ್ಳಲು ಸಾವಯವ ಹೊದಿಕೆ (ಮಲ್ಚಿಂಗ್) ಮಾಡಿ. ಹಠಾತ್ ಮಳೆಗೆ ಬೇರು ಕೊಳೆತ ತಡೆಗಟ್ಟಲು ಟ್ರೈಕೋಡರ್ಮಾ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ ಬಳಸಿ.',
      contentHi: 'मिट्टी की नमी बनाए रखने के लिए पुआल की मल्चिंग करें। अचानक बारिश के बाद जड़ सड़न से बचाव के लिए ट्राइकोडर्मा का छिड़काव करें।'
    },
    {
      title: 'Neem-Oil Organic Spray for Tomato & Chilly Leaf Curl',
      titleKn: 'ಟೊಮ್ಯಾಟೊ ಮತ್ತು ಮೆಣಸಿನಕಾಯಿ ಎಲೆ ಮುದುಡು ರೋಗಕ್ಕೆ ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಣೆ',
      titleHi: 'टमाटर और मिर्च में पत्ती मरोड़ रोग के लिए नीम का तेल',
      content: 'Mix 5ml pure cold-pressed neem oil (10,000 ppm) with 2g soap powder per litre of water. Spray during early morning (6:30 AM - 8:00 AM) to target whiteflies without scorching foliage.',
      contentKn: 'ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ 5 ಮಿ.ಲೀ ಬೇವಿನ ಎಣ್ಣೆ ಮತ್ತು ಸ್ವಲ್ಪ ಸೋಪಿನ ಪುಡಿ ಬೆರೆಸಿ ಮುಂಜಾನೆ 7 ಗಂಟೆಗೆ ಸಿಂಪಡಿಸಿ. ಇದು ಬಿಳಿನೊಣಗಳನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ.',
      contentHi: 'प्रति लीटर पानी में 5 मिली नीम का तेल और 2 ग्राम साबुन का घोल मिलाकर सुबह के समय छिड़कें। यह सफेद मक्खी को जड़ से रोकता है।'
    }
  ];

  return (
    <div className="space-y-4 pb-20 sm:pb-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-emerald-900 rounded-3xl p-4 sm:p-5 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/20 text-xs font-semibold mb-2">
              <Wheat className="w-3.5 h-3.5 text-amber-200" />
              <span>
                {language === 'kn' ? 'ಕಿಸಾನ್ ಮಿತ್ರ ಮತ್ತು ಎಪಿಎಂಸಿ' : language === 'hi' ? 'किसान मित्र और कृषि बाजार' : 'Kisan Mitra & Mandi'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">{t.agriMandi}</h1>
            <p className="text-xs sm:text-sm text-amber-100 max-w-lg mt-1">
              {language === 'kn'
                ? 'ಪ್ರತಿದಿನದ ಎಪಿಎಂಸಿ ಬೆಲೆಗಳು, ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ನೇರ ಬೆಳೆ ಮಾರಾಟ ಮತ್ತು ಕೃಷಿ ಸಲಹೆಗಳು.'
                : language === 'hi'
                ? 'दैनिक मंडी भाव, बिचौलियों के बिना सीधी फसल बिक्री और कृषि वैज्ञानिकों की सलाह।'
                : 'Daily live APMC market prices, direct farmer-to-buyer selling, and seasonal tips.'}
            </p>
          </div>

          <button
            onClick={() => setListModalOpen(true)}
            className="h-12 px-5 rounded-2xl bg-white text-emerald-950 font-bold text-sm flex items-center justify-center gap-2 hover:bg-amber-50 active:scale-95 transition-all shadow-md shrink-0"
          >
            <PlusCircle className="w-4 h-4 text-emerald-700" />
            <span>{t.listProduceBtn}</span>
          </button>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
        <button
          onClick={() => setActiveSubTab('mandi')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all text-center ${
            activeSubTab === 'mandi'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t.mandiRates}
        </button>

        <button
          onClick={() => setActiveSubTab('marketplace')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all text-center ${
            activeSubTab === 'marketplace'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t.farmerMarketplace} ({farmerProduce.length})
        </button>

        <button
          onClick={() => setActiveSubTab('tips')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all text-center ${
            activeSubTab === 'tips'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t.cropTips}
        </button>
      </div>

      {/* 1. Mandi Rates View */}
      {activeSubTab === 'mandi' && (
        <div className="space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t.searchCrop}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-emerald-600"
            />
          </div>

          {/* Mandi Items Grid / Cards */}
          <div className="space-y-2.5">
            {filteredMandi.map((item) => {
              const cropTitle =
                language === 'kn'
                  ? item.cropNameKn
                  : language === 'hi'
                  ? item.cropNameHi
                  : item.cropName;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-amber-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs text-slate-500 font-medium">
                        {item.marketName} · {item.variety}
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{cropTitle}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <AudioSpeakerButton
                        size="sm"
                        textToRead={`${cropTitle} in ${item.marketName}. Average rate ${item.modalPrice} rupees per ${item.unit}. Min ${item.minPrice}, Max ${item.maxPrice}.`}
                      />
                      <div
                        className={`px-2 py-0.5 rounded-md text-xs font-bold flex items-center gap-0.5 ${
                          item.priceChange >= 0
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {item.priceChange >= 0 ? (
                          <TrendingUp className="w-3.5 h-3.5" />
                        ) : (
                          <TrendingDown className="w-3.5 h-3.5" />
                        )}
                        <span>{item.priceChange > 0 ? `+${item.priceChange}%` : `${item.priceChange}%`}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="grid grid-cols-3 gap-2 mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Min Rate</span>
                      <span className="text-xs font-bold text-slate-700 tabular-nums">
                        ₹{item.minPrice}
                      </span>
                    </div>
                    <div className="border-x border-slate-200">
                      <span className="text-[10px] text-emerald-800 block font-bold">Today Modal</span>
                      <span className="text-sm font-black text-slate-900 tabular-nums">
                        ₹{item.modalPrice}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Max Rate</span>
                      <span className="text-xs font-bold text-slate-700 tabular-nums">
                        ₹{item.maxPrice}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Per {item.unit}</span>
                    <span>Updated {item.updatedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Direct Farmer-to-Buyer Marketplace */}
      {activeSubTab === 'marketplace' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {language === 'kn' ? 'ನೇರ ಬೆಳೆ ಮಾರಾಟ ಪಟ್ಟಿ' : language === 'hi' ? 'सीधी फसल बिक्री सूची' : 'Direct Produce Listings'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'kn' ? 'ರೈತರೊಂದಿಗೆ ನೇರ ಮಾತುಕತೆ ನಡೆಸಿ' : language === 'hi' ? 'किसानों से सीधे संपर्क करें' : 'Buy directly from local farmers'}
              </p>
            </div>
            <button
              onClick={() => setListModalOpen(true)}
              className="text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors"
            >
              + {t.listProduceBtn}
            </button>
          </div>

          <div className="space-y-3">
            {farmerProduce.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-emerald-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-emerald-800">{p.farmerName}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-500">{p.village}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span>{p.cropName}</span>
                      {p.isOrganic && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                          Organic
                        </span>
                      )}
                    </h3>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-black text-slate-900 tabular-nums">
                      ₹{p.pricePerUnit.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-slate-500">per {p.unit}</span>
                  </div>
                </div>

                <div className="mt-2.5 p-2 rounded-xl bg-slate-50 text-xs text-slate-700 flex items-center justify-between">
                  <span>
                    <strong>Available Quantity:</strong> {p.quantity} {p.unit}
                  </span>
                  <span className="text-slate-500 text-[11px]">{p.harvestDate}</span>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-400">Listed {p.listedDate}</span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedProduce(p);
                        setOfferModalOpen(true);
                      }}
                      className="h-9 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-800 transition-colors"
                    >
                      {t.buyerOffer}
                    </button>
                    <a
                      href={`tel:${p.phoneNumber.replace(/\s+/g, '')}`}
                      className="h-9 px-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{t.callSeller}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Crop Tips & Advisories */}
      {activeSubTab === 'tips' && (
        <div className="space-y-3">
          {farmingTips.map((tip, idx) => {
            const title =
              language === 'kn' ? tip.titleKn : language === 'hi' ? tip.titleHi : tip.title;
            const content =
              language === 'kn' ? tip.contentKn : language === 'hi' ? tip.contentHi : tip.content;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{title}</h3>
                  <AudioSpeakerButton size="sm" textToRead={`${title}. ${content}`} />
                </div>
                <p className="text-xs text-slate-700 leading-relaxed bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                  {content}
                </p>
              </div>
            );
          })}

          {/* Quick link to Agriculture Subsidies */}
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-between gap-2">
            <div>
              <h4 className="text-xs font-bold text-indigo-900">
                {language === 'kn' ? 'ಕೃಷಿ ಸಹಾಯಧನ ಮತ್ತು ಸೌರ ಪಂಪ್ ಯೋಜನೆಗಳು' : language === 'hi' ? 'कृषि सब्सिडी और सोलर पंप योजनाएं' : 'Agricultural Subsidies & PM-KUSUM'}
              </h4>
              <p className="text-[11px] text-indigo-700 mt-0.5">
                Check eligibility for 90% solar pump subsidy and PM-Kisan grant.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('schemes')}
              className="px-3 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs shrink-0"
            >
              View Schemes
            </button>
          </div>
        </div>
      )}

      {/* Modal: List Produce */}
      {listModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wheat className="w-5 h-5 text-emerald-300" />
                <h3 className="text-base font-bold">{t.listProduceBtn}</h3>
              </div>
              <button
                onClick={() => setListModalOpen(false)}
                className="w-8 h-8 rounded-full bg-emerald-700 hover:bg-emerald-600 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleListSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Farmer / Seller Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Basavaraj Maradagi"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Crop Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Red Ragi, Tomato, Cotton"
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Variety (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. GPU-28, Sahu Hybrid"
                    value={variety}
                    onChange={(e) => setVariety(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Quantity Available *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 25"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Unit</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-emerald-600"
                  >
                    <option value="Quintal">Quintal (100 kg)</option>
                    <option value="Bags (50kg)">Bags (50 kg)</option>
                    <option value="Crates">Crates (25 kg)</option>
                    <option value="Tonne">Tonne (1000 kg)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Expected Price (₹ per unit) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 4200"
                    value={pricePerUnit}
                    onChange={(e) => setPricePerUnit(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 94812 XXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Farm Village / Location *
                </label>
                <input
                  type="text"
                  required
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-emerald-600"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isOrganic}
                  onChange={(e) => setIsOrganic(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <span className="text-xs font-bold text-slate-700">
                  Grown with 100% Organic / Desi Cow manure (No synthetic pesticides)
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-colors mt-2"
              >
                Publish Harvest Listing
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Make Buyer Offer */}
      {offerModalOpen && selectedProduce && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-base font-bold">Make Buyer Offer</h3>
              <button
                onClick={() => setOfferModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">
              {offerSuccess ? (
                <div className="text-center py-6 space-y-2">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">Offer Sent to Farmer!</h4>
                  <p className="text-xs text-slate-600">
                    The farmer has received your offer on SMS. They will call you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleOfferSubmit} className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="font-bold text-slate-900">{selectedProduce.cropName}</div>
                    <div className="text-slate-500">
                      Farmer: {selectedProduce.farmerName} · Asking: ₹{selectedProduce.pricePerUnit}/{selectedProduce.unit}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Offer Price (₹ per {selectedProduce.unit}) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder={`e.g. ${selectedProduce.pricePerUnit - 100}`}
                      value={buyerOffer}
                      onChange={(e) => setBuyerOffer(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Trader"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Submit Purchase Offer
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
