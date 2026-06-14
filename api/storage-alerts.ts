/**
 * api/storage-alerts.ts
 *
 * GET /api/storage-alerts?wallet={wallet}
 *
 * Returns storage fee warnings for a vendor's tokens on Mantle.
 * Used to warn vendors before payout about tokens nearing liquidation due to storage fees.
 *
 * Output:
 *   {
 *     alerts: [
 *       {
 *         tokenId: "3",
 *         urgency: "warning" | "critical",
 *         message: "Storage fees accruing. 7 days until redemption required."
 *       },
 *       ...
 *     ],
 *     status: "ok"
 *   }
 */

import { VercelRequest, VercelResponse } from '@vercel/node';

// Mock storage alerts
const ALERTS_BY_VENDOR: Record<string, any[]> = {
  "0x123abc456def789": [
    // GreenEnergy Ltd has no alerts
  ],
  "0x789def123abc456": [
    {
      tokenId: "5",
      urgency: "warning",
      message: "Storage fees accruing. 7 days until redemption required.",
    },
  ],
  "0x456def789abc123": [
    {
      tokenId: "2",
      urgency: "critical",
      message: "URGENT: Token near liquidation. Redeem within 48 hours to avoid loss.",
    },
  ],
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

    const wallet_str = String(wallet).toLowerCase();
    const alerts = ALERTS_BY_VENDOR[wallet_str] || [];

    return res.status(200).json({
      alerts,
      status: "ok",
    });
  } catch (error: any) {
    console.error('Storage alerts endpoint error:', error);
    return res.status(500).json({ error: error.message });
  }
}
