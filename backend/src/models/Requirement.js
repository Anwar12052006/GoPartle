const mongoose = require("mongoose");

const VALID_CATEGORIES = ["Event Planner", "Performer", "Crew"];
const VALID_BUDGET_TYPES = [
  "Fixed Total",
  "Per Day",
  "Per Person",
  "Hourly",
  "Negotiable",
];
const VALID_CURRENCIES = ["INR", "USD", "EUR", "GBP"];
const VALID_STATUSES = ["Open", "In Review", "Assigned", "Completed", "Cancelled"];

const requirementSchema = new mongoose.Schema(
  {
    // Shared Event Fields
    eventName: {
      type: String,
      required: [true, "Event name is required"],
      trim: true,
      minlength: [3, "Event name must be at least 3 characters long"],
      maxlength: [150, "Event name cannot exceed 150 characters"],
    },
    eventType: {
      type: String,
      required: [true, "Event type is required"],
      trim: true,
      maxlength: [100, "Event type cannot exceed 100 characters"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      minlength: [2, "Location must be at least 2 characters long"],
      maxlength: [200, "Location cannot exceed 200 characters"],
    },
    venue: {
      type: String,
      trim: true,
      maxlength: [200, "Venue cannot exceed 200 characters"],
      default: "",
    },
    category: {
      type: String,
      required: [true, "Category selection is required"],
      enum: {
        values: VALID_CATEGORIES,
        message: "{VALUE} is not a valid category. Choose from: Event Planner, Performer, Crew",
      },
    },

    // Category-Specific Details
    categoryDetails: {
      // Event Planner specific
      plannerServices: {
        type: [{ type: String, trim: true, maxlength: 100 }],
        default: undefined,
      },
      targetAudienceSize: {
        type: String,
        trim: true,
        maxlength: [50, "Target audience size cannot exceed 50 characters"],
      },
      eventTheme: {
        type: String,
        trim: true,
        maxlength: [100, "Event theme cannot exceed 100 characters"],
      },
      experienceLevel: {
        type: String,
        trim: true,
        maxlength: [100, "Experience level cannot exceed 100 characters"],
      },
      keyDeliverables: {
        type: String,
        trim: true,
        maxlength: [1000, "Key deliverables cannot exceed 1000 characters"],
      },

      // Performer specific
      performerType: {
        type: [{ type: String, trim: true, maxlength: 100 }],
        default: undefined,
      },
      genreStyle: {
        type: String,
        trim: true,
        maxlength: [100, "Genre / performance style cannot exceed 100 characters"],
      },
      performanceDuration: {
        type: String,
        trim: true,
        maxlength: [100, "Performance duration cannot exceed 100 characters"],
      },
      languages: {
        type: [{ type: String, trim: true, maxlength: 50 }],
        default: undefined,
      },
      stageSetupRider: {
        type: String,
        trim: true,
        maxlength: [1000, "Stage setup rider cannot exceed 1000 characters"],
      },

      // Crew specific
      crewRoles: {
        type: [{ type: String, trim: true, maxlength: 100 }],
        default: undefined,
      },
      shiftDuration: {
        type: String,
        trim: true,
        maxlength: [100, "Shift duration cannot exceed 100 characters"],
      },
      physicalOrTechnicalSkills: {
        type: String,
        trim: true,
        maxlength: [1000, "Physical or technical skills cannot exceed 1000 characters"],
      },
      dressCode: {
        type: String,
        trim: true,
        maxlength: [100, "Dress code cannot exceed 100 characters"],
      },
    },

    // Logistics, Quantity, Equipment, Commercials
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      max: [1000, "Quantity cannot exceed 1000"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be a whole integer",
      },
      default: 1,
    },
    budget: {
      type: Number,
      required: [true, "Budget is required"],
      min: [0, "Budget cannot be negative"],
      max: [1000000000, "Budget exceeds maximum allowed threshold"],
    },
    budgetType: {
      type: String,
      default: "Fixed Total",
      enum: {
        values: VALID_BUDGET_TYPES,
        message: "{VALUE} is not a valid budget type",
      },
    },
    currency: {
      type: String,
      default: "INR",
      enum: {
        values: VALID_CURRENCIES,
        message: "{VALUE} is not a supported currency. Choose from: INR, USD, EUR, GBP",
      },
    },
    equipmentProvidedByHost: {
      type: [{ type: String, trim: true, maxlength: 100 }],
      default: [],
    },
    equipmentNeededFromVendor: {
      type: String,
      trim: true,
      maxlength: [500, "Equipment needed from vendor cannot exceed 500 characters"],
      default: "",
    },
    logisticsNotes: {
      type: String,
      trim: true,
      maxlength: [1000, "Logistics notes cannot exceed 1000 characters"],
      default: "",
    },
    mealsProvided: {
      type: Boolean,
      default: false,
    },
    transportProvided: {
      type: Boolean,
      default: false,
    },
    additionalNotes: {
      type: String,
      trim: true,
      maxlength: [2000, "Additional notes cannot exceed 2000 characters"],
      default: "",
    },
    status: {
      type: String,
      default: "Open",
      enum: {
        values: VALID_STATUSES,
        message: "{VALUE} is not a valid requirement status",
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        ret.id = ret._id;
        return ret;
      },
    },
  }
);

// Date range validation helper
requirementSchema.pre("validate", function () {
  if (this.startDate && this.endDate && new Date(this.startDate) > new Date(this.endDate)) {
    this.invalidate("endDate", "End date must be on or after start date");
  }
});

module.exports = mongoose.model("Requirement", requirementSchema);
module.exports.VALID_CATEGORIES = VALID_CATEGORIES;
module.exports.VALID_BUDGET_TYPES = VALID_BUDGET_TYPES;
