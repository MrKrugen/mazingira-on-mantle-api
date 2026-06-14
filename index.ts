/**
 * index.ts (root handler)
 *
 * GET / — health check and API documentation
 */

import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mazingira on Mantle API</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }
    .container {
      background: white;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }
    h1 { margin: 0 0 10px 0; color: #667eea; }
    .subtitle { color: #666; margin-bottom: 30px; }
    .status {
      background: #e8f5e9;
      border-left: 4px solid #4caf50;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
      color: #2e7d32;
    }
    .endpoint {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 20px;
      margin: 15px 0;
      border-left: 4px solid #667eea;
    }
    .method { display: inline-block; padding: 4px 8px; background: #667eea; color: white; border-radius: 4px; font-size: 12px; font-weight: bold; margin-right: 8px; }
    .path { font-family: monospace; color: #555; }
    .desc { color: #666; margin: 10px 0 0 0; font-size: 14px; }
    code { background: #eee; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
    pre { background: #f5f5f5; padding: 15px; border-radius: 8px; overflow-x: auto; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 14px; }
    a { color: #667eea; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🌍 Mazingira on Mantle API</h1>
    <p class="subtitle">Backend for T3 Agent Dev Kit — Green Economy Marketplace</p>

    <div class="status">
      ✅ <strong>Status</strong>: Online and operational
    </div>

    <h2>API Endpoints</h2>

    <div class="endpoint">
      <div><span class="method">POST</span> <span class="path">/api/agent</span></div>
      <p class="desc">AI-enriched market analysis for on-chain products</p>
    </div>

    <div class="endpoint">
      <div><span class="method">GET</span> <span class="path">/api/secondary-market?tokenId={id}</span></div>
      <p class="desc">Secondary market listings for a token</p>
    </div>

    <div class="endpoint">
      <div><span class="method">GET</span> <span class="path">/api/vendors?wallet={address}</span></div>
      <p class="desc">Vendor approval status on Mazingira</p>
    </div>

    <div class="endpoint">
      <div><span class="method">GET</span> <span class="path">/api/storage-alerts?wallet={address}</span></div>
      <p class="desc">Storage fee warnings for vendor tokens</p>
    </div>

    <h2>Quick Test</h2>
    <pre>curl -X POST https://mazingira-on-mantle-api.vercel.app/api/agent \\
  -H "Content-Type: application/json" \\
  -d '{"message":"Give me analysis for Token #3","history":[]}'</pre>

    <div class="footer">
      <p>Part of <a href="https://github.com/MrKrugen/mazingira-t3-agent">Mazingira on Mantle T3 Agent</a> — Contract v0.3.1 | ID: 119</p>
    </div>
  </div>
</body>
</html>
  `;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(html);
}
