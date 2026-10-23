/**
 * Comprehensive Backend Test Suite for GoPratle Requirement Flow
 * Tests all required scenarios:
 * 1. Health check (GET /api/health)
 * 2. Valid Event Planner submission (POST /api/requirements)
 * 3. Valid Performer submission (POST /api/requirements)
 * 4. Valid Crew submission (POST /api/requirements)
 * 5. Fetch single requirement by ID (GET /api/requirements/:id)
 * 6. Fetch with non-existent ID (GET /api/requirements/:id -> 404)
 * 7. Fetch with invalid ID format (GET /api/requirements/:id -> 400)
 * 8. Missing required fields (400)
 * 9. Invalid date range (400)
 * 10. Invalid budget (400)
 * 11. Invalid quantity (400)
 * 12. Invalid category (400)
 * 13. Invalid category-specific payload (400)
 * 14. Conflicting category-specific fields (400)
 * 15. Safe handling and no credential leakage
 */

const API_BASE = "http://localhost:5000/api";

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m",
};

let passed = 0;
let failed = 0;

async function runTest(testName, fn) {
  try {
    process.stdout.write(`• ${testName} ... `);
    const result = await fn();
    console.log(`${colors.green}PASSED${colors.reset}`);
    if (result && typeof result === "string") {
      console.log(`    ↳ ${colors.cyan}${result}${colors.reset}`);
    }
    passed++;
  } catch (error) {
    console.log(`${colors.red}FAILED${colors.reset}`);
    console.error(`    ↳ Error: ${error.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  return { status: response.status, ok: response.ok, data };
}

async function main() {
  console.log(`\n${colors.bold}========================================${colors.reset}`);
  console.log(`${colors.bold}   GOPRATLE BACKEND TEST SUITE RUNNER   ${colors.reset}`);
  console.log(`${colors.bold}========================================\n${colors.reset}`);

  let createdPlannerId = null;
  let createdPerformerId = null;
  let createdCrewId = null;

  // TEST 1: Health check
  await runTest("GET /api/health returns 200 with server status", async () => {
    const res = await request("/health");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.success === true, "Expected success: true");
    assert(res.data.message === "GoPartle backend is running", `Expected message 'GoPartle backend is running', got '${res.data.message}'`);
    assert(res.data.database === "connected", `Expected database: connected, got ${res.data.database}`);
    return `Server healthy, message: "${res.data.message}", DB status: ${res.data.database}`;
  });

  // TEST 2: Valid Event Planner submission
  await runTest("POST /api/requirements (Valid Event Planner)", async () => {
    const payload = {
      eventName: "Grand Corporate Annual Gala 2026",
      eventType: "Corporate Conference",
      startDate: "2026-11-15T09:00:00.000Z",
      endDate: "2026-11-17T18:00:00.000Z",
      location: "Bengaluru, Karnataka",
      venue: "The Leela Palace Ballroom",
      category: "Event Planner",
      categoryDetails: {
        plannerServices: ["Full Turnkey Event Planning", "Theme & Decor Styling", "Vendor Sourcing & Management"],
        targetAudienceSize: "Large (200-500)",
        eventTheme: "Royal Gold & Modern Elegance",
        experienceLevel: "Senior / Full Production Agency (5+ years)",
        keyDeliverables: "3D stage blueprint, run-down timeline, vendor management contracts",
      },
      quantity: 2,
      budget: 150000,
      budgetType: "Fixed Total",
      currency: "INR",
      equipmentProvidedByHost: ["Stage & Elevated Platform", "High-Speed Wi-Fi & AV Connectivity"],
      equipmentNeededFromVendor: "Walkie-talkie headsets, run-sheet folders",
      logisticsNotes: "Planning checkpoint calls every Tuesday. On-site walkthrough 3 days before event.",
      mealsProvided: true,
      transportProvided: true,
      additionalNotes: "Standard NDA mandatory upon shortlisting.",
    };

    const res = await request("/requirements", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    assert(res.status === 201, `Expected 201, got ${res.status}: ${res.data.message}`);
    assert(res.data.success === true, "Expected success: true");
    assert(res.data.id || res.data._id, "Expected created requirement ID");
    assert(res.data.category === "Event Planner", `Expected category: Event Planner, got ${res.data.category}`);
    assert(res.data.message === "Requirement successfully posted!", `Unexpected message: ${res.data.message}`);

    createdPlannerId = res.data.id || res.data.data._id;
    return `Created ID: ${createdPlannerId} (Category: ${res.data.category})`;
  });

  // TEST 3: Valid Performer submission
  await runTest("POST /api/requirements (Valid Performer)", async () => {
    const payload = {
      eventName: "Bengaluru Indie & Sufi Fusion Fest",
      eventType: "Concert / Music Festival",
      startDate: "2026-12-05T17:00:00.000Z",
      endDate: "2026-12-06T23:00:00.000Z",
      location: "Bengaluru, KA",
      venue: "Palace Grounds Main Arena",
      category: "Performer",
      categoryDetails: {
        performerType: ["Live Band", "Solo Vocalist / Singer"],
        genreStyle: "Sufi Fusion & Indie Rock",
        performanceDuration: "90 - 120 Minutes (Concert set)",
        languages: ["Hindi", "English", "Urdu"],
        stageSetupRider: "4 wireless Shure microphones, 2 monitor wedges, drum kit, DI boxes",
      },
      quantity: 5,
      budget: 250000,
      budgetType: "Fixed Total",
      currency: "INR",
      equipmentProvidedByHost: ["Stage & Elevated Platform", "Sound / PA System & Line Array", "Artist & Crew Reserved Parking"],
      equipmentNeededFromVendor: "Personal instruments and guitar effect pedals",
      logisticsNotes: "Soundcheck at 3:00 PM sharp. Green room with bottled water and tea provided.",
      mealsProvided: true,
      transportProvided: true,
      additionalNotes: "50% advance upon contract signing.",
    };

    const res = await request("/requirements", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    assert(res.status === 201, `Expected 201, got ${res.status}: ${res.data.message}`);
    assert(res.data.success === true, "Expected success: true");
    assert(res.data.category === "Performer", "Expected category: Performer");

    createdPerformerId = res.data.id || res.data.data._id;
    return `Created ID: ${createdPerformerId} (Category: ${res.data.category})`;
  });

  // TEST 4: Valid Crew submission
  await runTest("POST /api/requirements (Valid Crew)", async () => {
    const payload = {
      eventName: "Global Tech Expo & Summit 2026",
      eventType: "Exhibition & Trade Show",
      startDate: "2026-12-10T08:00:00.000Z",
      endDate: "2026-12-12T20:00:00.000Z",
      location: "Mumbai, Maharashtra",
      venue: "Jio World Convention Centre",
      category: "Crew",
      categoryDetails: {
        crewRoles: ["Live Sound & Audio Engineer", "Lighting Console Operator (DMX)", "Stage Manager / Runner"],
        shiftDuration: "Full Production Day (10-12 Hours)",
        physicalOrTechnicalSkills: "Must have Yamaha CL5 audio console certification and DMX fixture setup experience",
        dressCode: "Production All-Black (T-shirt/Polo & cargo)",
      },
      quantity: 4,
      budget: 80000,
      budgetType: "Fixed Total",
      currency: "INR",
      equipmentProvidedByHost: ["Sound / PA System & Line Array", "Dedicated 3-Phase Power Generator"],
      equipmentNeededFromVendor: "Tool pouch, multimeter, safety gloves",
      logisticsNotes: "Reporting call-time 7:30 AM at Loading Bay 2. Production lead conducts orientation.",
      mealsProvided: true,
      transportProvided: false,
      additionalNotes: "Safety footwear and hardhats mandatory in setup zone.",
    };

    const res = await request("/requirements", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    assert(res.status === 201, `Expected 201, got ${res.status}: ${res.data.message}`);
    assert(res.data.success === true, "Expected success: true");
    assert(res.data.category === "Crew", "Expected category: Crew");

    createdCrewId = res.data.id || res.data.data._id;
    return `Created ID: ${createdCrewId} (Category: ${res.data.category})`;
  });

  // TEST 5: GET /api/requirements/:id (Valid ID)
  await runTest("GET /api/requirements/:id with existing ID", async () => {
    assert(createdPlannerId, "No planner ID available from earlier test");
    const res = await request(`/requirements/${createdPlannerId}`);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.success === true, "Expected success: true");
    assert(res.data.data._id === createdPlannerId, "Fetched document ID mismatch");
    assert(res.data.data.eventName === "Grand Corporate Annual Gala 2026", "Event name mismatch");
    return `Retrieved: "${res.data.data.eventName}" (${res.data.data.category})`;
  });

  // TEST 6: GET /api/requirements/:id with non-existent ID (404)
  await runTest("GET /api/requirements/:id with non-existent ObjectId returns 404", async () => {
    const nonExistentId = "507f1f77bcf86cd799439011"; // Valid 24-hex ObjectId that does not exist
    const res = await request(`/requirements/${nonExistentId}`);
    assert(res.status === 404, `Expected 404, got ${res.status}`);
    assert(res.data.success === false, "Expected success: false");
    assert(res.data.message.includes("not found"), `Expected 'not found' message, got ${res.data.message}`);
    return `Returned 404: ${res.data.message}`;
  });

  // TEST 7: GET /api/requirements/:id with invalid ID format (400)
  await runTest("GET /api/requirements/:id with invalid format returns 400", async () => {
    const invalidId = "invalid-id-12345";
    const res = await request(`/requirements/${invalidId}`);
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    assert(res.data.success === false, "Expected success: false");
    assert(res.data.message.includes("Invalid requirement ID format"), `Unexpected message: ${res.data.message}`);
    return `Returned 400: ${res.data.message}`;
  });

  // TEST 8: Missing required shared fields (400)
  await runTest("POST /api/requirements rejects missing eventName, location and dates (400)", async () => {
    const payload = {
      category: "Event Planner",
      budget: 50000,
    };
    const res = await request("/requirements", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    assert(res.data.success === false, "Expected success: false");
    assert(res.data.errors && res.data.errors.length > 0, "Expected validation errors array");
    return `Returned 400 with ${res.data.errors.length} validation errors`;
  });

  // TEST 9: Invalid date range (endDate < startDate -> 400)
  await runTest("POST /api/requirements rejects end date before start date (400)", async () => {
    const payload = {
      eventName: "Back to the Future Conference",
      eventType: "Conference",
      startDate: "2026-11-20T10:00:00.000Z",
      endDate: "2026-11-10T10:00:00.000Z", // Earlier than start date!
      location: "Bengaluru, KA",
      category: "Performer",
      categoryDetails: { performerType: ["Live Band"] },
      quantity: 1,
      budget: 50000,
    };
    const res = await request("/requirements", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    assert(res.data.success === false, "Expected success: false");
    assert(res.data.message.includes("End date must be on or after start date"), `Unexpected error: ${res.data.message}`);
    return `Rejected date anomaly: "${res.data.message}"`;
  });

  // TEST 10: Invalid budget (negative budget -> 400)
  await runTest("POST /api/requirements rejects negative budget (400)", async () => {
    const payload = {
      eventName: "Charity Benefit Concert",
      eventType: "Concert",
      startDate: "2026-11-20T10:00:00.000Z",
      endDate: "2026-11-21T10:00:00.000Z",
      location: "Mumbai, MH",
      category: "Crew",
      categoryDetails: { crewRoles: ["Stage Manager / Runner"] },
      quantity: 1,
      budget: -5000, // Negative budget!
    };
    const res = await request("/requirements", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    assert(res.data.success === false, "Expected success: false");
    assert(res.data.message.includes("Budget cannot be negative"), `Unexpected message: ${res.data.message}`);
    return `Rejected negative budget: "${res.data.message}"`;
  });

  // TEST 11: Invalid quantity (zero or non-integer -> 400)
  await runTest("POST /api/requirements rejects quantity < 1 (400)", async () => {
    const payload = {
      eventName: "Product Demo Showcase",
      eventType: "Corporate",
      startDate: "2026-11-20T10:00:00.000Z",
      endDate: "2026-11-21T10:00:00.000Z",
      location: "Delhi NCR",
      category: "Performer",
      categoryDetails: { performerType: ["DJ / Electronic Producer"] },
      quantity: 0, // Invalid!
      budget: 25000,
    };
    const res = await request("/requirements", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    assert(res.data.success === false, "Expected success: false");
    assert(res.data.message.includes("Quantity must be a positive integer"), `Unexpected message: ${res.data.message}`);
    return `Rejected invalid quantity: "${res.data.message}"`;
  });

  // TEST 12: Invalid category enum (400)
  await runTest("POST /api/requirements rejects unsupported category (400)", async () => {
    const payload = {
      eventName: "Fashion Week Photography",
      eventType: "Fashion Show",
      startDate: "2026-11-20T10:00:00.000Z",
      endDate: "2026-11-21T10:00:00.000Z",
      location: "Goa",
      category: "Photographer", // Not in ["Event Planner", "Performer", "Crew"]
      quantity: 1,
      budget: 30000,
    };
    const res = await request("/requirements", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    assert(res.data.success === false, "Expected success: false");
    assert(res.data.message.includes("Invalid or missing category"), `Unexpected message: ${res.data.message}`);
    return `Rejected invalid category: "${res.data.message}"`;
  });

  // TEST 13: Invalid category-specific payload (missing category requirements -> 400)
  await runTest("POST /api/requirements rejects empty categoryDetails for Event Planner (400)", async () => {
    const payload = {
      eventName: "Corporate Annual Meet 2026",
      eventType: "Corporate",
      startDate: "2026-11-20T10:00:00.000Z",
      endDate: "2026-11-21T10:00:00.000Z",
      location: "Hyderabad, TS",
      category: "Event Planner",
      categoryDetails: {
        plannerServices: [], // Empty!
        keyDeliverables: "",  // Empty!
      },
      quantity: 1,
      budget: 40000,
    };
    const res = await request("/requirements", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    assert(res.data.success === false, "Expected success: false");
    assert(res.data.message.includes("Event Planner requirements must include at least one planning service"), `Unexpected message: ${res.data.message}`);
    return `Enforced category specificity: "${res.data.message}"`;
  });

  // TEST 14: Conflicting category-specific fields (Planner trying to post performerType -> 400)
  await runTest("POST /api/requirements rejects cross-category conflicting payload (400)", async () => {
    const payload = {
      eventName: "Summer Music Gala",
      eventType: "Concert",
      startDate: "2026-11-20T10:00:00.000Z",
      endDate: "2026-11-21T10:00:00.000Z",
      location: "Pune, MH",
      category: "Event Planner",
      categoryDetails: {
        plannerServices: ["Full Turnkey Event Planning"],
        performerType: ["Live Band", "DJ"], // Invalid for Event Planner!
      },
      quantity: 1,
      budget: 60000,
    };
    const res = await request("/requirements", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    assert(res.data.success === false, "Expected success: false");
    assert(res.data.message.includes("performerType is not applicable to Event Planner"), `Unexpected message: ${res.data.message}`);
    return `Rejected cross-category payload: "${res.data.message}"`;
  });

  // TEST 15: Verify credential protection in API responses
  await runTest("Verify credentials and sensitive database details are never exposed", async () => {
    const res = await request("/health");
    const jsonString = JSON.stringify(res.data);
    assert(!jsonString.includes("mongodb+srv"), "Response contains raw mongo connection string");
    assert(!jsonString.includes("anwarraza"), "Response contains username");
    assert(!jsonString.includes("Y8hAKZfn"), "Response contains password");
    return "Clean: No credentials or internal connection strings leaked in responses";
  });

  // TEST 16: List requirements with category filter (GET /api/requirements?category=Performer)
  await runTest("GET /api/requirements?category=Performer returns filtered list", async () => {
    const res = await request("/requirements?category=Performer");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.success === true, "Expected success: true");
    assert(Array.isArray(res.data.data), "Expected data array");
    const allPerformer = res.data.data.every((item) => item.category === "Performer");
    assert(allPerformer, "Found non-performer items in filtered category result");
    return `Filtered ${res.data.count} items, all verified as 'Performer'`;
  });

  console.log(`\n${colors.bold}========================================${colors.reset}`);
  console.log(`${colors.bold}TEST RUN COMPLETE: ${colors.green}${passed} PASSED${colors.reset}, ${failed === 0 ? colors.green : colors.red}${failed} FAILED${colors.reset}`);
  console.log(`${colors.bold}========================================\n${colors.reset}`);

  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Test runner fatal error:", err);
  process.exit(1);
});
