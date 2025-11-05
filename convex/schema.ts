import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
export default defineSchema({
  ...authTables,
  messages: defineTable({
    userId: v.id("users"),
    body: v.string(),
  }),
  
  // ========================================
  // AGENT COORDINATION TABLES
  // ========================================
  
  // Tracks status of AI agents working on features
  agent_status: defineTable({
    agentId: v.string(),
    featureId: v.string(),
    status: v.union(
      v.literal("idle"),
      v.literal("working"),
      v.literal("blocked"),
      v.literal("completed"),
      v.literal("error")
    ),
    currentPhase: v.optional(v.string()),
    currentTask: v.optional(v.string()),
    progress: v.number(), // 0-100
    message: v.optional(v.string()),
    metadata: v.optional(v.any()),
    startedAt: v.number(),
    lastUpdate: v.number(),
  })
    .index("by_agent_and_feature", ["agentId", "featureId"])
    .index("by_feature", ["featureId"])
    .index("by_status", ["status"]),
  
  // Tracks task claims to prevent duplicate work
  task_claims: defineTable({
    featureId: v.string(),
    phase: v.string(),
    taskId: v.string(),
    agentId: v.string(),
    status: v.union(
      v.literal("active"),
      v.literal("completed"),
      v.literal("abandoned")
    ),
    claimedAt: v.number(),
    releasedAt: v.optional(v.number()),
  })
    .index("by_feature_and_task", ["featureId", "taskId"])
    .index("by_feature", ["featureId"])
    .index("by_agent", ["agentId"]),
  
  // Tracks conflicts between agents
  agent_conflicts: defineTable({
    featureId: v.string(),
    conflictType: v.union(
      v.literal("file_modification"),
      v.literal("implementation_disagreement"),
      v.literal("test_failure")
    ),
    involvedAgents: v.array(v.string()),
    description: v.string(),
    filePath: v.optional(v.string()),
    metadata: v.optional(v.any()),
    status: v.union(v.literal("pending"), v.literal("resolved")),
    resolution: v.optional(v.string()),
    resolvedBy: v.optional(v.string()),
    reportedAt: v.number(),
    resolvedAt: v.optional(v.number()),
  })
    .index("by_feature_and_status", ["featureId", "status"])
    .index("by_feature", ["featureId"]),
});
