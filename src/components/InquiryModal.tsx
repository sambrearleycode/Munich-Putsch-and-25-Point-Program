import React, { useState, useEffect } from 'react';
import { InquiryPrompt } from '../data/historicalData';
import { X, HelpCircle, CheckCircle, BookOpen, Award, Save } from 'lucide-react';

interface InquiryModalProps {
  prompt: InquiryPrompt | null;
  onClose: () => void;
  savedAnswer: string;
  onSaveAnswer: (promptId: string, answer: string) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  prompt,
  onClose,
  savedAnswer,
  onSaveAnswer,
}) => {
  const [studentText, setStudentText] = useState<string>('');
  const [showModelGuidance, setShowModelGuidance] = useState<boolean>(false);
  const [saveConfirmation, setSaveConfirmation] = useState<boolean>(false);

  useEffect(() => {
    if (prompt) {
      setStudentText(savedAnswer || '');
      setShowModelGuidance(false);
      setSaveConfirmation(false);
    }
  }, [prompt, savedAnswer]);

  if (!prompt) return null;

  const handleSave = () => {
    onSaveAnswer(prompt.id, studentText);
    setSaveConfirmation(true);
    setTimeout(() => setSaveConfirmation(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white border-2 border-[#1B1E23] max-w-3xl w-full my-8 p-6 md:p-8 shadow-2xl relative text-left"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-1.5 text-[#6C757D] hover:text-[#1B1E23] transition-colors border border-transparent hover:border-[#2C302E]/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-[#2C302E]/15 pb-4 mb-5 pr-8">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8B1E1E] uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>AQA Component 2 · Depth Study Inquiry</span>
          </div>
          <h3 id="inquiry-title" className="text-xl md:text-2xl font-bold text-[#1B1E23] leading-snug">
            {prompt.title}
          </h3>
          <p className="text-xs text-[#6C757D] mt-1">
            {prompt.context}
          </p>
        </div>

        {/* Evaluative Question Focus */}
        <div className="bg-[#FAF7F2] p-4 border-l-2 border-[#8B1E1E] mb-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1E1E] block mb-1">
            Core Inquiry Question
          </span>
          <p className="text-base font-semibold text-[#1B1E23] leading-relaxed">
            "{prompt.question}"
          </p>
        </div>

        {/* Interactive Student Workspace */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1B1E23] mb-1.5">
              <span>Your Evaluative Argument & Evidence (AO1 & AO2)</span>
              {saveConfirmation && (
                <span className="text-[#2E5A44] flex items-center gap-1 font-normal capitalize">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Saved to Evidence Map
                </span>
              )}
            </div>
            <textarea
              value={studentText}
              onChange={(e) => setStudentText(e.target.value)}
              placeholder="Structure your analysis: State your thesis, deploy specific dates and statistics from the organizer, evaluate conflicting factors, and conclude with a substantiated judgment..."
              rows={6}
              className="w-full p-3.5 text-xs bg-[#FAF7F2] border border-[#2C302E]/20 focus:border-[#1B1E23] focus:bg-white focus:outline-none leading-relaxed font-sans resize-y"
            />
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#1B1E23] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#8B1E1E] transition-colors shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Response</span>
              </button>
              <button
                onClick={() => setShowModelGuidance(!showModelGuidance)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider border border-[#2C302E]/20 hover:border-[#1B1E23] transition-colors text-[#1B1E23]"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#8B1E1E]" />
                <span>{showModelGuidance ? 'Hide Marking Criteria' : 'Inspect AQA Marking Guidance'}</span>
              </button>
            </div>

            <span className="text-[11px] font-mono text-[#6C757D]">
              {studentText.trim().split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          {/* Collapsible AQA Guidance & Model Arguments */}
          {showModelGuidance && (
            <div className="mt-4 p-4 bg-[#FAF7F2] border border-[#2C302E]/15 space-y-4 text-xs animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E1E] border-b border-[#2C302E]/10 pb-2">
                <Award className="w-4 h-4" />
                <span>Examiner Assessment Rubric (AQA Level 5 Standard)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 border border-[#2C302E]/10">
                  <strong className="text-[#1B1E23] block mb-1">AO1: Knowledge & Context</strong>
                  <p className="text-[#495057] leading-relaxed">{prompt.aqaGuidance.ao1}</p>
                </div>
                <div className="bg-white p-3 border border-[#2C302E]/10">
                  <strong className="text-[#1B1E23] block mb-1">AO2: Analysis & Evaluation</strong>
                  <p className="text-[#495057] leading-relaxed">{prompt.aqaGuidance.ao2}</p>
                </div>
              </div>

              <div>
                <strong className="text-[#1B1E23] block mb-1.5">Model Analytical Anchor Points:</strong>
                <ul className="list-disc pl-4 space-y-1 text-[#495057]">
                  {prompt.aqaGuidance.modelPoints.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
