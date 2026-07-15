Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  Starting Local AI Backend (AeroByte AI)  " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Check if llama-cpp-python is installed
$llamaInstalled = py -c "import llama_cpp" 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Installing llama-cpp-python..." -ForegroundColor Yellow
    py -m pip install "llama-cpp-python[server]" --prefer-binary
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Could not install llama-cpp-python." -ForegroundColor Red
        exit 1
    }
}

$modelPath = "F:\Ai\Aerobyte.gguf"

if (-not (Test-Path $modelPath)) {
    Write-Host "Error: Model file not found at $modelPath" -ForegroundColor Red
    exit 1
}

Write-Host "Model found! Starting the server..." -ForegroundColor Green
Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  TUNNEL INSTRUCTIONS:" -ForegroundColor Cyan
Write-Host "  1. Use ngrok or localhost.run to expose port 8080."
Write-Host "  2. For ngrok: .\ngrok.exe http 8080"
Write-Host "  3. For localhost.run: ssh -R 80:localhost:8080 nokey@localhost.run"
Write-Host "  4. Copy the public URL and paste it into your Admin Dashboard!"
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Start the server
Write-Host "Starting python API..."
py -m llama_cpp.server --model "$modelPath" --host 0.0.0.0 --port 8080 --chat_format chatml

Write-Host ""
Write-Host "Server process ended or crashed." -ForegroundColor Red
Read-Host -Prompt "Press Enter to exit"
