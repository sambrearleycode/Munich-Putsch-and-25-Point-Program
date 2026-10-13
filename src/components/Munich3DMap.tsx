import React, { useState } from 'react';
import { PUTSCH_BEATS } from '../data/historicalData';
import {
  MapPin,
  Eye,
  Play,
  Pause,
  RotateCcw,
  Navigation,
  Info,
} from 'lucide-react';

interface Munich3DMapProps {
  activeBeatId: number;
  onSelectBeat: (beatId: number) => void;
  highlightedActor: string | null;
}

export interface MapBeatCoord {
  beatId: number;
  name: string;
  locationLabel: string;
  x: number;
  y: number;
  description: string;
}

export const MAP_BEATS_DATA: MapBeatCoord[] = [
  {
    beatId: 1,
    name: "Bürgerbräukeller Gathering",
    locationLabel: "Rosenheimer-Straße (East of Isar)",
    x: 865,
    y: 825,
    description: "Packed beer hall rally where Gustav von Kahr addressed 3,000 Bavarian officials and right-wing sympathizers.",
  },
  {
    beatId: 2,
    name: "Hitler's Pistol Shot",
    locationLabel: "Bürgerbräukeller Main Hall",
    x: 845,
    y: 805,
    description: "Hitler bursts in with 600 SA, fires a Browning into the ceiling, and declares the National Revolution has broken out.",
  },
  {
    beatId: 3,
    name: "Side-Room Ultimatum",
    locationLabel: "Bürgerbräukeller Side Antechamber",
    x: 885,
    y: 845,
    description: "At gunpoint, Hitler coerces Kahr, Lossow, and Seisser; Ludendorff arrives to seal their coerced handshake.",
  },
  {
    beatId: 4,
    name: "War Ministry Barricade",
    locationLabel: "Kriegsministerium (North of Odeonsplatz)",
    x: 215,
    y: 28,
    description: "Ernst Röhm's Reichskriegsflagge barricades the War Ministry; fails to capture the main army barracks or telegraph office.",
  },
  {
    beatId: 5,
    name: "Ludendorff's Blunder",
    locationLabel: "Bürgerbräukeller Gates",
    x: 825,
    y: 815,
    description: "Ludendorff allows Kahr, Lossow, and Seisser to leave on their 'word of an officer', which they immediately break.",
  },
  {
    beatId: 6,
    name: "Triumvirate Repudiation",
    locationLabel: "City Command / Government Offices",
    x: 295,
    y: 185,
    description: "Kahr, Lossow, and Seisser repudiate the Putsch at night, ban the NSDAP, and summon Reichswehr reinforcements.",
  },
  {
    beatId: 7,
    name: "Isar River Crossing",
    locationLabel: "Ludwigsbrücke / Zweibrückenstraße",
    x: 620,
    y: 740,
    description: "Hitler and Ludendorff lead 2,500-3,000 SA across the Ludwigsbrücke into Munich Altstadt.",
  },
  {
    beatId: 8,
    name: "Clash at Feldherrnhalle",
    locationLabel: "Feldherrnhalle / Residenzstraße",
    x: 236,
    y: 65,
    description: "State police line opens fire: 14 Nazis and 4 policemen killed. Hitler's arm is dislocated; Ludendorff arrested.",
  },
  {
    beatId: 9,
    name: "Flight & Scatter",
    locationLabel: "Residenzstraße / Max-Joseph-Platz",
    x: 245,
    y: 195,
    description: "Putsch column disintegrates into panic. Hitler is bundled into a yellow car; wounded Göring flees abroad.",
  },
  {
    beatId: 10,
    name: "Arrest at Uffing Villa",
    locationLabel: "Uffing am Staffelsee (60km SW Inset)",
    x: 140,
    y: 720,
    description: "11 Nov 1923: Munich police arrest Hitler hiding in an attic wardrobe at Ernst Hanfstaengl's villa.",
  },
];

export const Munich3DMap: React.FC<Munich3DMapProps> = ({
  activeBeatId,
  onSelectBeat,
  highlightedActor,
}) => {
  const [showMarchRoute, setShowMarchRoute] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [isPlayingTour, setIsPlayingTour] = useState<boolean>(false);

  const activeMapBeat = MAP_BEATS_DATA.find((b) => b.beatId === activeBeatId) || MAP_BEATS_DATA[0];
  const activePutschBeat = PUTSCH_BEATS.find((b) => b.id === activeBeatId) || PUTSCH_BEATS[0];

  // Auto-play tour across beats
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingTour) {
      interval = setInterval(() => {
        onSelectBeat(activeBeatId >= 10 ? 1 : activeBeatId + 1);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlayingTour, activeBeatId, onSelectBeat]);

  return (
    <div className="bg-[#FAF7F2] border-2 border-[#1B1E23] p-4 md:p-6 shadow-sm space-y-4">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2C302E]/15 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#8B1E1E]" />
            <h3 className="text-base font-bold text-[#1B1E23] tracking-tight">
              Munich 1923: Historical Map of the Putsch March
            </h3>
          </div>
          <p className="text-xs text-[#6C757D] mt-0.5">
            Cartographic reconstruction based on historical Bavarian State Library records (BSB). Click any numbered dot to jump to that beat.
          </p>
        </div>

        {/* View toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {/* March Route Toggle */}
          <button
            onClick={() => setShowMarchRoute(!showMarchRoute)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider border transition-colors ${
              showMarchRoute
                ? 'bg-[#E86812] text-white border-[#E86812]'
                : 'bg-white text-[#495057] border-[#2C302E]/20 hover:text-[#1B1E23]'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>March Line</span>
          </button>

          {/* Street Labels Toggle */}
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider border transition-colors ${
              showLabels
                ? 'bg-[#1B1E23] text-white border-[#1B1E23]'
                : 'bg-white text-[#495057] border-[#2C302E]/20 hover:text-[#1B1E23]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Labels</span>
          </button>

          {/* Tour Play/Pause */}
          <button
            onClick={() => setIsPlayingTour(!isPlayingTour)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider border transition-colors ${
              isPlayingTour
                ? 'bg-[#D4A373] text-[#1B1E23] border-[#1B1E23]'
                : 'bg-white text-[#1B1E23] border-[#2C302E]/20 hover:bg-[#FAF7F2]'
            }`}
          >
            {isPlayingTour ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlayingTour ? 'Pause Tour' : 'Play Tour'}</span>
          </button>
        </div>
      </div>

      {/* 2D Flat Cartographic Vector Map */}
      <div className="relative w-full overflow-hidden bg-[#eed0ab] border border-[#2C302E]/30 shadow-inner">
        <svg
          viewBox="0 0 1000 900"
          className="w-full h-auto select-none overflow-visible"
          style={{ minHeight: '460px' }}
        >
          <defs>
            {/* Background block fill */}
            <linearGradient id="groundTan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eed0ab" />
              <stop offset="100%" stopColor="#e8c89d" />
            </linearGradient>

            {/* River water color */}
            <linearGradient id="isarRiver2D" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78bcb3" />
              <stop offset="100%" stopColor="#68b0a7" />
            </linearGradient>

            {/* Red clash marker filter */}
            <filter id="clashGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#8B1E1E" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Base Background: Warm Sand/Tan Urban Blocks */}
          <rect width="1000" height="900" fill="url(#groundTan)" />

          {/* ============================================================== */}
          {/* URBAN STREETS & PLAZAS (LIGHT CREAM WEBS)                      */}
          {/* ============================================================== */}
          <g id="streetGrid" stroke="#fff5e6" strokeLinecap="round" strokeLinejoin="round">
            {/* Major avenues and connecting street corridors */}
            <line x1="0" y1="90" x2="1000" y2="90" strokeWidth="18" />
            <line x1="0" y1="180" x2="680" y2="180" strokeWidth="16" />
            <line x1="140" y1="0" x2="140" y2="600" strokeWidth="16" />
            <line x1="230" y1="0" x2="230" y2="400" strokeWidth="20" />
            <line x1="320" y1="0" x2="320" y2="600" strokeWidth="15" />
            <line x1="400" y1="100" x2="400" y2="520" strokeWidth="16" />
            <line x1="480" y1="0" x2="480" y2="450" strokeWidth="15" />
            <line x1="560" y1="0" x2="560" y2="400" strokeWidth="15" />
            <line x1="650" y1="0" x2="650" y2="350" strokeWidth="16" />

            {/* Secondary cross-streets and angled diagonals */}
            <line x1="30" y1="30" x2="450" y2="300" strokeWidth="12" />
            <line x1="50" y1="180" x2="250" y2="450" strokeWidth="12" />
            <line x1="400" y1="30" x2="650" y2="220" strokeWidth="14" />
            <line x1="520" y1="80" x2="720" y2="300" strokeWidth="13" />
            <line x1="350" y1="300" x2="550" y2="500" strokeWidth="14" />
            <line x1="200" y1="420" x2="400" y2="650" strokeWidth="14" />
            <line x1="100" y1="520" x2="320" y2="750" strokeWidth="12" />

            {/* Haidhausen (East of Isar) street network */}
            <line x1="700" y1="450" x2="1000" y2="450" strokeWidth="16" />
            <line x1="720" y1="600" x2="1000" y2="600" strokeWidth="16" />
            <line x1="750" y1="720" x2="1000" y2="720" strokeWidth="15" />
            <line x1="800" y1="350" x2="800" y2="900" strokeWidth="16" />
            <line x1="900" y1="300" x2="900" y2="900" strokeWidth="16" />
            <line x1="970" y1="400" x2="970" y2="900" strokeWidth="14" />
            <line x1="680" y1="650" x2="950" y2="850" strokeWidth="13" />

            {/* Maximilianstraße (East-West axis leading to Maximilianeum) */}
            <line x1="270" y1="180" x2="880" y2="350" strokeWidth="22" />

            {/* The Putsch March Street Corridor: */}
            {/* Rosenheimer-Straße (East bank) */}
            <line x1="900" y1="880" x2="650" y2="745" strokeWidth="22" />

            {/* Zweibrückenstraße */}
            <line x1="650" y1="745" x2="400" y2="510" strokeWidth="22" />

            {/* Tal */}
            <line x1="400" y1="510" x2="160" y2="340" strokeWidth="22" />

            {/* Weinstraße & Residenzstraße to Feldherrnhalle */}
            <line x1="160" y1="340" x2="160" y2="230" strokeWidth="20" />
            <line x1="160" y1="230" x2="235" y2="65" strokeWidth="22" />

            {/* Plazas & open squares */}
            <ellipse cx="400" cy="510" rx="20" ry="16" fill="#fff5e6" stroke="none" /> {/* Isartor-Platz */}
            <rect x="140" y="325" width="40" height="30" fill="#fff5e6" stroke="none" /> {/* Marienplatz */}
            <rect x="250" y="165" width="40" height="40" fill="#fff5e6" stroke="none" /> {/* Max-Joseph-Platz */}
            <ellipse cx="890" cy="420" rx="45" ry="45" fill="#fff5e6" stroke="none" /> {/* Maximilianeum roundabout */}
          </g>

          {/* ============================================================== */}
          {/* GREEN PARKS & GARDENS (FOREST GREEN #427835)                   */}
          {/* ============================================================== */}
          <g id="greenParks" fill="#427835">
            {/* Hofgarten (North of Residenz) */}
            <polygon points="200,0 380,0 380,50 200,50" />

            {/* West bank Isar parks */}
            <path d="M 565,680 C 600,640 630,580 660,500 L 610,480 C 585,550 560,620 520,680 Z" />
            <path d="M 680,450 C 710,380 740,280 770,180 L 730,170 C 700,260 670,360 645,430 Z" />

            {/* East bank Isar parks (Maximiliananlagen) */}
            <path d="M 690,750 C 730,680 770,550 820,380 L 860,400 C 810,570 770,700 730,780 Z" />
            <path d="M 830,350 C 860,250 890,140 920,40 L 880,30 C 850,130 820,240 790,340 Z" />

            {/* Green median on Maximilianstraße */}
            <ellipse cx="610" cy="335" rx="35" ry="10" />
            <ellipse cx="710" cy="365" rx="35" ry="10" />

            {/* Maximilianeum Roundabout garden */}
            <circle cx="890" cy="420" r="45" />

            {/* Small urban park squares */}
            <circle cx="165" cy="740" r="14" />
            <circle cx="960" cy="940" r="28" />
          </g>

          {/* ============================================================== */}
          {/* ISAR RIVER & CANALS (CYAN-TEAL #78bcb3)                        */}
          {/* ============================================================== */}
          <g id="isarRiver">
            {/* Main river flowing south to north */}
            <path
              d="M 280,900 C 370,820 460,760 550,680 C 630,600 700,480 770,320 C 830,180 870,80 910,0 
                 L 960,0 C 920,90 880,190 820,330 C 750,490 680,610 600,690 C 510,770 420,830 330,900 Z"
              fill="url(#isarRiver2D)"
              stroke="#5ba49b"
              strokeWidth="1.5"
            />

            {/* Prater & Museum Islands channel */}
            <path
              d="M 590,650 C 625,580 660,500 690,400 C 698,420 685,480 650,560 C 620,620 580,680 550,710 Z"
              fill="#eed0ab"
              stroke="#5ba49b"
              strokeWidth="1"
            />
          </g>

          {/* Bridges crossing the Isar */}
          <g id="bridges" stroke="#1B1E23" strokeWidth="4" strokeLinecap="square">
            {/* Ludwigsbrücke (Beat 7 Crossing Point) */}
            <line x1="620" y1="730" x2="670" y2="755" strokeWidth="8" stroke="#fff5e6" />
            <line x1="620" y1="730" x2="670" y2="755" strokeWidth="5" stroke="#1B1E23" />

            {/* Maximiliansbrücke */}
            <line x1="770" y1="320" x2="825" y2="335" strokeWidth="6" stroke="#fff5e6" />
            <line x1="770" y1="320" x2="825" y2="335" strokeWidth="4" stroke="#1B1E23" />
          </g>

          {/* ============================================================== */}
          {/* LANDMARK BUILDINGS IN BRICK-RED (#8C1D22)                     */}
          {/* Exactly matching reference map                                 */}
          {/* ============================================================== */}
          <g id="redLandmarks" fill="#8c1d22" stroke="#5a1215" strokeWidth="0.8">
            {/* 1. Bürgerbräu-Keller complex (Bottom-Right) */}
            <g id="buergerbraeuComplex">
              <polygon points="815,790 895,820 855,900 835,885 860,835 815,815" />
              <rect x="830" y="860" width="35" height="15" transform="rotate(22 830 860)" />
              <rect x="805" y="795" width="20" height="35" transform="rotate(22 805 795)" />
            </g>

            {/* 2. Residenz München complex (Top-Left) with interior courtyards */}
            <g id="residenzComplex">
              <polygon points="245,35 375,65 340,225 270,210 275,170 235,160 250,90 235,90" />
              {/* White cutouts for inner courtyards (Königsbauhof, Kaiserhof) */}
              <polygon points="260,60 295,68 285,115 250,105" fill="#eed0ab" stroke="none" />
              <polygon points="310,70 355,80 345,125 300,115" fill="#eed0ab" stroke="none" />
              <polygon points="280,130 330,140 320,185 270,175" fill="#eed0ab" stroke="none" />
            </g>

            {/* 3. Marienplatz Neues Rathaus */}
            <g id="marienplatzRathaus">
              <polygon points="135,295 195,310 185,355 125,340" />
              {/* Courtyard cutout */}
              <rect x="145" y="315" width="25" height="18" fill="#eed0ab" stroke="none" transform="rotate(14 145 315)" />
            </g>

            {/* 4. Isartor (Historic city gate on Isartor-Platz) */}
            <g id="isartorGate">
              <polygon points="385,500 410,505 405,530 380,525" />
            </g>

            {/* 5. Fortified Quadrangle building South of Zweibrückenstraße */}
            <g id="zweibrueckenComplex">
              <polygon points="410,740 480,675 530,730 460,795" />
              {/* Courtyard */}
              <polygon points="435,740 475,700 505,735 465,775" fill="#eed0ab" stroke="none" />
            </g>

            {/* 6. Building on Maximilianstraße */}
            <g>
              <rect x="520" y="270" width="80" height="20" transform="rotate(13 520 270)" />
            </g>
          </g>

          {/* ============================================================== */}
          {/* MONUMENT / CHURCH BUILDINGS IN PURPLE (#732C86)                */}
          {/* Matching reference map                                         */}
          {/* ============================================================== */}
          <g id="purpleLandmarks" fill="#732c86" stroke="#471b53" strokeWidth="0.8">
            {/* Frauenkirche (Twin onion-domed cathedral west of Weinstraße) */}
            <g id="frauenkirche">
              <rect x="45" y="260" width="55" height="25" transform="rotate(-15 45 260)" />
              <rect x="40" y="255" width="12" height="12" transform="rotate(-15 40 255)" />
              <rect x="40" y="272" width="12" height="12" transform="rotate(-15 40 272)" />
            </g>

            {/* St. Peter & Heilig-Geist churches near Marienplatz / Viktualienmarkt */}
            <g id="stPeterHeiligGeist">
              <rect x="145" y="400" width="30" height="14" transform="rotate(35 145 400)" />
              <rect x="205" y="415" width="32" height="15" transform="rotate(35 205 415)" />
            </g>

            {/* Church/monument in Lehel / near river */}
            <rect x="600" y="475" width="25" height="25" transform="rotate(45 600 475)" />

            {/* Church north of Maximilianstraße */}
            <polygon points="600,140 625,145 640,150 620,165 595,155" />

            {/* Maximilianeum on east hill */}
            <polygon points="870,400 905,400 910,440 865,440" />
          </g>

          {/* ============================================================== */}
          {/* THE HISTORIC PUTSCH MARCH TRAJECTORY (ORANGE ROUTE LINE)       */}
          {/* Exactly matching reference map:                                */}
          {/* Bürgerbräu-Keller -> Rosenheimer-Str. -> Zweibrückenstr. ->    */}
          {/* Isartor-Platz -> Tal -> Marienplatz -> Weinstraße ->          */}
          {/* Residenzstraße -> Feldherrnhalle (Red 'X')                    */}
          {/* ============================================================== */}
          {showMarchRoute && (
            <g id="marchRouteLine">
              <path
                d="M 855,830 
                   L 700,745 
                   L 650,742 
                   L 540,710 
                   L 460,600 
                   L 398,510 
                   L 320,440 
                   L 200,365 
                   L 165,340 
                   L 160,240 
                   L 236,70"
                fill="none"
                stroke="#e86812"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Red 'X' at Feldherrnhalle (Where gunfire stopped the column) */}
              <g id="firefightX" transform="translate(236, 65)">
                <line x1="-10" y1="-10" x2="10" y2="10" stroke="#8B1E1E" strokeWidth="4" strokeLinecap="round" />
                <line x1="-10" y1="10" x2="10" y2="-10" stroke="#8B1E1E" strokeWidth="4" strokeLinecap="round" />
              </g>
            </g>
          )}

          {/* ============================================================== */}
          {/* AUTHENTIC MAP LABELS (MATCHING THE REFERENCE)                  */}
          {/* ============================================================== */}
          {showLabels && (
            <g id="mapLabels" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="#1B1E23">
              {/* Feldherrnhalle */}
              <text x="195" y="42" textAnchor="middle" fontSize="13">
                Feldherrn-
              </text>
              <text x="200" y="58" textAnchor="middle" fontSize="13">
                halle
              </text>

              {/* Residenzstraße */}
              <text
                x="220"
                y="140"
                fontSize="11"
                transform="rotate(-90 220 140)"
                textAnchor="middle"
              >
                Residenzstraße
              </text>

              {/* Max-Joseph-Platz */}
              <text x="250" y="165" fontSize="10">
                Max-
              </text>
              <text x="250" y="177" fontSize="10">
                Joseph-
              </text>
              <text x="250" y="189" fontSize="10">
                Platz
              </text>

              {/* Weinstraße */}
              <text
                x="142"
                y="275"
                fontSize="11"
                transform="rotate(-70 142 275)"
                textAnchor="middle"
              >
                Weinstraße
              </text>

              {/* Marienplatz */}
              <text x="145" y="370" fontSize="12">
                Marien-
              </text>
              <text x="145" y="384" fontSize="12">
                platz
              </text>

              {/* Viktualienmarkt */}
              <text x="160" y="495" fontSize="11" fill="#1B1E23">
                Viktualien-
              </text>
              <text x="160" y="510" fontSize="11" fill="#1B1E23">
                markt
              </text>

              {/* Tal */}
              <text x="315" y="460" fontSize="13" fontStyle="italic">
                Tal
              </text>

              {/* Isartor-Platz */}
              <text x="420" y="535" fontSize="11">
                Isartor-
              </text>
              <text x="420" y="549" fontSize="11">
                Platz
              </text>

              {/* Zweibrückenstraße */}
              <text
                x="475"
                y="635"
                fontSize="11"
                transform="rotate(50 475 635)"
                textAnchor="middle"
              >
                Zweibrückenstraße
              </text>

              {/* Rosenheimer-Straße */}
              <text
                x="765"
                y="810"
                fontSize="12"
                transform="rotate(40 765 810)"
                textAnchor="middle"
              >
                Rosenheimer-Straße
              </text>

              {/* Bürgerbräu-Keller */}
              <text x="850" y="835" fontSize="12" fontWeight="bold" fill="#1B1E23">
                Bürgerbräu-
              </text>
              <text x="850" y="850" fontSize="12" fontWeight="bold" fill="#1B1E23">
                Keller
              </text>

              {/* Maximilianstraße */}
              <text
                x="480"
                y="285"
                fontSize="13"
                letterSpacing="1"
                transform="rotate(13 480 285)"
              >
                Maximilianstraße
              </text>
            </g>
          )}

          {/* ============================================================== */}
          {/* AUTHENTIC HISTORICAL LEGEND BOX (BOTTOM-LEFT CORNER)           */}
          {/* Replicating Stefan Schnupp / BSB original title box            */}
          {/* ============================================================== */}
          <g id="authenticLegendBox" transform="translate(25, 740)">
            <rect
              x="0"
              y="0"
              width="240"
              height="135"
              fill="#FFFFFF"
              stroke="#1B1E23"
              strokeWidth="2"
            />
            <text
              x="120"
              y="25"
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#1B1E23"
            >
              Zug der Putschisten
            </text>
            <text
              x="120"
              y="42"
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#1B1E23"
            >
              vom Bürgerbräu-Keller
            </text>
            <text
              x="120"
              y="59"
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#1B1E23"
            >
              zur Feldherrnhalle
            </text>
            <text
              x="120"
              y="74"
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill="#1B1E23"
            >
              durch München
            </text>
            <line x1="20" y1="82" x2="220" y2="82" stroke="#1B1E23" strokeWidth="1" />
            <text x="15" y="100" fontSize="8.5" fill="#495057">
              Gestaltung: Stefan Schnupp
            </text>
            <text x="15" y="115" fontSize="8.5" fill="#495057">
              Vorlage: BSB, Mapp. XI, 467 ky
            </text>
          </g>

          {/* ============================================================== */}
          {/* NUMBERED BEAT DOTS (BEATS 1 TO 10)                             */}
          {/* SOLID 2D PINS WITHOUT RADIATING/PULSING CIRCLES                */}
          {/* ============================================================== */}
          <g id="putschBeatPins">
            {MAP_BEATS_DATA.map((pin) => {
              const isActive = pin.beatId === activeBeatId;
              const putschBeat = PUTSCH_BEATS.find((b) => b.id === pin.beatId);
              const hasHighlightedActor =
                highlightedActor &&
                putschBeat &&
                putschBeat.keyActors.some((a) => a.includes(highlightedActor));

              return (
                <g
                  key={pin.beatId}
                  onClick={() => onSelectBeat(pin.beatId)}
                  className="cursor-pointer group"
                >
                  {/* Clean Static Highlight Ring (NO radiating circles, NO animate-ping) */}
                  {isActive && (
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r="16"
                      fill="none"
                      stroke="#8B1E1E"
                      strokeWidth="2.5"
                    />
                  )}

                  {/* Main Solid Dot */}
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r={isActive ? 11 : hasHighlightedActor ? 10 : 8}
                    fill={isActive ? '#8B1E1E' : hasHighlightedActor ? '#D4A373' : '#1B1E23'}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="transition-transform group-hover:scale-110"
                  />

                  {/* Dot Number */}
                  <text
                    x={pin.x}
                    y={pin.y + 3.5}
                    textAnchor="middle"
                    fontSize={isActive ? '10' : '8.5'}
                    fontWeight="bold"
                    fill="#FFFFFF"
                    fontFamily="monospace"
                  >
                    {pin.beatId}
                  </text>

                  {/* Clean Static Callout Label for Active Beat */}
                  {isActive && (
                    <g transform={`translate(${pin.x}, ${pin.y - 18})`}>
                      <rect
                        x="-70"
                        y="-22"
                        width="140"
                        height="20"
                        fill="#1B1E23"
                        stroke="#8B1E1E"
                        strokeWidth="1.2"
                      />
                      <polygon points="-4,-2 4,-2 0,3" fill="#1B1E23" />
                      <text
                        x="0"
                        y="-8"
                        textAnchor="middle"
                        fontSize="8.5"
                        fontWeight="bold"
                        fill="#FAF7F2"
                      >
                        BEAT #{pin.beatId} · {pin.name.slice(0, 16)}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Selected Beat Forensic Summary Strip */}
      <div className="bg-white border border-[#2C302E]/20 p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-start md:items-center gap-3">
          <div className="w-8 h-8 bg-[#8B1E1E] text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">
            #{activeBeatId}
          </div>
          <div>
            <div className="flex items-center gap-2 text-[11px] text-[#6C757D] font-mono">
              <span className="font-bold text-[#8B1E1E]">{activePutschBeat.time}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-[#1B1E23] font-sans font-medium">
                <MapPin className="w-3 h-3 text-[#8B1E1E]" />
                {activeMapBeat.locationLabel}
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#1B1E23]">
              {activeMapBeat.name}: {activePutschBeat.phase}
            </h4>
            <p className="text-[#495057] text-[11px] mt-0.5 max-w-2xl">
              {activeMapBeat.description}
            </p>
          </div>
        </div>

        {/* Quick Stepper */}
        <div className="flex items-center gap-1 shrink-0 self-end md:self-auto">
          <button
            onClick={() => onSelectBeat(Math.max(1, activeBeatId - 1))}
            disabled={activeBeatId === 1}
            className="px-2.5 py-1 text-xs border border-[#2C302E]/20 disabled:opacity-30 hover:bg-[#FAF7F2]"
          >
            Prev
          </button>
          <span className="px-2 font-mono text-xs font-bold text-[#1B1E23]">
            {activeBeatId} / 10
          </span>
          <button
            onClick={() => onSelectBeat(Math.min(10, activeBeatId + 1))}
            disabled={activeBeatId === 10}
            className="px-2.5 py-1 text-xs bg-[#1B1E23] text-white disabled:opacity-30 hover:bg-[#8B1E1E]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
