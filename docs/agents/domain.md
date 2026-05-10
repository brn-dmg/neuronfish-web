# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root — canonical product definitions, design decisions, and redesign blueprints for NeuronFish Web
- **`docs/adr/`** — read ADRs that touch the area you're about to work in (directory created lazily when first decision is recorded)

If any of these files don't exist, **proceed silently**. Don't flag their absence; don't suggest creating them upfront.

## File structure

Single-context repo:

```
/
├── CONTEXT.md
├── docs/
│   ├── agents/      ← skill configuration (this directory)
│   └── adr/         ← architectural decision records (created lazily)
└── src/
```

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in `CONTEXT.md`. Don't drift to synonyms the glossary explicitly avoids.

Key terms defined in `CONTEXT.md`:
- **EditorialTheme** — CHHAR's dark design system (`#08090A` bg, `#D9FF3B` chartreuse, `#FF5A36` coral)
- **Consumer side / Vendor side** — the two audiences of the CHHAR marketplace
- **Vendor bridge** — the narrative pivot section on the CHHAR page that transitions from consumer to vendor content

If the concept you need isn't in the glossary yet, that's a signal — either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/grill-with-docs`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0001 (…) — but worth reopening because…_
