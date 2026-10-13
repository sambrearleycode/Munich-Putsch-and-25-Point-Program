import React, { useState } from 'react';
import { JUDICIAL_BIAS_DATA, JudicialBiasComparison } from '../data/historicalData';
import { Scale, AlertCircle, BookOpen, ShieldX, HelpCircle, CheckCircle } from 'lucide-react';

interface JudicialBiasProps {
  onLaunchInquiry: (triggerId: string) => void;
}

export const JudicialBias: React.FC<JudicialBiasProps> = ({ onLaunchInquiry }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(JUDICIAL_BIAS_DATA[0].id);

  const activeCase = JUDICIAL_BIAS_DATA.find((c) => c.id === selectedCaseId) || JUDICIAL_BIAS_DATA[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2C302E]/15 pb-4">
        <div>
          <div className="text-xs uppercase tracking-widest font-semibold text-[#8B1E1E] mb-1">
            Judicial Pathology & Institutional Decay
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1B1E23]">
            "Justiz auf dem rechten Auge blind" (Munich Trial, 1924)
          </h2>
          <p className="text-sm text-[#495057] mt-1 max-w-3xl leading-relaxed">
            The German judicial elite never accepted the Weimar Republic. Explore how Presiding Judge Georg Neithardt turned an armed treason trial into a national coronation for Adolf Hitler, while crushing leftist dissidents with merciless severity.
          </p>
        </div>

        <button
          onClick={() => onLaunchInquiry('trial-1924')}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#8B1E1E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#701616] transition-colors shrink-0 shadow-xs"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Launch Legalitätstaktik Inquiry</span>
        </button>
      </div>

      {/* Emil Gumbel Statistical Callout Banner */}
      <div className="bg-[#1B1E23] text-white p-5 border border-[#1B1E23] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-white/15">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#D4A373]" />
            <h3 className="text-sm font-bold uppercase tracking-wider">
              The Statistical Reality: Emil Gumbel’s Weimar Justice Audit (1919–1922)
            </h3>
          </div>
          <span className="text-xs text-[#D4A373] font-mono">
            Source: "Vier Jahre politischer Mord" (1922)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-bold text-[#FF8A8A]">
              <span>Right-Wing Political Assassinations</span>
              <span className="font-mono text-base">354 murders</span>
            </div>
            <div className="space-y-1 text-slate-300">
              <div className="flex justify-between py-1 border-b border-white/10">
                <span>Death Sentences Passed:</span>
                <span className="font-mono font-bold text-white">0</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span>Severe Sentences / Life Imprisonment:</span>
                <span className="font-mono font-bold text-white">1</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span>Average Prison Time Served:</span>
                <span className="font-mono font-bold text-[#FF8A8A]">4 months</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Acquittals / Unprosecuted:</span>
                <span className="font-mono font-bold text-white">326 (92%)</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-bold text-[#8CE99A]">
              <span>Left-Wing Political Assassinations</span>
              <span className="font-mono text-base">22 murders</span>
            </div>
            <div className="space-y-1 text-slate-300">
              <div className="flex justify-between py-1 border-b border-white/10">
                <span>Death Sentences Passed & Executed:</span>
                <span className="font-mono font-bold text-white">10</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span>Severe Sentences / Hard Labor:</span>
                <span className="font-mono font-bold text-white">17</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span>Average Prison Time Served:</span>
                <span className="font-mono font-bold text-white">15 years</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Acquittals / Unprosecuted:</span>
                <span className="font-mono font-bold text-white">0 (0%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Legal Breakdown Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 bg-[#FAF7F2] p-1.5 border border-[#2C302E]/15">
        {JUDICIAL_BIAS_DATA.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedCaseId(item.id)}
            className={`p-2 text-left text-xs transition-all border ${
              selectedCaseId === item.id
                ? 'bg-[#8B1E1E] text-white border-[#8B1E1E] font-medium shadow-xs'
                : 'bg-white text-[#495057] border-[#2C302E]/15 hover:border-[#1B1E23] hover:text-[#1B1E23]'
            }`}
          >
            <div className="font-bold truncate">{item.aspect}</div>
          </button>
        ))}
      </div>

      {/* Case Contrast Card */}
      <div className="bg-white border border-[#2C302E]/20 p-5 md:p-6 shadow-xs space-y-6">
        <div className="border-b border-[#2C302E]/15 pb-3">
          <span className="text-xs font-mono font-bold text-[#8B1E1E]">LEGAL PATHOLOGY FOCUS</span>
          <h3 className="text-xl font-bold text-[#1B1E23] tracking-tight">
            {activeCase.aspect}
          </h3>
        </div>

        {/* 3-Column Comparative Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Statutory Standard */}
          <div className="bg-[#FAF7F2] p-4 border border-[#2C302E]/15">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1B1E23] mb-2 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-[#1B1E23]" />
              <span>Constitutional Statute</span>
            </div>
            <p className="text-xs text-[#495057] leading-relaxed">
              {activeCase.legalStandard}
            </p>
          </div>

          {/* Hitler & Right-Wing Treatment */}
          <div className="bg-[#8B1E1E]/5 p-4 border border-[#8B1E1E]/30">
            <div className="text-xs font-bold uppercase tracking-wider text-[#8B1E1E] mb-2 flex items-center gap-1.5">
              <ShieldX className="w-3.5 h-3.5 text-[#8B1E1E]" />
              <span>Right-Wing Reality (Hitler / Neithardt)</span>
            </div>
            <p className="text-xs text-[#1B1E23] font-medium leading-relaxed">
              {activeCase.hitlerTreatment}
            </p>
          </div>

          {/* Left-Wing Contrast */}
          <div className="bg-[#FAF7F2] p-4 border border-[#2C302E]/15">
            <div className="text-xs font-bold uppercase tracking-wider text-[#2C302E] mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-[#6C757D]" />
              <span>Left-Wing Reality (Spartacists / KPD)</span>
            </div>
            <p className="text-xs text-[#495057] leading-relaxed">
              {activeCase.leftWingContrast}
            </p>
          </div>
        </div>

        {/* Historiographical Significance */}
        <div className="bg-[#FAF7F2] p-4 border-l-2 border-[#8B1E1E]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B1E1E] mb-1">
            Historical Significance for Weimar Democracy
          </h4>
          <p className="text-xs text-[#1B1E23] leading-relaxed">
            {activeCase.historicalSignificance}
          </p>
        </div>

        {/* Legalitätstaktik Explanatory Box */}
        <div className="border border-[#2C302E]/15 p-4 bg-[#FAF7F2]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B1E23] mb-1 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#8B1E1E]" />
            <span>The Birth of Legalitätstaktik (The "Legality Tactic")</span>
          </h4>
          <p className="text-xs text-[#495057] leading-relaxed">
            While serving his 9-month sentence in Landsberg Fortress, Hitler recognized that armed insurrection against the state forces would always end in disaster at the barricades. Instead, the Nazis resolved to enter the Reichstag, exploit the democratic constitution, and use elections to legally obtain power and dismantle the Republic from the inside.
          </p>
          <div className="mt-2 text-xs italic text-[#1B1E23]">
            "If outvoting them takes longer than outshooting them, at least the results are guaranteed by their own constitution." — Adolf Hitler, 1924
          </div>
        </div>
      </div>
    </div>
  );
};
