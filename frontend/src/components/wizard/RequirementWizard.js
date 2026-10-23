"use client";

import React, { useState, useCallback } from "react";
import WizardStepper from "./WizardStepper";
import Step1EventInfo from "./Step1EventInfo";
import Step2CategorySpecific from "./Step2CategorySpecific";
import Step3LogisticsBudget from "./Step3LogisticsBudget";
import Step4ReviewSubmit from "./Step4ReviewSubmit";
import SuccessState from "./SuccessState";
import { createRequirement } from "@/lib/api";
import { IconChevronLeft, IconChevronRight } from "../Icons";

const INITIAL_FORM_STATE = {
  eventName: "",
  eventType: "",
  startDate: "",
  endDate: "",
  location: "",
  venue: "",
  category: "",
  categoryDetails: {
    plannerServices: [],
    targetAudienceSize: "",
    eventTheme: "",
    experienceLevel: "",
    keyDeliverables: "",
    performerType: [],
    genreStyle: "",
    performanceDuration: "",
    languages: [],
    stageSetupRider: "",
    crewRoles: [],
    shiftDuration: "",
    physicalOrTechnicalSkills: "",
    dressCode: "",
  },
  quantity: 1,
  budget: "",
  budgetType: "Fixed Total",
  currency: "INR",
  equipmentProvidedByHost: [],
  equipmentNeededFromVendor: "",
  logisticsNotes: "",
  mealsProvided: false,
  transportProvided: false,
  additionalNotes: "",
};

export default function RequirementWizard({ onRequirementPosted, onViewList }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  // Centralized form updater that preserves state
  const updateFormData = useCallback((fields) => {
    setFormData((prev) => ({
      ...prev,
      ...fields,
    }));
  }, []);

  const clearError = useCallback((field) => {
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  }, []);

  // Validation routines per step
  const validateStep = (step) => {
    const stepErrors = {};

    if (step === 1) {
      if (!formData.eventName || formData.eventName.trim().length < 3) {
        stepErrors.eventName = "Event name must be at least 3 characters.";
      }
      if (!formData.eventType) {
        stepErrors.eventType = "Please select an event type.";
      }
      if (!formData.location || formData.location.trim().length < 2) {
        stepErrors.location = "Please enter an event location or city.";
      }
      if (!formData.startDate) {
        stepErrors.startDate = "Start date is required.";
      }
      if (!formData.endDate) {
        stepErrors.endDate = "End date is required.";
      } else if (
        formData.startDate &&
        new Date(formData.startDate) > new Date(formData.endDate)
      ) {
        stepErrors.endDate = "End date cannot be earlier than start date.";
      }
      if (!formData.category) {
        stepErrors.category = "Please choose a requirement category.";
      }
    }

    if (step === 2) {
      const cat = formData.category;
      const details = formData.categoryDetails || {};

      if (cat === "Event Planner") {
        const hasServices =
          Array.isArray(details.plannerServices) &&
          details.plannerServices.length > 0;
        if (!hasServices && !details.keyDeliverables?.trim()) {
          stepErrors.categorySpecific =
            "Please select at least one planning service or enter key deliverables.";
        }
      } else if (cat === "Performer") {
        const hasPerformerType =
          Array.isArray(details.performerType) &&
          details.performerType.length > 0;
        if (!hasPerformerType && !details.genreStyle?.trim()) {
          stepErrors.categorySpecific =
            "Please select at least one talent type or specify the genre/style.";
        }
      } else if (cat === "Crew") {
        const hasRoles =
          Array.isArray(details.crewRoles) && details.crewRoles.length > 0;
        if (!hasRoles && !details.physicalOrTechnicalSkills?.trim()) {
          stepErrors.categorySpecific =
            "Please select at least one crew role or specify required technical skills.";
        }
      }
    }

    if (step === 3) {
      if (!formData.quantity || Number(formData.quantity) < 1) {
        stepErrors.quantity = "Quantity must be at least 1.";
      }
      if (
        formData.budget === "" ||
        formData.budget === undefined ||
        formData.budget === null ||
        Number(formData.budget) <= 0
      ) {
        stepErrors.budget = "Please specify a valid budget amount greater than 0.";
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  // Step Navigation Handlers
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setErrors({});
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setMaxStepReached((prev) => Math.max(prev, nextStep));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setErrors({});
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStepClick = (stepId) => {
    if (stepId <= maxStepReached) {
      setErrors({});
      setCurrentStep(stepId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Submit Handler
  const handleSubmit = async () => {
    const isStep1Valid = validateStep(1);
    const isStep2Valid = validateStep(2);
    const isStep3Valid = validateStep(3);

    if (!isStep1Valid || !isStep2Valid || !isStep3Valid) {
      setSubmissionError(
        "Some required fields are missing or invalid. Please check previous steps."
      );
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const payload = {
        eventName: formData.eventName.trim(),
        eventType: formData.eventType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        location: formData.location.trim(),
        venue: formData.venue ? formData.venue.trim() : "",
        category: formData.category,
        categoryDetails: formData.categoryDetails || {},
        quantity: Number(formData.quantity) || 1,
        budget: Number(formData.budget),
        budgetType: formData.budgetType || "Fixed Total",
        currency: formData.currency || "INR",
        equipmentProvidedByHost: Array.isArray(formData.equipmentProvidedByHost)
          ? formData.equipmentProvidedByHost
          : [],
        equipmentNeededFromVendor: formData.equipmentNeededFromVendor || "",
        logisticsNotes: formData.logisticsNotes || "",
        mealsProvided: Boolean(formData.mealsProvided),
        transportProvided: Boolean(formData.transportProvided),
        additionalNotes: formData.additionalNotes || "",
      };

      const result = await createRequirement(payload);

      setSubmissionSuccess(result);
      if (onRequirementPosted) {
        onRequirementPosted(result.data);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmissionError(
        err.message ||
          "Failed to submit requirement. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setCurrentStep(1);
    setMaxStepReached(1);
    setSubmissionSuccess(null);
    setSubmissionError(null);
  };

  if (submissionSuccess) {
    return (
      <SuccessState
        result={submissionSuccess}
        onReset={handleResetForm}
        onViewList={onViewList}
      />
    );
  }

  return (
    <div className="w-full max-w-[980px] mx-auto space-y-7">
      {/* Interactive Progress Stepper */}
      <WizardStepper
        currentStep={currentStep}
        onStepClick={handleStepClick}
        maxStepReached={maxStepReached}
      />

      {/* Main Step Container Form */}
      <div className="bg-white border border-[#E8E1D2] rounded-2xl p-7 sm:p-10 shadow-xs">
        {/* Step Views */}
        <div>
          {currentStep === 1 && (
            <Step1EventInfo
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
              clearError={clearError}
            />
          )}

          {currentStep === 2 && (
            <Step2CategorySpecific
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
              clearError={clearError}
            />
          )}

          {currentStep === 3 && (
            <Step3LogisticsBudget
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
              clearError={clearError}
            />
          )}

          {currentStep === 4 && (
            <Step4ReviewSubmit
              formData={formData}
              onEditStep={(step) => {
                setCurrentStep(step);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submissionError={submissionError}
            />
          )}
        </div>

        {/* Navigation Action Buttons for Steps 1, 2, 3 */}
        {currentStep < 4 && (
          <div className="mt-8 pt-6 border-t border-[#E8E1D2] flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl border border-[#E8E1D2] bg-white hover:bg-[#FAF8F2] text-[#242424] font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <IconChevronLeft className="w-4 h-4 text-[#686868]" />
                Previous Step
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-[#B88A2E] hover:bg-[#946B19] text-white font-semibold text-sm shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              Continue to Step {currentStep + 1}
              <IconChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
