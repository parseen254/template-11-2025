# Spec-Kit Project Constitution

## Core Principles

### I. Contract-First Development
Every feature starts with contract definition before implementation. Contracts define API boundaries using Convex validators for type safety. Frontend and backend work in parallel against shared contracts. No implementation begins without contracts and failing tests.

### II. Multi-Agent Coordination
Multiple AI agents collaborate via Convex real-time backend. Agents claim tasks atomically to prevent duplicate work. Status updates reported at milestones for transparency. Conflicts detected and resolved immediately through coordination system.

### III. Test-Driven Development (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement. Red-Green-Refactor cycle strictly enforced. Contract tests precede implementation. Integration tests validate agent coordination.

### IV. Spec-Kit Workflow
All features follow: Specify → Plan → Tasks → Implement → Validate. Constitutional framework guides all development decisions. Clarifications update specs, never contradict them. Analysis ensures consistency across spec/plan/tasks artifacts.

### V. Real-Time Backend
Convex provides real-time subscriptions, type-safe functions, and serverless scaling. All coordination happens through Convex (no external orchestration). Agent status, task claims, and conflicts stored in Convex tables. MCP servers enable AI agent tool access.

## Additional Constraints

### Technology Stack
- **Frontend**: Next.js 15+ with React 19+, Tailwind CSS 4
- **Backend**: Convex 1.28+ with Convex Auth
- **Type Safety**: TypeScript 5.9+ strict mode, Convex validators
- **Testing**: Contract tests, integration tests, E2E tests
- **Package Manager**: pnpm (lockfile committed)

### Security Requirements
- Never commit API keys or tokens (use environment variables)
- Convex Auth for authentication (no custom auth)
- Internal functions for sensitive operations
- MCP servers validate all inputs
- Agent coordination logs all operations

### Performance Standards
- Queries use indexes (no table scans via filter)
- Pagination for large result sets
- Actions call minimal queries/mutations (avoid race conditions)
- Real-time subscriptions for agent coordination
- Contract definitions cached and reused

## Development Workflow

### Feature Development
1. **Phase -1**: Define contracts with validators and types
2. **Phase 0**: Create database schema with indexes
3. **Phase 1**: Parallel implementation (backend + frontend)
4. **Phase 2**: Contract tests, integration tests, E2E tests
5. **Phase 3**: Integration and validation via spec-kit analyze

### Code Review Requirements
- All PRs verified against constitution principles
- Contract tests pass before implementation review
- Multi-agent coordination properly implemented
- No universal patterns in agent-specific files
- AGENTS.md updated for coordination changes

### Quality Gates
- TypeScript strict mode with no errors
- All Convex functions have args/returns validators
- Queries use withIndex (not filter)
- Real-time subscriptions for coordination
- MCP servers properly configured

## Governance

This constitution supersedes all other development practices. Amendments require:
1. Documentation of rationale and impact
2. Approval from project maintainers
3. Migration plan for existing code
4. Update to AGENTS.md if coordination affected

All code reviews must verify constitutional compliance. Complexity requires justification. Use AGENTS.md for runtime multi-agent coordination guidance.

**Version**: 1.0.0 | **Ratified**: 2025-11-05 | **Last Amended**: 2025-11-05
