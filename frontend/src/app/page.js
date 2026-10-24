"use client";

import { useEffect, useState } from "react";
import RequirementWizard from "@/components/wizard/RequirementWizard";
import RequirementsList from "@/components/requirements/RequirementsList";
import { checkHealth } from "@/lib/api";

export default function Home() {
  const [activeTab, setActiveTab] = useState("wizard"); // 'wizard' | 'list'
  const [backendHealth, setBackendHealth] = useState(null);
  const [healthError, setHealthError] = useState(null);

  useEffect(() => {
    checkHealth()
      .then((data) => setBackendHealth(data))
      .catch((err) => setHealthError(err.message));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F2] text-[#242424] selection:bg-[#F5EBD3] selection:text-[#946B19]">
      {/* ── Top Header Navigation ─────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-[#E8E1D2] shadow-xs">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 min-h-[64px] sm:h-18 py-2.5 sm:py-0 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#B88A2E] to-[#946B19] flex items-center justify-center text-white shadow-xs font-bold text-sm sm:text-base tracking-tight shrink-0">
              GP
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-lg sm:text-[21px] tracking-tight text-[#242424]">
                  GoPratle
                </span>
                <span className="text-[10.5px] sm:text-[12px] uppercase font-semibold tracking-wider px-1.5 sm:px-2 py-0.5 rounded-md bg-[#FAF8F2] text-[#946B19] border border-[#E8E1D2]">
                  Event Hub
                </span>
              </div>
              <p className="text-xs sm:text-[13.5px] text-[#686868] hidden sm:block">
                Talent & Requirement Marketplace
              </p>
            </div>
          </div>

          {/* Center Tabs: Wizard vs List */}
          <nav
            aria-label="Main Navigation"
            className="flex items-center p-1 rounded-xl bg-[#FAF8F2] border border-[#E8E1D2] w-full sm:w-auto justify-center"
          >
            <button
              type="button"
              onClick={() => setActiveTab("wizard")}
              className={`flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-[14.5px] md:text-[15px] font-semibold transition-all cursor-pointer text-center ${
                activeTab === "wizard"
                  ? "bg-white text-[#946B19] shadow-xs border border-[#E8E1D2]"
                  : "text-[#686868] hover:text-[#242424] hover:bg-white/60"
              }`}
            >
              Post Requirement
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("list")}
              className={`flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-[14.5px] md:text-[15px] font-semibold transition-all cursor-pointer text-center ${
                activeTab === "list"
                  ? "bg-white text-[#946B19] shadow-xs border border-[#E8E1D2]"
                  : "text-[#686868] hover:text-[#242424] hover:bg-white/60"
              }`}
            >
              Browse Postings
            </button>
          </nav>
        </div>
      </header>

      {/* ── Main Content Area ─────────────────────────────────────── */}
      <main className="flex-1 py-6 sm:py-10 md:py-14 px-3 sm:px-6">
        <div className="w-full max-w-[980px] mx-auto space-y-6 sm:space-y-8">
          {activeTab === "wizard" ? (
            <>
              {/* Wizard Intro Heading */}
              <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3 px-1">
                <h1 className="text-2xl sm:text-3xl md:text-[40px] lg:text-[42px] font-bold tracking-tight text-[#242424] leading-tight">
                  Post an Event Requirement
                </h1>
                <p className="text-xs sm:text-[15px] md:text-[16px] text-[#686868] leading-relaxed">
                  Connect with verified event planners, artists, performers, and technical production crew in 4 simple steps.
                </p>
              </div>

              {/* Requirement Wizard */}
              <RequirementWizard
                onRequirementPosted={() => {}}
                onViewList={() => setActiveTab("list")}
              />
            </>
          ) : (
            <RequirementsList
              onNewPostingClick={() => setActiveTab("wizard")}
            />
          )}
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="w-full border-t border-[#E8E1D2] bg-white py-6 text-center text-xs text-[#686868]">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 GoPratle Platform. All rights reserved.</p>
          <div className="flex items-center gap-3 text-xs font-medium text-[#686868]">
            <span>Next.js 16 App Router</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Express & MongoDB</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
