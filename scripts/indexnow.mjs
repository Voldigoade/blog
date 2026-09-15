import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const HOST = "voldigoade.xyz";
const KEY = "c7489a69ef494db8b8de316886e6da48";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINTS = [
  "https://api.indexnow.org/IndexNow",
  "https://www.bing.com/indexnow",
];

export function verifyKeyFile(rootDir = process.cwd()) {
  const localKeyPath = join(rootDir, "public", `${KEY}.txt`);
  if (!existsSync(localKeyPath)) {
    throw new Error(`IndexNow key file missing: ${localKeyPath}`);
  }
  const content = readFileSync(localKeyPath, "utf8").trim();
  if (content !== KEY) {
    throw new Error(`IndexNow key mismatch: expected ${KEY}, got ${content}`);
  }
  return true;
}

export function buildPayload(urls) {
  const validUrls = Array.isArray(urls) ? urls.filter(Boolean) : [];
  if (validUrls.length === 0) {
    throw new Error("IndexNow requires at least one URL");
  }
  return {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: validUrls,
  };
}

export async function submitIndexNow(urls, options = {}) {
  const { dryRun = false, maxRetries = 3 } = options;
  const payload = buildPayload(urls);

  if (dryRun) {
    return { success: true, dryRun: true, payload };
  }

  let lastError;
  for (const endpoint of ENDPOINTS) {
    for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok || response.status === 200 || response.status === 202) {
          return { success: true, endpoint, status: response.status };
        }
        if (response.status === 422 || response.status === 403) {
          const text = await response.text();
          throw new Error(`IndexNow rejected (${response.status}): ${text}`);
        }
      } catch (err) {
        lastError = err;
        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)));
        }
      }
    }
  }

  throw lastError || new Error("Failed to submit to all IndexNow endpoints");
}

async function main() {
  const args = process.argv.slice(2);
  const assertKey = args.includes("--assert-key");
  const dryRun = args.includes("--dry-run");
  const urlsIndex = args.indexOf("--urls");
  const specificUrls = urlsIndex !== -1 && args[urlsIndex + 1] ? args[urlsIndex + 1].split(",") : [];

  verifyKeyFile();

  if (assertKey && !dryRun && specificUrls.length === 0) {
    console.log("IndexNow key verification passed.");
    return;
  }

  const defaultUrls = specificUrls.length > 0 ? specificUrls : [
    `https://${HOST}/`,
    `https://${HOST}/publications/`,
    `https://${HOST}/sections/`,
  ];

  const result = await submitIndexNow(defaultUrls, { dryRun });
  if (result.dryRun) {
    console.log("IndexNow dry-run validated payload:", JSON.stringify(result.payload, null, 2));
  } else {
    console.log(`IndexNow submitted successfully to ${result.endpoint} (status ${result.status}).`);
  }
}

if (process.argv[1] && process.argv[1].endsWith("indexnow.mjs")) {
  main().catch((err) => {
    console.error("IndexNow error:", err.message);
    process.exit(1);
  });
}
