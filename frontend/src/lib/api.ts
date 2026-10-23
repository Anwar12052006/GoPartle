/**
 * GoPratle API Client
 * Centralized API service for communicating with the GoPratle Backend
 */

export type RequirementCategory = "Event Planner" | "Performer" | "Crew";

export interface PlannerDetails {
  plannerServices: string[];
  targetAudienceSize: string;
  eventTheme: string;
  experienceLevel: string;
  keyDeliverables: string;
}

export interface PerformerDetails {
  performerType: string[];
  genreStyle: string;
  performanceDuration: string;
  languages: string[];
  stageSetupRider: string;
}

export interface CrewDetails {
  crewRoles: string[];
  shiftDuration: string;
  physicalOrTechnicalSkills: string;
  dressCode: string;
}

export type CategoryDetails = Partial<PlannerDetails & PerformerDetails & CrewDetails>;

export interface RequirementFormData {
  // Step 1: Event Info & Category
  eventName: string;
  eventType: string;
  startDate: string;
  endDate: string;
  location: string;
  venue?: string;
  category: RequirementCategory | "";

  // Step 2: Category Details
  categoryDetails: CategoryDetails;

  // Step 3: Logistics, Quantity, Equipment/Services, Budget
  quantity: number;
  budget: number | "";
  budgetType: "Fixed Total" | "Per Day" | "Per Person" | "Hourly" | "Negotiable";
  currency: string;
  equipmentProvidedByHost: string[];
  equipmentNeededFromVendor: string;
  logisticsNotes: string;
  mealsProvided: boolean;
  transportProvided: boolean;
  additionalNotes: string;
}

export interface RequirementResponse {
  _id: string;
  eventName: string;
  eventType: string;
  startDate: string;
  endDate: string;
  location: string;
  venue?: string;
  category: RequirementCategory;
  categoryDetails: CategoryDetails;
  quantity: number;
  budget: number;
  budgetType: string;
  currency: string;
  equipmentProvidedByHost: string[];
  equipmentNeededFromVendor?: string;
  logisticsNotes?: string;
  mealsProvided: boolean;
  transportProvided: boolean;
  additionalNotes?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  total?: number;
  errors?: string[];
}

const getApiBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
};

/**
 * Submit a new event requirement to the backend
 */
export async function createRequirement(
  payload: Partial<RequirementFormData>
): Promise<ApiResponse<RequirementResponse>> {
  const baseUrl = getApiBaseUrl();

  const response = await fetch(`${baseUrl}/requirements`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({
    success: false,
    message: `Server returned HTTP ${response.status}: ${response.statusText}`,
  }));

  if (!response.ok) {
    const errorMsg =
      data.message || `Failed to submit requirement (${response.status})`;
    throw new Error(errorMsg);
  }

  return data;
}

/**
 * Fetch requirements list
 */
export async function getRequirements(params?: {
  category?: string;
  status?: string;
}): Promise<ApiResponse<RequirementResponse[]>> {
  const baseUrl = getApiBaseUrl();
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.append("category", params.category);
  if (params?.status) searchParams.append("status", params.status);

  const qs = searchParams.toString();
  const url = `${baseUrl}/requirements${qs ? `?${qs}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch requirements");
  }

  return data;
}

/**
 * Health check endpoint
 */
export async function checkHealth(): Promise<any> {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/health`, {
    method: "GET",
    cache: "no-store",
  });
  return response.json();
}
