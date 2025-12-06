# Setup PersistQ MCP config in the user's %USERPROFILE%\.copilot\mcp-config.json
# Requires PERSISTQ_URL and PERSISTQ_API_KEY to be set in the environment.

if (-not $env:PERSISTQ_URL -or -not $env:PERSISTQ_API_KEY) {
    Write-Error "Environment variables PERSISTQ_URL and PERSISTQ_API_KEY must be set before running this script."
    exit 1
}

$home = $env:USERPROFILE
$copilotDir = Join-Path $home ".copilot"
if (-not (Test-Path $copilotDir)) {
    New-Item -ItemType Directory -Path $copilotDir | Out-Null
}

$config = @{ 
    mcpServers = @{ 
        persistq = @{ 
            command = "npx";
            args = @("-y","persistq");
            env = @{ 
                PERSISTQ_URL = $env:PERSISTQ_URL;
                PERSISTQ_API_KEY = $env:PERSISTQ_API_KEY;
            }
        }
    }
}

$configJson = $config | ConvertTo-Json -Depth 10
$configPath = Join-Path $copilotDir "mcp-config.json"

# Backup existing config if present
if (Test-Path $configPath) {
    $bak = "$configPath.bak_$(Get-Date -Format 'yyyyMMddHHmmss')"
    Copy-Item $configPath $bak
    Write-Host "Existing config backed up to $bak"
}

$configJson | Out-File -FilePath $configPath -Encoding UTF8
Write-Host "PersistQ MCP configuration written to: $configPath"
Write-Host "Make sure Copilot CLI is restarted if it was running."