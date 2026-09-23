import React, { useState } from 'react';
import {
  FileText,
  Search,
  CheckCircle2,
  HelpCircle,
  PhoneCall,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles,
  X,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GovtScheme } from '../../types';
import { AudioSpeakerButton } from '../common/AudioSpeakerButton';

export const SchemesScreen: React.FC = () => {
  const { t, language, govtSchemes, currentLocation } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>(govtSchemes[0]?.id || null);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [selectedSchemeForHelp, setSelectedSchemeForHelp] = useState<GovtScheme | null>(null);
  const [helpCitizenName, setHelpCitizenName] = useState('');
  const [helpPhone, setHelpPhone] = useState('');
  const [helpSuccess, setHelpSuccess] = useState(false);

  const categories = [
    { id: 'all', labelEn: 'All Schemes', labelKn: 'ಎಲ್ಲಾ ಯೋಜನೆಗಳು', labelHi: 'सभी योजनाएं' },
    { id: 'farmer', labelEn: 'Farmers & Agri', labelKn: 'ರೈತರು & ಕೃಷಿ', labelHi: 'किसान व कृषि' },
    { id: 'women', labelEn: 'Women & Child', labelKn: 'ಮಹಿಳೆಯರು & ಮಕ್ಕಳು', labelHi: 'महिला एवं बाल' },
    { id: 'housing', labelEn: 'Housing & Land', labelKn: 'ವಸತಿ & ನಿವೇಶನ', labelHi: 'आवास व जमीन' },
    { id: 'health', labelEn: 'Health & Arogya', labelKn: 'ಆರೋಗ್ಯ & ಚಿಕಿತ್ಸೆ', labelHi: 'स्वास्थ्य एवं उपचार' }
  ];

  const filteredSchemes = govtSchemes.filter((sch) => {
    const matchesCat = selectedCategory === 'all' || sch.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      sch.title.toLowerCase().includes(q) ||
      sch.titleKn.toLowerCase().includes(q) ||
      sch.titleHi.toLowerCase().includes(q) ||
      sch.department.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const handleHelpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHelpSuccess(true);
    setTimeout(() => {
      setHelpSuccess(false);
      setHelpModalOpen(false);
      setHelpCitizenName('');
      setHelpPhone('');
    }, 2200);
  };

  return (
    <div className="space-y-4 pb-20 sm:pb-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-3xl p-4 sm:p-5 text-white shadow-md">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 text-xs font-semibold mb-2">
          <Award className="w-3.5 h-3.5 text-indigo-300" />
          <span>
            {language === 'kn' ? 'ಸರ್ಕಾರಿ ಸೇವಾ ವಾಹಿನಿ' : language === 'hi' ? 'सरकारी योजना मंच' : 'Sarkari Seva Portal'}
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight">{t.govtSchemes}</h1>
        <p className="text-xs sm:text-sm text-indigo-100 max-w-lg mt-1">
          {language === 'kn'
            ? 'ಕೇಂದ್ರ ಮತ್ತು ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಎಲ್ಲಾ ಸೌಲಭ್ಯಗಳು, ಅರ್ಹತೆ, ದಾಖಲೆಗಳು ಹಾಗೂ ಗ್ರಾಮ ಪಂಚಾಯತಿ ಸಹಾಯ.'
            : language === 'hi'
            ? 'केंद्र एवं राज्य सरकार की प्रमुख योजनाएं, पात्रता नियम, दस्तावेज और पंचायत सहायता।'
            : 'Explore eligibility, needed documents, and step-by-step guidance for rural benefits.'}
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder={t.searchScheme}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-indigo-600"
        />
      </div>

      {/* Category Pills (Interactive Filter Controls) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const label =
            language === 'kn' ? cat.labelKn : language === 'hi' ? cat.labelHi : cat.labelEn;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors border ${
                isSelected
                  ? 'bg-indigo-900 text-white border-indigo-900 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Schemes List with Accordion Details */}
      <div className="space-y-3">
        {filteredSchemes.map((scheme) => {
          const isExpanded = expandedSchemeId === scheme.id;
          const title =
            language === 'kn' ? scheme.titleKn : language === 'hi' ? scheme.titleHi : scheme.title;
          const summary =
            language === 'kn'
              ? scheme.summaryKn
              : language === 'hi'
              ? scheme.summaryHi
              : scheme.summary;
          const eligibility =
            language === 'kn'
              ? scheme.eligibilityKn
              : language === 'hi'
              ? scheme.eligibilityHi
              : scheme.eligibility;
          const documents =
            language === 'kn'
              ? scheme.documentsKn
              : language === 'hi'
              ? scheme.documentsHi
              : scheme.documents;

          return (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-indigo-300 transition-colors"
            >
              {/* Header Card Summary */}
              <div
                onClick={() => setExpandedSchemeId(isExpanded ? null : scheme.id)}
                className="p-4 cursor-pointer flex items-start justify-between gap-3 select-none"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
                      {scheme.category.toUpperCase()}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-500">{scheme.department}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">{title}</h3>

                  <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg inline-block border border-emerald-200">
                    💰 {scheme.benefitAmount}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <AudioSpeakerButton
                    size="sm"
                    textToRead={`${title}. Benefit: ${scheme.benefitAmount}. ${summary}. Helpline: ${scheme.helpline}`}
                  />
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Details Body */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-3.5 bg-slate-50/50">
                  <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>

                  {/* Eligibility Checklist */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{t.eligibility}</span>
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-700 pl-1">
                      {eligibility.map((el, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-700 font-bold">•</span>
                          <span>{el}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Documents Needed */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <span>{t.documentsNeeded}</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {documents.map((doc, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 font-medium shadow-2xs"
                        >
                          📄 {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Application Process */}
                  <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-slate-800">
                    <strong className="text-indigo-950 block mb-0.5">{t.howToApply}:</strong>
                    <span>{scheme.howToApply}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center justify-between gap-2">
                    <a
                      href={`tel:${scheme.helpline.split('/')[0].trim()}`}
                      className="text-xs font-bold text-slate-700 flex items-center gap-1 hover:text-slate-900"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-indigo-700" />
                      <span>{scheme.helpline}</span>
                    </a>

                    <button
                      onClick={() => {
                        setSelectedSchemeForHelp(scheme);
                        setHelpModalOpen(true);
                      }}
                      className="h-9 px-4 rounded-xl bg-indigo-800 hover:bg-indigo-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                    >
                      <span>{t.applyAssistance}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Help Modal */}
      {helpModalOpen && selectedSchemeForHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-4 bg-indigo-900 text-white flex items-center justify-between">
              <h3 className="text-base font-bold">Request Gram Sevak Help</h3>
              <button
                onClick={() => setHelpModalOpen(false)}
                className="w-8 h-8 rounded-full bg-indigo-800 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">
              {helpSuccess ? (
                <div className="text-center py-6 space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">Assistance Request Sent!</h4>
                  <p className="text-xs text-slate-600">
                    The {currentLocation.panchayat} Gram Sevak has been notified. They will assist you with paperwork at the Grama Chavadi.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleHelpSubmit} className="space-y-3.5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="font-bold text-slate-900">{selectedSchemeForHelp.title}</div>
                    <div className="text-slate-500">Panchayat: {currentLocation.panchayat}</div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Applicant Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ningappa Patil"
                      value={helpCitizenName}
                      onChange={(e) => setHelpCitizenName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 94812 XXXXX"
                      value={helpPhone}
                      onChange={(e) => setHelpPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-indigo-600"
                    />
                  </div>

                  <p className="text-[11px] text-slate-500">
                    A representative from the village secretariat will verify your BPL / RTC records and help submit your application online.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
                  >
                    Submit Assistance Request
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
