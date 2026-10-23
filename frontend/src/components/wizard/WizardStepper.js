"use client";

import React from "react";
import { IconCheck } from "../Icons";

export const WIZARD_STEPS = [
  {
    id: 1,
    title: "Event & Category",
    description: "Core details & role",
  },
  {
    id: 2,
    title: "Requirements",
    description: "Category specifications",
  },
  {
    id: 3,
    title: "Logistics & Budget",
    description: "Scope, gear & commercials",
  },
  {
    id: 4,
    title: "Review & Submit",
    description: "Final verification",
  },
];

export default function WizardStepper({ currentStep, onStepClick, maxStepReached = 1 }) {
  const progressPercent = ((currentStep - 1) / (WIZARD_STEPS.length - 1)) * 100;

  return (
    <nav
      aria-label="Requirement wizard progress"
      className="w-full bg-white border border-[#E8E1D2] rounded-2xl p-5 sm:py-6 sm:px-6 shadow-xs"
    >
      {/* Mobile Stepper View */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] font-semibold tracking-wider text-[#946B19] uppercase">
            Step {currentStep} of {WIZARD_STEPS.length}
          </span>
          <span className="text-[13.5px] font-medium text-[#686868]">
            {Math.round(progressPercent)}% completed
          </span>
        </div>
        <h2 className="text-lg font-bold text-[#242424] mb-3">
          {WIZARD_STEPS[currentStep - 1].title}
        </h2>
        <div className="w-full bg-[#FAF8F2] border border-[#E8E1D2] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#B88A2E] h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.max(12, progressPercent)}%` }}
          />
        </div>
      </div>

      {/* Desktop Stepper View */}
      <div className="hidden md:block">
        <ol className="grid grid-cols-4 gap-3.5 relative">
          {WIZARD_STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isClickable = step.id <= maxStepReached && !isCurrent;

            return (
              <li key={step.id} className="relative">
                <button
                  type="button"
                  onClick={() => isClickable && onStepClick(step.id)}
                  disabled={!isClickable}
                  aria-current={isCurrent ? "step" : undefined}
                  className={`w-full text-left transition-all duration-150 rounded-xl p-3 sm:py-3.5 sm:px-3.5 flex items-start gap-3.5 border ${
                    isCurrent
                      ? "bg-[#FAF8F2] border-[#B88A2E] ring-1 ring-[#B88A2E]"
                      : isCompleted
                      ? "bg-white border-[#E8E1D2] hover:bg-[#FAF8F2] cursor-pointer"
                      : isClickable
                      ? "bg-white border-[#E8E1D2] hover:bg-[#FAF8F2] cursor-pointer"
                      : "bg-[#FAF8F2]/60 border-transparent cursor-not-allowed opacity-65"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-semibold text-[15.5px] transition-colors ${
                      isCurrent
                        ? "bg-[#B88A2E] text-white shadow-xs"
                        : isCompleted
                        ? "bg-[#F5EBD3] text-[#946B19] border border-[#B88A2E]/40"
                        : "bg-white text-[#686868] border border-[#E8E1D2]"
                    }`}
                  >
                    {isCompleted ? <IconCheck className="w-4 h-4 text-[#946B19]" /> : step.id}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-[13px] font-semibold uppercase tracking-wider ${
                        isCurrent
                          ? "text-[#946B19]"
                          : isCompleted
                          ? "text-[#686868]"
                          : "text-[#686868]"
                      }`}
                    >
                      Step 0{step.id}
                    </p>
                    <p
                      className={`text-[16px] sm:text-[16.5px] font-semibold leading-snug ${
                        isCurrent
                          ? "text-[#242424]"
                          : "text-[#242424]"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-[13.5px] sm:text-[14px] text-[#686868] mt-0.5 leading-snug">
                      {step.description}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Global Progress Line Bar */}
        <div className="mt-4 sm:mt-5 px-1">
          <div className="w-full bg-[#FAF8F2] border border-[#E8E1D2] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#B88A2E] h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent === 0 ? 5 : progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
