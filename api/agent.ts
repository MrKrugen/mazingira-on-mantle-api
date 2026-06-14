/**
 * api/agent.ts
 *
 * POST /api/agent
 *
 * Mazingira on Mantle AI agent endpoint.
 * Reads on-chain product listings from Mantle and returns AI-enriched market analysis.
 *
 * Input:
 *   {
 *     message: "Give me a concise market analysis for Token #3 (biomass_briquettes) in kisumu...",
 *     history: []
 *   }
 *
 * Output (plain text, streamed as AI response):
 *   "Market analysis: High demand for biomass in region. Price competitive at 0.05 MNT/unit.
 *    Supply constrained. Recommend buyer act within 7 days before price adjustment."
 */

import { VercelRequest, VercelResponse } from '@vercel/node';

// Mock product data from on-chain
const PRODUCTS: Record<number, any> = {
  3: {
    id: 3,
    name: "Biomass Briquettes – Nakuru Batch",
    category: "biomass_briquettes",
    price_per_unit_mnt: "0.05",
    available_units: 120,
    co2_saved_kg_per_unit: 45,
    region: "nakuru",
    description: "High-quality biomass briquettes from sustainable sources",
  },
};

// Mock AI responses (in production, call Claude API or similar)
async function generateMarketAnalysis(message: string): Promise<string> {
  // Extract token_id from message
  const tokenMatch = message.match(/Token #(\d+)/);
  const token_id = tokenMatch ? parseInt(tokenMatch[1]) : 3;

  const product = PRODUCTS[token_id] || PRODUCTS[3];

  return `Market analysis for ${product.name}:

Current price: ${product.price_per_unit_mnt} MNT/unit (~KES ${(parseFloat(product.price_per_unit_mnt) * 150).toFixed(2)})
Available supply: ${product.available_units} units
Market signal: High demand in ${product.region} region

Given recent surge in demand from renewable energy projects in the region, recommend buyer act quickly. Prices expected to rise by 15% in next 2 weeks. Purchase recommendation: KES 2,500-2,750 (16.67-18.33 MNT) for competitive positioning.

Carbon impact: ~${product.co2_saved_kg_per_unit} kg CO₂ saved per unit. Excellent fit for ESG portfolios.`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Missing message field' });
    }

    const analysis = await generateMarketAnalysis(message);

    // Return plain text response (contract expects this)
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.status(200).send(analysis);
  } catch (error: any) {
    console.error('Agent endpoint error:', error);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.status(500).send(`Error: ${error.message}`);
  }
}
