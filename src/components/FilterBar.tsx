import React from 'react';
import { ShieldAlert, Users, Layers, RotateCcw } from 'lucide-react';

export type ThemeType = 'All' | 'Economic' | 'Political' | 'Ideological' | 'Military & Judiciary';

interface FilterBarProps {
  activeTheme: ThemeType;
  setActiveTheme: (theme: ThemeType) => void;
  highlightedActor: string | null;
  setHighlightedActor: (actor: string | null) => void;
  stabilityIndex: number;
  availableActors: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeTheme,
  setActiveTheme,
  highlightedActor,
  setHighlightedActor,
  stabilityIndex,
  availableActors,
}) => {
  // Stability index status text & visual indicator
  const getStabilityDescriptor = (val: number) => {
    if (val <= 2) return { text: 'Near Total Collapse / Civil Mutiny', status: 'critical' };
    if (val <= 4) return { text: 'Severe Democratic Fragility', status: 'warning' };
    if (val <= 6) return { text: 'Turbulent Stabilisation', status: 'neutral' };
    return { text: 'Consolidating Democratic Order', status: 'stable' };
  };

  const descriptor = getStabilityDescriptor(stabilityIndex);

  const themes: ThemeType[] = ['All', 'Economic', 'Political', 'Ideological', 'Military & Judiciary'];

  return (
    <div className="bg-[#FFFFFF] border-b border-[#2C302E]/15 px-4 md:px-8 py-3 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Reactive Theme Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#6C757D] shrink-0 mr-1">
            <Layers className="w-3.5 h-3.5 text-[#8B1E1E]" />
            <span>Theme:</span>
          </div>
          <div className="flex items-center gap-1 bg-[#F4EFEA] p-0.5 rounded-none border border-[#2C302E]/15">
            {themes.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTheme(t)}
                className={`px-3 py-1 text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                  activeTheme === t
                    ? 'bg-[#1B1E23] text-white shadow-xs'
                    : 'text-[#495057] hover:text-[#1B1E23] hover:bg-white/60'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Middle: Historical Actor Spotlight */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#6C757D] shrink-0 mr-1">
            <Users className="w-3.5 h-3.5 text-[#8B1E1E]" />
            <span>Actor Spotlight:</span>
          </div>
          <div className="flex items-center gap-1">
            {availableActors.map((actor) => (
              <button
                key={actor}
                onClick={() => setHighlightedActor(highlightedActor === actor ? null : actor)}
                className={`px-2.5 py-1 text-xs transition-colors whitespace-nowrap shrink-0 border ${
                  highlightedActor === actor
                    ? 'bg-[#8B1E1E] text-white border-[#8B1E1E] font-medium'
                    : 'bg-[#FAF7F2] text-[#2C302E] border-[#2C302E]/20 hover:border-[#8B1E1E]'
                }`}
              >
                {actor}
              </button>
            ))}
            {highlightedActor && (
              <button
                onClick={() => setHighlightedActor(null)}
                title="Reset actor filter"
                className="p-1 text-xs text-[#6C757D] hover:text-[#8B1E1E] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Weimar Stability Barometer (1-10) */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-auto border-t md:border-t-0 md:border-l border-[#2C302E]/15 pt-2 md:pt-0 md:pl-4">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-[#8B1E1E]" />
            <div className="text-right">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#6C757D]">
                Weimar Stability Index
              </div>
              <div className="text-xs font-bold font-mono text-[#1B1E23] flex items-center justify-end gap-1.5">
                <span>{stabilityIndex}/10</span>
                <span className="text-[11px] font-sans font-normal text-[#495057]">
                  · {descriptor.text}
                </span>
              </div>
            </div>
          </div>

          {/* Stepped Bauhaus Bar */}
          <div className="flex items-center gap-0.5 w-20 h-3 bg-[#E9ECEF] border border-[#2C302E]/20 p-0.5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step) => {
              const isFilled = step <= stabilityIndex;
              let stepColor = 'bg-[#8B1E1E]'; // red
              if (step > 3 && step <= 6) stepColor = 'bg-[#D4A373]'; // amber
              if (step > 6) stepColor = 'bg-[#2E5A44]'; // forest green

              return (
                <div
                  key={step}
                  className={`flex-1 h-full transition-all ${
                    isFilled ? stepColor : 'bg-transparent'
                  }`}
                />
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
