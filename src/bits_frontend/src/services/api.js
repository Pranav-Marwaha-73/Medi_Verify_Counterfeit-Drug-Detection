import { HttpAgent, Actor } from "@dfinity/agent";
import {
  idlFactory as backend_idl,
  canisterId as backend_canister_id,
} from "../../../declarations/bits_backend";

// Auto-pick IC mainnet vs local
const agent = new HttpAgent({
  host: process.env.DFX_NETWORK === "ic"
    ? "https://ic0.app" // mainnet
    : "http://127.0.0.1:4943", // local dev
});

// Local only: fetch root key
if (process.env.DFX_NETWORK !== "ic") {
  agent.fetchRootKey();
}

export const backend = Actor.createActor(backend_idl, {
  agent,
  canisterId: backend_canister_id,
});

// Helper: convert snake_case → camelCase for frontend
function mapMedicineData(id, m) {
  return {
    found: true,
    id,
    name: m.name,
    manufacturer: m.manufacturer,
    batchNumber: m.batch_number || "Unknown",
    manufacturingDate: m.manufacturing_date || "Unknown",
    expiryDate: m.expiry || "Unknown",
    blockchainHash: m.blockchain_hash || "N/A",
    lastUpdated: m.last_updated || "Unknown",
  };
}

// Fetch from canister
export async function getMedicine(id) {
  const result = await backend.get_medicine(id);

  if (result) {
    return mapMedicineData(id, result);
  }
  return { found: false, id };
}

// Call Python QR scan service
export const scanQRCode = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  const response = await fetch("https://medi-verify-api-1.onrender.com/scan-image", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`QR service error: ${response.status}`);
  }

  return await response.json();
};

// Verify medicine with blockchain
export const verifyWithBlockchain = async (medicineId) => {
  const medicine = await getMedicine(medicineId);

  if (!medicine.found) {
    return {
      id: medicineId,
      name: "Unknown Medicine",
      manufacturer: "Unknown",
      batchNumber: "Unknown",
      manufacturingDate: "Unknown",
      expiryDate: "Unknown",
      status: "unknown",
      blockchainHash: null,
      lastUpdated: "Unknown",
    };
  }

  let status = "authentic";
  const today = new Date();
  const expiryDateObj = new Date(medicine.expiryDate);

  if (medicine.expiryDate === "Unknown") {
    status = "unknown";
  } else if (expiryDateObj < today) {
    status = "expired";
  }

  return { ...medicine, status };
};
