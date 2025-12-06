# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-12-06

### Added
- **GitHub Copilot CLI Support**: Full compatibility with GitHub Copilot CLI MCP integration
- Global error handlers for uncaught exceptions and unhandled promise rejections
- Enhanced logging with configuration details on startup
- Protocol version logging (supports 2025-06-18, 2025-03-26, 2024-11-05, 2024-10-07)
- Detailed error logging for tool and resource operations
- Enhanced error messages with HTTP status codes and response data
- Comprehensive README documentation for GitHub Copilot CLI setup

### Changed
- Updated `@modelcontextprotocol/sdk` from `^1.20.2` to `^1.24.0`
- Improved error handling with structured stderr logging
- Enhanced startup logging with environment variable status
- Updated README with Copilot CLI configuration instructions
- Added MCP Inspector testing instructions

### Fixed
- All logging now correctly outputs to stderr (stdout reserved for MCP protocol only)
- Enhanced error context for better debugging

### Notes
- **Breaking Changes**: None - fully backward compatible with Claude Code
- **GitHub Copilot CLI**: Only supports MCP tools (not resources) - this is a Copilot limitation, not a package limitation
- **Claude Code**: Continues to support both tools and resources

## [1.0.0] - 2024-11-29

### Added
- Initial release
- MCP Server implementation for PersistQ
- 4 MCP tools: `add_memory`, `search_memory`, `list_memories`, `get_memory_stats`
- 2 MCP resources: `persistq://memories/all`, `persistq://stats`
- Claude Code integration support
- Stdio transport for MCP communication
- Environment variable configuration (PERSISTQ_URL, PERSISTQ_API_KEY, PERSISTQ_TOPIC)
- Comprehensive README with setup instructions

[1.1.0]: https://github.com/yourusername/persistq/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/yourusername/persistq/releases/tag/v1.0.0
