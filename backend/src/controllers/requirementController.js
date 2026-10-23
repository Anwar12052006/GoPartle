const mongoose = require("mongoose");
const Requirement = require("../models/Requirement");

// Normalization helper for category names (e.g. "planner" -> "Event Planner", "crew" -> "Crew")
const normalizeCategory = (cat) => {
  if (!cat || typeof cat !== "string") return "";
  const cleaned = cat.trim().toLowerCase();
  if (cleaned === "event planner" || cleaned === "planner") return "Event Planner";
  if (cleaned === "performer" || cleaned === "artist") return "Performer";
  if (cleaned === "crew" || cleaned === "staff") return "Crew";
  return cat.trim();
};

/**
 * Validate category-specific fields strictly
 */
const validateCategoryDetails = (category, categoryDetails = {}) => {
  const errors = [];

  if (category === "Event Planner") {
    const services = Array.isArray(categoryDetails.plannerServices)
      ? categoryDetails.plannerServices.filter((s) => typeof s === "string" && s.trim().length > 0)
      : [];
    const deliverables = typeof categoryDetails.keyDeliverables === "string"
      ? categoryDetails.keyDeliverables.trim()
      : "";

    if (services.length === 0 && !deliverables) {
      errors.push("Event Planner requirements must include at least one planning service or key deliverables.");
    }

    // Check for incompatible performer or crew fields
    if (Array.isArray(categoryDetails.performerType) && categoryDetails.performerType.length > 0) {
      errors.push("performerType is not applicable to Event Planner category.");
    }
    if (Array.isArray(categoryDetails.crewRoles) && categoryDetails.crewRoles.length > 0) {
      errors.push("crewRoles is not applicable to Event Planner category.");
    }
  } else if (category === "Performer") {
    const talents = Array.isArray(categoryDetails.performerType)
      ? categoryDetails.performerType.filter((t) => typeof t === "string" && t.trim().length > 0)
      : [];
    const genre = typeof categoryDetails.genreStyle === "string"
      ? categoryDetails.genreStyle.trim()
      : "";

    if (talents.length === 0 && !genre) {
      errors.push("Performer requirements must include at least one talent type or genre/performance style.");
    }

    if (Array.isArray(categoryDetails.plannerServices) && categoryDetails.plannerServices.length > 0) {
      errors.push("plannerServices is not applicable to Performer category.");
    }
    if (Array.isArray(categoryDetails.crewRoles) && categoryDetails.crewRoles.length > 0) {
      errors.push("crewRoles is not applicable to Performer category.");
    }
  } else if (category === "Crew") {
    const roles = Array.isArray(categoryDetails.crewRoles)
      ? categoryDetails.crewRoles.filter((r) => typeof r === "string" && r.trim().length > 0)
      : [];
    const skills = typeof categoryDetails.physicalOrTechnicalSkills === "string"
      ? categoryDetails.physicalOrTechnicalSkills.trim()
      : "";

    if (roles.length === 0 && !skills) {
      errors.push("Crew requirements must include at least one crew role or technical skill specification.");
    }

    if (Array.isArray(categoryDetails.plannerServices) && categoryDetails.plannerServices.length > 0) {
      errors.push("plannerServices is not applicable to Crew category.");
    }
    if (Array.isArray(categoryDetails.performerType) && categoryDetails.performerType.length > 0) {
      errors.push("performerType is not applicable to Crew category.");
    }
  } else {
    errors.push(`Invalid category '${category}'. Allowed categories: Event Planner, Performer, Crew`);
  }

  return errors;
};

/**
 * @desc   Create a new event requirement
 * @route  POST /api/requirements
 * @access Public
 */
exports.createRequirement = async (req, res, next) => {
  try {
    // Check MongoDB connection state safely
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database service is temporarily unavailable. Please try again later.",
      });
    }

    const {
      eventName,
      eventType,
      startDate,
      endDate,
      location,
      venue,
      category,
      categoryDetails,
      quantity,
      budget,
      budgetType,
      currency,
      equipmentProvidedByHost,
      equipmentNeededFromVendor,
      logisticsNotes,
      mealsProvided,
      transportProvided,
      additionalNotes,
    } = req.body || {};

    const validationErrors = [];

    // 1. Shared Event Fields Validation
    if (!eventName || typeof eventName !== "string" || eventName.trim().length < 3) {
      validationErrors.push("Event name is required and must be at least 3 characters long.");
    } else if (eventName.trim().length > 150) {
      validationErrors.push("Event name cannot exceed 150 characters.");
    }

    if (!eventType || typeof eventType !== "string" || eventType.trim().length === 0) {
      validationErrors.push("Event type is required.");
    }

    if (!location || typeof location !== "string" || location.trim().length < 2) {
      validationErrors.push("Location is required and must be at least 2 characters long.");
    }

    if (!startDate) {
      validationErrors.push("Start date is required.");
    }

    if (!endDate) {
      validationErrors.push("End date is required.");
    }

    const parsedStart = new Date(startDate);
    const parsedEnd = new Date(endDate);

    if (isNaN(parsedStart.getTime())) {
      validationErrors.push("Start date is not a valid date format.");
    }
    if (isNaN(parsedEnd.getTime())) {
      validationErrors.push("End date is not a valid date format.");
    }
    if (!isNaN(parsedStart.getTime()) && !isNaN(parsedEnd.getTime()) && parsedStart > parsedEnd) {
      validationErrors.push("End date must be on or after start date.");
    }

    // 2. Category Validation
    const normalizedCat = normalizeCategory(category);
    if (!normalizedCat || !["Event Planner", "Performer", "Crew"].includes(normalizedCat)) {
      validationErrors.push(
        `Invalid or missing category '${category}'. Valid categories are: Event Planner, Performer, Crew.`
      );
    } else {
      // 3. Category-Specific Fields Validation
      const catErrors = validateCategoryDetails(normalizedCat, categoryDetails);
      validationErrors.push(...catErrors);
    }

    // 4. Logistics, Quantity & Budget Validation
    if (quantity === undefined || quantity === null || isNaN(Number(quantity))) {
      validationErrors.push("Quantity is required and must be a number.");
    } else {
      const qtyNum = Number(quantity);
      if (!Number.isInteger(qtyNum) || qtyNum < 1) {
        validationErrors.push("Quantity must be a positive integer (minimum 1).");
      } else if (qtyNum > 1000) {
        validationErrors.push("Quantity cannot exceed 1000.");
      }
    }

    if (budget === undefined || budget === null || budget === "" || isNaN(Number(budget))) {
      validationErrors.push("Budget is required and must be a valid number.");
    } else {
      const budgetNum = Number(budget);
      if (budgetNum < 0) {
        validationErrors.push("Budget cannot be negative.");
      } else if (budgetNum > 1000000000) {
        validationErrors.push("Budget exceeds maximum allowable limit.");
      }
    }

    // Return 400 Bad Request if any validation failed
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: validationErrors.join(" "),
        errors: validationErrors,
      });
    }

    // Clean categoryDetails to only persist fields relevant to the selected category
    const cleanCategoryDetails = {};
    if (normalizedCat === "Event Planner") {
      cleanCategoryDetails.plannerServices = Array.isArray(categoryDetails?.plannerServices)
        ? categoryDetails.plannerServices
        : [];
      cleanCategoryDetails.targetAudienceSize = categoryDetails?.targetAudienceSize || "";
      cleanCategoryDetails.eventTheme = categoryDetails?.eventTheme || "";
      cleanCategoryDetails.experienceLevel = categoryDetails?.experienceLevel || "";
      cleanCategoryDetails.keyDeliverables = categoryDetails?.keyDeliverables || "";
    } else if (normalizedCat === "Performer") {
      cleanCategoryDetails.performerType = Array.isArray(categoryDetails?.performerType)
        ? categoryDetails.performerType
        : [];
      cleanCategoryDetails.genreStyle = categoryDetails?.genreStyle || "";
      cleanCategoryDetails.performanceDuration = categoryDetails?.performanceDuration || "";
      cleanCategoryDetails.languages = Array.isArray(categoryDetails?.languages)
        ? categoryDetails.languages
        : [];
      cleanCategoryDetails.stageSetupRider = categoryDetails?.stageSetupRider || "";
    } else if (normalizedCat === "Crew") {
      cleanCategoryDetails.crewRoles = Array.isArray(categoryDetails?.crewRoles)
        ? categoryDetails.crewRoles
        : [];
      cleanCategoryDetails.shiftDuration = categoryDetails?.shiftDuration || "";
      cleanCategoryDetails.physicalOrTechnicalSkills = categoryDetails?.physicalOrTechnicalSkills || "";
      cleanCategoryDetails.dressCode = categoryDetails?.dressCode || "";
    }

    const requirement = await Requirement.create({
      eventName: eventName.trim(),
      eventType: eventType.trim(),
      startDate: parsedStart,
      endDate: parsedEnd,
      location: location.trim(),
      venue: typeof venue === "string" ? venue.trim() : "",
      category: normalizedCat,
      categoryDetails: cleanCategoryDetails,
      quantity: Number(quantity),
      budget: Number(budget),
      budgetType: budgetType || "Fixed Total",
      currency: currency || "INR",
      equipmentProvidedByHost: Array.isArray(equipmentProvidedByHost) ? equipmentProvidedByHost : [],
      equipmentNeededFromVendor: typeof equipmentNeededFromVendor === "string" ? equipmentNeededFromVendor.trim() : "",
      logisticsNotes: typeof logisticsNotes === "string" ? logisticsNotes.trim() : "",
      mealsProvided: Boolean(mealsProvided),
      transportProvided: Boolean(transportProvided),
      additionalNotes: typeof additionalNotes === "string" ? additionalNotes.trim() : "",
    });

    return res.status(201).json({
      success: true,
      message: "Requirement successfully posted!",
      id: requirement._id,
      category: requirement.category,
      data: requirement,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
        errors: messages,
      });
    }
    next(error);
  }
};

/**
 * @desc   Get single requirement by ID
 * @route  GET /api/requirements/:id
 * @access Public
 */
exports.getRequirementById = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database service is temporarily unavailable. Please try again later.",
      });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid requirement ID format '${id}'. Must be a 24-character hexadecimal ObjectId.`,
      });
    }

    const requirement = await Requirement.findById(id);
    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: "Requirement not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: requirement,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Get all requirements with optional category/status filters & pagination
 * @route  GET /api/requirements
 * @access Public
 */
exports.getRequirements = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database service is temporarily unavailable. Please try again later.",
      });
    }

    const { category, status, limit = 50, page = 1 } = req.query;
    const filter = {};

    if (category && category !== "All") {
      filter.category = normalizeCategory(category);
    }
    if (status) {
      filter.status = status;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
    const skip = (pageNum - 1) * limitNum;

    const [requirements, total] = await Promise.all([
      Requirement.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Requirement.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      count: requirements.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum) || 1,
      data: requirements,
    });
  } catch (error) {
    next(error);
  }
};
