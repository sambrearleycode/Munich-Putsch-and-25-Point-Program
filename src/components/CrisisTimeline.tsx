import React, { useState } from 'react';
import { CrisisEvent } from '../data/historicalData';
import { ThemeType } from './FilterBar';
import { Zap, Clock, TrendingUp, AlertTriangle, ArrowRight, HelpCircle } from 'lucide-react';

interface CrisisTimelineProps {
  events: CrisisEvent[];
  selectedEvent: CrisisEvent | null;
  onSelectEvent: (event: CrisisEvent | null) => void;
  activeTheme: ThemeType;
  highlightedActor: string | null;
  sparkActive: boolean;
  onTriggerSpark: () => void;
  onLaunchInquiry: (triggerId: string) => void;
}

export const CrisisTimeline: React.FC<CrisisTimelineProps> = ({
  events,
  selectedEvent,
  onSelectEvent,
  activeTheme,
  highlightedActor,
  sparkActive,
  onTriggerSpark,
  onLaunchInquiry,
}) => {
  const [filterTrack, setFilterTrack] = useState<'both' | 'macro' | 'nsdap'>('both');

  // Filter events
  const filteredEvents = events.filter((evt) => {
    if (filterTrack !== 'both' && evt.track !== filterTrack) return false;
    if (activeTheme !== 'All' && evt.category !== activeTheme) return false;
    if (highlightedActor && !evt.keyActors.includes(highlightedActor)) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header & Closing Window Theory Callout */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[#2C302E]/15 pb-4">
        <div>
          <div className="text-xs uppercase tracking-widest font-semibold text-[#8B1E1E] mb-1">
            Facet B · Dual-Track Historical Causality
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1B1E23]">
            Weimar Macro-Crises & NSDAP Emergence (1918–1924)
          </h2>
          <p className="text-sm text-[#495057] mt-1 max-w-3xl leading-relaxed">
            Trace how systemic German shocks (Ruhr occupation, hyperinflation, passive resistance) directly fertilized Nazi paramilitary growth. Notice the crucial turning point in Autumn 1923: Stresemann's stabilization threatened to close the revolutionary window, forcing Hitler into a desperate gamble.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Spark trigger button */}
          <button
            onClick={onTriggerSpark}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all border ${
              sparkActive
                ? 'bg-[#8B1E1E] text-white border-[#8B1E1E] shadow-sm animate-pulse'
                : 'bg-[#FAF7F2] text-[#8B1E1E] border-[#8B1E1E] hover:bg-[#8B1E1E] hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Simulate 'Closing Window' Spark</span>
          </button>

          {/* Track Filter */}
          <div className="flex items-center gap-0.5 bg-[#F4EFEA] p-0.5 border border-[#2C302E]/15">
            <button
              onClick={() => setFilterTrack('both')}
              className={`px-2.5 py-1 text-xs font-medium ${
                filterTrack === 'both' ? 'bg-[#1B1E23] text-white' : 'text-[#495057] hover:text-[#1B1E23]'
              }`}
            >
              Dual Tracks
            </button>
            <button
              onClick={() => setFilterTrack('macro')}
              className={`px-2.5 py-1 text-xs font-medium ${
                filterTrack === 'macro' ? 'bg-[#1B1E23] text-white' : 'text-[#495057] hover:text-[#1B1E23]'
              }`}
            >
              Macro-German
            </button>
            <button
              onClick={() => setFilterTrack('nsdap')}
              className={`px-2.5 py-1 text-xs font-medium ${
                filterTrack === 'nsdap' ? 'bg-[#1B1E23] text-white' : 'text-[#495057] hover:text-[#1B1E23]'
              }`}
            >
              NSDAP / Bavaria
            </button>
          </div>
        </div>
      </div>

      {/* Spark Explanation Banner (when spark is active) */}
      {sparkActive && (
        <div className="bg-[#8B1E1E]/10 border-2 border-[#8B1E1E] p-4 text-[#1B1E23] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#8B1E1E] text-white shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#8B1E1E] uppercase tracking-wider">
                The 'Closing Window' Causal Spark (Sept–Nov 1923)
              </h4>
              <p className="text-xs text-[#2C302E] mt-0.5 leading-relaxed">
                On <strong>26 Sept 1923</strong>, Stresemann halted passive resistance in the Ruhr, ending runaway money-printing. Simultaneously, planning for the <strong>Rentenmark</strong> made economic recovery imminent. Hitler realized the mass radicalization of ruined Germans was about to evaporate: <em>He had to strike before the economy stabilized, or miss his chance entirely.</em>
              </p>
            </div>
          </div>
          <button
            onClick={() => onLaunchInquiry('closing-window')}
            className="shrink-0 px-3 py-1.5 bg-[#1B1E23] hover:bg-[#8B1E1E] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
          >
            AQA Inquiry Prompt
          </button>
        </div>
      )}

      {/* Track Legend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-2.5 bg-[#FAF7F2] border border-[#2C302E]/15 flex items-center gap-2">
          <div className="w-3 h-3 bg-[#1B1E23]" />
          <div>
            <strong className="text-[#1B1E23]">Left Track: Macro-German Crises & State Actions</strong>
            <p className="text-[11px] text-[#6C757D]">Versailles, Ruhr occupation, hyperinflation, Stresemann, Rentenmark</p>
          </div>
        </div>
        <div className="p-2.5 bg-[#8B1E1E]/5 border border-[#8B1E1E]/20 flex items-center gap-2">
          <div className="w-3 h-3 bg-[#8B1E1E]" />
          <div>
            <strong className="text-[#8B1E1E]">Right Track: NSDAP Trajectory & Bavarian Conspiracy</strong>
            <p className="text-[11px] text-[#6C757D]">25-Point Program, SA terror, March on Rome impact, Munich Putsch, 1924 Trial</p>
          </div>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l-2 border-[#2C302E]/20 ml-4 md:ml-32 pl-6 md:pl-10 space-y-8 py-4">
        {filteredEvents.map((evt, idx) => {
          const isSelected = selectedEvent?.id === evt.id;
          const isMacro = evt.track === 'macro';
          const isSparkNode = evt.id === 'stresemann-resistance' || evt.id === 'munich-putsch';

          return (
            <div
              key={evt.id}
              id={`event-${evt.id}`}
              onClick={() => onSelectEvent(isSelected ? null : evt)}
              className={`relative group transition-all cursor-pointer ${
                isSelected ? 'scale-[1.01]' : ''
              }`}
            >
              {/* Timeline Pin Node on Left Axis */}
              <div
                className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 border-2 transition-all ${
                  isSparkNode && sparkActive
                    ? 'bg-[#8B1E1E] border-white ring-4 ring-[#8B1E1E]/40 scale-125'
                    : isMacro
                    ? 'bg-[#1B1E23] border-[#FAF7F2]'
                    : 'bg-[#8B1E1E] border-[#FAF7F2]'
                } ${isSelected ? 'ring-4 ring-[#1B1E23]/30 scale-125' : ''}`}
              />

              {/* Timestamp label on left for medium+ screens */}
              <div className="hidden md:block absolute -left-36 top-1.5 text-right w-24 font-mono text-xs font-semibold text-[#6C757D]">
                {evt.date}
              </div>

              {/* Event Card Container */}
              <div
                className={`p-4 md:p-5 border transition-all ${
                  isSelected
                    ? 'border-[#8B1E1E] bg-white ring-2 ring-[#8B1E1E]/20 shadow-md'
                    : isMacro
                    ? 'border-[#2C302E]/15 bg-white hover:border-[#1B1E23] hover:shadow-xs'
                    : 'border-[#8B1E1E]/25 bg-[#FAF7F2] hover:border-[#8B1E1E] hover:shadow-xs'
                }`}
              >
                {/* Mobile Date Header */}
                <div className="md:hidden text-xs font-mono font-bold text-[#8B1E1E] mb-1">
                  {evt.date}
                </div>

                {/* Card Title & Meta Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2C302E]/10 pb-2.5 mb-3">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6C757D]">
                      {isMacro ? 'Macro-German Track' : 'NSDAP Development'} · {evt.category}
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-[#1B1E23] leading-snug">
                      {evt.title}
                    </h3>
                  </div>

                  {/* Stability Indicator at this juncture */}
                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    <span className="text-[11px] font-mono text-[#495057]">
                      Stability: <strong className="text-[#1B1E23]">{evt.stabilityScore}/10</strong>
                    </span>
                    <div className="w-12 h-2 bg-[#E9ECEF] border border-[#2C302E]/20">
                      <div
                        className={`h-full ${
                          evt.stabilityScore <= 3
                            ? 'bg-[#8B1E1E]'
                            : evt.stabilityScore <= 6
                            ? 'bg-[#D4A373]'
                            : 'bg-[#2E5A44]'
                        }`}
                        style={{ width: `${evt.stabilityScore * 10}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Tri-Part Analysis Breakdown: Economic, Political, Nazi Exploitation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-relaxed">
                  <div className="bg-[#FAF7F2] p-2.5 border border-[#2C302E]/10">
                    <span className="font-semibold text-[#1B1E23] uppercase text-[10px] tracking-wider block mb-0.5">
                      Economic Dimension
                    </span>
                    <p className="text-[#495057]">{evt.economicImpact}</p>
                  </div>

                  <div className="bg-[#FAF7F2] p-2.5 border border-[#2C302E]/10">
                    <span className="font-semibold text-[#1B1E23] uppercase text-[10px] tracking-wider block mb-0.5">
                      Political Dimension
                    </span>
                    <p className="text-[#495057]">{evt.politicalImpact}</p>
                  </div>

                  <div className="bg-[#8B1E1E]/5 p-2.5 border border-[#8B1E1E]/20">
                    <span className="font-bold text-[#8B1E1E] uppercase text-[10px] tracking-wider block mb-0.5">
                      Nazi Exploitation & Tactics
                    </span>
                    <p className="text-[#1B1E23] font-medium">{evt.naziExploitation}</p>
                  </div>
                </div>

                {/* Key Actors & Direct Action Links */}
                <div className="mt-3 pt-2.5 border-t border-[#2C302E]/10 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <div className="flex items-center gap-1.5 text-[#6C757D]">
                    <span className="font-medium text-[#1B1E23]">Key Actors:</span>
                    {evt.keyActors.map((actor) => (
                      <span
                        key={actor}
                        className={`px-1.5 py-0.5 border ${
                          highlightedActor === actor
                            ? 'bg-[#8B1E1E] text-white border-[#8B1E1E]'
                            : 'bg-white text-[#2C302E] border-[#2C302E]/15'
                        }`}
                      >
                        {actor}
                      </span>
                    ))}
                  </div>

                  {evt.isSparkTrigger && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTriggerSpark();
                      }}
                      className="text-[#8B1E1E] font-bold flex items-center gap-1 hover:underline"
                    >
                      <Zap className="w-3 h-3" />
                      <span>Trace spark to Munich Putsch</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
