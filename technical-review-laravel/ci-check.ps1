#!/usr/bin/env pwsh
# CI Tools Execution Script for Windows

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  CI TOOLS EXECUTION" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$ErrorCount = 0

# 1. Laravel Pint
Write-Host "[1/3] Running Laravel Pint..." -ForegroundColor Yellow
vendor/bin/pint --test
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Pint: PASSED" -ForegroundColor Green
} else {
    Write-Host "❌ Pint: FAILED" -ForegroundColor Red
    $ErrorCount++
}

# 2. PHPStan (Larastan)
Write-Host "`n[2/3] Running PHPStan (Larastan)..." -ForegroundColor Yellow
vendor/bin/phpstan analyse --memory-limit=1G --no-progress
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ PHPStan: PASSED" -ForegroundColor Green
} else {
    Write-Host "❌ PHPStan: FAILED" -ForegroundColor Red
    $ErrorCount++
}

# 3. PHPUnit Tests
Write-Host "`n[3/3] Running PHPUnit Tests..." -ForegroundColor Yellow
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
