/**
 * api/index.ts
 *
 * GET / — health check and API documentation
 *
 * Returns a simple status page with links to all available endpoints.
 */

import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mazingira on Mantle API</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      color: #333;
    }
    .container {
      background: white;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }
    h1 {
      margin: 0 0 10px 0;
      color: #667eea;
    }
    .subtitle {
      color: #666;
      margin-bottom: 30px;
    }
    .status {
      background: #e8f5e9;
      border-left: 4px solid #4caf50;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
      color: #2e7d32;
    }
    .endpoints {
      margin: 30px 0;
    }
    .endpoint {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 20px;
      margin: 15px 0;
      border-left: 4px solid #667eea;
    }
    .endpoint-title {
      font-weight: bold;
      color: #667eea;
      margin-bottom: 8px;
    }
    .endpoint-method {
      display: inline-block;
      padding: 4px 8px;
      background: #667eea;
      color: white;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      margin-right: 8px;
    }
    .endpoint-path {
      font-family: 'Courier New', monospace;
      color: #555;
    }
    .endpoint-desc {
      color: #666;
      margin: 10px 0 0 0;
      font-size: 14px;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      color: #999;
      font-size: 14px;
    }
    .github-link {
      color: #667eea;
      text-decoration: none;
    }
    .github-link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🌍 Mazingira on Mantle API</h1>
    <p class="subtitle">Backend for T3 Agent Dev Kit — Green Economy Marketplace</p>

    <div class="status">
      ✅ <strong>Status</strong>: Online and operational
    </div>

    <h2>Available Endpoints</h2>
    <div class="endpoints">
      <div class="endpoint">
        <div class="endpoint-title">
          <span class="endpoint-method">POST</span>
          <span class="endpoint-path">/api/agent</span>
        </div>
        <p class="endpoint-desc">
          AI-enriched market analysis for on-chain products.
          <br/>Input: <code>{"message": "...", "history": []}</code>
          <br/>Output: Plain text market analysis
        </p>
      </div>

      <div class="endpoint">
        <div class="endpoint-title">
          <span class="endpoint-method">GET</span>
          <span class="endpoint-path">/api/secondary-market?tokenId={id}</span>
        </div>
        <p class="endpoint-desc">
          Secondary market listings for a token.
          <br/>Output: <code>{"listings": [...], "count": N}</code>
        </p>
      </div>

      <div class="endpoint">
        <div class="endpoint-title">
          <span class="endpoint-method">GET</span>
          <span class="endpoint-path">/api/vendors?wallet={address}</span>
        </div>
        <p class="endpoint-desc">
          Vendor approval status on Mazingira.
          <br/>Output: <code>{"status": "approved|pending|none", "vendorName": "...", ...}</code>
        </p>
      </div>

      <div class="endpoint">
        <div class="endpoint-title">
          <span class="endpoint-method">GET</span>
          <span class="endpoint-path">/api/storage-alerts?wallet={address}</span>
        </div>
        <p class="endpoint-desc">
          Storage fee warnings for vendor tokens.
          <br/>Output: <code>{"alerts": [...], "status": "ok"}</code>
        </p>
      </div>
    </div>

    <h2>Quick Test</h2>
    <pre style="background: #f5f5f5; padding: 15px; border-radius: 8px; overflow-x: auto;">
curl -X POST https://mazingira-on-mantle-api.vercel.app/api/agent \\
  -H "Content-Type: application/json" \\
  -d '{"message":"Give me analysis for Token #3","history":[]}'
    </pre>

    <div class="footer">
      <p>
        Part of <a href="https://github.com/MrKrugen/mazingira-t3-agent" class="github-link">Mazingira on Mantle T3 Agent</a> project.
        <br/>
        <strong>T3 Network Contract ID:</strong> 119 | <strong>Version:</strong> 0.3.1
      </p>
    </div>
  </div>
</body>
</html>
  `;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(html);
}
