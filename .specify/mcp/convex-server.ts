/**
 * MCP Server for Convex Integration
 * 
 * Enables AI agents to interact with Convex backend through
 * the Model Context Protocol (MCP).
 * 
 * Tools provided:
 * - convex_query: Execute Convex queries
 * - convex_mutation: Execute Convex mutations
 * - convex_action: Execute Convex actions
 * - convex_get_schema: Retrieve database schema
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

interface ConvexConfig {
  deploymentUrl: string;
  adminKey?: string;
}

class ConvexMCPServer {
  private server: Server;
  private config: ConvexConfig;

  constructor(config: ConvexConfig) {
    this.config = config;
    this.server = new Server(
      {
        name: "convex-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "convex_query",
            description: "Execute a Convex query function",
            inputSchema: {
              type: "object",
              properties: {
                functionRef: {
                  type: "string",
                  description: "Convex function reference (e.g., 'api.messages.list')",
                },
                args: {
                  type: "object",
                  description: "Arguments to pass to the query",
                },
              },
              required: ["functionRef", "args"],
            },
          },
          {
            name: "convex_mutation",
            description: "Execute a Convex mutation function",
            inputSchema: {
              type: "object",
              properties: {
                functionRef: {
                  type: "string",
                  description: "Convex function reference (e.g., 'api.messages.send')",
                },
                args: {
                  type: "object",
                  description: "Arguments to pass to the mutation",
                },
              },
              required: ["functionRef", "args"],
            },
          },
          {
            name: "convex_action",
            description: "Execute a Convex action function",
            inputSchema: {
              type: "object",
              properties: {
                functionRef: {
                  type: "string",
                  description: "Convex function reference (e.g., 'api.notifications.send')",
                },
                args: {
                  type: "object",
                  description: "Arguments to pass to the action",
                },
              },
              required: ["functionRef", "args"],
            },
          },
          {
            name: "convex_get_schema",
            description: "Retrieve the current Convex database schema",
            inputSchema: {
              type: "object",
              properties: {},
            },
          },
          {
            name: "convex_list_functions",
            description: "List all available Convex functions (queries, mutations, actions)",
            inputSchema: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  enum: ["query", "mutation", "action", "all"],
                  description: "Filter by function type",
                },
              },
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "convex_query":
            return await this.executeQuery(args as any);
          case "convex_mutation":
            return await this.executeMutation(args as any);
          case "convex_action":
            return await this.executeAction(args as any);
          case "convex_get_schema":
            return await this.getSchema();
          case "convex_list_functions":
            return await this.listFunctions(args as any);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  private async executeQuery(args: { functionRef: string; args: any }) {
    // This is a placeholder - actual implementation would use ConvexHttpClient
    const response = await fetch(`${this.config.deploymentUrl}/api/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(this.config.adminKey && { "Authorization": `Bearer ${this.config.adminKey}` }),
      },
      body: JSON.stringify({
        path: args.functionRef,
        args: args.args,
      }),
    });

    const result = await response.json();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }

  private async executeMutation(args: { functionRef: string; args: any }) {
    const response = await fetch(`${this.config.deploymentUrl}/api/mutation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(this.config.adminKey && { "Authorization": `Bearer ${this.config.adminKey}` }),
      },
      body: JSON.stringify({
        path: args.functionRef,
        args: args.args,
      }),
    });

    const result = await response.json();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }

  private async executeAction(args: { functionRef: string; args: any }) {
    const response = await fetch(`${this.config.deploymentUrl}/api/action`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(this.config.adminKey && { "Authorization": `Bearer ${this.config.adminKey}` }),
      },
      body: JSON.stringify({
        path: args.functionRef,
        args: args.args,
      }),
    });

    const result = await response.json();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }

  private async getSchema() {
    // Placeholder for schema retrieval
    return {
      content: [
        {
          type: "text",
          text: "Schema retrieval would be implemented here. Read from convex/schema.ts",
        },
      ],
    };
  }

  private async listFunctions(args: { type?: string }) {
    // Placeholder for function listing
    return {
      content: [
        {
          type: "text",
          text: `Listing functions of type: ${args.type || "all"}. Would scan convex/ directory for exported functions.`,
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Convex MCP server running on stdio");
  }
}

// Initialize and run the server
const config: ConvexConfig = {
  deploymentUrl: process.env.CONVEX_URL || "http://localhost:3210",
  adminKey: process.env.CONVEX_ADMIN_KEY,
};

const server = new ConvexMCPServer(config);
server.run().catch(console.error);
