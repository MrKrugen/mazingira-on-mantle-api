# Mazingira on Mantle — API Backend

Vercel backend serving API endpoints for the Mazingira on Mantle T3 agent contract.

## Endpoints

- **POST /api/agent** — AI-enriched market analysis for on-chain products
- **GET /api/secondary-market?tokenId={id}** — Secondary market listings
- **GET /api/vendors?wallet={wallet}** — Vendor approval status
- **GET /api/storage-alerts?wallet={wallet}** — Storage fee warnings

## Local Development

```bash
npm install
npm run dev
```

Then test:
```bash
curl -X POST http://localhost:3000/api/agent \
  -H "Content-Type: application/json" \
  -d '{"message":"Give me a market analysis for Token #3","history":[]}'
```

## Deployment

```bash
vercel deploy --prod
```

This will be auto-deployed on push to main. Make sure this repo is linked to the Vercel project `mazingira-on-mantle-api`.

## Environment Variables

None required for the mock implementation. For real integrations:

- `ANTHROPIC_API_KEY` — Claude API for market analysis
- `MANTLE_RPC_URL` — Mantle node for on-chain data

## Integration with T3 Contract

The T3 agent contract calls these endpoints from inside the TEE:

```rust
const MAZINGIRA_BASE: &str = "https://mazingira-on-mantle-api.vercel.app";

// Agent auth ensures the contract can call:
let agent_resp = http_post(&format!("{}/api/agent", MAZINGIRA_BASE), ...);
```

Update `MAZINGIRA_BASE` in the contract with your actual Vercel deployment URL.
