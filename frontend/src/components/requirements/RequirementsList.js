"use client";

import React, { useEffect, useState } from "react";
import { getRequirements } from "@/lib/api";
import {
  IconBriefcase,
  IconMic,
  IconWrench,
  IconCalendar,
  IconMapPin,
  IconSpinner,
  IconAlertCircle,
  IconSparkles,
} from "../Icons";

export default function RequirementsList({ onNewPostingClick }) {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    let ignore = false;
    const params = selectedCategory && selectedCategory !== "All" ? { category: selectedCategory } : {};

    getRequirements(params)
      .then((res) => {
        if (!ignore) {
          setRequirements(res.data || []);
          setError(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message || "Failed to load requirements");
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [selectedCategory]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Banner / Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-[#E8E1D2] rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-[22px] md:text-[24px] font-bold text-[#242424] flex items-center gap-2 sm:gap-2.5">
            <IconSparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#B88A2E] shrink-0" />
            Live Event Requirements
          </h2>
          <p className="text-xs sm:text-[14px] text-[#686868] mt-1">
            Real-time requirements fetched directly from the GoPratle backend & database.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Category Tabs */}
          <div className="flex items-center bg-[#FAF8F2] border border-[#E8E1D2] p-1 rounded-xl overflow-x-auto max-w-full">
            {["All", "Event Planner", "Performer", "Crew"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-[14px] transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? "bg-white text-[#946B19] shadow-xs border border-[#E8E1D2] font-semibold"
                    : "text-[#686868] hover:text-[#242424] hover:bg-white/60 font-medium"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onNewPostingClick}
            className="w-full sm:w-auto px-4 sm:px-4.5 py-2 sm:py-2 rounded-xl bg-[#B88A2E] hover:bg-[#946B19] text-white font-semibold text-xs sm:text-[14px] shadow-xs transition-colors cursor-pointer text-center whitespace-nowrap shrink-0"
          >
            + Post Requirement
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
          <IconSpinner className="w-8 h-8 text-[#B88A2E] animate-spin" />
          <p className="text-sm font-medium text-[#686868]">
            Fetching active requirements...
          </p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="p-6 text-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-700">
          <IconAlertCircle className="w-8 h-8 mx-auto mb-2 text-rose-500" />
          <h3 className="font-bold text-sm">Failed to connect to backend</h3>
          <p className="text-xs mt-1 text-rose-600">{error}</p>
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              const params = selectedCategory && selectedCategory !== "All" ? { category: selectedCategory } : {};
              getRequirements(params)
                .then((res) => {
                  setRequirements(res.data || []);
                  setError(null);
                  setLoading(false);
                })
                .catch((err) => {
                  setError(err.message || "Failed to load requirements");
                  setLoading(false);
                });
            }}
            className="mt-4 px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && requirements.length === 0 && (
        <div className="py-16 text-center rounded-2xl border border-dashed border-[#E8E1D2] bg-white p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#FAF8F2] border border-[#E8E1D2] flex items-center justify-center text-[#B88A2E] mx-auto">
            <IconBriefcase className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[18px] font-semibold text-[#242424]">
              No requirements found
            </h3>
            <p className="text-[14px] text-[#686868] mt-1.5 max-w-sm mx-auto">
              {selectedCategory !== "All"
                ? `No requirements currently posted for ${selectedCategory}.`
                : "No event requirements have been posted yet. Create the first one now!"}
            </p>
          </div>
          <button
            type="button"
            onClick={onNewPostingClick}
            className="px-5 py-2.5 rounded-xl bg-[#B88A2E] hover:bg-[#946B19] text-white font-semibold text-[14px] shadow-xs transition-colors cursor-pointer"
          >
            Launch Wizard & Post
          </button>
        </div>
      )}

      {/* List Grid */}
      {!loading && !error && requirements.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requirements.map((req) => {
            const isPlanner = req.category === "Event Planner";
            const isPerformer = req.category === "Performer";
            const isCrew = req.category === "Crew";

            return (
              <div
                key={req._id}
                className="rounded-xl sm:rounded-2xl border border-[#E8E1D2] bg-white p-4 sm:p-5 shadow-xs hover:border-[#B88A2E]/50 transition-colors flex flex-col justify-between space-y-3.5 sm:space-y-4"
              >
                <div className="space-y-2 sm:space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-[13px] font-semibold uppercase tracking-wider bg-[#FAF8F2] text-[#946B19] border border-[#E8E1D2]">
                      {isPlanner && <IconBriefcase className="w-3.5 h-3.5 text-[#B88A2E]" />}
                      {isPerformer && <IconMic className="w-3.5 h-3.5 text-[#B88A2E]" />}
                      {isCrew && <IconWrench className="w-3.5 h-3.5 text-[#B88A2E]" />}
                      {req.category}
                    </span>

                    <span className="text-[11px] sm:text-[12.5px] font-medium text-[#686868] shrink-0">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-[18.5px] font-semibold text-[#242424] leading-snug">
                    {req.eventName}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1 text-xs sm:text-[14.5px] text-[#686868]">
                    <span className="flex items-center gap-1.5">
                      <IconCalendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B88A2E] shrink-0" />
                      {new Date(req.startDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <IconMapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B88A2E] shrink-0" />
                      <span className="truncate max-w-[200px] sm:max-w-none">{req.location}</span>
                    </span>
                  </div>

                  {/* Highlights */}
                  {req.categoryDetails && (
                    <div className="pt-1 flex flex-wrap gap-1 sm:gap-1.5">
                      {isPlanner &&
                        req.categoryDetails.plannerServices?.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-xs sm:text-[13px] font-medium bg-[#FAF8F2] border border-[#E8E1D2] text-[#242424]"
                          >
                            {s}
                          </span>
                        ))}
                      {isPerformer &&
                        req.categoryDetails.performerType?.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-xs sm:text-[13px] font-medium bg-[#FAF8F2] border border-[#E8E1D2] text-[#242424]"
                          >
                            {t}
                          </span>
                        ))}
                      {isCrew &&
                        req.categoryDetails.crewRoles?.slice(0, 3).map((r) => (
                          <span
                            key={r}
                            className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-xs sm:text-[13px] font-medium bg-[#FAF8F2] border border-[#E8E1D2] text-[#242424]"
                          >
                            {r}
                          </span>
                        ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#E8E1D2] flex flex-wrap items-center justify-between gap-2 text-xs sm:text-[14.5px]">
                  <div>
                    <span className="text-[#686868]">Budget: </span>
                    <span className="font-bold text-[#946B19]">
                      {req.currency === "USD" ? "$" : "₹"}
                      {Number(req.budget).toLocaleString()}
                    </span>
                    <span className="text-[#686868] text-[11px] sm:text-[13.5px]"> ({req.budgetType})</span>
                  </div>

                  <span className="text-[#686868] font-medium text-xs sm:text-[14px]">
                    {req.quantity} needed
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
