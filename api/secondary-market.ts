/**
 * api/secondary-market.ts
 *
 * GET /api/secondary-market?tokenId={id}
 *
 * Returns active secondary market listings for a given on-chain token.
 * These are peer-to-peer sales of existing tokens on Mantle.
 *
 * Output:
 *   {
 *     listings: [
 *       {
 *         id: "listing_1",
 *         tokenId: 3,
 *         seller: "0x456...",
 *         quantity: 50,
 *         askPriceMNT: "0.048",
 *         listedAt: "2026-06-10T14:30:00Z",
 *         status: "active",
 *         productName: "Biomass Briquettes – Nakuru Batch"
 *       },
 *       ...
 *     ],
 *     count: 2
 *   }
 */

import { VercelRequest, VercelResponse } from '@vercel/node';

// Mock secondary listings
const LISTINGS_BY_TOKEN: Record<number, any[]> = {
  3: [
    {
      id: "listing_001",
      tokenId: 3,
      seller: "0x123abc456def789",
      quantity: 50,
      askPriceMNT: "0.048",
      listedAt: "2026-06-10T14:30:00Z",
      status: "active",
      productName: "Biomass Briquettes – Nakuru Batch",
    },
    {
      id: "listing_002",
      tokenId: 3,
      seller: "0x789def123abc456",
      quantity: 30,
      askPriceMNT: "0.051",
      listedAt: "2026-06-11T09:15:00Z",
      status: "active",
      productName: "Biomass Briquettes – Nakuru Batch",
    },
  ],
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { tokenId } = req.query;

    if (!tokenId) {
      return res.status(400).json({ error: 'Missing tokenId query parameter' });
    }

    const token_id = parseInt(String(tokenId));
    const listings = LISTINGS_BY_TOKEN[token_id] || [];

    return res.status(200).json({
      listings,
      count: listings.length,
    });
  } catch (error: any) {
    console.error('Secondary market endpoint error:', error);
    return res.status(500).json({ error: error.message });
  }
}
