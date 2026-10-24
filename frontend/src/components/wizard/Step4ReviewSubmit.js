"use client";

import React, { useState } from "react";
import {
  IconCalendar,
  IconMapPin,
  IconBuilding,
  IconBriefcase,
  IconMic,
  IconWrench,
  IconCheck,
  IconEdit,
  IconSpinner,
  IconAlertCircle,
} from "../Icons";

export default function Step4ReviewSubmit({
  formData,
  onEditStep,
  onSubmit,
  isSubmitting,
  submissionError,
}) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [validationError, setValidationError] = useState("");

  const details = formData.categoryDetails || {};
  const category = formData.category || "Event Planner";

  // Calculate duration in days if dates are provided
  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return null;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const daysCount = calculateDays();

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setValidationError("Please check the confirmation box before submitting.");
      return;
    }
    setValidationError("");
    onSubmit();
  };

  const getCurrencySymbol = (code) => {
    if (code === "USD") return "$";
    if (code === "EUR") return "€";
    if (code === "GBP") return "£";
    return "₹";
  };

  return (
    <div className="space-y-5 sm:space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-[14px] font-medium bg-[#FAF8F2] text-[#946B19] border border-[#E8E1D2]">
          Step 4 of 4 · Final Verification
        </span>
        <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold tracking-tight text-[#242424] mt-2.5 sm:mt-3">
          Review & Submit Requirement
        </h2>
        <p className="text-xs sm:text-[15px] md:text-[16px] text-[#686868] mt-1.5 sm:mt-2 leading-relaxed">
          Carefully review your posting details. You can click “Edit” on any section to revise information.
        </p>
      </div>

      {/* Submission Error Banner if any */}
      {submissionError && (
        <div className="p-3.5 sm:p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 sm:gap-3 text-rose-700">
          <IconAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-xs sm:text-sm">Submission Failed</h4>
            <p className="text-xs mt-0.5">{submissionError}</p>
          </div>
        </div>
      )}

      {/* Hero Highlight Card - Warm Ivory & Gold */}
      <div className="rounded-xl sm:rounded-2xl border border-[#E8E1D2] bg-[#FAF8F2] p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-white text-[#946B19] border border-[#E8E1D2]">
                {formData.eventType || "Event"}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-[#B88A2E] text-white flex items-center gap-1 shadow-xs">
                {category === "Event Planner" && <IconBriefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                {category === "Performer" && <IconMic className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                {category === "Crew" && <IconWrench className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                {category}
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl md:text-[26px] font-bold text-[#242424] tracking-tight leading-snug">
              {formData.eventName || "Untitled Event Requirement"}
            </h3>
            <p className="text-xs sm:text-sm text-[#686868] flex items-center gap-1.5">
              <IconMapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B88A2E] shrink-0" />
              <span>
                {formData.location || "Location not specified"}
                {formData.venue ? ` • ${formData.venue}` : ""}
              </span>
            </p>
          </div>

          <div className="text-left md:text-right bg-white md:bg-transparent p-3 md:p-0 rounded-xl border border-[#E8E1D2] md:border-none">
            <p className="text-[11px] sm:text-xs text-[#686868] uppercase tracking-wider font-semibold">
              Estimated Budget
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#946B19] leading-tight">
              {getCurrencySymbol(formData.currency)}
              {Number(formData.budget || 0).toLocaleString()}
            </p>
            <p className="text-[11px] sm:text-xs text-[#686868] font-medium">{formData.budgetType || "Fixed Total"}</p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: EVENT DETAILS
          ───────────────────────────────────────────────────────────── */}
      <div className="rounded-xl sm:rounded-2xl border border-[#E8E1D2] bg-white p-4 sm:p-5 shadow-xs space-y-3.5 sm:space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8E1D2] pb-2.5 sm:pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#FAF8F2] border border-[#E8E1D2] flex items-center justify-center text-[#946B19] font-bold text-[11px] sm:text-xs">
              01
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#242424]">
              Event Overview & Schedule
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="text-xs font-semibold text-[#946B19] hover:text-[#B88A2E] flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF8F2] hover:bg-[#F5EBD3] border border-[#E8E1D2] transition-colors cursor-pointer"
          >
            <IconEdit className="w-3.5 h-3.5" />
            Edit
          </button>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
          <div>
            <dt className="text-[11px] sm:text-xs font-medium text-[#686868]">Event Name</dt>
            <dd className="font-semibold text-[#242424] mt-0.5">
              {formData.eventName || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] sm:text-xs font-medium text-[#686868]">Event Type</dt>
            <dd className="font-semibold text-[#242424] mt-0.5">
              {formData.eventType || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] sm:text-xs font-medium text-[#686868]">Selected Category</dt>
            <dd className="font-semibold text-[#946B19] mt-0.5">
              {formData.category || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] sm:text-xs font-medium text-[#686868]">Timeline Dates</dt>
            <dd className="font-semibold text-[#242424] mt-0.5">
              {formData.startDate} to {formData.endDate}
              {daysCount ? ` (${daysCount} day${daysCount > 1 ? "s" : ""})` : ""}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] sm:text-xs font-medium text-[#686868]">Location</dt>
            <dd className="font-semibold text-[#242424] mt-0.5">
              {formData.location || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] sm:text-xs font-medium text-[#686868]">Venue</dt>
            <dd className="font-semibold text-[#242424] mt-0.5">
              {formData.venue || "To be decided"}
            </dd>
          </div>
        </dl>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: CATEGORY-SPECIFIC REQUIREMENTS
          ───────────────────────────────────────────────────────────── */}
      <div className="rounded-xl sm:rounded-2xl border border-[#E8E1D2] bg-white p-4 sm:p-5 shadow-xs space-y-3.5 sm:space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8E1D2] pb-2.5 sm:pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#FAF8F2] border border-[#E8E1D2] flex items-center justify-center text-[#946B19] font-bold text-[11px] sm:text-xs">
              02
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#242424]">
              {category} Specifications
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="text-xs font-semibold text-[#946B19] hover:text-[#B88A2E] flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF8F2] hover:bg-[#F5EBD3] border border-[#E8E1D2] transition-colors cursor-pointer"
          >
            <IconEdit className="w-3.5 h-3.5" />
            Edit
          </button>
        </div>

        {/* Event Planner Details */}
        {category === "Event Planner" && (
          <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm">
            <div>
              <p className="text-[11px] sm:text-xs font-medium text-[#686868] mb-1.5">
                Services Required
              </p>
              {details.plannerServices && details.plannerServices.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {details.plannerServices.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#FAF8F2] text-[#242424] border border-[#E8E1D2]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-400 italic">None selected</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
              <div>
                <p className="text-[11px] sm:text-xs font-medium text-[#686868]">
                  Target Audience Size
                </p>
                <p className="font-semibold text-[#242424] mt-0.5">
                  {details.targetAudienceSize || "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-medium text-[#686868]">
                  Aesthetic Theme
                </p>
                <p className="font-semibold text-[#242424] mt-0.5">
                  {details.eventTheme || "Standard / General"}
                </p>
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-medium text-[#686868]">
                  Planner Experience
                </p>
                <p className="font-semibold text-[#242424] mt-0.5">
                  {details.experienceLevel || "Any Experience"}
                </p>
              </div>
            </div>

            {details.keyDeliverables && (
              <div>
                <p className="text-[11px] sm:text-xs font-medium text-[#686868]">
                  Key Deliverables
                </p>
                <p className="font-medium text-[#242424] mt-0.5 bg-[#FAF8F2] p-3 rounded-xl border border-[#E8E1D2]">
                  {details.keyDeliverables}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Performer Details */}
        {category === "Performer" && (
          <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm">
            <div>
              <p className="text-[11px] sm:text-xs font-medium text-[#686868] mb-1.5">
                Talent / Act Type
              </p>
              {details.performerType && details.performerType.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {details.performerType.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#FAF8F2] text-[#242424] border border-[#E8E1D2]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-400 italic">None selected</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
              <div>
                <p className="text-[11px] sm:text-xs font-medium text-[#686868]">
                  Genre & Style
                </p>
                <p className="font-semibold text-[#242424] mt-0.5">
                  {details.genreStyle || "General Commercial"}
                </p>
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-medium text-[#686868]">
                  Performance Duration
                </p>
                <p className="font-semibold text-[#242424] mt-0.5">
                  {details.performanceDuration || "Standard"}
                </p>
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-medium text-[#686868]">
                  Languages
                </p>
                <p className="font-semibold text-[#242424] mt-0.5">
                  {details.languages && details.languages.length > 0
                    ? details.languages.join(", ")
                    : "Flexible"}
                </p>
              </div>
            </div>

            {details.stageSetupRider && (
              <div>
                <p className="text-[11px] sm:text-xs font-medium text-[#686868]">
                  Technical Rider & Stage Setup
                </p>
                <p className="font-medium text-[#242424] mt-0.5 bg-[#FAF8F2] p-3 rounded-xl border border-[#E8E1D2]">
                  {details.stageSetupRider}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Crew Details */}
        {category === "Crew" && (
          <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm">
            <div>
              <p className="text-[11px] sm:text-xs font-medium text-[#686868] mb-1.5">
                Staffing Roles Desired
              </p>
              {details.crewRoles && details.crewRoles.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {details.crewRoles.map((r) => (
                    <span
                      key={r}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#FAF8F2] text-[#242424] border border-[#E8E1D2]"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-400 italic">None selected</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
              <div>
                <p className="text-[11px] sm:text-xs font-medium text-[#686868]">
                  Shift Schedule
                </p>
                <p className="font-semibold text-[#242424] mt-0.5">
                  {details.shiftDuration || "Standard Shift"}
                </p>
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-medium text-[#686868]">
                  Uniform / Dress Code
                </p>
                <p className="font-semibold text-[#242424] mt-0.5">
                  {details.dressCode || "Production All-Black"}
                </p>
              </div>
            </div>

            {details.physicalOrTechnicalSkills && (
              <div>
                <p className="text-[11px] sm:text-xs font-medium text-[#686868]">
                  Technical Requirements & Certifications
                </p>
                <p className="font-medium text-[#242424] mt-0.5 bg-[#FAF8F2] p-3 rounded-xl border border-[#E8E1D2]">
                  {details.physicalOrTechnicalSkills}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: LOGISTICS, EQUIPMENT & BUDGET
          ───────────────────────────────────────────────────────────── */}
      <div className="rounded-xl sm:rounded-2xl border border-[#E8E1D2] bg-white p-4 sm:p-5 shadow-xs space-y-3.5 sm:space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8E1D2] pb-2.5 sm:pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#FAF8F2] border border-[#E8E1D2] flex items-center justify-center text-[#946B19] font-bold text-[11px] sm:text-xs">
              03
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#242424]">
              Logistics, Equipment & Commercials
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(3)}
            className="text-xs font-semibold text-[#946B19] hover:text-[#B88A2E] flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF8F2] hover:bg-[#F5EBD3] border border-[#E8E1D2] transition-colors cursor-pointer"
          >
            <IconEdit className="w-3.5 h-3.5" />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
          <div>
            <p className="text-[11px] sm:text-xs font-medium text-[#686868]">Quantity Needed</p>
            <p className="text-sm sm:text-base font-bold text-[#242424] mt-0.5">
              {formData.quantity || 1} Person / Unit
            </p>
          </div>
          <div>
            <p className="text-[11px] sm:text-xs font-medium text-[#686868]">Budget</p>
            <p className="text-sm sm:text-base font-bold text-[#946B19] mt-0.5">
              {getCurrencySymbol(formData.currency)}
              {Number(formData.budget || 0).toLocaleString()} ({formData.budgetType || "Fixed Total"})
            </p>
          </div>
          <div>
            <p className="text-[11px] sm:text-xs font-medium text-[#686868]">Hospitality</p>
            <div className="flex items-center gap-3 mt-1 text-xs font-semibold">
              <span className={formData.mealsProvided ? "text-emerald-700" : "text-[#686868]"}>
                {formData.mealsProvided ? "✓ Meals included" : "✗ No meals"}
              </span>
              <span className={formData.transportProvided ? "text-emerald-700" : "text-[#686868]"}>
                {formData.transportProvided ? "✓ Travel included" : "✗ No travel"}
              </span>
            </div>
          </div>
        </div>

        {/* Host Equipment List */}
        <div>
          <p className="text-[11px] sm:text-xs font-medium text-[#686868] mb-1.5">
            Facilities / Equipment Provided by Host
          </p>
          {formData.equipmentProvidedByHost && formData.equipmentProvidedByHost.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {formData.equipmentProvidedByHost.map((eq) => (
                <span
                  key={eq}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAF8F2] border border-[#E8E1D2] text-[#242424]"
                >
                  ✓ {eq}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-[#686868] text-xs italic">No host equipment marked</p>
          )}
        </div>

        {/* Vendor Equipment */}
        {formData.equipmentNeededFromVendor && (
          <div>
            <p className="text-[11px] sm:text-xs font-medium text-[#686868]">
              Equipment to be brought by vendor:
            </p>
            <p className="text-xs text-[#242424] mt-0.5">
              {formData.equipmentNeededFromVendor}
            </p>
          </div>
        )}

        {/* Logistics notes */}
        {formData.logisticsNotes && (
          <div>
            <p className="text-[11px] sm:text-xs font-medium text-[#686868]">
              Logistics & Schedule Notes:
            </p>
            <p className="text-xs text-[#242424] mt-0.5">
              {formData.logisticsNotes}
            </p>
          </div>
        )}

        {/* Additional notes */}
        {formData.additionalNotes && (
          <div className="pt-2 border-t border-[#E8E1D2]">
            <p className="text-[11px] sm:text-xs font-medium text-[#686868]">
              Special Instructions / Notes:
            </p>
            <p className="text-xs text-[#242424] mt-0.5">
              {formData.additionalNotes}
            </p>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          CONFIRMATION & TERMS
          ───────────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E8E1D2] bg-white shadow-xs space-y-3.5 sm:space-y-4">
        <label className="flex items-start gap-2.5 sm:gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => {
              setAgreedToTerms(e.target.checked);
              if (validationError) setValidationError("");
            }}
            className="w-4 h-4 mt-0.5 text-[#B88A2E] rounded border-[#E8E1D2] focus:ring-[#B88A2E] cursor-pointer shrink-0"
          />
          <span className="text-xs sm:text-sm text-[#242424] leading-relaxed">
            I confirm that the requirement details, dates, and budget specified above are accurate and ready for posting to GoPratle’s verified talent network.
          </span>
        </label>

        {validationError && (
          <p className="text-xs font-medium text-rose-600 flex items-center gap-1.5">
            <IconAlertCircle className="w-4 h-4 shrink-0" />
            {validationError}
          </p>
        )}

        {/* Submission Action */}
        <div className="pt-1 sm:pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => onEditStep(3)}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-[#E8E1D2] bg-white hover:bg-[#FAF8F2] text-[#242424] font-semibold text-xs sm:text-sm transition-colors cursor-pointer text-center"
          >
            ← Back to Logistics
          </button>

          <button
            type="button"
            onClick={handleSubmitClick}
            disabled={isSubmitting}
            className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white shadow-xs transition-colors flex items-center justify-center gap-2 sm:gap-2.5 ${
              isSubmitting
                ? "bg-[#B88A2E]/70 cursor-not-allowed opacity-80"
                : "bg-[#B88A2E] hover:bg-[#946B19] cursor-pointer"
            }`}
          >
            {isSubmitting ? (
              <>
                <IconSpinner className="w-4 h-4 animate-spin text-white" />
                <span>Posting Requirement to GoPratle...</span>
              </>
            ) : (
              <>
                <IconCheck className="w-4 h-4 text-white" />
                <span>Confirm & Post Requirement</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
