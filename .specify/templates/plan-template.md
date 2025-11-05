# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]  
**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]  
**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]  
**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]  
**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]
**Project Type**: [single/web/mobile - determines source structure]  
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Gates determined based on constitution file]

## Phase -1: Contract Definition

*Prerequisites: Spec complete, constitution validated*

**Purpose**: Define API contracts and function signatures BEFORE implementation to ensure type safety and prevent integration issues.

### 1. Define Convex Function Contracts

Create contract definitions in `specs/[###-feature]/contracts/convex/`:

```typescript
// contracts/convex/[module].ts
import { v } from "convex/values";

export interface [ModuleName]API {
  // Queries
  [functionName]: {
    args: { [key: string]: Validator },
    returns: Validator,
    description: string
  };
  
  // Mutations
  [mutationName]: {
    args: { [key: string]: Validator },
    returns: Validator,
    description: string
  };
  
  // Actions (if needed)
  [actionName]: {
    args: { [key: string]: Validator },
    returns: Validator,
    description: string
  };
}
```

**Example:**
```typescript
export interface MessagesAPI {
  list: {
    args: { channelId: v.id("channels") },
    returns: v.array(v.object({
      _id: v.id("messages"),
      content: v.string(),
      authorId: v.id("users"),
      _creationTime: v.number()
    })),
    description: "List messages in a channel"
  };
  
  send: {
    args: { 
      channelId: v.id("channels"),
      authorId: v.id("users"),
      content: v.string()
    },
    returns: v.id("messages"),
    description: "Send a new message to a channel"
  };
}
```

### 2. Generate TypeScript Types

Run contract type generator:
```bash
node .specify/scripts/generate-contract-types.js
```

This creates:
- Type-safe imports for frontend
- Validation schemas for backend
- API documentation

### 3. Write Contract Tests (BEFORE Implementation)

Create failing tests that validate contracts:

```typescript
// convex/[module].test.ts
import { expect, test } from "vitest";
import { ConvexTestingHelper } from "./_generated/testing";
import { api } from "./_generated/api";
import { [ModuleName]API } from "../specs/[###-feature]/contracts/convex/[module]";

test("list query matches contract", async () => {
  const t = new ConvexTestingHelper();
  
  // This test SHOULD FAIL initially (no implementation yet)
  const result = await t.query(api.[module].list, {
    channelId: t.toId("channels", "test-channel")
  });
  
  // Validate against contract
  expect(result).toMatchContract([ModuleName]API.list.returns);
});

test("send mutation matches contract", async () => {
  const t = new ConvexTestingHelper();
  
  // This test SHOULD FAIL initially
  const messageId = await t.mutation(api.[module].send, {
    channelId: t.toId("channels", "test-channel"),
    authorId: t.toId("users", "test-user"),
    content: "Test message"
  });
  
  // Validate against contract
  expect(messageId).toMatchContract([ModuleName]API.send.returns);
});
```

### 4. Contract Validation Gate

Before proceeding to implementation:
- [ ] All function contracts defined
- [ ] TypeScript types generated
- [ ] Contract tests written (and failing)
- [ ] Frontend team can start UI work with mock data
- [ ] Backend team knows exact signatures to implement

**Output**: 
- `specs/[###-feature]/contracts/convex/*.ts`
- `convex/**/*.test.ts` (failing tests)
- Generated TypeScript types

**Success Criteria**:
- All contract tests fail (no implementation yet)
- Frontend and backend teams aligned on API shape
- No ambiguity about function signatures

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
