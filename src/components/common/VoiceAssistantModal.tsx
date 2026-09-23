import React, { useState, useEffect } from 'react';
import { Mic, MicOff, X, Sparkles, Volume2, CornerDownRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { speechService } from '../../services/speechService';

export const VoiceAssistantModal: React.FC = () => {
  const {
    language,
    t,
    voiceAssistantOpen,
    setVoiceAssistantOpen,
    setActiveTab,
    readAloud
  } = useApp();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const [recognitionHandle, setRecognitionHandle] = useState<{ stop: () => void } | null>(null);

  useEffect(() => {
    if (!voiceAssistantOpen) {
      if (recognitionHandle) recognitionHandle.stop();
      setIsListening(false);
      setTranscript('');
      setBotResponse('');
    }
  }, [voiceAssistantOpen]);

  if (!voiceAssistantOpen) return null;

  const startVoice = () => {
    setTranscript('');
    setBotResponse('');
    setIsListening(true);

    const handle = speechService.startListening(
      language,
      (text) => {
        setTranscript(text);
        setIsListening(false);
        processCommand(text);
      },
      (err) => {
        setIsListening(false);
        setBotResponse(
          language === 'kn'
            ? 'ಧ್ವನಿ ಗ್ರಹಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಬಟನ್‌ಗಳಲ್ಲಿ ಆಯ್ಕೆಮಾಡಿ.'
            : language === 'hi'
            ? 'आवाज पहचानी नहीं जा सकी। कृपया नीचे दिए विकल्पों में से चुनें।'
            : 'Could not capture voice clearly. Try selecting a quick option below.'
        );
      },
      () => {
        setIsListening(false);
      }
    );

    setRecognitionHandle(handle);
  };

  const stopVoice = () => {
    if (recognitionHandle) {
      recognitionHandle.stop();
    }
    setIsListening(false);
  };

  const processCommand = (query: string) => {
    const q = query.toLowerCase();

    if (q.includes('hospital') || q.includes('doctor') || q.includes('phc') || q.includes('ಆಸ್ಪತ್ರೆ') || q.includes('ವೈದ್ಯ') || q.includes('अस्पताल') || q.includes('डॉक्टर')) {
      const reply = language === 'kn' ? 'ಆರೋಗ್ಯ ಕೇಂದ್ರಗಳು ಮತ್ತು ವೈದ್ಯರ ಪಟ್ಟಿ ತೆರೆಯಲಾಗುತ್ತಿದೆ.' : language === 'hi' ? 'स्वास्थ्य केंद्र और डॉक्टर सूची खोली जा रही है।' : 'Opening nearby Health Centres and Doctor consultation.';
      setBotResponse(reply);
      readAloud(reply);
      setTimeout(() => {
        setActiveTab('health');
        setVoiceAssistantOpen(false);
      }, 1800);
    } else if (q.includes('mandi') || q.includes('market') || q.includes('crop') || q.includes('rate') || q.includes('tomato') || q.includes('ragi') || q.includes('ಬೆಲೆ') || q.includes('ಮಾರುಕಟ್ಟೆ') || q.includes('ಕೃಷಿ') || q.includes('मंडी') || q.includes('भाव') || q.includes('फसल')) {
      const reply = language === 'kn' ? 'ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆ ದರಗಳು ಮತ್ತು ಕೃಷಿ ಪೋರ್ಟಲ್ ತೆರೆಯಲಾಗುತ್ತಿದೆ.' : language === 'hi' ? 'एपीएमसी मंडी भाव और कृषि बाजार खोला जा रहा है।' : 'Opening live Mandi crop prices and Agri marketplace.';
      setBotResponse(reply);
      readAloud(reply);
      setTimeout(() => {
        setActiveTab('agri');
        setVoiceAssistantOpen(false);
      }, 1800);
    } else if (q.includes('scheme') || q.includes('pm kisan') || q.includes('gruha') || q.includes('ಯೋಜನೆ') || q.includes('ಸಹಾಯಧನ') || q.includes('योजना') || q.includes('सब्सिडी')) {
      const reply = language === 'kn' ? 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ಸೌಲಭ್ಯಗಳ ಪಟ್ಟಿ ತೆರೆಯಲಾಗುತ್ತಿದೆ.' : language === 'hi' ? 'सरकारी योजनाएं और पात्रता सूची खोली जा रही है।' : 'Opening Government schemes and eligibility list.';
      setBotResponse(reply);
      readAloud(reply);
      setTimeout(() => {
        setActiveTab('schemes');
        setVoiceAssistantOpen(false);
      }, 1800);
    } else if (q.includes('job') || q.includes('wage') || q.includes('work') || q.includes('ಕೂಲಿ') || q.includes('ಕೆಲಸ') || q.includes('ಉದ್ಯೋಗ') || q.includes('रोजगार') || q.includes('मजदूरी') || q.includes('काम')) {
      const reply = language === 'kn' ? 'ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಮತ್ತು ದಿನಕೂಲಿ ಕೆಲಸಗಳು ತೆರೆಯಲಾಗುತ್ತಿದೆ.' : language === 'hi' ? 'गाँव के रोजगार व मजदूरी के अवसर खोले जा रहे हैं।' : 'Opening local jobs and daily wage openings.';
      setBotResponse(reply);
      readAloud(reply);
      setTimeout(() => {
        setActiveTab('jobs');
        setVoiceAssistantOpen(false);
      }, 1800);
    } else if (q.includes('service') || q.includes('electrician') || q.includes('plumber') || q.includes('mechanic') || q.includes('ಪ್ಲಂಬರ್') || q.includes('ಮೆಕ್ಯಾನಿಕ್') || q.includes('ಎಲೆಕ್ಟ್ರಿಷಿಯನ್') || q.includes('कारीगर') || q.includes('मिस्त्री')) {
      const reply = language === 'kn' ? 'ಗ್ರಾಮದ ಕುಶಲಕರ್ಮಿಗಳು ಮತ್ತು ತಂತ್ರಜ್ಞರ ಪಟ್ಟಿ ತೆರೆಯಲಾಗುತ್ತಿದೆ.' : language === 'hi' ? 'गाँव के कारीगरों और तकनीशियनों की सूची खोली जा रही है।' : 'Opening village skilled artisans and technicians directory.';
      setBotResponse(reply);
      readAloud(reply);
      setTimeout(() => {
        setActiveTab('services');
        setVoiceAssistantOpen(false);
      }, 1800);
    } else if (q.includes('transport') || q.includes('auto') || q.includes('taxi') || q.includes('ಆಟೋ') || q.includes('ಸಾರಿಗೆ') || q.includes('ऑटो') || q.includes('गाड़ी') || q.includes('वाहन')) {
      const reply = language === 'kn' ? 'ಸ್ಥಳೀಯ ವಾಹನಗಳು ಮತ್ತು ಆಟೋ ಸೇವೆ ತೆರೆಯಲಾಗುತ್ತಿದೆ.' : language === 'hi' ? 'गाँव के वाहन और परिवहन सेवाएं खोली जा रही हैं।' : 'Opening village transport and auto drivers directory.';
      setBotResponse(reply);
      readAloud(reply);
      setTimeout(() => {
        setActiveTab('transport');
        setVoiceAssistantOpen(false);
      }, 1800);
    } else if (q.includes('sos') || q.includes('emergency') || q.includes('police') || q.includes('ambulance') || q.includes('ತುರ್ತು') || q.includes('ಆಪತ್ತು') || q.includes('मदद') || q.includes('इमरजेंसी')) {
      const reply = language === 'kn' ? 'ತುರ್ತು ಸಹಾಯ ಮತ್ತು ಎಸ್‌ಒಎಸ್ ವಿಭಾಗ ತೆರೆಯಲಾಗುತ್ತಿದೆ.' : language === 'hi' ? 'आपातकालीन सहायता और एसओएस पृष्ठ खोला जा रहा है।' : 'Opening Emergency SOS and quick help.';
      setBotResponse(reply);
      readAloud(reply);
      setTimeout(() => {
        setActiveTab('emergency');
        setVoiceAssistantOpen(false);
      }, 1800);
    } else {
      const reply = language === 'kn'
        ? `ನೀವು ಕೇಳಿದ್ದು: "${query}". ಮುಖ್ಯ ಮುಖಪುಟದಲ್ಲಿ ಮಾಹಿತಿ ಪರಿಶೀಲಿಸಿ.`
        : language === 'hi'
        ? `आपने पूछा: "${query}"। मुख्य पृष्ठ पर जानकारी देखें।`
        : `You said: "${query}". Redirecting to Home dashboard.`;
      setBotResponse(reply);
      readAloud(reply);
      setTimeout(() => {
        setActiveTab('home');
        setVoiceAssistantOpen(false);
      }, 2000);
    }
  };

  const quickPrompts = [
    { label: language === 'kn' ? '🏥 ಆಸ್ಪತ್ರೆ & ವೈದ್ಯರು' : language === 'hi' ? '🏥 अस्पताल और डॉक्टर' : '🏥 Hospitals & Doctors', query: 'Hospital' },
    { label: language === 'kn' ? '🌾 ಮಾರುಕಟ್ಟೆ ದರಗಳು' : language === 'hi' ? '🌾 मंडी भाव' : '🌾 Mandi Rates', query: 'Mandi rates' },
    { label: language === 'kn' ? '📜 ಪಿಎಂ-ಕಿಸಾನ್ & ಯೋಜನೆಗಳು' : language === 'hi' ? '📜 पीएम किसान और योजनाएं' : '📜 PM-Kisan & Schemes', query: 'Govt Schemes' },
    { label: language === 'kn' ? '💼 ದಿನಕೂಲಿ ಕೆಲಸಗಳು' : language === 'hi' ? '💼 मजदूरी व काम' : '💼 Daily Wage Jobs', query: 'Jobs' },
    { label: language === 'kn' ? '⚡ ಎಲೆಕ್ಟ್ರಿಷಿಯನ್ / ಪ್ಲಂಬರ್' : language === 'hi' ? '⚡ इलेक्ट्रीशियन / मिस्त्री' : '⚡ Electrician / Plumber', query: 'Electrician' },
    { label: language === 'kn' ? '🚨 ತುರ್ತು ಸಹಾಯ (SOS)' : language === 'hi' ? '🚨 आपातकालीन SOS' : '🚨 Emergency SOS', query: 'Emergency SOS' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight">{t.voiceAssistant}</h3>
              <p className="text-xs text-emerald-200">{t.voiceHelp}</p>
            </div>
          </div>
          <button
            onClick={() => setVoiceAssistantOpen(false)}
            className="w-9 h-9 rounded-full bg-emerald-700/60 hover:bg-emerald-700 flex items-center justify-center text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Voice Trigger Center */}
        <div className="p-6 flex flex-col items-center justify-center text-center bg-gradient-to-b from-emerald-50/60 to-white">
          <div className="relative mb-4">
            {isListening && (
              <div className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping" />
            )}
            <button
              onClick={isListening ? stopVoice : startVoice}
              className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-lg transition-transform active:scale-95 ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-8 h-8 mb-1" />
                  <span className="text-[11px] font-semibold tracking-wide uppercase">Stop</span>
                </>
              ) : (
                <>
                  <Mic className="w-9 h-9 mb-1" />
                  <span className="text-[11px] font-semibold tracking-wide uppercase">Speak</span>
                </>
              )}
            </button>
          </div>

          <p className="text-sm font-semibold text-slate-800 mb-1">
            {isListening ? t.listening : t.speakPrompt}
          </p>

          {/* Transcript / Response box */}
          {(transcript || botResponse) && (
            <div className="w-full mt-3 p-3 rounded-2xl bg-white border border-slate-200 text-left shadow-sm">
              {transcript && (
                <div className="text-xs text-slate-500 mb-1 flex items-start gap-1">
                  <span className="font-semibold text-slate-700">You said:</span>
                  <span className="italic">"{transcript}"</span>
                </div>
              )}
              {botResponse && (
                <div className="text-sm font-medium text-emerald-800 flex items-start gap-1.5 mt-1">
                  <CornerDownRight className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  <span>{botResponse}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <div className="text-xs font-semibold text-slate-500 mb-2">
            {language === 'kn' ? 'ಅಥವಾ ತಕ್ಷಣದ ಆಯ್ಕೆ ಮಾಡಿ:' : language === 'hi' ? 'या तुरंत विकल्प चुनें:' : 'Or tap a quick action:'}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => processCommand(p.query)}
                className="p-2.5 text-xs font-medium text-left bg-white hover:bg-emerald-50 text-slate-800 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors shadow-2xs truncate"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
