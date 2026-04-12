# Check if there are any changes to commit
$status = git status --porcelain
if ($status) {
    # Use the first argument as the commit message, or a default one if none provided
    $message = $args[0]
    if (-not $message) {
        $message = "Automated update: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    }

    Write-Host "Changes detected. Committing and pushing..." -ForegroundColor Cyan
    
    git add .
    git commit -m "$message"
    
    # Push to origin
    git push
    
    # Deploy to GitHub Pages
    Write-Host "Deploying to GitHub Pages..." -ForegroundColor Cyan
    npm run deploy
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Success: Changes pushed to GitHub." -ForegroundColor Green
    } else {
        Write-Host "Error: Push failed." -ForegroundColor Red
    }
} else {
    Write-Host "No changes detected in the working directory." -ForegroundColor Yellow
}
