Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  Starting Local AI Backend (AeroByte AI)  " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Check if llama-cpp-python is installed
$llamaInstalled = Get-Command "python" -Args "-c", "import llama_cpp" -ErrorAction SilentlyContinue
if (-not $llamaInstalled) {
    Write-Host "Installing llama-cpp-python server package... This may take a minute." -ForegroundColor Yellow
    python -m pip install "llama-cpp-python[server]"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error installing llama-cpp-python. Make sure you have C++ build tools installed." -ForegroundColor Red
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
Write-Host "  NGROK INSTRUCTIONS:" -ForegroundColor Cyan
Write-Host "  1. Open a new PowerShell window."
Write-Host "  2. Run: ngrok http 8080"
Write-Host "  3. Copy the 'Forwarding' URL (e.g. https://xxx.ngrok-free.app)"
Write-Host "  4. Paste it into your Admin Dashboard on the website!"
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Start the server
python -m llama_cpp.server --model "$modelPath" --host 0.0.0.0 --port 8080 --chat_format chatml
