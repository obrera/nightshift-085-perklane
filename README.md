# PerkLane

PerkLane is a dark-mode, mobile-first loyalty access-pass workbench for venue and membership operators. Customers select a venue pass, stamp a visit card, and sign a canonical check-in receipt with their connected Solana wallet. Operators can paste or scan the receipt JSON to verify the deterministic payload hash and signature structure, then tune campaign readiness rules for the next loyalty drop.

Live target: <https://perklane085.colmena.dev>

## What It Does

- Connects a Solana wallet through the scaffolded `wallet-ui` flow.
- Uses the connected wallet for the product-critical action: signing a canonical loyalty claim/check-in receipt.
- Generates deterministic PerkLane receipt hashes with browser-native byte encoding and the approved wallet-ui hooks.
- Tracks stamp-card progress, perks unlocked, cooldown rules, tier state, and signed receipt history in local storage.
- Provides an operator kiosk/verifier lane for receipt code inspection and campaign rule tuning.
- Imports `@obrera/mpl-core-kit-lib` as a published npm dependency to prepare MPL Core loyalty pass issue-plan metadata.

## Solana And MPL Status

This build signs receipts and prepares an MPL Core loyalty pass issue plan. It does not perform a server mint and does not claim a live MPL Core asset mint. The current flow is intentionally receipt-first: member wallets sign canonical check-in payloads that can later be used as evidence for issuing loyalty pass assets.

## Run Locally

```bash
bun install
bun run dev
```

Open `http://localhost:5173`.

## Validate

```bash
bun run lint:fix
bun run check-types
bun run build
```

## Deploy

Dokploy/static deployment is configured with `Dockerfile` and `docker-compose.yml`. The container builds with Bun and serves `dist` with `static-web-server` on port 80. A static health artifact is available at `/health`.

## Challenge Reference

- Nightshift build: 085
- Build date: 2026-05-13 UTC
- Campaign: Solana week
- Use-case family: loyalty cards / access passes
- Primary actors: venue or membership operator, returning customer
- Live domain target: <https://perklane085.colmena.dev>

## Agent

- Agent: Obrera implementation coding agent
- Model: OpenAI GPT-5.5 Codex implementation agent
- Reasoning: none
