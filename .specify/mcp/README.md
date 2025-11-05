# MCP Servers for Spec-Kit

This directory contains Model Context Protocol (MCP) server implementations that enable AI agents to interact with external systems.

## Available MCP Servers

### 1. Convex MCP Server (`convex-server.ts`)

Enables AI agents to interact with your Convex backend.

**Tools Provided:**
- `convex_query` - Execute Convex query functions
- `convex_mutation` - Execute Convex mutation functions
- `convex_action` - Execute Convex action functions
- `convex_get_schema` - Retrieve database schema
- `convex_list_functions` - List all available functions

**Setup:**

1. Install dependencies:
```bash
cd /workspaces/codespaces-blank
pnpm install
```

2. Build the TypeScript server:
```bash
npx tsc --project .specify/mcp/tsconfig.json
```

3. Configure in your AI agent's MCP settings:

**For Claude Desktop (`claude_desktop_config.json`):**
```json
{
  "mcpServers": {
    "convex": {
      "command": "node",
      "args": ["/workspaces/codespaces-blank/.specify/mcp/dist/convex-server.js"],
      "env": {
        "CONVEX_URL": "https://your-deployment.convex.cloud",
        "CONVEX_ADMIN_KEY": "your-admin-key"
      }
    }
  }
}
```

**For Cursor IDE (`.cursor/mcp.json`):**
```json
{
  "servers": {
    "convex": {
      "command": "node",
      "args": ["/workspaces/codespaces-blank/.specify/mcp/dist/convex-server.js"],
      "env": {
        "CONVEX_URL": "https://your-deployment.convex.cloud",
        "CONVEX_ADMIN_KEY": "your-admin-key"
      }
    }
  }
}
```

**For GitHub Copilot:**
Add to `.github/copilot-mcp.json`:
```json
{
  "mcpServers": {
    "convex": {
      "command": "node",
      "args": ["/workspaces/codespaces-blank/.specify/mcp/dist/convex-server.js"],
      "env": {
        "CONVEX_URL": "https://your-deployment.convex.cloud"
      }
    }
  }
}
```

**Usage Example:**

Once configured, AI agents can use these tools:

```typescript
// Agent can now execute queries
const messages = await mcp.call_tool("convex_query", {
  functionRef: "api.messages.list",
  args: { channelId: "abc123" }
});

// Or mutations
await mcp.call_tool("convex_mutation", {
  functionRef: "api.messages.send",
  args: { 
    channelId: "abc123", 
    content: "Hello from AI agent!" 
  }
});

// List available functions
const functions = await mcp.call_tool("convex_list_functions", {
  type: "query"
});
```

## Adding New MCP Servers

To add a new MCP server:

1. Create a new TypeScript file in this directory (e.g., `custom-server.ts`)
2. Implement the MCP Server interface
3. Define tools using `ListToolsRequestSchema`
4. Handle tool calls using `CallToolRequestSchema`
5. Update this README with setup instructions

## Security Considerations

- **Never commit API keys or admin tokens** - Use environment variables
- **Validate all inputs** - MCP servers receive data from AI agents
- **Implement rate limiting** - Prevent abuse of expensive operations
- **Use read-only access when possible** - Minimize mutation capabilities
- **Log all operations** - Track what agents are doing for debugging

## Troubleshooting

**Server not connecting:**
- Check that the command path is correct
- Verify environment variables are set
- Look for errors in agent's MCP logs

**Tool calls failing:**
- Ensure Convex deployment URL is accessible
- Verify admin key has proper permissions
- Check function references match actual Convex functions

**TypeScript compilation errors:**
- Install MCP SDK: `npm install @modelcontextprotocol/sdk`
- Ensure TypeScript is installed: `npm install -D typescript`

## Resources

- [MCP Specification](https://modelcontextprotocol.io/introduction)
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)
- [Convex Documentation](https://docs.convex.dev/)
- [Spec-Kit Plus MCP Examples](https://github.com/panaversity/spec-kit-plus/tree/main/docs-plus/01b_ai_cli_extensions)
