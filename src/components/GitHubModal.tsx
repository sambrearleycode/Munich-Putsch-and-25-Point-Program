import React, { useState } from 'react';
import { X, Copy, CheckCircle, Github, Globe, ArrowUpRight, Sparkles, Terminal } from 'lucide-react';

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubModal: React.FC<GitHubModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'pages' | 'vercel' | 'cli'>('pages');

  if (!isOpen) return null;

  const copyCommand = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
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
        aria-labelledby="github-modal-title"
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-1.5 text-[#6C757D] hover:text-[#1B1E23] transition-colors border border-transparent hover:border-[#2C302E]/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-[#2C302E]/15 pb-4 mb-5 pr-8">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8B1E1E] uppercase tracking-wider mb-1">
            <Globe className="w-4 h-4" />
            <span>Public Sharing & Web Hosting Guide</span>
          </div>
          <h3 id="github-modal-title" className="text-xl md:text-2xl font-bold text-[#1B1E23]">
            How to Get a Public Shareable Web Link
          </h3>
          <p className="text-xs text-[#6C757D] mt-1 leading-relaxed">
            There are two fast, completely free ways to get a permanent public link so students, teachers, or the public can open and interact with this app.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-[#F4EFEA] p-0.5 border border-[#2C302E]/15 mb-5">
          <button
            onClick={() => setActiveTab('pages')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === 'pages'
                ? 'bg-[#1B1E23] text-white shadow-xs'
                : 'text-[#495057] hover:text-[#1B1E23]'
            }`}
          >
            1. GitHub Pages (Free Built-in)
          </button>
          <button
            onClick={() => setActiveTab('vercel')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === 'vercel'
                ? 'bg-[#1B1E23] text-white shadow-xs'
                : 'text-[#495057] hover:text-[#1B1E23]'
            }`}
          >
            2. Vercel (1-Click Instant Link)
          </button>
          <button
            onClick={() => setActiveTab('cli')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === 'cli'
                ? 'bg-[#1B1E23] text-white shadow-xs'
                : 'text-[#495057] hover:text-[#1B1E23]'
            }`}
          >
            Push to GitHub (Commands)
          </button>
        </div>

        {/* Tab 1: GitHub Pages */}
        {activeTab === 'pages' && (
          <div className="space-y-4 text-xs">
            <div className="bg-[#FAF7F2] p-4 border border-[#2C302E]/15 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1B1E23] uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#8B1E1E]" />
                <span>Automated via GitHub Actions (Pre-configured)</span>
              </div>
              <p className="text-[#495057] leading-relaxed">
                The repository already includes an automated deployment workflow (<code className="font-mono text-[#8B1E1E]">.github/workflows/deploy.yml</code>) and relative path configuration (<code className="font-mono text-[#8B1E1E]">base: './'</code>).
              </p>

              <ol className="list-decimal pl-5 space-y-2 text-[#1B1E23]">
                <li>
                  <strong>Push your repository to GitHub</strong> (see the "Push to GitHub" tab if you haven't yet).
                </li>
                <li>
                  On GitHub, open your repository and click on <strong>Settings</strong> (top navigation tabs).
                </li>
                <li>
                  In the left sidebar, click on <strong>Pages</strong> (under "Code and automation").
                </li>
                <li>
                  Under <strong>Build and deployment &gt; Source</strong>, change the dropdown from <em>"Deploy from a branch"</em> to:
                  <div className="my-1.5 p-2 bg-white border border-[#2C302E]/20 font-bold text-[#8B1E1E]">
                    ✓ GitHub Actions
                  </div>
                </li>
                <li>
                  <strong>That's it!</strong> GitHub will automatically run the build workflow. Within ~1 minute, your public link will appear at the top:
                  <div className="mt-1 p-2 bg-[#1B1E23] text-white font-mono text-[11px] rounded-none">
                    https://&lt;your-username&gt;.github.io/&lt;your-repo-name&gt;/
                  </div>
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* Tab 2: Vercel */}
        {activeTab === 'vercel' && (
          <div className="space-y-4 text-xs">
            <div className="bg-[#FAF7F2] p-4 border border-[#2C302E]/15 space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-bold text-[#1B1E23] text-xs uppercase tracking-wider">
                  Vercel (Instant HTTPS Public URL)
                </div>
                <a
                  href="https://vercel.com/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-[#8B1E1E] font-semibold hover:underline"
                >
                  <span>Open Vercel New Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-[#495057] leading-relaxed">
                Vercel provides instant zero-configuration hosting with automatic custom URLs for Vite applications:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-[#1B1E23]">
                <li>
                  Log in to <strong>vercel.com</strong> with your GitHub account.
                </li>
                <li>
                  Click <strong>"Add New... &gt; Project"</strong> and select your GitHub repository from the list.
                </li>
                <li>
                  Leave all defaults as Vite (<code className="font-mono">npm run build</code>, output directory <code className="font-mono">dist</code>).
                </li>
                <li>
                  Click <strong>Deploy</strong>. In 30 seconds, Vercel gives you a public shareable URL like:
                  <div className="mt-1 p-2 bg-[#1B1E23] text-white font-mono text-[11px]">
                    https://weimar-synoptic-organizer.vercel.app
                  </div>
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* Tab 3: Git CLI Commands */}
        {activeTab === 'cli' && (
          <div className="space-y-3 text-xs">
            <p className="text-[#495057] leading-relaxed">
              Run these commands in your project terminal to link and push your files to your GitHub repository:
            </p>
            <div className="relative">
              <pre className="bg-[#1B1E23] text-[#FAF7F2] p-3 font-mono text-[11px] overflow-x-auto whitespace-pre leading-relaxed border border-black">
{`# 1. Create a repo at github.com/new (do not add README)
# 2. Add remote and push:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git branch -M main
git push -u origin main`}
              </pre>
              <button
                onClick={() =>
                  copyCommand(
                    "git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git\ngit branch -M main\ngit push -u origin main",
                    10
                  )
                }
                className="absolute top-2.5 right-2.5 px-2 py-1 bg-white/10 hover:bg-white/20 text-white text-[10px] flex items-center gap-1 transition-colors"
              >
                {copiedIndex === 10 ? (
                  <>
                    <CheckCircle className="w-3 h-3 text-[#8CE99A]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Current Live Cloud URL Callout */}
        <div className="mt-5 p-3.5 bg-[#8B1E1E]/5 border border-[#8B1E1E]/20 text-[11px] text-[#1B1E23] leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <strong className="text-[#8B1E1E] block">Already Have an Instant Shareable Link:</strong>
            <span>Your live deployment URL in this workspace is already public and shareable without needing GitHub:</span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.origin);
              setCopiedIndex(99);
              setTimeout(() => setCopiedIndex(null), 2000);
            }}
            className="shrink-0 px-2.5 py-1.5 bg-[#1B1E23] text-white text-[10px] font-semibold uppercase tracking-wider hover:bg-[#8B1E1E] transition-colors flex items-center gap-1 shadow-xs"
          >
            {copiedIndex === 99 ? <CheckCircle className="w-3 h-3 text-[#8CE99A]" /> : <Copy className="w-3 h-3" />}
            <span>Copy Live App URL</span>
          </button>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1B1E23] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#8B1E1E] transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
