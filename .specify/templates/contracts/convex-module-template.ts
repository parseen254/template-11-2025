// /**
//  * Contract Definition Template for Convex Functions
//  * 
//  * This file defines the API contract for [MODULE_NAME] before implementation.
//  * 
//  * Purpose:
//  * - Type-safe function signatures
//  * - Frontend/backend alignment
//  * - Contract test validation
//  * - API documentation generation
//  * 
//  * Instructions:
//  * 1. Define all queries, mutations, and actions
//  * 2. Use Convex validators (v.*)
//  * 3. Add descriptions for each function
//  * 4. Generate types: node .specify/scripts/generate-contract-types.js
//  * 5. Write contract tests in convex/*.test.ts
//  */

// import { v } from "convex/values";

// /**
//  * [MODULE_NAME] API Contract
//  * 
//  * Feature: [FEATURE_NAME]
//  * Branch: [###-feature-name]
//  * Created: [DATE]
//  */
// export interface [ModuleName]API {
//   // ========================================
//   // QUERIES
//   // ========================================
  
//   /**
//    * [Query Name]
//    * 
//    * Description: [What this query does]
//    * Use case: [When to use this query]
//    * 
//    * Example:
//    * const result = await ctx.runQuery(api.[module].[queryName], {
//    *   [param]: value
//    * });
//    */
//   [queryName]: {
//     args: {
//       [paramName]: typeof v.string,  // Replace with actual validator
//       // Add more parameters as needed
//     };
//     returns: typeof v.array(v.object({
//       _id: typeof v.id("tableName"),
//       [field]: typeof v.string,
//       // Add more fields as needed
//     }));
//     description: "[Detailed description of what this query returns]";
//   };

//   // ========================================
//   // MUTATIONS
//   // ========================================
  
//   /**
//    * [Mutation Name]
//    * 
//    * Description: [What this mutation does]
//    * Side effects: [What changes in the database]
//    * 
//    * Example:
//    * const id = await ctx.runMutation(api.[module].[mutationName], {
//    *   [param]: value
//    * });
//    */
//   [mutationName]: {
//     args: {
//       [paramName]: typeof v.string,  // Replace with actual validator
//       // Add more parameters as needed
//     };
//     returns: typeof v.id("tableName");  // or v.null() if no return
//     description: "[Detailed description of what this mutation does]";
//   };

//   // ========================================
//   // ACTIONS (if needed)
//   // ========================================
  
//   /**
//    * [Action Name]
//    * 
//    * Description: [What this action does]
//    * External APIs: [What external services it calls]
//    * 
//    * Example:
//    * const result = await ctx.runAction(api.[module].[actionName], {
//    *   [param]: value
//    * });
//    */
//   [actionName]: {
//     args: {
//       [paramName]: typeof v.string,  // Replace with actual validator
//     };
//     returns: typeof v.object({
//       success: typeof v.boolean,
//       [field]: typeof v.string,
//     });
//     description: "[Detailed description of what this action does]";
//   };
// }

// // ========================================
// // VALIDATOR EXPORTS (for implementation)
// // ========================================

// /**
//  * Export validators for use in actual Convex functions
//  * These ensure the implementation matches the contract
//  */
// export const [moduleName]Validators = {
//   [queryName]: {
//     args: {
//       [paramName]: v.string(),
//     },
//     returns: v.array(v.object({
//       _id: v.id("tableName"),
//       [field]: v.string(),
//     })),
//   },
  
//   [mutationName]: {
//     args: {
//       [paramName]: v.string(),
//     },
//     returns: v.id("tableName"),
//   },
  
//   [actionName]: {
//     args: {
//       [paramName]: v.string(),
//     },
//     returns: v.object({
//       success: v.boolean(),
//       [field]: v.string(),
//     }),
//   },
// };

// // ========================================
// // EXAMPLES & NOTES
// // ========================================

// /**
//  * Example Implementation Reference:
//  * 
//  * // In convex/[module].ts:
//  * import { query, mutation, action } from "./_generated/server";
//  * import { [moduleName]Validators } from "../specs/[###-feature]/contracts/convex/[module]";
//  * 
//  * export const [queryName] = query({
//  *   args: [moduleName]Validators.[queryName].args,
//  *   returns: [moduleName]Validators.[queryName].returns,
//  *   handler: async (ctx, args) => {
//  *     // Implementation here
//  *   }
//  * });
//  */

// /**
//  * Testing Reference:
//  * 
//  * // In convex/[module].test.ts:
//  * test("[queryName] matches contract", async () => {
//  *   const result = await ctx.runQuery(api.[module].[queryName], { ... });
//  *   expect(result).toMatchContract([ModuleName]API.[queryName].returns);
//  * });
//  */

// /**
//  * Changelog:
//  * - [DATE] - Initial contract definition
//  * - [DATE] - Added [functionName] for [reason]
//  */
