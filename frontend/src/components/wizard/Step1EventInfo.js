"use client";

import React from "react";
import {
  IconCalendar,
  IconMapPin,
  IconBuilding,
  IconBriefcase,
  IconMic,
  IconWrench,
  IconCheck,
  IconAlertCircle,
} from "../Icons";

export const EVENT_TYPES = [
  "Corporate Conference",
  "Wedding & Reception",
  "Concert / Music Festival",
  "Product Launch & Expo",
  "College / Cultural Fest",
  "Private Birthday / Gala",
  "Exhibition & Trade Show",
  "Sports / Esports Event",
  "Charity / Fundraiser",
  "Other",
];

export const CATEGORIES = [
  {
    id: "Event Planner",
    title: "Event Planner",
    subtitle: "End-to-end planning & execution",
    desc: "Hire experienced coordinators, theme designers, decor curators, and management directors.",
    icon: IconBriefcase,
    badge: "Strategy & Coordination",
  },
  {
    id: "Performer",
    title: "Performer",
    subtitle: "Talent, artists & entertainers",
    desc: "Book live bands, solo vocalists, DJs, emcees, stand-up comedians, and stage artists.",
    icon: IconMic,
    badge: "Stage & Entertainment",
  },
  {
    id: "Crew",
    title: "Crew",
    subtitle: "Technical, production & ground staff",
    desc: "Engage audio/lighting engineers, stage hands, videographers, riggers, and operations staff.",
    icon: IconWrench,
    badge: "Operations & Technical",
  },
];

export default function Step1EventInfo({ formData, updateFormData, errors, clearError }) {
  const handleChange = (field, value) => {
    updateFormData({ [field]: value });
    if (errors[field]) {
      clearError(field);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[14px] font-medium bg-[#FAF8F2] text-[#946B19] border border-[#E8E1D2]">
          Step 1 of 4 · General Overview
        </span>
        <h2 className="text-[26px] sm:text-[28px] font-bold tracking-tight text-[#242424] mt-3">
          Event Details & Category Selection
        </h2>
        <p className="text-[16px] text-[#686868] mt-2 leading-relaxed">
          Tell us about your upcoming event and choose the specialization you want to hire.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Event Name */}
        <div className="md:col-span-2">
          <label
            htmlFor="eventName"
            className="block text-[16px] font-semibold text-[#242424] mb-2"
          >
            Event Name <span className="text-rose-600">*</span>
          </label>
          <input
            id="eventName"
            name="eventName"
            type="text"
            value={formData.eventName || ""}
            onChange={(e) => handleChange("eventName", e.target.value)}
            placeholder="e.g. InnovateTech Global Summit 2026"
            className={`w-full h-[52px] px-4 rounded-xl border bg-white text-[#242424] placeholder:text-[15px] placeholder:text-[#888888] focus:outline-none focus:ring-2 transition-all text-[16px] ${
              errors.eventName
                ? "border-rose-400 focus:ring-rose-400/20"
                : "border-[#E8E1D2] focus:border-[#B88A2E] focus:ring-[#B88A2E]/20"
            }`}
            aria-invalid={!!errors.eventName}
            aria-describedby={errors.eventName ? "eventName-error" : undefined}
          />
          {errors.eventName && (
            <p id="eventName-error" className="mt-2 text-xs font-medium text-rose-600 flex items-center gap-1">
              <IconAlertCircle className="w-3.5 h-3.5" />
              {errors.eventName}
            </p>
          )}
        </div>

        {/* Event Type */}
        <div>
          <label
            htmlFor="eventType"
            className="block text-[16px] font-semibold text-[#242424] mb-2"
          >
            Event Type <span className="text-rose-600">*</span>
          </label>
          <div className="relative">
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType || ""}
              onChange={(e) => handleChange("eventType", e.target.value)}
              className={`w-full h-[52px] appearance-none px-4 rounded-xl border bg-white text-[#242424] focus:outline-none focus:ring-2 transition-all cursor-pointer text-[16px] ${
                errors.eventType
                  ? "border-rose-400 focus:ring-rose-400/20"
                  : "border-[#E8E1D2] focus:border-[#B88A2E] focus:ring-[#B88A2E]/20"
              }`}
              aria-invalid={!!errors.eventType}
              aria-describedby={errors.eventType ? "eventType-error" : undefined}
            >
              <option value="">Select event category...</option>
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#686868]">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
          {errors.eventType && (
            <p id="eventType-error" className="mt-2 text-xs font-medium text-rose-600 flex items-center gap-1">
              <IconAlertCircle className="w-3.5 h-3.5" />
              {errors.eventType}
            </p>
          )}
        </div>

        {/* Location (City / Region) */}
        <div>
          <label
            htmlFor="location"
            className="block text-[16px] font-semibold text-[#242424] mb-2"
          >
            Location (City / State) <span className="text-rose-600">*</span>
          </label>
          <div className="relative">
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location || ""}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="e.g. Bengaluru, Karnataka"
              className={`w-full h-[52px] pl-11 pr-4 rounded-xl border bg-white text-[#242424] placeholder:text-[15px] placeholder:text-[#888888] focus:outline-none focus:ring-2 transition-all text-[16px] ${
                errors.location
                  ? "border-rose-400 focus:ring-rose-400/20"
                  : "border-[#E8E1D2] focus:border-[#B88A2E] focus:ring-[#B88A2E]/20"
              }`}
              aria-invalid={!!errors.location}
              aria-describedby={errors.location ? "location-error" : undefined}
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#686868]">
              <IconMapPin className="w-4 h-4 text-[#B88A2E]" />
            </div>
          </div>
          {errors.location && (
            <p id="location-error" className="mt-2 text-xs font-medium text-rose-600 flex items-center gap-1">
              <IconAlertCircle className="w-3.5 h-3.5" />
              {errors.location}
            </p>
          )}
        </div>

        {/* Start Date */}
        <div>
          <label
            htmlFor="startDate"
            className="block text-[16px] font-semibold text-[#242424] mb-2"
          >
            Start Date <span className="text-rose-600">*</span>
          </label>
          <div className="relative">
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate || ""}
              onChange={(e) => handleChange("startDate", e.target.value)}
              className={`w-full h-[52px] pl-11 pr-4 rounded-xl border bg-white text-[#242424] focus:outline-none focus:ring-2 transition-all text-[16px] ${
                errors.startDate
                  ? "border-rose-400 focus:ring-rose-400/20"
                  : "border-[#E8E1D2] focus:border-[#B88A2E] focus:ring-[#B88A2E]/20"
              }`}
              aria-invalid={!!errors.startDate}
              aria-describedby={errors.startDate ? "startDate-error" : undefined}
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#686868]">
              <IconCalendar className="w-4 h-4 text-[#B88A2E]" />
            </div>
          </div>
          {errors.startDate && (
            <p id="startDate-error" className="mt-2 text-xs font-medium text-rose-600 flex items-center gap-1">
              <IconAlertCircle className="w-3.5 h-3.5" />
              {errors.startDate}
            </p>
          )}
        </div>

        {/* End Date */}
        <div>
          <label
            htmlFor="endDate"
            className="block text-[16px] font-semibold text-[#242424] mb-2"
          >
            End Date <span className="text-rose-600">*</span>
          </label>
          <div className="relative">
            <input
              id="endDate"
              name="endDate"
              type="date"
              min={formData.startDate || undefined}
              value={formData.endDate || ""}
              onChange={(e) => handleChange("endDate", e.target.value)}
              className={`w-full h-[52px] pl-11 pr-4 rounded-xl border bg-white text-[#242424] focus:outline-none focus:ring-2 transition-all text-[16px] ${
                errors.endDate
                  ? "border-rose-400 focus:ring-rose-400/20"
                  : "border-[#E8E1D2] focus:border-[#B88A2E] focus:ring-[#B88A2E]/20"
              }`}
              aria-invalid={!!errors.endDate}
              aria-describedby={errors.endDate ? "endDate-error" : undefined}
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#686868]">
              <IconCalendar className="w-4 h-4 text-[#B88A2E]" />
            </div>
          </div>
          {errors.endDate && (
            <p id="endDate-error" className="mt-2 text-xs font-medium text-rose-600 flex items-center gap-1">
              <IconAlertCircle className="w-3.5 h-3.5" />
              {errors.endDate}
            </p>
          )}
        </div>

        {/* Optional Venue */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="venue"
              className="block text-[16px] font-semibold text-[#242424]"
            >
              Venue / Address
            </label>
            <span className="text-[14px] text-[#686868] font-medium">Optional</span>
          </div>
          <div className="relative">
            <input
              id="venue"
              name="venue"
              type="text"
              value={formData.venue || ""}
              onChange={(e) => handleChange("venue", e.target.value)}
              placeholder="e.g. Palace Grounds, Main Convention Hall (or leave empty if to be finalized)"
              className="w-full h-[52px] pl-11 pr-4 rounded-xl border border-[#E8E1D2] bg-white text-[#242424] placeholder:text-[15px] placeholder:text-[#888888] focus:outline-none focus:ring-2 focus:border-[#B88A2E] focus:ring-[#B88A2E]/20 transition-all text-[16px]"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#686868]">
              <IconBuilding className="w-4 h-4 text-[#B88A2E]" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Selection Section */}
      <fieldset className="pt-6 border-t border-[#E8E1D2]">
        <div className="flex items-center justify-between mb-2">
          <legend className="text-[18.5px] sm:text-[19px] font-semibold text-[#242424]">
            Requirement Category <span className="text-rose-600">*</span>
          </legend>
          {formData.category && (
            <span className="text-[12.5px] font-semibold px-3 py-1 rounded-full bg-[#FAF8F2] text-[#946B19] border border-[#E8E1D2]">
              Active: {formData.category}
            </span>
          )}
        </div>
        <p className="text-[15.5px] sm:text-[16px] text-[#686868] mb-5 leading-relaxed">
          Select who you are hiring. Steps 2 & 3 will automatically configure to show the relevant specifications.
        </p>

        {errors.category && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-700 text-sm">
            <IconAlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errors.category}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => {
            const isSelected = formData.category === cat.id;
            const CatIcon = cat.icon;

            return (
              <label
                key={cat.id}
                className={`relative flex flex-col p-5 rounded-2xl border transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "border-[#B88A2E] bg-[#FAF8F2] ring-1 ring-[#B88A2E] shadow-xs"
                    : "border-[#E8E1D2] bg-white hover:border-[#B88A2E]/50 hover:bg-[#FAF8F2]/40"
                }`}
              >
                <input
                  type="radio"
                  name="category"
                  value={cat.id}
                  checked={isSelected}
                  onChange={() => handleChange("category", cat.id)}
                  className="sr-only"
                />

                <div className="flex items-center justify-between mb-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-[#B88A2E] text-white shadow-xs"
                        : "bg-[#FAF8F2] text-[#686868] border border-[#E8E1D2]"
                    }`}
                  >
                    <CatIcon className="w-5 h-5" />
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? "border-[#B88A2E] bg-[#B88A2E] text-white"
                        : "border-[#E8E1D2] bg-white"
                    }`}
                  >
                    {isSelected && <IconCheck className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <div className="flex-1">
                  <span className="text-[13px] sm:text-[13.5px] font-semibold tracking-wider text-[#946B19] uppercase">
                    {cat.badge}
                  </span>
                  <h3 className="text-[17.5px] sm:text-[18px] font-semibold text-[#242424] mt-1 leading-snug">
                    {cat.title}
                  </h3>
                  <p className="text-[14px] sm:text-[14.5px] text-[#686868] mt-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
