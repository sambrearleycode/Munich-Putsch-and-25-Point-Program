import React from 'react';
import { Download, Compass, Scale, GitCommit, FileText, Landmark, Github } from 'lucide-react';

interface NavbarProps {
  activeView: 'synoptic' | 'matrix' | 'timeline' | 'putsch' | 'trial' | 'workbench';
  setActiveView: (view: 'synoptic' | 'matrix' | 'timeline' | 'putsch' | 'trial' | 'workbench') => void;
  onOpenExport: () => void;
  onOpenGitHub: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  onOpenExport,
  onOpenGitHub,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#F9F6F0]/95 backdrop-blur-md border-b border-[#2C302E]/15 px-4 md:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-none border-2 border-[#1B1E23] bg-[#8B1E1E] flex items-center justify-center text-[#F9F6F0] font-bold text-sm tracking-wider shadow-sm">
            W
          </div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('synoptic');
            }}
            className="text-base md:text-lg font-bold tracking-tight text-[#1B1E23] whitespace-nowrap shrink-0 hover:text-[#8B1E1E] transition-colors"
          >
            Weimar Synoptic Organizer
          </a>
        </div>

        {/* Zone 2: 4–5 nav links, concise labels, single-line text links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#495057]">
          <button
            onClick={() => setActiveView('synoptic')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeView === 'synoptic'
                ? 'text-[#8B1E1E] font-semibold border-b-2 border-[#8B1E1E]'
                : 'hover:text-[#1B1E23]'
            }`}
          >
            Synoptic Overview
          </button>
          <button
            onClick={() => setActiveView('matrix')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeView === 'matrix'
                ? 'text-[#8B1E1E] font-semibold border-b-2 border-[#8B1E1E]'
                : 'hover:text-[#1B1E23]'
            }`}
          >
            25 Points Matrix
          </button>
          <button
            onClick={() => setActiveView('timeline')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeView === 'timeline'
                ? 'text-[#8B1E1E] font-semibold border-b-2 border-[#8B1E1E]'
                : 'hover:text-[#1B1E23]'
            }`}
          >
            Crisis & Timeline
          </button>
          <button
            onClick={() => setActiveView('putsch')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeView === 'putsch'
                ? 'text-[#8B1E1E] font-semibold border-b-2 border-[#8B1E1E]'
                : 'hover:text-[#1B1E23]'
            }`}
          >
            Munich Putsch (1923)
          </button>
          <button
            onClick={() => setActiveView('trial')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeView === 'trial'
                ? 'text-[#8B1E1E] font-semibold border-b-2 border-[#8B1E1E]'
                : 'hover:text-[#1B1E23]'
            }`}
          >
            1924 Trial Bias
          </button>
          <button
            onClick={() => setActiveView('workbench')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeView === 'workbench'
                ? 'text-[#8B1E1E] font-semibold border-b-2 border-[#8B1E1E]'
                : 'hover:text-[#1B1E23]'
            }`}
          >
            Evidence Workbench
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenGitHub}
            title="How to export code to GitHub"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1B1E23] hover:text-[#8B1E1E] bg-[#FAF7F2] hover:bg-white border border-[#2C302E]/20 transition-all whitespace-nowrap shrink-0"
          >
            <Github className="w-3.5 h-3.5 text-[#8B1E1E]" />
            <span className="hidden sm:inline">Export to GitHub</span>
          </button>
          <button
            onClick={onOpenExport}
            className="flex items-center gap-2 px-3.5 md:px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#F9F6F0] bg-[#1B1E23] hover:bg-[#8B1E1E] transition-all whitespace-nowrap shrink-0 shadow-sm border border-[#1B1E23]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Evidence Map</span>
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto pt-3 border-t border-[#2C302E]/10 mt-2 text-xs">
        <button
          onClick={() => setActiveView('synoptic')}
          className={`px-2.5 py-1 whitespace-nowrap shrink-0 ${
            activeView === 'synoptic' ? 'bg-[#1B1E23] text-white font-medium' : 'text-[#495057]'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveView('matrix')}
          className={`px-2.5 py-1 whitespace-nowrap shrink-0 ${
            activeView === 'matrix' ? 'bg-[#1B1E23] text-white font-medium' : 'text-[#495057]'
          }`}
        >
          25 Points
        </button>
        <button
          onClick={() => setActiveView('timeline')}
          className={`px-2.5 py-1 whitespace-nowrap shrink-0 ${
            activeView === 'timeline' ? 'bg-[#1B1E23] text-white font-medium' : 'text-[#495057]'
          }`}
        >
          Timeline
        </button>
        <button
          onClick={() => setActiveView('putsch')}
          className={`px-2.5 py-1 whitespace-nowrap shrink-0 ${
            activeView === 'putsch' ? 'bg-[#1B1E23] text-white font-medium' : 'text-[#495057]'
          }`}
        >
          Putsch
        </button>
        <button
          onClick={() => setActiveView('trial')}
          className={`px-2.5 py-1 whitespace-nowrap shrink-0 ${
            activeView === 'trial' ? 'bg-[#1B1E23] text-white font-medium' : 'text-[#495057]'
          }`}
        >
          Trial
        </button>
        <button
          onClick={() => setActiveView('workbench')}
          className={`px-2.5 py-1 whitespace-nowrap shrink-0 ${
            activeView === 'workbench' ? 'bg-[#1B1E23] text-white font-medium' : 'text-[#495057]'
          }`}
        >
          Evidence
        </button>
      </div>
    </header>
  );
};
