"use client";

import React from "react";
import {
  IconDollarSign,
  IconCheck,
  IconAlertCircle,
  IconUsers,
  IconClock,
  IconWrench,
} from "../Icons";

export const HOST_EQUIPMENT_OPTIONS = [
  "Stage & Elevated Platform",
  "Sound / PA System & Line Array",
  "Professional Stage & Ambiance Lighting",
  "Wireless & Handheld Microphones",
  "Green Room / Private Dressing Space",
  "High-Speed Wi-Fi & AV Connectivity",
  "Dedicated 3-Phase Power Generator",
  "Artist & Crew Reserved Parking",
  "Water & Beverages Station",
];

export const BUDGET_TYPES = [
  "Fixed Total",
  "Per Day",
  "Per Person",
  "Hourly",
  "Negotiable",
];

export const CURRENCIES = [
  { code: "INR", symbol: "₹", label: "INR (₹)" },
  { code: "USD", symbol: "$", label: "USD ($)" },
  { code: "EUR", symbol: "€", label: "EUR (€)" },
  { code: "GBP", symbol: "£", label: "GBP (£)" },
];

export default function Step3LogisticsBudget({
  formData,
  updateFormData,
  errors,
  clearError,
}) {
  const category = formData.category || "Event Planner";

  const handleChange = (field, value) => {
    updateFormData({ [field]: value });
    if (errors[field]) {
      clearError(field);
    }
  };

  const toggleEquipmentItem = (item) => {
    const current = Array.isArray(formData.equipmentProvidedByHost)
      ? formData.equipmentProvidedByHost
      : [];
    const exists = current.includes(item);
    const updated = exists
      ? current.filter((i) => i !== item)
      : [...current, item];
    handleChange("equipmentProvidedByHost", updated);
  };

  const handleQuantityAdjust = (delta) => {
    const current = Number(formData.quantity) || 1;
    const next = Math.max(1, current + delta);
    handleChange("quantity", next);
  };

  const getQuantityLabel = () => {
    if (category === "Performer") return "Number of Performers / Troupe Size";
    if (category === "Crew") return "Number of Crew Members Needed";
    return "Number of Planners / Coordinators Needed";
  };

  const getLogisticsHelp = () => {
    if (category === "Performer") {
      return "Detail call-time for soundcheck, green room access, performance slot timing, and hospitality.";
    }
    if (category === "Crew") {
      return "Specify reporting time, call sheet handover, shift breaks, and on-site production manager contact.";
    }
    return "Specify planning cadence (virtual vs on-site), venue walkthrough dates, and handover milestones.";
  };

  return (
    <div className="space-y-5 sm:space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-[14px] font-medium bg-[#FAF8F2] text-[#946B19] border border-[#E8E1D2]">
          Step 3 of 4 · Logistics & Commercials
        </span>
        <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold tracking-tight text-[#242424] mt-2.5 sm:mt-3">
          Logistics, Scope & Budget
        </h2>
        <p className="text-xs sm:text-[15px] md:text-[16px] text-[#686868] mt-1.5 sm:mt-2 leading-relaxed">
          Define the quantity, equipment availability, operational logistics, and budget parameters.
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: QUANTITY & SCOPE
          ───────────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E8E1D2] bg-[#FAF8F2]/40 shadow-xs space-y-3.5 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#242424] flex items-center gap-2">
              <IconUsers className="w-4 h-4 sm:w-5 sm:h-5 text-[#B88A2E]" />
              {getQuantityLabel()} <span className="text-rose-600">*</span>
            </h3>
            <p className="text-[11px] sm:text-xs text-[#686868] mt-0.5">
              Specify how many individual specialists or artists you are requesting.
            </p>
          </div>

          {/* Stepper control */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => handleQuantityAdjust(-1)}
              disabled={(formData.quantity || 1) <= 1}
              aria-label="Decrease quantity"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#E8E1D2] bg-white hover:bg-[#FAF8F2] text-[#242424] flex items-center justify-center font-bold text-base sm:text-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max="100"
              value={formData.quantity || 1}
              onChange={(e) =>
                handleChange("quantity", Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-14 sm:w-16 h-9 sm:h-10 text-center font-bold text-base text-[#242424] rounded-xl border border-[#E8E1D2] bg-white focus:outline-none focus:ring-2 focus:ring-[#B88A2E]/20"
            />
            <button
              type="button"
              onClick={() => handleQuantityAdjust(1)}
              aria-label="Increase quantity"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#E8E1D2] bg-white hover:bg-[#FAF8F2] text-[#242424] flex items-center justify-center font-bold text-base sm:text-lg transition-colors cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {errors.quantity && (
          <p className="text-xs font-medium text-rose-600 flex items-center gap-1">
            <IconAlertCircle className="w-3.5 h-3.5" />
            {errors.quantity}
          </p>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: LOGISTICS & HOSPITALITY
          ───────────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E8E1D2] bg-[#FAF8F2]/40 shadow-xs space-y-3.5 sm:space-y-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#242424] flex items-center gap-2">
            <IconClock className="w-4 h-4 sm:w-5 sm:h-5 text-[#B88A2E]" />
            Category Logistics & Timing
          </h3>
          <p className="text-[11px] sm:text-xs text-[#686868] mt-1">
            {getLogisticsHelp()}
          </p>
        </div>

        <div>
          <label
            htmlFor="logisticsNotes"
            className="block text-xs font-semibold text-[#686868] mb-1.5 uppercase tracking-wider"
          >
            Logistics & Schedule Details
          </label>
          <textarea
            id="logisticsNotes"
            rows={3}
            value={formData.logisticsNotes || ""}
            onChange={(e) => handleChange("logisticsNotes", e.target.value)}
            placeholder={
              category === "Performer"
                ? "e.g. Soundcheck at 4:00 PM, stage performance at 8:00 PM sharp. Green room with refreshments required."
                : category === "Crew"
                ? "e.g. Call time 9:00 AM at Loading Bay 3 for rigging. Production lead will conduct safety orientation."
                : "e.g. Weekly Zoom checkpoint every Tuesday; physical venue walkthrough scheduled 5 days prior."
            }
            className="w-full p-3 sm:p-3.5 rounded-xl border border-[#E8E1D2] bg-white text-[#242424] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:border-[#B88A2E] focus:ring-[#B88A2E]/20 text-base sm:text-[15px]"
          />
        </div>

        {/* Hospitality switches */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
          <label className="flex items-start sm:items-center gap-3 p-3 sm:p-3.5 rounded-xl border border-[#E8E1D2] bg-white cursor-pointer hover:border-[#B88A2E]/50 transition-colors">
            <input
              type="checkbox"
              checked={!!formData.mealsProvided}
              onChange={(e) => handleChange("mealsProvided", e.target.checked)}
              className="w-4 h-4 mt-0.5 sm:mt-0 text-[#B88A2E] rounded border-[#E8E1D2] focus:ring-[#B88A2E] cursor-pointer shrink-0"
            />
            <div>
              <span className="text-xs sm:text-sm font-semibold text-[#242424] block">
                Meals / Refreshments Provided
              </span>
              <span className="text-[11px] sm:text-xs text-[#686868] block mt-0.5">
                Host provides on-site food, coffee/water or meal allowances
              </span>
            </div>
          </label>

          <label className="flex items-start sm:items-center gap-3 p-3 sm:p-3.5 rounded-xl border border-[#E8E1D2] bg-white cursor-pointer hover:border-[#B88A2E]/50 transition-colors">
            <input
              type="checkbox"
              checked={!!formData.transportProvided}
              onChange={(e) => handleChange("transportProvided", e.target.checked)}
              className="w-4 h-4 mt-0.5 sm:mt-0 text-[#B88A2E] rounded border-[#E8E1D2] focus:ring-[#B88A2E] cursor-pointer shrink-0"
            />
            <div>
              <span className="text-xs sm:text-sm font-semibold text-[#242424] block">
                Travel / Local Transport Provided
              </span>
              <span className="text-[11px] sm:text-xs text-[#686868] block mt-0.5">
                Host provides shuttle, cab reimbursement, or flights/hotel
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: EQUIPMENT OR SERVICES
          ───────────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E8E1D2] bg-[#FAF8F2]/40 shadow-xs space-y-3.5 sm:space-y-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#242424] flex items-center gap-2">
            <IconWrench className="w-4 h-4 sm:w-5 sm:h-5 text-[#B88A2E]" />
            Equipment & Facilities Provided by Host
          </h3>
          <p className="text-[11px] sm:text-xs text-[#686868] mt-1">
            Check the equipment, infrastructure, and facilities already secured at the venue.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5">
          {HOST_EQUIPMENT_OPTIONS.map((item) => {
            const isSelected = (formData.equipmentProvidedByHost || []).includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleEquipmentItem(item)}
                className={`p-2.5 sm:p-3 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all flex items-start gap-2.5 cursor-pointer ${
                  isSelected
                    ? "border-[#B88A2E] bg-white text-[#242424] ring-1 ring-[#B88A2E]"
                    : "border-[#E8E1D2] bg-white text-[#686868] hover:border-[#B88A2E]/50 hover:text-[#242424]"
                }`}
              >
                <div
                  className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center shrink-0 border transition-colors ${
                    isSelected
                      ? "bg-[#B88A2E] border-[#B88A2E] text-white"
                      : "border-[#E8E1D2] bg-white"
                  }`}
                >
                  {isSelected && <IconCheck className="w-3 h-3" />}
                </div>
                <span className="leading-snug">{item}</span>
              </button>
            );
          })}
        </div>

        {/* Equipment needed from vendor */}
        <div className="pt-1.5 sm:pt-2">
          <label
            htmlFor="equipmentNeededFromVendor"
            className="block text-xs font-semibold text-[#686868] mb-1.5 uppercase tracking-wider"
          >
            Equipment / Tools Required from the Vendor
          </label>
          <input
            id="equipmentNeededFromVendor"
            type="text"
            value={formData.equipmentNeededFromVendor || ""}
            onChange={(e) => handleChange("equipmentNeededFromVendor", e.target.value)}
            placeholder="e.g. Artist brings own instruments & pedalboard / Crew brings multimeter & headset"
            className="w-full h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl border border-[#E8E1D2] bg-white text-[#242424] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:border-[#B88A2E] focus:ring-[#B88A2E]/20 text-base sm:text-[15px]"
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: BUDGET & COMMERCIALS
          ───────────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E8E1D2] bg-[#FAF8F2]/40 shadow-xs space-y-3.5 sm:space-y-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#242424] flex items-center gap-2">
            <IconDollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-[#B88A2E]" />
            Budget & Commercial Terms <span className="text-rose-600">*</span>
          </h3>
          <p className="text-[11px] sm:text-xs text-[#686868] mt-1">
            Specify your proposed remuneration or rate expectation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {/* Currency */}
          <div>
            <label
              htmlFor="currency"
              className="block text-xs font-semibold text-[#686868] mb-1.5 uppercase tracking-wider"
            >
              Currency
            </label>
            <select
              id="currency"
              value={formData.currency || "INR"}
              onChange={(e) => handleChange("currency", e.target.value)}
              className="w-full h-11 sm:h-12 px-3 sm:px-3.5 rounded-xl border border-[#E8E1D2] bg-white text-[#242424] focus:outline-none focus:ring-2 focus:border-[#B88A2E] text-base sm:text-sm font-semibold cursor-pointer"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Amount */}
          <div>
            <label
              htmlFor="budget"
              className="block text-xs font-semibold text-[#686868] mb-1.5 uppercase tracking-wider"
            >
              Budget Amount <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <input
                id="budget"
                type="number"
                min="0"
                step="500"
                value={formData.budget !== undefined && formData.budget !== "" ? formData.budget : ""}
                onChange={(e) => {
                  const val = e.target.value === "" ? "" : Number(e.target.value);
                  handleChange("budget", val);
                }}
                placeholder="50000"
                className={`w-full h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl border bg-white text-[#242424] placeholder:text-zinc-400 focus:outline-none focus:ring-2 text-base sm:text-[15px] font-semibold ${
                  errors.budget
                    ? "border-rose-400 focus:ring-rose-400/20"
                    : "border-[#E8E1D2] focus:border-[#B88A2E] focus:ring-[#B88A2E]/20"
                }`}
                aria-invalid={!!errors.budget}
                aria-describedby={errors.budget ? "budget-error" : undefined}
              />
            </div>
            {errors.budget && (
              <p id="budget-error" className="mt-1.5 text-xs font-medium text-rose-600 flex items-center gap-1">
                <IconAlertCircle className="w-3.5 h-3.5" />
                {errors.budget}
              </p>
            )}
          </div>

          {/* Budget Type */}
          <div>
            <label
              htmlFor="budgetType"
              className="block text-xs font-semibold text-[#686868] mb-1.5 uppercase tracking-wider"
            >
              Budget Model
            </label>
            <select
              id="budgetType"
              value={formData.budgetType || "Fixed Total"}
              onChange={(e) => handleChange("budgetType", e.target.value)}
              className="w-full h-11 sm:h-12 px-3 sm:px-3.5 rounded-xl border border-[#E8E1D2] bg-white text-[#242424] focus:outline-none focus:ring-2 focus:border-[#B88A2E] text-base sm:text-sm font-semibold cursor-pointer"
            >
              {BUDGET_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Budget Presets */}
        {formData.currency === "INR" && (
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
            <span className="text-[11px] sm:text-xs text-[#686868] font-medium">Quick presets:</span>
            {[25000, 50000, 100000, 250000, 500000].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => handleChange("budget", amt)}
                className="px-2 sm:px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-[#E8E1D2] hover:bg-[#F5EBD3] hover:border-[#B88A2E]/40 text-[#242424] transition-colors cursor-pointer"
              >
                ₹{amt.toLocaleString("en-IN")}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: ADDITIONAL REQUIREMENTS
          ───────────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E8E1D2] bg-[#FAF8F2]/40 shadow-xs space-y-3">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#242424]">
            Additional Requirements & Instructions
          </h3>
          <p className="text-[11px] sm:text-xs text-[#686868] mt-0.5">
            Any non-disclosure clauses, cancellation policies, safety protocols, or specific terms.
          </p>
        </div>

        <textarea
          id="additionalNotes"
          rows={3}
          value={formData.additionalNotes || ""}
          onChange={(e) => handleChange("additionalNotes", e.target.value)}
          placeholder="e.g. Standard NDA required upon shortlisting. 50% advance upon contract signing, remaining upon event completion..."
          className="w-full p-3 sm:p-3.5 rounded-xl border border-[#E8E1D2] bg-white text-[#242424] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:border-[#B88A2E] focus:ring-[#B88A2E]/20 text-base sm:text-[15px]"
        />
      </div>
    </div>
  );
}
