/**
 * Database Failure & Disconnection Resilience Test
 * Starts a test server instance while MongoDB is disconnected to verify:
 * - GET /api/health returns HTTP 200 with database: "disconnected"
 * - POST /api/requirements returns HTTP 503 Service Unavailable safely
 * - GET /api/requirements/:id returns HTTP 503 Service Unavailable safely
 * - Zero credentials or connection strings are exposed in error responses
 */

const http = require("http");
const mongoose = require("mongoose");
const app = require("./src/app");

const TEST_PORT = 5099;
const TEST_BASE = `http://localhost:${TEST_PORT}/api`;

async function run() {
  console.log("\n=======================================================");
  console.log("   TESTING DATABASE FAILURE & GRACEFUL DEGRADATION    ");
  console.log("=======================================================\n");

  // Ensure Mongoose is in a disconnected state for this test
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  console.log(`[STATE] Mongoose connection readyState: ${mongoose.connection.readyState} (0 = disconnected)`);

  const server = http.createServer(app);

  await new Promise((resolve) => server.listen(TEST_PORT, resolve));
  console.log(`[TEST SERVER] Running isolated test server on port ${TEST_PORT}\n`);

  try {
    // 1. Health check when DB is disconnected
    process.stdout.write("• Checking /api/health when database is disconnected ... ");
    const healthRes = await fetch(`${TEST_BASE}/health`);
    const healthData = await healthRes.json();
    if (healthRes.status === 200 && healthData.database === "disconnected") {
      console.log("PASSED");
      console.log(`    ↳ Status: ${healthRes.status}, database: "${healthData.database}" (Server remains operational)`);
    } else {
      throw new Error(`Unexpected health response: ${JSON.stringify(healthData)}`);
    }

    // 2. POST /api/requirements when DB is disconnected
    process.stdout.write("• Attempting POST /api/requirements during DB outage ... ");
    const postRes = await fetch(`${TEST_BASE}/requirements`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "Outage Resilience Test Event",
        eventType: "Conference",
        startDate: "2026-11-20",
        endDate: "2026-11-21",
        location: "Bengaluru",
        category: "Crew",
        categoryDetails: { crewRoles: ["Stage Manager"] },
        quantity: 1,
        budget: 10000,
      }),
    });
    const postData = await postRes.json();
    if (postRes.status === 503 && postData.success === false) {
      console.log("PASSED");
      console.log(`    ↳ Safely returned HTTP 503: "${postData.message}"`);
    } else {
      throw new Error(`Expected HTTP 503, got ${postRes.status}: ${JSON.stringify(postData)}`);
    }

    // 3. GET /api/requirements/:id when DB is disconnected
    process.stdout.write("• Attempting GET /api/requirements/:id during DB outage ... ");
    const getRes = await fetch(`${TEST_BASE}/requirements/507f1f77bcf86cd799439011`);
    const getData = await getRes.json();
    if (getRes.status === 503 && getData.success === false) {
      console.log("PASSED");
      console.log(`    ↳ Safely returned HTTP 503: "${getData.message}"`);
    } else {
      throw new Error(`Expected HTTP 503, got ${getRes.status}: ${JSON.stringify(getData)}`);
    }

    // 4. Verify no credentials or database connection strings leaked
    process.stdout.write("• Auditing response payloads for credential leakage ... ");
    const combined = JSON.stringify(healthData) + JSON.stringify(postData) + JSON.stringify(getData);
    if (combined.includes("mongodb+srv") || combined.includes("@") || combined.includes("password")) {
      throw new Error("Credential leakage detected in response!");
    }
    console.log("PASSED");
    console.log("    ↳ Audit clean: Zero credentials, passwords, or connection strings exposed.");

    console.log("\n=======================================================");
    console.log("DATABASE OUTAGE RESILIENCE: ALL TESTS PASSED");
    console.log("=======================================================\n");
  } finally {
    server.close();
  }

  process.exit(0);
}

run().catch((err) => {
  console.error("Test failure:", err.message);
  process.exit(1);
});
