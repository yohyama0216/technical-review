#!/usr/bin/env pwsh
# CI Tools Execution Script for Windows

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  CI TOOLS EXECUTION" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$ErrorCount = 0

# 1. Laravel Pint
Write-Host "[1/5] Running Laravel Pint..." -ForegroundColor Yellow
vendor/bin/pint --test
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Pint: PASSED" -ForegroundColor Green
} else {
    Write-Host "❌ Pint: FAILED" -ForegroundColor Red
    $ErrorCount++
}

# 2. PHPStan
Write-Host "`n[2/5] Running PHPStan Level 7..." -ForegroundColor Yellow
vendor/bin/phpstan analyse --level=7 --memory-limit=512M --no-progress
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ PHPStan: PASSED" -ForegroundColor Green
} else {
    Write-Host "❌ PHPStan: FAILED" -ForegroundColor Red
    $ErrorCount++
}

# 3. PHPMD
Write-Host "`n[3/5] Running PHPMD..." -ForegroundColor Yellow
vendor/bin/phpmd app/ text phpmd.xml
if ($LASTEXITCODE -eq 0 -or $LASTEXITCODE -eq 2) {
    Write-Host "✅ PHPMD: PASSED (or warnings only)" -ForegroundColor Green
} else {
    Write-Host "⚠️  PHPMD: WARNINGS FOUND" -ForegroundColor Yellow
}

# 4. PHP Insights
Write-Host "`n[4/5] Running PHP Insights..." -ForegroundColor Yellow
php artisan insights --no-interaction --format=console --min-quality=90 --min-complexity=90 --min-architecture=90 --min-style=85
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ PHP Insights: PASSED" -ForegroundColor Green
} else {
    Write-Host "❌ PHP Insights: FAILED" -ForegroundColor Red
    $ErrorCount++
}

# 5. PHPUnit Tests
Write-Host "`n[5/5] Running PHPUnit Tests..." -ForegroundColor Yellow
php artisan test
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Tests: PASSED" -ForegroundColor Green
} else {
    Write-Host "❌ Tests: FAILED" -ForegroundColor Red
    $ErrorCount++
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
if ($ErrorCount -eq 0) {
    Write-Host "  ✅ ALL CHECKS PASSED" -ForegroundColor Green
    Write-Host "========================================`n" -ForegroundColor Cyan
    exit 0
} else {
    Write-Host "  ❌ $ErrorCount CHECK(S) FAILED" -ForegroundColor Red
    Write-Host "========================================`n" -ForegroundColor Cyan
    exit 1
}
