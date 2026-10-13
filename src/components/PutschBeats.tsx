import React, { useState } from 'react';
import { PUTSCH_BEATS, PutschBeat } from '../data/historicalData';
import { MapPin, Users, AlertOctagon, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { Munich3DMap } from './Munich3DMap';

interface PutschBeatsProps {
  onLaunchInquiry: (triggerId: string) => void;
  highlightedActor: string | null;
}

export const PutschBeats: React.FC<PutschBeatsProps> = ({
  onLaunchInquiry,
  highlightedActor,
}) => {
  const [activeBeatId, setActiveBeatId] = useState<number>(1);

  const activeBeat = PUTSCH_BEATS.find((b) => b.id === activeBeatId) || PUTSCH_BEATS[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2C302E]/15 pb-4">
        <div>
          <div className="text-xs uppercase tracking-widest font-semibold text-[#8B1E1E] mb-1">
            Tactical & Forensic Breakdown
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1B1E23]">
            The Munich Putsch Step-by-Step (8–9 Nov 1923)
          </h2>
          <p className="text-sm text-[#495057] mt-1 max-w-3xl leading-relaxed">
            Follow the 10 tactical beats of Hitler’s armed gamble in Munich. Examine why the putsch disintegrated—from Ludendorff’s naive officer chivalry to the SA’s failure to capture army barracks and telegraph lines.
          </p>
        </div>

        <button
          onClick={() => onLaunchInquiry('trial-1924')}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#8B1E1E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#701616] transition-colors shrink-0 shadow-xs"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Inquiry: The Trial vs The Putsch</span>
        </button>
      </div>

      {/* 3D Munich Tactical Line Map */}
      <Munich3DMap
        activeBeatId={activeBeatId}
        onSelectBeat={setActiveBeatId}
        highlightedActor={highlightedActor}
      />

      {/* Interactive Step Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-1.5 bg-[#FAF7F2] p-2 border border-[#2C302E]/15">
        {PUTSCH_BEATS.map((beat) => {
          const isActive = beat.id === activeBeatId;
          const containsActor = highlightedActor && beat.keyActors.some((a) => a.includes(highlightedActor));

          return (
            <button
              key={beat.id}
              onClick={() => setActiveBeatId(beat.id)}
              className={`p-2 text-left border transition-all ${
                isActive
                  ? 'bg-[#1B1E23] text-white border-[#1B1E23] shadow-sm'
                  : containsActor
                  ? 'bg-[#8B1E1E]/15 border-[#8B1E1E] text-[#1B1E23]'
                  : 'bg-white text-[#495057] border-[#2C302E]/15 hover:border-[#1B1E23] hover:text-[#1B1E23]'
              }`}
            >
              <div className="text-[10px] font-mono font-bold uppercase opacity-80">
                Beat #{beat.id}
              </div>
              <div className="text-[11px] font-bold truncate">
                {beat.phase}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Forensic Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-[#2C302E]/20 p-5 md:p-6 shadow-xs">
        
        {/* Left Column: Tactical Beat Data */}
        <div className="lg:col-span-8 space-y-5">
          <div className="border-b border-[#2C302E]/15 pb-3">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#6C757D] mb-1 font-mono">
              <span className="font-bold text-[#8B1E1E]">TACTICAL BEAT #{activeBeat.id}</span>
              <span aria-hidden="true">·</span>
              <span>{activeBeat.time}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-[#1B1E23] font-sans font-semibold">
                <MapPin className="w-3 h-3 text-[#8B1E1E]" />
                {activeBeat.location}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#1B1E23]">
              {activeBeat.phase}
            </h3>
          </div>

          {/* Narrative */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6C757D] mb-1.5">
              Historical Narrative
            </h4>
            <p className="text-sm text-[#1B1E23] leading-relaxed">
              {activeBeat.narrative}
            </p>
          </div>

          {/* Immediate Outcome */}
          <div className="bg-[#FAF7F2] p-4 border-l-2 border-[#1B1E23]">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1B1E23] mb-1">
              <CheckCircle2 className="w-4 h-4 text-[#2E5A44]" />
              <span>Immediate Tactical Outcome</span>
            </div>
            <p className="text-xs text-[#495057] leading-relaxed">
              {activeBeat.outcome}
            </p>
          </div>

          {/* Decisive Failure Factor */}
          <div className="bg-[#8B1E1E]/5 p-4 border border-[#8B1E1E]/25">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8B1E1E] mb-1">
              <AlertOctagon className="w-4 h-4 text-[#8B1E1E]" />
              <span>Decisive Failure Factor</span>
            </div>
            <p className="text-xs text-[#8B1E1E] leading-relaxed font-medium">
              {activeBeat.failureFactor}
            </p>
          </div>

          {/* Navigation Controls between beats */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveBeatId((prev) => Math.max(1, prev - 1))}
              disabled={activeBeatId === 1}
              className="px-3 py-1.5 text-xs font-semibold border border-[#2C302E]/20 disabled:opacity-30 hover:bg-[#FAF7F2] transition-colors"
            >
              Previous Beat
            </button>
            <span className="text-xs font-mono text-[#6C757D]">
              {activeBeatId} of {PUTSCH_BEATS.length}
            </span>
            <button
              onClick={() => setActiveBeatId((prev) => Math.min(PUTSCH_BEATS.length, prev + 1))}
              disabled={activeBeatId === PUTSCH_BEATS.length}
              className="px-3 py-1.5 text-xs font-semibold bg-[#1B1E23] text-white hover:bg-[#8B1E1E] disabled:opacity-30 transition-colors flex items-center gap-1"
            >
              <span>Next Beat</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Key Actors in this beat & Putsch Casualty Ledger */}
        <div className="lg:col-span-4 bg-[#FAF7F2] border border-[#2C302E]/15 p-4 space-y-5">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B1E23] mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#8B1E1E]" />
              <span>Key Actors In This Beat</span>
            </h4>
            <div className="space-y-1.5">
              {activeBeat.keyActors.map((actor) => (
                <div
                  key={actor}
                  className={`p-2 text-xs border ${
                    highlightedActor && actor.includes(highlightedActor)
                      ? 'bg-[#8B1E1E] text-white border-[#8B1E1E] font-medium'
                      : 'bg-white text-[#1B1E23] border-[#2C302E]/15'
                  }`}
                >
                  {actor}
                </div>
              ))}
            </div>
          </div>

          {/* The Putsch Casualties & Toll Ledger */}
          <div className="border-t border-[#2C302E]/15 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B1E23] mb-2">
              The Feldherrnhalle Toll
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-white border border-[#2C302E]/15 flex justify-between items-center">
                <span className="text-[#6C757D]">Nazis Killed</span>
                <span className="font-mono font-bold text-[#8B1E1E]">14 at clash (+2 elsewhere)</span>
              </div>
              <div className="p-2 bg-white border border-[#2C302E]/15 flex justify-between items-center">
                <span className="text-[#6C757D]">Bavarian Police Killed</span>
                <span className="font-mono font-bold text-[#1B1E23]">4 officers</span>
              </div>
              <div className="p-2 bg-white border border-[#2C302E]/15 flex justify-between items-center">
                <span className="text-[#6C757D]">Hitler Injury</span>
                <span className="font-medium text-[#1B1E23]">Left arm dislocated</span>
              </div>
              <div className="p-2 bg-white border border-[#2C302E]/15 flex justify-between items-center">
                <span className="text-[#6C757D]">Nazi Party Status</span>
                <span className="font-semibold text-[#8B1E1E]">Banned Reich-wide</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#2C302E]/15 pt-3">
            <p className="text-[11px] text-[#6C757D] leading-snug">
              Hitler later consecrated the blood-soaked swastika flag as the sacred <em>Blutfahne</em>, staging an annual memorial march across Odeonsplatz every November 9 until 1944.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
