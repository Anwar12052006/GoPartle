"use client";

import React from "react";
import {
  IconBriefcase,
  IconMic,
  IconWrench,
  IconCheck,
  IconAlertCircle,
} from "../Icons";

export default function Step2CategorySpecific({
  formData,
  updateFormData,
  errors,
  clearError,
}) {
  const category = formData.category;
  const details = formData.categoryDetails || {};

  const updateDetails = (updates) => {
    updateFormData({
      categoryDetails: {
        ...details,
        ...updates,
      },
    });
    if (errors.categorySpecific) {
      clearError("categorySpecific");
    }
  };

  // Helper for toggle pill arrays
  const toggleArrayItem = (key, item) => {
    const list = Array.isArray(details[key]) ? details[key] : [];
    const exists = list.includes(item);
    const updated = exists ? list.filter((i) => i !== item) : [...list, item];
    updateDetails({ [key]: updated });
  };

  // Fallback if no category selected yet
  if (!category) {
    return (
      <div className="p-8 text-center rounded-2xl border border-dashed border-[#E8E1D2] bg-[#FAF8F2]">
        <IconAlertCircle className="w-9 h-9 text-[#B88A2E] mx-auto mb-3" />
        <h3 className="text-lg font-bold text-[#242424]">
          No Category Selected
        </h3>
        <p className="text-sm text-[#686868] mt-1 max-w-sm mx-auto">
          Please return to Step 1 and select whether you require an Event Planner, Performer, or Crew member.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-7 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[14px] font-medium bg-[#FAF8F2] text-[#946B19] border border-[#E8E1D2]">
            Step 2 of 4 · Specifications
          </span>
          <h2 className="text-[26px] sm:text-[28px] font-bold tracking-tight text-[#242424] mt-3">
            {category} Requirements
          </h2>
          <p className="text-[16px] text-[#686868] mt-2 leading-relaxed">
            Specify the precise skills, deliverables, and role expectations for your {category.toLowerCase()}.
          </p>
        </div>

        {/* Category Pill Tag */}
        <div className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FAF8F2] border border-[#E8E1D2]">
          {category === "Event Planner" && <IconBriefcase className="w-4 h-4 text-[#B88A2E]" />}
          {category === "Performer" && <IconMic className="w-4 h-4 text-[#B88A2E]" />}
          {category === "Crew" && <IconWrench className="w-4 h-4 text-[#B88A2E]" />}
          <span className="text-xs font-bold text-[#946B19]">
            {category} Mode
          </span>
        </div>
      </div>

      {errors.categorySpecific && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-rose-700 text-sm">
          <IconAlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errors.categorySpecific}</span>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          CATEGORY: EVENT PLANNER
          ───────────────────────────────────────────────────────────── */}
      {category === "Event Planner" && (
        <div className="space-y-6">
          {/* Services Needed */}
          <div>
            <label className="block text-sm font-semibold text-[#242424] mb-2">
              Services Required <span className="text-rose-600">*</span>
            </label>
            <p className="text-xs text-[#686868] mb-3">
              Select one or more services you expect the planner or agency to handle.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[
                "Full Turnkey Event Planning",
                "Theme & Decor Styling",
                "Vendor Sourcing & Management",
                "Day-of Coordination & Run-sheet",
                "Catering & Menu Consultation",
                "Stage & AV Production Design",
                "Guest RSVP & Hospitality",
                "Permits & License Clearance",
              ].map((service) => {
                const isSelected = (details.plannerServices || []).includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleArrayItem("plannerServices", service)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-[#B88A2E] text-white shadow-xs"
                        : "bg-white border border-[#E8E1D2] text-[#242424] hover:bg-[#FAF8F2] hover:border-[#B88A2E]/50"
                    }`}
                  >
                    {isSelected && <IconCheck className="w-3.5 h-3.5" />}
                    {service}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target Audience Size */}
          <div>
            <label className="block text-sm font-semibold text-[#242424] mb-2">
              Expected Guest Count / Audience Size
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {[
                "Intimate (<50)",
                "Medium (50-200)",
                "Large (200-500)",
                "Grand (500-1,000)",
                "Mega (1,000+)",
              ].map((size) => {
                const isSelected = details.targetAudienceSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => updateDetails({ targetAudienceSize: size })}
                    className={`p-3 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                      isSelected
                        ? "border-[#B88A2E] bg-[#FAF8F2] text-[#946B19] ring-1 ring-[#B88A2E]"
                        : "border-[#E8E1D2] bg-white text-[#242424] hover:border-[#B88A2E]/50 hover:bg-[#FAF8F2]/40"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme & Experience Level in 2 cols */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="eventTheme"
                className="block text-sm font-semibold text-[#242424] mb-1.5"
              >
                Desired Event Theme / Style Vibe
              </label>
              <input
                id="eventTheme"
                type="text"
                value={details.eventTheme || ""}
                onChange={(e) => updateDetails({ eventTheme: e.target.value })}
                placeholder="e.g. Modern Minimalist, Futuristic Tech, Royal Traditional"
                className="w-full h-12 px-4 rounded-xl border border-[#E8E1D2] bg-white text-[#242424] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:border-[#B88A2E] focus:ring-[#B88A2E]/20 text-[15px]"
              />
            </div>

            <div>
              <label
                htmlFor="experienceLevel"
                className="block text-sm font-semibold text-[#242424] mb-1.5"
              >
                Planner Experience Level
              </label>
              <select
                id="experienceLevel"
                value={details.experienceLevel || ""}
                onChange={(e) => updateDetails({ experienceLevel: e.target.value })}
                className="w-full h-12 px-4 rounded-xl border border-[#E8E1D2] bg-white text-[#242424] focus:outline-none focus:ring-2 focus:border-[#B88A2E] focus:ring-[#B88A2E]/20 text-[15px] cursor-pointer"
              >
                <option value="">Select experience level...</option>
                <option value="Emerging / Boutique (<2 years)">Emerging / Boutique (&lt;2 years)</option>
                <option value="Experienced Professional (2-5 years)">Experienced Professional (2-5 years)</option>
                <option value="Senior / Full Production Agency (5+ years)">Senior / Full Production Agency (5+ years)</option>
              </select>
            </div>
          </div>

          {/* Key Deliverables */}
          <div>
            <label
              htmlFor="keyDeliverables"
              className="block text-sm font-semibold text-[#242424] mb-1.5"
            >
              Key Deliverables & Responsibilities
            </label>
            <textarea
              id="keyDeliverables"
              rows={3}
              value={details.keyDeliverables || ""}
              onChange={(e) => updateDetails({ keyDeliverables: e.target.value })}
              placeholder="e.g. 3D floor plan layout, vendor contracts shortlist, day-of minute-by-minute schedule, emergency backup plan..."
              className="w-full p-3.5 rounded-xl border border-[#E8E1D2] bg-white text-[#242424] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:border-[#B88A2E] focus:ring-[#B88A2E]/20 text-[15px]"
            />
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          CATEGORY: PERFORMER
          ───────────────────────────────────────────────────────────── */}
      {category === "Performer" && (
        <div className="space-y-6">
          {/* Performer / Act Type */}
          <div>
            <label className="block text-sm font-semibold text-[#242424] mb-2">
              Performance / Talent Type <span className="text-rose-600">*</span>
            </label>
            <div className="flex flex-wrap gap-2.5">
              {[
                "Live Band",
                "Solo Vocalist / Singer",
                "DJ / Electronic Producer",
                "Emcee / Host / Anchor",
                "Stand-up Comedian",
                "Dancer / Dance Troupe",
                "Magician / Mentalist",
                "Acoustic / Instrumental Soloist",
              ].map((talent) => {
                const isSelected = (details.performerType || []).includes(talent);
                return (
                  <button
                    key={talent}
                    type="button"
                    onClick={() => toggleArrayItem("performerType", talent)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-[#B88A2E] text-white shadow-xs"
                        : "bg-white border border-[#E8E1D2] text-[#242424] hover:bg-[#FAF8F2] hover:border-[#B88A2E]/50"
                    }`}
                  >
                    {isSelected && <IconCheck className="w-3.5 h-3.5" />}
                    {talent}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Genre / Style & Duration in 2 cols */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="genreStyle"
                className="block text-sm font-semibold text-[#242424] mb-1.5"
              >
                Music Genre / Performance Style
              </label>
              <input
                id="genreStyle"
                type="text"
                value={details.genreStyle || ""}
                onChange={(e) => updateDetails({ genreStyle: e.target.value })}
                placeholder="e.g. Bollywood Pop, Indie Rock, Deep House, Clean Corporate Comedy"
                className="w-full h-12 px-4 rounded-xl border border-[#E8E1D2] bg-white text-[#242424] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:border-[#B88A2E] focus:ring-[#B88A2E]/20 text-[15px]"
              />
            </div>

            <div>
              <label
                htmlFor="performanceDuration"
                className="block text-sm font-semibold text-[#242424] mb-1.5"
              >
                Performance Slot / Duration
              </label>
              <select
                id="performanceDuration"
                value={details.performanceDuration || ""}
                onChange={(e) => updateDetails({ performanceDuration: e.target.value })}
                className="w-full h-12 px-4 rounded-xl border border-[#E8E1D2] bg-white text-[#242424] focus:outline-none focus:ring-2 focus:border-[#B88A2E] focus:ring-[#B88A2E]/20 text-[15px] cursor-pointer"
              >
                <option value="">Select duration...</option>
                <option value="30 - 45 Minutes (Short set)">30 - 45 Minutes (Short set)</option>
                <option value="60 - 75 Minutes (Standard headline)">60 - 75 Minutes (Standard headline)</option>
                <option value="90 - 120 Minutes (Concert set)">90 - 120 Minutes (Concert set)</option>
                <option value="2 sets of 45 minutes">2 sets of 45 minutes</option>
                <option value="Full Evening / Multi-hour">Full Evening / Multi-hour</option>
              </select>
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-semibold text-[#242424] mb-2">
              Performance Language(s)
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "English",
                "Hindi",
                "Punjabi",
                "Bengali",
                "Tamil",
                "Telugu",
                "Kannada",
                "Marathi",
                "Instrumental Only",
              ].map((lang) => {
                const isSelected = (details.languages || []).includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleArrayItem("languages", lang)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#B88A2E] text-white"
                        : "bg-[#FAF8F2] border border-[#E8E1D2] text-[#686868] hover:bg-white"
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Technical Rider / Stage Specs */}
          <div>
            <label
              htmlFor="stageSetupRider"
              className="block text-sm font-semibold text-[#242424] mb-1.5"
            >
              Stage Setup / Technical Rider Requirements
            </label>
            <textarea
              id="stageSetupRider"
              rows={3}
              value={details.stageSetupRider || ""}
              onChange={(e) => updateDetails({ stageSetupRider: e.target.value })}
              placeholder="e.g. 2 Wireless Shure SM58 mics, in-ear monitor transmitters, Pioneer DJM-900 mixer, 1 monitor wedge, water and clean towels on stage..."
              className="w-full p-3.5 rounded-xl border border-[#E8E1D2] bg-white text-[#242424] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:border-[#B88A2E] focus:ring-[#B88A2E]/20 text-[15px]"
            />
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          CATEGORY: CREW
          ───────────────────────────────────────────────────────────── */}
      {category === "Crew" && (
        <div className="space-y-6">
          {/* Crew Roles */}
          <div>
            <label className="block text-sm font-semibold text-[#242424] mb-2">
              Crew Role(s) Desired <span className="text-rose-600">*</span>
            </label>
            <p className="text-xs text-[#686868] mb-3">
              Select the positions you need staffed for your production.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[
                "Live Sound & Audio Engineer",
                "Lighting Console Operator (DMX)",
                "Stage Manager / Runner",
                "AV & LED Video Wall Technician",
                "Camera / Live Stream Operator",
                "Rigging & Trussing Specialist",
                "Backstage & Artist Hospitality",
                "Usher & Front-of-House Host",
                "Security & Crowd Supervisor",
              ].map((role) => {
                const isSelected = (details.crewRoles || []).includes(role);
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleArrayItem("crewRoles", role)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-[#B88A2E] text-white shadow-xs"
                        : "bg-white border border-[#E8E1D2] text-[#242424] hover:bg-[#FAF8F2] hover:border-[#B88A2E]/50"
                    }`}
                  >
                    {isSelected && <IconCheck className="w-3.5 h-3.5" />}
                    {role}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Shift Duration & Uniform in 2 cols */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="shiftDuration"
                className="block text-sm font-semibold text-[#242424] mb-1.5"
              >
                Shift Duration & Schedule
              </label>
              <select
                id="shiftDuration"
                value={details.shiftDuration || ""}
                onChange={(e) => updateDetails({ shiftDuration: e.target.value })}
                className="w-full h-12 px-4 rounded-xl border border-[#E8E1D2] bg-white text-[#242424] focus:outline-none focus:ring-2 focus:border-[#B88A2E] focus:ring-[#B88A2E]/20 text-[15px] cursor-pointer"
              >
                <option value="">Select shift schedule...</option>
                <option value="Half Day (4-5 Hours)">Half Day (4-5 Hours)</option>
                <option value="Standard Shift (8 Hours)">Standard Shift (8 Hours)</option>
                <option value="Full Production Day (10-12 Hours)">Full Production Day (10-12 Hours)</option>
                <option value="Multi-Day Build & Strike">Multi-Day Build & Strike</option>
                <option value="Overnight / Night Setup">Overnight / Night Setup</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="dressCode"
                className="block text-sm font-semibold text-[#242424] mb-1.5"
              >
                Uniform / Dress Code
              </label>
              <select
                id="dressCode"
                value={details.dressCode || ""}
                onChange={(e) => updateDetails({ dressCode: e.target.value })}
                className="w-full h-12 px-4 rounded-xl border border-[#E8E1D2] bg-white text-[#242424] focus:outline-none focus:ring-2 focus:border-[#B88A2E] focus:ring-[#B88A2E]/20 text-[15px] cursor-pointer"
              >
                <option value="">Select dress code...</option>
                <option value="Production All-Black (T-shirt/Polo & cargo)">Production All-Black (T-shirt/Polo & cargo)</option>
                <option value="Formal Black Suit / Blazer">Formal Black Suit / Blazer</option>
                <option value="Smart Casual">Smart Casual</option>
                <option value="Event Branded T-Shirt (Provided on site)">Event Branded T-Shirt (Provided on site)</option>
              </select>
            </div>
          </div>

          {/* Physical / Technical Skills */}
          <div>
            <label
              htmlFor="physicalOrTechnicalSkills"
              className="block text-sm font-semibold text-[#242424] mb-1.5"
            >
              Required Skills / Certifications / Equipment Knowledge
            </label>
            <textarea
              id="physicalOrTechnicalSkills"
              rows={3}
              value={details.physicalOrTechnicalSkills || ""}
              onChange={(e) => updateDetails({ physicalOrTechnicalSkills: e.target.value })}
              placeholder="e.g. Must know Yamaha TF/QL consoles, GrandMA2 lighting board, rigging safety certification, capable of lifting flight cases..."
              className="w-full p-3.5 rounded-xl border border-[#E8E1D2] bg-white text-[#242424] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:border-[#B88A2E] focus:ring-[#B88A2E]/20 text-[15px]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
