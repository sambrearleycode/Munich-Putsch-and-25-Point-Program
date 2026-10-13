import React from 'react';
import {
  IDEOLOGY_POINTS,
  CRISIS_CHRONICLE,
  EVIDENCE_CARDS,
  IdeologyPoint,
  CrisisEvent,
} from '../data/historicalData';
import { ThemeType } from './FilterBar';
import { Zap, BookOpen, Scale, ArrowRight, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';

interface SynopticOverviewProps {
  selectedPoint: IdeologyPoint | null;
  onSelectPoint: (point: IdeologyPoint | null) => void;
  selectedEvent: CrisisEvent | null;
  onSelectEvent: (event: CrisisEvent | null) => void;
  activeTheme: ThemeType;
  highlightedActor: string | null;
  sparkActive: boolean;
  onTriggerSpark: () => void;
  onNavigateToView: (view: 'matrix' | 'timeline' | 'putsch' | 'trial' | 'workbench') => void;
  onLaunchInquiry: (triggerId: string) => void;
  stabilityIndex: number;
}

export const SynopticOverview: React.FC<SynopticOverviewProps> = ({
  selectedPoint,
  onSelectPoint,
  selectedEvent,
  onSelectEvent,
  activeTheme,
  highlightedActor,
  sparkActive,
  onTriggerSpark,
  onNavigateToView,
  onLaunchInquiry,
  stabilityIndex,
}) => {
  // Key points to feature in compact matrix
  const featuredPoints = IDEOLOGY_POINTS.filter((p) => {
    if (activeTheme === 'Economic') return [11, 12, 13, 14, 15, 16, 17, 18].includes(p.id);
    if (activeTheme === 'Political') return [1, 2, 6, 22, 25].includes(p.id);
    if (activeTheme === 'Ideological') return [3, 4, 5, 8, 23, 24].includes(p.id);
    if (activeTheme === 'Military & Judiciary') return [2, 18, 19, 22, 25].includes(p.id);
    return [1, 2, 4, 11, 16, 18, 22, 25].includes(p.id); // Default featured
  });

  // Filtered timeline events
  const timelineSample = CRISIS_CHRONICLE.slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Bauhaus Architectural Hero Section */}
      <div className="bg-white border-2 border-[#1B1E23] p-6 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#8B1E1E]">
              <span>Weimar Republic (1918–1924)</span>
              <span aria-hidden="true">·</span>
              <span>AQA Depth Study 7041 / 7042</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1B1E23] leading-tight">
              The Weimar Crisis & Nazi Emergence
            </h1>
            <p className="text-sm md:text-base text-[#495057] leading-relaxed max-w-3xl">
              An interconnected synoptic organizer mapping how the <strong>25-Point Nazi Program (1920)</strong> weaponized systemic crises—the Versailles Diktat, Ruhr invasion, and hyperinflation—culminating in the <strong>Munich Putsch (1923)</strong>, the biased <strong>1924 Treason Trial</strong>, and Hitler's pivotal shift to the democratic <em>Legalitätstaktik</em>.
            </p>
          </div>

          <div className="lg:col-span-4 bg-[#FAF7F2] p-4 border border-[#2C302E]/20 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1B1E23] flex items-center justify-between">
              <span>Interactive Synoptic Engine</span>
              <span className="w-2 h-2 bg-[#8B1E1E]" />
            </div>
            <p className="text-xs text-[#6C757D] leading-relaxed">
              Clicking an element anywhere in the system ripples through ideology, timeline crises, and historiographical debates in real time.
            </p>
            <div className="pt-2 border-t border-[#2C302E]/10 flex flex-wrap gap-2">
              <button
                onClick={onTriggerSpark}
                className="w-full py-2 px-3 bg-[#8B1E1E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#701616] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Simulate 'Closing Window' Spark</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Single-Pane-of-Glass 3-Column Tri-Facet Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Pane 1: Facet A - Ideological Roots (4 Columns) */}
        <div className="lg:col-span-4 bg-white border border-[#2C302E]/20 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#2C302E]/15 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1E1E]">Facet A</span>
              <h3 className="text-base font-bold text-[#1B1E23]">25 Points Matrix</h3>
            </div>
            <button
              onClick={() => onNavigateToView('matrix')}
              className="text-xs font-medium text-[#8B1E1E] hover:underline flex items-center gap-1"
            >
              <span>Full 25 Grid</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <p className="text-xs text-[#6C757D] leading-relaxed">
            Select a point to see how Hitler exploited it in 1923:
          </p>

          <div className="space-y-2">
            {featuredPoints.map((point) => {
              const isSelected = selectedPoint?.id === point.id;
              return (
                <div
                  key={point.id}
                  onClick={() => onSelectPoint(isSelected ? null : point)}
                  className={`p-2.5 text-xs border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#8B1E1E] bg-[#8B1E1E]/5 font-medium shadow-xs'
                      : 'border-[#2C302E]/15 bg-[#FAF7F2] hover:border-[#1B1E23] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-mono font-bold text-[#8B1E1E]">Point #{point.id}</span>
                    <span className="text-[10px] uppercase font-semibold text-[#6C757D]">{point.category}</span>
                  </div>
                  <div className="font-bold text-[#1B1E23]">{point.title}</div>
                  <p className="text-[11px] text-[#495057] mt-1 line-clamp-2">
                    {point.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {selectedPoint && (
            <div className="p-3 bg-[#FAF7F2] border-l-2 border-[#8B1E1E] text-xs space-y-1.5 animate-fadeIn">
              <span className="font-bold text-[#8B1E1E] uppercase text-[10px] tracking-wider block">
                1923 Real-World Link:
              </span>
              <p className="text-[#1B1E23] font-medium leading-relaxed">
                {selectedPoint.realWorldLink}
              </p>
              {selectedPoint.id === 25 && (
                <button
                  onClick={() => onLaunchInquiry('point-25')}
                  className="mt-2 text-xs text-[#8B1E1E] font-bold hover:underline flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Launch Bavarian Separatism Inquiry</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pane 2: Facet B - Crisis Chronicle & Putsch (4 Columns) */}
        <div className="lg:col-span-4 bg-white border border-[#2C302E]/20 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#2C302E]/15 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1E1E]">Facet B</span>
              <h3 className="text-base font-bold text-[#1B1E23]">Chronicle & Putsch</h3>
            </div>
            <button
              onClick={() => onNavigateToView('timeline')}
              className="text-xs font-medium text-[#8B1E1E] hover:underline flex items-center gap-1"
            >
              <span>Full Timeline</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <p className="text-xs text-[#6C757D] leading-relaxed">
            Macro-German shocks and corresponding Nazi moves:
          </p>

          <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
            {timelineSample.map((evt) => {
              const isSelected = selectedEvent?.id === evt.id;
              const isRelatedToPoint = selectedPoint && selectedPoint.relatedEvents.includes(evt.id);

              return (
                <div
                  key={evt.id}
                  onClick={() => onSelectEvent(isSelected ? null : evt)}
                  className={`p-2.5 text-xs border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#8B1E1E] bg-white ring-2 ring-[#8B1E1E]/20 shadow-xs'
                      : isRelatedToPoint
                      ? 'border-[#8B1E1E] bg-[#8B1E1E]/10'
                      : 'border-[#2C302E]/15 bg-[#FAF7F2] hover:border-[#1B1E23] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-[#6C757D] mb-1">
                    <span>{evt.date}</span>
                    <span className="font-sans font-bold text-[#1B1E23]">{evt.stabilityScore}/10</span>
                  </div>
                  <div className="font-bold text-[#1B1E23] leading-snug">{evt.title}</div>
                  <div className="text-[11px] text-[#8B1E1E] font-medium mt-1 line-clamp-2">
                    {evt.naziExploitation}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#2C302E]/15 flex items-center justify-between">
            <button
              onClick={() => onNavigateToView('putsch')}
              className="text-xs font-semibold text-[#1B1E23] hover:text-[#8B1E1E] flex items-center gap-1"
            >
              <span>10 Tactical Putsch Beats</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => onNavigateToView('trial')}
              className="text-xs font-semibold text-[#8B1E1E] hover:underline"
            >
              1924 Trial Bias
            </button>
          </div>
        </div>

        {/* Pane 3: Facet C - Historiographical Balance (4 Columns) */}
        <div className="lg:col-span-4 bg-white border border-[#2C302E]/20 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#2C302E]/15 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1E1E]">Facet C</span>
              <h3 className="text-base font-bold text-[#1B1E23]">Evidence Evaluator</h3>
            </div>
            <button
              onClick={() => onNavigateToView('workbench')}
              className="text-xs font-medium text-[#8B1E1E] hover:underline flex items-center gap-1"
            >
              <span>Workbench</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-[#FAF7F2] p-3 border border-[#2C302E]/15">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1E1E] block mb-1">
              Core AQA Essay Question
            </span>
            <p className="text-xs font-bold text-[#1B1E23] leading-snug">
              "The Weimar Republic was lucky to survive beyond 1923. Assess the validity of this view."
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="font-bold text-[#1B1E23] text-xs uppercase tracking-wider">
              Contrasting Historical Pillars
            </div>

            <div className="p-2.5 bg-white border border-[#2E5A44]/30 space-y-1">
              <span className="text-[10px] font-bold text-[#2E5A44] uppercase tracking-wider block">
                Evidence of Democratic Strength
              </span>
              <p className="text-[11px] text-[#495057] leading-relaxed">
                General strike defeated Kapp Putsch (1920); Stresemann’s Rentenmark halted hyperinflation overnight; Ebert used Article 48 decisively to protect the constitutional order.
              </p>
            </div>

            <div className="p-2.5 bg-white border border-[#8B1E1E]/30 space-y-1">
              <span className="text-[10px] font-bold text-[#8B1E1E] uppercase tracking-wider block">
                Evidence of Weakness & Sheer Luck
              </span>
              <p className="text-[11px] text-[#495057] leading-relaxed">
                Army neutrality under Seeckt; Judge Neithardt’s treason trial leniency for Hitler; permanent wiping out of middle-class savings destroyed bourgeois faith in the Republic.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onLaunchInquiry('historiography-workbench')}
              className="w-full py-2.5 px-3 bg-[#1B1E23] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#8B1E1E] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate Thesis & Essay Plan</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
