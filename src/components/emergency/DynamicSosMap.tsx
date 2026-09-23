import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  Compass,
  Navigation,
  Layers,
  Maximize2,
  Minimize2,
  Radio,
  Play,
  Pause,
  Copy,
  Check,
  Share2,
  Users,
  Eye,
  AlertTriangle,
  Phone,
  ShieldCheck,
  Ambulance,
  Car
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DesignatedContact, EmergencyResponder } from '../../types';

interface DynamicSosMapProps {
  onOpenContactPreview?: (contact: DesignatedContact) => void;
  onOpenAddContact?: () => void;
}

export const DynamicSosMap: React.FC<DynamicSosMapProps> = ({
  onOpenContactPreview,
  onOpenAddContact
}) => {
  const {
    t,
    language,
    currentLocation,
    emergencyActive,
    designatedContacts,
    emergencyResponders,
    sosLocation,
    updateSosLocation,
    sosPathHistory,
    isSimulatingMovement,
    setIsSimulatingMovement,
    sosStartedAt,
    setNotificationBanner
  } = useApp();

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Layer groups / markers
  const userMarkerRef = useRef<L.Marker | null>(null);
  const accuracyCircleRef = useRef<L.Circle | null>(null);
  const pathPolylineRef = useRef<L.Polyline | null>(null);
  const contactMarkersRef = useRef<{ [key: string]: L.Marker }>({});
  const responderMarkersRef = useRef<{ [key: string]: L.Marker }>({});
  const connectionLinesRef = useRef<L.Polyline[]>([]);

  // Local state
  const [mapType, setMapType] = useState<'streets' | 'satellite'>('streets');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // Live timer for SOS duration
  useEffect(() => {
    if (!emergencyActive || !sosStartedAt) {
      setElapsedSeconds(0);
      return;
    }
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - sosStartedAt) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [emergencyActive, sosStartedAt]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Setup Leaflet map instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [sosLocation.latitude, sosLocation.longitude],
        zoom: 16,
        zoomControl: false,
        attributionControl: false
      });

      // Add Zoom control to bottom-right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Add tile layer
      const streetTiles = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 19,
          subdomains: ['a', 'b', 'c']
        }
      ).addTo(map);

      tileLayerRef.current = streetTiles;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle tile switch (streets vs satellite)
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    if (mapType === 'satellite') {
      tileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 19 }
      ).addTo(mapInstanceRef.current);
    } else {
      tileLayerRef.current = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 19, subdomains: ['a', 'b', 'c'] }
      ).addTo(mapInstanceRef.current);
    }
  }, [mapType]);

  // Update User Marker & Accuracy Circle
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    const userLatLng: L.LatLngExpression = [sosLocation.latitude, sosLocation.longitude];

    // Create custom pulsing SOS marker icon
    const userIconHtml = `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-12 h-12 rounded-full ${
          emergencyActive ? 'bg-rose-500/40 animate-ping' : 'bg-blue-500/20'
        }"></div>
        <div class="absolute w-8 h-8 rounded-full ${
          emergencyActive ? 'bg-rose-600/30 animate-pulse' : 'bg-blue-600/30'
        }"></div>
        <div class="relative w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-[10px] font-black text-white ${
          emergencyActive ? 'bg-rose-600 ring-2 ring-rose-400' : 'bg-emerald-600'
        }">
          <span class="sr-only">You</span>
          📍
        </div>
      </div>
    `;

    const userIcon = L.divIcon({
      html: userIconHtml,
      className: 'user-sos-pin',
      iconSize: [48, 48],
      iconAnchor: [24, 24]
    });

    if (!userMarkerRef.current) {
      userMarkerRef.current = L.marker(userLatLng, { icon: userIcon, zIndexOffset: 1000 }).addTo(map);
      userMarkerRef.current.bindPopup(`
        <div class="p-1 font-sans text-xs">
          <div class="font-bold text-rose-700 flex items-center gap-1">
            <span>🚨 YOU (SOS ACTIVE)</span>
          </div>
          <div class="text-slate-600 mt-0.5">Live GPS: ${sosLocation.latitude.toFixed(5)}, ${sosLocation.longitude.toFixed(5)}</div>
          <div class="text-[10px] text-slate-500">Accuracy: ±${sosLocation.accuracy}m</div>
        </div>
      `);
    } else {
      userMarkerRef.current.setLatLng(userLatLng);
      userMarkerRef.current.setIcon(userIcon);
    }

    // Accuracy circle
    if (!accuracyCircleRef.current) {
      accuracyCircleRef.current = L.circle(userLatLng, {
        radius: sosLocation.accuracy || 12,
        color: emergencyActive ? '#e11d48' : '#0284c7',
        fillColor: emergencyActive ? '#f43f5e' : '#38bdf8',
        fillOpacity: 0.15,
        weight: 1.5,
        dashArray: '4, 4'
      }).addTo(map);
    } else {
      accuracyCircleRef.current.setLatLng(userLatLng);
      accuracyCircleRef.current.setRadius(sosLocation.accuracy || 12);
      accuracyCircleRef.current.setStyle({
        color: emergencyActive ? '#e11d48' : '#0284c7',
        fillColor: emergencyActive ? '#f43f5e' : '#38bdf8'
      });
    }

    // Update Path Polyline (breadcrumbs)
    if (sosPathHistory.length > 1) {
      const latlngs: L.LatLngExpression[] = sosPathHistory.map((p) => [p.latitude, p.longitude]);
      if (!pathPolylineRef.current) {
        pathPolylineRef.current = L.polyline(latlngs, {
          color: '#e11d48',
          weight: 4,
          opacity: 0.7,
          dashArray: '6, 6'
        }).addTo(map);
      } else {
        pathPolylineRef.current.setLatLngs(latlngs);
      }
    }
  }, [sosLocation, emergencyActive, sosPathHistory]);

  // Update Designated Contacts & Responders on Map
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Clear old connection lines
    connectionLinesRef.current.forEach((line) => map.removeLayer(line));
    connectionLinesRef.current = [];

    const userLatLng: L.LatLngExpression = [sosLocation.latitude, sosLocation.longitude];

    // Render contacts
    designatedContacts.forEach((c) => {
      const latLng: L.LatLngExpression = [c.coordinates.latitude, c.coordinates.longitude];

      const statusColor =
        c.status === 'responding'
          ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
          : c.status === 'viewing_map'
          ? 'bg-amber-500 text-white ring-2 ring-amber-200'
          : 'bg-indigo-600 text-white';

      const contactIcon = L.divIcon({
        className: 'contact-pin',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        html: `
          <div class="relative group cursor-pointer">
            <div class="w-9 h-9 rounded-full ${statusColor} shadow-md flex items-center justify-center font-bold text-xs border border-white">
              ${c.name.charAt(0)}
            </div>
            <div class="absolute -bottom-1 -right-1 px-1 py-0.2 bg-slate-900 text-[9px] text-white font-mono rounded border border-white">
              ${c.distanceKm}km
            </div>
          </div>
        `
      });

      if (!contactMarkersRef.current[c.id]) {
        const marker = L.marker(latLng, { icon: contactIcon }).addTo(map);
        marker.bindPopup(`
          <div class="p-1 font-sans text-xs">
            <div class="font-bold text-slate-900">${c.name}</div>
            <div class="text-[11px] text-slate-500">${c.relationship}</div>
            <div class="text-[10px] font-semibold text-emerald-700 mt-1">Status: ${c.status.toUpperCase()}</div>
            <div class="text-[10px] text-slate-600">Distance: ${c.distanceKm} km away</div>
          </div>
        `);
        contactMarkersRef.current[c.id] = marker;
      } else {
        contactMarkersRef.current[c.id].setLatLng(latLng);
        contactMarkersRef.current[c.id].setIcon(contactIcon);
      }

      // Draw dashed connector line if viewing map or responding
      if (emergencyActive && (c.status === 'viewing_map' || c.status === 'responding')) {
        const line = L.polyline([userLatLng, latLng], {
          color: c.status === 'responding' ? '#059669' : '#d97706',
          weight: 2,
          opacity: 0.6,
          dashArray: '4, 4'
        }).addTo(map);
        connectionLinesRef.current.push(line);
      }
    });

    // Render Emergency Responders (Ambulance / Police)
    emergencyResponders.forEach((r) => {
      const latLng: L.LatLngExpression = [r.coordinates.latitude, r.coordinates.longitude];
      const isAmbulance = r.type === 'ambulance';

      const responderIcon = L.divIcon({
        className: 'responder-pin',
        iconSize: [38, 38],
        iconAnchor: [19, 19],
        html: `
          <div class="relative">
            <div class="w-9 h-9 rounded-full ${
              isAmbulance ? 'bg-rose-600' : 'bg-blue-700'
            } text-white shadow-lg flex items-center justify-center border-2 border-white animate-bounce">
              <span class="text-sm">${isAmbulance ? '🚑' : '🚓'}</span>
            </div>
            <div class="absolute -top-1 -right-2 bg-slate-900 text-white text-[8px] px-1 rounded font-bold">
              ${r.etaMins}m
            </div>
          </div>
        `
      });

      if (!responderMarkersRef.current[r.id]) {
        const marker = L.marker(latLng, { icon: responderIcon }).addTo(map);
        marker.bindPopup(`
          <div class="p-1 font-sans text-xs">
            <div class="font-bold text-slate-900">${r.name}</div>
            <div class="text-rose-600 font-bold text-[11px]">En Route · ETA ${r.etaMins} mins</div>
            <div class="text-[10px] text-slate-500">${r.role} · Distance: ${r.distanceKm} km</div>
          </div>
        `);
        responderMarkersRef.current[r.id] = marker;
      } else {
        responderMarkersRef.current[r.id].setLatLng(latLng);
        responderMarkersRef.current[r.id].setIcon(responderIcon);
      }

      // Draw line from responder to user if active
      if (emergencyActive) {
        const responderLine = L.polyline([latLng, userLatLng], {
          color: isAmbulance ? '#e11d48' : '#2563eb',
          weight: 3,
          opacity: 0.8,
          dashArray: '6, 6'
        }).addTo(map);
        connectionLinesRef.current.push(responderLine);
      }
    });
  }, [designatedContacts, emergencyResponders, sosLocation, emergencyActive]);

  // Movement Simulation interval
  useEffect(() => {
    if (!isSimulatingMovement) return;

    let step = 0;
    // Step simulation offsets in meters / degrees
    const deltas = [
      { dLat: 0.00015, dLon: 0.0001 },
      { dLat: 0.00012, dLon: 0.00018 },
      { dLat: 0.00018, dLon: 0.00012 },
      { dLat: -0.0001, dLon: 0.00015 },
      { dLat: -0.00015, dLon: -0.0001 }
    ];

    const interval = setInterval(() => {
      const delta = deltas[step % deltas.length];
      step++;

      updateSosLocation({
        latitude: sosLocation.latitude + delta.dLat,
        longitude: sosLocation.longitude + delta.dLon,
        accuracy: Math.floor(4 + Math.random() * 5),
        speedKmh: 4.8
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isSimulatingMovement, sosLocation, updateSosLocation]);

  // Center on user location
  const recenterMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([sosLocation.latitude, sosLocation.longitude], 17, {
        animate: true
      });
    }
  };

  const trackingLink = `https://ruralconnect.in/sos/live-track?id=SOS-RAMP-${Math.floor(
    sosLocation.latitude * 1000
  )}`;

  const copyLiveTrackingLink = () => {
    navigator.clipboard.writeText(
      `🚨 URGENT SOS ALERT: Track my real-time emergency location in Rampura: ${trackingLink}`
    );
    setCopiedLink(true);
    setNotificationBanner('Live tracking link copied to clipboard!');
    setTimeout(() => {
      setCopiedLink(false);
      setNotificationBanner(null);
    }, 3500);
  };

  const shareToAllContactsWhatsApp = () => {
    const text = `🚨 *EMERGENCY SOS ALERT* from ${currentLocation.village} (${currentLocation.taluk})!\nI need immediate assistance.\n\n📍 *Track My Live GPS in Real-Time:*\n${trackingLink}\n\nExact Coordinates: ${sosLocation.latitude.toFixed(
      5
    )}, ${sosLocation.longitude.toFixed(5)}\nBattery: 82% | Cellular: 4G`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      className={`relative bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden transition-all duration-300 ${
        isExpanded ? 'fixed inset-3 z-50 rounded-2xl flex flex-col' : 'w-full'
      }`}
    >
      {/* Map Header & Live Status Bar */}
      <div className="p-3 sm:p-4 bg-slate-900 text-white flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative">
            <span
              className={`w-3 h-3 rounded-full block ${
                emergencyActive ? 'bg-rose-500 animate-ping' : 'bg-emerald-400'
              }`}
            />
            <span
              className={`w-3 h-3 rounded-full absolute inset-0 ${
                emergencyActive ? 'bg-rose-500' : 'bg-emerald-500'
              }`}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs sm:text-sm font-black tracking-wide uppercase">
                {emergencyActive ? 'LIVE SOS TRACKING ACTIVE' : 'REAL-TIME GPS LOCATOR'}
              </h2>
              {emergencyActive && (
                <span className="px-2 py-0.5 rounded-full bg-rose-600/90 text-white font-mono text-[11px] font-bold animate-pulse">
                  {formatTimer(elapsedSeconds)}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-300 line-clamp-1">
              {emergencyActive
                ? `Transmitting live coordinates to ${designatedContacts.length} emergency contacts`
                : `${currentLocation.village} · Accuracy ±${sosLocation.accuracy}m`}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setMapType(mapType === 'streets' ? 'satellite' : 'streets')}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
              mapType === 'satellite' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
            title="Toggle Satellite Imagery"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{mapType === 'satellite' ? 'Street' : 'Sat'}</span>
          </button>

          <button
            onClick={recenterMap}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title="Recenter on My GPS"
          >
            <Navigation className="w-3.5 h-3.5 text-rose-400" />
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title={isExpanded ? 'Collapse Map' : 'Full Screen Map'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Map Container Viewport */}
      <div
        ref={mapContainerRef}
        className={`w-full relative z-0 ${isExpanded ? 'flex-1 min-h-[380px]' : 'h-72 sm:h-80'}`}
        style={{ minHeight: isExpanded ? '350px' : '280px' }}
      >
        {/* Floating In-Map Overlays */}
        {/* 1. GPS Precision badge */}
        <div className="absolute top-3 left-3 z-[400] bg-slate-900/85 backdrop-blur-md text-white px-2.5 py-1.5 rounded-xl border border-white/10 text-[11px] font-mono shadow-lg flex items-center gap-2">
          <Radio className="w-3 h-3 text-rose-400 animate-pulse" />
          <span>
            {sosLocation.latitude.toFixed(4)}, {sosLocation.longitude.toFixed(4)}
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-emerald-300">±{sosLocation.accuracy}m</span>
        </div>

        {/* 2. Simulation Toggle overlay */}
        <div className="absolute top-3 right-3 z-[400] flex items-center gap-1.5">
          <button
            onClick={() => setIsSimulatingMovement(!isSimulatingMovement)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-md transition-all ${
              isSimulatingMovement
                ? 'bg-amber-500 hover:bg-amber-600 text-white animate-pulse'
                : 'bg-slate-900/80 hover:bg-slate-900 text-slate-200 border border-white/10'
            }`}
            title="Simulate movement down the village path to test real-time location updates"
          >
            {isSimulatingMovement ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Simulating Walk (Active)</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Simulate Walk</span>
              </>
            )}
          </button>
        </div>

        {/* 3. Nearest Emergency Responders Ribbon */}
        {emergencyActive && (
          <div className="absolute bottom-3 left-3 right-3 z-[400] bg-rose-950/90 backdrop-blur-md border border-rose-500/40 text-white p-2.5 rounded-2xl shadow-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Ambulance className="w-5 h-5 text-rose-400 animate-pulse shrink-0" />
              <div>
                <div className="text-xs font-black tracking-wide text-rose-200">
                  108 Ambulance Unit #KA-24 · En Route (~4 mins)
                </div>
                <div className="text-[10px] text-rose-300">
                  Driver dispatched from Bailhongal · 1.4 km away
                </div>
              </div>
            </div>

            <a
              href="tel:108"
              className="px-3 py-1.5 rounded-xl bg-white text-rose-900 font-black text-xs shrink-0 hover:bg-rose-100 flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>Call 108</span>
            </a>
          </div>
        )}
      </div>

      {/* Real-time Sharing Bar */}
      <div className="p-3 bg-slate-50 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <Share2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="font-semibold">Live Web Tracker:</span>
            <span className="font-mono text-[11px] text-slate-500 truncate max-w-[200px] sm:max-w-xs">
              {trackingLink}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyLiveTrackingLink}
              className="flex-1 sm:flex-none py-2 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={shareToAllContactsWhatsApp}
              className="flex-1 sm:flex-none py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp Live Link</span>
            </button>
          </div>
        </div>
      </div>

      {/* Designated Emergency Contacts Live Tracking Status */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-700" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              {language === 'kn'
                ? 'ನಿಗದಿತ ತುರ್ತು ಸಂಪರ್ಕಗಳು'
                : language === 'hi'
                ? 'नामित आपातकालीन संपर्क'
                : 'Designated Emergency Contacts Receiving Live GPS'}
            </h3>
          </div>

          {onOpenAddContact && (
            <button
              onClick={onOpenAddContact}
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 underline"
            >
              + Add Contact
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {designatedContacts.map((contact) => {
            const isResponding = contact.status === 'responding';
            const isViewing = contact.status === 'viewing_map';

            return (
              <div
                key={contact.id}
                className={`p-3 rounded-2xl border transition-all ${
                  isResponding
                    ? 'border-emerald-300 bg-emerald-50/60 ring-2 ring-emerald-100'
                    : isViewing
                    ? 'border-amber-300 bg-amber-50/50'
                    : 'border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-full ${
                        contact.avatarColor || 'bg-indigo-600'
                      } text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{contact.name}</span>
                        {contact.isPrimary && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 font-bold">
                            Primary
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {language === 'kn'
                          ? contact.relationshipKn || contact.relationship
                          : language === 'hi'
                          ? contact.relationshipHi || contact.relationship
                          : contact.relationship}{' '}
                        · {contact.distanceKm} km away
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 ${
                      isResponding
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 animate-pulse'
                        : isViewing
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isResponding ? 'bg-emerald-600' : isViewing ? 'bg-amber-600' : 'bg-slate-400'
                      }`}
                    />
                    <span>
                      {isResponding
                        ? 'Responding'
                        : isViewing
                        ? 'Viewing Map'
                        : emergencyActive
                        ? 'Link Delivered'
                        : 'Standby'}
                    </span>
                  </span>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-200/70 flex items-center justify-between gap-2">
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-emerald-600" />
                    <span>{contact.phone}</span>
                  </a>

                  {onOpenContactPreview && (
                    <button
                      onClick={() => onOpenContactPreview(contact)}
                      className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 shadow-2xs hover:bg-indigo-50"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Preview View</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
