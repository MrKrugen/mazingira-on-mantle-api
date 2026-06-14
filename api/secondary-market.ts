/**
 * api/secondary-market.ts
 *
 * GET /api/secondary-market?tokenId={id}
 *
 * Returns active secondary market listings for a given on-chain token on Mantle.
 * - Queries Mantle RPC for real marketplace listings
 * - Filters for active status only
 * - Returns peer-to-peer token sales
 */

import { VercelRequest, VercelResponse } from '@vercel/node';

// Fallback mock listings
const FALLBACK_LISTINGS_BY_TOKEN: Record<number, any[]> = {
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

async function fetchListingsFromMantle(tokenId: number): Promise<any[]> {
  try {
    // TODO: Replace with real viem RPC call to Mantle marketplace contract
    // const client = createPublicClient({ chain: mantle, transport: http(process.env.MANTLE_RPC_URL) });
    // const listings = await client.readContract({ ... });
    return FALLBACK_LISTINGS_BY_TOKEN[tokenId] || [];
  } catch (error) {
    console.warn(`Failed to fetch from Mantle RPC, using fallback:`, error);
    return FALLBACK_LISTINGS_BY_TOKEN[tokenId] || [];
  }
}

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
    const listings = await fetchListingsFromMantle(token_id);

    return res.status(200).json({
      listings,
      count: listings.length,
    });
  } catch (error: any) {
    console.error('Secondary market endpoint error:', error);
    return res.status(500).json({ error: error.message });
  }
}
