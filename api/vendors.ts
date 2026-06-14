/**
 * api/vendors.ts
 *
 * GET /api/vendors?wallet={wallet}
 *
 * Returns vendor approval status on Mazingira marketplace.
 * Used by payout function to verify vendor eligibility before sending SMS.
 *
 * Output:
 *   {
 *     status: "approved" | "pending" | "none",
 *     vendorName: "GreenEnergy Ltd",
 *     applicationId: "app_12345"
 *   }
 */

import { VercelRequest, VercelResponse } from '@vercel/node';

// Mock vendor registry
const VENDOR_REGISTRY: Record<string, any> = {
  "0x123abc456def789": {
    status: "approved",
    vendorName: "GreenEnergy Ltd",
    applicationId: "app_001",
  },
  "0x789def123abc456": {
    status: "approved",
    vendorName: "EcoInnovate Kenya",
    applicationId: "app_002",
  },
  "0x456def789abc123": {
    status: "pending",
    vendorName: "NewVendor Co",
    applicationId: "app_003",
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { wallet } = req.query;

    if (!wallet) {
      return res.status(400).json({ error: 'Missing wallet query parameter' });
    }

    // Note: wallet is often a T3 placeholder like "{{profile.wallet_address}}"
    // which is resolved inside the T3 TEE before reaching this endpoint.
    // For mock purposes, we check if it's a known vendor or return "none".
    const wallet_str = String(wallet).toLowerCase();
    const vendorData = VENDOR_REGISTRY[wallet_str];

    if (vendorData) {
      return res.status(200).json(vendorData);
    }

    // Unknown vendor
    return res.status(200).json({
      status: "none",
      vendorName: null,
      applicationId: null,
    });
  } catch (error: any) {
    console.error('Vendors endpoint error:', error);
    return res.status(500).json({ error: error.message });
  }
}
