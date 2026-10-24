"use client";

import React from "react";
import {
  IconCheckCircle2,
} from "../Icons";

export default function SuccessState({ result, onReset, onViewList }) {
  const req = result?.data || {};

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl border border-[#E8E1D2] bg-white shadow-xs text-center space-y-5 sm:space-y-6 animate-fadeIn">
      {/* Icon Badge */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 mx-auto rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
        <IconCheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />
      </div>

      {/* Heading */}
      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
          Requirement Published
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#242424] tracking-tight">
          Successfully Posted to GoPratle!
        </h2>
        <p className="text-xs sm:text-sm text-[#686868] max-w-md mx-auto leading-relaxed">
          Your event requirement is now active. Qualified candidates matching your category will be notified.
        </p>
      </div>

      {/* Summary Box */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F2] border border-[#E8E1D2] text-left space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 border-b border-[#E8E1D2] pb-2.5">
          <span className="text-xs font-semibold text-[#686868]">
            Requirement Reference ID
          </span>
          <code className="text-xs font-mono font-bold text-[#946B19] bg-white border border-[#E8E1D2] px-2.5 py-0.5 rounded break-all self-start sm:self-auto">
            {req._id || "GP-REQ-CONFIRMED"}
          </code>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div>
            <p className="text-[11px] sm:text-xs text-[#686868]">Event</p>
            <p className="font-bold text-[#242424] truncate">
              {req.eventName}
            </p>
          </div>
          <div>
            <p className="text-[11px] sm:text-xs text-[#686868]">Category & Type</p>
            <p className="font-bold text-[#946B19]">
              {req.category} • {req.eventType}
            </p>
          </div>
          <div>
            <p className="text-[11px] sm:text-xs text-[#686868]">Location</p>
            <p className="font-medium text-[#242424]">
              {req.location} {req.venue ? `(${req.venue})` : ""}
            </p>
          </div>
          <div>
            <p className="text-[11px] sm:text-xs text-[#686868]">Budget & Scope</p>
            <p className="font-bold text-[#946B19]">
              {req.currency === "USD" ? "$" : "₹"}
              {Number(req.budget || 0).toLocaleString()} • {req.quantity} Needed
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#B88A2E] hover:bg-[#946B19] text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer text-center"
        >
          Post Another Requirement
        </button>

        {onViewList && (
          <button
            type="button"
            onClick={onViewList}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-[#E8E1D2] bg-white hover:bg-[#FAF8F2] text-[#242424] font-semibold text-xs sm:text-sm transition-colors cursor-pointer text-center"
          >
            View Live Postings Feed
          </button>
        )}
      </div>
    </div>
  );
}
