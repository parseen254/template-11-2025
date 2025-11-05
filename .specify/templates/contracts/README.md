# Contracts Directory

This directory contains API contract definitions that MUST be created **before implementation** begins.

## Purpose

Contracts define the exact shape of your Convex functions (queries, mutations, actions) before any code is written. This ensures:

1. **Type Safety** - Frontend and backend agree on types
2. **Parallel Development** - Teams can work simultaneously
3. **Contract Testing** - Tests written before implementation (TDD)
4. **API Documentation** - Auto-generated from contracts
5. **Integration Confidence** - No surprises when connecting pieces

## Structure

```
contracts/
└── convex/
    ├── [module1].ts      # Contract for convex/module1.ts
    ├── [module2].ts      # Contract for convex/module2.ts
    └── README.md         # This file
```

## Workflow

### Step 1: Define Contracts (Phase -1)

Copy the template:
```bash
cp .specify/templates/contracts/convex-module-template.ts \
   specs/[###-feature]/contracts/convex/[module].ts
```

Fill in:
- Function names
- Argument validators
- Return type validators
- Descriptions

### Step 2: Generate Types

```bash
node .specify/scripts/generate-contract-types.js
```

This creates TypeScript types that both frontend and backend can use.

### Step 3: Write Contract Tests

```typescript
// convex/[module].test.ts
import { expect, test } from "vitest";
import { ConvexTestingHelper } from "./_generated/testing";
import { api } from "./_generated/api";
import { [ModuleName]API } from "../specs/[###-feature]/contracts/convex/[module]";

test("[functionName] matches contract", async () => {
  const t = new ConvexTestingHelper();
  const result = await t.query(api.[module].[functionName], { /* args */ });
  
  // This will FAIL until implementation is done
  expect(result).toMatchContract([ModuleName]API.[functionName].returns);
});
```

### Step 4: Implement Functions

Now implement the actual Convex functions to make tests pass:

```typescript
// convex/[module].ts
import { query } from "./_generated/server";
import { [moduleName]Validators } from "../specs/[###-feature]/contracts/convex/[module]";

export const [functionName] = query({
  args: [moduleName]Validators.[functionName].args,
  returns: [moduleName]Validators.[functionName].returns,
  handler: async (ctx, args) => {
    // Implementation that satisfies the contract
  }
});
```

### Step 5: Verify

```bash
npm test
```

All contract tests should now pass!

## Example: Messages Module

**Contract** (`contracts/convex/messages.ts`):
```typescript
export interface MessagesAPI {
  list: {
    args: { channelId: typeof v.id("channels") };
    returns: typeof v.array(v.object({
      _id: typeof v.id("messages"),
      content: typeof v.string(),
      authorId: typeof v.id("users"),
      _creationTime: typeof v.number()
    }));
    description: "List all messages in a channel ordered by creation time";
  };
  
  send: {
    args: {
      channelId: typeof v.id("channels"),
      authorId: typeof v.id("users"),
      content: typeof v.string()
    };
    returns: typeof v.id("messages");
    description: "Send a new message to a channel";
  };
}

export const messagesValidators = {
  list: {
    args: { channelId: v.id("channels") },
    returns: v.array(v.object({
      _id: v.id("messages"),
      content: v.string(),
      authorId: v.id("users"),
      _creationTime: v.number()
    }))
  },
  send: {
    args: {
      channelId: v.id("channels"),
      authorId: v.id("users"),
      content: v.string()
    },
    returns: v.id("messages")
  }
};
```

**Test** (`convex/messages.test.ts`):
```typescript
test("list returns messages for channel", async () => {
  const t = new ConvexTestingHelper();
  
  // Arrange
  const channelId = await t.mutation(api.channels.create, { name: "general" });
  await t.mutation(api.messages.send, {
    channelId,
    authorId: t.toId("users", "alice"),
    content: "Hello!"
  });
  
  // Act
  const messages = await t.query(api.messages.list, { channelId });
  
  // Assert
  expect(messages).toMatchContract(MessagesAPI.list.returns);
  expect(messages).toHaveLength(1);
  expect(messages[0].content).toBe("Hello!");
});
```

**Implementation** (`convex/messages.ts`):
```typescript
import { query, mutation } from "./_generated/server";
import { messagesValidators } from "../specs/001-chat/contracts/convex/messages";

export const list = query({
  args: messagesValidators.list.args,
  returns: messagesValidators.list.returns,
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
      .order("desc")
      .collect();
  }
});

export const send = mutation({
  args: messagesValidators.send.args,
  returns: messagesValidators.send.returns,
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", {
      channelId: args.channelId,
      authorId: args.authorId,
      content: args.content
    });
  }
});
```

## Benefits

✅ **Frontend can start immediately** - Use contract types with mock data
✅ **Backend knows exact requirements** - No ambiguity about function signatures
✅ **Tests guide implementation** - Red-Green-Refactor TDD workflow
✅ **Integration just works** - Types guarantee compatibility
✅ **Documentation is generated** - From contract descriptions

## Rules

1. ⚠️ **NEVER skip contracts** - They're required before implementation
2. ⚠️ **ALWAYS write tests first** - Tests should fail until implementation
3. ⚠️ **UPDATE contracts carefully** - Breaking changes affect frontend
4. ✅ **USE validators from contracts** - Don't duplicate in implementation
5. ✅ **DOCUMENT all functions** - Future developers will thank you

## Tools

- `generate-contract-types.js` - Generates TypeScript types from contracts
- `validate-contracts.js` - Ensures implementations match contracts
- `contract-docs-generator.js` - Creates API documentation

## Resources

- [Convex Validators](https://docs.convex.dev/database/types)
- [Contract Testing](https://martinfowler.com/bliki/ContractTest.html)
- [Spec-Kit Contract-First Workflow](/.specify/templates/plan-template.md#phase--1-contract-definition)
