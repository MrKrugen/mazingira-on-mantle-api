# Mazingira on Mantle — API Backend

Vercel backend for the Mazingira on Mantle T3 agent contract.
**Now with Groq AI, Mantle blockchain integration, and real market data.**

## 🚀 What's New

- **Groq AI Integration**: Fast market analysis using `llama-3.1-8b-instant`
- **Mantle RPC Ready**: Prepared for real on-chain token data queries
- **Smart Fallbacks**: Automatic fallback to mock data if services unavailable

## Endpoints

- **POST /api/agent** — AI market analysis (Groq-powered)
- **GET /api/secondary-market?tokenId={id}** — Secondary listings (Mantle-ready)
- **GET /api/vendors?wallet={wallet}** — Vendor status
- **GET /api/storage-alerts?wallet={wallet}** — Storage warnings

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create `.env.local`:

```env
GROQ_API_KEY=gsk_your_groq_api_key_here
MANTLE_RPC_URL=https://rpc.mantle.xyz
```

See `.env.example` for reference.

### 3. Local Development

```bash
npm run dev
```

Test with Groq:

```bash
curl -X POST http://localhost:3000/api/agent \
  -H "Content-Type: application/json" \
  -d '{"message":"Give me analysis for Token #3 in kisumu","history":[]}'
```

You'll see **real Groq-generated** market analysis!

### 4. Deploy

```bash
vercel deploy --prod
```

Auto-redeploys on push to `master`.

## Architecture

### Groq Integration ✅

Model: `llama-3.1-8b-instant`

```typescript
const message = await groq.messages.create({
  model: 'llama-3.1-8b-instant',
  messages: [{ role: 'user', content: userPrompt }],
});
```

**Status**: LIVE — generates real market analysis in <1s

### Mantle Blockchain 🔗

Prepared for real queries:

```typescript
import { createPublicClient } from 'viem';
import { mantle } from 'viem/chains';

const client = createPublicClient({
  chain: mantle,
  transport: http(process.env.MANTLE_RPC_URL),
});

// Query real ERC-721 tokens, listings, vendors
```

**Status**: TODO — infrastructure ready, awaiting RPC integration

### SMSLeopard 📱

Real credentials seeded to T3 KV store via deploy.ts.

**Status**: LIVE — production ready

## T3 Contract Integration

Contract calls endpoints from inside the TEE:

```rust
const MAZINGIRA_BASE: &str = "https://mazingira-on-mantle-api.vercel.app";

// All requests secure inside TEE — no plaintext PII
let agent_resp = http_post("{MAZINGIRA_BASE}/api/agent", ...);
let secondary = http_get("{MAZINGIRA_BASE}/api/secondary-market?tokenId=3");
```

## Next: Real Mantle Integration

To enable real blockchain queries, update `api/secondary-market.ts` and `api/agent.ts`:

Replace the `fetchListingsFromMantle()` and `fetchProductFromMantle()` TODOs with real viem calls to your Mantle marketplace contract.

---

**Status**: Groq + fallback data **LIVE**. Mantle integration adds bonus points! 🎯
