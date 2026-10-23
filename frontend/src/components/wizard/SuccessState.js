"use client";

import React from "react";
import {
  IconCheckCircle2,
} from "../Icons";

export default function SuccessState({ result, onReset, onViewList }) {
  const req = result?.data || {};

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-10 rounded-2xl border border-[#E8E1D2] bg-white shadow-xs text-center space-y-6 animate-fadeIn">
      {/* Icon Badge */}
      <div className="w-16 h-16 sm:w-18 sm:h-18 mx-auto rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
        <IconCheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10" />
      </div>

      {/* Heading */}
      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
          Requirement Published
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#242424] tracking-tight">
          Successfully Posted to GoPratle!
        </h2>
        <p className="text-sm text-[#686868] max-w-md mx-auto">
          Your event requirement is now active. Qualified candidates matching your category will be notified.
        </p>
      </div>

      {/* Summary Box */}
      <div className="p-5 rounded-xl bg-[#FAF8F2] border border-[#E8E1D2] text-left space-y-3">
        <div className="flex items-center justify-between border-b border-[#E8E1D2] pb-2.5">
          <span className="text-xs font-semibold text-[#686868]">
            Requirement Reference ID
          </span>
          <code className="text-xs font-mono font-bold text-[#946B19] bg-white border border-[#E8E1D2] px-2.5 py-0.5 rounded">
            {req._id || "GP-REQ-CONFIRMED"}
          </code>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-[#686868]">Event</p>
            <p className="font-bold text-[#242424] truncate">
              {req.eventName}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#686868]">Category & Type</p>
            <p className="font-bold text-[#946B19]">
              {req.category} • {req.eventType}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#686868]">Location</p>
            <p className="font-medium text-[#242424]">
              {req.location} {req.venue ? `(${req.venue})` : ""}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#686868]">Budget & Scope</p>
            <p className="font-bold text-[#946B19]">
              {req.currency === "USD" ? "$" : "₹"}
              {Number(req.budget || 0).toLocaleString()} • {req.quantity} Needed
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#B88A2E] hover:bg-[#946B19] text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
        >
          Post Another Requirement
        </button>

        {onViewList && (
          <button
            type="button"
            onClick={onViewList}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#E8E1D2] bg-white hover:bg-[#FAF8F2] text-[#242424] font-semibold text-sm transition-colors cursor-pointer"
          >
            View Live Postings Feed
          </button>
        )}
      </div>
    </div>
  );
}
