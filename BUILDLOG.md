# Build Log

## Metadata
- **Agent:** Obrera
- **Challenge:** 2026-05-13 — Solana Week Loyalty Cards
- **Started:** 2026-05-13 01:00 UTC
- **Submitted:** 2026-05-13 01:13 UTC
- **Total time:** 0h 13m
- **Model:** OpenAI GPT-5.5 Codex implementation agent
- **Reasoning:** none
- **Build:** Nightshift 085
- **Product:** PerkLane
- **Live URL:** https://perklane085.colmena.dev

## Scorecard
- **Backend depth:** 3/10
- **Deployment realism:** 7/10
- **Persistence realism:** 4/10
- **User/state complexity:** 6/10
- **Async/ops/admin depth:** 5/10
- **Product ambition:** 7/10
- **What made this real:** Connected wallets sign canonical loyalty receipts; the kiosk verifies payload hash and signature structure; operator rules affect stamp eligibility and readiness.
- **What stayed too thin:** No server mint, shared database, or live MPL Core asset issue transaction in this build.
- **Next build should push further by:** Adding a backend issue queue, durable receipt registry, and client-signed MPL Core issue flow when supported by the deployment path.

## Product Scope
- **Selected NFT use-case family:** Loyalty cards and membership access passes.
- **Primary actor:** Venue or membership operator, plus returning customer at a kiosk or counter.
- **Why NFT ownership/access matters:** A wallet-held loyalty pass can become portable proof of membership tier, access eligibility, and perk entitlement across venue tools without relying on a pasted destination wallet or account-password flow.
- **Solana/MPL status:** This build signs receipts and prepares an MPL Core loyalty pass issue plan. It does not perform a server mint and does not claim a live mint.

## Log

| Time (UTC) | Step |
|---|---|
| 01:00 | Inspected scaffold, package scripts, router, providers, wallet-ui signing hooks, and Nightshift submission format. |
| 01:02 | Installed `@obrera/mpl-core-kit-lib` as a normal published npm dependency. |
| 01:03 | Added feature-based PerkLane structure under `src/features/perklane` with data-access, feature, ui, and util boundaries. |
| 01:04 | Implemented wallet-signed canonical check-in receipts, deterministic receipt hashing, stamp progress, cooldown eligibility, and receipt ledger. |
| 01:05 | Implemented operator verifier lane, campaign rule tuning, and MPL Core readiness metadata import. |
| 01:06 | Wired PerkLane as the root product route and updated shell branding/default dark theme. |
| 01:07 | Added README, BUILDLOG, Docker/Dokploy static deployment files, and static `/health` artifact. |
| 01:13 | Added `.dockerignore` so Dokploy builds from source without local `node_modules` or `dist` artifacts. |
| 01:17 | Updated Docker install to ignore prepare scripts because the Bun runtime image does not include `git` for Lefthook. |
| 01:18 | Pointed the compose default network at external `dokploy-network` to avoid creating a new Docker subnet on the saturated host. |
| 01:20 | Removed the explicit static-web-server CMD because the runtime image already provides that entrypoint. |

## Validation Commands

```bash
bun install
bun run lint:fix
bun run check-types
bun run build
rg '@solana/web3[.]js|@solana/wallet-adapter-reac''t|from .buffe''r.|B[u]ffer' src README.md BUILDLOG.md package.json Dockerfile docker-compose.yml
rg 'specim[e]ntrail|royalt[y]stage|provenanc[e]bay|careke[y]|voteloc[k]|sealbenc[h]' src README.md BUILDLOG.md package.json Dockerfile docker-compose.yml
```
