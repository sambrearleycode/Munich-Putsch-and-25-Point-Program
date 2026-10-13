import React, { useState } from 'react';
import { IdeologyPoint } from '../data/historicalData';
import { ThemeType } from './FilterBar';
import { HelpCircle, ExternalLink, Sparkles, BookOpen, ArrowRight, Layers } from 'lucide-react';

interface IdeologyMatrixProps {
  points: IdeologyPoint[];
  selectedPoint: IdeologyPoint | null;
  onSelectPoint: (point: IdeologyPoint | null) => void;
  hoveredPoint: IdeologyPoint | null;
  onHoverPoint: (point: IdeologyPoint | null) => void;
  activeTheme: ThemeType;
  highlightedActor: string | null;
  onJumpToEvent: (eventId: string) => void;
  onLaunchInquiry: (triggerId: string) => void;
}

export const IdeologyMatrix: React.FC<IdeologyMatrixProps> = ({
  points,
  selectedPoint,
  onSelectPoint,
  hoveredPoint,
  onHoverPoint,
  activeTheme,
  highlightedActor,
  onJumpToEvent,
  onLaunchInquiry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Nationalist', 'Socialist', 'Anti-Semitic', 'Authoritarian'];

  // Filter points based on category, theme, and actor
  const filteredPoints = points.filter((p) => {
    // Category filter
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

    // Theme filter
    if (activeTheme === 'Economic' && p.category !== 'Socialist') return false;
    if (activeTheme === 'Ideological' && p.category !== 'Anti-Semitic' && p.category !== 'Nationalist') return false;
    if (activeTheme === 'Political' && p.category !== 'Authoritarian' && p.category !== 'Nationalist') return false;
    if (activeTheme === 'Military & Judiciary' && p.id !== 22 && p.id !== 19 && p.id !== 25) return false;

    // Actor spotlight
    if (highlightedActor && !p.relatedActors.includes(highlightedActor)) return false;

    return true;
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Nationalist':
        return { text: 'text-[#8B1E1E]', border: 'border-[#8B1E1E]/40', bg: 'bg-[#8B1E1E]/5' };
      case 'Socialist':
        return { text: 'text-[#B85D19]', border: 'border-[#B85D19]/40', bg: 'bg-[#B85D19]/5' };
      case 'Anti-Semitic':
        return { text: 'text-[#6A1B9A]', border: 'border-[#6A1B9A]/40', bg: 'bg-[#6A1B9A]/5' };
      case 'Authoritarian':
        return { text: 'text-[#1B1E23]', border: 'border-[#1B1E23]/40', bg: 'bg-[#1B1E23]/5' };
      default:
        return { text: 'text-[#495057]', border: 'border-[#495057]/40', bg: 'bg-white' };
    }
  };

  const activeFocus = selectedPoint || hoveredPoint;

  return (
    <div className="space-y-6">
      {/* Header and Pedagogical Framing */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2C302E]/15 pb-4">
        <div>
          <div className="text-xs uppercase tracking-widest font-semibold text-[#8B1E1E] mb-1">
            Facet A · Spatial & Ideological Logic
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1B1E23]">
            The 25-Point Programme (24 Feb 1920)
          </h2>
          <p className="text-sm text-[#495057] mt-1 max-w-3xl leading-relaxed">
            The Munich Putsch was not a spontaneous riot; it was an armed attempt by Hitler and the Kampfbund to enact specific demands of this platform amidst the chaos of 1923. Hover or click any point to reveal how ideological rhetoric translated into direct putschist action.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#F4EFEA] p-0.5 border border-[#2C302E]/15 shrink-0 self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#1B1E23] text-white shadow-xs'
                  : 'text-[#495057] hover:text-[#1B1E23]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid + Inspector Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: 25-Point Interactive Grid */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2.5">
            {points.map((point) => {
              const isFilteredIn = filteredPoints.some((p) => p.id === point.id);
              const isSelected = selectedPoint?.id === point.id;
              const isHovered = hoveredPoint?.id === point.id;
              const styles = getCategoryColor(point.category);

              return (
                <div
                  key={point.id}
                  onClick={() => onSelectPoint(isSelected ? null : point)}
                  onMouseEnter={() => onHoverPoint(point)}
                  onMouseLeave={() => onHoverPoint(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Point ${point.id}: ${point.title} (${point.category})`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectPoint(isSelected ? null : point);
                    }
                  }}
                  className={`relative p-3 border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#8B1E1E] bg-[#8B1E1E]/10 ring-2 ring-[#8B1E1E]/30 shadow-md'
                      : isHovered
                      ? 'border-[#1B1E23] bg-white shadow-sm'
                      : isFilteredIn
                      ? 'border-[#2C302E]/20 bg-[#FAF7F2] hover:border-[#1B1E23] hover:bg-white'
                      : 'border-[#2C302E]/10 bg-[#FAF7F2]/40 opacity-40 hover:opacity-80'
                  }`}
                >
                  {/* Point Number & Category Marker */}
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="font-mono text-xs font-bold text-[#1B1E23]">
                      #{point.id}
                    </span>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${styles.text}`}>
                      {point.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xs font-bold text-[#1B1E23] line-clamp-2 leading-tight mb-1">
                    {point.title}
                  </h3>

                  {/* Short summary snippet */}
                  <p className="text-[11px] text-[#495057] line-clamp-2 leading-snug">
                    {point.summary}
                  </p>

                  {/* Interactive Indicator for Point 25 inquiry trigger */}
                  {point.id === 25 && (
                    <div className="mt-2 pt-1 border-t border-[#8B1E1E]/20 flex items-center gap-1 text-[10px] text-[#8B1E1E] font-medium">
                      <Sparkles className="w-3 h-3" />
                      <span>Key Inquiry Prompt</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-[#6C757D] px-1">
            <div className="flex items-center gap-4">
              <span>Showing {filteredPoints.length} of 25 points</span>
              <span aria-hidden="true">·</span>
              <span>Click any card to pin historical detail</span>
            </div>
            {selectedPoint && (
              <button
                onClick={() => onSelectPoint(null)}
                className="text-xs text-[#8B1E1E] hover:underline font-medium"
              >
                Clear pinned point
              </button>
            )}
          </div>
        </div>

        {/* Right: Ideology-to-Action Deep-Dive Inspector */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white border border-[#2C302E]/20 p-5 shadow-xs sticky top-20">
          {activeFocus ? (
            <div className="space-y-4">
              <div className="border-b border-[#2C302E]/15 pb-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-[#8B1E1E]">
                    POINT #{activeFocus.id}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#6C757D]">
                    <span className="font-semibold uppercase tracking-wider text-[#1B1E23]">
                      {activeFocus.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>24 February 1920</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#1B1E23] tracking-tight">
                  {activeFocus.title}
                </h3>
              </div>

              {/* Full Text Excerpt */}
              <div className="bg-[#FAF7F2] p-3.5 border-l-2 border-[#8B1E1E]">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6C757D] mb-1">
                  Original 1920 Programme Text
                </div>
                <p className="text-xs italic text-[#1B1E23] leading-relaxed">
                  "{activeFocus.fullText}"
                </p>
              </div>

              {/* Historical Explanation */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B1E23] mb-1">
                  Pedagogical Meaning & Intent
                </h4>
                <p className="text-xs text-[#495057] leading-relaxed">
                  {activeFocus.explanation}
                </p>
              </div>

              {/* Real World Link (1923 Crisis & Munich Putsch) */}
              <div className="bg-[#8B1E1E]/5 p-3.5 border border-[#8B1E1E]/20">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#8B1E1E] uppercase tracking-wider mb-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Real-World Manifestation in 1923</span>
                </div>
                <p className="text-xs text-[#1B1E23] leading-relaxed font-medium">
                  {activeFocus.realWorldLink}
                </p>
              </div>

              {/* Related Timeline Events (Deep Links) */}
              {activeFocus.relatedEvents.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1B1E23] mb-2">
                    Connected Timeline Crisis Beats
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeFocus.relatedEvents.map((evtId) => (
                      <button
                        key={evtId}
                        onClick={() => onJumpToEvent(evtId)}
                        className="flex items-center gap-1 text-[11px] bg-[#FAF7F2] border border-[#2C302E]/20 px-2 py-1 text-[#1B1E23] hover:border-[#8B1E1E] hover:text-[#8B1E1E] transition-colors"
                      >
                        <span>View {evtId.replace('-', ' ')}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Inquiry Trigger */}
              {activeFocus.id === 25 && (
                <div className="pt-2">
                  <button
                    onClick={() => onLaunchInquiry('point-25')}
                    className="w-full py-2.5 px-3 bg-[#8B1E1E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#701616] transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Launch Inquiry: Bavarian Separatism Paradox</span>
                  </button>
                </div>
              )}

              {activeFocus.id === 2 && (
                <div className="pt-2">
                  <button
                    onClick={() => onLaunchInquiry('closing-window')}
                    className="w-full py-2.5 px-3 bg-[#1B1E23] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#8B1E1E] transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Inquiry: The 'Closing Window' Hypothesis</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="w-12 h-12 border-2 border-dashed border-[#2C302E]/30 mx-auto flex items-center justify-center text-[#6C757D]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1B1E23]">
                Select or Hover a Point
              </h3>
              <p className="text-xs text-[#495057] leading-relaxed max-w-xs mx-auto">
                Explore how the 1920 Nazi platform provided the ideological justification for the 1923 Beer Hall Putsch, hyperinflation agitation, and trial defense.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
