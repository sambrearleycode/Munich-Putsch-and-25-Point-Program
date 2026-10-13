import React, { useState } from 'react';
import { EVIDENCE_CARDS, HISTORIOGRAPHICAL_DEBATES, EvidenceCard } from '../data/historicalData';
import { Scale, ArrowRight, ArrowLeft, RefreshCw, Sparkles, BookOpen, CheckCircle, HelpCircle } from 'lucide-react';

interface EvidenceWorkbenchProps {
  cards: EvidenceCard[];
  strengthBucket: string[]; // card IDs
  weaknessBucket: string[]; // card IDs
  onMoveToStrength: (cardId: string) => void;
  onMoveToWeakness: (cardId: string) => void;
  onResetBuckets: () => void;
  onLaunchInquiry: (triggerId: string) => void;
}

export const EvidenceWorkbench: React.FC<EvidenceWorkbenchProps> = ({
  cards,
  strengthBucket,
  weaknessBucket,
  onMoveToStrength,
  onMoveToWeakness,
  onResetBuckets,
  onLaunchInquiry,
}) => {
  const [activeTab, setActiveTab] = useState<'workbench' | 'debates'>('workbench');
  const [selectedDebateId, setSelectedDebateId] = useState<number>(12);

  // Cards allocated
  const strengthCards = cards.filter((c) => strengthBucket.includes(c.id));
  const weaknessCards = cards.filter((c) => weaknessBucket.includes(c.id));
  const unallocatedCards = cards.filter(
    (c) => !strengthBucket.includes(c.id) && !weaknessBucket.includes(c.id)
  );

  const totalAllocated = strengthCards.length + weaknessCards.length;
  const strengthRatio = totalAllocated > 0 ? (strengthCards.length / totalAllocated) * 100 : 50;

  // Generate AQA-style thesis statement dynamically
  const generateAQAThesis = () => {
    if (totalAllocated === 0) {
      return "Allocate evidence cards into the Strength and Weakness/Luck buckets to synthesize a comprehensive, top-band AQA Level 5 thesis statement.";
    }

    if (strengthCards.length > weaknessCards.length + 3) {
      return `Assess the view: While the Weimar Republic suffered acute post-war crises, its survival beyond 1923 was fundamentally driven by resilient structural and republican fortitude. As evidenced by organized labor's decisive defense during the Kapp Putsch, Stresemann and Schacht's technocratic courage in halting hyperinflation, and Ebert's constitutional employment of Article 48, the democratic state possessed far greater administrative resolve than contemporaries recognized.`;
    }

    if (weaknessCards.length > strengthCards.length + 3) {
      return `Assess the view: The Weimar Republic was exceptionally fortunate to survive beyond 1923. The regime's persistence was not the consequence of organic democratic loyalty, but was predominantly sustained by the tactical ineptitude and internal fractures of its right-wing adversaries, paired with the narrow chronological window of economic stabilization. Deep-seated judicial treason, military ambivalence under Seeckt, and the permanent psychological destruction of middle-class savings left an irredeemably fragile institutional foundation.`;
    }

    return `Assess the view: The survival of the Weimar Republic beyond 1923 represents a precarious equilibrium between genuine crisis management and sheer structural fortune. While decisive interventions—most notably the Rentenmark currency stabilization and the firm stand of state police at the Feldherrnhalle—demonstrated institutional viability, the regime survived equally due to the uncoordinated amateurism of the Munich putschists and unmerited breathing space. Crucially, pervasive judicial leniency ('Justiz auf dem rechten Auge blind') ensured that the mortal enemies of democracy were merely reprieved, not vanquished.`;
  };

  const currentDebate =
    HISTORIOGRAPHICAL_DEBATES.find((d) => d.id === selectedDebateId) || HISTORIOGRAPHICAL_DEBATES[11];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2C302E]/15 pb-4">
        <div>
          <div className="text-xs uppercase tracking-widest font-semibold text-[#8B1E1E] mb-1">
            Facet C · Historiographical Evaluator & Essay Workbench
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1B1E23]">
            Weimar Survival: Resilience vs. Sheer Fortune
          </h2>
          <p className="text-sm text-[#495057] mt-1 max-w-3xl leading-relaxed">
            Engage directly with the core AQA Depth Study historiographical debate: <em>"The Weimar Republic was lucky to survive beyond 1923. Assess the validity of this view."</em> Categorize historical evidence, examine contrasting scholarly interpretations, and generate high-level analytical thesis models.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-[#F4EFEA] p-0.5 border border-[#2C302E]/15 shrink-0">
          <button
            onClick={() => setActiveTab('workbench')}
            className={`px-3 py-1.5 text-xs font-medium ${
              activeTab === 'workbench' ? 'bg-[#1B1E23] text-white shadow-xs' : 'text-[#495057] hover:text-[#1B1E23]'
            }`}
          >
            Evidence Workbench
          </button>
          <button
            onClick={() => setActiveTab('debates')}
            className={`px-3 py-1.5 text-xs font-medium ${
              activeTab === 'debates' ? 'bg-[#1B1E23] text-white shadow-xs' : 'text-[#495057] hover:text-[#1B1E23]'
            }`}
          >
            12 Historiographical Debates
          </button>
        </div>
      </div>

      {activeTab === 'workbench' ? (
        <div className="space-y-6">
          
          {/* Real-time Dynamic Thesis Generator Box */}
          <div className="bg-white border-2 border-[#1B1E23] p-5 shadow-xs">
            <div className="flex items-center justify-between gap-2 border-b border-[#2C302E]/15 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8B1E1E]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B1E23]">
                  Dynamic AQA Level 5 Thesis Generator
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="font-mono text-[#6C757D]">
                  Distribution: {strengthCards.length} Strength / {weaknessCards.length} Luck
                </span>
                <button
                  onClick={onResetBuckets}
                  title="Reset to default sorting"
                  className="flex items-center gap-1 text-[11px] text-[#8B1E1E] hover:underline"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Default</span>
                </button>
              </div>
            </div>

            <p className="text-sm font-serif italic text-[#1B1E23] leading-relaxed">
              "{generateAQAThesis()}"
            </p>

            {/* Ratio Balance Gauge */}
            <div className="mt-4 pt-3 border-t border-[#2C302E]/10 flex items-center gap-3 text-xs">
              <span className="font-semibold text-[#2E5A44] shrink-0">Democratic Strength ({strengthCards.length})</span>
              <div className="flex-1 h-2 bg-[#FAF7F2] border border-[#2C302E]/20 overflow-hidden flex">
                <div
                  className="h-full bg-[#2E5A44] transition-all"
                  style={{ width: `${strengthRatio}%` }}
                />
                <div
                  className="h-full bg-[#8B1E1E] transition-all"
                  style={{ width: `${100 - strengthRatio}%` }}
                />
              </div>
              <span className="font-semibold text-[#8B1E1E] shrink-0">Weakness / Fortune ({weaknessCards.length})</span>
            </div>
          </div>

          {/* Dual Buckets Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Bucket 1: Evidence of Weimar Strength */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const cardId = e.dataTransfer.getData('text/plain');
                if (cardId) onMoveToStrength(cardId);
              }}
              className="bg-white border border-[#2E5A44]/30 p-4 shadow-xs min-h-[380px] flex flex-col"
            >
              <div className="flex items-center justify-between border-b border-[#2E5A44]/20 pb-2.5 mb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E5A44]">
                    Bucket 1 · Institutional Resilience
                  </span>
                  <h4 className="text-base font-bold text-[#1B1E23]">
                    Evidence of Weimar Strength
                  </h4>
                </div>
                <span className="px-2 py-0.5 font-mono text-xs font-bold bg-[#2E5A44]/10 text-[#2E5A44]">
                  {strengthCards.length}
                </span>
              </div>

              {/* Cards in Strength Bucket */}
              <div className="space-y-2.5 flex-1">
                {strengthCards.map((card) => (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', card.id)}
                    className="p-3 bg-[#FAF7F2] border border-[#2C302E]/15 text-xs hover:border-[#1B1E23] transition-all cursor-grab active:cursor-grabbing group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-[#1B1E23] leading-snug">
                        {card.title}
                      </div>
                      <button
                        onClick={() => onMoveToWeakness(card.id)}
                        title="Move to Weakness/Luck"
                        className="text-[#6C757D] hover:text-[#8B1E1E] shrink-0 p-0.5"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-[#495057] mt-1 leading-relaxed">
                      {card.analyticalDetail}
                    </p>
                  </div>
                ))}

                {strengthCards.length === 0 && (
                  <div className="h-40 border border-dashed border-[#2E5A44]/30 flex items-center justify-center text-xs text-[#6C757D] p-4 text-center">
                    Drag cards here or click arrow to categorize under Democratic Strength
                  </div>
                )}
              </div>
            </div>

            {/* Bucket 2: Evidence of Weimar Weakness & Luck */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const cardId = e.dataTransfer.getData('text/plain');
                if (cardId) onMoveToWeakness(cardId);
              }}
              className="bg-white border border-[#8B1E1E]/30 p-4 shadow-xs min-h-[380px] flex flex-col"
            >
              <div className="flex items-center justify-between border-b border-[#8B1E1E]/20 pb-2.5 mb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1E1E]">
                    Bucket 2 · Fortuitous Survival
                  </span>
                  <h4 className="text-base font-bold text-[#1B1E23]">
                    Evidence of Weimar Weakness / Sheer Luck
                  </h4>
                </div>
                <span className="px-2 py-0.5 font-mono text-xs font-bold bg-[#8B1E1E]/10 text-[#8B1E1E]">
                  {weaknessCards.length}
                </span>
              </div>

              {/* Cards in Weakness Bucket */}
              <div className="space-y-2.5 flex-1">
                {weaknessCards.map((card) => (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', card.id)}
                    className="p-3 bg-[#FAF7F2] border border-[#2C302E]/15 text-xs hover:border-[#1B1E23] transition-all cursor-grab active:cursor-grabbing group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <button
                        onClick={() => onMoveToStrength(card.id)}
                        title="Move to Strength"
                        className="text-[#6C757D] hover:text-[#2E5A44] shrink-0 p-0.5"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                      <div className="font-bold text-[#1B1E23] leading-snug flex-1 text-right">
                        {card.title}
                      </div>
                    </div>
                    <p className="text-[11px] text-[#495057] mt-1 leading-relaxed">
                      {card.analyticalDetail}
                    </p>
                  </div>
                ))}

                {weaknessCards.length === 0 && (
                  <div className="h-40 border border-dashed border-[#8B1E1E]/30 flex items-center justify-center text-xs text-[#6C757D] p-4 text-center">
                    Drag cards here or click arrow to categorize under Weakness / Fortuitous Survival
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Unallocated cards tray (if any) */}
          {unallocatedCards.length > 0 && (
            <div className="bg-[#FAF7F2] p-4 border border-[#2C302E]/15 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#1B1E23]">
                Unallocated Evidence Cards ({unallocatedCards.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {unallocatedCards.map((card) => (
                  <div
                    key={card.id}
                    className="p-3 bg-white border border-[#2C302E]/15 text-xs space-y-2"
                  >
                    <div className="font-bold text-[#1B1E23]">{card.title}</div>
                    <p className="text-[11px] text-[#495057]">{card.summary}</p>
                    <div className="flex items-center justify-between pt-1 border-t border-[#2C302E]/10">
                      <button
                        onClick={() => onMoveToStrength(card.id)}
                        className="text-[10px] text-[#2E5A44] font-semibold hover:underline"
                      >
                        + Add to Strength
                      </button>
                      <button
                        onClick={() => onMoveToWeakness(card.id)}
                        className="text-[10px] text-[#8B1E1E] font-semibold hover:underline"
                      >
                        + Add to Weakness
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Essay Planning Action Prompt */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#FAF7F2] border border-[#2C302E]/15">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B1E23]">
                Ready to draft your AQA Depth Study essay?
              </h4>
              <p className="text-xs text-[#495057] mt-0.5">
                Use your current card distribution and thesis statement to prepare your formal examination plan.
              </p>
            </div>
            <button
              onClick={() => onLaunchInquiry('historiography-workbench')}
              className="px-4 py-2 bg-[#8B1E1E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#701616] transition-colors shrink-0 shadow-xs flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Open Guided Essay Plan</span>
            </button>
          </div>

        </div>
      ) : (
        /* The 12 Historiographical Debates Viewer */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Debate Selector Sidebar */}
          <div className="lg:col-span-4 bg-white border border-[#2C302E]/20 p-2 space-y-1">
            <div className="p-2 text-[10px] font-bold uppercase tracking-wider text-[#6C757D] border-b border-[#2C302E]/10">
              Select Curricular Debate Topic (1918–1923)
            </div>
            {HISTORIOGRAPHICAL_DEBATES.map((deb) => (
              <button
                key={deb.id}
                onClick={() => setSelectedDebateId(deb.id)}
                className={`w-full text-left p-2.5 text-xs transition-colors border ${
                  selectedDebateId === deb.id
                    ? 'bg-[#1B1E23] text-white border-[#1B1E23] font-medium'
                    : 'bg-[#FAF7F2] text-[#495057] border-[#2C302E]/10 hover:border-[#1B1E23] hover:text-[#1B1E23]'
                }`}
              >
                <div className="font-mono text-[10px] opacity-75">#{deb.id}</div>
                <div className="font-bold truncate">{deb.topic}</div>
              </button>
            ))}
          </div>

          {/* Active Debate Comparison Card */}
          <div className="lg:col-span-8 bg-white border border-[#2C302E]/20 p-6 space-y-6 shadow-xs">
            <div className="border-b border-[#2C302E]/15 pb-3">
              <span className="text-xs font-mono font-bold text-[#8B1E1E]">DEBATE TOPIC #{currentDebate.id}</span>
              <h3 className="text-xl font-bold text-[#1B1E23]">
                {currentDebate.topic}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Interpretation A */}
              <div className="bg-[#FAF7F2] p-4 border border-[#2C302E]/15 space-y-3">
                <div className="border-b border-[#2C302E]/10 pb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E5A44]">
                    Perspective A · {currentDebate.statementA.interpretation}
                  </span>
                  <p className="text-xs font-semibold text-[#1B1E23] mt-1 leading-snug">
                    "{currentDebate.statementA.text}"
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C757D] block mb-1">
                    Supporting Historical Evidence
                  </span>
                  <p className="text-xs text-[#495057] leading-relaxed">
                    {currentDebate.statementA.evidence}
                  </p>
                </div>
              </div>

              {/* Interpretation B */}
              <div className="bg-[#FAF7F2] p-4 border border-[#2C302E]/15 space-y-3">
                <div className="border-b border-[#2C302E]/10 pb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1E1E]">
                    Perspective B · {currentDebate.statementB.interpretation}
                  </span>
                  <p className="text-xs font-semibold text-[#1B1E23] mt-1 leading-snug">
                    "{currentDebate.statementB.text}"
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C757D] block mb-1">
                    Supporting Historical Evidence
                  </span>
                  <p className="text-xs text-[#495057] leading-relaxed">
                    {currentDebate.statementB.evidence}
                  </p>
                </div>
              </div>

            </div>

            {/* Synthesis prompt */}
            <div className="bg-[#FAF7F2] p-4 border-l-2 border-[#1B1E23] text-xs">
              <strong className="text-[#1B1E23] block mb-1">AQA Evaluative Strategy:</strong>
              <p className="text-[#495057] leading-relaxed">
                High-scoring A-Level candidates do not simply declare one viewpoint 'correct'; they assess the <em>criteria of validity</em> (e.g. short-term tactical survival vs. long-term democratic viability) and weigh how economic, political, and social forces intersected.
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
