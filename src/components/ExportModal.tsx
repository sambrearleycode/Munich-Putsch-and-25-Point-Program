import React, { useState } from 'react';
import { EvidenceCard, InquiryPrompt } from '../data/historicalData';
import { X, Copy, Download, Printer, CheckCircle } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  strengthCards: EvidenceCard[];
  weaknessCards: EvidenceCard[];
  thesisStatement: string;
  studentAnswers: Record<string, string>;
  inquiryPrompts: InquiryPrompt[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  strengthCards,
  weaknessCards,
  thesisStatement,
  studentAnswers,
  inquiryPrompts,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  // Build markdown text representation
  const generateMarkdownReport = () => {
    return `# Weimar Republic & Nazi Emergence (1919-1924): Student Evidence Map & Essay Brief

**Topic:** "The Weimar Republic was lucky to survive beyond 1923. Assess the validity of this view."
**Date:** ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}

---

## 1. Dynamic Synthesized Thesis Statement
> "${thesisStatement}"

---

## 2. Historiographical Evidence Workbench

### Bucket 1: Evidence of Weimar Strength & Resilience (${strengthCards.length} items)
${strengthCards
  .map(
    (c, i) =>
      `${i + 1}. **${c.title}** (${c.dateRange})
   - *Detail:* ${c.analyticalDetail}`
  )
  .join('\n\n')}

### Bucket 2: Evidence of Weimar Weakness & Sheer Luck (${weaknessCards.length} items)
${weaknessCards
  .map(
    (c, i) =>
      `${i + 1}. **${c.title}** (${c.dateRange})
   - *Detail:* ${c.analyticalDetail}`
  )
  .join('\n\n')}

---

## 3. Institutional Pathology: 1924 Munich Trial Audit
- **Concept:** *Justiz auf dem rechten Auge blind* (Justice blind in the right eye)
- **Treason Statute (§81):** Mandated execution or life imprisonment; Hitler received 5 years, served only 9 months in Landsberg Fortress.
- **Foreigner Deportation (§9):** Mandated expulsion of foreign traitors; Austrian-citizen Hitler spared by Judge Neithardt due to "pure German sentiment."
- **Gumbel Statistics (1919-1922):** 354 right-wing murders (0 executions, avg. 4 months) vs 22 left-wing murders (10 executions, avg. 15 years).
- **Consequence:** Shift to *Legalitätstaktik* (Legality tactic) to subvert democracy from within.

---

## 4. Student Inquiry Prompts & Evaluative Notes
${inquiryPrompts
  .map((p) => {
    const ans = studentAnswers[p.id];
    return `### ${p.title}
**Inquiry:** *${p.question}*
**Student Analysis:**
${ans && ans.trim().length > 0 ? ans : '*(No student response recorded yet)*'}
`;
  })
  .join('\n---\n')}
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdownReport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = generateMarkdownReport();
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Weimar_1919_1924_Evidence_Map.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white border-2 border-[#1B1E23] max-w-4xl w-full my-8 p-6 md:p-8 shadow-2xl relative text-left"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close export dialog"
          className="absolute top-4 right-4 p-1.5 text-[#6C757D] hover:text-[#1B1E23] transition-colors border border-transparent hover:border-[#2C302E]/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-[#2C302E]/15 pb-4 mb-5 pr-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono font-bold text-[#8B1E1E] uppercase tracking-wider mb-1">
              AQA Depth Study Revision & Planning Export
            </div>
            <h3 id="export-modal-title" className="text-xl md:text-2xl font-bold text-[#1B1E23]">
              My Evidence Map & Essay Plan
            </h3>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border border-[#2C302E]/20 hover:border-[#1B1E23] transition-colors"
            >
              {copied ? <CheckCircle className="w-3.5 h-3.5 text-[#2E5A44]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-[#1B1E23] text-white hover:bg-[#8B1E1E] transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .MD</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border border-[#2C302E]/20 hover:border-[#1B1E23] transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Report Preview Container */}
        <div className="max-h-[60vh] overflow-y-auto bg-[#FAF7F2] p-5 border border-[#2C302E]/15 font-mono text-xs text-[#1B1E23] leading-relaxed space-y-5">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#6C757D]">DRAFT THESIS</div>
            <p className="font-serif italic text-sm mt-1 text-[#1B1E23]">
              "{thesisStatement}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[#2C302E]/10">
            <div>
              <div className="font-bold text-[#2E5A44] mb-1">
                DEMOCRATIC STRENGTH ({strengthCards.length})
              </div>
              <ul className="list-disc pl-4 space-y-1 text-[#495057] font-sans">
                {strengthCards.map((c) => (
                  <li key={c.id}>
                    <strong>{c.title}:</strong> {c.analyticalDetail}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-bold text-[#8B1E1E] mb-1">
                WEAKNESS / LUCK ({weaknessCards.length})
              </div>
              <ul className="list-disc pl-4 space-y-1 text-[#495057] font-sans">
                {weaknessCards.map((c) => (
                  <li key={c.id}>
                    <strong>{c.title}:</strong> {c.analyticalDetail}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-[#2C302E]/10">
            <div className="font-bold text-[#1B1E23] mb-1">
              STUDENT INQUIRY RESPONSES
            </div>
            <div className="space-y-3 font-sans">
              {inquiryPrompts.map((p) => (
                <div key={p.id} className="bg-white p-3 border border-[#2C302E]/10 text-xs">
                  <div className="font-bold text-[#8B1E1E]">{p.title}</div>
                  <div className="text-[#6C757D] text-[11px] mb-1.5">{p.question}</div>
                  <div className="text-[#1B1E23] italic">
                    {studentAnswers[p.id] ? studentAnswers[p.id] : '*(No student response written yet)*'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
