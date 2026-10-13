import React, { useState, useEffect } from 'react';
import {
  IDEOLOGY_POINTS,
  CRISIS_CHRONICLE,
  EVIDENCE_CARDS,
  INQUIRY_PROMPTS,
  IdeologyPoint,
  CrisisEvent,
} from './data/historicalData';
import { Navbar } from './components/Navbar';
import { FilterBar, ThemeType } from './components/FilterBar';
import { SynopticOverview } from './components/SynopticOverview';
import { IdeologyMatrix } from './components/IdeologyMatrix';
import { CrisisTimeline } from './components/CrisisTimeline';
import { PutschBeats } from './components/PutschBeats';
import { JudicialBias } from './components/JudicialBias';
import { EvidenceWorkbench } from './components/EvidenceWorkbench';
import { InquiryModal } from './components/InquiryModal';
import { ExportModal } from './components/ExportModal';
import { GitHubModal } from './components/GitHubModal';

export default function App() {
  // Navigation View
  const [activeView, setActiveView] = useState<
    'synoptic' | 'matrix' | 'timeline' | 'putsch' | 'trial' | 'workbench'
  >('synoptic');

  // Deep Link Filters
  const [activeTheme, setActiveTheme] = useState<ThemeType>('All');
  const [highlightedActor, setHighlightedActor] = useState<string | null>(null);

  // Selection states
  const [selectedPoint, setSelectedPoint] = useState<IdeologyPoint | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<IdeologyPoint | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CrisisEvent | null>(null);

  // Spark Animation ("Closing Window")
  const [sparkActive, setSparkActive] = useState<boolean>(false);

  // Dynamic Stability Meter (1-10)
  const [stabilityIndex, setStabilityIndex] = useState<number>(3);

  // Historiography Evidence Buckets (Default starting distribution)
  const [strengthBucket, setStrengthBucket] = useState<string[]>([
    'ev-trade-union-strike',
    'ev-stresemann-rentenmark',
    'ev-ebert-article-48',
    'ev-police-feldherrnhalle',
    'ev-dawes-plan',
    'ev-communist-defeat',
  ]);

  const [weaknessBucket, setWeaknessBucket] = useState<string[]>([
    'ev-judicial-leniency',
    'ev-seeckt-army-neutrality',
    'ev-bavarian-sanctuary',
    'ev-putschist-blunders',
    'ev-mittelstand-trauma',
    'ev-dolchstoss-versailles',
    'ev-proportional-instability',
    'ev-narrow-timing-window',
  ]);

  // Tutor-in-the-Code Inquiries
  const [activeInquiryId, setActiveInquiryId] = useState<string | null>(null);
  const [studentAnswers, setStudentAnswers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('weimar_student_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Export Modal
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);
  const [gitHubModalOpen, setGitHubModalOpen] = useState<boolean>(false);

  // Update stability index when an event is selected
  useEffect(() => {
    if (selectedEvent) {
      setStabilityIndex(selectedEvent.stabilityScore);
    }
  }, [selectedEvent]);

  // Save student answers
  const handleSaveAnswer = (promptId: string, answer: string) => {
    const updated = { ...studentAnswers, [promptId]: answer };
    setStudentAnswers(updated);
    try {
      localStorage.setItem('weimar_student_answers', JSON.stringify(updated));
    } catch {
      // storage unavailable
    }
  };

  // Trigger Closing Window Spark
  const handleTriggerSpark = () => {
    setSparkActive(true);
    setStabilityIndex(2); // acute crisis moment
    setActiveView('timeline');

    // Smooth scroll down to stresemann resistance event
    setTimeout(() => {
      const el = document.getElementById('event-stresemann-resistance');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);

    // Timeout spark after 10s if undisturbed
    setTimeout(() => {
      setSparkActive(false);
    }, 12000);
  };

  // Jump from point to event
  const handleJumpToEvent = (eventId: string) => {
    const evt = CRISIS_CHRONICLE.find((e) => e.id === eventId);
    if (evt) {
      setSelectedEvent(evt);
      setStabilityIndex(evt.stabilityScore);
    }
    setActiveView('timeline');
    setTimeout(() => {
      const el = document.getElementById(`event-${eventId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Move cards between buckets
  const handleMoveToStrength = (cardId: string) => {
    setWeaknessBucket((prev) => prev.filter((id) => id !== cardId));
    if (!strengthBucket.includes(cardId)) {
      setStrengthBucket((prev) => [...prev, cardId]);
    }
  };

  const handleMoveToWeakness = (cardId: string) => {
    setStrengthBucket((prev) => prev.filter((id) => id !== cardId));
    if (!weaknessBucket.includes(cardId)) {
      setWeaknessBucket((prev) => [...prev, cardId]);
    }
  };

  const handleResetBuckets = () => {
    setStrengthBucket([
      'ev-trade-union-strike',
      'ev-stresemann-rentenmark',
      'ev-ebert-article-48',
      'ev-police-feldherrnhalle',
      'ev-dawes-plan',
      'ev-communist-defeat',
    ]);
    setWeaknessBucket([
      'ev-judicial-leniency',
      'ev-seeckt-army-neutrality',
      'ev-bavarian-sanctuary',
      'ev-putschist-blunders',
      'ev-mittelstand-trauma',
      'ev-dolchstoss-versailles',
      'ev-proportional-instability',
      'ev-narrow-timing-window',
    ]);
  };

  // Launch inquiry modal
  const handleLaunchInquiry = (triggerId: string) => {
    let target = INQUIRY_PROMPTS.find((p) => p.trigger === triggerId);
    if (!target) {
      target = INQUIRY_PROMPTS.find((p) => p.id === triggerId) || INQUIRY_PROMPTS[0];
    }
    setActiveInquiryId(target.id);
  };

  const activeInquiryPrompt = INQUIRY_PROMPTS.find((p) => p.id === activeInquiryId) || null;

  // Active thesis calculation for export
  const currentStrengthCards = EVIDENCE_CARDS.filter((c) => strengthBucket.includes(c.id));
  const currentWeaknessCards = EVIDENCE_CARDS.filter((c) => weaknessBucket.includes(c.id));

  const getComputedThesis = () => {
    if (currentStrengthCards.length > currentWeaknessCards.length + 3) {
      return "Assess the view: While the Weimar Republic suffered acute post-war crises, its survival beyond 1923 was fundamentally driven by resilient structural and republican fortitude. As evidenced by organized labor's decisive defense during the Kapp Putsch, Stresemann and Schacht's technocratic courage in halting hyperinflation, and Ebert's constitutional employment of Article 48, the democratic state possessed far greater administrative resolve than contemporaries recognized.";
    }
    if (currentWeaknessCards.length > currentStrengthCards.length + 3) {
      return "Assess the view: The Weimar Republic was exceptionally fortunate to survive beyond 1923. The regime's persistence was not the consequence of organic democratic loyalty, but was predominantly sustained by the tactical ineptitude and internal fractures of its right-wing adversaries, paired with the narrow chronological window of economic stabilization. Deep-seated judicial treason, military ambivalence under Seeckt, and the permanent psychological destruction of middle-class savings left an irredeemably fragile institutional foundation.";
    }
    return "Assess the view: The survival of the Weimar Republic beyond 1923 represents a precarious equilibrium between genuine crisis management and sheer structural fortune. While decisive interventions—most notably the Rentenmark currency stabilization and the firm stand of state police at the Feldherrnhalle—demonstrated institutional viability, the regime survived equally due to the uncoordinated amateurism of the Munich putschists and unmerited breathing space. Crucially, pervasive judicial leniency ('Justiz auf dem rechten Auge blind') ensured that the mortal enemies of democracy were merely reprieved, not vanquished.";
  };

  const allAvailableActors = [
    'Hitler',
    'Ebert',
    'Stresemann',
    'Ludendorff',
    'von Kahr',
    'von Lossow',
    'Seeckt',
    'Röhm',
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#1E232A] flex flex-col font-sans">
      
      {/* Zone 1, 2, 3 Strict Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenExport={() => setExportModalOpen(true)}
        onOpenGitHub={() => setGitHubModalOpen(true)}
      />

      {/* Reactive Deep Link Filter Toolbar */}
      <FilterBar
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme}
        highlightedActor={highlightedActor}
        setHighlightedActor={setHighlightedActor}
        stabilityIndex={stabilityIndex}
        availableActors={allAvailableActors}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6 md:py-8">
        {activeView === 'synoptic' && (
          <SynopticOverview
            selectedPoint={selectedPoint}
            onSelectPoint={setSelectedPoint}
            selectedEvent={selectedEvent}
            onSelectEvent={setSelectedEvent}
            activeTheme={activeTheme}
            highlightedActor={highlightedActor}
            sparkActive={sparkActive}
            onTriggerSpark={handleTriggerSpark}
            onNavigateToView={setActiveView}
            onLaunchInquiry={handleLaunchInquiry}
            stabilityIndex={stabilityIndex}
          />
        )}

        {activeView === 'matrix' && (
          <IdeologyMatrix
            points={IDEOLOGY_POINTS}
            selectedPoint={selectedPoint}
            onSelectPoint={setSelectedPoint}
            hoveredPoint={hoveredPoint}
            onHoverPoint={setHoveredPoint}
            activeTheme={activeTheme}
            highlightedActor={highlightedActor}
            onJumpToEvent={handleJumpToEvent}
            onLaunchInquiry={handleLaunchInquiry}
          />
        )}

        {activeView === 'timeline' && (
          <CrisisTimeline
            events={CRISIS_CHRONICLE}
            selectedEvent={selectedEvent}
            onSelectEvent={setSelectedEvent}
            activeTheme={activeTheme}
            highlightedActor={highlightedActor}
            sparkActive={sparkActive}
            onTriggerSpark={handleTriggerSpark}
            onLaunchInquiry={handleLaunchInquiry}
          />
        )}

        {activeView === 'putsch' && (
          <PutschBeats
            onLaunchInquiry={handleLaunchInquiry}
            highlightedActor={highlightedActor}
          />
        )}

        {activeView === 'trial' && (
          <JudicialBias onLaunchInquiry={handleLaunchInquiry} />
        )}

        {activeView === 'workbench' && (
          <EvidenceWorkbench
            cards={EVIDENCE_CARDS}
            strengthBucket={strengthBucket}
            weaknessBucket={weaknessBucket}
            onMoveToStrength={handleMoveToStrength}
            onMoveToWeakness={handleMoveToWeakness}
            onResetBuckets={handleResetBuckets}
            onLaunchInquiry={handleLaunchInquiry}
          />
        )}
      </main>

      {/* Tutor-in-the-Code Modal Overlay */}
      <InquiryModal
        prompt={activeInquiryPrompt}
        onClose={() => setActiveInquiryId(null)}
        savedAnswer={activeInquiryPrompt ? studentAnswers[activeInquiryPrompt.id] || '' : ''}
        onSaveAnswer={handleSaveAnswer}
      />

      {/* Export / Revision Evidence Map Modal */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        strengthCards={currentStrengthCards}
        weaknessCards={currentWeaknessCards}
        thesisStatement={getComputedThesis()}
        studentAnswers={studentAnswers}
        inquiryPrompts={INQUIRY_PROMPTS}
      />

      {/* GitHub Repository Export Modal */}
      <GitHubModal
        isOpen={gitHubModalOpen}
        onClose={() => setGitHubModalOpen(false)}
      />

      {/* Bauhaus Weimar Modernist Minimal Footer */}
      <footer className="border-t border-[#2C302E]/15 bg-[#FAF7F2] py-6 px-4 md:px-8 mt-12 text-xs text-[#6C757D]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#1B1E23]">
              The Weimar Crisis & Nazi Emergence (1919–1924)
            </span>
            <span aria-hidden="true">·</span>
            <span>AQA Component 2 Depth Study Digital Synoptic Organizer</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLaunchInquiry('historiography-workbench')}
              className="hover:text-[#8B1E1E] transition-colors"
            >
              Essay Planning Rubric
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setGitHubModalOpen(true)}
              className="hover:text-[#8B1E1E] transition-colors font-medium text-[#1B1E23]"
            >
              GitHub Export
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setExportModalOpen(true)}
              className="hover:text-[#8B1E1E] transition-colors font-medium text-[#1B1E23]"
            >
              Export Evidence Map
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
